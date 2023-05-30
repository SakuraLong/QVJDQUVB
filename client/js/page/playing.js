var playingtest = {
    "language": "en"
}
var testcharjson = {
    "id":0,
    "idx":"0",
    "idn":"hikari",
    "dif": 0,
    "hp":3,
    "name_localized": {
        "en": "Hikari",
        "zh-Hans": "光"
    },
    "namelittle_localized": {
        "en": "",
        "zh-Hans": ""
    },
    "description_localized": {
        "en": "EASY-Recollection Rate loss redused for LOST notes",
        "zh-Hans": "光是好角色"
    },
    "top":"0%",
    "bgtop":"0%",
    "frag":[],
    "step":[],
    "over":[],
    "type":"SUPPORT"
};
class BasePageData{
    game_core = null;           // 游戏核心
    charId = "2u";              // 玩家选择的角色
    type = "offline";           // 登陆状态
    language = "en";            // 语言
    bgvolume = 0.5;             // 背景音乐声音
    dif = 0;                    // 选择的难度
    hp = null;                  // 血条类
    partner = null;             // 搭档展示类
    playing = {
        "bg":"",                // 背景图片
        "note":"",              // 物块图片地址
        "hold":"",              // 长条图片地址
        "hold_hi":"",           // 长条按压图片地址
        "particle":"",          // 打击效果地址
        "click_volume":0,       // 打击音乐大小
        "music":"",             // 音乐地址
        "delay":0,              // 延迟率
        "track":"",             // 轨道地址
        "track_critical":"",    // 判定线地址
        "track_critical_extra":"",  // 外侧轨道判定线地址
        "track_extralane":"",   // 外侧轨道地址
        "song_img":""
    }
    playing_aff_head = [];      // 谱面头部
    playing_aff_body = [];      // 谱面主体
    playing_track = "";         // 轨道地址
    playing_line = "";          // 轨道分界线地址
    playing_track_color = "";   // 6k轨道颜色
    bgtop = "0%";               // 角色立绘的位置
    char_json_file = null;        // 角色的json文件 选择的角色
    song_json_file = null;        // 音乐的json文件 选择的歌曲
    setting_json = {};          // 设置数据
    side_to_playing = {
        "side":[
            {
                "note":"../resources/img/note.png",
                "hold":"../resources/img/note_hold.png",
                "hold_hi":"../resources/img/note_hold_hi.png",
                "track":"../resources/img/track.png",
                "track_critical":"../resources/img/track_critical_line.png",
                "track_critical_extra":"../resources/img/track_critical_extra_light.png",
                "track_extralane":"../resources/img/track_extralane_light.png",
                "particle":"../resources/particle/note_light.png"
            },
            {
                "note":"../resources/img/note_dark.png",
                "hold":"../resources/img/note_hold_dark.png",
                "hold_hi":"../resources/img/note_hold_dark_hi.png",
                "track":"../resources/img/track_dark.png",
                "track_critical":"../resources/img/track_critical_line.png",
                "track_critical_extra":"../resources/img/track_critical_extra_dark.png",
                "track_extralane":"../resources/img/track_extralane_dark.png",
                "particle":"../resources/particle/note_light.png"
            },
            {
                "note":"../resources/img/note.png",
                "hold":"../resources/img/note_hold.png",
                "hold_hi":"../resources/img/note_hold_hi.png",
                "track":"../resources/img/track.png",
                "track_critical":"../resources/img/track_critical_line_colorless.png",
                "track_critical_extra":"../resources/img/track_critical_extra_light.png",
                "track_extralane":"../resources/img/track_extralane_light.png",
                "particle":"../resources/particle/note_light.png"
            }
        ]
    };                          // 基础 根据side
    set_to_playing = {
        "vs":{
            "1":{
                "track":"../resources/img/track_dark_vs.png"
            }
        },
        "finale":{
            "1":{
                "track":"../resources/img/track_finale.png"
            }
        },
        "rei":{
            "0":{
                "track":"../resources/img/track_rei.png"
            }
        }
    };                          // 特殊 根据曲包确定
    bg_to_playing = {
        "tempestissimo":{
            "track":"../resources/img/track_tempestissimo.png"
        },
        "arcanaeden":{
            "track":"../resources/img/track_arcana.png"
        }
    };                          // 特殊 根据bg确定
    song_to_playing = {
        
    };                          // 特殊 根据songid确定
    song_json = null;           // 传入json
    constructor(){}
}
var base_page_data = new BasePageData();
var first = true;
function bodyfirstclicked(){
    if(first){
        if(base_page_data.game_core!=null){
            if(base_page_data.game_core.game_onready){
                document.getElementById("container").style.visibility = "visible";
                shutter_leave("shutter_song_msg");
                first = false;
                hpInit();
                gameStart();  //启动游戏
            }
        }
    }
}
function pageInit(){
    localStorageDataCheck();                        // 本地数据库基本值确认
    readSelectData();                               // 从数据库中读取选择的歌曲的信息
    pageDataInit();                                 // 此界面用的所有数据初始化
    buttonsInit("zh-Hans");                         // 按钮初始化
    gameInit();                                     //启动游戏
}
function readSelectData(){
    // 从会话数据库中读取选择的歌曲的信息
    let de_save_str = new ArcaeaCode().dataDecrypt(window.sessionStorage.getItem("playingData"), BASE_CODE);
    let de_song_json = JSON.parse(de_save_str);
    document.getElementById("shutter_songimgshadow").setAttribute("src", de_song_json.songimgshadow);
    document.getElementById("shutter_songimgimg").setAttribute("src", de_song_json.songimgimg);
    document.getElementById("shutter_song_game_data_music_by").innerHTML = de_song_json.songJson.artist;
    document.getElementById("shutter_song_game_data_design_by").innerHTML = de_song_json.songJson.difficulties[parseInt(de_song_json.dif)].chartDesigner;
    document.getElementById("shutter_songnameS").innerHTML = de_song_json.songname;
    document.getElementById("shutter_songname").innerHTML = de_song_json.songname;
    base_page_data.song_json_file = de_song_json.songJson;
    base_page_data.char_json_file = de_song_json.charJson;
    base_page_data.charId = de_song_json.selectChar;
    base_page_data.song_json = de_song_json;
}
function pageDataInit(){
    // 此界面用的所有数据初始化
    let sj = new SaveJson(0);
    base_page_data.dif = window.localStorage.getItem("dif");
    base_page_data.setting_json = sj.get("settings");
    base_page_data.charId = window.localStorage.getItem("charid");
    base_page_data.type = window.localStorage.getItem("online");
    base_page_data.language = window.localStorage.getItem("language");
    // playing数据
    base_page_data.playing["bg"] = "../resources/img/bg/"+base_page_data.song_json_file["bg"]+".jpg";
    base_page_data.playing["delay"] = base_page_data.setting_json["audio"][base_page_data.setting_json["audio"]["type"] == 0 ? "bluetooth" : "earphone"]["offset"];
    base_page_data.playing["click_volume"] = base_page_data.setting_json["audio"][base_page_data.setting_json["audio"]["type"] == 0 ? "bluetooth" : "earphone"]["volume"] / 100;
    base_page_data.playing["note"] = base_page_data.side_to_playing["side"][base_page_data.song_json_file["side"]]["note"];
    base_page_data.playing["hold"] = base_page_data.side_to_playing["side"][base_page_data.song_json_file["side"]]["hold"];
    base_page_data.playing["hold_hi"] = base_page_data.side_to_playing["side"][base_page_data.song_json_file["side"]]["hold_hi"];
    base_page_data.playing["track"] = base_page_data.side_to_playing["side"][base_page_data.song_json_file["side"]]["track"];
    base_page_data.playing["track_critical"] = base_page_data.side_to_playing["side"][base_page_data.song_json_file["side"]]["track_critical"];
    base_page_data.playing["track_critical_extra"] = base_page_data.side_to_playing["side"][base_page_data.song_json_file["side"]]["track_critical_extra"];
    base_page_data.playing["track_extralane"] = base_page_data.side_to_playing["side"][base_page_data.song_json_file["side"]]["track_extralane"];
    base_page_data.playing["particle"] = base_page_data.side_to_playing["side"][base_page_data.song_json_file["side"]]["particle"];
    if(base_page_data.song_json_file["difficulties"][base_page_data.dif]["jacketOverride"]) base_page_data.playing["song_img"] = "../resources/songs/"+base_page_data.song_json_file["id"]+"/"+base_page_data.dif+"_256.jpg";
    else base_page_data.playing["song_img"] = "../resources/songs/"+base_page_data.song_json_file["id"]+"/base_256.jpg";
    base_page_data.playing["music"] = "../resources/songs/"+base_page_data.song_json_file["id"]+"/base.ogg";
}

function buttonsInit(language){
    if(language=="zh-Hans"){
        document.getElementById("remind").innerHTML = "点击以进入";
    }else if(language=="en"){
        document.getElementById("remind").innerHTML = "Click to Enter";
    }
}
function gameInit(){
    let head = [0];
    let delay = 2000;
    let charId = "2u";
    let play_data = {
        "playdata":{
            "playertype":"autoplay",
            "velocity":base_page_data.setting_json.gameplay.speed,
            "delaytime":base_page_data.setting_json.audio.type == 0 ? base_page_data.setting_json.audio.earphone.offset : base_page_data.setting_json.audio.bluetooth.offset,
            "gameflame":120,
            "songduration":60000,
            "bpm": base_page_data.song_json_file.bpm_base,
            "bgpath": base_page_data.playing.bg,
            "noteimgpath":base_page_data.playing.note,
            "holdimgpath":base_page_data.playing.hold,
            "holdhiimgpath":base_page_data.playing.hold_hi,
            "trackimgpath":base_page_data.playing.track,
            "lineimgpath": base_page_data.playing.track_critical,
            "trackline": "../resources/img/track_lane_divider.png",
            "particleimgpath": base_page_data.playing.particle,
            "key": ["A", "S", "C", "N", "K", "L"]
        }
    }
    base_page_data.game_core = new GameCore(base_page_data.song_json_file,
        base_page_data.charId,
        play_data,
        base_page_data,
        base_page_data.dif);
    // gamecore = new Gaming(head, testlist, "", charId, playdata);
    // document.getElementById("body").onkeydown = function keypressevent(ev){
    //     gamecore.keydownevent(ev);
    // };
    // document.getElementById("body").onkeyup = function keypressevent(ev){
    //     gamecore.keyupevent(ev);
    // };
    document.getElementById("pauselabel").onclick = function(){
        base_page_data.game_core.pauseButtonClick();
    };
    document.getElementById("presume").onclick = function(){
        base_page_data.game_core.pauseButtonClick();
    }
    // document.getElementById("pretry").onclick = function(){
    //     gamecore.replay();
    // }

}
function gameStart(){
    base_page_data.game_core.gameStart();
}
var gamecore = null;
function gameinit(){
    let head = [0];
    let delay = 2000;
    let charId = "2u";
    let play_data = {
        "playdata":{
            "playertype":"autoplay",
            "velocity":base_page_data.setting_json.gameplay.speed,
            "delaytime":base_page_data.setting_json.audio.type == 0 ? base_page_data.setting_json.audio.earphone.offset : base_page_data.setting_json.audio.bluetooth.offset,
            "gameflame":120,
            "songduration":60000,
            "bpm": base_page_data.song_json_file.bpm_base,
            "bgpath": base_page_data.playing.bg,
            "noteimgpath":base_page_data.playing.note,
            "trackimgpath":base_page_data.playing.track,
            "lineimgpath": base_page_data.playing.track_critical,
            "trackline": "../resources/img/track_lane_divider.png",
            "particleimgpath": base_page_data.playing.particle,
            "key": ["A", "S", "C", "N", "K", "L"]
        }
    }
    gamecore = new GameCore(base_page_data.song_json_file,
                            base_page_data.charId,
                            play_data,
                            base_page_data,
                            base_page_data.dif);
    // document.getElementById("body").onkeydown = function keypressevent(ev){
    //     gamecore.keydownevent(ev);
    // };
    // document.getElementById("body").onkeyup = function keypressevent(ev){
    //     gamecore.keyupevent(ev);
    // };
    // document.getElementById("pauselabel").onclick = function(){
    //     gamecore.pause_button_click();
    // };
    // document.getElementById("presume").onclick = function(){
    //     gamecore.pause_button_click();
    // }
    // document.getElementById("pretry").onclick = function(){
    //     gamecore.replay();
    // }
}

function hpInit(){
    // 血条初始化
    if(CHARID_TO_HPCLASS.char.find((item)=>{
        return item.idn == base_page_data.charId;
    })!=undefined){
        console.log(CHARID_TO_HPCLASS.char.find((item)=>{
            return item.idn == base_page_data.charId;
        }));
        let str_0 = "base_page_data.hp = new ";
        let str_1 = '(-1, 500, document.getElementById("PAHP"), base_page_data.charId, "play");'
        let str_2 = str_0 + CHARID_TO_HPCLASS.char.find((item)=>{return item.idn == base_page_data.charId;}).class + str_1;
        eval(str_2);
    }else{
        base_page_data.hp = new HP(-1, 500, document.getElementById("PAHP"), base_page_data.charId, "play");
    }
    base_page_data.hp.setCharJson(base_page_data.char_json_file);
    base_page_data.hp.elementInit();
    base_page_data.hp.setPosition(20, -1, -1, -1);
    base_page_data.hp.hpPlayingInit();
}