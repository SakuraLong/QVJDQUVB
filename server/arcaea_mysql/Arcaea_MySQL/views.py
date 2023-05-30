import hashlib
from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection
import random
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
import math
import time


@csrf_exempt
def register(request):
    # 获取POST请求参数
    if request.method == "POST":
        username = request.POST.get('username')
        userpassword = request.POST.get('userpassword')
        seed = request.POST.get('seed')
    else:
        return json_response({"success": False, "error": "method-is-not-POST"})
    # 对密码进行MD5哈希
    password_hash = hashlib.md5(userpassword.encode('utf-8')).hexdigest()
    # 查询用户名是否已存在
    with connection.cursor() as mycursor:
        # 查询用户名是否已存在
        mycursor.execute("SELECT * FROM player WHERE username = %s", (username,))
        result = mycursor.fetchone()
        if result:
            # 用户名已存在，返回失败
            mycursor.close()
            return json_response({"success": False, "error": "username-is-repeated"})
        else:
            # 用户名不存在，插入新用户信息
            # 获取playernumber表中最大的id值
            mycursor.execute("SELECT MAX(id) FROM playernumber")
            max_id = mycursor.fetchone()[0]
            print("max_id",max_id)
            if max_id is None:
                max_id = 100000001
            else:
                max_id += 1
            # 在player表中插入新用户信息
            sql = "INSERT INTO player (id, username, userpassword, seed, usertype, score, userlevel, usermemory, userfragment, selectedcharid, loginnumber) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            val = (max_id, username, userpassword, seed, 0, 0.00, 1, 0, 0, '0', random.randint(100000000, 999999999))
            mycursor.execute(sql, val)
            mycursor.execute("INSERT INTO playernumber (id) VALUES (%s)", (max_id,))
            # 创建用户好友表和歌曲得分表
            friend_table_name = "player_friend_" + str(max_id)
            song_table_name = "player_song_" + str(max_id)
            mycursor.execute("CREATE TABLE " + friend_table_name + " (id INT)")
            mycursor.execute(
            "CREATE TABLE " + song_table_name + " (idx VARCHAR(255), lastestscore FLOAT(2), lastestscoreused FLOAT(2), highestscore FLOAT(2), dif INT, time VARCHAR(255), timeused VARCHAR(255), cleartype VARCHAR(255))")
            # 提交事务
            connection.commit()
            # 关闭游标和数据库连接
            mycursor.close()
            # 注册成功，自动登录
            return json_response({"success": True, "error": ""})

@csrf_exempt
def login(request):
    # 获取POST请求参数
    if request.method == "POST":
        username = request.POST.get('username')
        userpassword = request.POST.get('userpassword')
    else:
        return json_response({"success": False, "error": "method-is-not-POST"})
    # 对密码进行MD5哈希
    password_hash = hashlib.md5(userpassword.encode('utf-8')).hexdigest()
    # 查询用户信息
    with connection.cursor() as mycursor:
            # 查询用户信息
        mycursor.execute("SELECT * FROM player WHERE username = %s AND userpassword = %s", (username, userpassword))
        result = mycursor.fetchone()
        if result:
            # 更新loginnumber字段
            loginnumber = random.randint(100000000, 999999999)
            mycursor.execute("UPDATE player SET loginnumber = %s WHERE id = %s", (loginnumber, result[0]))
            connection.commit()
            # 关闭游标和数据库连接
            mycursor.close()
            #connection.close()
            # 登录成功，返回用户信息
            # self.id=result[0]
            # self.loginnumber=loginnumber
            return json_response({"success": True, "error": "", "id": result[0], "username": result[1], "seed": result[3],
                            "usertype": result[4], "score": str('%.2f' % result[5]), "userlevel": result[6],
                            "usermemory": result[7], "userfragment": result[8], "selectedcharid": result[9],
                            "loginnumber": loginnumber})
        else:
            # 关闭游标和数据库连接
            mycursor.close()
            #connection.close()
            # 登录失败，返回错误信息
            return json_response({"success": False, "error": "login-failed"})

@csrf_exempt
def deleteAccount(request):
    if request.method == "POST":
        id = request.POST.get('id')
        loginnumber=request.POST.get('loginnumber')
        username = request.POST.get('username')
        userpassword = request.POST.get('userpassword')
        seed=request.POST.get('seed')
    else:
        return json_response({"success": False, "error": "method-is-not-POST"})
    # 创建游标对象
    mycursor = connection.cursor()
    # 查询用户信息
    mycursor.execute("SELECT * FROM player WHERE id = %s AND loginnumber = %s AND username = %s AND userpassword=%s AND seed=%s", (id, loginnumber,username, userpassword, seed))
    result = mycursor.fetchone()
    if result:
        # 删除用户信息
        mycursor.execute("DELETE FROM player WHERE id = %s", (id,))
        mycursor.execute("DELETE FROM playernumber WHERE id = %s", (id,))
        # 删除用户好友表和歌曲得分表
        friend_table_name = "player_friend_" + str(id)
        song_table_name = "player_song_" + str(id)
        mycursor.execute("DROP TABLE IF EXISTS " + friend_table_name)
        mycursor.execute("DROP TABLE IF EXISTS " + song_table_name)
        # 提交事务
        connection.commit()
        # 关闭游标和数据库连接
        mycursor.close()
        # 删除成功，返回成功信息
        return json_response({"success": True, "error": ""})
    else:
        # 关闭游标和数据库连接
        mycursor.close()
        # 删除失败，返回错误信息
        return json_response({"success": False, "error": "query-failed"})

@csrf_exempt
def getFriends(request):
    # 连接数据库
    if request.method == "POST":
        id=request.POST.get('id')
        loginnumber=request.POST.get('loginnumber')
    else:
        return json_response({"success": False, "error": "method-is-not-POST"})
    # 创建游标对象
    with connection.cursor() as mycursor:
        # 查询用户信息
        mycursor.execute("SELECT * FROM player WHERE id = %s AND loginnumber = %s", (id, loginnumber))
        result = mycursor.fetchone()
        if result:
            # 查询用户好友表
            friend_table_name = "player_friend_" + str(id)
            mycursor.execute("SELECT id FROM " + friend_table_name)
            friend_ids = mycursor.fetchall()
            friends = []
            for friend_id in friend_ids:
                # 查询好友信息
                mycursor.execute("SELECT username, score, selectedcharid FROM player WHERE id = %s", (friend_id[0],))
                friend_info = mycursor.fetchone()
                # 添加代码：如果查询好友表时player里面没有这个id信息，则在其好友表里面删除此好友
                mycursor.execute("SELECT * FROM playernumber WHERE id = %s", (friend_id[0],))
                player_info = mycursor.fetchone()
                if not player_info:
                    mycursor.execute("DELETE FROM " + friend_table_name + " WHERE id = %s", (friend_id[0],))
                    connection.commit()
                    continue
                # 查询好友最新得分
                song_table_name = "player_song_" + str(friend_id[0])
                mycursor.execute("SELECT * FROM " + song_table_name + " ORDER BY time DESC LIMIT 1")
                song_info = mycursor.fetchone()
                if song_info:
                    friends.append(
                        {"username": friend_info[0], "score": str('%.2f' % friend_info[1]), "selectedcharid": friend_info[2],
                        "songid": song_info[0],"dif": song_info[4],
                        "lastestscore": song_info[1], "time": song_info[5], "id": friend_id[0]})
                elif friend_info:
                    friends.append(
                        {"username": friend_info[0], "score":  str('%.2f' % friend_info[1]), "selectedcharid": friend_info[2],
                        "songid": None,"dif": None,
                        "lastestscore": None, "time": None, "id": friend_id[0]})
            # 关闭游标和数据库连接
            mycursor.close()
            #mydb.close()
            return json_response({"friends": friends, "success": True})
        else:
            # 关闭游标和数据库连接
            mycursor.close()
            #mydb.close()
            # 查询失败，返回错误信息
            return json_response({"success": False, "error": "query-failed"})

@csrf_exempt
def addFriend(request):
    # 连接数据库
    if request.method == "POST":
        id=request.POST.get('id')
        loginnumber=request.POST.get('loginnumber')
        findid = request.POST.get('findid')
    else:
        return json_response({"success": False, "error": "method-is-not-POST"})
    # 创建游标对象
    with connection.cursor() as mycursor:
        # 查询用户信息
        mycursor.execute("SELECT * FROM player WHERE id = %s AND loginnumber = %s", (id, loginnumber))
        result = mycursor.fetchone()
        if result:
            # 检查id和findid是否一致
            if id == findid:
                # 关闭游标和数据库连接
                mycursor.close()
                #mydb.close()
                # 添加失败，返回错误信息
                return json_response({"success": False, "error": "cannot-add-self-as-friend"})
            # 查询findid是否存在
            mycursor.execute("SELECT * FROM player WHERE id = %s", (findid,))
            find_result = mycursor.fetchone()
            if find_result:
                # 查询用户好友表
                friend_table_name = "player_friend_" + str(id)
                mycursor.execute("SELECT * FROM " + friend_table_name + " WHERE id = %s", (findid,))
                friend_result = mycursor.fetchone()
                if friend_result:
                    # 关闭游标和数据库连接
                    mycursor.close()
                    #mydb.close()
                    # 添加失败，返回错误信息
                    return json_response({"success": False, "error": "already-friends"})
                else:
                    # 在用户好友表中插入新好友id
                    mycursor.execute("INSERT INTO " + friend_table_name + " (id) VALUES (%s)", (findid,))
                    #mydb.commit()
                    # 关闭游标和数据库连接
                    mycursor.close()
                    #mydb.close()
                    # 添加成功，返回成功信息
                    return json_response({"success": True, "error": ""})
            else:
                # 关闭游标和数据库连接
                mycursor.close()
                #mydb.close()
                # 添加失败，返回错误信息
                return json_response({"success": False, "error": "user-not-exist"})
        else:
            # 关闭游标和数据库连接
            mycursor.close()
            #mydb.close()
            # 添加失败，返回错误信息
            return json_response({"success": False, "error": "query-failed"})

@csrf_exempt
def deleteFriend(request):
    # 获取POST请求参数
    if request.method == "POST":
        id=request.POST.get('id')
        loginnumber=request.POST.get('loginnumber')
        friend_id = request.POST.get('findid')
    else:
        return json_response({"success": False, "error": "method-is-not-POST"})
    # 查询用户信息
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM player WHERE id = %s AND loginnumber = %s", (id, loginnumber))
        result = cursor.fetchone()
        if result:
            # 查询用户好友表
            friend_table_name = "player_friend_" + str(id)
            cursor.execute("SELECT * FROM " + friend_table_name + " WHERE id = %s", (friend_id,))
            friend_exist = cursor.fetchone()
            if friend_exist:
                # 从用户好友表中删除好友
                cursor.execute("DELETE FROM " + friend_table_name + " WHERE id = %s", (friend_id,))
                # 提交事务
                connection.commit()
                # 返回成功信息
                return json_response({"success": True, "error": ""})
            else:
                # 好友不存在，返回错误信息
                return json_response({"success": False, "error": "friend-not-exist"})
        else:
            # 查询失败，返回错误信息
            return json_response({"success": False, "error": "query-failed"})

@csrf_exempt
def getScores(request):
    if request.method == "POST":
        id=request.POST.get('id')
        loginnumber=request.POST.get('loginnumber')
    else:
        return json_response({"success": False, "error": "method-is-not-POST"})
    # 连接数据库

    # 创建游标对象
    with connection.cursor() as mycursor:
    # 查询用户信息
        mycursor.execute("SELECT * FROM player WHERE id = %s AND loginnumber = %s", (id, loginnumber))
        result = mycursor.fetchone()
        if result:
            # 查询用户歌曲得分表
            song_table_name = "player_song_" + str(id)
            mycursor.execute("SELECT * FROM " + song_table_name)
            song_scores = mycursor.fetchall()
            scores = []
            for song_score in song_scores:
                scores.append({"song_id": str(get_song_id_by_idx(song_score[0])), "score": str(song_score[3]), "dif": str(song_score[4]),
                            "cleartype": str(song_score[7])})
            # 关闭游标和数据库连接
            mycursor.close()
            #mydb.close()
            # 返回歌曲得分信息
            return json_response({"success": True, "score": scores})
        else:
            # 关闭游标和数据库连接
            mycursor.close()
            #mydb.close()
            # 查询失败，返回错误信息
            return json_response({"success": False, "error": "query-failed"})      

@csrf_exempt
def switchChar(request):
    # 连接数据库
    if request.method == "POST":
        id=request.POST.get('id')
        loginnumber=request.POST.get('loginnumber')
        selectedcharid=request.POST.get('selectedcharid')
    else:
        return json_response({"success": False, "error": "method-is-not-POST"})
    # 创建游标对象
    with connection.cursor() as mycursor:
        # 查询用户信息
        mycursor.execute("SELECT * FROM player WHERE id = %s AND loginnumber = %s", (id, loginnumber))
        result = mycursor.fetchone()
        if result:
            # 更新selectedcharid字段
            mycursor.execute("UPDATE player SET selectedcharid = %s WHERE id = %s", (selectedcharid, id))
            #mydb.commit()
            # 关闭游标和数据库连接
            mycursor.close()
            #mydb.close()
            # 更新成功，返回成功信息
            return json_response({"success": True, "error": ""})
        else:
            # 关闭游标和数据库连接
            mycursor.close()
            #mydb.close()
            # 更新失败，返回错误信息
            return json_response({"success": False, "error": "query-failed"})
    
@csrf_exempt
def uploadScore(request):
    # 连接数据库
    if request.method == "POST":
        id=request.POST.get('id')
        loginnumber = request.POST.get('loginnumber')
        idx = request.POST.get('idx')
        lastestscore = request.POST.get('lastestscore')
        cleartype = request.POST.get('cleartype')
        selectedcharid = request.POST.get('selectedcharid')
        dif = request.POST.get('dif')
        id = int(id)
        dif = int(dif)
        lastestscore = int(lastestscore)
        cleartype = int(cleartype)
    else:
        return json_response({"success": False, "error": "method-is-not-POST"})
    # 创建游标对象
    with connection.cursor() as mycursor:
        # 获取时间戳
        timestamp = int(time.time() * 1000)
        # 查询用户信息
        mycursor.execute("SELECT * FROM player WHERE id = %s AND loginnumber = %s", (id, loginnumber))
        result = mycursor.fetchone()
        song_table_name = "player_song_" + str(id)
        mycursor.execute("SELECT * FROM " + song_table_name + " WHERE idx = %s AND dif = %s", (idx, dif))
        is_first_time = mycursor.fetchall()
        if not is_first_time and cleartype != 0:
            is_first_time = True
        if result:
            change, now = calculate(id, idx, lastestscore, dif, timestamp, loginnumber)
            if change >= 0:
                # 正常存储
                mycursor.execute("SELECT * FROM " + song_table_name + " WHERE idx = %s AND dif = %s", (idx, dif))
                is_exist = mycursor.fetchall()
                if is_exist:
                    # 判断更新
                    if is_exist[0][3] > lastestscore:
                        save_score = is_exist[0][3]
                    else:
                        save_score = lastestscore

                    if int(is_exist[0][7]) > cleartype:
                        save_clear_type = is_exist[0][7]
                    else:
                        save_clear_type = cleartype
                else:
                    save_score = lastestscore
                    save_clear_type = cleartype
                if is_exist:
                    data = (
                        lastestscore,
                        lastestscore,
                        save_score,
                        timestamp,
                        timestamp,
                        save_clear_type,
                        idx,
                        dif
                    )
                    mycursor.execute("""UPDATE """ + song_table_name + """ SET lastestscore = %s, lastestscoreused = %s, 
                                                highestscore = %s, time = %s, timeused = %s, cleartype = %s WHERE idx = %s AND dif=%s""",
                                     data)
                else:
                    data = (
                        idx,
                        lastestscore,
                        lastestscore,
                        save_score,
                        dif,
                        timestamp,
                        timestamp,
                        save_clear_type
                    )
                    mycursor.execute("INSERT INTO " + song_table_name + " values (%s, %s, %s, %s, %s, %s, %s, %s)",
                                     data)
                connection.commit()
                mycursor.execute("UPDATE player SET score = %s WHERE id = %s", (now, id))
                connection.commit()
            else:
                # 此时是小于0的
                is_c = get_char_type(char_id=selectedcharid)
                if is_c:
                    if lastestscore >= 9800000 or cleartype == 0:
                        # 不完全进行分数的存储
                        mycursor.execute("SELECT * FROM " + song_table_name + " WHERE idx = %s AND dif = %s",
                                         (idx, dif))
                        is_exist = mycursor.fetchall()
                        if is_exist:
                            # 判断更新
                            if is_exist[0][3] > lastestscore:
                                save_score = is_exist[0][3]
                            else:
                                save_score = lastestscore

                            if int(is_exist[0][7]) > cleartype:
                                save_clear_type = is_exist[0][7]
                            else:
                                save_clear_type = cleartype
                        else:
                            save_score = lastestscore
                            save_clear_type = cleartype
                        if is_exist:
                            data = (
                                lastestscore,
                                is_exist[0][2],
                                save_score,
                                timestamp,
                                is_exist[0][6],
                                save_clear_type,
                                idx,
                                dif
                            )
                            mycursor.execute("""UPDATE """ + song_table_name + """ SET lastestscore = %s, lastestscoreused = %s, 
                                                        highestscore = %s, time = %s, timeused = %s, cleartype = %s WHERE idx = %s AND dif=%s""",
                                             data)
                        else:
                            data = (
                                idx,
                                lastestscore,
                                None,
                                save_score,
                                dif,
                                timestamp,
                                None,
                                save_clear_type
                            )
                            mycursor.execute(
                                "INSERT INTO " + song_table_name + " values (%s, %s, %s, %s, %s, %s, %s, %s)", data)
                        connection.commit()
                else:
                    mycursor.execute("SELECT * FROM " + song_table_name + " WHERE idx = %s AND dif = %s", (idx, dif))
                    is_exist = mycursor.fetchall()
                    if is_exist:
                        # 判断更新
                        if is_exist[0][3] > lastestscore:
                            save_score = is_exist[0][3]
                        else:
                            save_score = lastestscore

                        if int(is_exist[0][7]) > cleartype:
                            save_clear_type = is_exist[0][7]
                        else:
                            save_clear_type = cleartype
                    else:
                        save_score = lastestscore
                        save_clear_type = cleartype
                    if is_exist:
                        data = (
                            lastestscore,
                            lastestscore,
                            save_score,
                            timestamp,
                            timestamp,
                            save_clear_type,
                            idx,
                            dif
                        )
                        mycursor.execute("""UPDATE """ + song_table_name + """ SET lastestscore = %s, lastestscoreused = %s, 
                                                    highestscore = %s, time = %s, timeused = %s, cleartype = %s WHERE idx = %s AND dif=%s""",
                                         data)
                    else:
                        data = (
                            idx,
                            lastestscore,
                            lastestscore,
                            save_score,
                            dif,
                            timestamp,
                            timestamp,
                            save_clear_type
                        )
                        mycursor.execute("INSERT INTO " + song_table_name + " values (%s, %s, %s, %s, %s, %s, %s, %s)",
                                         data)
                    connection.commit()
                    mycursor.execute("UPDATE player SET score = %s WHERE id = %s", (now, id))
                    connection.commit()
            frag = calculate_frag(idx, dif, lastestscore, cleartype, is_first_time)
            now_frag = mycursor.execute("SELECT userfragment FROM player WHERE id = %s", (id,))
            now_frag += frag
            mycursor.execute("UPDATE player SET userfragment = %s WHERE id = %s", (now_frag, id))
            connection.commit()
            mycursor.close()
            return json_response({"success": True, "error": "", "result":{
                "ptt": change,
                "score": now,
                "frag": frag
            }})
        else:
            # 关闭游标和数据库连接
            mycursor.close()
            # 更新失败，返回错误信息
            return json_response({"success": False, "error": "query-failed"})
@csrf_exempt
def get_song_id_by_idx(song_idx):
    song_idx = int(song_idx)
    f = open('../resources/json/songlist.json', 'r', encoding='utf-8')
    data = json.load(f)
    for song in data['songs']:
        if song['idx'] == song_idx:
            return song["id"]
@csrf_exempt
def calculate_frag(song_idx, dif, score, clear_type, is_first):
    playing = [1, 1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10]
    dif_frag = [8, 9, 10, 11]
    t_c = 0         # 通关奖励
    s_s = 0         # 精彩展现
    i_f = 0         # 初次通关
    if is_first:
        i_f = 10
    rating = 0
    f = open('../resources/json/songlist.json', 'r', encoding='utf-8')
    data = json.load(f)
    for song in data['songs']:
        if song['idx'] == song_idx:
            rating = song["difficulties"][dif]["rating"]
            break
    if score < 5500000:
        return 0
    elif clear_type == 0:
        t_c = playing[rating - 1]
    elif clear_type == 1 or clear_type == 2 or clear_type == 3:
        t_c = playing[rating - 1] + 8 + dif
    else:
        t_c = dif_frag[dif]
        if clear_type == 4:
            s_s = playing[rating] * 2
        else:
            s_s = int(playing[rating] * 2.7)
    return t_c + s_s + i_f




@csrf_exempt
def calculate(player_id, song_idx, score, dif, timestamp, loginnumber):
    # 计算是否需要变化
    # 返回分数的变化值
    change = 0.00
    b30 = calculate_b30(player_id, song_idx, score, dif)
    r10 = calculate_r30(player_id, song_idx, score, dif, timestamp)
    print("b30=", b30)
    print("r10=", r10)
    now = b30 * 0.5 + r10 * 0.5
    now = math.floor(now * 10 ** 2) / 10 ** 2  # 向下
    with connection.cursor() as mycursor:
        mycursor.execute("SELECT score FROM player WHERE id = %s AND loginnumber = %s", (player_id, loginnumber))
        result = mycursor.fetchone()
        print(result)
        change = now - result[0]
    mycursor.close()
    return change, now
@csrf_exempt
def calculate_b30(player_id, song_idx, score, dif):
    # b30是计算本次歌曲的
    with connection.cursor() as mycursor:
        song_table_name = "player_song_" + str(player_id)
        # print(song_table_name)
        mycursor.execute("SELECT * FROM " + song_table_name)
        songs_result = mycursor.fetchall()
        # print("SELECT * FROM " + song_table_name + " WHERE idx = %s AND dif = %s", (song_idx, dif))
        mycursor.execute("SELECT * FROM " + song_table_name + " WHERE idx = %s AND dif = %s", (song_idx, dif))
        is_exist = mycursor.fetchall()
        mycursor.execute("SELECT * FROM songlist")
        songs_sys = mycursor.fetchall()
        # print("songs_result",songs_result)
        dif_list = [4, 3, 2, 5]
        play_ptt_list = []
        if songs_result:
            for song_result in songs_result:
                s_idx = song_result[0]
                s_dif = song_result[4]
                if s_idx == song_idx:
                    continue
                # print(s_idx)
                for song_sys in songs_sys:
                    if int(song_sys[0]) == int(s_idx):
                        print(song_sys[1])
                        t_ptt = song_sys[dif_list[s_dif]] + ptt_once(song_result[3])
                        if t_ptt < 0:
                            t_ptt = 0
                        # print(t_ptt)
                        play_ptt_list.append(t_ptt)
                        break
        for song_sys in songs_sys:
            if int(song_sys[0]) == int(song_idx):
                t_ptt_1 = song_sys[dif_list[dif]] + ptt_once(score)
                t_ptt_2 = 0
                if is_exist:
                    t_ptt_2 = song_sys[dif_list[dif]] + ptt_once(is_exist[0][3])
                if t_ptt_1 < 0:
                    t_ptt_1 = 0
                t_ptt = 0
                if t_ptt_1 > t_ptt_2:
                    t_ptt = t_ptt_1
                else:
                    t_ptt = t_ptt_2
                play_ptt_list.append(t_ptt)
                break
        l = len(play_ptt_list)
        ptt_all = 0.00
        print(play_ptt_list)
        if l <= 30:
            for p in play_ptt_list:
                ptt_all += p
        else:
            for i in range(30):
                ptt_max = max(play_ptt_list)
                ptt_all += ptt_max
                play_ptt_list.remove(ptt_max)
        ptt_all /= 30
    mycursor.close()
    return ptt_all
@csrf_exempt
def calculate_r30(player_id, song_idx, score, dif, timestamp):
    # r30是计算本次歌曲的
    with connection.cursor() as mycursor:
        song_table_name = "player_song_" + str(player_id)
        # print(song_table_name)
        mycursor.execute("SELECT * FROM " + song_table_name)
        songs_result = mycursor.fetchall()
        mycursor.execute("SELECT * FROM " + song_table_name + " WHERE idx = %s AND dif = %s", (song_idx, dif))
        is_exist = mycursor.fetchall()
        mycursor.execute("SELECT * FROM songlist")
        songs_sys = mycursor.fetchall()
        dif_list = [4, 3, 2, 5]
        play_ptt_list = []
        if songs_result:
            for song_result in songs_result:
                s_idx = song_result[0]
                s_dif = song_result[4]
                if s_idx == song_idx:
                    continue
                for song_sys in songs_sys:
                    if int(song_sys[0]) == int(s_idx):
                        if song_result[2] is None:
                            break
                        t_ptt = song_sys[dif_list[s_dif]] + ptt_once(song_result[2])
                        if t_ptt < 0:
                            t_ptt = 0
                        play_ptt_list.append([t_ptt, int(song_result[6])])
                        break
        for song_sys in songs_sys:
            if int(song_sys[0]) == int(song_idx):
                t_ptt_1 = song_sys[dif_list[dif]] + ptt_once(score)
                if t_ptt_1 < 0:
                    t_ptt_1 = 0
                play_ptt_list.append([t_ptt_1, timestamp])
                break
        l = len(play_ptt_list)
        print(play_ptt_list)
        ptt_all = 0.00
        if l <= 10:
            for p in play_ptt_list:
                ptt_all += p[0]
        else:
            temp_list = sorted(play_ptt_list, key=lambda x: x[1], reverse=True)
            play_ptt_list = []
            for t, i in enumerate(temp_list):
                if i == 30:
                    break
                play_ptt_list.append(t[0])
            for i in range(10):
                ptt_max = max(play_ptt_list)
                ptt_all += ptt_max
                play_ptt_list.remove(ptt_max)
        ptt_all /= 10
    mycursor.close()
    return ptt_all
@csrf_exempt
def get_char_type(char_id):
    char_id = str(char_id)
    f = open('../resources/json/charlist.json', 'r', encoding='utf-8')
    data = json.load(f)
    for person in data['char']:
        if person['idx'] == char_id:
            if person['dif'] == 2:
                return True
            else:
                break
    return False
@csrf_exempt
def ptt_once(score):
    # 建立字典，便于查询9,500,00分数以上定数
    if score < 9500000:
        delta = (9500000 - score) / 300 + 1
        return -delta
    elif 9800000 > score >= 9500000:
        return 0
    elif 9900000 > score >= 9800000:
        return 1
    elif 9950000 > score >= 9900000:
        return 1.5
    elif 10000000 > score >= 9950000:
        return 1.75
    elif score >= 10000000:
        return 2
@csrf_exempt  
def sendMessage(request):
    print("调用")
    if request.method == 'POST':
        input_text = request.POST.get('input_text')
        # 在这里处理数据，做出相应的响应
        response_data = {'message': '已收到数据：' + input_text}
        print(response_data)
        # return response(response_data)
        return json_response(response_data)
    else:
        print({'message': '只支持 POST 请求'})
        return json_response({'message': '只支持 POST 请求'})
    
@csrf_exempt
def json_response(answer):
    return HttpResponse(json.dumps(answer, ensure_ascii=False))

@csrf_exempt
def cal_ptt(score):
    # 建立字典，便于查询9,500,00分数以上定数
    if score < 9500000:
        delta = (9500000 - score) / 300 + 1
        return -delta
    elif 9800000 > score >= 9500000:
        return 0
    elif 9900000 > score >= 9800000:
        return 1
    elif 9950000 > score >= 9900000:
        return 1.5
    elif 10000000 > score >= 9950000:
        return 1.75
    elif score >= 10000000:
        return 2


# def show(request):
#     return render(request, 'show.html')

# def process(request):
#     if request.is_ajax():
#         print(request.POST)
#         data = {
#             'name': "candy",
#             'age': 13,
#         }
#         list = ['a', 'b', 'c', 'd']
#         response = response({"status": '服务器接收成功', 'data': data, 'list': list})
#         return response
