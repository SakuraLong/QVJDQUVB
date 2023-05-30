class Waiting{
    basewaitingimg = "../resources/img/activity_icon.png";
    id = "";
    timer = null;
    bg = false;
    constructor(left, right, top, bottom, type){
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.type = type;
        this.ele = document.createElement(type);
        this.ele.setAttribute("class", "waiting");
        this.ele_bg = document.createElement("div");
        this.ele_bg.setAttribute("class", "waiting_bg");
    }
    appendToElementById(id){
        this.id = id;
        let temp_ele = document.getElementById(id);
        if(this.type=="div"){
            this.ele.style.backgroundImage = "url('" + this.basewaitingimg + "')";
        }else{
            this.ele.setAttribute("src", this.basewaitingimg);
        }
        if(this.left!=-1) this.ele.style.left = this.left;
        if(this.right!=-1) this.ele.style.right = this.right;
        if(this.top!=-1) this.ele.style.top = this.top;
        if(this.bottom!=-1) this.ele.style.bottom = this.bottom;
        this.ele.style.opacity = 1;
        this.ele_bg.style.opacity = 1;
        this.ele.style.display = "block";
        this.ele_bg.style.display = "block";
        if(this.bg){
            this.ele_bg.appendChild(this.ele);
            temp_ele.appendChild(this.ele_bg);
        }else temp_ele.appendChild(this.ele);
    }
    setBlackBg(){
        this.bg = true;
    }
    setWidth(width){
        this.ele.style.width = width;
    }
    setHeight(height){
        this.ele.style.height = height;
    }
    waitingOver(){
        let this_ = this;
        setTimeout((function(this_){
            return function(){
                this_.delete();
            }
        })(this_), 500);
        this.timer = setInterval((function(this_){
            return function(){
                if(this_.bg){
                    let opa = this_.ele_bg.style.opacity - 0.05;
                    if(opa<0) opa=0;
                    this_.ele_bg.style.opacity=opa;
                }else{
                    let opa = this_.ele.style.opacity - 0.05;
                    if(opa<0) opa=0;
                    this_.ele.style.opacity=opa;
                }
            }
        })(this_), 25);
    }
    delete(){
        if(this.bg){
            this.ele_bg.style.display = "none";
            this.ele.style.display = "none";
            clearInterval(this.timer);
            document.getElementById(this.id).removeChild(this.ele_bg);
        }else{
            this.ele.style.display = "none";
            clearInterval(this.timer);
            document.getElementById(this.id).removeChild(this.ele);
        }
    }
}