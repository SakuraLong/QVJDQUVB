let pack_data_init = {
    "packs":[
        {
            "id":"base",
            "song":{
                "idx":"sayonarahatsukoi",
                "remote_dl":false,
                "begin_time":44494,
                "end_time":76853,
                "pack":"base"
            }
        },
        {
            "id":"extend",
            "song":{
                "idx":"givemeanightmare",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"extend"
            }
        },
        {
            "id":"finale",
            "song":{
                "idx":"defection",
                "remote_dl":true,
                "begin_time":0,
                "end_time":0,
                "pack":"finale"
            }
        },
        {
            "id":"vs",
            "song":{
                "idx":"equilibrium",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"vs"
            }
        },
        {
            "id":"prelude",
            "song":{
                "idx":"particlearts",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"prelude"
            }
        },
        {
            "id":"rei",
            "song":{
                "idx":"mazenine",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"rei"
            }
        },
        {
            "id":"yugamu",
            "song":{
                "idx":"soundwitch",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"yugamu"
            }
        },
        {
            "id":"core",
            "song":{
                "idx":"viyella",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"core"
            }
        },
        {
            "id":"observer",
            "song":{
                "idx":"paperwitch",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"observer"
            }
        },
        {
            "id":"dividedheart",
            "song":{
                "idx":"firstsnow",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"dividedheart"
            }
        },
        {
            "id":"alice",
            "song":{
                "idx":"alicealamode",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"alice"
            }
        },
        {
            "id":"omatsuri",
            "song":{
                "idx":"chelsea",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"omatsuri"
            }
        },
        {
            "id":"zettai",
            "song":{
                "idx":"antithese",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"zettai"
            }
        },
        {
            "id":"nijuusei",
            "song":{
                "idx":"silentrush",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"nijuusei"
            }
        },
        {
            "id":"mirai",
            "song":{
                "idx":"lethaeus",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"mirai"
            }
        },
        {
            "id":"shiawase",
            "song":{
                "idx":"partyvinyl",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"shiawase"
            }
        },
        {
            "id":"musedash",
            "song":{
                "idx":"lightsofmuse",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"musedash"
            }
        },
        {
            "id":"wacca",
            "song":{
                "idx":"mazymetroplex",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"wacca"
            }
        },
        {
            "id":"maimai",
            "song":{
                "idx":"aprilshowers",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"maimai"
            }
        },
        {
            "id":"ongeki",
            "song":{
                "idx":"lazyaddiction",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"ongeki"
            }
        },
        {
            "id":"chunithm",
            "song":{
                "idx":"garakuta",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"chunithm"
            }
        },
        {
            "id":"groovecoaster",
            "song":{
                "idx":"merlin",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"groovecoaster"
            }
        },
        {
            "id":"tonesphere",
            "song":{
                "idx":"hikari",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"tonesphere"
            }
        },
        {
            "id":"lanota",
            "song":{
                "idx":"cyanine",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"lanota"
            }
        },
        {
            "id":"dynamix",
            "song":{
                "idx":"moonlightofsandcastle",
                "remote_dl":true,
                "begin_time":60000,
                "end_time":70000,
                "pack":"dynamix"
            }
        }
    ]
};  // 曲包选择歌曲信息 懒得动态写了 初始化
let last_pack_state = {
    "pack":"",
    "group_show_index":[],
    "song_list_y":0,
    "sort_method":0,
    "classify_method":0,
    "dif":0 
};  // 上一次选择的曲包的界面选择信息以及排序、分组、难度的信息 初始化
let save_msg = {
    "idx":"sayonarahatsukoi",
    "remote_dl":false,
    "begin_time":44494,
    "end_time":76853,
    "pack":"base",
    "type":"bg_light"
};  //  上一次选择的歌曲信息 初始化
/*
    选择界面
    进入此界面首先检查本地数据库的各项数据，没有则进行初始化。
    初始化情况下，歌曲是sayonarahatsukoi，界面是曲包界面，难度是0。
    检查用户的游玩得分情况，并对曲包上面的信息进行更改。
    点击曲包之后，即可进入对应的选歌界面。
    选歌界面会检查本地数据库中排序和分组的方式，检查当前曲包选择了哪首歌曲，并且播放对应音乐，歌曲相同则不变。
    如果上一个选择的曲包不是本区包，会将选择的歌曲展示在界面之上且除此之外的所有分组折叠。
    如果上一个选择的曲包是本区包，会将坐标y值直接录入，并且展开记录里面的分组。
    进入时候的难度由本地数据库数据进行确定。
    last_pack_state的全部信息都是在离开选歌界面才修改：回到主页、返回曲包页面、进入游玩页面。
    当用户在选歌界面切换难度之后，所有的分组都会折叠。
    当用户在选歌界面切换分组之后，所有新的分组都会折叠。
    当用户在选歌界面切换排序之后，所有分组保持切换之前的展开状态。
    排序有默认排序，有评分的大于可以玩但没用评分的大于不可以玩的
 */
class BasePageData{
    playername = "";            // 玩家昵称
    charId = "2u";              // 玩家选择的角色
    type = "offline";           // 登陆状态
    language = "en";            // 语言
    score = 0;                  // 玩家潜力值
    level = 0;                  // 玩家等级
    fragments = 0;              // 残片数量
    memories = 0;               // 记忆源点数量
    bgvolume = 0.5;             // 背景音乐声音
    pack_json_file = "";        // 全局变量曲包信息
    song_json_file = "";        // 全局变量歌曲信息
    pack_shower = null;         // 曲包界面的类
    song_shower = null;         // 选歌界面的类
    choose_SAC = null;          // 选择排序方式和分组方式的类
    now_selected_song_id = 0;   // 当前选择的歌曲
    now_selected_dif = 0;       // 当前选择的难度
    now_selected_pack = 0;      // 当前选择的曲包 -3f -2a0 -1a1 0base 1 2 这部分应该是曲包id 而不是数字??可能此变量用不上
    now_sort_method = 3;        // 当前排序的方法
    now_classify_method = 0;    // 当前分组的方法
    song_list = [];             // 显示的歌曲列表
    song_previewer = null;      // 背景音乐
    select_page_bg = null;      // 背景图片
    song_list_json_reader = null;   // jsonReader
    pack_id = "";               // 当前的曲包
    constructor(){}
}
var base_page_data = new BasePageData();
var first = true;
function bodyfirstclicked(){  // 进入点击
    if(first){
        setbuttonpre(); // 此函数在topbar.js
        document.getElementById("container").style.visibility = "visible";
        shutter_leave();
        setTimeout(function(){
            bgMusicInit();  // 背景音乐初始化
        },1000);
        first = false;
    }
}
function pageinit(){
    // 界面加载完成之后调用 界面信息初始化
    localStorageDataCheck();                        // 本地数据库基本值确认
    localStorageDataInit();                         // 此界面用的所有本地数据库信息初始化
    pageDataInit();                                 // 此界面用的所有数据初始化
    SPJsonInit();                                   // 读取songlist和packlist
    bgImgInit();                                    // 背景图片初始化
    // packDataUpdate();                               // 对基础packdata加载playerdata里面的数据 不应该在此处设置
    buttonInit(base_page_data.language);            // 提示按钮初始化
    topbarinit( base_page_data.charId,
                base_page_data.playername,
                base_page_data.type,
                base_page_data.language,
                base_page_data.score,
                base_page_data.level,
                base_page_data.fragments,
                base_page_data.memories);           // 顶部条初始化
    initPackOrSong();                               // 确定是曲包界面还是歌曲界面
    elementLanguageInit(base_page_data.language, "selectPage"); // 文字
}
function localStorageDataInit(){
    // 此界面用的所有本地数据库信息初始化
    let save_json = new SaveJson(0);
    if(window.localStorage.getItem("selectsong")==null){
        save_json.put("selectsong",save_msg);
    }
    if(window.localStorage.getItem("packchoose")==null){
        save_json.put("packchoose", pack_data_init);
    }
    if(window.localStorage.getItem("packstate")==null){
        save_json.put("packstate", last_pack_state);
    }
    if(window.localStorage.getItem("PoS")==null){
        window.localStorage.setItem("PoS", "pack");
    }
    if(window.localStorage.getItem("dif")==null){
        window.localStorage.setItem("dif", 0);
    }
    if(window.localStorage.getItem("packdata")==null){
        let savePackData = new SavePackData();
        savePackData.createPackJson_check();
    }
    if(window.localStorage.getItem("playerdata")==null){
        save_json.put("playerdata", []);
    }
}
function packDataUpdate(){
    // 对基础packdata加载playerdata里面的数据 不应该在这里更新！！！
    if(base_page_data.song_json_file==""||base_page_data.pack_json_file==""){
        setTimeout(function(){
            packDataUpdate();
        }, 50);
        return;
    }
    let save_json = new SaveJson(0);
    let pack_data = save_json.get("packdata");
    let player_data = save_json.get("playerdata");
    for(let i=0;i<player_data.length;i++){
        for(let j=0;j<base_page_data.song_json_file["songs"].length;j++){
            if(base_page_data.song_json_file["songs"][j]["id"]==player_data[i]["song_id"]){
                let set = base_page_data.song_json_file["songs"][j]["set"];
                let clear_type = player_data[i]["cleartype"];
                if(clear_type>=1&&clear_type<=5){
                    pack_data[set]["dif"][player_data[i]["dif"]]["clr"]++;
                }
                if(clear_type>=4&&clear_type<=5){
                    pack_data[set]["dif"][player_data[i]["dif"]]["frpm"]++;
                }
                console.log(set);
            }
        }
    }
    save_json.put("packdata", pack_data);
}
function pageDataInit(){
    // 此界面用的所有数据初始化
    base_page_data.playername = window.localStorage.getItem("playername");
    base_page_data.charId = window.localStorage.getItem("charid");
    base_page_data.type = window.localStorage.getItem("online");
    base_page_data.language = window.localStorage.getItem("language");
    base_page_data.score = window.localStorage.getItem("score");
    base_page_data.level = window.localStorage.getItem("level");
    base_page_data.fragments = window.localStorage.getItem("fragments");
    base_page_data.memories = window.localStorage.getItem("memories");
    base_page_data.now_selected_dif = window.localStorage.getItem("dif");
    let sj = new SaveJson(0);
    let msg = sj.get("packstate");
    base_page_data.now_sort_method = msg["sort_method"];
    base_page_data.now_classify_method = msg["classify_method"];
    base_page_data.now_selected_pack = msg["pack"];
    msg["song_list_y"] = 100000;
    sj.put("packstate", msg);
}
function bgMusicEleIznit(){
    // 背景音乐组件初始化
    base_page_data.song_previewer = new SongPreviewer("bgaudio");
}
function bgMusicInit(){
    base_page_data.song_previewer = new SongPreviewer("bgaudio");
    let save_json = new SaveJson(0);
    let music_msg = save_json.get("selectsong");
    base_page_data.song_previewer.setSongByName(
        music_msg.idx,
        music_msg.remote_dl,
        music_msg.begin_time,
        music_msg.end_time,
        music_msg.pack);
    let pack_or_song = window.localStorage.getItem("PoS");
    if(pack_or_song == "song") base_page_data.song_shower.setSongPreviewer(base_page_data.song_previewer);  // 传入
}
function bgImgInit(){
    // 背景图片初始化
    base_page_data.select_page_bg = new SelectPageBg(document.getElementById("page_bg_1"), document.getElementById("containerbottomshadow"), document.getElementById("page_bg_2"));
    let save_json = new SaveJson(0);
    let music_msg = save_json.get("selectsong");
    base_page_data.select_page_bg.bgTo(music_msg.type);
}
function buttonInit(language){
    // 提示按钮初始化
    if(language=="zh-Hans"){
        document.getElementById("remind").innerHTML = "点击以进入";
        document.getElementById("appname").innerHTML = "选择一首歌曲";
    }else if(language=="en"){
        document.getElementById("remind").innerHTML = "Click to Enter";
        document.getElementById("appname").innerHTML = "Select a Song";
    }
}
function initPackOrSong(){
    // 确定是曲包界面还是歌曲界面
    if(base_page_data.song_json_file==""||base_page_data.pack_json_file==""){
        setTimeout(function(){
            initPackOrSong();
        }, 100);
        return;
    }
    let pack_or_song = window.localStorage.getItem("PoS");
    let sj = new SaveJson(0);
    let msg = sj.get("selectsong");
    let pack_id = msg["pack"];
    let index = "single";
    for(let i=0;i<base_page_data.pack_json_file["packs"].length;i++){
        if(pack_id == base_page_data.pack_json_file["packs"][i]["id"]){
            index = i;
            break;
        }
    }
    if(pack_or_song == "pack"){
        songPackInit(true);             // 曲包界面初始化
    }else{
        difClick(base_page_data.now_selected_dif);  // 选择难度按钮的初始化
        songPackMsgUpdate(index);            // 更新曲包信息
        songListInit(pack_id, true);
    }
}
function packToSong(type, index){
    // 点击曲包之后去选歌界面
    // 检查曲包是否相同 相同则不需要切换音乐
    // 不相同则切换音乐
    // 滚动到指定的位置
    document.getElementById("songspackshowermain").style.pointerEvents = "none";
    window.localStorage.setItem("PoS", "song");
    document.getElementById("songspackshowermain").style.animationName = "pack_shower_leave";
    setTimeout(function(){
        document.getElementById("songspackmsg").style.pointerEvents = "all";
        document.getElementById("songspackshowermain").style.display = "none";
        base_page_data.pack_shower.remove();
    }, 300);
    difClick(base_page_data.now_selected_dif);  // 选择难度按钮的初始化
    songPackMsgUpdate(index);            // 更新曲包信息
    songListInit(base_page_data.pack_json_file["packs"][index]["id"], false);
    // setTimeout(songPackInit, 500);  // 测试
}
function songToPack(){
    // 点击之后返回选择曲包界面
    // 将部分数据存入本地数据库(也可能没有)
    document.getElementById("songspackmsg").style.pointerEvents = "none";
    window.localStorage.setItem("PoS", "pack");
    document.getElementById("songsshower").style.animationName = "songsshower_leave";
    document.getElementById("songspackmsg").style.animationName = "songspackmsg_leave";
    base_page_data.song_shower.showerLeaveAnimation();
    setTimeout(function(){
        document.getElementById("songspackshowermain").style.pointerEvents = "all";
        document.getElementById("songsshower").style.display = "none";
        document.getElementById("songslistmain").style.display = "none";
        document.getElementById("songspackmsg").style.display = "none";
        base_page_data.song_shower.remove();
        base_page_data.choose_SAC.remove();
    }, 300);
    let audio_0 = new ClickAudio("../resources/audio/item_click.wav");
    let audio_1 = new ClickAudio("../resources/audio/menu_in.wav", 0.9);
    songPackInit(false);
}
function songPackMsgUpdate(pack_index){
    // 选择歌曲时的显示曲包信息的组件
    let dif = base_page_data.now_selected_dif;
    if(pack_index=="single"){
        document.getElementById("packmsgP").innerHTML = "SONGS";
    }else{
        document.getElementById("packmsgP").innerHTML = "PACK";
        let amount = base_page_data.pack_json_file["packs"].length + 1;
        let now_pack = pack_index + 2;
        let name = base_page_data.pack_json_file["packs"][pack_index]["name_localized"]["en"];
        let id = base_page_data.pack_json_file["packs"][pack_index]["id"];
        let sj = new SaveJson(0);
        let pack_data = sj.get("packdata");
        let all = pack_data[id]["dif"][base_page_data.now_selected_dif]["all"];
        let clr = pack_data[id]["dif"][base_page_data.now_selected_dif]["clr"];
        let frpm = pack_data[id]["dif"][base_page_data.now_selected_dif]["frpm"];
        document.getElementById("packmsgN").innerHTML = name;
        document.getElementById("packmsgPOS").innerHTML = now_pack.toString() + "/" + amount.toString();
        document.getElementById("packmsgFA").innerHTML = frpm.toString();
        document.getElementById("packmsgCA").innerHTML = clr.toString();
        document.getElementById("packmsgAA").innerHTML = "/" + all.toString();
    }
}
function SPJsonInit(){
    // songlist和packlist导入
    let json_path_pack = "../resources/songs/packlist.json";
    let jsonreader_pack = new jsonReader(json_path_pack);
    let timer_0 = setInterval(function(){
        if(jsonreader_pack.onready()){
            clearInterval(timer_0);
            base_page_data.pack_json_file = jsonreader_pack.backJson();
        }
    }, 100);
    let json_path_song = "../resources/songs/songlist.json";
    base_page_data.song_list_json_reader = new jsonReader(json_path_song);
    let timer_1 = setInterval(function(){
        if(base_page_data.song_list_json_reader.onready()){
            clearInterval(timer_1);
            base_page_data.song_json_file = base_page_data.song_list_json_reader.backJson();
        }
    }, 100);
}
function songPackInit(main){
    // 曲包界面初始化
    if(base_page_data.pack_json_file==""){
        setTimeout(function(){
            songPackInit(main);
        }, 100);
        return;
    }
    document.getElementById("songspackshowermain").style.display = "block";
    if(!main) document.getElementById("songspackshowermain").style.animationName = "pack_shower_enter";
    base_page_data.pack_shower = new PackShower(
        "songspackshower", 
        "div", 
        "songspackshowermain", 
        base_page_data.now_selected_dif);
    base_page_data.pack_shower.packShowerInit(base_page_data.pack_json_file);
    let sj = new SaveJson(0);
    let msg = sj.get("packstate");
    let sp = msg["pack"];
    if(sp!="") base_page_data.pack_shower.scrollToElement(sp);
}
function songListInit(pack_id, main){
    // 选歌界面初始化
    // 防止直接进入时json没有加载完成
    // 如果是dif 则需要计算展开情况
    if(base_page_data.song_json_file==""){
        setTimeout(function(){
            songListInit(pack_id, main);
        }, 100);
        return;
    }
    base_page_data.now_selected_pack = pack_id;
    // 进入动画设置
    document.getElementById("songspackmsg").style.display = "block";
    document.getElementById("songsshower").style.display = "block";
    document.getElementById("songslistmain").style.display = "block";
    if(!main){
        document.getElementById("songsshower").style.animationName = "songsshower_enter";
        document.getElementById("songspackmsg").style.animationName = "songspackmsg_enter";
    }
    // 获取显示曲包下的所有音乐
    base_page_data.song_list = base_page_data.song_list_json_reader.compare(["songs", "set"], pack_id);
    // 设置歌曲展示器
    base_page_data.song_shower = new SongShower(
        "songslist", 
        "div", 
        "songslistmain", 
        base_page_data.song_list, 
        base_page_data.song_json_file);
    base_page_data.song_shower.setDif(base_page_data.now_selected_dif);
    base_page_data.song_shower.setSortMethod(base_page_data.now_sort_method);
    base_page_data.song_shower.setClassifyMethod(base_page_data.now_classify_method);
    base_page_data.song_shower.updateShower();
    if(!main||main=="dif"||main=="update") base_page_data.song_shower.setSongPreviewer(base_page_data.song_previewer);  // 传入
    base_page_data.song_shower.selected_song_shower.select_page_bg = base_page_data.select_page_bg;
    // 设置分组排序选择器
    base_page_data.choose_SAC = new ChooseSAC(
        "sort_and_classify",
        "div",
        "songsshower",
        base_page_data.now_sort_method,
        base_page_data.now_classify_method,
        base_page_data.language,
        base_page_data.song_shower);
    // 设置背景音乐
    let sj = new SaveJson(0);
    let msg = sj.get("packchoose");
    for(let i=0;i<msg["packs"].length;i++){
        if(msg["packs"][i]["id"]==pack_id){
            if(!main||main=="dif"||main=="update"){
                base_page_data.song_previewer.setSongByName(
                    msg["packs"][i]["song"]["idx"],
                    msg["packs"][i]["song"]["remote_dl"],
                    msg["packs"][i]["song"]["begin_time"],
                    msg["packs"][i]["song"]["end_time"],
                    msg["packs"][i]["id"]
                )
            };
            // 存入当前选择的音乐
            let save = sj.get("selectsong");
            if(save["idx"] != msg["packs"][i]["song"]["idx"]){
                save["idx"] = msg["packs"][i]["song"]["idx"];
                save["remote_dl"] = msg["packs"][i]["song"]["remote_dl"];
                save["begin_time"] = msg["packs"][i]["song"]["begin_time"];
                save["end_time"] = msg["packs"][i]["song"]["end_time"];
                save["pack"] = msg["packs"][i]["id"];
                for(let j=0;j<base_page_data.song_json_file["songs"].length;j++){
                    if(base_page_data.song_json_file["songs"][i]["id"]==msg["packs"][i]["song"]["idx"]){
                        save["type"] = base_page_data.song_json_file["songs"][i]["bg"];
                        break;
                    }
                }
            }
            sj.put("selectsong", save);
            break;
        }
    }
    // 判断分组选择器的展开情况 展开选择的歌曲
    msg = sj.get("packstate");
    if(msg["pack"]==pack_id){
        if(msg["classify_method"]==base_page_data.now_classify_method&&msg["sort_method"]==base_page_data.now_sort_method){
            // 中间没有切换过曲包 排序和分组方式如果没有改变 按照group_show_index对其进行展开 而且移动的位置不发生改变 song_list_y
            // 如果是切换难度
            if(main=="dif"){
                // 只展开选择的歌曲的分组
                msg["group_show_index"] = [];
                msg["song_list_y"] = 100000;
                sj.put("packstate", msg);       // 移动到此处是因为之后不再是初始化了
                let ss = sj.get("selectsong");
                base_page_data.song_shower.showSongCellBySongId(ss["idx"]);
                base_page_data.song_shower.scrollToBySongId(ss["idx"]);
            }else{
                for(let i=0;i<msg["group_show_index"].length;i++){
                    base_page_data.song_shower.showSongCellByGroupName(msg["group_show_index"][i]);
                }
                let ss = sj.get("selectsong");
                if(msg["song_list_y"] == 100000){
                    base_page_data.song_shower.showSongCellBySongId(ss["idx"]);
                    base_page_data.song_shower.scrollToBySongId(ss["idx"]);
                }else base_page_data.song_shower.scrollToByPos(msg["song_list_y"]);
            }
        }else if(msg["classify_method"]!=base_page_data.now_classify_method&&msg["sort_method"]==base_page_data.now_sort_method){
            // 没有切换曲包 但是改变了分组方式 说明是在同一个曲包下选择不同的分组 此时不展开任何曲包 并且初始化展开列表
            msg["group_show_index"] = [];
            msg["song_list_y"] = 100000;
            msg["classify_method"]=base_page_data.now_classify_method;
            sj.put("packstate", msg);       // 移动到此处是因为之后不再是初始化了
        }else if(msg["classify_method"]==base_page_data.now_classify_method&&msg["sort_method"]!=base_page_data.now_sort_method){
            // 没有切换曲包 但是改变了排序方式 说明是在同一个曲包下选择不同的排序 此时展开曲包不变 需要将选择的歌曲展示
            for(let i=0;i<msg["group_show_index"].length;i++){
                base_page_data.song_shower.showSongCellByGroupName(msg["group_show_index"][i]);
            }
            msg["sort_method"]=base_page_data.now_sort_method;
            sj.put("packstate", msg);       // 移动到此处是因为之后不再是初始化了
            let ss = sj.get("selectsong");
            base_page_data.song_shower.showSongCellBySongId(ss["idx"]);
            base_page_data.song_shower.scrollToBySongId(ss["idx"]);
        }else{
            // 没有切换曲包 但是两者都改变了 理论上不存在 初始化
            msg["group_show_index"] = [];
            msg["sort_method"]=base_page_data.now_sort_method;
            msg["classify_method"]=base_page_data.now_classify_method;
            msg["song_list_y"] = 100000;
            sj.put("packstate", msg);       // 移动到此处是因为之后不再是初始化了
        }
    }else{
        // 曲包不相同 则初始化 展开歌曲
        // console.log("不同");
        msg["pack"] = pack_id;
        msg["group_show_index"] = [];
        msg["song_list_y"] = 100000;
        sj.put("packstate", msg);       // 移动到此处是因为之后不再是初始化了
        let ss = sj.get("selectsong");
        base_page_data.song_shower.showSongCellBySongId(ss["idx"]);
        base_page_data.song_shower.scrollToBySongId(ss["idx"]);
    }
    // 模拟点击选择的歌曲
    let ss = sj.get("selectsong");
    base_page_data.song_shower.selectSongByIdx(ss["idx"]);

}
function difClick(dif){
    // 选择难度按钮 点击或者是初始化
    if(dif=="byd"){
        // 特殊情况 曲包没有byd歌曲
        base_page_data.now_selected_dif = 2;
        localStorage.setItem("dif", 2);
        document.getElementById("diftabimg" + base_page_data.now_selected_dif.toString()).style.backgroundImage = "url('../resources/img/difficulty_selector_" + base_page_data.now_selected_dif.toString() + "_selected.png')";
        let sj = new SaveJson(0);       // 获得选择曲包的信息
        let msg = sj.get("packstate");
        msg["dif"] = 2;
        if(msg["pack"]!="single")
                for(let i=0;i<base_page_data.pack_json_file["packs"].length;i++)
                    if(base_page_data.now_selected_pack==base_page_data.pack_json_file["packs"][i]["id"]) songPackMsgUpdate(i);     // 修改曲包选择器的信息
        else songPackMsgUpdate("single");     // 修改曲包选择器的信息
        sj.put("packstate", msg);
    }else{
        if(dif!=base_page_data.now_selected_dif){
            localStorage.setItem("dif", dif);
            document.getElementById("diftabimg" + base_page_data.now_selected_dif.toString()).style.backgroundImage = "url('../resources/img/difficulty_selector_" + base_page_data.now_selected_dif.toString() + ".png')";
            document.getElementById("diftabimg" + dif.toString()).style.backgroundImage = "url('../resources/img/difficulty_selector_" + dif.toString() + "_selected.png')";
            base_page_data.now_selected_dif = dif;
            base_page_data.song_shower.remove();
            base_page_data.choose_SAC.remove();
            base_page_data.song_shower.scrollDelete();
            let sj = new SaveJson(0);       // 获得选择曲包的信息
            let msg = sj.get("packstate");
            songListInit(msg["pack"], "dif");
            if(msg["pack"]!="single")
                for(let i=0;i<base_page_data.pack_json_file["packs"].length;i++)
                    if(msg["pack"]==base_page_data.pack_json_file["packs"][i]["id"]) songPackMsgUpdate(i);     // 修改曲包选择器的信息
            else songPackMsgUpdate("single");     // 修改曲包选择器的信息
            console.log(msg["pack"]);
            // 更改曲包难度
            msg["dif"] = dif;
            sj.put("packstate", msg);
            let audio_0 = new ClickAudio("../resources/audio/item_click.wav");
            let audio_1 = new ClickAudio("../resources/audio/menu_in.wav");
        }else{
            document.getElementById("diftabimg" + base_page_data.now_selected_dif.toString()).style.backgroundImage = "url('../resources/img/difficulty_selector_" + base_page_data.now_selected_dif.toString() + "_selected.png')";
        }
    }
}
function songListUpdate(){
    // 更新排序和分组的方式
    base_page_data.song_shower.remove();
    base_page_data.choose_SAC.remove();
    base_page_data.song_shower.scrollDelete();
    let sj = new SaveJson(0);       // 获得选择曲包的信息
    let msg = sj.get("packstate");
    songListInit(msg["pack"], "update");
}
function gotoMainPage(){
    // 返回主页
    shutter_show();
	setTimeout(function(){
        let url = "mainPage.html";
        window.location.href = url;
    },1500);
}