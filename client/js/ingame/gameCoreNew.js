var GAME_CONFIG = {
    "game":{
        "gaming3d":{
            "perspective4k": "30px",
            "perspective6k": "30px",
        },
        "track":{
            "bottom4k": "-372px",
            "bottom6k": "-472px",
            "bottom4k_n": -372,
            "bottom6k_n": -472,
	        "width": "1536px",
	        "height": "3072px",
            "height_n": 3072,
            "transform-origin": "50% 2700px",
            "transform": "rotateX(4.5deg) translateZ(",
            "transform4k": "rotateX(4.5deg) translateZ(10px)",
            "transform6k": "rotateX(4.5deg) translateZ(0px)",
            "transform4k_z_n": 10,
            "transform6k_z_n": 0,
        },
        "BLine":{
            "bottom_n":500
        },
        "particlelabel":{
            "bottom4k_n": 20,
            "bottom6k_n": 5,
            "particlel4k_n": 256,
            "particlel6k_n": 256,
            "particlel4k_top_n": 0,
            "particlel6k_top_n": 8,
            "particlels":[
                {
                    "left4k_n": 8,
                    "left6k_n": 180,
                },
                {
                    "left4k_n": 264,
                    "left6k_n": 360,
                },
                {
                    "left4k_n": 520,
                    "left6k_n": 550,
                },
                {
                    "left4k_n": 770,
                    "left6k_n": 735,
                },
                {
                    "left4k_n": 1026,
                    "left6k_n": 925,
                },
                {
                    "left4k_n": 1282,
                    "left6k_n": 1115,
                },
            ]
        }
    }
};
class GameCore{
    base_offset = 0;     // 用户的延迟率
    base_velocity = 0;  // 用户设置的流速
    base_bpm = 0;       // 歌曲json读取的bpm
    audio_offset = 0;   // aff谱面头部
    setting = null;     // 设置json
    aff_head = [];      // 谱面头部
    aff_data = [];      // 谱面主体
    bpm = [];           // bpm数组 [t, bpm, beat] 从时刻t开始 谱面bpm为 bpm 节拍为 beat拍
    flow_velocity = []; // 流速数组 [t, s] 从t时刻开始 谱面流速是 s (px/ms)
    can_play_arr = [["music", false], ["aff", false], ["gameImg", false], ["flow", false], ["element", false],
                    ["data", false], ["head", false], ["charShower", false]];  // 检查数组
    elements_parent = document.getElementById("track");
    track = null;                   // 轨道类
    note_elements_array = [];       // note 组件数组
    hold_elements_array = [];       // hold 组件数组
    barline_elements_array = [];    // 小节线 组件数组
    effect_elements_array = [];     // 特效 组件数组

    note_elements_animation_array = [];       // note 动画进行中 组件数组
    hold_elements_animation_array = [];       // hold 动画进行中 组件数组
    barline_elements_animation_array = [];    // 小节线 动画进行中 组件数组
    effect_element_animations_array = [];     // 特效 动画进行中 组件数组



    game_start_time = 0;            // 游戏开始时间
    pause_begin = 0;                // 暂停时刻的时间戳
    is_pause = false;               // 暂停中

    score_shower = null;            // 得分显示器
    elements_amount = 0;
    game_onready = false;
    // 以下是测试用变量
    flame_time = 0;
    hold_particle = null;


    constructor(song_json, char_idx, play_data, base_page_data, dif){
        this.gamestarttime = 0;                     // 游戏开始的时刻
        this.song_json = song_json;                 // 歌曲json文件
        this.char_idx = char_idx;                   // 使用角色的id
        this.play_data = play_data;                 // 游玩的信息 界面初始化
        this.base_page_data = base_page_data;       // 界面详细信息
        this.dif = dif;                             // 选择的难度
        this.is_pause = false;                      // 当前是否暂停
        this.settings = new SaveJson(0).get("settings");

        this.gameCoreInit();
    }
    gameCoreInit(){
        // 所有初始化都在此函数运行
        let this_ = this;
        this.affInit();             // 谱面文件初始化
        this.musicInit();           // 音频文件初始化
        this.dataInit();            // 数据初始化 配置初始化 设置初始化
        this.gamgImgInit();         // 游戏界面初始化
        this.gameOnready();         // 判断数据是否加载完毕

        setTimeout(()=>{
            // console.log(this_.aff_data);
            // console.log(this_.can_play_arr);
            // console.log(this_.bpm);
            console.log(this_.hold_elements_array.length);
        }, 500);
    }
    musicInit(){
        // 音乐初始化
        let item_key = "music";
        document.getElementById("gameingaudio").setAttribute("src", "../resources/songs/" + this.song_json.id + "/base.ogg");
        // document.getElementById("gameingaudio").setAttribute("src", "../resources/audio/menu_in.wav");
        document.getElementById("gameingaudio").volume = 0.7;
        let this_ = this;
        let timer = setInterval((function(this_){
            return function(){
                if(document.getElementById("gameingaudio").readyState == 4){
                    clearInterval(timer);
                    this_.can_play_arr.find((item)=>{return item[0]==item_key;})[1] = true;
                }
            }
        })(this_), 20);
        document.getElementById("gameingaudio").onended = function(){
            this_.musicEnd();
        };
    }
    musicEnd(){
        // console.log("音乐结束");
        // 执行离开界面的操作
        // 转去结算界面
        // shutter_show();
       this.score_shower.musicEnd();
    }
    affInit(){
        let item_key = "aff";
        let aff_reader = new txtReader("../resources/songs/" +  this.song_json.id + "/" + this.dif + ".aff");
        let this_ = this;
        let timer = setInterval((function(this_){
            return function(){
                if(aff_reader.onready()){
                    this_.aff_head = aff_reader.readConfig();
                    this_.aff_data = aff_reader.readLines();
                    // this_.aff_data = 
                    // [
                    //     "timing(0,170.00,4.00);",
                    //     "(2000, 2);"
                    // ]
                    console.log(this_.aff_data);
                    this_.can_play_arr.find((item)=>{return item[0]==item_key;})[1] = true;
                    this_.headInit();           // 谱面头部初始化
                    this_.flowVelocityInit();   // 流速初始化
                    clearInterval(timer);
                }
            }
        })(this_), 50);
    }
    dataInit(){
        console.log(this.play_data);
        // 数据初始化 配置初始化 设置初始化
        let item_key = "data";
        // 数据
        this.base_velocity = this.play_data.playdata.velocity;              // 设置用户设置的流速
        this.base_bpm = this.song_json.bpm_base;                        // 设置歌曲的基础BPM
        this.base_offset = this.play_data.playdata.delaytime;
        // 配置
        this.score_shower = new ScoreShower("div", 
                                            document.getElementById("container"),
                                            this.base_page_data.playing.song_img,
                                            this.base_page_data.song_json.songname,
                                            this.base_page_data.song_json.songJson.artist,
                                            this.dif,
                                            this.base_page_data.song_json_file.difficulties[parseInt(this.dif)].rating,
                                            "../resources/songs/" + this.song_json.id + "/base.ogg",
                                            this.base_page_data);
        this.track_l = GAME_CONFIG.game.track.height_n - GAME_CONFIG.game.BLine.bottom_n - 15;  // 设置轨道长度
        // 设置

        this.can_play_arr.find((item)=>{return item[0]==item_key;})[1] = true;
    }
    charShowerInit(){
        let this_ = this;
        let item_key = "charShower";
        let partner = new Partner(document.getElementById("body"), this.base_page_data.char_json_file);
        setTimeout(function(){
            partner.show();
        }, 1000);
        setTimeout((function(this_){
            return function(){
                this_.can_play_arr.find((item)=>{return item[0]==item_key;})[1] = true;
            }
        })(this_), 6000);
    }
    headInit(){
        // aff头部初始化
        let item_key = "head";
        this.aff_head.forEach((item)=>{
            let str = item.replace("AudioOffset:", "this.audio_offset = ");
            console.log(str);
            try{
                eval(str + ";");
            }catch{}
        });
        this.can_play_arr.find((item)=>{return item[0]==item_key;})[1] = true;
    }
    flowVelocityInit(){
        // 流速初始化 此函数运行在数据初始化之后 dataInit 当且仅当aff文件加载完毕才会调用
        let item_key = "flow";
        this.aff_data.forEach((item)=>{
            if(item.substring(0, 6) == "timing"){
                eval("this." + item.toString());
                // console.log(item.toString());
            }
        });
        this.can_play_arr.find((item)=>{return item[0]==item_key;})[1] = true;
        this.track = new Track(this.flow_velocity, this.track_l);   // 设置轨道
        this.track.trackMove();
        this.elementsInit();        // 流速计算完成之后计算组件
    }
    timing(t, bpm, beats){
        // timing aff 文件
        this.bpm.push([t, bpm, beats]);
        let now_velocity = this.base_velocity / this.base_bpm * bpm;  // 当前流速率
        // console.log("this.base_velocity="+this.base_velocity);
        // console.log("now_velocity="+now_velocity);
        let movepx = 0;
        if(now_velocity==0) movepx=0;
        else{
            let duration = 3 / Math.abs(now_velocity);
            // console.log("动画时常(标准)=" + duration);
            movepx = this.track_l / (1000 * duration);  // 像素每毫秒
            if(now_velocity<0) movepx*=-1;
        }
        this.flow_velocity.push([t, movepx]);
    }
    gamgImgInit(){
        // 游戏有关的图片 部分位置初始化
        let item_key = "gameImg";
        this.playtype = this.play_data["playdata"]["playertype"];
        document.getElementById("gamingbgimg").setAttribute("src", this.play_data["playdata"]["bgpath"]);
        document.getElementById("bg4k").style.backgroundImage = "url(" + this.play_data["playdata"]["trackimgpath"] + ")";
        document.getElementById("BLine").style.backgroundImage = "url(" + this.play_data["playdata"]["lineimgpath"] + ")";
        document.getElementById("trackl").setAttribute("src",  this.play_data["playdata"]["trackline"]);
        document.getElementById("trackc").setAttribute("src",  this.play_data["playdata"]["trackline"]);
        document.getElementById("trackr").setAttribute("src",  this.play_data["playdata"]["trackline"]);
        document.getElementById("track6kl").setAttribute("src",  this.play_data["playdata"]["trackline"]);
        document.getElementById("track6kr").setAttribute("src",  this.play_data["playdata"]["trackline"]);
        document.getElementById("particlelabel").style.bottom = GAME_CONFIG["game"]["particlelabel"]["bottom4k_n"].toString() + "px";
        for(let i=0;i<6;i++){
            // document.getElementById("particle"+i.toString()).style.backgroundImage = "url(" + this.playdata["playdata"]["particleimgpath"] + ")";
            document.getElementById("particle"+i.toString()).style.left = GAME_CONFIG["game"]["particlelabel"]["particlels"][i]["left4k_n"].toString() + "px";
        }
        this.can_play_arr.find((item)=>{return item[0]==item_key;})[1] = true;
    }
    elementsInit(){
        /*组件初始化 */
        let item_key = "element";
        this.aff_data.forEach((item)=>{
            if(item.substring(0, 6) != "timing"){
                if(item[0]=="("){
                    eval("this.note" + item.toString());
                }else{
                    try{
                        eval("this." + item.toString());
                    }catch{

                    }
                }
            }
        });
        this.can_play_arr.find((item)=>{return item[0]==item_key;})[1] = true;
    }
    note(t, lane){
        // console.log("lane="+lane);
        let note_ele = new Note("img", 
                                this.elements_parent, 
                                this.play_data.playdata.noteimgpath, 
                                t, 
                                lane, 
                                this.flow_velocity, 
                                this.track_l,
                                this.play_data.playdata.playertype);
        note_ele.setParticleUrl(this.play_data.playdata.particleimgpath);
        note_ele.setScoreShower(this.score_shower);
        this.note_elements_array.push(note_ele);
    }
    hold(t1, t2, lane){
        let hold_ele = new Hold("img", 
                                this.elements_parent, 
                                this.play_data.playdata.holdimgpath, 
                                t1,
                                t2, 
                                lane, 
                                this.flow_velocity, 
                                this.track_l,
                                this.play_data.playdata.playertype,
                                this.bpm);
        hold_ele.setParticleUrl(this.play_data.playdata.particleimgpath);
        hold_ele.setScoreShower(this.score_shower);
        this.hold_elements_array.push(hold_ele);
    }
    gameOnready(){
        console.log("this.game_onready="+this.game_onready);
        let ignore = ["charShower"];
        let this_ = this;
        if(this.can_play_arr.find((item)=>{
            return item[1]==false && ignore.indexOf(item[0]) == -1;
        })!=undefined){
            setTimeout((function(this_){
                return function(){
                    this_.gameOnready();
                }
            })(this_), 100);
        }else{
            this.game_onready = true;
        }
    }
    gameStart(){
        // 外部调用开始 此处会检查
        this.charShowerInit();
        this.gameStart_();
    }
    gameStart_(){
        let this_ = this;
        if(this.can_play_arr.find((item)=>{return item[1]==false;})!=undefined){
            setTimeout((function(this_){
                return function(){
                    this_.gameStart_();
                }
            })(this_), 100);
        }else{
            this.start();
        }
    }
    musicPlay(){
        document.getElementById("gameingaudio").play();
    }
    start(){
        console.log("游戏启动");
        // 游戏真正启动
        // 需要检查首元素的下落时间
        let start_delay = this.audio_offset + this.base_offset;  // 获取真正延迟时间
        console.log(start_delay);
        let min_begin = this.note_elements_array[0].getFallTime();
        console.log(this.hold_elements_array);
        min_begin = Math.min(min_begin, this.hold_elements_array[0].getFallTime())
        if(min_begin<0){
            // 第一个物块下落时刻小于0
            let t_ = Math.abs(min_begin) * 2;
            this.note_elements_array.forEach((item)=>{item.timeAdd(t_);});
            this.hold_elements_array.forEach((item)=>{item.timeAdd(t_);});
            this.track.timeAdd(t_);
            this.flow_velocity.forEach((item)=>{item[0]+=t_});
            this.flow_velocity[0][0] = 0;
            start_delay -= t_;
        }
        this.elementsAmountCalculate();                 // 计算物量
        this.score_shower.elementAmountInit(this.elements_amount)
        console.log(start_delay);
        if(start_delay<0){
            let this_ = this;
            setTimeout((function(this_){
                return function(){
                    this_.musicPlay();
                }
            })(this_), Math.abs(start_delay));
            this.game_start_time = new Date().getTime();  // 游戏开始时间
            /* 游戏主循环 */
            this.track.setTrackType(1);
            this.track.setGameStartTime(this.game_start_time);
            this.mainAnimation();
        }else{
            let this_ = this;
            this.musicPlay();
            setTimeout((function(this_){
                return function(){
                    this_.game_start_time = new Date().getTime();  // 游戏开始时间
                    this_.track.setTrackType(1);
                    this_.track.setGameStartTime(this_.game_start_time);
                    /* 游戏主循环 */
                    this_.mainAnimation();
                }
            })(this_), Math.abs(start_delay));
        }
    }
    elementsAmountCalculate(){
        let this_ = this;
        this.note_elements_array.forEach((item)=>{
            this_.elements_amount += item.getElementAmount();
        });
        this.hold_elements_array.forEach((item)=>{
            this_.elements_amount += item.getElementAmount();
        });
    }
    mainAnimation(){
        let this_ = this;
        if(!this.is_pause){
            let now = new Date().getTime();
            let relative_time = now - this.game_start_time;
            // 看帧率
            let l_b = this.flame_time;
            if(l_b!=0){
                let f = now - l_b;
                f = 1000 / f;
                f = parseInt(f);
                let f_ = parseInt(document.getElementById("game_frame").innerHTML);
                // f = Math.min(f, f_);
                document.getElementById("game_frame").innerHTML = f;
            }
            this.flame_time = now;
            // 检查
            // if(relative_time>=3000){
            //     this.musicEnd();
            //     return;
            // }
            // 歌曲计分器
            this.score_shower.animationCallback(relative_time);
            // note
            if(this.note_elements_array[0]!=undefined){
                while(this.note_elements_array[0].getFallTime()<relative_time){
                    let n = this.note_elements_array.shift();
                    n.addToParent();
                    this.note_elements_animation_array.push(n);  // 删除首元素
                    if(this.note_elements_array[0]==undefined) break;
                }
            }
            // hold
            if(this.hold_elements_array[0]!=undefined){
                while(this.hold_elements_array[0].getFallTime()<relative_time){
                    let n = this.hold_elements_array.shift();
                    n.addToParent();
                    n.addParticleToParent();
                    this.hold_elements_animation_array.push(n);  // 删除首元素
                    if(this.hold_elements_array[0]==undefined) break;
                }
            }
    
            // 执行动画
            this.note_elements_animation_array.forEach((item)=>{
                item.animationCallback(relative_time);
            });
            this.hold_elements_animation_array.forEach((item)=>{
                item.animationCallback(relative_time);
            });
    
            // 删除
            // note
            if(this.note_elements_animation_array[0]!=undefined){
                while(this.note_elements_animation_array[0].getEndTime()<relative_time-500){
                    let n = this.note_elements_animation_array.shift();
                    n.removeFromParent();  // 删除首元素
                    if(this.note_elements_animation_array[0]==undefined) break;
                }
            }
            // hold
            if(this.hold_elements_animation_array[0]!=undefined){
                while(this.hold_elements_animation_array[0].getEndTime()<relative_time-500){
                    let n = this.hold_elements_animation_array.shift();
                    n.removeFromParent();  // 删除首元素
                    if(this.hold_elements_animation_array[0]==undefined) break;
                }
            }
            // console.log("this.note_elements_animation_array.length="+this.note_elements_animation_array.length);
        }else{
            // console.log("暂停");
        }
        

        window.requestAnimationFrame((function(this_){
            return function(){
                this_.mainAnimation();
            }
        })(this_));
    }
    pauseButtonClick(){
        if(this.is_pause){
            /* 解除暂停 */
            PARTICAL_ISPAUSE = false;
            HIT_ISPAUSE = false;
            this.track.setIsPause(false);
            document.getElementById("pausepage").style.display = "none";
            this.plyingContinue();
        }else{
            /* 暂停 */
            document.getElementById("gameingaudio").pause();
            this.pause_begin = new Date().getTime();
            PARTICAL_ISPAUSE = true;
            HIT_ISPAUSE = true;
            this.track.setIsPause(true);
            this.is_pause = true;
            document.getElementById("pausepage").style.display = "flex";
        }
    }
    plyingContinue(){
        /* 暂停之后继续游戏 */
        // document.getElementById("gameingaudio").play();
        let start_delay = this.base_offset;  // 获取真正延迟时间
        if(start_delay<0){
            let this_ = this;
            setTimeout((function(this_){
                return function(){
                    document.getElementById("gameingaudio").currentTime = (this.pause_begin - this.game_start_time) / 1000;
                    this_.musicPlay();
                }
            })(this_), Math.abs(start_delay));
            this.game_start_time = this.game_start_time + new Date().getTime() - this.pause_begin;  // 暂停之后相对的开始时间
            this.is_pause = false;
        }else{
            let this_ = this;
            document.getElementById("gameingaudio").currentTime = (this.pause_begin - this.game_start_time) / 1000;
            this.musicPlay();
            setTimeout((function(this_){
                return function(){
                    this_.game_start_time = this_.game_start_time + new Date().getTime() - this_.pause_begin;  // 暂停之后相对的开始时间
                    this_.is_pause = false;
                }
            })(this_), Math.abs(start_delay));
        }
    }
}