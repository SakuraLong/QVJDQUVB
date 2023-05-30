var playerWebDatabaseJson = {
    "playername":"SakuraYoimiya",
    "bgid":1,
    "charId": "2u",
    "type": "online",
    "language": "zh-Hans",
    "score":0,
    "level":10,
    "fragments":0,
    "memories":0,
    "bgtop":"0%"
};  // 已经弃用
class BasePageData{
    playername = "";            // 玩家昵称
    playerid = "";              // 玩家id
    charId = "2u";              // 玩家选择的角色
    type = "offline";           // 登陆状态
    language = "en";            // 语言
    score = 0;                  // 玩家潜力值
    level = 0;                  // 玩家等级
    fragments = 0;              // 残片数量
    memories = 0;               // 记忆源点数量
    bgvolume = 0.5;             // 背景音乐声音
    menubg = 0;                 // 背景图片
    bgtop = "0%";               // 角色立绘的位置
    profile_dif = 2;            // 档案难度
    player_friends = null;        // 玩家好友
    song_json_file = null;      // songlist
    add_friend_waiting = null;  // 添加好友的等待组件
    login_waiting = null;       // 登录的等待组件
    register_waiting = null;       // 登录的等待组件
    constructor(){}
}
var base_page_data = new BasePageData();
var bgvolume = 0.5;
var first = true;
var loop = false;
var menu_bg_scroll = null;
function bodyfirstclicked(){
    if(first){
        setbuttonpre();
        document.getElementById("container").style.visibility = "visible";
        shutter_leave();
        document.getElementById("charimg").display = "none";
        document.getElementById("buttonGroup").display = "none";
        setTimeout(function(){
            showbuttongroup();
            charimginit(base_page_data.charId, "", base_page_data.bgtop);
        },100);
        setTimeout(function(){
            document.getElementById("bgaudio").play();
            document.getElementById("bgaudio").onended=function(){bgended();};
        },1000);
        autoupdatetonext();
        morePageScroll();       // 其他界面绑定scroll
        first = false;
    }
}
function getPlayerFriends(){
    // 获取好友
    // console.log("获取好友");
    if(window.localStorage.getItem("online")!="online") return;
    let search_xml_conn = new ArcaeaXMLConnector("search_friend", "", "POST", getPlayerFriendsCallback, null, getPlayerFriendsTimeout);
    search_xml_conn.setTimeout(1000);
    search_xml_conn.send();
}
function getPlayerFriendsCallback(msg){
    msg = JSON.parse(msg);
    console.log(msg);
    if(msg.success) base_page_data.player_friends = msg.friends;
}
function getPlayerFriendsTimeout(){
    // 测试
    base_page_data.player_friends = [{
        "username": "Sakura",
        "score": "10.00",
        "selectedcharid": "55",
        "songid": "grievouslady",
        "dif":"2",
        "lastestscore": "9800000",
        "time": "1683733731309"
     },
     {
        "username": "Yoimiya",
        "score": "0.00",
        "selectedcharid": "0",
        "songid": "",
        "dif":"",
        "lastestscore": "",
        "time": ""
     },
     {
        "username": "Yoimiya",
        "score": "0.00",
        "selectedcharid": "0",
        "songid": "",
        "dif":"",
        "lastestscore": "",
        "time": ""
     },
     {
        "username": "Yoimiya",
        "score": "0.00",
        "selectedcharid": "0",
        "songid": "",
        "dif":"",
        "lastestscore": "",
        "time": ""
     },
     {
        "username": "Yoimiya",
        "score": "0.00",
        "selectedcharid": "0",
        "songid": "",
        "dif":"",
        "lastestscore": "",
        "time": ""
     },
     {
        "username": "Sakura",
        "score": "10.00",
        "selectedcharid": "55",
        "songid": "grievouslady",
        "dif":"2",
        "lastestscore": "9800000",
        "time": "1683733731309"
     }];
}
function morePageScroll(){
    // 其他界面绑定scroll
    more_scroll = new Scroll(document.getElementById("more_about_text_main"), 0);
    friend_scroll = new Scroll(document.getElementById("netfrienddivbase"), 0);
}
function bgended(){
    document.getElementById("bgaudio").loop = true;
    document.getElementById("bgaudio").setAttribute("src", "../resources/audio/bgm_loop.ogg");
    document.getElementById("bgaudio").play();
    document.getElementById("bgaudio").onended="";
}
function pageinit(){
    localStorageDataCheck();    //  本地数据库基本值确认
    localStorageDataInit();     //  此界面用的所有本地数据库信息初始化
    pageDataInit();             //  此界面用的所有数据初始化
    getPlayerFriends();         //  获取好友
    playerData();               //  获取玩家分数
    SJsonInit();                //  songlist导入
    buttonsinit(base_page_data.language, base_page_data.type);
    musicinit();
    topbarinit( base_page_data.charId,
                base_page_data.playername,
                base_page_data.type,
                base_page_data.language,
                base_page_data.score,
                base_page_data.level,
                base_page_data.fragments,
                base_page_data.memories);
    movedivinit(base_page_data.language);
    updateinit();
    menuBgInit(base_page_data.menubg);  // 主页背景初始化
    elementLanguageInit(base_page_data.language, "mainPage"); // 文字
    promptInit(base_page_data.language);  // 提示框初始化
    // friendsElementInit();                   // 好友初始化 
}
function SJsonInit(){
    // songlist导入
    let json_path_song = "../resources/songs/songlist.json";
    base_page_data.song_list_json_reader = new jsonReader(json_path_song);
    let timer_1 = setInterval(function(){
        if(base_page_data.song_list_json_reader.onready()){
            clearInterval(timer_1);
            base_page_data.song_json_file = base_page_data.song_list_json_reader.backJson();
        }
    }, 100);
}
function friendsElementInit(){
    // 好友初始化 charjson在topbar
    if(base_page_data.player_friends==null||base_page_data.song_json_file==null){
        setTimeout(friendsElementInit, 50);
        return;
    }
    document.getElementById("netfrienddivson").innerHTML = "";
    console.log(base_page_data.player_friends);
    base_page_data.player_friends.forEach(function(item){
        let char_path = "../resources/char/" + item.selectedcharid + "_icon.png";
        let song_name = "";
        let friend_cell = new FriendCell(document.getElementById("netfrienddivson"), char_path, item.score, item.username, base_page_data.language, item.id);
        let song = base_page_data.song_json_file.songs.find(function(item_){
            return item_.idx == parseInt(item.songid);
        });
        if(song!=undefined){
            let time_ = new Date().getTime() - parseInt(item.time);
            console.log(new Date().getTime());
            console.log(parseInt(item.time));
            console.log(time_);
            song_name = song.title_localized[base_page_data.language] == null ? song.title_localized.en : song.title_localized[base_page_data.language];
            friend_cell.setLatestScore(
                formatDuring(time_),
                song_name,
                item.dif,
                item.lastestscore
            );
        }
        friend_cell.elementInit();
    });
}
function promptInit(language){
    // 提示框初始化
    language_prompt = new Prompt("language_prompt", "body", 0,
    base_language_data[language]["mainPage"]["morePage"]["prompt"]["title"],
    base_language_data[language]["mainPage"]["morePage"]["prompt"]["content"],
    base_language_data[language]["mainPage"]["morePage"]["prompt"]["answer"]);
    service_prompt = new Prompt("service_prompt", "body", 1,
    base_language_data[language]["mainPage"]["net"]["offline"]["registerPage"]["prompt"]["title"],
    base_language_data[language]["mainPage"]["net"]["offline"]["registerPage"]["prompt"]["content"],
    [base_language_data[language]["mainPage"]["net"]["offline"]["registerPage"]["prompt"]["answerLeft"],
    base_language_data[language]["mainPage"]["net"]["offline"]["registerPage"]["prompt"]["answerRight"]]);
    service_prompt.setLeaveFunc("leftLeave", servicePromptAgree);
    service_prompt.setLeaveFunc("rightLeave", servicePromptDecline);
    account_prompt = new Prompt("account_prompt", "body", 0,
    base_language_data[language]["mainPage"]["net"]["online"]["prompt"]["title"],
    base_language_data[language]["mainPage"]["net"]["online"]["prompt"]["content"],
    base_language_data[language]["mainPage"]["net"]["online"]["prompt"]["answer"]);
    search_friend_prompt = new Prompt("search_friend_prompt", "body", 1,
    base_language_data[language]["mainPage"]["net"]["online"]["addFriendsPrompt"]["title"],
    base_language_data[language]["mainPage"]["net"]["online"]["addFriendsPrompt"]["content"]["content"],
    [base_language_data[language]["mainPage"]["net"]["online"]["addFriendsPrompt"]["answerLeft"],
    base_language_data[language]["mainPage"]["net"]["online"]["addFriendsPrompt"]["answerRight"]]);
    search_friend_prompt.setLeaveFunc("leftLeave", searchPromptAdd);
    search_friend_prompt.setLeaveFunc("rightLeave", searchPromptLeave);
    search_friend_prompt.setMinHeight(100);
    base_page_data.add_friend_waiting = new Waiting(-1, "1%", -1, "1%", "img");
    base_page_data.add_friend_waiting.setBlackBg();
    base_page_data.login_waiting = new Waiting(-1, "47%", -1, "47%", "img");
    base_page_data.login_waiting.setBlackBg();
    base_page_data.login_waiting.setWidth("80px");
    base_page_data.register_waiting = new Waiting(-1, "47%", -1, "47%", "img");
    base_page_data.register_waiting.setBlackBg();
    base_page_data.register_waiting.setWidth("80px");
}
function localStorageDataInit(){
    // 此界面用的所有本地数据库信息初始化
    if(window.localStorage.getItem("menubg")==null){
        window.localStorage.setItem("menubg", 0);
    }
    if(window.localStorage.getItem("bgtop")==null){
        window.localStorage.setItem("bgtop", "0%");
    }
}
function pageDataInit(){
    // 此界面用的所有数据初始化
    base_page_data.playername = window.localStorage.getItem("playername");
    base_page_data.playerid = window.localStorage.getItem("playerid");
    base_page_data.charId = window.localStorage.getItem("charid");
    base_page_data.type = window.localStorage.getItem("online");
    base_page_data.language = window.localStorage.getItem("language");
    base_page_data.score = window.localStorage.getItem("score");
    base_page_data.level = window.localStorage.getItem("level");
    base_page_data.fragments = window.localStorage.getItem("fragments");
    base_page_data.memories = window.localStorage.getItem("memories");
    base_page_data.menubg = window.localStorage.getItem("menubg");
    base_page_data.bgtop = window.localStorage.getItem("bgtop");
}
function showbuttongroup(){
    document.getElementById("buttonGroup").style.display = "flex";
    document.getElementById("buttonGroup").style.animationName = "buttonGroupShow";
    document.getElementById("buttonGroup").onanimationend = function(){
        document.getElementById("buttonGroup").style.animationName = "nonenone";
    };
}
function jsoninit(){
    /* 解析上个界面传递的信息 已经弃用*/
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let jsonString = urlParams.get("data");
    let data = JSON.parse(jsonString);
    console.log(data);
    if(data["registered"]) playerWebDatabaseJson["type"] = "online";
    playerWebDatabaseJson["score"] = data["score"];
    playerWebDatabaseJson["level"] = data["level"];
    playerWebDatabaseJson["fragments"] = data["fragments"];
    playerWebDatabaseJson["memories"] = data["memories"];
    playerWebDatabaseJson["language"] = localStorage.getItem("language");
    playerWebDatabaseJson["playername"] = localStorage.getItem("playername");
    playerWebDatabaseJson["charId"] = localStorage.getItem("charid");
}
function buttonsinit(language, type){
    if(language=="zh-Hans"){
        var buttonGroupNames=document.getElementsByClassName("buttonGroupNames");
        for(var i=0; i<buttonGroupNames.length; i++) { 
            buttonGroupNames[i].style.fontWeight = "400";
            buttonGroupNames[i].style.letterSpacing = "2px";
        }
        document.getElementById("buttonNames").style.top = "-1%";
        document.getElementById("remind").innerHTML = "点击以进入";
    }else if(language=="en"){
        var buttonGroupNames=document.getElementsByClassName("buttonGroupNames");
        for(var i=0; i<buttonGroupNames.length; i++) { 
            buttonGroupNames[i].style.fontWeight = "900";
            buttonGroupNames[i].style.letterSpacing = "2px";
        }
        document.getElementById("buttonNames").style.top = "0%";
        document.getElementById("remind").innerHTML = "Click to Enter";
    }
    if(type=="offline"){
        try{
            document.getElementById("world").setAttribute("src", "../resources/layouts/mainmenu/world_offline.png");
            document.getElementById("world").setAttribute("id", "worldoffline");
        }catch(err){
            document.getElementById("worldoffline").setAttribute("src", "../resources/layouts/mainmenu/world_offline.png");
        }
        document.getElementById("worldtext").setAttribute("src", "../resources/layouts/mainmenu/world_text_offline.png");
    }else{
        try{
            document.getElementById("worldoffline").setAttribute("src", "../resources/layouts/mainmenu/world.png");
            document.getElementById("worldoffline").setAttribute("id", "world");
        }catch(err){
            document.getElementById("world").setAttribute("src", "../resources/layouts/mainmenu/world.png");
        }
        document.getElementById("worldtext").setAttribute("src", "../resources/layouts/mainmenu/world_text.png");
    }
}
function movedivinit(language){
    if(language == "en"){
        document.getElementById("movebtn1").innerHTML="Tutorial";
        document.getElementById("movebtn2").innerHTML="Language";
        document.getElementById("movebtn3").innerHTML="Manage Downloads";
    }else if(language == "zh-Hans"){
        document.getElementById("movebtn1").innerHTML="教程";
        document.getElementById("movebtn2").innerHTML="语言";
        document.getElementById("movebtn3").innerHTML="下载管理";
    }
}
function charimginit(charId, charidchage, bgtop){  //主页背景图片初始化
    base_page_data.charId = charId;
    base_page_data.bgtop = bgtop;
    window.localStorage.setItem("bgtop", bgtop);
    document.getElementById("charimg").style.display = "block";
    document.getElementById("charimg").style.backgroundImage = "url('../resources/char/" + charId + ".png')";
    document.getElementById("charimg").style.animationName = "charimgshow";
    document.getElementById("charimg").style.animationDuration = "0.3s";
    document.getElementById("charimg").style.animationIterationCount= "1";
    document.getElementById("charimg").style.animationTimingFunction = "easa-in-out";
    document.getElementById("charimg").style.top = bgtop;
    setTimeout(function(){
        document.getElementById("charimg").style.animationName = "charimgMoving";
        document.getElementById("charimg").style.animationDuration = "15s";
        document.getElementById("charimg").style.animationIterationCount = "infinite";
        document.getElementById("charimg").style.animationTimingFunction = "linear";},500)
}
function playButtonClick(){
    shutter_show();
	setTimeout(function(){gotoselectpage();},1500);
    // document.getElementById("shutteraudio").src = "../resources/audio/shutter_open.wav";
}
var basejson = {
    "registered": false,
    "score": 0.00,
    "level": 0,
    "fragments": 0,
    "memories": 0,
}
function gotoselectpage(){
    /* 去select 不需要传参了*/
    basejson["registered"] = true;
    basejson["score"] = playerWebDatabaseJson["score"];
    basejson["level"] = playerWebDatabaseJson["level"];
    basejson["fragments"] = playerWebDatabaseJson["fragments"];
    basejson["memories"] = playerWebDatabaseJson["memories"];
    let jsonString = JSON.stringify(basejson);
    // let url = "selectPage.html?data=" + encodeURIComponent(jsonString);
    let url = "selectPage.html";
    window.location.href = url;
}
function musicinit(){
    document.getElementById("bgaudio").volume = bgvolume;
    document.getElementById("shuttercloseaudio").volume = bgvolume;
    document.getElementById("shutteropenaudio").volume = bgvolume;
    document.getElementById("morepageshow").volume = bgvolume + 0.3;
    document.getElementById("morepageleave").volume = bgvolume + 0.1;
}
function moreButtonClick(){
    document.getElementById("morepageshow").play();
    document.getElementById("morediv").style.display = "block";
    document.getElementById("morebottom").style.animationName = "morebottomin";
    document.getElementById("moretop").style.animationName = "moretopin";
    document.getElementById("morerdiv").style.animationName = "morerdivin";
    document.getElementById("morebottom").style.animationDuration = "0.8s";
    document.getElementById("moretop").style.animationDuration = "0.8s";
    document.getElementById("morerdiv").style.animationDuration = "0.8s";
    document.getElementById("morebottom").style.animationDelay = "0.2s";
    document.getElementById("moretop").style.animationDelay = "0s";
    document.getElementById("morebottom").style.animationFillMode = "backwards";
    document.getElementById("moretop").style.animationFillMode = "backwards";
    document.getElementById("morerdiv").style.animationFillMode = "backwards";
}
function moredivClick(){
    document.getElementById("morepageleave").play();
    document.getElementById("morebottom").style.animationName = "morebottomleave";
    document.getElementById("moretop").style.animationName = "moretopleave";
    document.getElementById("morerdiv").style.animationName = "morerdivleave";
    document.getElementById("morebottom").style.animationDuration = "0.4s";
    document.getElementById("moretop").style.animationDuration = "0.4s";
    document.getElementById("morerdiv").style.animationDuration = "0.4s";
    document.getElementById("morebottom").style.animationDelay = "0s";
    document.getElementById("moretop").style.animationDelay = "0.1s";
    document.getElementById("morebottom").style.animationFillMode = "forwards";
    document.getElementById("moretop").style.animationFillMode = "forwards";
    document.getElementById("morerdiv").style.animationFillMode = "forwards";
    setTimeout(function(){document.getElementById("morediv").style.display = "none";},500);
}
function setLanguage(e){
    e.stopPropagation();//阻止事件冒泡即可
    let audio = new ClickAudio("../resources/audio/menu_in.wav");
    language_prompt.show();
}
function servicePromptAgree(){
    service_prompt.leave();
}
function servicePromptDecline(){
    service_prompt.leave();
}
function searchPromptAdd(){
    let add_str = document.getElementById("prompt_search_friend").value;
    let l = add_str.length;  // 判断长度
    if(!searchIdCheck("length", l)) return;
    add_str = add_str.replace(" ", "");  // 去除空格再判断一次
    l = add_str.length;
    if(!searchIdCheck("length", l)) return;
    if(!searchIdCheck("value", add_str)) return;  // 判断是否是数字
    if(!searchIdCheck("self", add_str)) return;  // 判断是否是自己
    addFriend(add_str);
}
function searchPromptLeave(){
    search_friend_prompt.setAllowLeave(true);
}
function searchIdCheck(type, value){
    switch(type){
        case "length": 
            if(value!=9){
                search_friend_prompt.setAllowLeave(false);
                document.getElementById("prompt_search_friend_alert").innerHTML = 
                base_language_data[base_page_data.language]["mainPage"]["net"]["online"]["addFriendsPrompt"]["content"]["prompt"]["input_prompt"];
                return false;
            }else{
                search_friend_prompt.setAllowLeave(true);
                document.getElementById("prompt_search_friend_alert").innerHTML = "";
                return true;
            }
        case "value":
            if(!isNaN(Number(value, 10))){
                search_friend_prompt.setAllowLeave(true);
                document.getElementById("prompt_search_friend_alert").innerHTML = "";
                return true;
            }else{
                search_friend_prompt.setAllowLeave(false);
                document.getElementById("prompt_search_friend_alert").innerHTML = 
                base_language_data[base_page_data.language]["mainPage"]["net"]["online"]["addFriendsPrompt"]["content"]["prompt"]["input_prompt"];
                return false;
            }
        case "self":
            if(value==base_page_data.playerid){
                search_friend_prompt.setAllowLeave(false);
                document.getElementById("prompt_search_friend_alert").innerHTML = 
                base_language_data[base_page_data.language]["mainPage"]["net"]["online"]["addFriendsPrompt"]["content"]["prompt"]["self_prompt"];
                return false
            }else{
                search_friend_prompt.setAllowLeave(true);
                document.getElementById("prompt_search_friend_alert").innerHTML = "";
                return true;
            }
    }
}
function addFriend(friend_id){
    // 添加好友
    if(window.localStorage.getItem("online")!="online") return;
    search_friend_prompt.setAllowLeave(false);
    let arcaea_XML_connector = new ArcaeaXMLConnector("add_friend", friend_id, "POST", addFriendCallback, addFriendWaiting, addFriendTimeout);
    arcaea_XML_connector.send();
}
function addFriendCallback(msg){
    // 查询到 分情况讨论
    msg = JSON.parse(msg);
    if(msg.success){
        if(window.localStorage.getItem("online")!="online") return;
        let search_xml_conn = new ArcaeaXMLConnector("search_friend", "", "POST", getAddPlayerFriendsCallback, null, getPlayerFriendsTimeout);
        search_xml_conn.setTimeout(1000);
        search_xml_conn.send();
    }else{
        if(msg.error=="cannot-add-self-as-friend"){
            document.getElementById("prompt_search_friend_alert").innerHTML = 
            base_language_data[base_page_data.language]["mainPage"]["net"]["online"]["addFriendsPrompt"]["content"]["prompt"]["self_prompt"];
        }else if(msg.error=="already-friends"){
            document.getElementById("prompt_search_friend_alert").innerHTML = 
            base_language_data[base_page_data.language]["mainPage"]["net"]["online"]["addFriendsPrompt"]["content"]["prompt"]["repetition_prompt"];
        }else if(msg.error=="user-not-exist"){
            document.getElementById("prompt_search_friend_alert").innerHTML = 
            base_language_data[base_page_data.language]["mainPage"]["net"]["online"]["addFriendsPrompt"]["content"]["prompt"]["exist_prompt"];
        }
    }
}
function getAddPlayerFriendsCallback(msg){
    msg = JSON.parse(msg);
    // console.log(msg);
    if(msg.success){
        base_page_data.player_friends = msg.friends;
        friendsElementInit();
        searchPromptLeave();
    }else{
       
    }
}
function addFriendWaiting(is_waiting){
    if(is_waiting){
        // console.log("开始等待");
        base_page_data.add_friend_waiting.appendToElementById("body");
    }else{
        base_page_data.add_friend_waiting.waitingOver();
    }
}
function addFriendTimeout(){
    // 超时
    document.getElementById("prompt_search_friend_alert").innerHTML = 
    base_language_data[base_page_data.language]["mainPage"]["net"]["online"]["addFriendsPrompt"]["content"]["prompt"]["error"];
}
function addFriendButtonClick(){
    search_friend_prompt.show();
}
function netdivClick(){
    document.getElementById("morepageleave").play();
    document.getElementById("netbottom").style.animationName = "morebottomleave";
    document.getElementById("nettop").style.animationName = "moretopleave";
    document.getElementById("netrightdiv").style.animationName = "netrightmleave";//1
    document.getElementById("netbottom").style.animationDuration = "0.4s";
    document.getElementById("nettop").style.animationDuration = "0.4s";
    document.getElementById("netrightdiv").style.animationDuration = "0.4s";//1
    document.getElementById("netbottom").style.animationDelay = "0s";
    document.getElementById("nettop").style.animationDelay = "0.1s";
    document.getElementById("netrightdiv").style.animationDelay = "0.1s";//1
    document.getElementById("netbottom").style.animationFillMode = "forwards";
    document.getElementById("nettop").style.animationFillMode = "forwards";
    document.getElementById("netrightdiv").style.animationFillMode = "forwards";//1
    setTimeout(function(){document.getElementById("netdiv").style.display = "none";},500);
    
}
function netButtonClick(){
    document.getElementById("morepageshow").play();
    document.getElementById("nettop_logged").style.display="none";//1
    document.getElementById("nettop_unlogged").style.display="none";//1
    document.getElementById("nettop_log").style.display="none";//1
    document.getElementById("nettop_sign").style.display="none";//1
    document.getElementById("netright_logged").style.display="none";//1
    document.getElementById("netright_other").style.display="none";//1
    if(base_page_data.type=="offline"){//1
        // 未登录
        document.getElementById("nettop_unlogged").style.display="block";
        document.getElementById("netright_other").style.display="block";
        judge_log=1;
    }
    else{
        // 登录
        document.getElementById("nettop_logged").style.display="block";
        document.getElementById("netright_logged").style.display="block";
        judge_log=0;
        document.getElementById("playernameshow").innerHTML = base_page_data.playername;
        document.getElementById("playeridshow").innerHTML = "ID:" + playeridAddSpace(base_page_data.playerid);
        friendsElementInit();
    }//1
    document.getElementById("netdiv").style.display = "block";
    document.getElementById("netbottom").style.animationName = "morebottomin";
    document.getElementById("nettop").style.animationName = "moretopin";
    document.getElementById("netrightdiv").style.animationName = "netrighttomin";//1
    // document.getElementById("morerdiv").style.animationName = "morerdivin";
    document.getElementById("netbottom").style.animationDuration = "0.8s";
    document.getElementById("nettop").style.animationDuration = "0.8s";
    document.getElementById("netrightdiv").style.animationDuration = "0.8s";//1
    // document.getElementById("morerdiv").style.animationDuration = "0.8s";
    document.getElementById("netrightdiv").style.animationDelay = "0s";//1
    document.getElementById("netbottom").style.animationDelay = "0.2s";
    document.getElementById("nettop").style.animationDelay = "0s";
    document.getElementById("netrightdiv").style.animationFillMode = "backwards";//1
    document.getElementById("netbottom").style.animationFillMode = "backwards";
    document.getElementById("nettop").style.animationFillMode = "backwards";
}
var user_name;//1
var user_password;//1
function user_logClick(){//1
    // console.log("!23");
    document.getElementById("nettop_unlogged").style.display="none";
    document.getElementById("nettop_log").style.display="block";
    document.getElementById("nettop_log").style.animationName = "netuser_logapp";//1
    document.getElementById("nettop_log").style.animationDuration = "0.4s";
    document.getElementById("nettop_log").style.animationDelay = "0s";
    document.getElementById("nettop_log").style.animationFillMode = "forwards";//1
    document.getElementById("username").value="";
    document.getElementById("password").value="";
    document.getElementById("login_error").innerHTML = "";
}
function user_signClick(){//1
    // console.log("123");
    document.getElementById("nettop_unlogged").style.display="none";
    document.getElementById("nettop_sign").style.display="block";
    document.getElementById("nettop_sign").style.animationName = "netuser_logapp";//1
    document.getElementById("nettop_sign").style.animationDuration = "0.4s";
    document.getElementById("nettop_sign").style.animationDelay = "0s";
    document.getElementById("nettop_sign").style.animationFillMode = "forwards";//1
    document.getElementById("sign_password").value = "";
    document.getElementById("sign_password_confirm").value = "";
    document.getElementById("sign_username").value = "";
}
function accmountManagement(){
    account_prompt.show();
}
function accountLogout(){
    account_prompt.leave();
    window.localStorage.setItem("online", "offline");
    shutter_show();
    netdivClick();
    setTimeout(function(){
        shutter_leave();
        document.getElementById("charimg").display = "none";
        document.getElementById("buttonGroup").display = "none";
        setTimeout(function(){
            showbuttongroup();
            charimginit(base_page_data.charId, "", base_page_data.bgtop);
        },100);
        pageinit();
        changeSize('mainPage');
    }, 1500);
    console.log("登出");
}
function accountDelete(){
    let xml_conn = new ArcaeaXMLConnector("delete", "", "POST", accountDeleteCallback, accountDeleteWaiting, accountDeleteTimeout);
    xml_conn.send();
    console.log("登出");
}
function accountDeleteCallback(msg){
    msg = JSON.parse(msg);
    console.log(msg);
    if(msg.success){
        account_prompt.leave();
        window.localStorage.setItem("online", "offline");
        shutter_show();
        netdivClick();
        setTimeout(function(){
            shutter_leave();
            document.getElementById("charimg").display = "none";
            document.getElementById("buttonGroup").display = "none";
            setTimeout(function(){
                showbuttongroup();
                charimginit(base_page_data.charId, "", base_page_data.bgtop);
            },100);
            pageinit();
            changeSize('mainPage');
        }, 1500);
    }
}
function accountDeleteWaiting(is_waiting){

}
function accountDeleteTimeout(){

}
function cloudClick(){
    // 云端同步
    let a = window.localStorage.getItem("playername");
    let b = new ArcaeaCode().dataDecrypt(window.localStorage.getItem("playerpassword"), BASE_CODE);
    playerLogin(a, b);
}
function playerLogin(a, b){
    // 玩家点击登录 检查字段是否填写
    let player_name = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if(a!=null&&b!=null){
        player_name = a;
        password = b;
    }
    // 此时都没有加密
    if(player_name==""||password=="") return;
    else{
        // 执行登录
        password = password.toString();
        password = new ArcaeaCode().dataEncrypt(password, BASE_CODE);
        window.localStorage.setItem("playerpassword", password);
        window.localStorage.setItem("playername", player_name);
        let login_xml_conn = new ArcaeaXMLConnector("login", [player_name, password], "POST", playerLoginCallback, playerLoginWaiting, playerLoginTimeout);
        login_xml_conn.send();
    }
}
function playerData(){
    // 读取玩家歌曲分数信息
    let login_xml_conn = new ArcaeaXMLConnector("search_player_data", null, "POST", playerDataCallback, null, playerDataTimeout);
    login_xml_conn.send();
}
function playerDataCallback(msg){
    msg = JSON.parse(msg);
    if(msg.success){
        let sj = new SaveJson(0)
        sj.put("playerdata", msg.score);
        let save_pack_data = new SavePackData();
        save_pack_data.createPackJson_check();// 刷新
        save_pack_data.setReadyCallback(savePackDataCallback);
    }else{

    }
}
function playerDataTimeout(){
    console.log("playerDataTimeout");
}
function savePackDataCallback(){
    // 刷新完毕
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
                // console.log(set);
            }
        }
    }
    save_json.put("packdata", pack_data);
}
function playerLoginCallback(msg){
    // 登录回调函数
    msg = JSON.parse(msg);
    // console.log(msg);
    if(msg.success){
        // seed是加密之后的
        window.localStorage.setItem("online", "online");
        window.localStorage.setItem("playerid", msg.id);
        window.localStorage.setItem("seed", msg.seed.toString());
        window.localStorage.setItem("charid", msg.selectedcharid.toString());
        window.localStorage.setItem("playername", msg.username);
        window.localStorage.setItem("memories", msg.usermemory);
        window.localStorage.setItem("fragments", msg.userfragment);
        window.localStorage.setItem("loginnumber", new ArcaeaCode().dataEncrypt(msg.loginnumber.toString(), new ArcaeaCode().dataDecrypt(msg.seed.toString(), BASE_CODE)));
        window.localStorage.setItem("score", msg.score.toString());
        netdivClick();
        shutter_show();
        playerData();
        setTimeout(function(){
            shutter_leave();
            document.getElementById("bgaudio").onended=function(){bgended();};
            document.getElementById("charimg").display = "none";
            document.getElementById("buttonGroup").display = "none";
            setTimeout(function(){
                for(let i=0;i<charjson["char"].length;i++){
                    if(charjson["char"][i]["idx"]==base_page_data.charId){
                        if(document.getElementById("charshowerimg")!=null){
                            base_page_data.bgtop = charjson["char"][i]["top"];
                            window.localStorage.setItem("bgtop", base_page_data.bgtop);
                        }
                        break;
                    }
                }
                showbuttongroup();
                charimginit(base_page_data.charId, "", base_page_data.bgtop);
            },100);
            setTimeout(()=>{document.getElementById("bgaudio").play()}, 1500);
            pageinit();
            changeSize('mainPage');
        }, 1500);
    }else{
        if(msg.error=="login-failed"){
            document.getElementById("login_error").innerHTML = 
            base_language_data[base_page_data.language].mainPage.net.offline.loginPage.loginError.incorrect;
        }
    }
}
function playerLoginWaiting(is_waiting){
    // 登录等待
    if(is_waiting){
        base_page_data.login_waiting.appendToElementById("body");
    }else{
        base_page_data.login_waiting.waitingOver();
    }
}
function playerLoginTimeout(){
    // 登录超时
    document.getElementById("login_error").innerHTML = 
    base_language_data[base_page_data.language]["mainPage"]["net"]["offline"]["loginPage"]["loginError"]["error"];
}
function playerRegister(){
    // 玩家点击注册 检查字段是否填写
    let sign_password = document.getElementById("sign_password").value;
    let sign_password_confirm = document.getElementById("sign_password_confirm").value;
    let sign_username = document.getElementById("sign_username").value;
    if(sign_password==""||sign_password_confirm==""||sign_username=="") return;
    if(sign_password===sign_password_confirm){
        document.getElementById("sign_error").innerHTML = "";
        let register_xml_conn = new ArcaeaXMLConnector("register", [sign_username, sign_password], "POST", playerRegisterCallback, playerRegisterWaiting, playerRegisterTimeout);
        register_xml_conn.send();
    }else{
        document.getElementById("sign_error").innerHTML = 
        base_language_data[base_page_data.language].mainPage.net.offline.registerPage.registerError.confirm;
    }
}
function playerRegisterCallback(msg){
    // 注册回调函数
    msg = JSON.parse(msg);
    if(msg.success){
        // 注册成功 执行登录
        let user_name = window.localStorage.getItem("playername");
        let seed = new ArcaeaCode().dataDecrypt(window.localStorage.getItem("seed"), BASE_CODE);
        let password = new ArcaeaCode().dataDecrypt(window.localStorage.getItem("playerpassword"), BASE_CODE);
        playerLogin(user_name, password);
    }else{
        if(msg.error=="username-is-repeated"){
            document.getElementById("sign_error").innerHTML = 
            base_language_data[base_page_data.language].mainPage.net.offline.registerPage.registerError.repeat;
        }
    }
}
function playerRegisterWaiting(is_waiting){
    // 注册等待
    if(is_waiting){
        base_page_data.register_waiting.appendToElementById("body");
    }else{
        base_page_data.register_waiting.waitingOver();
    }
}
function playerRegisterTimeout(){
    // 登录超时
    document.getElementById("sign_error").innerHTML = 
    base_language_data[base_page_data.language]["mainPage"]["net"]["offline"]["registerPage"]["registerError"]["error"];
}
function changeLanguage(language){
    /* 此函数为选择语言被点击之后调用
        输入需要切换到的语言  en  zh_Hans
    */
    if(window.localStorage.getItem("language")==language) return;
    language_prompt.leave();
    document.getElementById("bgaudio").setAttribute("src", "../resources/audio/bgm_full.ogg");
    window.localStorage.setItem("language", language);
    shutter_show();
    setTimeout(function(){
        moredivClick();
        shutter_leave();
        document.getElementById("bgaudio").onended=function(){bgended();};
        document.getElementById("charimg").display = "none";
        document.getElementById("buttonGroup").display = "none";
        setTimeout(function(){
            showbuttongroup();
            charimginit(base_page_data.charId, "", base_page_data.bgtop);
        },100);
        setTimeout(()=>{document.getElementById("bgaudio").play()}, 1500);
        pageinit();
        changeSize('mainPage');
    }, 1500);
}
function menuBgInit(id){
    if(id==0){
        document.getElementById("container").style.animationName = "backgroundMoving";
        document.getElementById("container").style.animationDuration = "40s";
        document.getElementById("container").style.backgroundImage = "url('../resources/img/scenery/scenery_bg_default.png')";
    }else{
        document.getElementById("container").style.animationName = "backgroundMoving1";
        document.getElementById("container").style.animationDuration = "70s";
        document.getElementById("container").style.backgroundImage = "url('../resources/img/world/" + id.toString() + ".jpg')";
    }
}
function changeBg(id){
    if(id==base_page_data.menubg) return;
    if(!menu_bg_scroll.isAllowClick()) return;
    base_page_data.menubg = id;
    menu_bg_scroll.delete();
    window.localStorage.setItem("menubg", id);
    shutter_show();
    document.getElementById("bgaudio").setAttribute("src", "../resources/audio/bgm_full.ogg");
    setTimeout(function(){
        document.getElementById("sceslabel").style.display = "none";
        if(id==0){
            document.getElementById("container").style.animationName = "backgroundMoving";
            document.getElementById("container").style.animationDuration = "40s";
            document.getElementById("container").style.backgroundImage = "url('../resources/img/scenery/scenery_bg_default.png')";
        }else{
            document.getElementById("container").style.animationName = "backgroundMoving1";
            document.getElementById("container").style.animationDuration = "70s";
            document.getElementById("container").style.backgroundImage = "url('../resources/img/world/" + id.toString() + ".jpg')";
        }
        shutter_leave();
        document.getElementById("bgaudio").onended=function(){bgended();};
        setTimeout(()=>{document.getElementById("bgaudio").play()}, 1200);
        document.getElementById("charimg").display = "none";
        document.getElementById("buttonGroup").display = "none";
        setTimeout(function(){
            showbuttongroup();
            charimginit(base_page_data.charId, "", base_page_data.bgtop);
        },100);
    }, 1500);
}

function selectBgimgShow(){
    menu_bg_scroll = new Scroll(document.getElementById("sceneryselectermain"), 1);
    menu_bg_scroll.moveTo(0, false);
    document.getElementById("sceslabel").style.display = "block";
    document.getElementById("sceslabel").style.animationName = "showsceslabel";
    document.getElementById("sceslabel").style.animationFillMode = "forwards";
    for(let i=0;i<8;i++){
        document.getElementById("scenery" + i.toString()).onclick=function (e){
            e.stopPropagation();//阻止事件冒泡即可
            changeBg(i);
        };
        if(i==base_page_data.menubg){
            document.getElementById("scenery" + i.toString()).setAttribute("class", "unsceneryelements");
        }else{
            document.getElementById("scenery" + i.toString()).setAttribute("class", "sceneryelements");
        }
    }
}

function selectBgimgLeave(){
    if(!menu_bg_scroll.isAllowClick()) return;
    document.getElementById("sceslabel").style.animationName = "leavesceslabel";
    menu_bg_scroll.delete();
    setTimeout(function(){
        document.getElementById("sceslabel").style.display = "none";
    }, 500);
}

function updateinit(){
    document.getElementById("updatemsg").innerHTML = "";
    let json_path = "../resources/songs/update.json";
    jsonreader_update = new jsonReader(json_path);
    let updatejson = null;
    let timer_0 = setInterval(function(){
        if(jsonreader_update.onready()){
            clearInterval(timer_0);
            updatejson = jsonreader_update.backJson();
            updateinit_(updatejson);
        }
    }, 20);
}
var updatenowindex = 0;
var updatelen = 0;
var updateallowtonext = true;
var updatetimer = null;
function updateinit_(updatejson){
    updatelen = updatejson["update"].length;
    for(let i=0;i<updatejson["update"].length;i++){
        if(updatejson["update"][i]["type"]=="song"){
            addupdatesong(updatejson["update"][i]["id"], i);
        }else{
            addupdatepack(updatejson["update"][i]["id"], i);
        }
    }
}
function addupdatesong(id, i){
    let updatesongbg = document.createElement("div");
    updatesongbg.setAttribute("id", "updatesongbg" + i.toString());
    updatesongbg.setAttribute("class", "updatesongbg");
    updatesongbg.style.left = 200*i.toString() + "px";
    document.getElementById("updatemsg").appendChild(updatesongbg);

    let updatesongbgshadow = document.createElement("div");
    updatesongbgshadow.setAttribute("id", "updatesongbgshadow" + i.toString());
    updatesongbgshadow.setAttribute("class", "updatesongbgshadow");
    document.getElementById("updatesongbg" + i.toString()).appendChild(updatesongbgshadow);

    let updatesongimg = document.createElement("div");
    updatesongimg.setAttribute("id", "updatesongimg" + i.toString());
    updatesongimg.setAttribute("class", "updatesongimg");
    updatesongimg.style.backgroundImage = "url('../resources/songs/" + id + "/base_256.jpg')";
    document.getElementById("updatesongbgshadow" + i.toString()).appendChild(updatesongimg);
}
function addupdatepack(id, i){
    let updatepackbg = document.createElement("div");
    updatepackbg.setAttribute("id", "updatepackbg" + i.toString());
    updatepackbg.setAttribute("class", "updatepackbg");
    updatepackbg.style.left = 200*i.toString() + "px";
    document.getElementById("updatemsg").appendChild(updatepackbg);

    let updatepackbgshadow = document.createElement("div");
    updatepackbgshadow.setAttribute("id", "updatepackbgshadow" + i.toString());
    updatepackbgshadow.setAttribute("class", "updatepackbgshadow");
    document.getElementById("updatepackbg" + i.toString()).appendChild(updatepackbgshadow);

    let updatepackimg = document.createElement("div");
    updatepackimg.setAttribute("id", "updatepackimg" + i.toString());
    updatepackimg.setAttribute("class", "updatepackimg");
    updatepackimg.style.backgroundImage = "url('../resources/songs/pack/select_" + id + ".png')";
    document.getElementById("updatepackbgshadow" + i.toString()).appendChild(updatepackimg);
}
function clickUpdateEle(type, idx){
    if(type=="song"){
        window.localStorage.setItem("PoS", "song");
        let sj = new SaveJson(0);
        
    }else if(type=="pack"){
        window.localStorage.setItem("PoS", "pack");
    }
}
function autoupdatetonext(){
    clearTimeout(updatetimer);
    updatetimer = setTimeout(function(){
        updatescrolltonext();
    }, 4000);
}
function updatescrolltonext(){
    if(updatenowindex==updatelen-1&&updateallowtonext){
        autoupdatetonext();
        updatenowindex = 0;
        updatescrollmoveanimation(document.getElementById("updatemsg").scrollLeft, 0, 0.8, 120, 0, "ease-out1");
    }else if(updateallowtonext){
        autoupdatetonext();
        updatenowindex++;
        updatescrollmoveanimation(document.getElementById("updatemsg").scrollLeft, document.getElementById("updatemsg").scrollLeft + 200, 0.7, 120, 0, "ease-out");
    }
}

function updatescrollmoveanimation(begin, end, time, frames, times, type){
    updateallowtonext = false;
    let pertime = 1/frames;  //获取一帧动画多少秒
    let ltime = time/pertime;  // 获取一共循环几次
    // document.getElementById("appname").innerHTML = ltime;
    let lmove = (end - begin)/ltime;  //获取每次循环移动多少
    let ratio = 0;
    let x = times/ltime; //x值
    if(times == ltime){
        updateallowtonext = true;
        return;
    }
    if(type == "linear"){
        ratio = x;
    }else if(type == "ease-in-out"){
        ratio = x*x;
    }else if(type == "ease-out"){
        ratio = -x*x + 2*x;
    }else if(type == "ease-out1"){
        ratio = Math.sqrt(1-(x-1)*(x-1));
    }
    document.getElementById("updatemsg").scrollLeft=begin + (end-begin)*ratio;
    setTimeout(function(){updatescrollmoveanimation(begin, end, time, frames, times+1, type);},pertime);
}
function changeProfileDif(e){
    let audio = new ClickAudio("../resources/audio/item_click.wav");
    e.stopPropagation();//阻止事件冒泡即可
    base_page_data.profile_dif += 1;
    if(base_page_data.profile_dif == 4) base_page_data.profile_dif = 0;
    switch(base_page_data.profile_dif){
        case 0: document.getElementById("profile_dif_bg").innerHTML = "PST";
                document.getElementById("profile_dif_bg").setAttribute("data-text", "PST");
                document.getElementById("profile_dif_bg").setAttribute("class", "profile_PST");
                break;
        case 1: document.getElementById("profile_dif_bg").innerHTML = "PRS";
                document.getElementById("profile_dif_bg").setAttribute("data-text", "PRS");
                document.getElementById("profile_dif_bg").setAttribute("class", "profile_PRS");
                break;
        case 2: document.getElementById("profile_dif_bg").innerHTML = "FTR";
                document.getElementById("profile_dif_bg").setAttribute("data-text", "FTR");
                document.getElementById("profile_dif_bg").setAttribute("class", "profile_FTR");
                break;
        case 3: document.getElementById("profile_dif_bg").innerHTML = "BYD";
                document.getElementById("profile_dif_bg").setAttribute("data-text", "BYD");
                document.getElementById("profile_dif_bg").setAttribute("class", "profile_BYD");
                break;
    }
    profileMsg(base_page_data.profile_dif);
}
function hideProfile(){
    base_page_data.profile_dif = 2;
    document.getElementById("profile_page").style.animationName = "profile_page_out";
    document.getElementById("buttonGroup").style.visibility = "visible";
    document.getElementById("charimg").style.visibility = "visible";
    setTimeout(function(){
        document.getElementById("profile_page").style.display = "none";
    }, 500);
}
function showProfile(){
    // 展示用户档案
    netdivClick();
    document.getElementById("buttonGroup").style.visibility = "hidden";
    document.getElementById("charimg").style.visibility = "hidden";
    document.getElementById("profile_page").style.display = "block";
    document.getElementById("profile_page").style.animationName = "profile_page_in";
    profileCharimgInit();
    document.getElementById("profile_username").innerHTML = base_page_data.playername;
    document.getElementById("profile_username").setAttribute("data-text", base_page_data.playername);
    document.getElementById("profile_userid").innerHTML = "ID: " + playeridAddSpace(base_page_data.playerid);
    document.getElementById("profile_userid").setAttribute("data-text", "ID: " + playeridAddSpace(base_page_data.playerid));
    let score_arr = base_page_data.score.split(".");
    document.getElementById("profile_ratingtextm").setAttribute("data-text", score_arr[0] + ".");
    document.getElementById("profile_ratingtextm").innerHTML = score_arr[0] + ".";
    document.getElementById("profile_ratingtexts").setAttribute("data-text", score_arr[1]);
    document.getElementById("profile_ratingtexts").innerHTML = score_arr[1];
    let s = parseFloat(base_page_data.score);
    let src_str = "../resources/img/rating_";
    if(s>=0&&s<=3.49) src_str += "0.png";
    else if(s>=3.50&&s<=6.99) src_str += "1.png";
    else if(s>=7.00&&s<=9.99) src_str += "2.png";
    else if(s>=10.00&&s<=10.99) src_str += "3.png";
    else if(s>=11.00&&s<=11.99) src_str += "4.png";
    else if(s>=12.00&&s<=12.49) src_str += "5.png";
    else if(s>=12.50&&s<=12.99) src_str += "6.png";
    else if(s>=13.00) src_str += "7.png";
    document.getElementById("profile_onlinerateimg").setAttribute("src", src_str);
    document.getElementById("profile_dif_bg").innerHTML = "FTR";
    document.getElementById("profile_dif_bg").setAttribute("data-text", "FTR");
    document.getElementById("profile_dif_bg").setAttribute("class", "profile_FTR");
    profileMsg(2);
}
function profileMsg(dif){
    let all = 0;
    let clr = 0;
    let fr = 0;
    let pr = 0;
    let player_data = new SaveJson(0);
    player_data = player_data.get("playerdata");
    base_page_data.song_json_file.songs.forEach(function(item){
        if(item.difficulties[dif]!=null) all++;
        let player_data_item = player_data.find(function(item_){
            return item_.song_id==item.id&&item_.dif==dif.toString();
        });
        if(player_data_item!=null&&player_data_item!=undefined){
            if(parseInt(player_data_item.cleartype)>=1) clr++;
            if(parseInt(player_data_item.cleartype)>=4) fr++;
            if(parseInt(player_data_item.cleartype)>=5) pr++;
        }
    });
    document.getElementById("profile_clear_amount").innerHTML = clr.toString()+"/"+all.toString();
    document.getElementById("profile_full_amount").innerHTML = fr.toString()+"/"+all.toString();
    document.getElementById("profile_pure_amount").innerHTML = pr.toString()+"/"+all.toString();
}
function profileCharimgInit(){  //主页背景图片初始化
    charId = base_page_data.charId;
    bgtop = base_page_data.bgtop;
    document.getElementById("profile_char").style.backgroundImage = "url('../resources/char/" + charId + ".png')";
    document.getElementById("profile_char").style.animationName = "charimgshow";
    document.getElementById("profile_char").style.animationDuration = "0.3s";
    document.getElementById("profile_char").style.animationIterationCount= "1";
    document.getElementById("profile_char").style.animationTimingFunction = "easa-in-out";
    document.getElementById("profile_char").style.top = bgtop;
    if(base_page_data.menubg==0){
        document.getElementById("profile_bg").style.backgroundImage = "url('../resources/img/scenery/scenery_bg_default.png')";
    }else{
        document.getElementById("profile_bg").style.backgroundImage = "url('../resources/img/world/" + base_page_data.menubg.toString() + ".jpg')";
    }
    setTimeout(function(){
        document.getElementById("profile_char").style.animationName = "charimgMoving";
        document.getElementById("profile_char").style.animationDuration = "15s";
        document.getElementById("profile_char").style.animationIterationCount = "infinite";
        document.getElementById("profile_char").style.animationTimingFunction = "linear";},500)
}
function playeridAddSpace(playerid) {
    // 从后向前每三位添加一个空格
    let result = '';
    for (let i = playerid.length - 1; i >= 0; i--) {
        result = playerid[i] + result;
        if ((playerid.length - i) % 3 === 0 && i !== 0) {
        result = " " + result;
        }
    }
    return result;
}


function screenshot(){
    // let shower = new hitshower(100, 500, 2, 100, document.getElementById("rightArea"), "jsja");
    // console.log(decode(quizData));
    // capturePage();
    getPlayerScoreData();
}
function intToStr(num) {
    // 将数字转换为字符串
    let str = num.toString();
    // 在字符串前面添加 0，直到字符串长度为 8
    while (str.length < 8) {
        str = '0' + str;
    }
    // 从后向前每三位添加一个空格
    let result = '';
    for (let i = str.length - 1; i >= 0; i--) {
        result = str[i] + result;
        if ((str.length - i) % 3 === 0 && i !== 0) {
        result = "'" + result;
        }
    }
    return result;
}
function formatDuring(millisecond){
    let years = parseInt(millisecond / (1000 * 60 * 60 * 24 * 365));
    let days = parseInt(millisecond / (1000 * 60 * 60 * 24));
    let hours = parseInt((millisecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = parseInt((millisecond % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = (millisecond % (1000 * 60)) / 1000;
    if(years!=0) return years.toString() + base_language_data[base_page_data.language]["mainPage"]["net"]["online"]["y"];
    else if(days!=0) return days.toString() + base_language_data[base_page_data.language]["mainPage"]["net"]["online"]["d"];
    else if(hours!=0) return hours.toString() + base_language_data[base_page_data.language]["mainPage"]["net"]["online"]["h"];
    else if(minutes!=0) return minutes.toString() + base_language_data[base_page_data.language]["mainPage"]["net"]["online"]["m"];
    else if(seconds!=0) return base_language_data[base_page_data.language]["mainPage"]["net"]["online"]["now"];
}