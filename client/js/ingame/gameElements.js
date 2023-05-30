class GameElements{
    // 界面物块基类
    // note hold 特效        小节线   轨道  歌曲显示器   FRPM提示器    结算
    // Note Hold GameEffects BarLine Track ScoreShower FRPMShower   ResultShower
    //  GameElements -> GameBlocks -> Note Hold BarLine Track
    //  GameElements -> ScoreShower
    //  GameElements -> GameEffects
    //  GameElements -> FRPMShower
    //  GameElements -> ResultShower
    constructor(type, parent){
        if(parent!=null){
            this.element = document.createElement(type);
            this.parent = parent;
            this.type = type;
        }else{
            if(type=="TRACK"){
                this.element = document.getElementById("bg4k");
                this.parent = null;
                this.type = "TRACK";
            }
        }
    }
    addToParent(){
        // 将组件添加到父元素中 并且展示
        this.parent.appendChild(this.element);
    }
    removeFromParent(){
        // 移除组件
        this.parent.removeChild(this.element);
    }
    animationCallback(relative_time, msg){
        // 动画回调函数
        // relative_time 是相对于游戏开始时的相对时间
        // 不同类的msg可能不同或者没有
    }
}
class ResultShower{
    ele = `
        <img id="result_arrow_top" src="../resources/layouts/ingame/end/end_stripe_top.png" alt="" draggable="false">
        <div id="result_bg"></div>
        <img id="result_arrow_bottom" src="../resources/layouts/ingame/end/end_stripe_bottom.png" alt="" draggable="false">
        <img id="result_mid" src="" alt="" draggable="false">
        <img id="result_clear" src="" alt="" draggable="false">
    `;
    dict = {
        "c":"../resources/img/clear_normal.png",
        "f":"../resources/img/clear_full.png",
        "ff":"../resources/img/clear_fail.png",
        "p":"../resources/img/clear_pure.png"
    }
    r_bg_p = "url('../resources/img/end_back_p.png')";
    parent = document.getElementById("body");
    constructor(clear_type, msg){
        this.clear_type = clear_type;
        this.element = document.createElement("div");
        this.element.setAttribute("id", "result_ele");
        this.element.innerHTML = this.ele;
        this.audio = new Audio();
        if(clear_type=="p"){
            this.audio.src = "../resources/audio/track_pure.wav";
        }
        this.parent.appendChild(this.element);
        this.elementInit();

        this.msg = msg;
    }
    elementInit(){
        this.audio.play();
        let this_ = this;
        document.getElementById("result_mid").setAttribute("src", "../resources/img/end_mid_"+this.clear_type+".png");
        document.getElementById("result_clear").setAttribute("src", this.dict[this.clear_type]);
        if(this.clear_type=="p"){
            document.getElementById("result_arrow_top").setAttribute("src", "../resources/img/end_stripe_top_p.png");
            document.getElementById("result_arrow_bottom").setAttribute("src", "../resources/img/end_stripe_bottom_p.png");
            document.getElementById("result_bg").style.backgroundImage = this.r_bg_p;
        }
        setTimeout((function(this_){
            return function(){
                document.getElementById("result_mid").style.animationName = "result_mid_leave";
                document.getElementById("result_clear").style.animationName = "result_clear_leave";
                document.getElementById("result_arrow_top").style.animationName = "result_arrow_top_leave";
                document.getElementById("result_arrow_bottom").style.animationName = "result_arrow_bottom_leave";
                document.getElementById("result_bg").style.animationName = "result_bg_leave";
                shutter_show();
                setTimeout((function(this_){
                    return function(){
                        this_.sendResult();
                    }
                })(this_), 1500);
            }
        })(this_), 3000);
    }
    sendResult(){
        let jsonString = JSON.stringify(this.msg);
        let url = "scorePage.html?data=" + encodeURIComponent(jsonString);
        window.location.href = url;
    }
}
class ScoreShower extends GameElements{
    /*
    var playingdata_test = {
    "songid": "defection",
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
}; */
    playingdata = {
        "songid": "",
        "songidx": "",
        "name": "",
        "author": "",
        "difficult": "",
        "clear_type": 0,
        "hp": [100, 100], // 此处如果是创世光就是数组[100, 100] 其余都是数字 都是 1-100
        "score": 0,
        "pure": 0,
        "early_pure":0,
        "late_pure":0,
        "far": 0,
        "lost": 0,
        "max_recall": 0
    };
    ele = `
    <div id="scorenum">07932627</div>
    <div id="levelbg">
        <div id="levelnum">Past 3</div>
    </div>
    <div id="songtime">
        <img id="progress_glow" src="../resources/layouts/ingame/progress_glow.png" alt="" draggable="false">
    </div>
    <img id="songbg" src="../resources/songs/chronostasis/base_256.jpg" alt="" draggable="false">
    <div id="songname" class="songtext"></div>
    <div id="notername" class="songtext"></div>
    `;
    full_score = 10000000;
    dif_arr = ["Past ", "Present ", "Future ", "Beyond "];
    song_time = null;
    song_time_from = 0;
    song_time_to = 100;
    score = 0;
    show_score = 0;
    element_amount = 0;         // 物块总量
    every_note = 0;             // 每一个的分数
    every_change = 0;           // 每次变化的分数 每一个的分数 / 10
    pure_amount = 0;
    lost_amount = 0;
    far_amount = 0;
    far_early_amount = 0;
    far_late_amount = 0;
    pure_early_amount = 0;
    pure_late_amount = 0;
    max_recall = 0;
    constructor(type, parent, src, song_name, artist_name, dif, rating, music_src, base_page_data){
        super(type, parent);
        this.src = src;
        this.song_name = song_name;
        this.artist_name = artist_name;
        this.dif = dif;
        this.rating = rating;
        this.music_src = music_src;
        this.duration = 0;
        this.audio = new Audio();
        this.audio.src = this.music_src;
        this.base_page_data = base_page_data;

        this.countAudioTime();

        this.element.setAttribute("id", "SAS");
        this.element.innerHTML = this.ele;
        this.addToParent();
        this.elementInit();
    }
    elementAmountInit(element_amount){
        this.element_amount = element_amount;
        this.every_note = Math.floor(this.full_score / this.element_amount);
        this.every_change = Math.floor(this.every_note / 10);
        console.log("this.element_amount"+this.element_amount);
        console.log(this.every_note);
        console.log(this.every_change);
    }
    addElement(click_type, detail){
        let change_score_to_real = false;   // 最后一个调用
        let t_s = this.full_score / this.element_amount;
        let t_e = 0
        switch(click_type){
            case "pure":
                this.pure_amount++;
                if(detail=="early") this.pure_early_amount++;
                else if(detail=="late") this_.pure_late_amount++;
                this.score += t_s + 1;
                this.show_score += 1;
                t_e = t_s / 10;
                break;
        }
        if(this.pure_amount+this.far_amount+this.lost_amount==this.element_amount){
            change_score_to_real = true;
        }
        let t = 0;
        let this_ = this;
        let timer = setInterval((function(this_){
            return function(){
                if(t==10){
                    clearInterval(timer);
                    if(change_score_to_real){
                        this_.showRealScore();
                    }
                    return;
                }
                t += 1;
                this_.show_score += t_e;
                this_.showScore();
            }
        })(this_), 40);
    }
    showRealScore(){
        let pure_pure_amount = this.pure_amount - this.pure_early_amount - this.pure_late_amount;
        let pure_ratio = this.pure_amount / this.element_amount;
        let far_ratio = this.far_amount / this.element_amount;
        this.score = pure_ratio * this.full_score + far_ratio * this.full_score / 2 + pure_pure_amount;
        this.score = parseInt(this.score);
        this.show_score = this.score;
        this.showScore();
    }
    musicEnd(){
        // 歌曲结束 计算信息
        console.log("987654567890");
        this.playingdata.author = this.artist_name;
        this.playingdata.difficult = document.getElementById("levelnum").innerHTML;
        this.playingdata.early_pure = this.pure_early_amount;
        this.playingdata.far = this.far_amount;
        this.playingdata.late_pure = this.pure_late_amount;
        this.playingdata.lost = this.lost_amount;
        this.playingdata.max_recall = this.max_recall;
        this.playingdata.name = this.song_name;
        this.playingdata.pure = this.pure_amount;
        this.playingdata.score = parseInt(this.score);
        this.playingdata.songid = this.base_page_data.song_json_file.id;
        this.playingdata.songidx = this.base_page_data.song_json_file.idx;
        let c_t_t = 0;
        this.playingdata.clear_type = 5;
        console.log(this.playingdata);
        let rs = new ResultShower("p", this.playingdata);
    }
    showScore(){
        // console.log(this.show_score);
        let temp = parseInt(this.show_score);
        document.getElementById("scorenum").innerHTML = this.intToStr(temp);
    }
    intToStr(num) {
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
            result = "" + result;
            }
        }
        return result;
    }
    countAudioTime = async () => {
        while (isNaN(this.audio.duration) || this.audio.duration === Infinity) {
            // 延迟一会 不然网页都卡死
            await new Promise(resolve => setTimeout(resolve, 200));
            // 设置随机播放时间，模拟调进度条
            this.audio.currentTime = 1000000;
        }
        // console.log('音频的总时长:',this.audio.duration);
        this.duration = this.audio.duration*1000;
    }
    elementInit(){
        this.song_time = document.getElementById("songtime");
        document.getElementById("songbg").setAttribute("src", this.src);
        document.getElementById("songname").innerHTML = this.song_name;
        document.getElementById("notername").innerHTML = this.artist_name;
        document.getElementById("levelbg").style.backgroundImage = "url('../resources/img/cutoff_dia_"+this.dif.toString()+".png')";
        document.getElementById("levelnum").innerHTML = this.dif_arr[this.dif] + this.rating;
        this.showScore();
    }
    animationCallback(relative_time){
        // 0-100
        let ratio = relative_time / this.duration;
        let width = (this.song_time_to - this.song_time_from) * ratio;
        width = width.toString() + "%";
        document.getElementById("songtime").style.width = width;
    }
}
class GameBlocks extends GameElements{
    // 移动通过改变 translateY
    track_l = 0;            // 轨道长度
    flow_velocity = []      // 速度数组
    begin_time = 0;         // 开始时刻
    fall_time = 0;          // 下落时刻
    hold_end_time = 0;      // 长按结束时刻
    end_time = 0;           // 结束时刻
    begin_pos = 0;          // 开始的位置
    last_pos = 0;           // 在移动过程中 上次的位置
    track6k = false;        // 是否是6k
    score_shower = null;    // 
    constructor(type, parent, src){
        super(type, parent);
        this.src = src;
        if(src!=null){
            switch(this.type){
                case "div":
                    this.element.style.backgroundImage = "url('" + this.src + "')";
                    break;
                case "img":
                    this.element.setAttribute("src", this.src);
                    break;
            }
        }
    }
    setScoreShower(score_shower){
        this.score_shower = score_shower;
    }
    timeAdd(time){
        // 整体后移多少时间
        this.begin_time += time;
        this.fall_time += time;
        this.hold_end_time += time;
        this.end_time += time;
    }
    setTrack6k(track6k){
        this.track6k = track6k;
    }
    notePosition(t, nowtime, posi) {
        // console.log(t);
        // console.log(nowtime);
        /* 根据开始时间和当前时间计算物块位置
            从当前时间往前计算
        */
        let pos = posi;
        if(this.flow_velocity.length==1){
            return (nowtime - t) * this.flow_velocity[0][1];
        }else{
            let index = 0;  // 时间位置
            for(let i=0;i<this.flow_velocity.length;i++){
                if(this.flow_velocity[i][0]<=nowtime){
                    index = i;
                }else{
                    break;
                }
            }
            // console.log("index="+index);
            for(let i=index;i>=0;i--){
                if(i+1<this.flow_velocity.length){
                    if(this.flow_velocity[i][0]>t&&this.flow_velocity[i+1][0]>nowtime){
                        pos+=this.flow_velocity[i][1]*(nowtime-this.flow_velocity[i][0]);
                    }else if(this.flow_velocity[i][0]>t&&this.flow_velocity[i+1][0]<=nowtime){
                        pos+=this.flow_velocity[i][1]*(this.flow_velocity[i+1][0]-this.flow_velocity[i][0]);
                    }else if(this.flow_velocity[i][0]<=t&&this.flow_velocity[i+1][0]>nowtime){
                        pos+=this.flow_velocity[i][1]*(nowtime-t);
                        break;
                    }else if(this.flow_velocity[i][0]<=t&&this.flow_velocity[i+1][0]<=nowtime){
                        pos+=this.flow_velocity[i][1]*(this.flow_velocity[i+1][0]-t);
                        break;
                    }
                }else{
                    if(this.flow_velocity[i][0]>t){
                        pos+=this.flow_velocity[i][1]*(nowtime-this.flow_velocity[i][0]);
                    }else if(this.flow_velocity[i][0]<=t){
                        pos+=this.flow_velocity[i][1]*(nowtime-t);
                        break;
                    }
                }
            }
            // console.log("pos="+pos);
            return pos;
        }
    }
}
class Track extends GameBlocks{
    is_pause = false;
    track_type = 0;
    track_bgy_pos = 0;
    constructor(flow_velocity, track_l){
        super("TRACK", null, null);
        this.flow_velocity = flow_velocity;
        this.track_l = track_l;
        this.track_start_time = new Date().getTime();
        this.game_start_time = 0;   // 游戏开始时刻
        this.track_an_time = 0;
        this.pause_begin = 0;
        this.trackMove();
    }
    setIsPause(is_pause){
        if(!is_pause){
            /* 解除暂停 */
            this.track_start_time = this.track_start_time + new Date().getTime() - this.pause_begin;  // 暂停之后相对的开始时间
        }else{
            /* 暂停 */
            this.pause_begin = new Date().getTime();
        }
        this.is_pause = is_pause;
    }
    setTrackType(track_type){
        this.track_type = track_type;
    }
    setGameStartTime(game_start_time){
        this.game_start_time = game_start_time;
    }
    trackMove(){
        let this_ = this;
        if(!this.is_pause){
            let nowtime = new Date().getTime() - this.track_start_time;
            let pos = this.trackPositionF(this.track_an_time, nowtime, this.track_bgy_pos, this.track_type) % this.track_l;
            this.track_an_time = nowtime;  // 上一次调用此函数的时刻
            this.track_bgy_pos = pos;
            // console.log(this.track_bgy_pos);
            this.element.style.backgroundPositionY = this.track_bgy_pos.toString() + "px";
        }
        window.requestAnimationFrame((function(this_){
            return function(){
                this_.trackMove();
            }
        })(this_));
    }
    trackPosition(t, nowtime, posi, type){
        if(type==0){
            return (nowtime - 0) * this.flow_velocity[0][1] * 0.3 % this.track_l;
        }else if(type==1){
            return (this.trackPositionF(t, nowtime, posi)) % this.track_l;
        }
    }
    trackPositionF(t, nowtime, posi, type){
        // 上次调用函数的时刻 现在相对于谱面的时刻 位置
        let pos = posi;
        if(this.flow_velocity.length==1||type==0){
            return pos+(nowtime - t) * this.flow_velocity[0][1]*0.3;
        }else{
            let index = 0;  // 时间位置
            for(let i=0;i<this.flow_velocity.length;i++){
                if(this.flow_velocity[i][0]<=nowtime - this.game_start_time + this.track_start_time){
                    index = i;
                }else{
                    break;
                }
            }
            pos+=this.flow_velocity[index][1]*(nowtime-t)*0.3;
            return pos;
        }
    }
}
class Note extends GameBlocks{
    is_clicked = false;
    particle_url = "";
    particle = null;
    shower = null;
    constructor(type, parent, src, t, lane, flow_velocity, track_l, play_type){
        super(type, parent, src);
        this.t = t;
        this.lane = lane;
        this.flow_velocity = flow_velocity;
        this.track_l = track_l;
        this.play_type = play_type;

        this.element.setAttribute("class", "noteimg");

        this.calculateFallTime(this.t, this.lane);

        this.element.style.left = (this.lane*255+10).toString() + "px";
        this.element.style.top = (this.track_l -  this.begin_pos).toString() + "px";
    }
    setParticleUrl(particle_url){
        this.particle_url = particle_url;
    }
    getFallTime(){
        return this.fall_time;
    }
    getEndTime(){
        return this.end_time;
    }
    getLane(){
        return this.lane;
    }
    getIsClicked(){
        return this.is_clicked;
    }
    getElementAmount(){
        return 1;
    }
    elementClick(){
        // 此函数被调用一定是符合时间区间的
        if(!this.is_clicked){
            if(this.play_type == "autoplay"&&!this.is_clicked){
                this.score_shower.addElement("pure");
                this.particle = new Partical(document.getElementById("particle"+this.lane.toString()), this.particle_url);
                if(this.track6k){
                    this.shower = new HitShower(
                        GAME_CONFIG["game"]["particlelabel"]["particlels"][this.lane]["left6k_n"] + 64,
                        GAME_CONFIG["game"]["particlelabel"]["bottom6k_n"] + 160,
                        0,
                        128,
                        document.getElementById("hitshowerlabel"));
                }else{
                    this.shower = new HitShower(
                        GAME_CONFIG["game"]["particlelabel"]["particlels"][this.lane]["left4k_n"] + 64,
                        GAME_CONFIG["game"]["particlelabel"]["bottom4k_n"] + 160,
                        0,
                        128,
                        document.getElementById("hitshowerlabel"));
                }
                this.is_clicked=true;
                this.element.style.display = "none";
            }else if(this.play_type == "player"&&!this.is_clicked){
                // 判断等级
            }
        }
        
    }
    calculateFallTime(t, lane){
        /*回退，推导开始时间*/
        /* 此处如果位移每毫秒位移过大会导致高度不准确 */
        let begintime = 0;
        let poi = 0;
        let flametime = 1;  //
        let movepx = 0;  // 每1ms移动的距离
        let con = 0;  //测试过程中防止出错
        while(poi<=this.track_l){
            con++;
            if(con>100000) break;
            if(this.flow_velocity.length==1){
                movepx = this.flow_velocity[0][1];
            }else{
                /* -- -- i i+1 t-begin */
                for(let i=0;i<this.flow_velocity.length-1;i++){
                    if(this.flow_velocity[i][0]<t-begintime&&this.flow_velocity[i+1][0]>=t-begintime){
                        movepx = this.flow_velocity[i][1];
                        // console.log(i);
                    }
                    if(i==this.flow_velocity.length-2&&this.flow_velocity[i+1][0]<=t-begintime){
                        movepx = this.flow_velocity[i+1][1];
                    }
                }
                if(t-begintime<=0){
                    movepx = this.flow_velocity[0][1];
                }
            }
            // console.log(con);
            poi += movepx;
            begintime += flametime;
        }
        this.begin_time = t - begintime;
        this.fall_time = t - begintime;
        this.begin_pos = poi;
        this.end_time = t;
    }
    
    animationCallback(relative_time){
        // 动画回调函数
        let pos = this.notePosition(this.begin_time, relative_time, this.track_l - this.begin_pos);
        // console.log("relative_time="+relative_time);
        // console.log("pos="+pos);
        if(relative_time >= this.end_time){
            if(this.play_type == "autoplay"){
                // 模拟点击
                this.elementClick();
            }
            // 如果谱面流速是正数则按照流速 负数则物块消失
            if(this.last_pos>pos) this.element.style.display = "none";
            else{
                this.element.style.transform="translateY(" + (pos- 64).toString() + "px) translateZ(0)";
                this.last_pos = pos;
            }
        }else{
            this.element.style.transform="translateY(" + (pos- 64).toString() + "px) translateZ(0)";
            this.last_pos = pos;
        }
    }
}
class Hold extends GameBlocks{
    is_clicked = false;
    particle_url = "";
    len = 0;
    is_pressed = false;
    element_amount = 0;             // 物量
    judge_array = [];               // 判定数组
    timer_array = [];               // 间隔时间数组
    timer_amount_array = [];        // 每个计时器的个数
    constructor(type, parent, src, t1, t2, lane, flow_velocity, track_l, play_type, bpm){
        super(type, parent, src);
        this.t1 = t1;
        this.t2 = t2;
        this.lane = lane;
        this.flow_velocity = flow_velocity;
        this.track_l = track_l;
        this.play_type = play_type;
        this.bpm = bpm;
        this.hold_particle = new HoldParticle(document.getElementById("particle"+this.lane.toString()), "");
        // console.log(src);

        this.element.setAttribute("class", "holdimg");

        this.calculateFallTime(this.t1, this.t2, this.lane);

        this.element.style.left = (this.lane*255+10).toString() + "px";
        this.element.style.top = (this.track_l -  this.begin_pos).toString() + "px";

        this.teoo = 0;
    }
    timeAdd(time){
        // 整体后移多少时间
        this.begin_time += time;
        this.fall_time += time;
        this.hold_end_time += time;
        this.end_time += time;
        this.t1 += time;
        this.t2 += time;
    }
    setParticleUrl(particle_url){
        this.particle_url = particle_url;
    }
    getFallTime(){
        return this.fall_time;
    }
    addParticleToParent(){
        this.hold_particle.addToParent();
    }
    getEndTime(){
        return this.end_time;
    }
    getLane(){
        return this.lane;
    }
    getIsClicked(){
        return this.is_clicked;
    }
    elementClick(type){
        // 此函数被调用一定是符合时间区间的
        if(this.play_type == "autoplay"){
            this.score_shower.addElement("pure");
            if(this.track6k){
                let shower = new HitShower(
                    GAME_CONFIG["game"]["particlelabel"]["particlels"][this.lane]["left6k_n"] + 64,
                    GAME_CONFIG["game"]["particlelabel"]["bottom6k_n"] + 160,
                    0,
                    128,
                    document.getElementById("hitshowerlabel"));
            }else{
                let shower = new HitShower(
                    GAME_CONFIG["game"]["particlelabel"]["particlels"][this.lane]["left4k_n"] + 64,
                    GAME_CONFIG["game"]["particlelabel"]["bottom4k_n"] + 160,
                    0,
                    128,
                    document.getElementById("hitshowerlabel"));
            }
        }else if(this.play_type == "player"){
            // 判断等级
        }
        if(this.is_clicked){
            this.element.style.display = "none";
        }
    }
    getElementAmount(){
        return this.element_amount;
    }
    calculateFallTime(t1, t2, lane){
        /*hold区间铺面流速不能为负数*/
        let begintime = 0;
        let begintime1 = 0;
        let poi = 0;
        let flametime = 1;  //
        let movepx = 0;  // 每1ms移动的距离
        let con = 0;  //测试过程中防止出错
        while(poi<=this.track_l){
            con++;
            if(con>1000000) break;
            if(this.flow_velocity.length==1){
                movepx = this.flow_velocity[0][1];
            }else{
                /* -- -- i i+1 t-begin */
                for(let i=0;i<this.flow_velocity.length-1;i++){
                    if(this.flow_velocity[i][0]<t1-begintime&&this.flow_velocity[i+1][0]>=t1-begintime){
                        movepx = this.flow_velocity[i][1];
                        // console.log(i);
                    }
                    if(i==this.flow_velocity.length-2&&this.flow_velocity[i+1][0]<=t1-begintime){
                        movepx = this.flow_velocity[i+1][1];
                    }
                }
                if(t1-begintime<=0){
                    movepx = this.flow_velocity[0][1];
                }
            }
            // console.log(con);
            poi += movepx;
            begintime += flametime;
            // console.log("poi=" + poi);
        }
        let poi_ = poi;
        poi=0;
        con=0;
        while(poi<=this.track_l){
            con++;
            if(con>1000000) break;
            if(this.flow_velocity.length==1){
                movepx = this.flow_velocity[0][1];
            }else{
                /* -- -- i i+1 t-begin */
                for(let i=0;i<this.flow_velocity.length-1;i++){
                    if(this.flow_velocity[i][0]<t2-begintime&&this.flow_velocity[i+1][0]>=t2-begintime){
                        movepx = this.flow_velocity[i][1];
                        // console.log(i);
                    }
                    if(i==this.flow_velocity.length-2&&this.flow_velocity[i+1][0]<=t2-begintime){
                        movepx = this.flow_velocity[i+1][1];
                    }
                }
                if(t2-begintime<=0){
                    movepx = this.flow_velocity[0][1];
                }
            }
            // console.log(con);
            poi += movepx;
            begintime1 += flametime;
            // console.log("poi=" + poi);
        }
        // this.hold_id[this.hold_id.length] = 0;  //给noteid号码
        let robj = this.holdEAuncut(t1, t2);
        this.judge_array = robj.judge;
        this.timer_array = robj.timer;
        this.timer_amount_array = robj.timerA;
        let this_ = this;
        this.timer_amount_array.forEach((item)=>{
            this_.element_amount += item;
        })
        this.begin_time = t1 - begintime;
        this.fall_time = t1 - begintime;
        this.begin_pos = poi_;
        this.end_time = t2;
        this.hold_end_time = t2-begintime1;

        let len = this.holdLength();
        this.len = len;
        this.element.style.height = len.toString() + "px";

        // console.log(len);
        // console.log("begin_pos"+this.begin_pos);
    }
    holdLength(){
        /* 计算长度 */
        let len = 0;
        // let nowtime = this.end_time;
        // let t = nowtime - this.hold_end_time + this.begin_time;
        let nowtime = this.t2;
        let t = this.t1;
        let index = 0;  // 时间位置
        for(let i=0;i<this.flow_velocity.length;i++){
            if(this.flow_velocity[i][0]<=nowtime){
                index = i;
            }else{
                break;
            }
        }
        for(let i=index;i>=0;i--){
            if(i+1<this.flow_velocity.length){
                if(this.flow_velocity[i][0]>t&&this.flow_velocity[i+1][0]>nowtime){
                    len+=this.flow_velocity[i][1]*(nowtime-this.flow_velocity[i][0]);
                }else if(this.flow_velocity[i][0]>t&&this.flow_velocity[i+1][0]<=nowtime){
                    len+=this.flow_velocity[i][1]*(this.flow_velocity[i+1][0]-this.flow_velocity[i][0]);
                }else if(this.flow_velocity[i][0]<=t&&this.flow_velocity[i+1][0]>nowtime){
                    len+=this.flow_velocity[i][1]*(nowtime-t);
                    break;
                }else if(this.flow_velocity[i][0]<=t&&this.flow_velocity[i+1][0]<=nowtime){
                    len+=this.flow_velocity[i][1]*(this.flow_velocity[i+1][0]-t);
                    break;
                }
            }else{
                if(this.flow_velocity[i][0]>t){
                    len+=this.flow_velocity[i][1]*(nowtime-this.flow_velocity[i][0]);
                }else if(this.flow_velocity[i][0]<=t){
                    len+=this.flow_velocity[i][1]*(nowtime-t);
                    break;
                }
            }
        }
        return len;
    }
    holdKeyDown(){
        this.is_pressed = true;
    }
    holdKeyUp(){
        this.is_pressed = false;
    }
    holdEAuncut(t1, t2){
        // console.log(this.bpm);
        /* 计算物量
        //长条判定数组[t1, t2, elementAmount, lane, id, judge, timer, timerA] 判定时间 持续时间 物量 轨道 id 判定类型 计时器间隔时间 计时器个数
        judge[0, 0, 0, 0, 0]  各个判定点的判定结果
        timer[41, 83, 167]  
        timerA[23, 11, 4]
        物量 = judge.length
        this.bpm[this.bpm.length] = [t, bpm, beats];
        2. hold判定时间段：判断长条的持续时间
        2.1 bpm会影响判定密度，基准为当前bpm下的8分音符长度，但若bpm>=255，则bpm按一半计算
        2.2 持续时间大于0小于4分音符时长的hold，物量为1
        2.3 长度大于等于4分音符的hold，物量=持续时间 / 8分音符时长 - 1，向下取整
        2.4 当长条按压持续区间铺面流速发生变化，则截取区间，在内部判断
        根据bpm对基础切片
        >>大量情况<<
        60 / 180 / 4 = 0.083s = 83ms   8分：41ms
        60 / 90 / 4 = 0.167s = 167ms   8分：83ms
        60 / 45 / 4 = 0.334s = 334ms   8分：167ms
        |n~| 代表这段时间不做判断
      1000-------------2000------------3000------------4000
        |<-----180----->||<-----90----->||<-----45----->|
        |<---------------------hold-------------------->|
        |41|22个|41+16~||83|10个|83+6~||167|3个|167+165~|
        41 82 ... 判断数组是否被点击
        物量 = 1000 / 41 - 1 + 1000 / 83 - 1 + 1000 / 166 - 1
             = 24 - 1 + 12 - 1 + 6 - 1
             = 23 + 11 + 5
             = 39
        judge[0, 0 ,0.......,0,0] 39个  
        timer[41, 83, 166]
        timerA[23, 11, 5]
        (通过)

        >>持续时间小于4分音符，大于等于8分音符<<
        60 / 60 / 4 = 0.25s = 250ms  8分：125ms 
      1000-------------2000
        |<-----60----->|
      1000----200
        |<hold>|
        |125|75~|
        物量 = 1
        judge[0]
        timer[125]
        timerA[1]
        (通过)

        >>持续时间小于4分音符，小于8分音符<<
        60 / 60 / 4 = 0.25s = 250ms  8分：125ms 
      1000-------------2000
        |<-----60----->|
      1000----100
        |<hold>|
        |100|
        物量 = 1
        judge[0]
        timer[100]
        timerA[1]
        */
        let judge = [];
        let timer = [];
        let timerA = []; 
        let elementAmount = 0;
        let r_time = t2 - t1;
        let isjudget1 = false;
        let obj = null;
        let exit = false;
        if(this.bpm.length==1){
            obj = this.holdEAcut(t1, t2);
            if(obj!=null){
                timer[timer.length] = obj.timer;
                timerA[timerA.length] = obj.timerA;
                for(let j=0;j<obj.timerA;j++){
                    judge[judge.length] = 0;
                }
            }
        }else{
            for(let i=1;i<this.bpm.length;i++){
                // console.log("判断0");
                if(this.bpm[i][0]>t1&&!isjudget1){
                    // console.log("判断1");
                    isjudget1 = true;
                    if(this.bpm[i][0]>=t2){
                        obj = this.holdEAcut(t1, t2);
                        exit = true;
                    }else{
                        obj = this.holdEAcut(t1, this.bpm[i][0]);
                    }
                }else if(this.bpm[i][0]>t2&&isjudget1){
                    obj = this.holdEAcut(this.bpm[i-1][0], t2);
                    exit = true;
                }else if(this.bpm[i][0]<=t2&&isjudget1){
                    obj = this.holdEAcut(this.bpm[i-1][0], this.bpm[i][0]);
                }else if(i==this.bpm.length-1&&!isjudget1){
                    obj = this.holdEAcut(t1, t2);
                }
                if(obj!=null){
                    timer[timer.length] = obj.timer;
                    timerA[timerA.length] = obj.timerA;
                    for(let j=0;j<obj.timerA;j++){
                        judge[judge.length] = 0;
                    }
                }
                if(i==this.bpm.length-1&&t2>this.bpm[i][0]){
                    obj = this.holdEAcut(this.bpm[i][0], t2);
                    if(obj!=null){
                        timer[timer.length] = obj.timer;
                        timerA[timerA.length] = obj.timerA;
                        for(let j=0;j<obj.timerA;j++){
                            judge[judge.length] = 0;
                        }
                    }
                    exit = true;
                }
                if(exit) break;
            }
        }
        let robj = {judge, timer, timerA};
        return robj;
    }

    holdEAcut(t1, t2){
        /* 切片之后的 t1 t2 一定在一个bpm内 */
        let index = 0
        for(let i=0;i<this.bpm.length;i++){
            if(this.bpm[i][0]>t1){
                index = i;
                break;
            }
        }
        if(this.bpm.length>1){
            if(index!=0){
                index--;
            }else{
                index = this.bpm.length-1;
            }
        }
        let timer = 0
        let timerA = 0;
        let r_time = t2 - t1;  // 间隔时间
        let tbpm = this.bpm[index][1];
        if(tbpm>=255) Math.floor(tbpm /= 2);
        let MT4 = Math.floor(60000/tbpm/1);  // 4分音符毫秒  好像不是
        let MT8 = Math.floor(60000/tbpm/2);  // 8分音符毫秒  好像不是
        // console.log(r_time);
        // console.log("MT4=" + MT4);
        // console.log("MT8=" + MT8);
        if(r_time<MT4){
            timerA = 1;
            if(r_time<MT8){
                timer = r_time;
            }else{
                timer = MT8;
            }
        }else{
            timer = MT8;
            // console.log(r_time);
            timerA = Math.floor(r_time / MT8 - 1);
        }
        return {timer, timerA};
    }
    
    animationCallback(relative_time){
        // if(relative_time>=2513) return;
        // 动画回调函数
        let pos = this.notePosition(this.begin_time, relative_time, this.track_l - this.begin_pos);
        // console.log("relative_time="+relative_time);
        // console.log("pos="+pos);
        if(this.play_type == "autoplay"&&relative_time >= this.t1){
            // 模拟点击
            this.holdKeyDown();
        }
        if(relative_time >= this.end_time){
            if(this.play_type == "autoplay"){
                // 模拟点击
                this.holdKeyUp();
            }
            // 如果谱面流速是正数则按照流速 负数则物块消失
            if(this.last_pos>pos) this.element.style.display = "none";
            else{
                this.element.style.transform="translateY(" + (pos - 64 - this.len).toString() + "px) translateZ(0)";
                this.last_pos = pos;
            }
        }else{
            this.element.style.transform="translateY(" + (pos - 64 - this.len).toString() + "px) translateZ(0)";
            this.last_pos = pos;
        }
        console.log("pos"+pos);
        console.log("this.len"+this.len);
        console.log("relative_time"+relative_time);
        console.log(pos - 64 - this.len);
        let inset_top = 0;
        let inset_bottom = 0;
        if(pos - 64 - this.len < 0){
            inset_top = pos - 64 - this.len;
        }else{
            inset_top = 0;
        }
        if(this.is_pressed){
            inset_bottom = pos - 66 - this.track_l;
        }else{
            inset_bottom = 0;
        }
        let css_str = "inset("+(-1*inset_top).toString()+"px 0px "+inset_bottom.toString()+"px 0px)"
        this.element.style.clipPath = css_str;
        if(this.is_pressed&&relative_time>=this.t1&&relative_time<=this.t2){
            this.hold_particle.show()
            this.hold_particle.animation();
        }else{
            this.hold_particle.hide();
        }
        this.judgePress(relative_time);
    }
    removeFromParent(){
        // 移除组件
        this.parent.removeChild(this.element);
        this.hold_particle.removeFromParent();
    }
    judgePress(relative_time){
        // 判断按压
        if(this.t1 - relative_time > 100){
            // 此时按压都是失败的
            this.is_pressed = false;
        }else if(relative_time - this.t2 > 100){
            // this.is_pressed = false;
        }else if(relative_time - this.t2 > 200){
            // this.is_pressed = false;
        }else{
            // this.judge_array = robj.judge;   判定数组
            // this.timer_array = robj.timer;   计时器时间
            // this.timer_amount_array = robj.timerA;   每个计时器的个数
            if(relative_time>=this.t1&&relative_time<=this.t2){
                let index = 0;  // 对应当前判定数组的位置
                let check_index = 0;    // 对应当前检查数组的位置
                let r_t1 = relative_time - this.t1;     // 相对于t1过去多久
                let this_ = this;
                let temp_r_t1 = r_t1;
                let t_a_index = 0;      // 用哪个timer算
                let t_a_amount = 0;     // 本轮的timer算了几次
                while(temp_r_t1>=0){
                    temp_r_t1 -= this.timer_array[t_a_index];
                    t_a_amount++;
                    if(t_a_amount==this.timer_amount_array[t_a_index]){
                        t_a_index++;
                        t_a_amount=0;
                    }
                    index++;
                }
                index--;
                if(this.is_pressed&&index<this.judge_array.length){
                    this.judge_array[index] = 1;
                }
                // 检查上次的
                if(index>0){
                    if(this.judge_array[index-1]==0){
                        // lost
                        this.judge_array[index-1] = -1;
                        this.elementClick("lost");
                    }else if(this.judge_array[index-1]==1){
                        // pure
                        this.judge_array[index-1] = -1;
                        this.elementClick("pure");
                    }else{

                    }
                }
            }else if(relative_time>this.t2){
                // 检查是否存在没有判定的
                // console.log(this.judge_array);
                this.is_clicked = true;
                this.judge_array.forEach((item, index)=>{
                    if(item==0){
                        // lost
                        this.judge_array[index] = -1;
                        this.elementClick("lost");
                    }else if(item==1){
                        // pure
                        this.judge_array[index] = -1;
                        this.elementClick("pure");
                    }else{}
                });
            }
        }
    }
}