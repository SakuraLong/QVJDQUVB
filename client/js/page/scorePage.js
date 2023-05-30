var playerWebDatabaseJson = {
    "playername":"sakuraYoimiya",
    "charId": "7",
    "type": "online",
    "language": "en",
    "score":10.25,
    "level":1,
    "fragments":20911,
    "memories":10220
};
/*  这部分的部分信息应该是根据songid去songlist.json中查找
    result 0:track lost 1:track complete 2:full recall 3:pure memory
    level 0:D 1:C 2:B 3:A 4:AA 5:EX 6:EX+  <-- 根据分数判断
*/
var playingdata_test = {
    "songid": "defection",
    "songidx": "",
    "name": "Defection",
    "author": "TeddyLoid feat. DELTA",
    "difficult": "Future 10+",
    "clear_type": 5,
    "hp": [100, 100], // 此处如果是创世光就是数组[100, 100] 其余都是数字 都是 1-100
    "score": 10001141,
    "pure": 1141,
    "early_pure":10,
    "late_pure":20,
    "far": 0,
    "lost": 0,
    "max_recall": 1141
};
// playingdata由上一个界面传递而来
var bgvolume = 0.5;
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
    song_json_file = null;      // 歌曲列表
    xml_connector = null;       // api类
    waiting = null;             // 等待ing
    prompt = null;              // 得分上传超时提示器
    hp = null;                  // 血条
    result ={
        "playing":{
            "songid": "",
            "name": "",
            "author": "",
            "difficult": "",
            "clear_type": 0,
            "hp": 0,
            "score": 0,
            "pure": 0,
            "early_pure":0,
            "late_pure":0,
            "far": 0,
            "lost": 0,
            "max_recall": 0
        }
    }
    constructor(){}
}
var base_page_data = new BasePageData();
var first = true;
function bodyFirstClicked(){
    if(first){
        document.getElementById("rbottombuttons").style.visibility = "hidden";
        document.getElementById("rewardlabel").style.visibility = "hidden";
        document.getElementById("container").style.visibility = "visible";
        base_page_data.xml_connector = new ArcaeaXMLConnector("send_score",base_page_data["result"], "POST", scoreCallBack, scoreWaiting, scoreTimeout);
        base_page_data.xml_connector.setTimeout(1000);
        base_page_data.waiting = new Waiting(-1, "1%", -1, "1%", "img");
        base_page_data.prompt = new Prompt(
            "score_prompt",
            "body", 
            1, 
            base_language_data[base_page_data.language]["scorePage"]["prompt"]["title"],
            base_language_data[base_page_data.language]["scorePage"]["prompt"]["content"],
            base_language_data[base_page_data.language]["scorePage"]["prompt"]["answer"]);
            base_page_data.prompt.setLeaveFunc("leftLeave", scoreRetry);
            base_page_data.prompt.setLeaveFunc("rightLeave", scoreIgnore);
        shutter_leave();
        setTimeout(function(){
            // 开始进行数据传递
            base_page_data.xml_connector.send();
            if(base_page_data.result["playing"]["clear_type"]==0) document.getElementById("bgaudio").setAttribute("src", "../resources/audio/res_fail_full.ogg");
            document.getElementById("bgaudio").play();
            document.getElementById("bgaudio").onended = function(){
                if(base_page_data.result["playing"]["clear_type"]==0) document.getElementById("bgaudio").setAttribute("src", "../resources/audio/res_fail_loop.ogg");
                else document.getElementById("bgaudio").setAttribute("src", "../resources/audio/res_loop.ogg");
                document.getElementById("bgaudio").onended = "";
                document.getElementById("bgaudio").play();
                document.getElementById("bgaudio").loop = true;
            }
            // document.getElementById("appname").innerHTML = document.getElementById("bgaudio").duration;
            animationInit();  // 动画初始化
        },1000);
        first = false;
    }
}
function scoreCallBack(msg){
    // scoreCallBack
    // 上传得分后成功
    msg = JSON.parse(msg);
    if(msg.success){
        setTimeout(function(){
            document.getElementById("rbottombuttons").style.visibility = "visible";
            document.getElementById("rbottombuttons").style.animationName = "rbottombuttonsin";// 底部按钮进入
            document.getElementById("rewardlabel").style.visibility = "visible";
            document.getElementById("rewardlabel").style.animationName = "rewardlabelin";// 侧面得分进入
            document.getElementById("reward_amount").innerHTML = msg["result"]["frag"];
            let ptt = parseFloat(msg["result"]["ptt"]);
            let before_score = parseFloat(window.localStorage.getItem("score"));
            let after_score = parseFloat(msg["result"]["score"]);
            let TBP = null;
            let type = before_score < after_score ? 1 : 2;
            if(ptt==0) TBP = new PTTElement(0, 0);
            else{
                TBP = new PTTElement(type, ptt);
                changeScore(msg["result"]["score"]); // 修改得分数据 此函数在topbar.js
            }
            TBP.enter();
            fragmentsAdd(msg["result"]["frag"]);
        }, 800);   
    }
}
function scoreTimeout(){
    // 上传得分超时
    base_page_data.prompt.show();
}
function scoreWaiting(is_waiting){
    // 上传得分等待中
    if(is_waiting){
        base_page_data.waiting.appendToElementById("body");
    }else{
        base_page_data.waiting.waitingOver();
    }
}
function scoreRetry(){
    // 重试
    base_page_data.xml_connector.send();
}
function scoreIgnore(){
    // 忽略
    setTimeout(function(){
        document.getElementById("rbottombuttons").style.visibility = "visible";
        document.getElementById("rbottombuttons").style.animationName = "rbottombuttonsin";// 底部按钮进入
        document.getElementById("rewardlabel").style.visibility = "visible";
        document.getElementById("rewardlabel").style.animationName = "rewardlabelin";// 侧面得分进入
        let TBP = new PTTElement(0, 0);
        TBP.enter();
    }, 800);
}
function pageinit(){
    loadData();                 //  加载上一个界面的信息传递
    musicInit();                //  背景音乐初始化
    localStorageDataCheck();    //  本地数据库基本值确认
    localStorageDataInit();     //  此界面用的所有本地数据库信息初始化
    pageDataInit();             //  此界面用的所有数据初始化
    SJsonInit();                //  songlist 数据导入
    buttonsInit(base_page_data.language);   // 按钮等
    hpInit();                   //  血条初始化
    topbarinit( base_page_data.charId,
                base_page_data.playername,
                base_page_data.type,
                base_page_data.language,
                base_page_data.score,
                base_page_data.level,
                base_page_data.fragments,
                base_page_data.memories);
    charImgInit(base_page_data.charId);     // 立绘初始化
    pageMsgInit();              //  界面信息初始化
    packDataUpdate();           //  对基础packdata加载playerdata里面的数据
    elementLanguageInit(base_page_data.language, "scorePage"); // 文字
}
function loadData(){
    // 解析上个界面传递的信息
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let jsonString = urlParams.get("data");
    let data = JSON.parse(jsonString);
    // data = playingdata_test;        // 测试
    console.log(data);
    base_page_data.result["playing"] = data;
    base_page_data.result.playing.clear_type = 5;
    let savePackData = new SavePackData();
    savePackData.createPackJson_check();// 刷新
}
function hpInit(){
    if(CHARID_TO_HPCLASS.char.find((item)=>{
        return item.idn == base_page_data.charId;
    })!=-1){
        let str_0 = "base_page_data.hp = new ";
        let str_1 = '(-1, 390, document.getElementById("centerlabel"), base_page_data.charId, "show");'
        let str_2 = str_0 + CHARID_TO_HPCLASS.char.find((item)=>{return item.idn == base_page_data.charId;}).class + str_1;
        console.log(str_2);
        eval(str_2);
    }else{
        base_page_data.hp = new HP(-1, 390, document.getElementById("centerlabel"), base_page_data.charId, "show");
    }
    let json_path = "../resources/char/charlist.json";
    let jsonreader_char = new jsonReader(json_path);
    let timer_0 = setInterval(function(){
        if(jsonreader_song.onready()){
            clearInterval(timer_0);
            charjson = jsonreader_char.backJson();
            base_page_data.hp.setCharList(charjson);
            base_page_data.hp.elementInit();
            base_page_data.hp.setPosition(355, -1, -1, -1);
            base_page_data.hp.setPercentage(base_page_data.result.playing.hp);
            // console.log(charjson);
        }
    }, 20);
}
function packDataUpdate(){
    // 对基础packdata加载playerdata里面的数据
    if(base_page_data.song_json_file==null){
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
                // console.log(set);
            }
        }
    }
    save_json.put("packdata", pack_data);
}
function localStorageDataInit(){
    // 此界面用的所有本地数据库信息初始化
    // 此界面好像不需要
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
    base_page_data.bgtop = window.localStorage.getItem("bgtop");
}
function SJsonInit(){
    // songlist导入
    let json_path_song = "../resources/songs/songlist.json";
    let song_list_json_reader = new jsonReader(json_path_song);
    let timer_1 = setInterval(function(){
        if(song_list_json_reader.onready()){
            clearInterval(timer_1);
            base_page_data.song_json_file = song_list_json_reader.backJson();
        }
    }, 100);
}
function charImgInit(charId){
    // 选择的角色的立绘
    document.getElementById("charimg").style.top = base_page_data.bgtop;
    document.getElementById("charimg").style.backgroundImage = "url('../resources/char/" + charId + ".png')";
    document.getElementById("charimg").style.animationName = "charimgshow";
    document.getElementById("charimg").style.animationDuration = "0.3s";
    document.getElementById("charimg").style.animationIterationCount= "1";
    document.getElementById("charimg").style.animationTimingFunction = "easa-in-out";
    setTimeout(function(){
        document.getElementById("charimg").style.animationName = "charimgMoving";
        document.getElementById("charimg").style.animationDuration = "15s";
        document.getElementById("charimg").style.animationIterationCount = "infinite";
        document.getElementById("charimg").style.animationTimingFunction = "linear";},500)
}
function musicInit(){
    document.getElementById("bgaudio").volume = bgvolume;
    document.getElementById("shuttercloseaudio").volume = bgvolume;
    document.getElementById("shutteropenaudio").volume = bgvolume;
    document.getElementById("morepageshow").volume = bgvolume + 0.3;
    document.getElementById("morepageleave").volume = bgvolume + 0.1;
}
function buttonsInit(language){
    if(language=="zh-Hans"){
        document.getElementById("remind").innerHTML = "点击以进入";
    }else if(language=="en"){
        document.getElementById("remind").innerHTML = "Click to Enter";
    }
}
function pageMsgInit(){
    // 界面信息初始化
    if(base_page_data.song_json_file==null){
        setTimeout(pageMsgInit, 50);
        return;
    }
    console.log(base_page_data.song_json_file);
    let dif_arr = ["pst", "prs", "ftr", "byd"];
    // console.log("difficult_"+dif_arr[window.localStorage.getItem("dif")]);
    document.getElementById("songname").innerHTML = base_page_data.result["playing"]["name"];
    document.getElementById("authorname").innerHTML = base_page_data.result["playing"]["author"];
    document.getElementById("difficult").innerHTML = base_page_data.result["playing"]["difficult"];
    document.getElementById("difficult").setAttribute("class", "difficult_"+dif_arr[window.localStorage.getItem("dif")]);
    document.getElementById("maxamount").innerHTML = base_page_data.result["playing"]["max_recall"];
    document.getElementById("score_detail_pure").innerHTML = "+" + (base_page_data.result["playing"]["pure"] - base_page_data.result["playing"]["late_pure"] - base_page_data.result["playing"]["early_pure"]).toString();
    document.getElementById("score_detail_pure").setAttribute("data-text", document.getElementById("score_detail_pure").innerHTML);
    document.getElementById("score_detail_EOL").innerHTML = "L" + base_page_data.result["playing"]["late_pure"].toString() + " E" + base_page_data.result["playing"]["early_pure"].toString();
    document.getElementById("score_detail_EOL").setAttribute("data-text", document.getElementById("score_detail_EOL").innerHTML);
    let bg_path = "../resources/songs/";
    let dif_ = parseInt(window.localStorage.getItem("dif"));
    for(let i=0;i<base_page_data.song_json_file["songs"].length;i++){
        if(base_page_data.song_json_file["songs"][i]["id"]==base_page_data.result["playing"]["songid"]){
            if(base_page_data.song_json_file["songs"][i]["difficulties"][dif_]["jacketOverride"]!=null){
                if(base_page_data.song_json_file["songs"][i]["remote_dl"]==true)
                    bg_path += "dl_" + base_page_data.result["playing"]["songid"] + "/" + window.localStorage.getItem("dif") + ".jpg";
                else bg_path += base_page_data.result["playing"]["songid"] + "/" + window.localStorage.getItem("dif") + ".jpg";
            }else{
                if(base_page_data.song_json_file["songs"][i]["remote_dl"]==true)
                    bg_path += "dl_" + base_page_data.result["playing"]["songid"] + "/base.jpg";
                else bg_path += base_page_data.result["playing"]["songid"] + "/base.jpg";
            }
            break;
        }
    }
    document.getElementById("songimg").setAttribute("src", bg_path);
    let sj = new SaveJson(0);
    let player_data = sj.get("playerdata");
    let his_score = 0;
    let CT_arr = ["clear_fail", "clear_normal", "clear_normal", "clear_normal", "clear_full","clear_pure"];
    let str = "";
    let s = parseInt(base_page_data.result["playing"]["score"]);
    if(s>=0&&s<8600000) str = "d";
    else if(s>=8600000&&s<8900000) str = "c";
    else if(s>=8900000&&s<9200000) str = "b";
    else if(s>=9200000&&s<9500000) str = "a";
    else if(s>=9500000&&s<9800000) str = "aa";
    else if(s>=9800000&&s<9900000) str = "ex";
    else if(s>=9900000) str = "explus";
    for(let i=0;i<player_data.length;i++){
        if(player_data[i]["song_id"]==base_page_data.result["playing"]["songid"]&&player_data[i]["dif"]==window.localStorage.getItem("dif")){
            his_score = parseInt(player_data[i]["score"]);
            player_data[i]["score"] = his_score > base_page_data.result["playing"]["score"] ? his_score.toString() : base_page_data.result["playing"]["score"].toString();
            player_data[i]["cleartype"] = parseInt(player_data[i]["cleartype"]) > base_page_data.result["playing"]["clear_type"] ? parseInt(player_data[i]["cleartype"]).toString() : base_page_data.result["playing"]["clear_type"].toString();
        }
    }
    if(his_score==0){
        // 首次记录
        let temp = {
            "song_id":base_page_data.result["playing"]["songid"],
            "dif":window.localStorage.getItem("dif"),
            "score":base_page_data.result["playing"]["score"].toString(),
            "cleartype":base_page_data.result["playing"]["clear_type"].toString()
        }
        player_data.push(temp);
    }
    sj.put("playerdata", player_data);
    let score_change = base_page_data.result["playing"]["score"] - his_score;
    let is_neg = score_change >= 0 ? false : true;
    score_change = Math.abs(score_change);
    score_change = intToStr(score_change);
    score_change = is_neg ? "-" + score_change : "+" + score_change;
    document.getElementById("score").innerHTML = intToStr(base_page_data.result["playing"]["score"]);
    document.getElementById("hishscore").innerHTML = intToStr(his_score);
    document.getElementById("changescore").innerHTML = score_change;
    document.getElementById("level").style.backgroundImage = "url('../resources/img/grade/"+str+".png')";
    document.getElementById("result").style.backgroundImage = "url('../resources/img/"+CT_arr[base_page_data.result["playing"]["clear_type"]]+".png')";
    document.getElementById("pureamount").innerHTML = base_page_data.result["playing"]["pure"];
    document.getElementById("faramount").innerHTML = base_page_data.result["playing"]["far"];
    document.getElementById("lostamount").innerHTML = base_page_data.result["playing"]["lost"];
    document.getElementById("pureamount").setAttribute("data-text", base_page_data.result["playing"]["pure"]);
    document.getElementById("faramount").setAttribute("data-text", base_page_data.result["playing"]["far"]);
    document.getElementById("lostamount").setAttribute("data-text", base_page_data.result["playing"]["lost"]);
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
function animationInit(){
    let gradeFlashAnimation = new RandomFlash("result");
    gradeFlashAnimation.setcontrol(false);
    let levelFlashAnimation = new RandomFlash("level");
    levelFlashAnimation.setcontrol(false);
    levelFlashAnimation.setmaxopa(1);
    levelFlashAnimation.setminopa(0.8);
    document.getElementById("result").style.display = "block";
    document.getElementById("result").style.animationName = "resultin";
    document.getElementById("result").onanimationend = function(){
        document.getElementById("result").style.animationName = "nonenone";
        setTimeout(function(){
            document.getElementById("hishscore").style.display = "flex";
            document.getElementById("hishscore").style.animationName = "Hrscorein";
            setTimeout(function(){
                document.getElementById("changescore").style.display = "block";
                document.getElementById("changescore").style.animationName = "Crscorein";
                setTimeout(function(){
                    document.getElementById("level").style.display = "block";
                    document.getElementById("level").style.animationName = "levelin";
                    document.getElementById("level").onanimationend = function(){
                        document.getElementById("level").style.animationName = "nonenone";
                    }
                }, 600);
            }, 100);
        }, 500);
    }
    setTimeout(function(){
        gradeFlashAnimation.start();
        levelFlashAnimation.start();
    }, 2500);
}
function showDetailScore(){
    document.getElementById("score_detail").style.display = "block";
    document.getElementById("score_detail").style.animationName = "detail_in";
}
function SOHlabel(){
    // 控制组件显示隐藏动画
    if(document.getElementById("rewardlabel").style.animationName == "rewardlabelin"){
        document.getElementById("rewardlabel").style.animationName = "rewardlabelout";
    }else{
        document.getElementById("rewardlabel").style.animationName = "rewardlabelin"
    }
}

class PTTElement{
    Fdiv = document.getElementById("topbarptt");
    keepimg = document.getElementById("topbarkeeptext");
    pttimg = document.getElementById("topnarptttext");
    changetext = document.getElementById("topbarchangeamount");
    timer = null;
    constructor(type, score){
        this.type = type;  // 0 keep, 1 + , 2 -
        this.score = score;  // 变化的量
        this.init();
    }
    init(){
        this.Fdiv.style.visibility = "visible";
        if(this.type==0){
            this.Fdiv.style.backgroundImage = "url('../resources/layouts/results/rating_keep.png')";
            this.keepimg.style.visibility = "visible";
            this.changetext.style.visibility = "hidden";
            this.changetext.setAttribute("class", "topbarchangeamountkeep");
        }else if(this.type==1){
            this.Fdiv.style.backgroundImage = "url('../resources/layouts/results/rating_up.png')";
            this.keepimg.style.visibility = "hidden";
            this.changetext.innerHTML = "+" + this.score.toString();
            this.changetext.setAttribute("data-text", "+" + this.score.toString());
            this.changetext.setAttribute("class", "topbarchangeamountup");
        }else if(this.type==2){
            this.Fdiv.style.backgroundImage = "url('../resources/layouts/results/rating_down.png')";
            this.keepimg.style.visibility = "hidden";
            this.changetext.innerHTML = "-" + this.score.toString();
            this.changetext.setAttribute("data-text", "-" + this.score.toString());
            this.changetext.setAttribute("class", "topbarchangeamountdown");
        }
    }
    enter(){
        /* 进场 */
        this.Fdiv.style.animationName = "topbarpttin";
    }
}
class RandomFlash{
    /* 随机频闪动画 */
    maxstep = 0.2;
    minstep = 0.05;
    maxopa = 0.9;
    minopa = 0.7;
    intervaltime = 25;
    timer = null;
    direction = true;  // true - ; false +
    control = true;  // 控制方向还是随机方向
    constructor(id){
        this.id = id;
        this.ele = document.getElementById(id);
        this.ele.style.opacity = 1;
    }
    setcontrol(control){
        this.control = control;
    }
    setmaxopa(maxopa){
        this.maxopa = maxopa;
    }
    setminopa(minopa){
        this.minopa = minopa;
    }
    start(){
        // 动画开始
        let this_ = this;
        this.timer = setInterval((function(this_){
            return function(){
                if(this_.control){
                    this_.animation();
                }else{
                    this_.animationUnControl();
                }
            }
        })(this_), this.intervaltime);
    }
    animation(){
        let step = Math.random() * (this.maxstep - this.minstep) + this.minstep;
        let opa = parseFloat(this.ele.style.opacity);
        if(opa>=this.maxopa) this.direction = true;
        if(opa<=this.minopa) this.direction = false;
        if(this.direction) opa -= step;
        else opa += step;
        if(opa<this.minopa) opa=this.minopa;
        if(opa>this.maxopa) opa=this.maxopa;
        this.ele.style.opacity = opa;
    }
    animationUnControl(){
        let step = Math.random() * (this.maxstep - this.minstep) + this.minstep;
        let opa = parseFloat(this.ele.style.opacity);
        let de = Math.random();
        if(opa>=this.maxopa){// 强制减小
            opa -= step;
        }else if(opa<=this.minopa){// 强制加大
            opa += step;
        }else{
            if(de<=0.5){
                opa -= step;
            }else{
                opa += step;
            }
        }
        if(opa<this.minopa) opa=this.minopa;
        if(opa>this.maxopa) opa=this.maxopa;
        this.ele.style.opacity = opa;
    }
    stop(){
        // 停止
        clearInterval(this.timer);
    }
}
function screenshot(){
    html2canvas(document.body).then(function(canvas) {
        var link = document.createElement('a');
        let newDate = moment().format('YYYY-MM-DD HH:mm:ss');
        link.download = newDate + '_result.png';
        link.href = canvas.toDataURL();
        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            link.dispatchEvent(event);
        } 
        else {
            link.click();
        }
    });
}
function backToSelect(){
    // 返回选歌界面
    shutter_show();
	setTimeout(function(){
        let url = "selectPage.html";
        window.location.href = url;
    },1500);
}