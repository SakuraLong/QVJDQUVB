class ClickAudio{
    constructor(src, volume){
        this.audio = new Audio();
        this.audio.setAttribute("src", src);
        if(volume!=undefined&&volume!=null) this.audio.volume = volume;
        this.play();
    }
    play(){
        let this_ = this;
        // if(this.audio.readyState != 4) setTimeout(this_.play, 20);
        this.audio.play();
        this.audio.onended = this_.end;
    }
    end(){
        this.audio=null;
    }
}