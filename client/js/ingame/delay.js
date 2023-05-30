/* 计算延迟率 */
/* 函数针对设置里面的组件生效 */
var DELAY_JUDGE_AUDIO_ID = "delayjudgemusic";  // 播放判断音乐的组件id
var delay_begin_id = "";  // 延迟率计算开始按钮
var delay_shower_id = "prompt_offset_shower_";  // 延迟率计算结束后显示数字的div id
var delay_shower_baseid = "prompt_offset_shower_";  // 延迟率计算中显示数字的基础id组件
var MUSIC_PLAY_TIME = 0;
var DELAY_TIME_ARRAY = new Array(4);
var OFFSET_RES = 0;
function delayCalculating(this_){
    /* 音频加载完成后，再进行判断 */
    for(let i=0;i<4;i++){
        DELAY_TIME_ARRAY[i] = -5000;
    }
    document.getElementById("body").addEventListener("keydown", promptOffsetTapOnKeyDown);
    document.getElementById("prompt_offset_tap").style.pointerEvents = "all";
    document.getElementById("prompt_offset_tap").addEventListener("click", delayClick);
    var timer = setInterval(function(){
        if(document.getElementById(DELAY_JUDGE_AUDIO_ID).readyState == 4){
            /* 加载完成 */
            console.log("加载完成");
            clearInterval(timer);
            setTimeout(function(){
                delayMusicPlay(this_);
            }, 1000);
        }
    }, 20);
}
function promptOffsetTapOnKeyDown(ev){
    console.log(ev.code);
    if(ev.code=="Space") delayClick();
}
function delayMusicPlay(this_){
    MUSIC_PLAY_TIME = new Date().getTime();
    document.getElementById(DELAY_JUDGE_AUDIO_ID).play();
    document.getElementById(DELAY_JUDGE_AUDIO_ID).onended = function(){
        delayTimeMean(this_);
    };
}

function delayClick(){
    /*  0~2 算1
        2~4 算2
        4~6 算3
        6~8 算4
    */
    console.log("点击");
    let delay_now_time = new Date().getTime();
    let delay_r_time = delay_now_time - MUSIC_PLAY_TIME;
    console.log(delay_r_time);
    if(delay_r_time >=0 && delay_r_time <2000){
        DELAY_TIME_ARRAY[0] = delay_r_time - 1000;
    }else if(delay_r_time >=2000 && delay_r_time <4000){
        DELAY_TIME_ARRAY[1] = delay_r_time - 3000;
    }else if(delay_r_time >=4000 && delay_r_time <6000){
        DELAY_TIME_ARRAY[2] = delay_r_time - 5000;
    }else if(delay_r_time >=6000 && delay_r_time <=8000){
        DELAY_TIME_ARRAY[3] = delay_r_time - 7000;
    }
    showDelayMsg();
}

function showDelayMsg(){
    for(let i=0;i<4;i++){
        let delayshowerid  = delay_shower_baseid + i.toString();
        if(DELAY_TIME_ARRAY[i]!=-5000){
            document.getElementById(delayshowerid).innerHTML = DELAY_TIME_ARRAY[i];
        }
    }
}

function delayTimeMean(this_){
    document.getElementById("body").removeEventListener("keydown", promptOffsetTapOnKeyDown);
    document.getElementById("prompt_offset_tap").removeEventListener("click", delayClick);
    document.getElementById("prompt_offset_tap").style.pointerEvents = "none";
    let all = 0;
    let a = 0;
    console.log("结束");
    for(let i=0;i<4;i++){
        if(DELAY_TIME_ARRAY[i]!=-5000){
            console.log(DELAY_TIME_ARRAY[i])
            all += DELAY_TIME_ARRAY[i];
            a++;
        }
    }
    if(a==0){
        all = 0;
    }else{
        all = all / a;
    }
    this_.setOffsetType(a);
    // document.getElementById(delay_shower_id).innerHTML = all;
    OFFSET_RES = all;

    // setTimeout(function(){
    //     document.getElementById("bgaudio").play();
    // }, 1000);
}
var PROMPT_OFFSET_TAP_BG_URL_DOWN = "url('../resources/img/multiplayer/searching-shape1.png')";
var PROMPT_OFFSET_TAP_BG_URL_UP = "url('../resources/img/multiplayer/searching-shape2.png')";
var OFFSET_CONTENT = `
    <div id="prompt_offset_container">
        <div id="prompt_offset_content"></div>
        <div id="prompt_offset_tap" data-text="Tap" onmousedown="offsetTapMouseDown()" onmouseup="offsetTapMouseUp()"  onmouseleave="offsetTapMouseLeave()"></div>
        <div id="prompt_offset_shower">
            <div id="prompt_offset_shower_0" class="prompt_offset_shower_box">-</div>
            <div id="prompt_offset_shower_1" class="prompt_offset_shower_box">-</div>
            <div id="prompt_offset_shower_2" class="prompt_offset_shower_box">-</div>
            <div id="prompt_offset_shower_3" class="prompt_offset_shower_box">-</div>
        </div>
    </div>
`;
function offsetTapMouseDown(){
    document.getElementById("prompt_offset_tap").style.backgroundImage = PROMPT_OFFSET_TAP_BG_URL_DOWN;
}
function offsetTapMouseUp(){
    document.getElementById("prompt_offset_tap").style.backgroundImage = PROMPT_OFFSET_TAP_BG_URL_UP;
}
function offsetTapMouseLeave(){
    document.getElementById("prompt_offset_tap").style.backgroundImage = PROMPT_OFFSET_TAP_BG_URL_UP;
}
class OffsetCancelPrompt extends Prompt{
    constructor(id, parent_id, type, title, content, answer, of_pr){
        super(id, parent_id, type, title, content, answer);
        this.of_pr = of_pr;
    }
    leftLeave(){
        if(this.allow_leave){
            this.element.style.animationName = "prompt_out";
            this.prompt_shower.style.animationName = "prompt_shower_out";
            let this_ = this;
            this.of_pr.offsetPromptLeave();
            setTimeout(function(){
                this_.element.style.display = "none";
                document.getElementById(this_.parent_id).removeChild(this_.element);
            }, 300);
        }
    }
    rightLeave(){
        if(this.allow_leave){
            this.element.style.animationName = "prompt_out";
            this.prompt_shower.style.animationName = "prompt_shower_out";
            let this_ = this;
            this.of_pr.setOpacity(1);
            setTimeout(function(){
                this_.element.style.display = "none";
                document.getElementById(this_.parent_id).removeChild(this_.element);
            }, 300);
        }
    }
}
class OffsetPrompt extends Prompt{
    /* A0 从未开始 | A1 正在播放 | A2 求平均值成功 | A3 求平均值失败 */
    offset_type = "A0";
    constructor(callback_func, language){
        super("offset_prompt", "body", 1,
            base_language_data[language].topbar.settingPage.audioPage.offsetPrompt.title,
            OFFSET_CONTENT,
            [base_language_data[language].topbar.settingPage.audioPage.offsetPrompt.answer[0][0],
             base_language_data[language].topbar.settingPage.audioPage.offsetPrompt.answer[1][0]]);
        this.callback_func = callback_func;
        this.language = language;
    }
    show(){
        document.getElementById("bgaudio").setAttribute("src", "../resources/audio/bgm_full.ogg");
        this.elementInit();
        this.element.style.display = "flex";
        this.element.style.animationName = "prompt_in";
        this.prompt_shower.style.animationName = "prompt_shower_in";
        this.setOffsetElement();
        this.offsetType();
    }
    setOffsetElement(){
        document.getElementById("prompt_offset_content").innerHTML = 
            base_language_data[this.language].topbar.settingPage.audioPage.offsetPrompt.content.content;
        document.getElementById("prompt_offset_tap").innerHTML = 
            base_language_data[this.language].topbar.settingPage.audioPage.offsetPrompt.content.tap;
        document.getElementById("prompt_offset_tap").setAttribute("data-text", 
            base_language_data[this.language].topbar.settingPage.audioPage.offsetPrompt.content.tap)
    }
    leftLeave(){
        let left_button = document.getElementsByClassName("prompt_left")[0];
        left_button.style.pointerEvents = "none";
        left_button.style.backgroundImage = "url('../resources/layouts/dialog/button_dual_disabled.png')";
        let right_button = document.getElementsByClassName("prompt_right")[0];
        right_button.style.pointerEvents = "none";
        right_button.style.backgroundImage = "url('../resources/layouts/dialog/button_dual_disabled_right.png')";
        document.getElementById("prompt_offset_tap").style.pointerEvents = "all";
        for(let i=0;i<4;i++)
            document.getElementById("prompt_offset_shower_"+i.toString()).innerHTML = "-";
        // 开始计算
        let this_ = this;
        delayCalculating(this_);
        this.offset_type = "A1";
        this.offsetType();
    }
    setOffsetType(amount){
        console.log(amount);
        if(amount==4){
            this.offset_type = "A2";
        }else{
            this.offset_type = "A3";
        }
        this.offsetType();
    }
    offsetType(){
        let left_button = document.getElementsByClassName("prompt_left")[0];
        let right_button = document.getElementsByClassName("prompt_right")[0];
        switch(this.offset_type){
            case "A0":
                document.getElementById("prompt_offset_tap").style.pointerEvents = "none";
                left_button.style.pointerEvents = "all";
                left_button.style.backgroundImage = "url('../resources/layouts/dialog/button_dual.png')";
                right_button.style.pointerEvents = "all";
                right_button.style.backgroundImage = "url('../resources/layouts/dialog/button_dual_right.png')";
                break;
            case "A1":
                document.getElementById("prompt_offset_tap").style.pointerEvents = "all";
                left_button.style.pointerEvents = "none";
                left_button.style.backgroundImage = "url('../resources/layouts/dialog/button_dual_disabled.png')";
                right_button.style.pointerEvents = "none";
                right_button.style.backgroundImage = "url('../resources/layouts/dialog/button_dual_disabled_right.png')";
                break;
            case "A2":
                document.getElementById("prompt_offset_tap").style.pointerEvents = "none";
                left_button.style.pointerEvents = "all";
                left_button.style.backgroundImage = "url('../resources/layouts/dialog/button_dual.png')";
                right_button.style.pointerEvents = "all";
                right_button.style.backgroundImage = "url('../resources/layouts/dialog/button_dual_right.png')";
                left_button.firstChild.innerHTML = base_language_data[this.language].topbar.settingPage.audioPage.offsetPrompt.answer[0][1];
                right_button.firstChild.innerHTML = base_language_data[this.language].topbar.settingPage.audioPage.offsetPrompt.answer[1][2];
                break;
            case "A3":
                document.getElementById("prompt_offset_tap").style.pointerEvents = "none";
                left_button.style.pointerEvents = "all";
                left_button.style.backgroundImage = "url('../resources/layouts/dialog/button_dual.png')";
                right_button.style.pointerEvents = "all";
                right_button.style.backgroundImage = "url('../resources/layouts/dialog/button_dual_right.png')";
                left_button.firstChild.innerHTML = base_language_data[this.language].topbar.settingPage.audioPage.offsetPrompt.answer[0][1];
                right_button.firstChild.innerHTML = base_language_data[this.language].topbar.settingPage.audioPage.offsetPrompt.answer[1][1];
                break;
        }
    }
    rightLeave(){
        let audio = new ClickAudio("../resources/audio/item_click.wav");
        if(this.offset_type!="A2"){
            this.setOpacity(0.8);
            let offset_cancel_prompt = new OffsetCancelPrompt("offset_cancel_prompt", "body", 1,
            base_language_data[this.language].topbar.settingPage.audioPage.offsetPrompt.CancelPrompt.title,
            base_language_data[this.language].topbar.settingPage.audioPage.offsetPrompt.CancelPrompt.content,
            base_language_data[this.language].topbar.settingPage.audioPage.offsetPrompt.CancelPrompt.answer,
            this);
            offset_cancel_prompt.show();
        }else{
            if(this.allow_leave){
                document.getElementById("bgaudio").onended=function(){bgendedDe();};
                document.getElementById("bgaudio").play();
                this.callback_func(OFFSET_RES);
                this.element.style.animationName = "prompt_out";
                this.prompt_shower.style.animationName = "prompt_shower_out";
                let this_ = this;
                setTimeout(function(){
                    this_.element.style.display = "none";
                    document.getElementById(this_.parent_id).removeChild(this_.element);
                }, 300);
            }
        }
    }
    offsetPromptLeave(){
        if(this.allow_leave){
            this.callback_func(OFFSET_RES);
            document.getElementById("bgaudio").onended=function(){bgendedDe();};
            document.getElementById("bgaudio").play();
            this.element.style.animationName = "prompt_out";
            this.prompt_shower.style.animationName = "prompt_shower_out";
            let this_ = this;
            setTimeout(function(){
                this_.element.style.display = "none";
                document.getElementById(this_.parent_id).removeChild(this_.element);
            }, 300);
        }
    }
    setOpacity(opacity){
        this.element.style.opacity = opacity;
    }
}
function bgendedDe(){
    console.log("kiacnkjsac");
    document.getElementById("bgaudio").loop = true;
    document.getElementById("bgaudio").setAttribute("src", "../resources/audio/bgm_loop.ogg");
    document.getElementById("bgaudio").play();
    document.getElementById("bgaudio").onended="";
}