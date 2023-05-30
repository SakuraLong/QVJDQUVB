class Prompt{
    // 提示组件 组件会全屏，并且位于最顶端
    prompt_shower = document.createElement("div");
    title_color = "white";
    content_color = "white";
    answer_color = "white";
    left_answer_color = "white";
    right_answer_color = "white";
    leave_url = "";                 // 离开此界面去跳转到一个新的界面的地址
    leave_left_url = "";            // 离开此界面去跳转到一个新的界面的地址
    leave_right_url = "";           // 离开此界面去跳转到一个新的界面的地址
    leave_func = null;              // 离开此界面运行的函数
    leave_left_func = null;         // 点击左侧按钮运行的函数
    leave_right_func = null;        // 点击右侧按钮运行的函数
    allow_leave = true;             // 允许退出此页面
    min_height = null;              // content最小高度
    constructor(id, parent_id, type, title, content, answer){
        this.element_id= id;
        this.parent_id= parent_id;
        this.type = type;  //0底部一个按钮 1底部两个按钮 两个按钮的时候，answer为数组
        this.title = title;
        this.content = content;
        this.answer = answer;
        this.element = document.createElement("div");
        this.element.setAttribute("id", this.element_id);
        this.element.setAttribute("class", "prompt");
        this.element.style.display = "none";
        // this.elementInit();
    }
    setFontColor(type, color){
        switch(type){
            case "title": this.title_color = color;break;
            case "content": this.content_color = color;break;
            case "answer": this.answer_color = color;break;
            case "leftAnswer": this.left_answer_color = color;break;
            case "rightAnswer": this.right_answer_color = color;break;
        }
    }
    setLeaveFunc(type, func){
        switch(type){
            case "leave": this.leave_func = func;break;
            case "leftLeave": this.leave_left_func = func;break;
            case "rightLeave": this.leave_right_func = func;break;
        }
    }
    setLeaveConnection(type, url){
        this.leave_url = url;
        switch(type){
            case "leave": this.leave_url = url;break;
            case "leftLeave": this.leave_left_url = url;break;
            case "rightLeave": this.leave_right_url = url;break;
        }
    }
    elementInit(){
        // 组件初始化
        document.getElementById(this.parent_id).appendChild(this.element);
        this.prompt_shower.innerHTML = "";
        let prompt_top = document.createElement("div");
        prompt_top.setAttribute("class", "prompt_top");
        this.prompt_shower.appendChild(prompt_top);
        this.prompt_shower.setAttribute("class", "prompt_shower");
        this.element.appendChild(this.prompt_shower);
        let prompt_bg = document.createElement("div");
        prompt_bg.setAttribute("class", "prompt_bg");
        this.prompt_shower.appendChild(prompt_bg);
        let prompt_content = document.createElement("div");
        prompt_content.setAttribute("class", "prompt_content");
        prompt_content.innerHTML = this.content;
        if(this.min_height!=null) prompt_content.style.minHeight = this.min_height;
        prompt_bg.appendChild(prompt_content);
        let prompt_title = document.createElement("div");
        prompt_title.setAttribute("class", "prompt_title");
        prompt_title.innerHTML = this.title;
        prompt_top.appendChild(prompt_title);
        if(this.title_color!="white"){
            prompt_title.style.color = this.title_color;
            prompt_title.style.webkitTextStroke = "0.5px " + this.title_color;
        }
        if(this.content_color!="white") prompt_content.style.color = this.content_color;
        if(this.type==0){
            let prompt_bottom = document.createElement("div");
            prompt_bottom.setAttribute("class", "prompt_bottom");
            let this_ = this;
            prompt_bottom.addEventListener("click", (function(this_){
                return function(){
                    this_.leave();
                }
            })(this_));
            prompt_bg.appendChild(prompt_bottom);
            let prompt_answer = document.createElement("div");
            prompt_answer.setAttribute("class", "prompt_answer");
            prompt_answer.innerHTML = this.answer;
            prompt_bottom.appendChild(prompt_answer);
            if(this.answer_color!="white") prompt_answer.style.color = this.answer_color;
        }else if(this.type==1){
            let prompt_bottom_double = document.createElement("div");
            prompt_bottom_double.setAttribute("class", "prompt_bottom_double");
            let this_ = this;
            prompt_bg.appendChild(prompt_bottom_double);
            let prompt_left = document.createElement("div");
            prompt_left.setAttribute("class", "prompt_left");
            prompt_left.addEventListener("click", (function(this_){
                return function(){
                    this_.leftLeave();
                }
            })(this_));
            prompt_bottom_double.appendChild(prompt_left);
            let prompt_right = document.createElement("div");
            prompt_right.setAttribute("class", "prompt_right");
            prompt_right.addEventListener("click", (function(this_){
                return function(){
                    this_.rightLeave();
                }
            })(this_));
            prompt_bottom_double.appendChild(prompt_right);
            let prompt_answer_left = document.createElement("div");
            prompt_answer_left.setAttribute("class", "prompt_answer_left");
            prompt_answer_left.innerHTML = this.answer[0];
            prompt_left.appendChild(prompt_answer_left);
            let prompt_answer_right = document.createElement("div");
            prompt_answer_right.setAttribute("class", "prompt_answer_right");
            prompt_answer_right.innerHTML = this.answer[1];
            prompt_right.appendChild(prompt_answer_right);
            if(this.left_answer_color!="white") prompt_answer_left.style.color = this.left_answer_color;
            if(this.right_answer_color!="white") prompt_answer_right.style.color = this.right_answer_color;
        }
    }
    setAllowLeave(allow_leave){
        this.allow_leave = allow_leave;
    }
    setMinHeight(min_height){
        this.min_height = min_height + "px";
    }
    show(){
        this.elementInit();
        this.element.style.display = "flex";
        this.element.style.animationName = "prompt_in";
        this.prompt_shower.style.animationName = "prompt_shower_in";
    }
    leave(){
        let audio = new ClickAudio("../resources/audio/item_click.wav");
        if(this.leave_func!=null){
            this.leave_func();
        }
        if(this.leave_url!=""){
            const newOpenWindow = window.open('about:blank')
            newOpenWindow.location = this.leave_url;
        }
        if(this.allow_leave){
            this.element.style.animationName = "prompt_out";
            this.prompt_shower.style.animationName = "prompt_shower_out";
            let this_ = this;
            setTimeout(function(){
                this_.element.style.display = "none";
                document.getElementById(this_.parent_id).removeChild(this_.element);
            }, 300);
        }
    }
    leftLeave(){
        let audio = new ClickAudio("../resources/audio/item_click.wav");
        if(this.leave_left_func!=null){
            this.leave_left_func();
        }
        if(this.leave_left_url!=""){
            const newOpenWindow = window.open('about:blank')
            newOpenWindow.location = this.leave_left_url;
        }
        if(this.allow_leave){
            this.element.style.animationName = "prompt_out";
            this.prompt_shower.style.animationName = "prompt_shower_out";
            let this_ = this;
            setTimeout(function(){
                this_.element.style.display = "none";
                document.getElementById(this_.parent_id).removeChild(this_.element);
            }, 300);
        }
    }
    rightLeave(){
        let audio = new ClickAudio("../resources/audio/item_click.wav");
        if(this.leave_right_func!=null){
            this.leave_right_func();
        }
        if(this.leave_right_url!=""){
            const newOpenWindow = window.open('about:blank')
            newOpenWindow.location = this.leave_right_url;
        }
        if(this.allow_leave){
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
class deleteFriendPrompt extends Prompt{
    delete_func = null;
    friend_name = null;
    constructor(id, parent_id, type, title, content, answer){
        super(id, parent_id, type, title, content, answer);
    }
    setDeleteFunc(func, para){
        this.delete_func = func;
        this.friend_name = para;
    }
    leftLeave(){
        let audio = new ClickAudio("../resources/audio/item_click.wav");
        this.delete_func(this.friend_name);
        if(this.leave_left_func!=null){
            this.leave_left_func();
        }
        if(this.leave_left_url!=""){
            const newOpenWindow = window.open('about:blank')
            newOpenWindow.location = this.leave_left_url;
        }
        if(this.allow_leave){
            this.element.style.animationName = "prompt_out";
            this.prompt_shower.style.animationName = "prompt_shower_out";
            let this_ = this;
            setTimeout(function(){
                this_.element.style.display = "none";
                document.getElementById(this_.parent_id).removeChild(this_.element);
            }, 300);
        }
    }
    rightLeave(){
        let audio = new ClickAudio("../resources/audio/item_click.wav");
        if(this.leave_right_func!=null){
            this.leave_right_func();
        }
        if(this.leave_right_url!=""){
            const newOpenWindow = window.open('about:blank')
            newOpenWindow.location = this.leave_right_url;
        }
        if(true){
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