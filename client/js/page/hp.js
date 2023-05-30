class HPElement{
    char_list_json = null;                          // 搭档列表
    char_json = null;                               // 搭档文件
    element = document.createElement("div");        // 外侧组件
    special_func_show = null;                       // 存在特殊的处理函数 展示模式(type, msg)
    ele_arr = [];                                   // 需要改变的组件
    char_idn = "";                                  // 搭档idn
    char_dif = "";                                  // 搭档难度
    constructor(width, height, parent, char_id, type){
        // width,height只能设置一个，另外一个填-1，根据比例自动调整大小
        this.width = width;             // 宽度
        this.height = height;           // 高度
        this.parent = parent;           // 父组件
        this.char_id = char_id;         // 使用的搭档id
        this.type = type;               // PLAY SHOW  游玩模式 展示模式
    }
    setPosition(left, top, right, bottom){
        // 设置位置
        if(left!=-1) this.element.style.left = left + "px";
        if(top!=-1) this.element.style.top = top + "px";
        if(right!=-1) this.element.style.right = right + "px";
        if(bottom!=-1) this.element.style.bottom = bottom + "px";
    }
    setZIndex(z_index){
        // 设置z-index
    }
    setCharList(char_list_json){
        // 设置搭档文件
        this.char_list_json = char_list_json;
        // 查询搭档 设置配置信息
        for(let i=0;i<this.char_list_json["char"].length;i++){
            if(this.char_list_json["char"][i]["idx"]==this.char_id){
                this.char_idn = this.char_list_json["char"][i]["idn"];
                this.char_dif = this.char_list_json["char"][i]["dif"];
                break;
            }
        }
    }
    setCharJson(char_json){
        // 设置此搭档的json
        this.char_json = char_json;
        this.char_idn = char_json.idn;
        this.char_dif = char_json.dif;
    }
    elementInit(){
        this.parent.appendChild(this.element);
        this.element.setAttribute("class", "hp_element");
        // 先根据base
        let this_ = this;
        HP_CONFIG.base.change.forEach(function(item){
            if(item!="ratio"){
                let ele = document.createElement("div");
                ele.setAttribute("class", "base_" + item);
                ele.style.backgroundImage = "url('" + HP_CONFIG.base[item] + "')";
                this_.element.appendChild(ele);
                this_.ele_arr.push([item, ele]);
            }else{
                if(this_.width==-1){
                    this_.element.style.height = this_.height.toString() + "px";
                    this_.element.style.width = (this_.height * HP_CONFIG.base[item]).toString() + "px";
                }else{
                    this_.element.style.width = this_.width.toString() + "px";
                    this_.element.style.height = (this_.width / HP_CONFIG.base[item]).toString() + "px";
                }
            }
        });
        // console.log(this.ele_arr);
        // 根据难度 此时一定会有change
        let dif_to_hp = ["easy", "base", "hard"];
        if(this.char_dif!=1){
            HP_CONFIG[dif_to_hp[this.char_dif]].change.forEach(function(item){
                if(item!="ratio"){
                    this_.ele_arr = this_.ele_arr.filter(function(item_){
                        if(item_[0] == item) this_.element.removeChild(item_[1]);
                        return item_[0] != item;
                    });
                    // console.log(this_.ele_arr);
                    let ele = document.createElement("div");
                    ele.setAttribute("class", dif_to_hp[this_.char_dif] + "_" + item);
                    ele.style.backgroundImage = "url('" + HP_CONFIG[dif_to_hp[this_.char_dif]][item] + "')";
                    this_.element.appendChild(ele);
                    this_.ele_arr.push([item, ele]);
                }else{
                    if(this_.width==-1){
                        this_.element.style.height = this_.height.toString() + "px";
                        this_.element.style.width = (this_.height * HP_CONFIG[dif_to_hp[this_.char_dif]][item]).toString() + "px";
                    }else{
                        this_.element.style.width = this_.width.toString() + "px";
                        this_.element.style.height = (this_.width / HP_CONFIG[dif_to_hp[this_.char_dif]][item]).toString() + "px";
                    }
                }
            });
        }
        // console.log(this.ele_arr);
        // 根据特殊的角色
        if(CHAR_TO_HP[this.char_idn]!=null){
            let char_hp = CHAR_TO_HP[this.char_idn];
            // 存在特殊处理函数
            // if(HP_CONFIG[char_hp].special_func_show != null) this.special_func_show = HP_CONFIG[char_hp].special_func_show;
            // 存在特殊的样式
            if(HP_CONFIG[char_hp].change_style!=null){
                HP_CONFIG[char_hp].change_style.forEach(function(item){
                    this_.ele_arr.forEach(function(item_){
                        if(item_[0]==item) item_[1].setAttribute("class", char_hp + "_" + item);
                    });
                });
            }
            // 存在改变的组件
            if(HP_CONFIG[char_hp].change!=null){
                HP_CONFIG[char_hp].change.forEach(function(item){
                    if(item!="ratio"){
                        this_.ele_arr.forEach(function(item_){
                            if(item_[0]==item){
                                item_[1].style.backgroundImage = "url('" + HP_CONFIG[char_hp][item] + "')";
                                item_[1].setAttribute("class", char_hp + "_" + item);
                            }
                        });
                    }else{
                        if(this_.width==-1){
                            this_.element.style.height = this_.height.toString() + "px";
                            this_.element.style.width = (this_.height * HP_CONFIG[char_hp][item]).toString() + "px";
                        }else{
                            this_.element.style.width = this_.width.toString() + "px";
                            this_.element.style.height = (this_.width / HP_CONFIG[char_hp][item]).toString() + "px";
                        }
                    }
                });
            }
            // 存在删除的组件
            if(HP_CONFIG[char_hp].delete!=null){
                HP_CONFIG[char_hp].delete.forEach(function(item){
                    this_.ele_arr = this_.ele_arr.filter(function(item_){
                        if(item_[0]==item) this_.element.removeChild(item_[1]);
                        return item_[0] != item;
                    });
                });
            }
            // 存在增加的组件
            if(HP_CONFIG[char_hp].add!=null){
                HP_CONFIG[char_hp].add.forEach(function(item){
                    let ele = document.createElement("div");
                    ele.setAttribute("class", char_hp + "_" + item);
                    ele.style.backgroundImage = "url('" + HP_CONFIG[char_hp][item] + "')";
                    this_.ele_arr.push([item, ele]);
                    this_.element.appendChild(ele);
                });
            }
        }
        // console.log(this.ele_arr);
        // hp文字
        let ele = document.createElement("div");
        ele.setAttribute("class", "hp_text");
        this.element.appendChild(ele);
        this.ele_arr.push(["hp_text", ele]);
        // 确定类型
        if(this.type=="show"){
            this.ele_arr.forEach(function(item){
                if(item[0].indexOf("hp_bar")!=-1&&item[0].indexOf("clear")==-1) item[1].style.display = "none";
            });
        }else{
            this.ele_arr.forEach(function(item){
                if(item[0].indexOf("clear")!=-1) item[1].style.display = "none";
            });
        }
    }
}
class HP extends HPElement{
    // 血条类
    base_type = ["EASY", "NORMAL", "HARD"];
    constructor(width, height, parent, char_id, type){
        super(width, height, parent, char_id, type);
    }
    isLost(){
        // 是否已经失败 游玩模式专属
    }
    lostElement(){
        // 漏点击了一个物块 游玩模式专属
    }
    addElement(){
        // 点击了一个物块 游玩模式专属
    }
    elementAmountInit(amount){
        // 物块总量 游玩模式专属
    }
    hpPlayingInit(){
        // 游玩模式下 血条初始化
        this.ele_arr.forEach(function(item){
            if(item[0]=="hp_bar"){
                item[1].style.height = "0%";
            }
            if(item[0]=="hp_text"){
                item[1].style.bottom = "7%";
                item[1].style.left = "0%";
                item[1].innerHTML = 0;
                item[1].setAttribute("data-text", 0);
            }
        });
    }
    setPercentage(percentage){
        // 设置展示的百分比0-100 展示模式专属
        let hp_ = percentage;
        let hp = (94 - 0) / 100 * hp_ + 0;
        let hp_text = hp_ < 7 ? 7 : (94 - 7) / 93 * (hp_ - 7) + 7; // 7<hp
        hp_text += "%";
        hp += "%";
        this.ele_arr.forEach(function(item){
            if(item[0]=="hp_bar"){
                item[1].style.height = hp;
            }
            if(item[0]=="hp_bar_clear"){
                item[1].style.height = hp;
            }
            if(item[0]=="hp_text"){
                item[1].style.bottom = hp_text;
                item[1].innerHTML = hp_;
                item[1].setAttribute("data-text", hp_);
            }
        });
    }
    setHpLessFunc(hp, func){
        // 设置困难模式下血量小于等于hp时触发的函数 小于时传入true 大于时传入false 每次跨越调用 游玩模式专属
    }
}
class FatalisHp extends HP{
    // 创世光的特殊血条
    constructor(width, height, parent, char_id, type){
        super(width, height, parent, char_id, type);
    }
    setPercentage(percentage){
        let hp_ = percentage[0];
        let missing_ = percentage[1];
        let hp = (94 - 0) / 100 * hp_ + 0;
        let hp_text = hp_ < 7 ? 7 : (94 - 7) / 93 * (hp_ - 7) + 7; // 7<hp
        let missing = (69 - 0) / 100 * missing_ + 0;
        let outline = (72 - 3) / 100 * missing_ + 3;
        outline += "%";
        missing += "%";
        hp_text += "%";
        hp += "%";
        this.ele_arr.forEach(function(item){
            if(item[0]=="hp_bar"){
                item[1].style.height = hp;
            }
            if(item[0]=="missing"){
                item[1].style.height = missing;
            }
            if(item[0]=="outline"){
                item[1].style.bottom = outline;
            }
            if(item[0]=="hp_text"){
                item[1].style.bottom = hp_text;
                item[1].style.left = "0%";
                item[1].innerHTML = hp_;
                item[1].setAttribute("data-text", hp_);
            }
        });
    }
    hpPlayingInit(){
        // 游玩模式下 血条初始化
        this.ele_arr.forEach(function(item){
            if(item[0]=="hp_bar"){
                item[1].style.height = "94%";
            }
            if(item[0]=="missing"){
                item[1].style.height = "0%";
            }
            if(item[0]=="outline"){
                item[1].style.bottom = "3%";
            }
            if(item[0]=="hp_text"){
                item[1].style.bottom = "94%";
                item[1].style.left = "0%";
                item[1].innerHTML = 100;
                item[1].setAttribute("data-text", 100);
            }
        });
    }
}
// 特殊搭档对应的不同的类
var CHARID_TO_HPCLASS = {
    "char":[
        {
            "idn":"55",
            "class":"FatalisHp"
        }
    ]
};
// 特殊角色对应特殊血条
var CHAR_TO_HP = {
    "hikarifatalis":"fatalis",
};
// 血条配置
var HP_CONFIG = {
    "base":{
        // ratio = w / h
        // ele hp_base hp_glow hp_bar hp_grid text
        "change":["ratio", "hp_base", "hp_grid", "hp_glow", "hp_bar", "hp_bar_clear"],
        "ratio":0.135,
        "hp_base":"../resources/layouts/ingame/hp_base.png",
        "hp_grid":"../resources/layouts/ingame/hp_grid.png",
        "hp_glow":"../resources/layouts/ingame/hp_glow.png",
        "hp_bar":"../resources/layouts/ingame/hp_bar.png",
        "hp_bar_clear":"../resources/layouts/ingame/hp_bar_clear.png"
    },
    "easy":{
        "change":["hp_bar", "hp_bar_clear"],
        "hp_bar":"../resources/img/hp_bar_easy.png",
        "hp_bar_clear":"../resources/img/hp_bar_easy_clear.png"
    },
    "hard":{
        "change":["hp_bar", "hp_bar_clear"],
        "hp_bar":"../resources/img/hp_bar_hard.png",
        "hp_bar_clear":"../resources/img/hp_bar_hard.png"
    },
    "fatalis":{
        // ele hp_base hp_bar overlay hp_grid missing outline petals text 组件z-index顺序
        "special_func_show":"fatalisShow",
        "change_style":["hp_base"],
        "change":["ratio", "hp_grid", "hp_bar"],
        "delete":["hp_bar_clear", "hp_glow"],
        "add":["outline", "petals", "overlay", "missing"],
        "ratio":0.156,
        "hp_grid":"../resources/img/hp_bar_fatalis_grid.png",
        "hp_bar":"../resources/img/hp_bar_tempest_up.png",
        "outline":"../resources/img/hp_bar_fatalis_bottom_outline.png",
        "petals":"../resources/img/hp_bar_fatalis_petals.png",
        "overlay":"../resources/img/hp_bar_fatalis_overlay.png",
        "missing":"../resources/img/hp_bar_fatalis_missing.png"
    }
};