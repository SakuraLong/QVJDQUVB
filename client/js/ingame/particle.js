var PARTICAL_ISPAUSE = false;
class Partical{
    is_pause = false;
    constructor(parent, url){
        this.parent = parent;
        this.url = url;
        this.element = document.createElement("div");
        this.element.style.backgroundImage = "url('" + this.url + "')";
        this.element.setAttribute("class", "particlediv");
        this.parent.appendChild(this.element);
        let this_ = this;
        this.particledivtimer = setInterval((function(this_){
            return function(){
                this_.particleNoteAnimationIn();
            }
        })(this_), 30);
    }
    setIsPause(is_pause){
        this.is_pause = is_pause;
    }
    setReplay(){
        clearInterval(this.particledivtimer);
    }
    particleNoteAnimationIn(){
        if(PARTICAL_ISPAUSE){
            return;
        }
        let x = Number(this.element.style.backgroundPositionX.substring(0, this.element.style.backgroundPositionX.length-2));
        let y = Number(this.element.style.backgroundPositionY.substring(0, this.element.style.backgroundPositionY.length-2));
        x-=256;
        if(x<-768){
            y-=256;
            x=0;
        }
        if(y<-768){
            this.element.style.display = "none";
            this.parent.removeChild(this.element);
            clearInterval(this.particledivtimer);
        }
        this.element.style.backgroundPositionX=x.toString()+"px";
        this.element.style.backgroundPositionY=y.toString()+"px";
    }
}
class HoldParticle{
    /*
    <script src="./sparks-fireball_files/info.js"></script>
    <script src="./sparks-fireball_files/ppo.min.js"></script>
    <script src="./sparks-fireball_files/stats.min.js"></script>
    <script src="./sparks-fireball_files/TweenLite.min.js"></script>
    <script src="./sparks-fireball_files/proton.min.js"></script>
    */
    canvas;
    context;
    proton;
    renderer;
    emitter;
    position;
    stats;
    image;
    constructor(parent, type){
        this.parent = parent;
        this.type = type;
        this.canvas = document.createElement("canvas");
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.canvas.style.position="absolute";
        this.canvas.style.left = "-172px";
        this.canvas.style.top = "-172px";
        this.canvas.style.opacity="0.4";
        this.canvas.style.backgroundColor="rgba(0, 0, 0, 0)";

        this.loadImage();
    }
    loadImage() {
        let this_ = this;
        this.image = new Image();
        this.image.onload = (function (this_) {
            return function(){
                this_.image.style.width="3px";
            }
        })(this_);
        this.image.src = "../resources/particle/particle_arc.png";
    }
    createProton() {
        let image = this.image;
        this.proton = new Proton();

        this.emitter = new Proton.Emitter();
        this.emitter.rate = new Proton.Rate(new Proton.Span(10, 15), 0.1);

        this.emitter.addInitialize(new Proton.Mass(1));
        this.emitter.addInitialize(new Proton.Body(image));

        this.position = new Proton.Position(
          new Proton.PointZone(this.canvas.width / 2, this.canvas.height / 2)
        );
        this.emitter.addInitialize(this.position);
        this.emitter.addInitialize(new Proton.Life(0.2, 0.6));
        this.emitter.addInitialize(
          new Proton.V(new Proton.Span(0, 0.8), new Proton.Span(0, 360), "polar")
        );
        // #70A3C8 
        // emitter.addBehaviour(new Proton.Color("#F524DD", "#000000"));
        // emitter.addBehaviour(new Proton.Color("#9D16CC", "#3D094F"));
        this.emitter.addBehaviour(new Proton.Color("#70A3C8", "#BA09C8"));
        this.emitter.addBehaviour(new Proton.Scale(0, Proton.getSpan(3, 8)));
        this.emitter.emit();

        this.proton.addEmitter(this.emitter);

        this.renderer = new Proton.WebGlRenderer(this.canvas);
        this.renderer.blendFunc("SRC_ALPHA", "ONE");
        this.proton.addRenderer(this.renderer);

        console.log("添加完成");
    }
    addToParent(){
        this.parent.appendChild(this.canvas);
        this.createProton();
    }
    removeFromParent(){
        this.canvas.style.display="none";
        this.parent.removeChild(this.canvas);
    }
    show(){
        this.canvas.style.visibility="visible";
    }
    hide(){
        this.canvas.style.visibility="hidden";
    }
    animation(){
        try{
            this.proton.update();
        }catch{}
    }
}