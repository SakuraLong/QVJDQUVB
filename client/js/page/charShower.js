class charShower{
    containdiv;
    exitdiv;
    charimg;
    left_max=100;//最大左偏移距离
    right_max=100;//最大右偏移距离
    top_max=100;//最大上偏移距离
    bot_max=100;//最大下偏移距离
    left_offset=0;//当前左偏移
    right_offset=0;//当前右偏移
    top_offset=0;//当前上偏移
    bot_offset=0;//当前下偏移
    size_max=1.5;//默认最大放大倍数
    size_min=1;//默认最小缩小倍数
    size_rate=0.1;//缩放步长
    initialLeft;
    initialTop;
    res_x=0;
    res_y=0;
    img_judge=true;
    constructor(src,parent_id, func)
    {   this.charimg=document.createElement('img');
        this.charimg.src=src;
        this.func = func;
        this.contain_div=document.createElement('div');
        this.contain_div.classList.add("contain_class");
        this.exit_div=document.createElement('div');
        this.exit_div.classList.add("exit_class");
        this.charimg.classList.add("charimg_class");
        this.charimg.setAttribute("draggable", false);
        document.getElementById(parent_id).appendChild(this.contain_div);
        this.contain_div.appendChild(this.exit_div);
        this.contain_div.appendChild(this.charimg);
        this.now_scale = 1;
        var par_width=this.contain_div.clientWidth;
        var charimg_width=this.charimg.clientWidth;//图片初始宽度
        var charimg_left=(par_width-charimg_width)/2;//初始距离左距离
        this.charimg.style.left=charimg_left+"px";
        this.initialLeft = this.charimg.offsetLeft;
        this.initialTop = this.charimg.offsetTop;
        // console.log("initialLeft:"+this.initialLeft);
        // console.log("initialTop:"+this.initialTop);
        let this_ = this;
        // 绑定 mousedown 事件
        this.charimg.addEventListener('mousedown', e => {
            // 记录鼠标初始位置和img初始位置
            let startX = e.clientX;
            let startY = e.clientY;
            // console.log("left1:"+this_.charimg.style.left);
            // console.log("left2:"+this_.charimg.offsetLeft);
            // console.log("top1:"+this_.charimg.style.top);
            // console.log("top2:"+this_.charimg.offsetTop);
            // 绑定 mousemove 和 mouseup 事件
            function handleMouseMove(e) {
                if(this_.img_judge){
                // 计算鼠标移动的偏移量
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                // console.log(this_.initialLeft, this_.initialTop);
                let res_arr = this_.judge(this_.initialLeft, this_.initialTop, deltaX, deltaY);
                this_.initialLeft = res_arr[0];
                this_.initialTop = res_arr[1];
                // console.log(res_arr);
                startX = e.clientX;
                startY = e.clientY;
                this_.charimg.style.left = this_.initialLeft+ 'px';
                this_.charimg.style.top = this_.initialTop + 'px';

            }};
            function handleMouseUp() {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              }
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup',handleMouseUp );
        });
        this.charimg.addEventListener("mouseover", function() {
            this_.img_judge=true;
        });
        this.charimg.addEventListener("mouseout", function() {
            this_.img_judge=false;
        });
        this.charimg.addEventListener("wheel", myFunction);
        function myFunction(event) {
            var currentScale=1;
            var transformValue = window.getComputedStyle(this_.charimg, null).getPropertyValue("transform");
            var matrix = transformValue.match(/^matrix\((.+)\)$/);
            if (matrix) {
                var matrixValues = matrix[1].split(",");
                var a = matrixValues[0];
                var b = matrixValues[1];
                var c = matrixValues[2];
                var d = matrixValues[3];
                let scale = Math.sqrt(a * a + b * b);
                currentScale=scale;
            }
            if (event.deltaY > 0) {
                this_.now_scale = this_.now_scale - this_.size_rate < this_.size_min ? this_.size_min : this_.now_scale - this_.size_rate;
                this_.charimg.style.transform = "scale(" + this_.now_scale + ")";
                let res_arr = this_.judge(this_.initialLeft, this_.initialTop, 0, 0);
                this_.initialLeft = res_arr[0];
                this_.initialTop = res_arr[1];
                this_.charimg.style.left = this_.initialLeft+ 'px';
                this_.charimg.style.top = this_.initialTop + 'px';
            } 
            else if (event.deltaY < 0) {
                this_.now_scale = this_.now_scale + this_.size_rate > this_.size_max ? this_.size_max : this_.now_scale + this_.size_rate;
                this_.charimg.style.transform = "scale(" + this_.now_scale + ")";
                let res_arr = this_.judge(this_.initialLeft, this_.initialTop, 0, 0);
                this_.initialLeft = res_arr[0];
                this_.initialTop = res_arr[1];
                this_.charimg.style.left = this_.initialLeft+ 'px';
                this_.charimg.style.top = this_.initialTop + 'px';
                
            }
        }
        this.exit_div.addEventListener("click", function () {
            this_.contain_div.style.animationName="containdivdisapp";
            this_.func();
            let timerqaq = setTimeout(function(){
                document.getElementById(parent_id).removeChild(this_.contain_div);
                // document.getElementById("netdiv_test").style.display="none";//要注释
            },300);
        });
    }
    judge(now_left, now_top, move_left, move_top){
        // 放大缩小先于此函数
        // console.log("now_left="+now_left);
        // console.log("now_top="+now_top);
        let width = this.charimg.clientWidth;
        let height = this.charimg.clientHeight;
        let con_width = this.contain_div.clientWidth;
        let con_height = this.contain_div.clientHeight;
        let img_left = now_left - width * (this.now_scale - 1) / 2;
        let img_top = now_top - height * (this.now_scale - 1) / 2;
        let judge_left = (this.contain_div.clientWidth - width) / 2;
        let judge_right = (this.contain_div.clientWidth - width) / 2 + width;
        let judge_top = 0;
        let judge_bottom = judge_top + this.contain_div.clientHeight;
        // console.log("img_left="+img_left);
        // console.log("img_top="+img_top);
        // console.log("now_scale="+this.now_scale);
        img_left = img_left + move_left > judge_left + this.left_max ? judge_left + this.left_max : img_left + move_left;
        img_left = img_left + move_left + width * this.now_scale < judge_right - this.right_max ? judge_right - this.right_max - width * this.now_scale : img_left + move_left;
        img_top = img_top + move_top > judge_top + this.top_max ? judge_top + this.top_max : img_top + move_top;
        img_top = img_top + move_top + height * this.now_scale  < judge_bottom - this.bot_max ? judge_bottom - this.bot_max - height * this.now_scale : img_top + move_top;
        img_left += width * (this.now_scale - 1) / 2;
        img_top += height * (this.now_scale - 1) / 2;
        return [img_left, img_top];
    }
    show() {
        this.contain_div.style.animationName="containdivapp";
    }
    setScaleAndStep(min, max, step){
        this.size_min=min;
        this.size_max=max;
        this.size_rate=step;
    }
    setMaxOffset(left, top, right, bottom){
        this.left_max=left;
        this.top_max=top;
        this.right_max=right;
        this.bot_max=bottom;
    }
    setSize(width){
        this.charimg.style.width=width+"%";
    }
    setExitButtonSize(width){
        this.exit_div.style.width=width+"px";
        this.exit_div.style.height=width+"px";
    }
    setExitButtonPos(left, top){
        this.exit_div.style.left=left+"px";
        this.exit_div.style.top=top+"px";
    }

};
function Click_test(src,parent_id){
    document.getElementById("netdiv_test").style.display="block";
    let testc=new charShower(src,parent_id);
    testc.show();
}
