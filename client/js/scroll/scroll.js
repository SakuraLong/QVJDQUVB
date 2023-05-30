class Scroll{
    ease_coefficient = 0.05;  // 缓动系数
    _timer = null;
    vy=0;
    _oy=0;
    _cy=0;
    _oh=0;
    _ch=0;
    _startTime=0;
    isDown=false;
    high_speed = 50;  // 最高末速度
    is_allow_click = true;
    is_song_list = false;  // 是否是歌曲选择列表 特殊处理
    is_char_list = false;  // 是否是角色选择列表 特殊处理
    song_shower = null;
    song_list_move_func = null;
    char_list_move_func = null;
    is_delete = false;  // 是否已经删除此效果
    constructor(ctx, direction){
        // 组件 移动方向 0上下 1左右
        this.ctx = ctx;
        this.ol = ctx.firstElementChild || ctx.firstChild;
        this.offset = 50;//最大溢出值
        this.cur = 0;//列表滑动位置
        this.isDown = false;
        this.vy = 0;//滑动的力度
        this.fl = 1000;//弹力,值越大,到度或到顶后,可以继续拉的越远
        this.isInTransition = false;//是否在滚动中
        this.direction = direction;
        this.mouceEventInit();
    }
    delete(){
        // 删除这个监听效果
        this.is_delete = true;
    }
    isSongList(is_song_list, song_shower, func){
        this.is_song_list = is_song_list;
        this.song_shower = song_shower;
        this.song_list_move_func = func;
    }
    isCharList(is_char_list, func){
        this.is_char_list = is_char_list;
        this.char_list_move_func = func;
    }
    setHighSpeed(high_speed){
        this.high_speed = high_speed;
    }
    mouceEventInit(){
        let this_ = this;
        this.ctx.addEventListener("mousedown", function (e) {
            this_.is_allow_click = true;
            // console.log("按下");
            if (this_.isInTransition) return;//如果在滚动中，则中止执行
            clearTimeout(this_._timer);//清除定时器
            this_.vy = 0;
            if(this_.direction==0){
                this_._oy = e.clientY - this_.cur;//计算鼠标按下位置与列表当前位置的差值,列表位置初始值为0
                this_._cy = e.clientY;//鼠标按下的位置
                this_._oh = this_.ctx.scrollHeight;//列表的高度
                this_._ch = this_.ctx.clientHeight;//容器的高度
            }else{
                this_._oy = e.clientX - this_.cur;//计算鼠标按下位置与列表当前位置的差值,列表位置初始值为0
                this_._cy = e.clientX;//鼠标按下的位置
                this_._oh = this_.ctx.scrollWidth;//列表的高度
                this_._ch = this_.ctx.clientWidth;//容器的高度
            }
            this_._startTime = e.timeStamp;//鼠标按下时的时间戳
            this_.isDown = true;//鼠标是否有按下，主要防止用户是从容器外开始滑动的
            // console.log("this_._cy="+this_._cy);
        }, false);
        this.ctx.addEventListener("mousemove", function (e) {
            // console.log(this_.isDown);
            if (this_.isDown) {//如果鼠标是从容器里开始滑动的
                this_.is_allow_click = false;
                if (e.timeStamp - this_._startTime > 0) {//如果是慢速滑动，就不会产生力度，列表是跟着鼠标移动的
                    this_._startTime = e.timeStamp;//慢速滑动不产生力度，所以需要实时更新时间戳
                    if(this_.direction==0){
                        this_.cur = e.clientY - this_._oy;//列表位置应为 鼠标当前位置减去鼠标按下时与列表位置的差值,如:列表初始位置为0,鼠标在 5的位置按,那么差值为 5,此处假如鼠标从5滑动到了4,向上滑,cur = 4-5 =-1  ,假如鼠标从5滑动到了6,向下滑,cur= 6 - 5 = 1
                    }else{
                        this_.cur = e.clientX - this_._oy;//列表位置应为 鼠标当前位置减去鼠标按下时与列表位置的差值,如:列表初始位置为0,鼠标在 5的位置按,那么差值为 5,此处假如鼠标从5滑动到了4,向上滑,cur = 4-5 =-1  ,假如鼠标从5滑动到了6,向下滑,cur= 6 - 5 = 1
                    }
                    if (this_.cur > 0) {//如果列表位置大于0,既鼠标向下滑动并到顶时
                        this_.cur *= this_.fl / (this_.fl + this_.cur);//列表位置带入弹力模拟,公式只能死记硬背了,公式为:位置 *=弹力/(弹力+位置)
                    }else if (this_.cur < this_._ch - this_._oh) {//如果列表位置小于 容器高度减列表高度(因为需要负数,所以反过来减),既向上滑动到最底部时。
                        //当列表滑动到最底部时,cur的值其实是等于 容器高度减列表高度的,假设窗口高度为10,列表为30,那此时cur为 10 - 30 = -20,但这里的判断是小于,所以当cur<-20时才会触发,如 -21;
                        this_.cur += this_._oh - this_._ch;//列表位置加等于 列表高度减容器高度(这是与上面不同,这里是正减,得到了一个正数) ,这里 cur 为负数,加上一个正数,延用上面的假设,此时 cur = -21 + (30-10=20) = -1 ,所以这里算的是溢出数
                        // console.log(cur);
                        this_.cur = this_.cur * this_.fl / (this_.fl - this_.cur) - this_._oh + this_._ch;//然后给溢出数带入弹力,延用上面的假设,这里为   cur = -1 * 150 /(150 - -1 = 151)~= -0.99 再减去 30  等于 -30.99  再加上容器高度 -30.99+10=-20.99  ,这也是公式,要死记。。
                    }
                    this_.setPos(this_.cur);//移动列表
                }
                if(this_.direction==0){
                    this_.vy = e.clientY - this_._cy;
                }else{
                    this_.vy = e.clientX - this_._cy;
                }
                //记录本次移动后,与前一次鼠标位置的滑动的距离,快速滑动时才有效,慢速滑动时差值为 1 或 0,vy可以理解为滑动的力度
                if(this_.vy<=-this_.high_speed) this_.vy=-this_.high_speed;  // 末尾最高速
                if(this_.vy>=this_.high_speed) this_.vy=this_.high_speed;  // 末尾最高速
                // console.log(vy);
                if(this_.direction==0){
                    this_._cy = e.clientY;//更新前一次位置为现在的位置,以备下一次比较
                }else{
                    this_._cy = e.clientX;//更新前一次位置为现在的位置,以备下一次比较
                }
                
            }
        }, false);
        this.ctx.addEventListener("mouseleave", function(e){
            this_.mleave(e);
        }, false);
        this.ctx.addEventListener("mouseup", function(e){
            this_.mleave(e);
        }, false);
    }
    setPos(x) {//传入列表x轴位置,移动列表
        if(this.is_delete) return;
        if(this.direction==0){
            this.ol.style.transform = "translateY(" + x + "px) translateZ(0)";
            if(this.is_song_list){
                this.song_list_move_func(this.song_shower, x);
            }
            if(this.is_char_list){
                this.char_list_move_func(x);
            }
        }else{
            this.ol.style.transform = "translateX(" + x + "px) translateZ(0)";
        }
    }

    ease(target) {
        this.isInTransition = true;
        let this_ = this;
        this._timer = setInterval(function () {//回弹算法为  当前位置 减 目标位置 取2个百分点 递减
            this_.cur -= (this_.cur - target) * 0.05;
            if (Math.abs(this_.cur - target) < 1) {//减到 当前位置 与 目标位置相差小于1 之后直接归位
                this_.cur = target;
                clearInterval(this_._timer);
                this_.isInTransition = false;
            }
            this_.setPos(this_.cur);
        }, 10);
    }

    mleave(e){
        // console.log("松开");
        if(this.isDown) {
            this.isDown = false;
            // console.log("vy=" + this.vy);
            if(this.vy>=2){
                this.is_allow_click = false;
            }
            // var t = this,
            let friction = ((this.vy >> 31) * 2 + 1) * 0.5;//根据力度套用公式计算出惯性大小,公式要记住
            let oh = 0;
            if(this.direction==0){
                oh = this.ctx.scrollHeight - this.ctx.clientHeight;
            }else{
                oh = this.ctx.scrollWidth - this.ctx.clientWidth;
            }
            let this_ = this;
            this._timer = setInterval((function (this_) {//
                return function(){
                    // console.log("friction="+friction);
                    this_.vy -= friction;//力度按 惯性的大小递减
                    this_.cur += this_.vy;//转换为额外的滑动距离
                    this_.setPos(this_.cur);//滑动列表

                    if (-this_.cur - oh > this_.offset) {//如果列表底部超出了
                        clearTimeout(this_._timer);
                        this_.ease(-oh);//回弹
                        return;
                    }
                    if (this_.cur > this_.offset) {//如果列表顶部超出了
                        clearTimeout(this_._timer);
                        this_.ease(0);//回弹
                        return;
                    }
                    if (Math.abs(this_.vy) < 1) {//如果力度减小到小于1了,再做超出回弹
                        clearTimeout(this_._timer);
                        if (this_.cur > 0) {
                            this_.ease(0);
                            return;
                        }
                        if (-this_.cur > oh) {
                            this_.ease(-oh);
                            return;
                        }
                    }
                }
            })(this_), 10);
        }
    }

    moveTo(pos, animation){
        // 直接移动
        let oh = 0;
        if(this.direction==0){
            oh = this.ctx.scrollHeight - this.ctx.clientHeight;
        }else{
            oh = this.ctx.scrollWidth - this.ctx.clientWidth;
        }
        if(animation){
            if (-pos - oh > this.offset) {//如果列表底部超出了
                clearTimeout(this._timer);
                this.ease(-oh);//回弹
                return;
            }
            if (pos > this.offset) {//如果列表顶部超出了
                clearTimeout(this._timer);
                this.ease(0);//回弹
                return;
            }
            clearTimeout(this._timer);
            this.ease(pos);//回弹
            return;
        }else{
            this.setPos(pos);
            this.cur = pos;
            if (-this.cur - oh > this.offset) {//如果列表底部超出了
                clearTimeout(this._timer);
                this.ease(-oh);//回弹
                return;
            }
            if (this.cur > this.offset) {//如果列表顶部超出了
                clearTimeout(this._timer);
                this.ease(0);//回弹
                return;
            }
        }
    }
    isAllowClick(){
        // console.log("is_allow_click"+this.is_allow_click);
        return this.is_allow_click;
    }
}