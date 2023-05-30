/* 点击之后的提示 */
var HIT_ISPAUSE = false;
var hit_isreplay = false;
class HitShower{
    pure_path = "../resources/img/hit_pure.png";
    far_path = "../resources/img/hit_far.png";
    lost_path = "../resources/img/hit_lost.png";
    showerimg = null;
    is_pasue = false;
    constructor(l, b, type, w, parent){
        /* left坐标 bottom坐标 类型0，1，2 p f l 宽度 */
        this.l = l;
        this.b = b;
        this.type = type;
        this.w = w;
        this.parent = parent;
        this.showerinit();
    }
    showerinit(){
        this.showerimg = document.createElement("img");
        if(this.type==0)
        this.showerimg.setAttribute("src", this.pure_path);
        else if(this.type==1)
        this.showerimg.setAttribute("src", this.far_path);
        else if(this.type==2)
        this.showerimg.setAttribute("src", this.lost_path);
        this.showerimg.style.width = this.w.toString() + "px";
        this.showerimg.setAttribute("class", "hitshower");
        this.showerimg.style.left = this.l.toString() + "px";
        this.showerimg.style.bottom = this.b.toString() + "px";
        this.showerimg.style.position = "absolute";
        this.parent.appendChild(this.showerimg);
        this.showerimg.onanimationend = this.clearhitshower;

        this.animation(this.b, this.b + 50, 1, 50, 0, "ease-out");
    }
    animation(begin, end, time, frames, times, type){
        let pertime = 1/frames;  //获取一帧动画多少秒
        let ltime = time/pertime;  // 获取一共循环几次
        let ratio = 0;
        let x = times/ltime; //x值
        let this_ = this;
        if(HIT_ISPAUSE){
            setTimeout((function(this_){
                return function(){
                    this_.animation(begin, end, time, frames, times, type);
                }
            })(this_), pertime);
        }else{
            if(times == ltime){
                this.clearhitshower();
                return;
            }
            if(type == "linear"){
                ratio = x;
            }else if(type == "ease-in-out"){
                ratio = x*x;
            }else if(type == "ease-out"){
                ratio = -x*x + 2*x;
            }else if(type == "ease-out2"){
                ratio = Math.sqrt(1-(x-1)*(x-1));
            }
            let this_ = this;
            this.showerimg.style.bottom = (begin + (end-begin)*ratio).toString() + "px";
            this.showerimg.style.opacity = (1-x).toString();
            setTimeout((function(this_){
                return function(){
                    this_.animation(begin, end, time, frames, times+1, type);
                }
            })(this_), pertime);
        }
    }

    clearhitshower(){
        this.showerimg.style.display = "none";
        this.parent.removeChild(this.showerimg);
    }
}

class textshower{
    constructor(text){

    }
}