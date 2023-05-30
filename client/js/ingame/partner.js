class Partner{
    element = document.createElement("div");
    bg_img = document.createElement("img");
    char_size = document.createElement("div");
    char_img = document.createElement("img");
    skill_img = document.createElement("img");
    constructor(parent, char_json){
        this.parent = parent;
        this.char_json = char_json;
        this.dif = char_json.dif;
        this.idx = char_json.idx;
        this.element.setAttribute("class", "partner_base");
        switch(this.dif){
            case 0:
                this.bg_img.setAttribute("src", "../resources/img/skill_trigger_bg_easy.png");
                break;
            case 1:
                this.bg_img.setAttribute("src", "../resources/img/skill_trigger_bg.png");
                break;
            case 2:
                this.bg_img.setAttribute("src", "../resources/img/skill_trigger_bg_hard.png");
                break;
        }
        this.char_img.setAttribute("src", "../resources/char/" + this.idx + ".png");
        this.skill_img.setAttribute("src", "../resources/img/skill_trigger_text.png");
        this.bg_img.setAttribute("class", "partner_bg_img");
        this.char_size.setAttribute("class", "partner_char_size");
        this.char_img.setAttribute("class", "partner_char_img");
        this.skill_img.setAttribute("class", "partner_skill_img");
        this.element.appendChild(this.bg_img);
        this.element.appendChild(this.char_size);
        this.char_size.appendChild(this.char_img);
        this.element.appendChild(this.skill_img);
    }
    show(){
        let this_ = this;
        this.parent.appendChild(this.element);
        this.element.style.animationName = "partner_base_enter";
        this.element.onanimationend = function(){
            this_.char_img.style.animationName = "show_char";
            this_.char_img.onanimationend = function(){
                this_.element.style.animationName = "partner_base_leave";
                setTimeout((function(this_){
                    return function(){
                        this_.partnerEnd();
                    }
                })(this_), 900);
            }
        }
    }
    partnerEnd(){
        this.parent.removeChild(this.element);
    }
}