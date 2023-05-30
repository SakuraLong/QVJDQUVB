var charID = "";
var nowSelected = -1;
var headerFirst = true;
var charamount = 0;//角色总数
var toplanguage = "";
var charjson = "";
var header_scroll = null;
var frag_prompt = null;
var setting_json_base = {
    "gameplay":{
        "pure":0,
        "speed":1.0,
        "skill":0,
        "key":["A", "S", "C", "N", "K", "L"]
    },
    "audio":{
        "earphone":{
            "volume": 50,
            "offset":0
        },
        "bluetooth":{
            "volume": 50,
            "offset":0
        },
        "type":0
    },
    "visual":{
        "color":0,
        "frpm":1,
        "lepos":0,
        "low":0,
        "touch":0
    }
};
/*```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````*/
var pure=0;//纯粹：0:关闭,1:开启
var pure_option=["关闭","开启"];
var note_flow_rate=4;//音符流速，1-6.5
var potential_display=0;//潜力值显示：0:关闭,1:开启
var potential_display_option=["关闭","开启"];
var skill_display=1;//技能显示：0:关闭,1:开启
var skill_display_option=["关闭","开启"];
var sound_bluetooth=50;//音效音量：0-100%;蓝牙模式
var offset_bluetooth=0;//偏移率：-1000-1000；蓝牙模式
var sound_playback=0;//音效音量：0-100%;普通模式
var offset_playback=0;//偏移率：-1000-1000；普通模式
var audio_preset=0;//音频预设，0：普通模式 1：蓝牙模式
var color_sup=0;//色彩辅助，0或1，0:关闭,1:开启
var color_sup_option=["关闭","开启"];
var FRorPM=0;//FR/PM指示灯 0：关闭 1：界面顶端 2：连击数量
var FRorPM_option=["关闭","界面顶端","连击数量"];
var early_late_pos=0;//0:界面中央 1：界面顶端 2：界面底部
var early_late_pos_option=["界面中央","界面顶端","界面底部"];
var low_performance=0;//低性能模式 0：关闭 1：开启
var low_performance_option=["关闭","开启"];
var touch_display=0;//触控显示 0：关闭 1：开启
var touch_display_option=["关闭","开启"];
var settimer = null;
// var window={};
var note_flow_rate_judge_l=1;
var note_flow_rate_judge_r=1;
var soundset_judge_l=1;
var soundset_judge_r=1;
var offset_judge_l=1;
var offset_judge_r=1;
var note_flow_rate_count_l=0;
var note_flow_rate_count_r=0;
var offsettosound_judge_bluetooth=1;
var offsettosound_judge_playback=1;
var timerqaq=null;
var keybutton_selected=["A","S","C","N","K","L"];
var keybutton_isselecting=[0,0,0,0,0,0];
var keybutton_isselected=[1,0,1,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,1,0,0,0,0,0,0,0];
var selected_button;
/*```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````*/
function topbarinit(charId, playername, type, language, score, level, fragments, memories){
    // console.log("toplanguage = " + language);
    settingDataInit();      // 设置数据初始化
    toplanguage = language;
    charID = charId;
    elementLanguageInit(language, "topbar");
    charjsoninit(charId, playername, type, language, score, level, fragments, memories);
    frag_prompt = new Prompt("frag_prompt", "body", 0,
    base_language_data[language]["topbar"]["fragPrompt"]["title"],
    base_language_data[language]["topbar"]["fragPrompt"]["content"],
    base_language_data[language]["topbar"]["fragPrompt"]["answer"]);
    memo_prompt = new Prompt("memo_prompt", "body", 0,
    base_language_data[language]["topbar"]["memoPrompt"]["title"],
    base_language_data[language]["topbar"]["memoPrompt"]["content"],
    base_language_data[language]["topbar"]["memoPrompt"]["answer"]);
}
function settingDataInit(){
    // 设置数据初始化
    let sj = new SaveJson(0);
    let msg = sj.get("settings");
    if(msg==null) sj.put("settings", setting_json_base);
}
function getSettingData(){
    // 获取设置数据
    let sj = new SaveJson(0);
    let msg = sj.get("settings");
    pure = msg["gameplay"]["pure"];
    note_flow_rate = msg["gameplay"]["speed"];
    skill_display = msg["gameplay"]["skill"];
    sound_bluetooth = msg["audio"]["bluetooth"]["volume"];//音效音量：0-100%;蓝牙模式
    offset_bluetooth = msg["audio"]["bluetooth"]["offset"];//偏移率：-1000-1000；蓝牙模式
    sound_playback = msg["audio"]["earphone"]["volume"];//音效音量：0-100%;普通模式
    offset_playback = msg["audio"]["earphone"]["offset"];//偏移率：-1000-1000；普通模式
    audio_preset = msg["audio"]["type"];//音频预设，0：普通模式 1：蓝牙模式
    color_sup = msg["visual"]["color"];//色彩辅助，0或1，0:关闭,1:开启
    FRorPM = msg["visual"]["frpm"];
    early_late_pos = msg["visual"]["elpos"];
    low_performance = msg["visual"]["low"];
    touch_display = msg["visual"]["touch"];
    keybutton_selected = msg["gameplay"]["key"];
}
function setSettingData(){
    let sj = new SaveJson(0);
    let msg = setting_json_base;
    msg["gameplay"]["pure"] = pure;
    msg["gameplay"]["speed"] = note_flow_rate;
    msg["gameplay"]["skill"] = skill_display;
    msg["audio"]["bluetooth"]["volume"] = sound_bluetooth;//音效音量：0-100%;蓝牙模式
    msg["audio"]["bluetooth"]["offset"] = offset_bluetooth;//偏移率：-1000-1000；蓝牙模式
    msg["audio"]["earphone"]["volume"] = sound_playback;//音效音量：0-100%;普通模式
    msg["audio"]["earphone"]["offset"] = offset_playback;//偏移率：-1000-1000；普通模式
    msg["audio"]["type"] = audio_preset;//音频预设，0：普通模式 1：蓝牙模式
    msg["visual"]["color"] = color_sup;//色彩辅助，0或1，0:关闭,1:开启
    msg["visual"]["frpm"] = FRorPM;
    msg["visual"]["elpos"] = early_late_pos;
    msg["visual"]["low"] = low_performance;
    msg["visual"]["touch"] = touch_display;
    msg["gameplay"]["key"] = keybutton_selected;
    sj.put("settings", msg);
}
function charjsoninit(charId, playername, type, language, score, level, fragments, memories){
    let json_path = "../resources/char/charlist.json";
    jsonreader_song = new jsonReader(json_path);
    let timer_0 = setInterval(function(){
        if(jsonreader_song.onready()){
            clearInterval(timer_0);
            charjson = jsonreader_song.backJson();
            charinit(charId);
            playernameinit(playername, type, language, level);
            SFMinit(language);
            amountinit(type, score, fragments, memories);
            // console.log(charjson);
        }
    }, 20);
}
function fragmentsAdd(amount){
    // 残片增加
    document.getElementById("fragmentsamount_").setAttribute("data-text", "+"+amount);
    document.getElementById("fragmentsamount_").style.display = "block";
    document.getElementById("fragmentsamount_").innerHTML = document.getElementById("fragmentsamount").innerHTML;
    document.getElementById("fragmentsamount_").style.animationName = "frag_enter";
    document.getElementById("fragmentsamount_").onanimationend = function(){
        document.getElementById("fragmentsamount_").style.animationName = "frag_leave";
        document.getElementById("fragmentsamount").style.display = "none";
        document.getElementById("fragmentsamount").innerHTML = parseInt(document.getElementById("fragmentsamount_").innerHTML) + amount;
        document.getElementById("fragmentsamount_").onanimationend = function(){
            document.getElementById("fragmentsamount_").style.display = "none";
            document.getElementById("fragmentsamount").style.display = "block";
            document.getElementById("fragmentsamount").style.animationName = "frag_enter";
        }
    }
    window.localStorage.setItem("fragments", parseInt(window.localStorage.getItem("fragments")) + amount);
}
function charinit(charId){
    var charPath = "../resources/char/" + charId.toString() + "_icon.png";
    document.getElementById("header").style.backgroundImage="url(" + charPath + ")";
    for(let i=0;i<charjson["char"].length;i++){
        if(charjson["char"][i]["idx"]==charId){
            if(document.getElementById("charshowerimg")!=null){
                document.getElementById("charshowerimg").style.backgroundPositionY = charjson["char"][i]["bgy"];
            }
            break;
        }
    }
    // document.getElementById("header").style.backgroundImage="url('../resources/char/1_icon.png')";
}
function playernameinit(playername, type, language, level){
    if(type == "offline"){
        document.getElementById("onlineGrid").style.display = "none";
        if(language == "en"){
            document.getElementById("guest").innerHTML = "GUEST";
        }else if(language == "zh-Hans"){
            document.getElementById("guest").innerHTML = "游客";
            document.getElementById("guest").style.fontWeight = "700";
        }
        document.getElementById("guestmain").style.visibility = "visible";
    }else if(type == "online"){
        document.getElementById("onlineGrid").style.display = "grid";
        document.getElementById("playername").innerHTML = playername;
        if(level!=0)document.getElementById("playerlevelbg").style.backgroundImage = "url('../resources/img/course/banner/" + level + ".png')";
        if(level>=7){
            document.getElementById("playername").style.color = "rgb(255, 255, 255)";
        }else{
            document.getElementById("playername").style.color = "rgb(0, 0, 0)";
        }
        document.getElementById("guestmain").style.visibility = "hidden";
    }
}
function SFMinit(language){
    // if(language == "en"){
    //     document.getElementById("settingtext").innerHTML = "Settings";
    //     document.getElementById("settingtext").setAttribute("data-text", "Settings");
    //     document.getElementById("fragmentstext").innerHTML = "Fragments";
    //     document.getElementById("memoriestext").innerHTML = "Memories";
    // }else if(language == "zh-Hans"){
    //     document.getElementById("settingtext").innerHTML = "设定";
    //     document.getElementById("settingtext").setAttribute("data-text", "设定");
    //     document.getElementById("fragmentstext").innerHTML = "残片";
    //     document.getElementById("memoriestext").innerHTML = "记忆源点";
    // }
}
function amountinit(type, score, fragments, memories){
    if(fragments>=10000&&fragments<=19999){
        fragments -= 9999;
        document.getElementById("fragmentsbga").setAttribute("src", "../resources/layouts/topbar/fragstack-single.png");
    }else if(fragments>=20000){
        fragments -= 19999;
        if(fragments>9999) fragments = 9999;
        document.getElementById("fragmentsbga").setAttribute("src", "../resources/layouts/topbar/fragstack-double.png");
    }
    if(type == "offline"){
        document.getElementById("fragmentsamount").innerHTML = fragments;
        document.getElementById("memoriesamount").innerHTML = "-";
    }else if(type == "online"){
        if(memories>=10000&&memories<=19999){
            memories -= 9999;
            document.getElementById("memoriesbga").setAttribute("src", "../resources/layouts/topbar/fragstack-singleplus.png");
        }else if(memories>=20000){
            memories -= 19999;
            document.getElementById("memoriesbga").setAttribute("src", "../resources/layouts/topbar/fragstack-doubleplus.png");
        }
        document.getElementById("fragmentsamount").innerHTML = fragments;
        document.getElementById("memoriesamount").innerHTML = memories;
        // document.getElementById("playscore").innerHTML = score;
    }
    // score = "13.06";
    if(type == "offline"){
        document.getElementById("onlinescore").style.display = "none";
    }else{
        document.getElementById("onlinescore").style.display = "flex";
        let score_arr = score.split(".");
        document.getElementById("ratingtextm").setAttribute("data-text", score_arr[0] + ".");
        document.getElementById("ratingtextm").innerHTML = score_arr[0] + ".";
        document.getElementById("ratingtexts").setAttribute("data-text", score_arr[1]);
        document.getElementById("ratingtexts").innerHTML = score_arr[1];
        let s = parseFloat(score);
        let src_str = "../resources/img/rating_";
        if(s>=0&&s<=3.49) src_str += "0.png";
        else if(s>=3.50&&s<=6.99) src_str += "1.png";
        else if(s>=7.00&&s<=9.99) src_str += "2.png";
        else if(s>=10.00&&s<=10.99) src_str += "3.png";
        else if(s>=11.00&&s<=11.99) src_str += "4.png";
        else if(s>=12.00&&s<=12.49) src_str += "5.png";
        else if(s>=12.50&&s<=12.99) src_str += "6.png";
        else if(s>=13.00) src_str += "7.png";
        document.getElementById("onlinerateimg").setAttribute("src", src_str);
    }
}
function changeScore(new_score){
    console.log(new_score);
    window.localStorage.setItem("score", new_score);
    setTimeout(function(){
        document.getElementById("ratingtextl").style.animationName = "rating_leave";
        setTimeout(function(){
            let score = new_score.toString();
            let score_arr = score.split(".");
            document.getElementById("ratingtextm").setAttribute("data-text", score_arr[0] + ".");
            document.getElementById("ratingtextm").innerHTML = score_arr[0] + ".";
            document.getElementById("ratingtexts").setAttribute("data-text", score_arr[1]);
            document.getElementById("ratingtexts").innerHTML = score_arr[1];
            let s = parseFloat(score);
            let src_str = "../resources/img/rating_";
            if(s>=0&&s<=3.49) src_str += "0.png";
            else if(s>=3.50&&s<=6.99) src_str += "1.png";
            else if(s>=7.00&&s<=9.99) src_str += "2.png";
            else if(s>=10.00&&s<=10.99) src_str += "3.png";
            else if(s>=11.00&&s<=11.99) src_str += "4.png";
            else if(s>=12.00&&s<=12.49) src_str += "5.png";
            else if(s>=12.50&&s<=12.99) src_str += "6.png";
            else if(s>=13.00) src_str += "7.png";
            document.getElementById("onlinerateimg_score_only").setAttribute("src", src_str);
        }, 800);
        setTimeout(function(){
            document.getElementById("ratingtextl").style.animationName = "rating_enter";
            document.getElementById("onlinerateimg_score_only").style.display = "block";
            document.getElementById("onlinerateimg_score_only").style.animationName = "onlinerateimg_score_only_show";
        },1200);
    }, 800);
}
function charlist(language, charId){
    document.getElementById("charlistdiv").innerHTML = "";
    charamount = charjson["char"].length;
    var charlist = document.getElementById("charlistdiv");
    document.getElementById("chooselabel").style.display = "block";
    document.getElementById("chooselabel").style.animationName = "chooselabel_show";
    if(headerFirst){
        for(var i = 0;i<charjson["char"].length;i++){
            let divauto = document.createElement("div");
            let divautoID = "divauto" + i.toString();
            divauto.setAttribute("id", divautoID);
            divauto.setAttribute("class", "charitem");
            // divauto.style.top = 20*i.toString() + "%";
            document.getElementById("charlistdiv").appendChild(divauto);
        }
    }
    charlistaddelement(language, charId);
}
function charlistaddelement(language, charId){
    if(headerFirst){
        for(var i = 0;i<charjson["char"].length;i++){
            let divautoID = "divauto" + i.toString();
            let imghtml = document.createElement("div");  //存放头像
            imghtml.setAttribute("id", "charitemimg" + i.toString());
            imghtml.setAttribute("class", "charitemimg");
            imghtml.style.backgroundImage = "url('../resources/char/" + charjson["char"][i]["idx"] + "_icon.png')";
            document.getElementById(divautoID).appendChild(imghtml);
            let imgclick = document.createElement("div");  //点击判别器
            imgclick.setAttribute("id", "imgclick" + i.toString());
            imgclick.setAttribute("class", "imgclick");
            imgclick.addEventListener('click', (function(i){
                return function(){
                    charimgclick(i, 0);
                }
               })(i));
            imghtml.appendChild(imgclick);
            let imghtmlbg = document.createElement("div");  //头像选中的背景图片
            imghtmlbg.setAttribute("id", "imghtmlbg" + i.toString());
            imghtmlbg.setAttribute("class", "imghtmlbg");
            imghtmlbg.style.backgroundImage = "url('../resources/img/character_selected.png')";
            document.getElementById(divautoID).appendChild(imghtmlbg);
            let imgbg = document.createElement("div");  //头像选中的前景图片
            imgbg.setAttribute("id", "imgbg" + i.toString());
            imgbg.setAttribute("class", "imgbg");
            imgbg.style.backgroundImage = "url('../resources/img/char_icon_border_white-selected.png')";
            document.getElementById("charitemimg" + i.toString()).appendChild(imgbg);
            if(charjson["char"][i]["namelittle_localized"][language]!=""){
                let charnamel = document.createElement("div");  // 文字描述（小）
                charnamel.setAttribute("id", "charnamel" + i.toString());
                charnamel.setAttribute("class", "charnamel");
                charnamel.innerHTML = charjson["char"][i]["namelittle_localized"][language];
                charnamel.setAttribute("data-text", charjson["char"][i]["namelittle_localized"][language]);
                document.getElementById(divautoID).appendChild(charnamel);
            }
            let charnameb = document.createElement("div");  // 文字描述（大）
            charnameb.setAttribute("id", "charnameb" + i.toString());
            charnameb.setAttribute("class", "charnameb");
            charnameb.setAttribute("data-text", charjson["char"][i]["name_localized"][language]);
            document.getElementById(divautoID).appendChild(charnameb);
            charnameb.innerHTML = charjson["char"][i]["name_localized"][language];
            if(charID==charjson["char"][i]["idx"]){
                charimgclick(i, 0);
            }
        }
        headerFirst = false;
    }else{
        charimgclick(nowSelected, 0);
    }
    // scrollmove(nowSelected);  //滑动条控制位置
}
function headerclick(){
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    topbarsrcollinit();
    charlist(toplanguage, charID);
    // console.log("charID="+charID);
}
function showFragPrompt(){
    let audio = new ClickAudio("../resources/audio/menu_in.wav");
    frag_prompt.show();
}
function showMemoPrompt(){
    // memo_prompt.setLeaveConnection("http://www.baidu.com");
    // memo_prompt.setFontColor("rightAnswer", "red");
    let audio = new ClickAudio("../resources/audio/menu_in.wav");
    memo_prompt.show();
}
function skillclick(){
    //
    // document.getElementById("charitemimg"+nowSelected.toString()).style.animationName = '';
    // document.getElementById("charnameb"+nowSelected.toString()).style.animationName = '';
    // document.getElementById("imghtmlbg"+nowSelected.toString()).style.animationName = '';
    // try{
    //     document.getElementById("charnamel"+nowSelected.toString()).style.animationName = '';
    // }catch(err) {
        
    // }
    // charimgshowani(nowSelected);
}
function getCenterPosition(left, width){
    let win_width = document.body.clientHeight;
    return win_width/2 - width/2 - left;
}
function charimgclick(id, dere){
    // dere 0 1 0:向左 1：向右
    if(!header_scroll.isAllowClick()) return;
    if(nowSelected == id && headerFirst == false) return;
    if(headerFirst == false){
        charimgleaveani(nowSelected);
        document.getElementById("imgbg"+nowSelected.toString()).style.visibility = "hidden";
        document.getElementById("imghtmlbg"+nowSelected.toString()).style.visibility = "hidden";
    }
    nowSelected = id;
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    let cen_pos = getCenterPosition(
        document.getElementById("divauto"+nowSelected.toString()).offsetTop - document.getElementById("divauto"+nowSelected.toString()).parentNode.offsetTop,
        document.getElementById("divauto"+nowSelected.toString()).clientHeight
    )
    header_scroll.moveTo(cen_pos, true);
    // console.log(document.getElementById("charlistdiv").clientHeight);
    document.getElementById("charshowerimg").style.backgroundImage
     = "url('../resources/char/" + charjson["char"][id]["idx"] + ".png')";
    document.getElementById("charshowerimg").style.backgroundPositionY = charjson["char"][id]["bgy"];
    if(dere==0){
        if(document.getElementById("charshowerimg").style.animationName=="charshowerimgmove1"){
            document.getElementById("charshowerimg").style.animationName = "charshowerimgmove2";
        }else{
            document.getElementById("charshowerimg").style.animationName = "charshowerimgmove1";
        }
    }else if(dere==1){
        if(document.getElementById("charshowerimg").style.animationName=="charshowerimgmove1_1"){
            document.getElementById("charshowerimg").style.animationName = "charshowerimgmove2_1";
        }else{
            document.getElementById("charshowerimg").style.animationName = "charshowerimgmove1_1";
        }
    }

    document.getElementById("imgbg"+id.toString()).style.visibility = "visible";
    document.getElementById("imghtmlbg"+id.toString()).style.visibility = "visible";
    charimgshowani(id);
    if(headerFirst == false){
        // scrollclickmove(id);
    }
}
function charimgleaveani(id){
    document.getElementById("charitemimg"+id.toString()).style.animationName = "charshowerimgleave";
    document.getElementById("charitemimg"+id.toString()).style.animationFillMode = "backwards";
    document.getElementById("charnameb"+id.toString()).style.animationName = "charshowernameleave";
    document.getElementById("charnameb"+id.toString()).style.animationFillMode = "backwards";
    document.getElementById("imghtmlbg"+id.toString()).style.animationName = "charshowerimgbgleave";
    document.getElementById("imghtmlbg"+id.toString()).style.animationFillMode = "backwards";
    document.getElementById("imghtmlbg"+id.toString()).style.visibility = "hidden";
    try{
        document.getElementById("charnamel"+id.toString()).style.animationName = "charshowernameleave";
        document.getElementById("charnamel"+id.toString()).style.animationFillMode = "backwards";
    }catch(err) {
        
    }
}
function charimgshowani(id){
    document.getElementById("charitemimg"+id.toString()).style.animationName = "charshowerimgshow";
    document.getElementById("charitemimg"+id.toString()).style.animationFillMode = "forwards";
    document.getElementById("charnameb"+id.toString()).style.animationName = "charshowernameshow";
    document.getElementById("charnameb"+id.toString()).style.animationFillMode = "forwards";
    document.getElementById("imghtmlbg"+id.toString()).style.animationName = "charshowerimgbgshow";
    document.getElementById("imghtmlbg"+id.toString()).style.animationFillMode = "forwards";
    try{
        document.getElementById("charnamel"+id.toString()).style.animationName = "charshowernameshow";
        document.getElementById("charnamel"+id.toString()).style.animationFillMode = "forwards";
    }catch(err) {
        
    }
    // document.getElementById("imghtmlbg"+id.toString()).style.visibility = "hidden";
}
function exitshower(page){  //关闭shower
    header_scroll.delete();
    // console.log(page);
    localStorage.setItem("charid", charjson["char"][nowSelected]["idx"]);
    charID = charjson["char"][nowSelected]["idx"];
    charinit(charjson["char"][nowSelected]["idx"]);
    document.getElementById("chooselabel").style.animationName = "chooselabel_leave";
    document.getElementById("chooselabel").onanimationend = ()=>{
        document.getElementById("chooselabel").onanimationend = "";
        document.getElementById("chooselabel").style.display="none";
        document.getElementById("chooselabel").style.animationName = "";
    }
    window.localStorage.setItem("bgtop", charjson["char"][nowSelected]["top"]);
    if(page=="mainPage"){
        charimginit(charjson["char"][nowSelected]["idx"], nowSelected, charjson["char"][nowSelected]["top"]);//主页专用
    }
    headerFirst = true;
    // 需要传递信息到服务器 改变本地数据库
    let msg = charjson["char"][nowSelected]["idx"];
    if(window.localStorage.getItem("online")=="online"){
        let xml_conn = new ArcaeaXMLConnector("change_char", msg, "POST", fu, null, null);
        xml_conn.send();
    }
}
function fu(msg){
    // console.log(msg);
}
function tolastchar(){
    let click_ = nowSelected - 1;
    if(click_<0) click_ = charamount - 1;
    charimgclick(click_, 1);
}

function tonextchar(){
    let click_ = nowSelected + 1;
    if(click_>=charamount) click_ = 0;
    charimgclick(click_, 0);
}
var settingSelected = 0;
var secsettingSelected = 0;
function settingclick(){
    /*设置按钮点击*/
    let audio = new ClickAudio("../resources/audio/menu_in.wav");
    getSettingData();   // 设置数据导入
    settingSelected = 0;
    secsettingSelected=0;
    // setbuttonpre();//给按钮加功能
    keyboard_init();
    document.getElementById("tabmsg_set_sheer_bot").innerHTML=pure_option[pure];
    if(note_flow_rate==Math.floor(note_flow_rate)){
        document.getElementById("speed").innerHTML=note_flow_rate+".0";
    }
    else{
        document.getElementById("speed").innerHTML=note_flow_rate;
    }
    document.getElementById("tabmsg_set_skill_bot").innerHTML=skill_display_option[skill_display];
    if(audio_preset==0){
        document.getElementById("oneaudio").style.display= "none";
        document.getElementById("anotheraudio").style.display= "block";
        //解决上一个模式的按钮灰色
        if(sound_playback>0&&sound_bluetooth==0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        else if(sound_playback<100&&sound_bluetooth==100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
        if(sound_playback==0&&sound_bluetooth>0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
        }
        else if(sound_playback==100&&sound_bluetooth<100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
        }
        if(offset_playback>-1000&&offset_bluetooth==-1000){
            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        else if(offset_playback<1000&&sound_bluetooth==1000){
            document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
        if(offset_playback==-1000&&offset_bluetooth>-1000){
            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
        }
        else if(offset_playback==1000&&sound_bluetooth<1000){
            document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
        }
        
        // document.getElementById("sound").innerHTML=sound_playback+"%";
        document.getElementById("offset").innerHTML=offset_playback;
        if(offset_playback>100||offset_playback<-100){
            document.getElementById("remindtxt2").style.display="block";
            document.getElementById("remindtxt1").style.display="none";
            document.getElementById("sound").innerHTML=0+"%";
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
            offsettosound_judge_playback=0;
        }
        else{
            document.getElementById("remindtxt1").style.display="block";
            document.getElementById("remindtxt2").style.display="none";
            document.getElementById("sound").innerHTML=sound_playback+"%";
            if(sound_playback==100){
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
            }
            else if(sound_playback==0){
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
            }
            else{
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
            }
        }
    }
    else{
        document.getElementById("oneaudio").style.display= "block";
        document.getElementById("anotheraudio").style.display= "none";
        //解决上一个模式的按钮灰色
        if(sound_playback==0&&sound_bluetooth>0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        else if(sound_playback==100&&sound_bluetooth<100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
        if(sound_playback>0&&sound_bluetooth==0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
        }
        else if(sound_playback<100&&sound_bluetooth==100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
        }
        if(offset_playback==-1000&&offset_bluetooth>-1000){
            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        else if(offset_playback==1000&&sound_bluetooth<1000){
            document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
        if(offset_playback>-1000&&offset_bluetooth==-1000){
            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
        }
        else if(offset_playback<1000&&sound_bluetooth==1000){
            document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
        }
        // document.getElementById("sound").innerHTML=sound_bluetooth+"%";
        document.getElementById("offset").innerHTML=offset_bluetooth;
        if(offset_bluetooth>100||offset_bluetooth<-100){
            document.getElementById("remindtxt2").style.display="block";
            document.getElementById("remindtxt1").style.display="none";
            document.getElementById("sound").innerHTML=0+"%";
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
            offsettosound_judge_bluetooth=0;
        }
        else{
            document.getElementById("remindtxt1").style.display="block";
            document.getElementById("remindtxt2").style.display="none";
            document.getElementById("sound").innerHTML=sound_bluetooth+"%";
            if(sound_bluetooth==100){
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
            }
            else if(sound_bluetooth==0){
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
            }
            else{
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
            }
        }
    }
    document.getElementById("tabmsg_set-colorsup_bot").innerHTML=color_sup_option[color_sup];
    document.getElementById("tabmsg_set_FRPM_bot").innerHTML= FRorPM_option[FRorPM];
    if(early_late_pos==0){
        document.getElementById("tabmsg_set_eaorla_bot").innerHTML= early_late_pos_option[0];
    }
    else if(early_late_pos==1)
    {
        document.getElementById("tabmsg_set_eaorla_bot").innerHTML= early_late_pos_option[1];
    }
    else{
        document.getElementById("tabmsg_set_eaorla_bot").innerHTML=early_late_pos_option[2];
    }
    if(low_performance==0){
        document.getElementById("tabmsg_set_mode_bot").innerHTML=low_performance_option[0];
    }
    else{
        document.getElementById("tabmsg_set_mode_bot").innerHTML=low_performance_option[1];
    }
    if(touch_display==0){
        document.getElementById("tabmsg_set_touch_bot").innerHTML= touch_display_option[0];
    }
    else{
        document.getElementById("tabmsg_set_touch_bot").innerHTML=touch_display_option[1];
    }
    document.getElementById("labell0").style.visibility = "visible";document.getElementById("labell1").style.visibility = "hidden";
    document.getElementById("labelr0").style.visibility = "visible";document.getElementById("labelr1").style.visibility = "hidden";
    document.getElementById("settingpage").style.display = "flex";
    document.getElementById("settingmain0-1").style.display="none";
    document.getElementById("settingmain1-0").style.display="none";
    document.getElementById("settingmain2-0").style.display="none";
    document.getElementById("settingmain2-1").style.display="none";
    document.getElementById("settingmain0-0").style.display="flex";
    document.getElementById("settingmain0-0").style.opacity= "1";
    document.getElementById("settingmain0-0").style.animationName="noname";
    document.getElementById("settingmain0-1").style.animationName="noname";
    document.getElementById("settingmain1-0").style.animationName="noname";
    document.getElementById("settingmain2-0").style.animationName="noname";
    document.getElementById("settingmain2-1").style.animationName="noname";
    document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
    document.getElementById("tabmsgtolast").onclick=null;
    document.getElementById("tabmsgtolast").className="tabmsgtolast_disable";////////////////////////////////////////
    document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R active.png')";
    document.getElementById("tabmsgtonext").onclick=bot_tabmsgclicktonext;
    document.getElementById("tabmsgtonext").className="tabmsgtonext_active";////////////////////////////////////////////////
    document.getElementById("tablabelplay").style.backgroundImage = "url('../resources/img/dialog_v2/Selected-tab_multi.png')";
    document.getElementById("tablabelmusic").style.backgroundImage = "url('../resources/img/dialog_v2/tabs_deselected.png')";
    document.getElementById("tablabelshow").style.backgroundImage = "url('../resources/img/dialog_v2/tabs_deselected.png')";
    
    document.getElementById("tabtolast").onclick=function (e){
        e.stopPropagation();//阻止事件冒泡即可
        tabelementclick(-2);
    }
    document.getElementById("tabtonext").onclick=function (e){
        e.stopPropagation();//阻止事件冒泡即可
        tabelementclick(-3);
    }
    settingpageinit(toplanguage);
    document.getElementById("settingpage").style.animationName = "setting_page_show";
}

function exitsetting(){
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    setSettingData();   // 设置数据保存
    document.getElementById("settingpage").style.animationName = "setting_page_leave";
    setTimeout(function(){document.getElementById("settingpage").style.display = "none";}, 300);
    // document.getElementById("settingpage").style.display = "none";
}

function settingpageinit(language){
    /* setting 界面初始化 */
    tabelementclick(10);
}
function settingwordinit(language){
    /* 文字初始化 */
    // if(language == "en"){
    //     document.getElementById("settingname").innerHTML = "Setting";
    //     document.getElementById("tablabelplay").innerHTML = "Gameplay";
    //     document.getElementById("tablabelmusic").innerHTML = "Music";
    //     document.getElementById("tablabelshow").innerHTML = "Visual";
    //     document.getElementById("exitsetting").innerHTML = "Done";
    // }else if(language == "zh-Hans"){
    //     document.getElementById("settingname").innerHTML = "设定";
    //     document.getElementById("tablabelplay").innerHTML = "玩法";
    //     document.getElementById("tablabelmusic").innerHTML = "音频";
    //     document.getElementById("tablabelshow").innerHTML = "视觉";
    //     document.getElementById("exitsetting").innerHTML = "完成";
    //     /* 加中文内容 */
    // }
}
function volumeset(volume){
    localStorage.setItem("volume", volume);
}
function tabelementclick(item){
    // console.log(item);
    if(item==10){
        // 初始化
        document.getElementById("tablabel").style.left = "201.75px";
    }else if(item==-2){
        // 向左按钮被点击
        if(settingSelected==1) {document.getElementById("settingmain1-0").style.animationName = "settingdivdisapp";secsettingSelected=0;document.getElementById("settingmain0-0").style.animationName = "settingdivapp"}
        else if(settingSelected==1) document.getElementById("tablabelmusic").style.backgroundImage = "url('../resources/img/dialog_v2/tabs_deselected.png')";
        let tmp = settingSelected - 1;
        tabelementclick(tmp);
    }else if(item==-3){
        // 向右按钮被点击
        let tmp = settingSelected + 1;
        tabelementclick(tmp);
    }else if(item==settingSelected) return 0;
    else if(item<0||item>2) return 0;
    else{
        // console.log("enter1");
        if(item<settingSelected){
            tabmoveanimation(1);
        }else{
            // console.log("enter1");
            tabmoveanimation(0);
        }
        let audio = new ClickAudio("../resources/audio/item_click.wav");
        let temp=settingSelected;
        if(settingSelected==0) document.getElementById("tablabelplay").style.backgroundImage = "url('../resources/img/dialog_v2/tabs_deselected.png')";
        else if(settingSelected==1) document.getElementById("tablabelmusic").style.backgroundImage = "url('../resources/img/dialog_v2/tabs_deselected.png')";
        else if(settingSelected==2) document.getElementById("tablabelshow").style.backgroundImage = "url('../resources/img/dialog_v2/tabs_deselected.png')";
        
        settingSelected = item;
        if(settingSelected==0) document.getElementById("tablabelplay").style.backgroundImage = "url('../resources/img/dialog_v2/Selected-tab_multi.png')";
        else if(settingSelected==1) document.getElementById("tablabelmusic").style.backgroundImage = "url('../resources/img/dialog_v2/Selected-tab_multi.png')";
        else if(settingSelected==2) document.getElementById("tablabelshow").style.backgroundImage = "url('../resources/img/dialog_v2/Selected-tab_multi.png')";
        /* 以下写入改变界面内容的函数 边俣*/
        /* settingSeleced此时代表选择哪个界面，0，1，2对应着顺序，第一二三个界面 */
        if(settingSelected==0) {document.getElementById("pagelabell").style.visibility = "visible";document.getElementById("pagelabelr").style.visibility = "visible";}
        else if(settingSelected==1) {document.getElementById("pagelabell").style.visibility = "hidden";document.getElementById("pagelabelr").style.visibility = "hidden";}
        else if(settingSelected==2) {document.getElementById("pagelabell").style.visibility = "visible";document.getElementById("pagelabelr").style.visibility = "visible";}
        else{}
        if(temp==0) {
            if(settingSelected==1&&secsettingSelected==0){
                document.getElementById("settingmain0-0").style.animationName = "settingdivdisapp";
                setTimeout(function() {
                document.getElementById("settingmain1-0").style.opacity= "0";
                document.getElementById("settingmain1-0").style.display= "flex";
                document.getElementById("settingmain1-0").style.animationName = "settingdivapp"; }, 350);
                secsettingSelected=0;
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
                document.getElementById("tabmsgtolast").onclick=null;//禁用左箭头
                document.getElementById("tabmsgtolast").className="tabmsgtolast_disable";
                document.getElementById("tabmsgtolast").onmouseover = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
            };
                document.getElementById("tabmsgtolast").onmouseout = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
            };
                document.getElementById("tabmsgtonext").onmouseover = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
                };
                document.getElementById("tabmsgtonext").onmouseout = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
                };
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
                document.getElementById("tabmsgtonext").onclick=null;//禁用右箭头
                document.getElementById("tabmsgtonext").className="tabmsgtonext_disable";
                document.getElementById("labell0").style.visibility = "hidden";document.getElementById("labell1").style.visibility = "hidden";
                document.getElementById("labelr0").style.visibility = "hidden";document.getElementById("labelr1").style.visibility = "hidden";
                setTimeout(function() {document.getElementById("settingmain0-0").style.display= "none";
                document.getElementById("settingmain0-0").style.opacity= "0"; }, 850);
                
            }
            else if(settingSelected==1&&secsettingSelected==1){
                document.getElementById("settingmain0-1").style.animationName = "settingdivdisapp";
                setTimeout(function() {
                    document.getElementById("settingmain1-0").style.opacity= "0";
                    document.getElementById("settingmain1-0").style.display= "flex";
                    document.getElementById("settingmain1-0").style.animationName = "settingdivapp"; }, 350);
                secsettingSelected=0;
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
                document.getElementById("tabmsgtolast").onclick=null;//禁用左箭头
                document.getElementById("tabmsgtolast").className="tabmsgtolast_disable";
                document.getElementById("tabmsgtolast").onmouseover = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
            };
                document.getElementById("tabmsgtolast").onmouseout = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
            };
                document.getElementById("tabmsgtonext").onmouseover = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
                };
                document.getElementById("tabmsgtonext").onmouseout = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
                };
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
                document.getElementById("tabmsgtonext").onclick=null;//禁用右箭头
                document.getElementById("tabmsgtonext").className="tabmsgtonext_disable";
                document.getElementById("labell0").style.visibility = "hidden";document.getElementById("labell1").style.visibility = "hidden";
                document.getElementById("labelr0").style.visibility = "hidden";document.getElementById("labelr1").style.visibility = "hidden";
                setTimeout(function() {document.getElementById("settingmain0-1").style.display= "none";
                document.getElementById("settingmain0-1").style.opacity= "0"; }, 850);
            }
        }
        else if(temp==1){
            if(settingSelected==0){
                document.getElementById("settingmain1-0").style.animationName = "settingdivdisapp";
                setTimeout(function() {
                    document.getElementById("settingmain0-0").style.opacity= "0";
                    document.getElementById("settingmain0-0").style.display= "flex";
                    document.getElementById("settingmain0-0").style.animationName = "settingdivapp"; }, 350);
                 secsettingSelected=0;
                 document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
                 document.getElementById("tabmsgtolast").onclick=null;//禁用左箭头
                 document.getElementById("tabmsgtolast").className="tabmsgtolast_disable";
                 document.getElementById("tabmsgtolast").onmouseover = function () {
                     document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
                 };
                 document.getElementById("tabmsgtolast").onmouseout = function () {
                     document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
                 };
                 document.getElementById("tabmsgtonext").onmouseover = function () {
                     document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R active_pressed.png')";
                 };
                 document.getElementById("tabmsgtonext").onmouseout = function () {
                     document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R active.png')";
                 };
                 document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R active.png')";
                 document.getElementById("tabmsgtonext").onclick=bot_tabmsgclicktonext;//恢复右箭头
                 document.getElementById("tabmsgtonext").className="tabmsgtonext_active";
                document.getElementById("labell0").style.visibility = "visible";document.getElementById("labell1").style.visibility = "hidden";
                document.getElementById("labelr0").style.visibility = "visible";document.getElementById("labelr1").style.visibility = "hidden";
                setTimeout(function() {document.getElementById("settingmain1-0").style.display= "none";
                document.getElementById("settingmain1-0").style.opacity= "0"; }, 850);
            }
            else if(settingSelected==2){
                document.getElementById("settingmain1-0").style.animationName = "settingdivdisapp";
                setTimeout(function() {
                    document.getElementById("settingmain2-0").style.opacity= "0";
                    document.getElementById("settingmain2-0").style.display= "flex";
                    document.getElementById("settingmain2-0").style.animationName = "settingdivapp"; }, 350);
                secsettingSelected=0;
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
                 document.getElementById("tabmsgtolast").onclick=null;//禁用左箭头
                 document.getElementById("tabmsgtolast").className="tabmsgtolast_disable";
                 document.getElementById("tabmsgtolast").onmouseover = function () {
                     document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
                 };
                 document.getElementById("tabmsgtolast").onmouseout = function () {
                     document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
                 };
                 document.getElementById("tabmsgtonext").onmouseover = function () {
                     document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R active_pressed.png')";
                 };
                 document.getElementById("tabmsgtonext").onmouseout = function () {
                     document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R active.png')";
                 };
                 document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R active.png')";
                 document.getElementById("tabmsgtonext").onclick=bot_tabmsgclicktonext;//恢复右箭头
                 document.getElementById("tabmsgtonext").className="tabmsgtonext_active";
                document.getElementById("labell0").style.visibility = "visible";document.getElementById("labell1").style.visibility = "hidden";
                document.getElementById("labelr0").style.visibility = "visible";document.getElementById("labelr1").style.visibility = "hidden";
                setTimeout(function() {document.getElementById("settingmain1-0").style.display= "none";
                document.getElementById("settingmain1-0").style.opacity= "0"; }, 850);
            }
        }
        else if(temp==2){
            if(settingSelected==1&&secsettingSelected==0){
                document.getElementById("settingmain2-0").style.animationName = "settingdivdisapp";
                setTimeout(function() {
                    document.getElementById("settingmain1-0").style.opacity= "0";
                    document.getElementById("settingmain1-0").style.display= "flex";
                    document.getElementById("settingmain1-0").style.animationName = "settingdivapp"; }, 350);
                secsettingSelected=0;
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
                document.getElementById("tabmsgtolast").onclick=null;//禁用左箭头
                document.getElementById("tabmsgtolast").className="tabmsgtolast_disable";
                document.getElementById("tabmsgtolast").onmouseover = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
            };
                document.getElementById("tabmsgtolast").onmouseout = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
            };
                document.getElementById("tabmsgtonext").onmouseover = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
                };
                document.getElementById("tabmsgtonext").onmouseout = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
                };
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
                document.getElementById("tabmsgtonext").onclick=null;//禁用右箭头
                document.getElementById("tabmsgtonext").className="tabmsgtonext_disable";
                document.getElementById("labell0").style.visibility = "hidden";document.getElementById("labell1").style.visibility = "hidden";
                document.getElementById("labelr0").style.visibility = "hidden";document.getElementById("labelr1").style.visibility = "hidden";
                setTimeout(function() {document.getElementById("settingmain2-0").style.display= "none";
                document.getElementById("settingmain2-0").style.opacity= "0"; }, 850);
            }
            else if(settingSelected==1&&secsettingSelected==1){
                document.getElementById("settingmain2-1").style.animationName = "settingdivdisapp";
                setTimeout(function() {
                    document.getElementById("settingmain1-0").style.opacity= "0";
                    document.getElementById("settingmain1-0").style.display= "flex";
                    document.getElementById("settingmain1-0").style.animationName = "settingdivapp"; }, 350);
                secsettingSelected=0;
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
                document.getElementById("tabmsgtolast").onclick=null;//禁用左箭头
                document.getElementById("tabmsgtolast").className="tabmsgtolast_disable";
                document.getElementById("tabmsgtolast").onmouseover = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
            };
                document.getElementById("tabmsgtolast").onmouseout = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
            };
                document.getElementById("tabmsgtonext").onmouseover = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
                };
                document.getElementById("tabmsgtonext").onmouseout = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
                };
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
                document.getElementById("tabmsgtonext").onclick=null;//禁用右箭头
                document.getElementById("tabmsgtonext").className="tabmsgtonext_disable";
                document.getElementById("labell0").style.visibility = "hidden";document.getElementById("labell1").style.visibility = "hidden";
                document.getElementById("labelr0").style.visibility = "hidden";document.getElementById("labelr1").style.visibility = "hidden";
                setTimeout(function() {document.getElementById("settingmain2-1").style.display= "none";
                document.getElementById("settingmain2-1").style.opacity= "0"; }, 850);
            }
        }
        else{}
    }
}
function tabmoveanimation(t){
    // console.log("enter");
    let move = 177.5;
    let base = document.getElementById("tablabel").style.left;
    // console.log("base="+base);
    base = Number(base.substring(0, base.length - 2));
    // console.log("base="+base);
    let a = 0;
    if(t==0){
        tabmoveanimationc(base, base-move, 0.3, 120, 0, "linear");
    }else{
        tabmoveanimationc(base, base+move, 0.3, 120, 0, "linear");
    }
}

function tabmoveanimationc(begin, end, time, frames, times, type){
    let pertime = 1/frames;  //获取一帧动画多少秒
    let ltime = time/pertime;  // 获取一共循环几次
    // document.getElementById("appname").innerHTML = ltime;
    let lmove = (end - begin)/ltime;  //获取每次循环移动多少
    let ratio = 0;
    let x = times/ltime; //x值
    if(times >= ltime) return;
    if(type == "linear"){
        ratio = x;
    }
    // console.log((begin + (end-begin)*ratio).toString() + "px");
    document.getElementById("tablabel").style.left=(begin + (end-begin)*ratio).toString() + "px";
    setTimeout(function(){tabmoveanimationc(begin, end, time, frames, times+1, type);},pertime);
}

function topbarsrcollinit(){
    header_scroll = new Scroll(document.getElementById("charlistdivmain"), 0);
}
/* ----------------------------------------------------------------------- */
/* 在这个下面添加你的函数 */
function bot_tabmsgclicktonext(){
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    if(settingSelected==0){
        if(secsettingSelected==0){
            secsettingSelected=1;
            document.getElementById("settingmain0-0").style.animationName = "settingdivleft-disapp";
            document.getElementById("labell0").style.visibility = "hidden";document.getElementById("labell1").style.visibility = "visible";
            document.getElementById("labelr0").style.visibility = "hidden";document.getElementById("labelr1").style.visibility = "visible";
            document.getElementById("tabmsgtolast").onclick=bot_tabmsgclicktolast;//恢复左箭头
            // document.getElementById("tabmsgtolast").className="tabmsgtolast_active";
            document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L active.png')";
            document.getElementById("tabmsgtolast").className="tabmsgtolast_active";/////////////////////////////////////
            document.getElementById("tabmsgtolast").onmouseover = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L active_pressed.png')";
            };
            document.getElementById("tabmsgtolast").onmouseout = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L active.png')";
            };
            document.getElementById("tabmsgtonext").onmouseover = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
            };
            document.getElementById("tabmsgtonext").onmouseout = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
            };
            document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
            document.getElementById("tabmsgtonext").onclick=null;//禁用右箭头
            document.getElementById("tabmsgtonext").className="tabmsgtonext_disable";
            document.getElementById("tabmsgtonext").className="tabmsgtonext_disable";///////////////////////////////
            keyboard_init();
            setTimeout(function() {
                document.getElementById("settingmain0-1").style.opacity= "0";
                document.getElementById("settingmain0-1").style.display= "flex";
                document.getElementById("settingmain0-1").style.animationName = "settingdivleft-app"; }, 350);
            setTimeout(function() {document.getElementById("settingmain0-0").style.display= "none";
            document.getElementById("settingmain0-0").style.opacity= "0"; }, 850);
        }
        
    }
    else if(settingSelected==2&&secsettingSelected==0){
            secsettingSelected=1;
            document.getElementById("settingmain2-0").style.animationName = "settingdivleft-disapp";
            document.getElementById("labell0").style.visibility = "hidden";document.getElementById("labell1").style.visibility = "visible";
            document.getElementById("labelr0").style.visibility = "hidden";document.getElementById("labelr1").style.visibility = "visible";
            document.getElementById("tabmsgtolast").onclick=bot_tabmsgclicktolast;//恢复左箭头
            document.getElementById("tabmsgtolast").className="tabmsgtolast_active";////////////////////////////////////////
            document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L active.png')";
            document.getElementById("tabmsgtolast").onmouseover = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L active_pressed.png')";
            };
            document.getElementById("tabmsgtolast").onmouseout = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L active.png')";
            };
            document.getElementById("tabmsgtonext").onmouseover = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
            };
            document.getElementById("tabmsgtonext").onmouseout = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
            };
            document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R disabled.png')";
            document.getElementById("tabmsgtonext").onclick=null;//禁用右箭头
            document.getElementById("tabmsgtonext").className="tabmsgtonext_disable";///////////////////////////////////
            setTimeout(function() {
                document.getElementById("settingmain2-1").style.opacity= "0";
                document.getElementById("settingmain2-1").style.display= "flex";
                document.getElementById("settingmain2-1").style.animationName = "settingdivleft-app"; }, 350);
            setTimeout(function() {document.getElementById("settingmain2-0").style.display= "none";
            document.getElementById("settingmain2-0").style.opacity= "0"; }, 850);
    }
}
function bot_tabmsgclicktolast(){
    // console.log("123");
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    if(settingSelected==0){
        if(secsettingSelected==1){
            secsettingSelected=0;
            // console.log("1234");
            document.getElementById("settingmain0-1").style.animationName = "settingdivright-disapp";
            document.getElementById("labell0").style.visibility = "visible";document.getElementById("labell1").style.visibility = "hidden";
            document.getElementById("labelr0").style.visibility = "visible";document.getElementById("labelr1").style.visibility = "hidden";
            document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
            document.getElementById("tabmsgtolast").onclick=null;//禁用左箭头
            document.getElementById("tabmsgtolast").className="tabmsgtolast_disable";//////////////////////////////////
            document.getElementById("tabmsgtolast").onmouseover = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
            };
            document.getElementById("tabmsgtolast").onmouseout = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
            };
            document.getElementById("tabmsgtonext").onmouseover = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R active_pressed.png')";
            };
            document.getElementById("tabmsgtonext").onmouseout = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R active.png')";
            };
            document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R active.png')";
            document.getElementById("tabmsgtonext").onclick=bot_tabmsgclicktonext;//恢复右箭头
            document.getElementById("tabmsgtonext").className="tabmsgtonext_active";////////////////////////////////
            
            setTimeout(function() {
                document.getElementById("settingmain0-0").style.opacity= "0";
                document.getElementById("settingmain0-0").style.display= "flex";
                document.getElementById("settingmain0-0").style.animationName = "settingdivright-app"; }, 350);
            setTimeout(function() {document.getElementById("settingmain0-1").style.display= "none";
            document.getElementById("settingmain0-1").style.opacity= "0"; }, 850);
        }
        
    }
    else if(settingSelected==2&&secsettingSelected==1){
        secsettingSelected=0;
        document.getElementById("settingmain2-1").style.animationName = "settingdivright-disapp";
            document.getElementById("labell0").style.visibility = "visible";document.getElementById("labell1").style.visibility = "hidden";
            document.getElementById("labelr0").style.visibility = "visible";document.getElementById("labelr1").style.visibility = "hidden";
            document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
            document.getElementById("tabmsgtolast").onclick=null;//禁用左箭头
            document.getElementById("tabmsgtolast").className="tabmsgtolast_disable";////////////////////////////////
            document.getElementById("tabmsgtolast").onmouseover = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
            };
            document.getElementById("tabmsgtolast").onmouseout = function () {
                document.getElementById("tabmsgtolast").style.backgroundImage="url('../resources/img/dialog_v2/L disabled.png')";
            };
            document.getElementById("tabmsgtonext").onmouseover = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R active_pressed.png')";
            };
            document.getElementById("tabmsgtonext").onmouseout = function () {
                document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R active.png')";
            };
            document.getElementById("tabmsgtonext").style.backgroundImage="url('../resources/img/dialog_v2/R active.png')";
            document.getElementById("tabmsgtonext").onclick=bot_tabmsgclicktonext;//恢复右箭头
            document.getElementById("tabmsgtonext").className="tabmsgtonext_active";/////////////////////////////////
            setTimeout(function() {
                document.getElementById("settingmain2-0").style.opacity= "0";
                document.getElementById("settingmain2-0").style.display= "flex";
                document.getElementById("settingmain2-0").style.animationName = "settingdivright-app"; }, 350);
            setTimeout(function() {document.getElementById("settingmain2-1").style.display= "none";
            document.getElementById("settingmain2-1").style.opacity= "0"; }, 850);
    }
}
function pureclick(){
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    if(pure==0){
        pure=1;
        document.getElementById("tabmsg_set_sheer_bot").innerHTML= pure_option[1];
    }
    else{
        pure=0;
        document.getElementById("tabmsg_set_sheer_bot").innerHTML= pure_option[0];
    }
}
function potentialclick(){
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    if(potential_display==0){
        potential_display=1;
        document.getElementById("tabmsg-set-potential").innerHTML=potential_display_option[1];
    }
    else{
        potential_display=0;
        document.getElementById("tabmsg-set-potential").innerHTML=potential_display_option[0];
    }
}
function skill_displayclick(){
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    if(skill_display==0){
        skill_display=1;
        document.getElementById("tabmsg_set_skill_bot").innerHTML= skill_display_option[1];
    }
    else{
        skill_display=0;
        document.getElementById("tabmsg_set_skill_bot").innerHTML=skill_display_option[0];
    }
}
function audio_presetclick(){
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    if(audio_preset==0){
        audio_preset=1;
        document.getElementById("oneaudio").style.display= "block";
        document.getElementById("anotheraudio").style.display= "none";
        //解决上一个模式的按钮灰色
        if(sound_playback==0&&sound_bluetooth>0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        else if(sound_playback==100&&sound_bluetooth<100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
        if(sound_playback>0&&sound_bluetooth==0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
        }
        else if(sound_playback<100&&sound_bluetooth==100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
        }
        if(offset_playback==-1000&&offset_bluetooth>-1000){
            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        else if(offset_playback==1000&&sound_bluetooth<1000){
            document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
        if(offset_playback>-1000&&offset_bluetooth==-1000){
            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
        }
        else if(offset_playback<1000&&sound_bluetooth==1000){
            document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
        }
        // document.getElementById("sound").innerHTML=sound_bluetooth+"%";
        document.getElementById("offset").innerHTML=offset_bluetooth;
        if(offset_bluetooth>100||offset_bluetooth<-100){
            document.getElementById("remindtxt2").style.display="block";
            document.getElementById("remindtxt1").style.display="none";
            document.getElementById("sound").innerHTML=0+"%";
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
            offsettosound_judge_bluetooth=0;
        }
        else{
            document.getElementById("remindtxt1").style.display="block";
            document.getElementById("remindtxt2").style.display="none";
            document.getElementById("sound").innerHTML=sound_bluetooth+"%";
            if(sound_bluetooth==100){
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
            }
            else if(sound_bluetooth==0){
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
            }
            else{
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
            }
        }
        
    }
    else{
        audio_preset=0;
        document.getElementById("oneaudio").style.display= "none";
        document.getElementById("anotheraudio").style.display= "block";
        //解决上一个模式的按钮灰色
        if(sound_playback>0&&sound_bluetooth==0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        else if(sound_playback<100&&sound_bluetooth==100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
        if(sound_playback==0&&sound_bluetooth>0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
        }
        else if(sound_playback==100&&sound_bluetooth<100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
        }
        if(offset_playback>-1000&&offset_bluetooth==-1000){
            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        else if(offset_playback<1000&&sound_bluetooth==1000){
            document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
        if(offset_playback==-1000&&offset_bluetooth>-1000){
            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
        }
        else if(offset_playback==1000&&sound_bluetooth<1000){
            document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
        }
        
        // document.getElementById("sound").innerHTML=sound_playback+"%";
        document.getElementById("offset").innerHTML=offset_playback;
        if(offset_playback>100||offset_playback<-100){
            document.getElementById("remindtxt2").style.display="block";
            document.getElementById("remindtxt1").style.display="none";
            document.getElementById("sound").innerHTML=0+"%";
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
            offsettosound_judge_playback=0;
        }
        else{
            document.getElementById("remindtxt1").style.display="block";
            document.getElementById("remindtxt2").style.display="none";
            document.getElementById("sound").innerHTML=sound_playback+"%";
            if(sound_playback==100){
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
            }
            else if(sound_playback==0){
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
            }
            else{
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
            }
        }
    }
}
function color_supclick(){
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    if(color_sup==0){
        color_sup=1;
        document.getElementById("tabmsg_set-colorsup_bot").innerHTML= color_sup_option[1];
    }
    else{
        color_sup=0;
        document.getElementById("tabmsg_set-colorsup_bot").innerHTML= color_sup_option[0];
    }
}
function FRPMclick(){
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    if(FRorPM==0){
        FRorPM=1;
        document.getElementById("tabmsg_set_FRPM_bot").innerHTML= FRorPM_option[1];
    }
    else if(FRorPM==1)
    {
        FRorPM=2;
        document.getElementById("tabmsg_set_FRPM_bot").innerHTML= FRorPM_option[2];
    }
    else{
        FRorPM=0;
        document.getElementById("tabmsg_set_FRPM_bot").innerHTML=FRorPM_option[0];
    }
}
function eaorlaclick(){
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    if(early_late_pos==0){
        early_late_pos=1;
        document.getElementById("tabmsg_set_eaorla_bot").innerHTML= early_late_pos_option[1];
    }
    else if(early_late_pos==1)
    {
        early_late_pos=2;
        document.getElementById("tabmsg_set_eaorla_bot").innerHTML= early_late_pos_option[2];
    }
    else{
        early_late_pos=0;
        document.getElementById("tabmsg_set_eaorla_bot").innerHTML=early_late_pos_option[0];
    }
}
function setmodeclick(){
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    if(low_performance==0){
        low_performance=1;
        document.getElementById("tabmsg_set_mode_bot").innerHTML=low_performance_option[1];
    }
    else{
        low_performance=0;
        document.getElementById("tabmsg_set_mode_bot").innerHTML=low_performance_option[0];
    }
}
function settouchclick(){
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    console.log(touch_display_option);
    console.log(touch_display);
    if(touch_display==0){
        touch_display=1;
        document.getElementById("tabmsg_set_touch_bot").innerHTML= touch_display_option[1];
    }
    else{
        touch_display=0;
        document.getElementById("tabmsg_set_touch_bot").innerHTML=touch_display_option[0];
    }
}   
function setbuttonpre(){
    document.getElementById("speed-l").addEventListener("mouseout", function() {
        note_flow_rate_judge_l=0;
        note_flow_rate_count_l=0;
        clearInterval(settimer);
        clearTimeout(timerqaq);
        settimer=null;
        timerqaq=null;
    });
    document.getElementById("speed-l").addEventListener("mouseover", function() {
        note_flow_rate_judge_l=1; 
        note_flow_rate_judge_r=0; 
    });
    document.getElementById("speed-l").addEventListener("mousedown", function() {
        if(note_flow_rate>=1.1){
            let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
            note_flow_rate-= 0.1;
            note_flow_rate=parseFloat(note_flow_rate.toFixed(1));
            document.getElementById("speed-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
            if(note_flow_rate==1){
                document.getElementById("speed-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
            }
            else{
                document.getElementById("speed-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
            }
            if(note_flow_rate==Math.floor(note_flow_rate)){
                document.getElementById("speed").innerHTML=note_flow_rate+".0";
            }
            else{document.getElementById("speed").innerHTML=note_flow_rate;}
        }
        else if(note_flow_rate==1){
            document.getElementById("speed-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
        }
        note_flow_rate_judge_l=1;
        timerqaq = setTimeout(function(){   
        if(note_flow_rate_judge_l==1){
        settimer= setInterval(function() {
            if(note_flow_rate_judge_l==1){
                if(note_flow_rate>=1.1){
                    let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                    note_flow_rate-= 0.1;
                    note_flow_rate=parseFloat(note_flow_rate.toFixed(1));
                    document.getElementById("speed-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                    if(note_flow_rate==1){
                        document.getElementById("speed-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                    }
                    else{
                        document.getElementById("speed-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                    }
                    if(note_flow_rate==Math.floor(note_flow_rate)){
                        document.getElementById("speed").innerHTML=note_flow_rate+".0";
                    }
                    else{document.getElementById("speed").innerHTML=note_flow_rate;}
                }
                else if(note_flow_rate==1){
                    document.getElementById("speed-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                }
                }
            }, 80);
        }
    },200);
    });
    document.getElementById("speed-l").addEventListener("mouseup", function() {
        note_flow_rate_judge_l=0;
        // note_flow_rate_count_l=0;
        clearInterval(settimer);
        clearTimeout(timerqaq);
        settimer=null;
        timerqaq=null;
    });
  /*```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````*/  
  
  document.getElementById("speed-r").addEventListener("mouseout", function() {
    note_flow_rate_count_r=0;
    note_flow_rate_judge_r=0;
    clearInterval(settimer);
    clearTimeout(timerqaq);
    settimer=null;
    timerqaq=null;
});
    document.getElementById("speed-r").addEventListener("mouseover", function() {
        note_flow_rate_judge_r=1; 
        note_flow_rate_judge_l=0; 
    });
    document.getElementById("speed-r").addEventListener("mousedown", function() {
        if(note_flow_rate<=6.4){
            let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
            note_flow_rate+= 0.1;
            note_flow_rate=parseFloat(note_flow_rate.toFixed(1));
            document.getElementById("speed-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
            if(note_flow_rate==1){
                document.getElementById("speed-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
            }
            else{
                document.getElementById("speed-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
            }
            if(note_flow_rate==Math.floor(note_flow_rate)){
                document.getElementById("speed").innerHTML=note_flow_rate+".0";
            }
            else{document.getElementById("speed").innerHTML=note_flow_rate;}
        }
        else if(note_flow_rate==6.5){
            document.getElementById("speed-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
        }
        note_flow_rate_judge_r = 1;
        timerqaq = setTimeout(function(){
            if(note_flow_rate_judge_r==1){
                settimer= setInterval(function() {
                    if(note_flow_rate_judge_r==1){
                        if(note_flow_rate<=6.4){
                            let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                            note_flow_rate+= 0.1;
                            note_flow_rate=parseFloat(note_flow_rate.toFixed(1));
                            document.getElementById("speed-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                            if(note_flow_rate==1){
                                document.getElementById("speed-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                            }
                            else{
                                document.getElementById("speed-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                            }
                            if(note_flow_rate==Math.floor(note_flow_rate)){
                                document.getElementById("speed").innerHTML=note_flow_rate+".0";
                            }
                            else{document.getElementById("speed").innerHTML=note_flow_rate;}
                        }
                        else if(note_flow_rate==6.5){
                            document.getElementById("speed-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                        }
                    }
                }, 80);
            }
        }, 200);
    });
    document.getElementById("speed-r").addEventListener("mouseup", function() {
        note_flow_rate_judge_r=0;
        // note_flow_rate_count_r=0;
        clearInterval(settimer);
        clearTimeout(timerqaq);
        settimer=null;
        timerqaq=null;
    });
    /*```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````*/  
    document.getElementById("soundset-l").addEventListener("mouseout", function() {
        soundset_judge_l=0;
        clearInterval(settimer);
        clearTimeout(timerqaq);
        settimer=null;
        timerqaq=null;
    });
    document.getElementById("soundset-l").addEventListener("mouseover", function() {
        soundset_judge_l=1; 
        soundset_judge_r=0; 
    });
    document.getElementById("soundset-l").addEventListener("mousedown", function() {
        // console.log("sacc");
            if(audio_preset==0&&offsettosound_judge_playback==1){
                if(sound_playback>=10){
                    let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                    sound_playback-= 10;
                    sound_playback=parseFloat(sound_playback.toFixed(0));
                    document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                    if(sound_playback==0){
                        document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                    }
                    else{
                        document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                    }
                    document.getElementById("sound").innerHTML=sound_playback+"%";
                }
                else if(sound_playback==0){
                    document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                }
            }
            else if(audio_preset==1&&offsettosound_judge_bluetooth==1){
                if(sound_bluetooth>=10){
                    let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                    sound_bluetooth-= 10;
                    sound_bluetooth=parseFloat(sound_bluetooth.toFixed(0));
                    document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                    if(sound_bluetooth==0){
                        document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                    }
                    else{
                        document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                    }
                    document.getElementById("sound").innerHTML=sound_bluetooth+"%";
                }
                else if(sound_bluetooth==0){
                    document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                }
            }    
        
        soundset_judge_l=1;
        timerqaq = setTimeout(function(){
        if(soundset_judge_l==1){
        settimer= setInterval(function() {
            if(soundset_judge_l==1){
                if(audio_preset==0&&offsettosound_judge_playback==1){
                    if(sound_playback>=10){
                        let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                        sound_playback-= 10;
                        sound_playback=parseFloat(sound_playback.toFixed(0));
                        document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                        if(sound_playback==0){
                            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                        }
                        else{
                            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                        }
                        document.getElementById("sound").innerHTML=sound_playback+"%";
                    }
                    else if(sound_playback==0){
                        document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                    }
                }
                else if(audio_preset==1&&offsettosound_judge_bluetooth==1){
                    if(sound_bluetooth>=10){
                        let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                        sound_bluetooth-= 10;
                        sound_bluetooth=parseFloat(sound_bluetooth.toFixed(0));
                        document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                        if(sound_bluetooth==0){
                            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                        }
                        else{
                            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                        }
                        document.getElementById("sound").innerHTML=sound_bluetooth+"%";
                    }
                    else if(sound_bluetooth==0){
                        document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                    }
                }    
            }
        }, 80);
    }},200)
    });
    document.getElementById("soundset-l").addEventListener("mouseup", function() {
        soundset_judge_l=0;
        clearInterval(settimer);
        clearTimeout(timerqaq);
        settimer=null;
        timerqaq=null;
    });
       /*```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````*/  
       document.getElementById("soundset-r").addEventListener("mouseout", function() {
        soundset_judge_r=0;
        clearInterval(settimer);
        clearTimeout(timerqaq);
        settimer=null;
        timerqaq=null;
    });
    document.getElementById("soundset-r").addEventListener("mouseover", function() {
        soundset_judge_r=1; 
        soundset_judge_l=0; 
    });
    
        document.getElementById("soundset-r").addEventListener("mousedown", function() {
            if(audio_preset==0&&offsettosound_judge_playback==1){
                if(sound_playback<=90){
                    let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                    sound_playback+= 10;
                    sound_playback=parseFloat(sound_playback.toFixed(0));
                    document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                    if(sound_playback==100){
                        document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                    }
                    else{
                        document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                    }
                    document.getElementById("sound").innerHTML=sound_playback+"%";
                }
                else if(sound_playback==100){
                    document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                }
            }
            else if(audio_preset==1&&offsettosound_judge_bluetooth==1){
                if(sound_bluetooth<=90){
                    let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                    sound_bluetooth+= 10;
                    sound_bluetooth=parseFloat(sound_bluetooth.toFixed(0));
                    document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                    if(sound_bluetooth==100){
                        document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                    }
                    else{
                        document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                    }
                    document.getElementById("sound").innerHTML=sound_bluetooth+"%";
                }
                else if(sound_bluetooth==100){
                    document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                }
            } 
            soundset_judge_r = 1;
            timerqaq = setTimeout(function(){   
            if(soundset_judge_r==1){
            settimer= setInterval(function() {
                if(soundset_judge_r==1){
                    if(audio_preset==0&&offsettosound_judge_playback==1){
                        if(sound_playback<=90){
                            let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                            sound_playback+= 10;
                            sound_playback=parseFloat(sound_playback.toFixed(0));
                            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                            if(sound_playback==100){
                                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                            }
                            else{
                                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                            }
                            document.getElementById("sound").innerHTML=sound_playback+"%";
                        }
                        else if(sound_playback==100){
                            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                        }
                    }
                    else if(audio_preset==1&&offsettosound_judge_bluetooth==1){
                        if(sound_bluetooth<=90){
                            let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                            sound_bluetooth+= 10;
                            sound_bluetooth=parseFloat(sound_bluetooth.toFixed(0));
                            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                            if(sound_bluetooth==100){
                                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                            }
                            else{
                                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                            }
                            document.getElementById("sound").innerHTML=sound_bluetooth+"%";
                        }
                        else if(sound_bluetooth==100){
                            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                        }
                    }    
                }
            }, 80);
        }},200);
        });
    document.getElementById("soundset-r").addEventListener("mouseup", function() {
        soundset_judge_r=0;
        clearInterval(settimer);
        clearTimeout(timerqaq);
        settimer=null;
        timerqaq=null;
    });

    /*```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````*/  
    document.getElementById("offset-l").addEventListener("mouseout", function() {
        offset_judge_l=0;
        clearInterval(settimer);
        clearTimeout(timerqaq);
        settimer=null;
        timerqaq=null;
    });
    document.getElementById("offset-l").addEventListener("mouseover", function() {
        offset_judge_l=1; 
        offset_judge_r=0; 
    });
    document.getElementById("offset-l").addEventListener("mousedown", function() {
        if(audio_preset==0){
            if(offset_playback>=-999){
                let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                offset_playback-= 1;
                offset_playback=parseFloat(offset_playback.toFixed(0));
                document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                if(offset_playback==-1000){
                    document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                }
                else{
                    document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                }
                document.getElementById("offset").innerHTML=offset_playback;
            }
            else if(offset_playback==-1000){
                document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
            }
            if(offset_playback<-100||offset_playback>100){
                document.getElementById("remindtxt2").style.display="block";
                document.getElementById("remindtxt1").style.display="none";
                document.getElementById("sound").innerHTML=0+"%";
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                offsettosound_judge_playback=0;
            }
            else{
                offsettosound_judge_playback=1;
                document.getElementById("remindtxt1").style.display="block";
                document.getElementById("remindtxt2").style.display="none";
                document.getElementById("sound").innerHTML=sound_playback+"%";
                if(sound_playback!=0){
                    document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                }
                if(sound_playback!=100){
                    document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                }
            }
        }
        else if(audio_preset==1){
            if(offset_bluetooth>=-999){
                let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                offset_bluetooth-= 1;
                offset_bluetooth=parseFloat(offset_bluetooth.toFixed(0));
                document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                if(offset_bluetooth==-1000){
                    document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                }
                else{
                    document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                }
                document.getElementById("offset").innerHTML=offset_bluetooth;
            }
            else if(offset_bluetooth==-1000){
                document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
            }
            if(offset_bluetooth<-100||offset_bluetooth>100){
                document.getElementById("remindtxt2").style.display="block";
                document.getElementById("remindtxt1").style.display="none";
                document.getElementById("sound").innerHTML=0+"%";
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                offsettosound_judge_bluetooth=0;
            }
            else{
                document.getElementById("remindtxt1").style.display="block";
                document.getElementById("remindtxt2").style.display="none";
                offsettosound_judge_bluetooth=1;
                document.getElementById("sound").innerHTML=sound_bluetooth+"%";
        if(sound_bluetooth!=0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        if(sound_bluetooth!=100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
            }
        }    
        offset_judge_l=1;
        timerqaq = setTimeout(function(){   
        if(offset_judge_l==1){
        settimer= setInterval(function() {
            if(offset_judge_l==1){
                if(audio_preset==0){
                    if(offset_playback>=-999){
                        let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                        offset_playback-= 1;
                        offset_playback=parseFloat(offset_playback.toFixed(0));
                        document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                        if(offset_playback==-1000){
                            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                        }
                        else{
                            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                        }
                        document.getElementById("offset").innerHTML=offset_playback;
                    }
                    else if(offset_playback==-1000){
                        document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                    }
                    if(offset_playback<-100||offset_playback>100){
                        document.getElementById("remindtxt2").style.display="block";
                        document.getElementById("remindtxt1").style.display="none";
                        document.getElementById("sound").innerHTML=0+"%";
                        document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                        document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                        offsettosound_judge_playback=0;
                    }
                    else{
                        offsettosound_judge_playback=1;
                        document.getElementById("remindtxt1").style.display="block";
                        document.getElementById("remindtxt2").style.display="none";
                        document.getElementById("sound").innerHTML=sound_playback+"%";
                        if(sound_playback!=0){
                            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                        }
                        if(sound_playback!=100){
                            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                        }
                    }
                }
                else if(audio_preset==1){
                    if(offset_bluetooth>=-999){
                        let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                        offset_bluetooth-= 1;
                        offset_bluetooth=parseFloat(offset_bluetooth.toFixed(0));
                        document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                        if(offset_bluetooth==-1000){
                            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                        }
                        else{
                            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                        }
                        document.getElementById("offset").innerHTML=offset_bluetooth;
                    }
                    else if(offset_bluetooth==-1000){
                        document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                    }
                    if(offset_bluetooth<-100||offset_bluetooth>100){
                        document.getElementById("remindtxt2").style.display="block";
                        document.getElementById("remindtxt1").style.display="none";
                        document.getElementById("sound").innerHTML=0+"%";
                        document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                        document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                        offsettosound_judge_bluetooth=0;
                    }
                    else{
                        document.getElementById("remindtxt1").style.display="block";
                        document.getElementById("remindtxt2").style.display="none";
                        offsettosound_judge_bluetooth=1;
                        document.getElementById("sound").innerHTML=sound_bluetooth+"%";
                if(sound_bluetooth!=0){
                    document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                }
                if(sound_bluetooth!=100){
                    document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                }
                    }
                }    
            }
        }, 60);
    }},200);
    });
    document.getElementById("offset-l").addEventListener("mouseup", function() {
        offset_judge_l=0;
        clearInterval(settimer);
        clearTimeout(timerqaq);
        settimer=null;
        timerqaq=null;
    });
       /*```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````*/  
       document.getElementById("offset-r").addEventListener("mouseout", function() {
        offset_judge_r=0;
        clearInterval(settimer);
        clearTimeout(timerqaq);
        settimer=null;
        timerqaq=null;
    });
    document.getElementById("offset-r").addEventListener("mouseover", function() {
        offset_judge_r=1; 
        offset_judge_l=0; 
    });
        document.getElementById("offset-r").addEventListener("mousedown", function() {
            if(audio_preset==0){
                if(offset_playback<=999){
                    let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                    offset_playback+= 1;
                    offset_playback=parseFloat(offset_playback.toFixed(0));
                    document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                    if(offset_playback==1000){
                        document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                    }
                    else{
                        document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                    }
                    document.getElementById("offset").innerHTML=offset_playback;
                }
                else if(offset_playback==1000){
                    document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                }
                if(offset_playback<-100||offset_playback>100){
                    document.getElementById("remindtxt2").style.display="block";
                    document.getElementById("remindtxt1").style.display="none";
                    document.getElementById("sound").innerHTML=0+"%";
                    document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                    document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                    offsettosound_judge_playback=0;
                }
                else{
                    offsettosound_judge_playback=1;
                    document.getElementById("remindtxt1").style.display="block";
                    document.getElementById("remindtxt2").style.display="none";
                    document.getElementById("sound").innerHTML=sound_playback+"%";
        if(sound_playback!=0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        if(sound_playback!=100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
                }
            }
            else if(audio_preset==1){
                if(offset_bluetooth<=999){
                    let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                    offset_bluetooth+= 1;
                    offset_bluetooth=parseFloat(offset_bluetooth.toFixed(0));
                    document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                    if(offset_bluetooth==1000){
                        document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                    }
                    else{
                        document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                    }
                    document.getElementById("offset").innerHTML=offset_bluetooth;
                }
                else if(offset_bluetooth==1000){
                    document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                }
                if(offset_bluetooth<-100||offset_bluetooth>100){
                    document.getElementById("remindtxt2").style.display="block";
                    document.getElementById("remindtxt1").style.display="none";
                    document.getElementById("sound").innerHTML=0+"%";
                    document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                    document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                    offsettosound_judge_bluetooth=0;
                }
                else{
                    document.getElementById("remindtxt1").style.display="block";
                    document.getElementById("remindtxt2").style.display="none";
                    offsettosound_judge_bluetooth=1;
                    document.getElementById("sound").innerHTML=sound_bluetooth+"%";
        if(sound_bluetooth!=0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        if(sound_bluetooth!=100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
                }
            }  
            offset_judge_r=1;
            timerqaq = setTimeout(function(){   
            if(offset_judge_r==1){
            settimer= setInterval(function() {
                if(offset_judge_r==1){
                    if(audio_preset==0){
                        if(offset_playback<=999){
                            let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                            offset_playback+= 1;
                            offset_playback=parseFloat(offset_playback.toFixed(0));
                            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                            if(offset_playback==1000){
                                document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                            }
                            else{
                                document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                            }
                            document.getElementById("offset").innerHTML=offset_playback;
                        }
                        else if(offset_playback==1000){
                            document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                        }
                        if(offset_playback<-100||offset_playback>100){
                            document.getElementById("remindtxt2").style.display="block";
                            document.getElementById("remindtxt1").style.display="none";
                            document.getElementById("sound").innerHTML=0+"%";
                            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                            offsettosound_judge_playback=0;
                        }
                        else{
                            offsettosound_judge_playback=1;
                            document.getElementById("remindtxt1").style.display="block";
                            document.getElementById("remindtxt2").style.display="none";
                            document.getElementById("sound").innerHTML=sound_playback+"%";
                if(sound_playback!=0){
                    document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                }
                if(sound_playback!=100){
                    document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                }
                        }
                    }
                    else if(audio_preset==1){
                        if(offset_bluetooth<=999){
                            let audio = new ClickAudio("../resources/audio/item_click_alt.wav", 0.4);    
                            offset_bluetooth+= 1;
                            offset_bluetooth=parseFloat(offset_bluetooth.toFixed(0));
                            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                            if(offset_bluetooth==1000){
                                document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                            }
                            else{
                                document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                            }
                            document.getElementById("offset").innerHTML=offset_bluetooth;
                        }
                        else if(offset_bluetooth==1000){
                            document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                        }
                        if(offset_bluetooth<-100||offset_bluetooth>100){
                            document.getElementById("remindtxt2").style.display="block";
                            document.getElementById("remindtxt1").style.display="none";
                            document.getElementById("sound").innerHTML=0+"%";
                            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
                            offsettosound_judge_bluetooth=0;
                        }
                        else{
                            document.getElementById("remindtxt1").style.display="block";
                            document.getElementById("remindtxt2").style.display="none";
                            offsettosound_judge_bluetooth=1;
                            document.getElementById("sound").innerHTML=sound_bluetooth+"%";
                if(sound_bluetooth!=0){
                    document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                }
                if(sound_bluetooth!=100){
                    document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
                }
                        }
                    }    
                }
            }, 60);
        }},200);
        });
    document.getElementById("offset-r").addEventListener("mouseup", function() {
        offset_judge_r=0;
        clearInterval(settimer);
        clearTimeout(timerqaq);
        settimer=null;
        timerqaq=null;
    });

}
function viewCharClick(){
    // 查看角色细节按钮被点击
    let src = "../resources/char/" + charjson["char"][nowSelected]["idx"] + ".png";
    document.getElementById("charshowerimg").style.animationName = "charshowerimg_leave";
    setTimeout(()=>{document.getElementById("charshowerimg").style.display="none";}, 800);
    let char_shower=new charShower(src,"body", viewerClose);
    char_shower.setScaleAndStep(1, 2, 0.1);
    char_shower.show();
}
function viewerClose(){
    document.getElementById("charshowerimg").style.display="block";
    document.getElementById("charshowerimg").style.animationName = "charshowerimg_show";
}
function settingOffset(){
    // 设定偏移率
    let offset_prompt = new OffsetPrompt(offsetCallback, toplanguage);
    offset_prompt.show();
}
function offsetCallback(offset_res){
    document.getElementById("offset").innerHTML = parseInt(offset_res);
    if(audio_preset==0){
        offset_playback = parseInt(offset_res);
    }else{
        offset_bluetooth = parseInt(offset_res);
    }
    if(audio_preset==0){
        document.getElementById("oneaudio").style.display= "none";
        document.getElementById("anotheraudio").style.display= "block";
        //解决上一个模式的按钮灰色
        if(sound_playback>0&&sound_bluetooth==0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        else if(sound_playback<100&&sound_bluetooth==100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
        if(sound_playback==0&&sound_bluetooth>0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
        }
        else if(sound_playback==100&&sound_bluetooth<100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
        }
        if(offset_playback>-1000&&offset_bluetooth==-1000){
            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        else if(offset_playback<1000&&sound_bluetooth==1000){
            document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
        if(offset_playback==-1000&&offset_bluetooth>-1000){
            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
        }
        else if(offset_playback==1000&&sound_bluetooth<1000){
            document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
        }
        
        // document.getElementById("sound").innerHTML=sound_playback+"%";
        document.getElementById("offset").innerHTML=offset_playback;
        if(offset_playback>100||offset_playback<-100){
            document.getElementById("remindtxt2").style.display="block";
            document.getElementById("remindtxt1").style.display="none";
            document.getElementById("sound").innerHTML=0+"%";
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
            offsettosound_judge_playback=0;
        }
        else{
            document.getElementById("remindtxt1").style.display="block";
            document.getElementById("remindtxt2").style.display="none";
            document.getElementById("sound").innerHTML=sound_playback+"%";
            if(sound_playback==100){
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
            }
            else if(sound_playback==0){
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
            }
            else{
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
            }
        }
    }
    else{
        document.getElementById("oneaudio").style.display= "block";
        document.getElementById("anotheraudio").style.display= "none";
        //解决上一个模式的按钮灰色
        if(sound_playback==0&&sound_bluetooth>0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        else if(sound_playback==100&&sound_bluetooth<100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
        if(sound_playback>0&&sound_bluetooth==0){
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
        }
        else if(sound_playback<100&&sound_bluetooth==100){
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
        }
        if(offset_playback==-1000&&offset_bluetooth>-1000){
            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
        }
        else if(offset_playback==1000&&sound_bluetooth<1000){
            document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
        }
        if(offset_playback>-1000&&offset_bluetooth==-1000){
            document.getElementById("offset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
        }
        else if(offset_playback<1000&&sound_bluetooth==1000){
            document.getElementById("offset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
        }
        // document.getElementById("sound").innerHTML=sound_bluetooth+"%";
        document.getElementById("offset").innerHTML=offset_bluetooth;
        if(offset_bluetooth>100||offset_bluetooth<-100){
            document.getElementById("remindtxt2").style.display="block";
            document.getElementById("remindtxt1").style.display="none";
            document.getElementById("sound").innerHTML=0+"%";
            document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
            document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
            offsettosound_judge_bluetooth=0;
        }
        else{
            document.getElementById("remindtxt1").style.display="block";
            document.getElementById("remindtxt2").style.display="none";
            document.getElementById("sound").innerHTML=sound_bluetooth+"%";
            if(sound_bluetooth==100){
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R-disabled.png')";
            }
            else if(sound_bluetooth==0){
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L-disabled.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
            }
            else{
                document.getElementById("soundset-l").style.backgroundImage="url('../resources/img/dialog_v2/Arrow L.png')";
                document.getElementById("soundset-r").style.backgroundImage="url('../resources/img/dialog_v2/Arrow R.png')";
            }
        }
    }
}
function keyboard_init(){
    while (document.getElementById("remind_txt_container").firstChild) {
        document.getElementById("remind_txt_container").removeChild(document.getElementById("remind_txt_container").firstChild);
    }
    for(i=0;i<26;i++){
        let asciiCode = String.fromCharCode(65+i); // "A"
        document.getElementById("keyboard_button"+asciiCode).classList.add("keyboard_button");
    }
    for(i=0;i<6;i++){   
        document.getElementById("selected_button"+i).innerHTML=keybutton_selected[i];
        document.getElementById("selected_button"+i).classList.remove("keyboard_button");
        document.getElementById("selected_button"+i).classList.remove("keyboard_button_selecting");
        document.getElementById("selected_button"+i).classList.add("keyboard_button_selected");
        document.getElementById("selected_button"+i).removeEventListener('keydown',set_keyboard_input);
        document.getElementById("keyboard_button"+keybutton_selected[i]).classList.remove("keyboard_button");
        document.getElementById("keyboard_button"+keybutton_selected[i]).classList.remove("keyboard_button_selecting");
        document.getElementById("keyboard_button"+keybutton_selected[i]).classList.add("keyboard_button_selected");
        keybutton_isselecting[i]=0;
    }
}
function set_keyboard_input(event) {
    let set_word;
    let set_word_judge=0;
    console.log("捕获事件是："+event.key);
    switch(event.key){
        case "A":set_word="A";set_word_judge=1;break;
        case "B":set_word="B";set_word_judge=1;break;
        case "C":set_word="C";set_word_judge=1;break;
        case "D":set_word="D";set_word_judge=1;break;
        case "E":set_word="E";set_word_judge=1;break;
        case "F":set_word="F";set_word_judge=1;break;
        case "G":set_word="G";set_word_judge=1;break;
        case "H":set_word="H";set_word_judge=1;break;
        case "I":set_word="I";set_word_judge=1;break;
        case "J":set_word="J";set_word_judge=1;break;
        case "K":set_word="K";set_word_judge=1;break;
        case "L":set_word="L";set_word_judge=1;break;
        case "M":set_word="M";set_word_judge=1;break;
        case "N":set_word="N";set_word_judge=1;break;
        case "O":set_word="O";set_word_judge=1;break;
        case "P":set_word="P";set_word_judge=1;break;
        case "Q":set_word="Q";set_word_judge=1;break;
        case "R":set_word="R";set_word_judge=1;break;
        case "S":set_word="S";set_word_judge=1;break;
        case "T":set_word="T";set_word_judge=1;break;
        case "U":set_word="U";set_word_judge=1;break;
        case "V":set_word="V";set_word_judge=1;break;
        case "W":set_word="W";set_word_judge=1;break;
        case "X":set_word="X";set_word_judge=1;break;
        case "Y":set_word="Y";set_word_judge=1;break;
        case "Z":set_word="Z";set_word_judge=1;break;
        case "a":set_word="A";set_word_judge=1;break;
        case "b":set_word="B";set_word_judge=1;break;
        case "c":set_word="C";set_word_judge=1;break;
        case "d":set_word="D";set_word_judge=1;break;
        case "e":set_word="E";set_word_judge=1;break;
        case "f":set_word="F";set_word_judge=1;break;
        case "g":set_word="G";set_word_judge=1;break;
        case "h":set_word="H";set_word_judge=1;break;
        case "i":set_word="I";set_word_judge=1;break;
        case "j":set_word="J";set_word_judge=1;break;
        case "k":set_word="K";set_word_judge=1;break;
        case "l":set_word="L";set_word_judge=1;break;
        case "m":set_word="M";set_word_judge=1;break;
        case "n":set_word="N";set_word_judge=1;break;
        case "o":set_word="O";set_word_judge=1;break;
        case "p":set_word="P";set_word_judge=1;break;
        case "q":set_word="Q";set_word_judge=1;break;
        case "r":set_word="R";set_word_judge=1;break;
        case "s":set_word="S";set_word_judge=1;break;
        case "t":set_word="T";set_word_judge=1;break;
        case "u":set_word="U";set_word_judge=1;break;
        case "v":set_word="V";set_word_judge=1;break;
        case "w":set_word="W";set_word_judge=1;break;
        case "x":set_word="X";set_word_judge=1;break;
        case "y":set_word="Y";set_word_judge=1;break;
        case "z":set_word="Z";set_word_judge=1;break;
        }
    if(set_word_judge==1){
        console.log("123");
        for(i=0;i<6;i++){
            if(set_word==keybutton_selected[i]&&selected_button!=i)//选择了已经设置轨道的按键，直接交换
            {
                let temp=keybutton_selected[i];
                keybutton_selected[i]=keybutton_selected[selected_button];
                keybutton_selected[selected_button]=temp;
                // 
                document.getElementById("selected_button"+selected_button).innerHTML=keybutton_selected[selected_button];
                document.getElementById("selected_button"+i).innerHTML=keybutton_selected[i];
                document.getElementById("selected_button"+selected_button).classList.remove("keyboard_button_selecting");
                document.getElementById("selected_button"+selected_button).classList.add("keyboard_button_selected");
                document.getElementById("keyboard_button"+keybutton_selected[i]).classList.remove("keyboard_button_selecting");
                document.getElementById("keyboard_button"+keybutton_selected[i]).classList.add("keyboard_button_selected");
                document.getElementById("selected_button"+selected_button).removeEventListener('keydown',set_keyboard_input);
                keybutton_isselecting[selected_button]=0;
                buttonRemindTxt(selected_button,set_word);
                return;
            }
            else if(set_word==keybutton_selected[i]&&selected_button==i)//输入和当前相同的按键，结束
            {
                document.getElementById("selected_button"+selected_button).classList.remove("keyboard_button_selecting");
                document.getElementById("selected_button"+selected_button).classList.add("keyboard_button_selected");
                document.getElementById("keyboard_button"+keybutton_selected[i]).classList.remove("keyboard_button_selecting");
                document.getElementById("keyboard_button"+keybutton_selected[i]).classList.add("keyboard_button_selected");
                document.getElementById("selected_button"+selected_button).removeEventListener('keydown',set_keyboard_input);
                keybutton_isselecting[selected_button]=0;
                buttonRemindTxt(selected_button,set_word);
                return;
            }
            else{
                //直到用户输入正确为止
            }
        }
        //不是已经使用的按键，直接替换
        let temp=keybutton_selected[selected_button];
        keybutton_selected[selected_button]=set_word;
        console.log(keybutton_selected);
        document.getElementById("selected_button"+selected_button).innerHTML=set_word;
        document.getElementById("selected_button"+selected_button).classList.remove("keyboard_button_selecting");
        document.getElementById("selected_button"+selected_button).classList.add("keyboard_button_selected");
        document.getElementById("keyboard_button"+temp).classList.remove("keyboard_button_selecting");
        document.getElementById("keyboard_button"+temp).classList.add("keyboard_button");
        document.getElementById("keyboard_button"+set_word).classList.remove("keyboard_button");
        document.getElementById("keyboard_button"+set_word).classList.add("keyboard_button_selected");
        document.getElementById("selected_button"+selected_button).removeEventListener('keydown',set_keyboard_input);
        keybutton_isselecting[selected_button]=0;
        buttonRemindTxt(selected_button,set_word);

    }
    // console.log(set_word);
}
function set_keyboard_button(num)
{   
    for(i=0;i<6;i++){
        if(keybutton_isselecting[i]==1)
        {
            keybutton_isselecting[i]=0;
            document.getElementById("keyboard_button"+keybutton_selected[i]).classList.remove("keyboard_button_selecting");
            document.getElementById("keyboard_button"+keybutton_selected[i]).classList.add("keyboard_button_selected");
            document.getElementById("selected_button"+i).classList.remove("keyboard_button_selecting");
            document.getElementById("selected_button"+i).classList.add("keyboard_button_selected");
            document.getElementById("selected_button"+i).removeEventListener('keydown',set_keyboard_input);
            console.log("事件删除！！！");
            return;
        }
    }
    // let cur_button=keybutton_selected[num];
    keybutton_isselecting[num]=1;
    selected_button=num;
    buttonRemindTxt(num,null);
    document.getElementById("keyboard_button"+keybutton_selected[num]).classList.remove("keyboard_button_selected");
    document.getElementById("keyboard_button"+keybutton_selected[num]).classList.add("keyboard_button_selecting");
    document.getElementById("selected_button"+num).classList.remove("keyboard_button_selected");
    document.getElementById("selected_button"+num).classList.add("keyboard_button_selecting");
    document.getElementById("selected_button"+num).addEventListener('keydown',set_keyboard_input);
    console.log("事件添加！");
}
function checkIsSelecting(){
    for(i=0;i<6;i++){
        if(keybutton_isselecting[i]==1){
            return true;
        }
    }
    return false;
}

function setButtonClick(set_word){
    if(checkIsSelecting()){
        for(i=0;i<6;i++){
            if(set_word==keybutton_selected[i]&&selected_button!=i)//选择了已经设置轨道的按键，直接交换
            {
                let temp=keybutton_selected[i];
                keybutton_selected[i]=keybutton_selected[selected_button];
                keybutton_selected[selected_button]=temp;
                // 
                document.getElementById("selected_button"+selected_button).innerHTML=keybutton_selected[selected_button];
                document.getElementById("selected_button"+i).innerHTML=keybutton_selected[i];
                document.getElementById("selected_button"+selected_button).classList.remove("keyboard_button_selecting");
                document.getElementById("selected_button"+selected_button).classList.add("keyboard_button_selected");
                document.getElementById("keyboard_button"+keybutton_selected[i]).classList.remove("keyboard_button_selecting");
                document.getElementById("keyboard_button"+keybutton_selected[i]).classList.add("keyboard_button_selected");
                document.getElementById("selected_button"+selected_button).removeEventListener('keydown',set_keyboard_input);
                keybutton_isselecting[selected_button]=0;
                buttonRemindTxt(selected_button,set_word);
                return;
            }
            else if(set_word==keybutton_selected[i]&&selected_button==i)//输入和当前相同的按键，结束
            {
                document.getElementById("selected_button"+selected_button).classList.remove("keyboard_button_selecting");
                document.getElementById("selected_button"+selected_button).classList.add("keyboard_button_selected");
                document.getElementById("keyboard_button"+keybutton_selected[i]).classList.remove("keyboard_button_selecting");
                document.getElementById("keyboard_button"+keybutton_selected[i]).classList.add("keyboard_button_selected");
                document.getElementById("selected_button"+selected_button).removeEventListener('keydown',set_keyboard_input);
                keybutton_isselecting[selected_button]=0;
                buttonRemindTxt(selected_button,set_word);
                return;
            }
            else{
                //直到用户输入正确为止
            }
        }
        //不是已经使用的按键，直接替换
        let temp=keybutton_selected[selected_button];
        keybutton_selected[selected_button]=set_word;
        console.log(keybutton_selected);
        document.getElementById("selected_button"+selected_button).innerHTML=set_word;
        document.getElementById("selected_button"+selected_button).classList.remove("keyboard_button_selecting");
        document.getElementById("selected_button"+selected_button).classList.add("keyboard_button_selected");
        document.getElementById("keyboard_button"+temp).classList.remove("keyboard_button_selecting");
        document.getElementById("keyboard_button"+temp).classList.add("keyboard_button");
        document.getElementById("keyboard_button"+set_word).classList.remove("keyboard_button");
        document.getElementById("keyboard_button"+set_word).classList.add("keyboard_button_selected");
        document.getElementById("selected_button"+selected_button).removeEventListener('keydown',set_keyboard_input);
        keybutton_isselecting[selected_button]=0;
        buttonRemindTxt(selected_button,set_word);
    }
}
function buttonRemindTxt(num,set_word){
    while (document.getElementById("remind_txt_container").firstChild) {
        document.getElementById("remind_txt_container").removeChild(document.getElementById("remind_txt_container").firstChild);
    }
    if(checkIsSelecting())//请为第几条轨道选择按键
    {   
        let tempdiv=document.createElement("div");
        tempdiv.classList.add("keyboard_remind_txt");
        let remind_txt="请为第"+num+"条轨道选择按键";
        tempdiv.innerHTML=remind_txt;
        document.getElementById("remind_txt_container").appendChild(tempdiv);
        let timer1=setTimeout(function(){
            tempdiv.style.animationName="button_remind_txt_disapp";
        },2500);
    }
    else//第几条轨道的按键设置为
    {   button_remindtxt_judge=true;
        let tempdiv=document.createElement("div");
        tempdiv.classList.add("keyboard_remind_txt");
        let remind_txt="第"+num+"条轨道设置按键为"+set_word;
        tempdiv.innerHTML=remind_txt;
        document.getElementById("remind_txt_container").appendChild(tempdiv);
        let timer1=setTimeout(function(){
            tempdiv.style.animationName="button_remind_txt_disapp";
        },2500);
    }
}