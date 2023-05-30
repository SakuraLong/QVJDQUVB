class Element{
    // 组件父类
    frpm = 0;
    clr = 0;
    all = 0;
    name = "";
    class = "";
    constructor(id, type, parent_id){
        this.element_id= id;
        this.parent_id= parent_id;
        this.element = document.createElement(type);
        this.element.setAttribute("id", this.element_id);
        document.getElementById(this.parent_id).appendChild(this.element);
        this.language = "en";
    }
    setLanguage(language){
        this.language = language;
    }
    idIs(){
        return this.element_id;
    }
    setAll(num){
        this.all = num;
    }
    setClr(num){
        this.clr = num;
    }
    setFrpm(num){
        this.frpm = num;
    }
    remove(){
        // 在曲包界面去选歌界面对曲包调用 反之亦然
        this.element.style.display = "none";
        this.element.innerHTML = "";
        document.getElementById(this.parent_id).removeChild(this.element);
    }
}
class SelectPageBg{
    is_first = true;  // true bg_ele显示
    type = "";
    constructor(bg_ele, bgs_ele, bg_ele_){
        this.bg_ele = bg_ele;
        this.bgs_ele = bgs_ele;
        this.bg_ele_ = bg_ele_;
    }
    bgTo(type){
        // console.log(type);
        if(type==this.type) return;
        else this.type = type;
        switch(type){
            case "bg_light":
                if(this.is_first){
                    this.is_first = false;
                    this.bg_ele.style.animationName = "page_bg_leave";
                    this.bg_ele_.style.backgroundImage = "url('../resources/img/bg_light.jpg')";
                    this.bg_ele_.style.animationName = "page_bg_enter";
                }else{
                    this.is_first = true;
                    this.bg_ele_.style.animationName = "page_bg_leave";
                    this.bg_ele.style.backgroundImage = "url('../resources/img/bg_light.jpg')";
                    this.bg_ele.style.animationName = "page_bg_enter";
                }
                this.bgs_ele.style.backgroundImage = "url('../resources/img/bg_glow_light.png')";
                break;
            case "bg_dark":
                if(this.is_first){
                    this.is_first = false;
                    this.bg_ele.style.animationName = "page_bg_leave";
                    this.bg_ele_.style.backgroundImage = "url('../resources/img/bg_dark.jpg')";
                    this.bg_ele_.style.animationName = "page_bg_enter";
                }else{
                    this.is_first = true;
                    this.bg_ele_.style.animationName = "page_bg_leave";
                    this.bg_ele.style.backgroundImage = "url('../resources/img/bg_dark.jpg')";
                    this.bg_ele.style.animationName = "page_bg_enter";
                }
                this.bgs_ele.style.backgroundImage = "url('../resources/img/bg_glow_dark.png')";
                break;
            case "bg_colorless":
                if(this.is_first){
                    this.is_first = false;
                    this.bg_ele.style.animationName = "page_bg_leave";
                    this.bg_ele_.style.backgroundImage = "url('../resources/img/bg_colorless.jpg')";
                    this.bg_ele_.style.animationName = "page_bg_enter";
                }else{
                    this.is_first = true;
                    this.bg_ele_.style.animationName = "page_bg_leave";
                    this.bg_ele.style.backgroundImage = "url('../resources/img/bg_colorless.jpg')";
                    this.bg_ele.style.animationName = "page_bg_enter";
                }
                this.bgs_ele.style.backgroundImage = "url('../resources/img/bg_glow_colorless.png')";
                break;
            case "bg_byd_light":
                if(this.is_first){
                    this.is_first = false;
                    this.bg_ele.style.animationName = "page_bg_leave";
                    this.bg_ele_.style.backgroundImage = "url('../resources/img/bg_byd_light.jpg')";
                    this.bg_ele_.style.animationName = "page_bg_enter";
                }else{
                    this.is_first = true;
                    this.bg_ele_.style.animationName = "page_bg_leave";
                    this.bg_ele.style.backgroundImage = "url('../resources/img/bg_byd_light.jpg')";
                    this.bg_ele.style.animationName = "page_bg_enter";
                }
                this.bgs_ele.style.backgroundImage = "url('../resources/img/bg_glow_byd_light.png')";
                break;
            case "bg_byd_dark":
                if(this.is_first){
                    this.is_first = false;
                    this.bg_ele.style.animationName = "page_bg_leave";
                    this.bg_ele_.style.backgroundImage = "url('../resources/img/bg_byd_dark.jpg')";
                    this.bg_ele_.style.animationName = "page_bg_enter";
                }else{
                    this.is_first = true;
                    this.bg_ele_.style.animationName = "page_bg_leave";
                    this.bg_ele.style.backgroundImage = "url('../resources/img/bg_byd_dark.jpg')";
                    this.bg_ele.style.animationName = "page_bg_enter";
                }
                this.bgs_ele.style.backgroundImage = "url('../resources/img/bg_glow_byd_dark.png')";
                break;
            case "bg_single_light":
                if(this.is_first){
                    this.is_first = false;
                    this.bg_ele.style.animationName = "page_bg_leave";
                    this.bg_ele_.style.backgroundImage = "url('../resources/img/bg_single_light.jpg')";
                    this.bg_ele_.style.animationName = "page_bg_enter";
                }else{
                    this.is_first = true;
                    this.bg_ele_.style.animationName = "page_bg_leave";
                    this.bg_ele.style.backgroundImage = "url('../resources/img/bg_single_light.jpg')";
                    this.bg_ele.style.animationName = "page_bg_enter";
                }
                this.bgs_ele.style.backgroundImage = "url('../resources/img/bg_glow_light.png')";
                break;
            case "bg_single_dark":
                if(this.is_first){
                    this.is_first = false;
                    this.bg_ele.style.animationName = "page_bg_leave";
                    this.bg_ele_.style.backgroundImage = "url('../resources/img/bg_single_dark.jpg')";
                    this.bg_ele_.style.animationName = "page_bg_enter";
                }else{
                    this.is_first = true;
                    this.bg_ele_.style.animationName = "page_bg_leave";
                    this.bg_ele.style.backgroundImage = "url('../resources/img/bg_single_dark.jpg')";
                    this.bg_ele.style.animationName = "page_bg_enter";
                }
                this.bgs_ele.style.backgroundImage = "url('../resources/img/bg_glow_dark.png')";
                break;
        }
    }
}
class PackShower extends Element{
    // 整个曲包界面的组件
    archive_img_array = [["../resources/layouts/songselect/folder_singles.png", "../resources/layouts/songselect/folder_singles_selected.png"]];
    pack_group_array = [["free", 1], ["story", 5], ["side", 7], ["coll", 8]];
    pack_element_array = [];  // pack的组件
    favorites = null;
    archive_0 = null;
    archive_1 = null;
    my_scroll_HD = null;
    pack_json = null;
    constructor(id, type, parent_id, dif){
        super(id, type, parent_id);
        this.dif = dif;
    }
    packShowerInit(pack_json){
        // 创建组件
        this.element.innerHTML = "";
        this.scrollInit();
        this.pack_json = pack_json;
        this.favorites = new Favorites("favorites", "div", this.element_id);
        this.favorites.setLanguage(this.language);
        this.favorites.elementInit();  // favorites 组件
        let line = new Line("dividerF", "img", this.element_id, 0);
        line.elementInit();
        this.archive_0 = new Archive("archive_0", "div", this.element_id, 0);
        this.archive_0.elementInit();
        this.archive_1 = new Archive("archive_1", "div", this.element_id, 1);
        this.archive_1.elementInit();
        let free_line = new Line("freeimg", "img", this.element_id, 1);
        free_line.elementInit();
        let story_line = new Line("storyimg", "img", this.element_id, 2);
        story_line.elementInit();
        let side_line = new Line("sideimg", "img", this.element_id, 3);
        side_line.elementInit();
        let coll_line = new Line("collimg", "img", this.element_id, 4);
        coll_line.elementInit();
        this.packCellInit(pack_json);
    }
    packCellInit(pack_json){
        // console.log(pack_json);
        let now_index = 3;
        let now_amount = 0;
        for(let i=pack_json["packs"].length-1;i>=0;i--){
            this.pack_element_array[pack_json["packs"].length-1-i] = 
            new PackCell(
                "packdiv"+(pack_json["packs"].length-1-i).toString(),
                "div",
                this.element_id,
                i,
                pack_json["packs"][i],
                this.dif
            );
            this.pack_element_array[pack_json["packs"].length-1-i].insertAfter(document.getElementById(this.pack_group_array[now_index][0]+"img"));
            now_amount++;
            if(now_amount>this.pack_group_array[now_index][1]){
                now_amount=0;
                now_index--;
            }
            this.pack_element_array[pack_json["packs"].length-1-i].elementInit();
            this.pack_element_array[pack_json["packs"].length-1-i].setScroll(this.my_scroll_HD);
        }
    }
    scrollInit(){
        this.my_scroll_HD = new Scroll(document.getElementById(this.parent_id), 1);
    }
    scrollToElement(pack_id, index_){
        let pos = 0;
        let width = 0;
        if(pack_id=="favorites"){
            pos = this.getElementLeft(this.favorites.element);
            width = this.favorites.element.clientWidth;
        }else if(pack_id=="archive_0"){
            pos = this.getElementLeft(this.archive_0.element);
            width = this.archive_0.element.clientWidth;
        }else if(pack_id=="archive_1"){
            pos = this.getElementLeft(this.archive_1.element);
            width = this.archive_1.element.clientWidth;
        }else{
            let index = 0;
            for(let i=0;i<this.pack_json["packs"].length;i++){
                if(pack_id==this.pack_json["packs"][i]["id"]){
                    index = i;
                    break;
                }
            }
            pos = this.getElementLeft(this.pack_element_array[this.pack_element_array.length-index-1].element);
            width = this.pack_element_array[this.pack_element_array.length-index-1].element.clientWidth;
        }
        let translateX =  this.getCenterPosition(pos, width);
        this.my_scroll_HD.moveTo(translateX, false);
        // console.log("translateX="+translateX);
    }
    getElementLeft(element){
        let el = element;
        return el.offsetLeft - el.parentNode.offsetLeft;
    }
    getCenterPosition(left, width){
        let win_width = document.body.clientWidth;
        return win_width/2 - width/2 - left;
    }
}
class PackCell extends Element{
    ignore_top_shadow = [0, 8, 11, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    pack_scroll = null;
    constructor(id, type, parent_id, index, pack_data, dif){
        super(id, type, parent_id);
        document.getElementById(this.parent_id).removeChild(this.element);  // 移除，不按照原有方法插入
        this.index = index;
        this.pack_data = pack_data;
        this.dif = dif;
        // console.log(index);
        // console.log(pack_data);
        this.setClickFunc();
        this.dataInit();
    }
    setScroll(pack_scroll){
        this.pack_scroll = pack_scroll;
    }
    setClickFunc(){
        let this_ = this;
        this.element.addEventListener('click', (function(this_){
            return function(){
                if(this_.pack_scroll.isAllowClick()){
                    // console.log("点击");
                    this_.pack_scroll.delete();  // 删除滚动监听
                    // let pack_to_song = new PackToSong("Pack", this_.index);
                    let audio_0 = new ClickAudio("../resources/audio/item_click.wav");
                    let audio_1 = new ClickAudio("../resources/audio/menu_in.wav", 0.9);
                    packToSong("Pack", this_.index);  // 此函数在selectPageBase.js
                }
            }
        })(this_));
    }
    dataInit(){
        let saveJson = new SaveJson(0);
        saveJson = saveJson.get("packdata");
        this.setAll(saveJson[this.pack_data["id"]]["dif"][this.dif]["all"]);
        this.setClr(saveJson[this.pack_data["id"]]["dif"][this.dif]["clr"]);
        this.setFrpm(saveJson[this.pack_data["id"]]["dif"][this.dif]["frpm"]);
        // this.setAll(99);
        // this.setClr(99);
        // this.setFrpm(99);
    }
    insertAfter(targetElement){
        var parent = targetElement.parentNode;
        if(parent.lastChild == targetElement){
            parent.appendChild(this.element);
        }else{
            parent.insertBefore(this.element,targetElement.nextSibling);
        }
    }
    elementInit(){
        this.element.setAttribute("class", "packdiv");
        /* 曲包图片 */
        let packimg = document.createElement("div");
        packimg.setAttribute("class", "packimg");
        let pimgpath = "url('../resources/songs/pack/select_" + this.pack_data["id"] + ".png')";
        packimg.style.backgroundImage = pimgpath;
        this.element.appendChild(packimg);
        /* 曲包顶部div */
        let packtop = document.createElement("div");
        packtop.setAttribute("class", "packtop");
        this.element.appendChild(packtop);
        /* 曲包顶部div阴影 */
        let packtops = document.createElement("div");
        packtops.setAttribute("class", "packtops");
        let packtopspath = "url('../resources/layouts/songselect/pack_top.png')";
        packtops.style.backgroundImage = packtopspath;
        packtop.appendChild(packtops);
        /* 曲包顶部div文字 曲包名字 */
        let packtopt = document.createElement("div");
        packtopt.setAttribute("class", "packtopt");
        packtopt.innerHTML = this.pack_data["name_localized"]["en"];
        packtop.appendChild(packtopt);
        /* 曲包顶部div文字 FR/PM */
        let packtopFP = document.createElement("div");
        packtopFP.setAttribute("class", "packtopFP packtopstext");
        packtopFP.innerHTML = "FR/PM";
        packtopFP.setAttribute("data-text", "FR/PM");
        packtop.appendChild(packtopFP);
        /* 曲包顶部div文字 CLR */
        let packtopCLR = document.createElement("div");
        packtopCLR.setAttribute("class", "packtopCLR packtopstext");
        packtopCLR.innerHTML = "CLR";
        packtopCLR.setAttribute("data-text", "CLR");
        packtop.appendChild(packtopCLR);
        /* 曲包顶部div文字 ALL */
        let packtopALL = document.createElement("div");
        packtopALL.setAttribute("class", "packtopALL packtopstext");
        packtopALL.innerHTML = "ALL";
        packtopALL.setAttribute("data-text", "ALL");
        packtop.appendChild(packtopALL);
        /* 曲包顶部div文字 FR/PM 数量 */
        let packtopFPA = document.createElement("div");
        packtopFPA.setAttribute("class", "packtopFP packtopatext");
        packtopFPA.innerHTML = this.frpm;
        packtopFPA.setAttribute("data-text", this.frpm);
        packtop.appendChild(packtopFPA);
        /* 曲包顶部div文字 CLR 数量 */
        let packtopCLRA = document.createElement("div");
        packtopCLRA.setAttribute("class", "packtopCLR packtopatext");
        packtopCLRA.innerHTML = this.clr;
        packtopCLRA.setAttribute("data-text", this.clr);
        packtop.appendChild(packtopCLRA);
        /* 曲包顶部div文字 ALL 数量 */
        let packtopALLA = document.createElement("div");
        packtopALLA.setAttribute("class", "packtopALL packtopatext");
        packtopALLA.innerHTML = this.all;
        packtopALLA.setAttribute("data-text", this.all);
        packtop.appendChild(packtopALLA);


        if(this.ignore_top_shadow.indexOf(this.index)!=-1){
            packtops.style.display="none";
            packtopt.style.display="none";
        }
        if(this.all==0){
            packtopALLA.style.color = "rgb(211, 211, 211)";
            packtopCLRA.style.color = "rgb(211, 211, 211)";
            packtopFPA.style.color = "rgb(211, 211, 211)";
        }
        if(this.clr==this.all&&this.all!=0){
            packtopALLA.style.color = "rgb(255, 230, 0)";
            packtopCLRA.style.color = "rgb(255, 230, 0)";
        }
        if(this.frpm==this.all&&this.all!=0){
            packtopALLA.style.color = "rgb(0, 225, 255)";
            packtopCLRA.style.color = "rgb(0, 225, 255)";
            packtopFPA.style.color = "rgb(0, 225, 255)";
        }
    }
}
class Favorites extends Element{
    constructor(id, type, parent_id){
        super(id, type, parent_id);
        this.favorites_type = this.setFavoritesType();  // 0 1 2 3 4 5 6
        this.setClickFunc();
    }
    setFavoritesType(){
        // 本地数据库
        let bg = window.localStorage.getItem("menubg");
        return bg;
    }
    elementInit(){
        let favoritesimg = document.createElement("img");  // 背景图片
        let favoritesimgp = document.createElement("img");  // 按压
        let favoritestitle = document.createElement("img");  // 文字图片
        let favoritessong = document.createElement("div");  // 歌曲数量
        favoritesimg.setAttribute("src", "../resources/img/favorite/folder_"+this.favorites_type.toString()+".png");
        favoritesimgp.setAttribute("src", "../resources/img/favorite/folder_pressed.png");
        favoritestitle.setAttribute("src", "../resources/img/favorite/title.png");
        favoritesimg.setAttribute("id", "favoritesimg");
        favoritesimgp.setAttribute("id", "favoritesimgp");
        favoritestitle.setAttribute("id", "favoritestitle");
        favoritessong.setAttribute("id", "favoritessong");
        favoritesimg.setAttribute("draggable", "false");
        favoritesimgp.setAttribute("draggable", "false");
        favoritestitle.setAttribute("draggable", "false");
        favoritessong.setAttribute("class", "favoritessong_" + this.favorites_type.toString());
        if(this.language=="en"){
            favoritessong.innerHTML = this.all + " Songs Favorited";
            favoritessong.setAttribute("data-text", this.all + " Songs Favorited");
        }else if(this.language=="zh-Hans"){
            favoritessong.innerHTML = "已收藏" + this.all + "首歌曲";
            favoritessong.setAttribute("data-text", "已收藏" + this.all + "首歌曲");
        }
        this.element.appendChild(favoritesimg);
        this.element.appendChild(favoritesimgp);
        this.element.appendChild(favoritestitle);
        this.element.appendChild(favoritessong);
    }
    setClickFunc(){
        this.element.addEventListener('click', function(){
            // console.log("点击");
            let pack_to_song = new PackToSong("Favorites", 0);
        });
    }
}
class Line extends Element{
    constructor(id, type, parent_id, line_type){
        super(id, type, parent_id);
        this.line_type = line_type;  // 0 1 2 3 4 5 6
    }
    elementInit(){
        this.element.setAttribute("draggable", "false");
        switch(this.line_type){
            case 0:this.element.setAttribute("src", "../resources/img/favorite/divider.png");break;
            case 1:this.element.setAttribute("src", "../resources/img/divider_free.png");break;
            case 2:this.element.setAttribute("src", "../resources/img/divider_story.png");break;
            case 3:this.element.setAttribute("src", "../resources/img/divider_sidestory.png");break;
            case 4:this.element.setAttribute("src", "../resources/img/divider_collab.png");break;
        }
    }
}
class Archive extends Element{
    constructor(id, type, parent_id, index){
        super(id, type, parent_id);
        this.index = index;
        this.setClickFunc();
    }
    setClickFunc(){
        let this_ = this;
        this.element.addEventListener('click', (function(this_){
            return function(){
                // console.log("点击");
                let pack_to_song = new PackToSong("Archive", this_.index);
            }
        })(this_));
    }
    elementInit(){
        let archiveimg = document.createElement("img");
        let archiveselectimg = document.createElement("img");
        archiveimg.setAttribute("id", "archiveimg_" + this.index.toString());
        archiveselectimg.setAttribute("id", "archiveselectimg_" + this.index.toString());
        if(this.index==0){
            archiveimg.setAttribute("src", "../resources/layouts/songselect/folder_singles.png");
            archiveselectimg.setAttribute("src", "../resources/layouts/songselect/folder_singles_selected.png");
        }else if(this.index==1){
            archiveimg.setAttribute("src", "../resources/layouts/songselect/folder_singles.png");
            archiveselectimg.setAttribute("src", "../resources/layouts/songselect/folder_singles_selected.png");
        }
        archiveimg.setAttribute("draggable", "false");
        archiveselectimg.setAttribute("draggable", "false");
        this.element.appendChild(archiveimg);
        this.element.appendChild(archiveselectimg);
    }
}
class ChooseSAC extends Element{
    // 选择 排序和分组的方法
    sort_method_array = {
        "en":["title", "difficulty", "date", "grade", "clear"],
        "zh-Hans":["标题", "难度", "日期", "评级", "通关状态"]
    };
    classify_method_array = {
        "en":["none", "versions", "level", "grade"],
        "zh-Hans":["无", "游戏版本", "等级", "评级"]
    };
    sort_label = document.createElement("div");
    classify_label = document.createElement("div");
    constructor(id, type, parent_id, sort_method, classify_method, language, song_shower){
        super(id, type, parent_id);
        this.sort_method = sort_method;
        this.classify_method = classify_method;
        this.language = language;
        this.song_shower = song_shower;
        this.elementInit();
    }
    elementInit(){
        this.sort_label.setAttribute("class", "sort_label");
        this.classify_label.setAttribute("class", "classify_label");
        this.element.appendChild(this.sort_label);
        this.element.appendChild(this.classify_label);
        let this_ = this;
        this.sort_label.addEventListener('click', (function(this_){
            return function(){
                this_.clickSortLabel();
            }
        })(this_));
        this.classify_label.addEventListener('click', (function(this_){
            return function(){
                this_.clickClassifyLabel();
            }
        })(this_));
        this.update();
    }
    update(){
        // console.log(this.language);
        this.sort_label.innerHTML = this.sort_method_array[this.language][this.sort_method];
        this.sort_label.setAttribute("data-text", this.sort_label.innerHTML);
        this.classify_label.innerHTML = this.classify_method_array[this.language][this.classify_method];
        this.classify_label.setAttribute("data-text", this.classify_label.innerHTML);
    }
    clickSortLabel(){
        let audio_0 = new ClickAudio("../resources/audio/item_click.wav");
        this.sort_method++;
        this.sort_method = this.sort_method >= this.sort_method_array["en"].length ? 0 : this.sort_method;
        this.update();
        // let sj = new SaveJson(0);
        // let msg = sj.get("packstate");
        // msg["sort_method"] = this.sort_method;
        // sj.put("packstate", msg);
        // 此时不更新packstate 此处在进入界面的时候更新
        base_page_data.now_sort_method = this.sort_method;
        songListUpdate();  // 此函数在selectPageBase
    }
    clickClassifyLabel(){
        let audio_0 = new ClickAudio("../resources/audio/item_click.wav");
        this.classify_method++;
        this.classify_method = this.classify_method >= this.classify_method_array["en"].length ? 0 : this.classify_method;
        this.update();
        // let sj = new SaveJson(0);
        // let msg = sj.get("packstate");
        // msg["classify_method"] = this.classify_method;
        // sj.put("packstate", msg);
        // 此时不更新packstate 此处在进入界面的时候更新
        base_page_data.now_classify_method = this.classify_method;
        songListUpdate();  // 此函数在selectPageBase
    }
}
class SongShower extends Element{
    song_previewer = null;
    /* 初始状态下全部都是隐藏的 去本地数据库判断是否有记录 */
    /* 歌曲排序存在潜在分组 这首歌玩过 > 可以玩但没玩过 > 不可以玩 */
    dif = 0;
    song_json_file = {};  // 歌曲songlist.json文件
    song_list = [];  // 直接拿到的
    song_list_after = {};  // 处理之后的
    song_element_array = [];  // 存放所有的歌曲cell
    group_element_array = [];  // 存放所有的组别选择器
    element_all_height = [];  // 高度 [type, index, group, height, all_height] 类型:song/group;all_height 之前的所有组件的高度（不包括本组件）
    my_scroll_VD = null;  // 滑动类
    now_selected_song = 0;
    classify_method = 0;  // 分组方法 0 none;1 version;2 level;3 grade
    classify_method_array = ["none", "versions", "level", "grade"];
    // classify_method_array = ["none", "versions", "versions", "versions"];  // 测试
    sort_method = 0;  // 排序方法 0 title;1 difficulty;2 date;3 grade;4 clear
    sort_method_array = ["title", "difficulty", "date", "grade", "clear"];
    // sort_method_array = ["title", "difficulty", "date", "date", "difficulty"];  // 测试
    song_to_play = new SongToPlay();
    selected_song_shower = new SelectedSongShower(this);
    now_position = 0;  // 当前移动到的位置，初始化需要
    constructor(id, type, parent_id, song_list, song_json_file){
        super(id, type, parent_id);
        this.song_list = song_list;
        this.song_json_file = song_json_file;
        this.song_to_play.setSongJsonFile(this.song_json_file);
        this.scrollInit();
    }
    remove(){
        // 重写父类方法
        this.element.style.display = "none";
        this.element.innerHTML = "";
        document.getElementById(this.parent_id).removeChild(this.element);
        // 在每一次离开的时候保存y
        let sj = new SaveJson(0);
        let msg = sj.get("packstate");
        msg["song_list_y"] = this.now_position;
        sj.put("packstate", msg);  // 在此处保存为了减少保存次数
    }
    setHeightArray(type, index, height){
        // 设置高度数组
        if(this.element_all_height.length!=0){
            this.element_all_height[this.element_all_height.length] = [type, index, height, this.element_all_height[this.element_all_height.length-1][2] + this.element_all_height[this.element_all_height.length-1][3]];
        }else{
            this.element_all_height[this.element_all_height.length] = [type, index, height, 0];
        }
    }
    scrollInit(){
        let this_ = this;
        this.my_scroll_VD = new Scroll(document.getElementById(this.parent_id), 0);
        this.my_scroll_VD.isSongList(true, this, this.scrolling);
    }
    songShowerRemove(){
        // console.log("删除");
        this.my_scroll_VD.delete();
        this.element.style.display = "none";
        this.element.innerHTML = "";
        document.getElementById(this.parent_id).removeChild(this.element);
    }
    clearElement(){
        // 清空组件
        this.element.innerHTML = "";
    }
    selectSongByIdx(song_idx){
        let is_selected = false
        for(let i=0;i<this.song_element_array.length;i++){
            if(this.song_element_array[i].getIdx()==song_idx){
                this.song_element_array[i].songCellClick("init");
                is_selected = true;
                break;
            }
        }
        if(!is_selected){
            // 没有选择到歌曲
            this.song_element_array[0].songCellClick("init");
        }
    }
    scrollToNowPos(){
        // 位置校准
        this.my_scroll_VD.moveTo(this.now_position, false);
    }
    scrollToBySongId(song_id){
        let index = 0;
        for(let i=0;i<this.song_element_array.length;i++){
            if(this.song_element_array[i].getIdx() == song_id){
                index = i;
                break;
            }
        }
        let top = this.getElementTop(this.song_element_array[index].element);
        let cen = this.getCenterPosition(top, this.song_element_array[index].element.clientHeight);
        // console.log(cen);
        this.my_scroll_VD.moveTo(cen, false);
    }
    scrollToBySongIdMove(song_id){
        let index = 0;
        for(let i=0;i<this.song_element_array.length;i++){
            if(this.song_element_array[i].getIdx() == song_id){
                index = i;
                break;
            }
        }
        let top = this.getElementTop(this.song_element_array[index].element);
        let cen = this.getCenterPosition(top, this.song_element_array[index].element.clientHeight);
        // console.log(cen);
        this.my_scroll_VD.moveTo(cen, true);
    }
    scrollToByPos(y){
        this.my_scroll_VD.moveTo(y, false);
    }
    scrolling(song_shower, y){
        song_shower.now_position = y;
        // 当songlist滚动的时候会调用该函数，根据函数改变组件left
        y*=-1;
        let a = -0.22;
        let b = 20;
        let a_ = 0.22;
        let b_ = -9.96;
        let T = y;  // 滑动距离
        let c = 68;  // 转弯的百分比
        let l = 0;
        // console.log(song_shower.song_element_array);
        /* 先对歌曲进行遍历 */
        for(let i=0;i<song_shower.song_element_array.length;i++){
            if(song_shower.getElementTop(song_shower.song_element_array[i].element)=="false"){
                // 隐藏了
                continue;
            }else{
                let top = song_shower.getElementTop(song_shower.song_element_array[i].element);
                let height = song_shower.song_element_array[i].backHeight();
                if(top + height >= T && top <= T + song_shower.element.parentNode.clientHeight){
                    // 在区域内的
                    let p = (top - T) / song_shower.element.parentNode.clientHeight * 100;
                    // console.log(p);
                    if(p < c){
                        l = a * p + b ;
                    }else{
                        l = a_ * p + b_ ;
                    }
                }
                song_shower.song_element_array[i].setLeft(l);
            }
        }
        /* 对分组器进行遍历 */
        for(let i=0;i<song_shower.group_element_array.length;i++){
            let top = song_shower.getElementTop(song_shower.group_element_array[i].element);
            let height = song_shower.group_element_array[i].backHeight();
            if(top + height >= T && top <= T + song_shower.element.parentNode.clientHeight){
                // 在区域内的
                let p = (top - T) / song_shower.element.parentNode.clientHeight * 100;
                // console.log(p);
                if(p < c){
                    l = a * p + b ;
                }else{
                    l = a_ * p + b_ ;
                }
            }
            song_shower.group_element_array[i].setLeft(l);
        }
    }
    getElementTop(element){
        var el = element;
        if (el.parentNode === null || el.style.display == 'none') {
            return "false";
        }
        return el.offsetTop - el.parentNode.offsetTop;
    }
    getCenterPosition(top, height){
        let win_height = document.body.clientHeight;
        return win_height/2 - height/2 - top;
    }
    showSongCellBySongId(song_id){
        // 根据songid展开其所属的分组 如果没有分组则无效
        if(this.group_element_array.length==0) return;
        let group_id = 0;
        for(let i=0;i<this.song_element_array.length;i++){
            if(this.song_element_array[i].getIdx() == song_id){
                group_id = this.song_element_array[i].getGroupId();
                break;
            }
        }
        if(!this.group_element_array[group_id].isSelected()) this.group_element_array[group_id].groupCellClick("init");
    }
    showSongCellByGroupName(group_name){
        // 根据group_name展开分组 如果没有分组则无效
        if(this.group_element_array.length==0) return;
        let group_id = 0;
        for(let i=0;i<this.group_element_array.length;i++){
            if(this.group_element_array[i].getName() == group_name){
                this.group_element_array[i].groupCellClick("init");
                break;
            }
        }
    }
    showSongCellByGroup(group_name){
        // 把某个分组的song_cell隐藏
        if(group_name=="none"){
            for(let i=0;i<this.song_element_array.length;i++){
                this.song_element_array[i].setDisplay("block");
            }
        }else{
            let index = 0;
            for(let i=0;i<this.group_element_array.length;i++){
                if(this.group_element_array[i].gruop_name.innerHTML == group_name){
                    index = i;
                    break;
                }
            }
            for(let i=0;i<this.song_element_array.length;i++){
                if(this.song_element_array[i].getGroupId() == index){
                    this.song_element_array[i].setDisplay("block");
                }
            }
        }
        this.scrolling(this, this.now_position);
    }
    hideSongCellByGroup(group_name){
        // 把某个分组的song_cell隐藏
        let index = 0;
        for(let i=0;i<this.group_element_array.length;i++){
            if(this.group_element_array[i].gruop_name.innerHTML == group_name){
                index = i;
                break;
            }
        }
        for(let i=0;i<this.song_element_array.length;i++){
            if(this.song_element_array[i].getGroupId() == index){
                this.song_element_array[i].setDisplay("none");
            }
        }
        this.scrolling(this, this.now_position);
    }
    setDif(dif){
        // 选择难度 改变界面
        this.dif = dif;
    }
    setSortMethod(sort_method){
        this.sort_method = sort_method;
    }
    setClassifyMethod(classify_method){
        this.classify_method = classify_method;
    }
    setSongPreviewer(song_previewer){
        this.song_previewer = song_previewer;
        for(let i=0;i<this.song_element_array.length;i++){
            this.song_element_array[i].setSongPreviewer(this.song_previewer);
        }
    }
    updateShower(){
        // 刷新/初始化
        this.song_element_array = [];  // 初始化
        this.group_element_array = [];  // 初始化
        this.song_list_after = {};  // 初始化
        this.classifyThenSort();
        let index = 0;
        for(let i=0;i<this.song_list_after[this.classify_method_array[this.classify_method]].length;i++){
            // 组选择
            if(this.classify_method!=0){
                // 存在分组显示
                this.group_element_array[i] = new GroupCell(
                    "group_"+this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]+"_"],
                    "div",
                    this.element_id,
                    this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]+"_"],
                    this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]].length,
                    this
                );
                this.setHeightArray("group",i, -1, this.group_element_array[i].backHeight());  // 设置高度
            }
            for(let j=0;j<this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]].length;j++){
                // 组内部的数组顺序
                let song_name_ = this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["title_localized"][base_page_data.language] == null ? this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["title_localized"]["en"] : this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["title_localized"][base_page_data.language];
                this.song_element_array[index]=new SongCell(
                    this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["id"],
                    "div",
                    this.element_id,
                    this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j],
                    this.dif,
                    song_name_,
                    this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["side"],
                    this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["difficulties"][this.dif]["rating"],
                    this.song_to_play,
                    this.selected_song_shower,
                    this
                );
                // console.log(j);
                this.setHeightArray("song",index, i, this.song_element_array[i].backHeight());  // 设置高度
                this.song_element_array[index].setIdx(this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["id"]);
                this.song_element_array[index].setBeginAndEnd(
                    this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["audioPreview"],
                    this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["audioPreviewEnd"]
                );
                this.song_element_array[index].setPack(this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["set"]);
                if(this.classify_method!=0) this.song_element_array[index].setDisplay("none");
                else this.song_element_array[index].setDisplay("block");
                this.song_element_array[index].setGroupId(i);
                this.song_element_array[index].setSongJsonFile(this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]);
                this.song_element_array[index].setDifList(
                    this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["difficulties"][0]["rating"],
                    this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["difficulties"][1]["rating"],
                    this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["difficulties"][2]["rating"],
                    this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["difficulties"][3]
                )
                if(this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["world_unlock"]){
                    this.song_element_array[index].setWorldUnlock(true);
                }
                if(this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["remote_dl"]){
                    this.song_element_array[index].setRemoteDl(true);
                }
                if(this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["difficulties"][this.dif]["jacketOverride"]){
                    this.song_element_array[index].setJacketOverride(true);
                }
                if(this.song_json_file["songs"][this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]][j]]["difficulties"][this.dif]["ratingPlus"]){
                    this.song_element_array[index].setRatingPlus(true);
                }
                this.song_element_array[index].elementInit();
                index++;
            }
            // console.log(this.song_list_after[this.classify_method_array[this.classify_method]][i][this.classify_method_array[this.classify_method]].length);
        }
        this.scrolling(this, 0);
        this.showerShowAnimation();
    }
    showerShowAnimation(){
        // 组件显示的展示动画
        this.element.style.animationName = "songslistenter";
    }
    showerLeaveAnimation(){
        // 组件显示的展示动画
        this.my_scroll_VD.delete();
        this.element.style.animationName = "songslistleave";
    }
    scrollDelete(){
        this.my_scroll_VD.delete();
    }
    classifyThenSort(){
        // 这里需要算是否是byd 把不是byd的去掉
        // console.log(this.song_list);
        let temp = this.song_list;
        let temp_ = [];
        if(this.dif==3){
            for(let i=0;i<temp.length;i++){
                if(this.song_json_file["songs"][temp[i]]["difficulties"][3]!=null) temp_[temp_.length] = temp[i];
            }
            // 这里需要判断有没有byd 如果没有byd 则难度自动变为2
            if(temp_.length==0){
                this.dif = 2;
                difClick("byd");        // 此函数在selectPageBase
                console.log("9876");
            }else{
                temp = temp_;
            }
        }
        let sj = new SaveJson(0);
        let player_data = sj.get("playerdata");
        let SAC = new SortAndClassify(this.song_json_file, this.dif);
        let song_list_after_classify = SAC.classify(this.classify_method, temp, player_data);
        // console.log(song_list_after_classify);
        let song_list_after_classify_and_sort = song_list_after_classify;
        // console.log(song_list_after_classify_and_sort);
        for(let i=0;i<song_list_after_classify_and_sort[this.classify_method_array[this.classify_method]].length;i++){
            song_list_after_classify_and_sort[this.classify_method_array[this.classify_method]][i]
            [this.classify_method_array[this.classify_method]] = SAC.sort(
                this.sort_method,
                song_list_after_classify_and_sort[this.classify_method_array[this.classify_method]][i]
                [this.classify_method_array[this.classify_method]],
                player_data);
        }
        // 对:玩过 可玩但没玩 不可玩 排序
        this.song_list_after = song_list_after_classify_and_sort;
        // console.log(this.song_list_after);
    }
    canPlaySort(song_list){
        // 可以游戏
    }
}
class SongToPlay{
    last = null;
    song_json_file = null;
    constructor(){

    }
    setSongJsonFile(song_json_file){
        this.song_json_file = song_json_file;
    }
    click(element){
        // console.log(element.song_name);
        if(this.last==null){
            this.last=element;
            this.last.select();
        }else{
            if(this.last.element_id==element.element_id&&!this.last.remote_dl&&window.localStorage.getItem("dif")!="3"){
                // 开始游戏
                document.getElementById("bgaudio").pause();
                console.log(this.last.element_id);
                let id_ = this.last.element_id
                let song_json = this.song_json_file.songs.find((item)=>{
                    return item.id == id_;
                });
                let dif = window.localStorage.getItem("dif");
                let select_char = window.localStorage.getItem("charid");
                let char_json = charjson.char.find((item)=>{
                    return item.idx == select_char;
                });
                console.log(char_json);
                document.getElementById("shutter_songimgshadow").setAttribute("src", document.getElementById("songimgshadow").src);
                document.getElementById("shutter_songimgimg").setAttribute("src", document.getElementById("songimgimg").src);
                document.getElementById("shutter_song_game_data_music_by").innerHTML = song_json.artist;
                document.getElementById("shutter_song_game_data_design_by").innerHTML = song_json.difficulties[parseInt(dif)].chartDesigner;
                document.getElementById("shutter_songnameS").innerHTML = document.getElementById("songnameS").innerHTML;
                document.getElementById("shutter_songname").innerHTML = document.getElementById("songname").innerHTML;
                let save_json = {
                    "songJson":song_json,
                    "dif":dif,
                    "songname":document.getElementById("shutter_songname").innerHTML,
                    "songimgshadow":document.getElementById("songimgshadow").src,
                    "songimgimg":document.getElementById("songimgimg").src,
                    "selectChar":select_char,
                    "charJson":char_json
                };
                // 存储信息加密
                let save_str = JSON.stringify(save_json).toString();
                let en_save_str = new ArcaeaCode().dataEncrypt(save_str, BASE_CODE);
                window.sessionStorage.setItem("playingData", en_save_str);
                shutter_show("shutter_song_msg");
                setTimeout(function(){
                    let url = "playing.html";
                    window.location.href = url;
                },1500);
                // let de_save_str = new ArcaeaCode().dataDecrypt(en_save_str, BASE_CODE);
                // let de_json = JSON.parse(de_save_str);
                // console.log(en_save_str);
                // console.log(de_json);
            }else{
                this.last.deselect();
                this.last = element;
                this.last.select();
            }
        }
    }
    setLast(last){
        this.last = last;
    }
}
class SongCell extends Element{
    // 歌曲组件
    song_previewer = null;
    idx = "";  // 歌曲idx
    pack = "";  // 歌曲所属曲包
    begin_time = 0;  // 
    end_time = 0;  // 预览歌曲
    score = 0;
    grade = -1;  // -1 未玩过
    clear_type = -1;  // -1 未玩过
    can_play = true;  // 可以玩
    world_unlock = false;  // 世界模式解锁
    remote_dl = false;  // 文件夹是否有曲谱
    jacketOverride = false;  // 是否有歌曲替换图片
    single = false;  // 是不是单独的歌
    is_selected = false;
    rating_plus = false;
    song_json_file = null;
    song_cell_selected_start = null;  // start图片
    song_cell_selected_label = null;  // 选中歌曲的展示的label
    song_cell_img_shadow = null;  // 选中歌曲展示的阴影
    dif_list = [];  // 这首歌的难度列表
    group_id = 0;  // 分组的id
    artist = "";
    bpm = "";
    img_path = "";
    score = -1;
    clear_type = -1;
    constructor(id, type, parent_id, song_id, dif, song_name, side, rating, song_to_play, selected_song_shower, song_shower){
        super(id, type, parent_id);
        this.song_id = song_id;
        this.song_name = song_name;
        this.dif = dif;
        this.side = side;
        this.rating = rating;
        this.song_to_play = song_to_play;  // 
        this.selected_song_shower = selected_song_shower;
        this.song_shower = song_shower;
    }
    setSongPreviewer(song_previewer){
        this.song_previewer = song_previewer;
    }
    setBeginAndEnd(begin_time, end_time){
        this.begin_time = begin_time;
        this.end_time = end_time;
    }
    setPack(pack){
        this.pack = pack;
    }
    setIdx(idx){
        this.idx = idx;
    }
    getIdx(){
        return this.idx;
    }
    setGroupId(group_id){
        this.group_id = group_id;
    }
    getGroupId(){
        return this.group_id;
    }
    setDifList(d0, d1, d2, d3){
        this.dif_list[this.dif_list.length] = d0;
        this.dif_list[this.dif_list.length] = d1;
        this.dif_list[this.dif_list.length] = d2;
        if(d3!=null&&d3!=undefined){
            this.dif_list[this.dif_list.length] = d3["rating"];
        }
    }
    setDisplay(display){
        // 设置组件display
        this.element.style.display = display;
    }
    insertAfter(targetElement){
        // 插入到某个组件之后  分组用
        document.getElementById(this.parent_id).removeChild(this.element);  // 先移除
        var parent = targetElement.parentNode;
        if(parent.lastChild == targetElement){
            parent.appendChild(this.element);
        }else{
            parent.insertBefore(this.element,targetElement.nextSibling);
        }
    }
    backHeight(){
        // 返回高度
        return this.element.clientHeight;
    }
    setLeft(left){
        this.element.style.left = left + "%";
    }
    setSongJsonFile(song_json_file){
        this.song_json_file = song_json_file;
        this.artist = this.song_json_file["artist"];
        this.bpm = this.song_json_file["bpm"];
        if(this.song_json_file["set"]=="single"){
            this.single = true;
        }
    }
    setWorldUnlock(world_unlock){
        this.world_unlock = world_unlock;
    }
    setScore(score){
        this.score = score;
    }
    setGrade(grade){
        this.grade = grade;
    }
    setClearType(clear_type){
        this.clear_type = clear_type;
    }
    getScore(){
        return this.score;
    }
    getGrade(){
        return this.grade;
    }
    deselect(){
        this.selectOrDeselect();
    }
    setRemoteDl(remote_dl){
        this.remote_dl = remote_dl;
    }
    setJacketOverride(jacketOverride){
        this.jacketOverride = jacketOverride;
    }
    setRatingPlus(rating_plus){
        this.rating_plus = rating_plus;
    }
    select(){
        this.selectOrDeselect();
    }
    selectOrDeselect(){
        if(this.is_selected){
            this.is_selected = false;
            // console.log("隐藏");
            if(!this.remote_dl){
                this.song_cell_selected_start.style.visibility = "hidden";
                this.song_cell_img_shadow.style.visibility = "hidden";
            }
            this.song_cell_selected_label.style.visibility = "hidden";
        }else{
            this.is_selected = true;
            // console.log("显示");
            if(!this.remote_dl){
                this.song_cell_selected_start.style.visibility = "visible";
                this.song_cell_img_shadow.style.visibility = "visible";
            }
            this.song_cell_selected_label.style.visibility = "visible";
        }
    }
    elementInit(){
        this.element.setAttribute("class", "song_cell");
    
        let song_cell_bg = document.createElement("div");
        if(this.world_unlock){
            song_cell_bg.setAttribute("class", "song_cell_bg song_cell_bg_world");
        }else if(this.dif==3){
            song_cell_bg.setAttribute("class", "song_cell_bg song_cell_bg_beyond");
        }else{
            song_cell_bg.setAttribute("class", "song_cell_bg song_cell_bg_base");
        }
        this.element.appendChild(song_cell_bg);
    
        let song_cell_label = document.createElement("div");
        song_cell_label.setAttribute("class", "song_cell_label");
        this.element.appendChild(song_cell_label);
    
        let song_cell_name = document.createElement("div");
        song_cell_name.setAttribute("class", "song_cell_name");
        song_cell_name.innerHTML = this.song_name;
        song_cell_bg.appendChild(song_cell_name);
    
        let song_cell_img = document.createElement("div");
        song_cell_img.setAttribute("class", "song_cell_img");
        if(this.remote_dl){
            if(this.jacketOverride){
                song_cell_img.style.backgroundImage = "url('../resources/songs/dl_" + this.element_id + "/"+ this.dif.toString() +"_256.jpg')";
                this.img_path = "../resources/songs/dl_" + this.element_id + "/"+ this.dif.toString() +".jpg";
            }else{
                song_cell_img.style.backgroundImage = "url('../resources/songs/dl_" + this.element_id + "/base_256.jpg')";
                this.img_path = "../resources/songs/dl_" + this.element_id + "/base.jpg";
            }
        }else{
            if(this.jacketOverride){
                song_cell_img.style.backgroundImage = "url('../resources/songs/" + this.element_id + "/"+ this.dif.toString() +"_256.jpg')";
                this.img_path = "../resources/songs/" + this.element_id + "/"+ this.dif.toString() +".jpg";
            }else{
                song_cell_img.style.backgroundImage = "url('../resources/songs/" + this.element_id + "/base_256.jpg')";
                this.img_path = "../resources/songs/" + this.element_id + "/base.jpg";
            }
        }
        song_cell_label.appendChild(song_cell_img);
    
        this.song_cell_img_shadow = document.createElement("div");
        this.song_cell_img_shadow.setAttribute("class", "song_cell_img_shadow");
        song_cell_label.appendChild(this.song_cell_img_shadow);
    
        let song_cell_LoC = document.createElement("div");
        song_cell_LoC.setAttribute("class", "song_cell_LoC");
        if(this.side==2){
            song_cell_LoC.style.backgroundImage = "url('../resources/img/songselect/song_cell_corner_colorless.png')";
        }else if(this.side==1){
            song_cell_LoC.style.backgroundImage = "url('../resources/img/songselect/song_cell_corner_dark.png')";
        }else if(this.side==0){
            song_cell_LoC.style.backgroundImage = "url('../resources/img/songselect/song_cell_corner_light.png')";
        }
        song_cell_label.appendChild(song_cell_LoC);
    
        let song_cell_dif = document.createElement("div");
        song_cell_dif.setAttribute("class", "song_cell_dif");
        if(this.dif==0){
            song_cell_dif.style.backgroundImage = "url('../resources/img/songselect/song_cell_corner_0.png')";
        }else if(this.dif==1){
            song_cell_dif.style.backgroundImage = "url('../resources/img/songselect/song_cell_corner_1.png')";
        }else if(this.dif==2){
            song_cell_dif.style.backgroundImage = "url('../resources/img/songselect/song_cell_corner_2.png')";
        }else{
            song_cell_dif.style.backgroundImage = "url('../resources/img/songselect/song_cell_corner_3.png')";
        }
        song_cell_label.appendChild(song_cell_dif);
    
        let song_cell_dif_A = document.createElement("div");
        song_cell_dif_A.setAttribute("class", "song_cell_dif_A");
        let num = this.rating.toString();
        if(this.rating_plus){
            num += "<sup>+</sup>";
        }
        song_cell_dif_A.innerHTML = num;
        song_cell_dif.appendChild(song_cell_dif_A);
    
        this.song_cell_selected_label = document.createElement("div");
        this.song_cell_selected_label.setAttribute("class", "song_cell_selected_label");
        this.element.appendChild(this.song_cell_selected_label);
    
        let song_cell_selected_img = document.createElement("img");
        song_cell_selected_img.setAttribute("class", "song_cell_selected_img");
        if(this.dif==3){
            song_cell_selected_img.setAttribute("src", "../resources/layouts/songselect/song_cell_selected_piece_beyond.png");
        }else{
            song_cell_selected_img.setAttribute("src", "../resources/layouts/songselect/song_cell_selected_piece.png");
        }
        this.song_cell_selected_label.appendChild(song_cell_selected_img);
    
        this.song_cell_selected_start = document.createElement("img");
        this.song_cell_selected_start.setAttribute("class", "song_cell_selected_start");
        this.song_cell_selected_start.setAttribute("src", "../resources/layouts/songselect/start.png");
        this.song_cell_selected_start.setAttribute("draggable", "false");
        this.element.appendChild(this.song_cell_selected_start);
    
        let song_cell_score = document.createElement("img");
        song_cell_score.setAttribute("class", "song_cell_score");
        /* 访问服务器获得 */
        let sj = new SaveJson(0);
        let msg = sj.get("playerdata");
        for(let i=0;i<msg.length;i++){
            if(this.idx==msg[i]["song_id"]&&this.dif==msg[i]["dif"]){
                this.score = msg[i]["score"];
                this.clear_type = msg[i]["cleartype"];
                break;
            }
        }
        let str = "";
        let s = parseInt(this.score);
        if(s>=0&&s<8600000) str = "d";
        else if(s>=8600000&&s<8900000) str = "c";
        else if(s>=8900000&&s<9200000) str = "b";
        else if(s>=9200000&&s<9500000) str = "a";
        else if(s>=9500000&&s<9800000) str = "aa";
        else if(s>=9800000&&s<9900000) str = "ex";
        else if(s>=9900000) str = "explus";
        if(str!="") song_cell_score.setAttribute("src", "../resources/img/grade/mini/"+str+".png");
        song_cell_score.setAttribute("draggable", "false");
        song_cell_bg.appendChild(song_cell_score);
        let cle_to_img = ["fail", "easy", "normal", "hard", "full", "pure"];
        let song_cell_level = document.createElement("img");
        song_cell_level.setAttribute("class", "song_cell_level");
        /* 访问服务器获得 */
        if(this.clear_type!=-1) song_cell_level.setAttribute("src", "../resources/img/clear_type/"+cle_to_img[this.clear_type]+".png");
        song_cell_level.setAttribute("draggable", "false");
        song_cell_bg.appendChild(song_cell_level);
        let this_ = this;
        let song_cell_judge = document.createElement("div");
        song_cell_judge.setAttribute("class", "song_cell_judge");
        song_cell_judge.addEventListener('click', (function(this_){
            return function(){
                if(!this_.song_shower.my_scroll_VD.isAllowClick()) return;
                this_.songCellClick("mouse");
            }
           })(this_));
        this.element.appendChild(song_cell_judge);
    }
    getType(){
        // 返回bg的类型
        if(this.single){
            switch(this.side){
                case 0: return "bg_single_light"
                case 1: return "bg_single_dark";
            }
        }else if(this.dif==3){
            switch(this.side){
                case 0: return "bg_byd_light";
                case 1: return "bg_byd_dark";
                case 2: return "bg_colorless";
            }
        }else{
            switch(this.side){
                case 0: return "bg_light";
                case 1: return "bg_dark";
                case 2: return "bg_colorless";
            }
        }
    }
    songCellClick(type){
        let this_ = this;
        this.song_to_play.click(this_);
        this.selected_song_shower.selectSongCell(this_);
        if(this.song_previewer != null) this.song_previewer.setSongByName(this.idx, this.remote_dl, this.begin_time, this.end_time, this.pack);
        // 每一次选择歌曲 都需要将这个信息存入本地数据库 以便下次进入背景音乐的初始化
        let save_msg = {
            "idx":this.idx,
            "remote_dl":this.remote_dl,
            "begin_time":this.begin_time,
            "end_time":this.end_time,
            "pack":this.pack,
            "type":this.getType()
        };
        let save_json = new SaveJson(0);
        save_json.put("selectsong",save_msg);
        // 还需要刷新这个曲包选择的歌曲
        let msg = save_json.get("packchoose");
        for(let i=0;i<msg["packs"].length;i++){
            if(msg["packs"][i]["id"]==this.pack){
                msg["packs"][i]["song"]["idx"] = this.idx;
                msg["packs"][i]["song"]["remote_dl"] = this.remote_dl;
                msg["packs"][i]["song"]["begin_time"] = this.begin_time;
                msg["packs"][i]["song"]["end_time"] = this.end_time;
                save_json.put("packchoose", msg);
                break;
            }
        }
        if(type=="init"){

        }else if(type=="mouse"){
            this.song_shower.scrollToBySongIdMove(this.idx);
        }
        // let temp = save_json.get("")
    }
}
class SelectedSongShower{
    // 背景
    song_shower = null;  // 界面的song_shower
    song_cell = null;
    select_page_bg = null;
    constructor(song_shower){
        this.song_shower = song_shower;
    }
    selectSongCell(song_cell){
        // 选择歌曲 改变界面组件信息
        this.song_cell = song_cell;
        this.changeName();
        this.songBgImg();
        this.changeDif();
    }
    changeName(){
        document.getElementById("songnameS").innerHTML = this.song_cell.song_name;
        document.getElementById("songname").innerHTML = this.song_cell.song_name;
        document.getElementById("authorname").innerHTML = this.song_cell.artist;
        document.getElementById("songbpm").innerHTML = "BPM:" + this.song_cell.bpm;
        document.getElementById("songnameS").setAttribute("data-text", document.getElementById("songnameS").innerHTML);
        document.getElementById("songname").setAttribute("data-text", document.getElementById("songname").innerHTML);
        document.getElementById("authorname").setAttribute("data-text", document.getElementById("authorname").innerHTML);
        document.getElementById("songbpm").setAttribute("data-text", document.getElementById("songbpm").innerHTML);
    }
    changeDif(){
        document.getElementById("diftabT0").innerHTML = this.song_cell.dif_list[0];
        document.getElementById("diftabT1").innerHTML = this.song_cell.dif_list[1];
        document.getElementById("diftabT2").innerHTML = this.song_cell.dif_list[2];
        if(this.song_cell.rating_plus) document.getElementById("diftabT2").innerHTML = this.song_cell.dif_list[2] + "+";
        // 此处偷懒了 如果byd难度有+则不会显示
        if(this.song_cell.dif_list.length==4){
            document.getElementById("diftabimg3").style.display = "block";
            document.getElementById("diftabT3").innerHTML = this.song_cell.dif_list[3];
        }else{
            document.getElementById("diftabimg3").style.display = "none";
        }
        if(this.song_cell.score==-1) document.getElementById("songHSA").innerHTML = "00'000'000";
        else document.getElementById("songHSA").innerHTML = this.scoreTo(this.song_cell.score);
        // console.log(this.song_cell.clear_type);
        let str = "";
        let s = parseInt(this.song_cell.score);
        if(s>=0&&s<8600000) str = "d";
        else if(s>=8600000&&s<8900000) str = "c";
        else if(s>=8900000&&s<9200000) str = "b";
        else if(s>=9200000&&s<9500000) str = "a";
        else if(s>=9500000&&s<9800000) str = "aa";
        else if(s>=9800000&&s<9900000) str = "ex";
        else if(s>=9900000) str = "explus";
        if(str!="") document.getElementById("songHSL").style.backgroundImage = "url('../resources/img/grade/mini/"+str+".png')";
        else document.getElementById("songHSL").style.backgroundImage = "";
    }
    scoreTo(num) {
        // 将数字转换为字符串
        // console.log(num);
        let str = num.toString();
        // 在字符串前面添加 0，直到字符串长度为 8
        while (str.length < 8) {
            str = '0' + str;
        }
        // 从后向前每三位添加一个空格
        let result = '';
        for (let i = str.length - 1; i >= 0; i--) {
            result = str[i] + result;
            if ((str.length - i) % 3 === 0 && i !== 0) {
            result = "'" + result;
            }
        }
        return result;
    }
    pageBgImg(){
        if(this.song_cell.single){
            switch(this.song_cell.side){
                case 0:this.select_page_bg.bgTo("bg_single_light");break;
                case 1:this.select_page_bg.bgTo("bg_single_dark");break;
            }
        }else if(this.song_cell.dif==3){
            switch(this.song_cell.side){
                case 0:this.select_page_bg.bgTo("bg_byd_light");break;
                case 1:this.select_page_bg.bgTo("bg_byd_dark");break;
                case 2:this.select_page_bg.bgTo("bg_colorless");break;
            }
        }else{
            switch(this.song_cell.side){
                case 0:this.select_page_bg.bgTo("bg_light");break;
                case 1:this.select_page_bg.bgTo("bg_dark");break;
                case 2:this.select_page_bg.bgTo("bg_colorless");break;
            }
        }
    }
    songBgImg(){
        if(this.song_cell.remote_dl){
            document.getElementById("can_not_play_shadow").style.display = "flex";
            if(this.song_cell.side==0){
                document.getElementById("can_not_play_shadow").setAttribute("class", "can_not_play_shadow_light");
                document.getElementById("song_lock_black").style.display = "block";
                document.getElementById("song_lock_light").style.display = "none";
            }else{
                document.getElementById("can_not_play_shadow").setAttribute("class", "can_not_play_shadow_black");
                document.getElementById("song_lock_black").style.display = "none";
                document.getElementById("song_lock_light").style.display = "block";
            }
        }else{
            document.getElementById("can_not_play_shadow").style.display = "none";
        }
        switch(this.song_cell.side){
            case 0:document.getElementById("songimgshadow").setAttribute("src", "../resources/img/song_jacket_back_light.png");break;
            case 1:document.getElementById("songimgshadow").setAttribute("src", "../resources/img/song_jacket_back_dark.png");break;
            case 2:document.getElementById("songimgshadow").setAttribute("src", "../resources/img/song_jacket_back_colorless.png");break;
        }
        this.pageBgImg();
        document.getElementById("songimgimg").setAttribute("src", this.song_cell.img_path);
        // console.log(document.getElementById("songimg").style.animationName);
        if(document.getElementById("songimg").style.animationName == "songimgrotateenter1"){
            document.getElementById("songimg").style.animationName = "songimgrotateenter2";
        }else if(document.getElementById("songimg").style.animationName == "songimgrotateenter2"){
            document.getElementById("songimg").style.animationName = "songimgrotateenter1";
        }else{
            document.getElementById("songimg").style.animationName = "songimgrotateenter1";
        }
        document.getElementById("songimg").style.animationDuration = "0.2s";
        document.getElementById("songimg").style.animationIterationCount = "1";
        document.getElementById("songimg").onanimationend = function(){
            document.getElementById("songimg").style.animationName = "songimgrotate";
            document.getElementById("songimg").style.animationDuration = "10s";
            document.getElementById("songimg").style.animationIterationCount = "infinite";
            // console.log("进入动画结束");
        }
    }
}
class GroupCell extends Element{
    // 组别选择器
    un_select_img = "";  // 没有打开内容的图片
    press_img = "";  // 鼠标移动到上方的图片
    selected_img = "";  // 打开内容的图片
    gruop_name = document.createElement("div");  // 内部文字
    group_amount = document.createElement("div");  // 内部文字
    group_judge = document.createElement("div");  // 内部判别位置
    is_selected = false;  //是否被选中
    constructor(id, type, parent_id, gruop_name, group_amount, song_shower){
        super(id, type, parent_id);
        this.gruop_name.innerHTML = gruop_name;
        this.group_amount.innerHTML = group_amount;
        this.song_shower = song_shower;
        this.gruop_name.setAttribute("class", "gruop_name");
        this.group_amount.setAttribute("class", "group_amount");
        this.group_judge.setAttribute("class", "group_judge");
        this.gruop_name.setAttribute("data-text", gruop_name);
        this.group_amount.setAttribute("data-text", group_amount);
        // console.log(this.element_id);
        this.element.setAttribute("class", "group");
        this.element.appendChild(this.gruop_name);
        this.element.appendChild(this.group_amount);
        this.element.appendChild(this.group_judge);
        let this_ = this;
        this.element.addEventListener('click', (function(this_){
            return function(){
                if(!this_.song_shower.my_scroll_VD.isAllowClick()) return;
                this_.groupCellClick("mouse");
            }
        })(this_));
    }
    backHeight(){
        // 返回高度
        return this.element.clientHeight;
    }
    setLeft(left){
        this.element.style.left = left + "%";
    }
    getName(){
        return this.gruop_name.innerHTML;
    }
    isSelected(){
        return this.is_selected;
    }
    groupCellClick(type){
        // console.log(this.gruop_name.innerHTML)
        let sj = new SaveJson(0);
        let msg = sj.get("packstate");
        if(this.is_selected){
            this.is_selected = false;
            this.element.style.backgroundImage = "url('../resources/img/song_folder_off.png')";
            this.song_shower.hideSongCellByGroup(this.gruop_name.innerHTML);
            msg["group_show_index"].splice(msg["group_show_index"].indexOf(this.gruop_name.innerHTML), 1);
        }else{
            this.is_selected = true;
            this.element.style.backgroundImage = "url('../resources/img/song_folder_on.png')";
            this.song_shower.showSongCellByGroup(this.gruop_name.innerHTML);
            if(msg["group_show_index"].indexOf(this.gruop_name.innerHTML)==-1) msg["group_show_index"].push(this.gruop_name.innerHTML);
        }
        sj.put("packstate", msg);
        if(type=="init"){

        }else if(type=="mouse"){
            let audio = new ClickAudio("../resources/audio/item_click.wav");
            this.song_shower.scrollToNowPos();
        }
    }
    elementInit(){
        
    }
}
class SortAndClassify{
    classify_method = 0;  // 分组方法 0 none;1 version;2 level;3 grade
    sort_method = 0;  // 排序方法 0 title;1 difficulty;2 date;3 grade;4 clear
    constructor(song_json_file, dif){
        this.song_json_file = song_json_file;
        this.dif = dif;
    }
    classify(classify_method, song_list, player_data){
        // console.log(classify_method);
        switch(classify_method){
            case 0:return {"none":[{"none":song_list}]};
            case 1:return this.classifyByVersions(song_list);
            case 2:return this.classifyByLevel(song_list, this.dif);
            case 3:return this.classifyByGrade(player_data, song_list, this.dif);
        }
    }
    sort(sort_method, song_list, player_data){
        switch(sort_method){
            case 0:return this.sortByTitle(song_list);
            case 1:return this.sortByDifficulty(song_list, this.dif);
            case 2:return this.sortByDate(song_list);
            case 3:return this.sortByGrade(player_data, song_list, this.dif);
            case 4:return this.sortByClear(player_data, song_list, this.dif);
        }
    }
    sortByDifficulty(idx, ratingClass) {
        let songslist = this.song_json_file.songs;
        // console.log(this.song_json_file);
        idx.sort((a, b) => {
            let r_a = songslist[a].difficulties[ratingClass].rating;
            let r_b = songslist[b].difficulties[ratingClass].rating;
            if(songslist[a].difficulties[ratingClass].ratingPlus!=null) r_a += 0.5;
            if(songslist[b].difficulties[ratingClass].ratingPlus!=null) r_b += 0.5;
            return r_a - r_b;
        });
        return idx;
    }
    sortByDate(array) {
        // 首先根据id查找对应的曲目信息，并将曲目信息与id存储在一个对象数组中
        let songs = [];
        for (let i = 0; i < array.length; i++) {
            var song = this.song_json_file["songs"].find(function(song) {
            return song.idx === array[i];
        });
            songs.push({id: array[i], date: song.date});
        }
        // 根据时间戳从小到大排序
        songs.sort(function(a, b) {
            return a.date - b.date;
        });
        // 返回排序后的id数组
        var result = [];
        for (var i = 0; i < songs.length; i++) {
          result.push(songs[i].id);
        }
        return result;
    }
    classifyByVersions(array) {
        // 创建空对象 versionMap，用于存储每个版本号对应的 ID 数组
        const versionMap = {};
        // 遍历输入数组中的每个 ID，将其对应的版本号和 ID 加入到 versionMap 中
        array.forEach((id) => {
            // 使用 find 方法在 song_json_file 中查找 ID 对应的歌曲信息
            const song = this.song_json_file["songs"].find((s) => s.idx === id);
            // 如果找不到歌曲信息，则跳过当前 ID
            if(!song) {
                return;
            }
            // 如果 versionMap 中不存在当前歌曲的版本号，则创建一个空数组来存储对应的 ID
            if(!versionMap[song.version]) {
                versionMap[song.version] = [];
            }
            // 将当前 ID 加入到对应版本号的数组中
            versionMap[song.version].push(id);
        });
        // 将 versionMap 转换为指定格式的输出对象
        const result = {
            versions: Object.entries(versionMap).map(([version, ids]) => ({ "versions_":version, "versions": ids })),
        };
        // 返回输出对象
        return result;
    }
    sortByTitle(array) {
        // 将song_json_file转换为数组
        const songsArray = Object.values(this.song_json_file.songs);
        // 输出songs数组，以进行调试
        // console.log(songsArray);
        // 根据给定数组中的每个ID，从songsArray中找到对应的曲目
        const songss = array.map((id) => songsArray.find((song) => song.idx === id));
        // 输出songs数组，以进行调试
        // console.log(songss);
        // 对歌曲数组进行排序
        songss.sort((a, b) => {
            const titleA = a.title_localized.en.toUpperCase();
            const titleB = b.title_localized.en.toUpperCase();
            // 比较每个字符
            for (let i = 0; i < titleA.length && i < titleB.length; i++) {
                const charA = titleA.charAt(i);
                const charB = titleB.charAt(i);   
                if (charA === charB) {
                    continue;
                } else if (this.isSymbol(charA) || this.isNumber(charA)) {
                    return -1;
                } else if (this.isSymbol(charB) || this.isNumber(charB)) {
                    return 1;
                } else if (this.isUpperCase(charA)) {
                    if (this.isLowerCase(charB)) {
                        return -1;
                    } else {
                        return charA.localeCompare(charB);
                    }
                } else if (this.isUpperCase(charB)) {
                    if (this.isLowerCase(charA)) {
                        return 1;
                    } else {
                        return charA.localeCompare(charB);
                    }
                } else if (this.isLowerCase(charA)) {
                    return -1;
                } else if (this.isLowerCase(charB)) {
                    return 1;
                } else {
                    return charA.localeCompare(charB);
                }
            }
        
            // 如果前面的字符都相等，但是长度不同，则长度较短的字符串在前面
            if (titleA.length < titleB.length) {
                return -1;
            } else if (titleA.length > titleB.length) {
                return 1;
            } else {
                return 0;
            }
        });
        
        // 返回按照歌曲名称排序后的ID数组
        return songss.map(song => song.idx);
    }
    sortByClear(player_data, song_list, dif) {
        let songslist = this.song_json_file.songs; // 获取全局变量
        //筛选出player_data中dif与所给相同的数据
        let filteredData = player_data.filter(data => data.dif === dif.toString());
        //console.log(filteredData);
        //根据cleartype对song_list进行从大到小的排序，若song_list中的歌曲在player_data没有数据，则排在有数据的后面，同时按照标题排序
        song_list.sort((a, b) => {
            let songA = songslist.find(song => song.idx === a);
            let songB = songslist.find(song => song.idx === b);
            let dataA = filteredData.find(data => data.song_id === songA.id);
            let dataB = filteredData.find(data => data.song_id === songB.id);
            if (dataA && dataB) {
                if (parseInt(dataA.cleartype) === parseInt(dataB.cleartype)) {
                    return songA.title_localized.en.localeCompare(songB.title_localized.en);
                } else {
                    return parseInt(dataB.cleartype) - parseInt(dataA.cleartype);
                }
            } else if (dataA) {
                return -1;
            } else if (dataB) {
                return 1;
            } else {
                return songA.title_localized.en.localeCompare(songB.title_localized.en);
            }
        });
        return song_list;
    }
    sortByGrade(player_data, song_list, dif) {
        dif = dif.toString();
        let songslist = this.song_json_file.songs; // 获取全局变量
        //筛选出player_data中dif与所给相同的数据
        let filteredData = player_data.filter(data => data.dif === dif);
        //根据cleartype对song_list进行从大到小的排序，若song_list中的歌曲在player_data没有数据，则排在有数据的后面，同时按照标题排序
        song_list.sort((a, b) => {
            let songA = songslist.find(song => song.idx === a);
            let songB = songslist.find(song => song.idx === b);
            let dataA = filteredData.find(data => data.song_id === songA.id);
            let dataB = filteredData.find(data => data.song_id === songB.id);
            if (dataA && dataB) {
                if (dataA.score == dataB.score) {
                    return songA.title_localized.en.localeCompare(songB.title_localized.en);
                } else {
                    return dataB.score - dataA.score;
                }
            } else if (dataA) {
                return -1;
            } else if (dataB) {
                return 1;
            } else {
                return songA.title_localized.en.localeCompare(songB.title_localized.en);
            }
        });
        // console.log(song_list);
        return song_list;
    }
    classifyByGrade(player_data, song_list, dif) {
        let songslist = this.song_json_file.songs;
        let filteredData = player_data.filter(data => data.dif === dif.toString());
        let result = {
        grade: []
        };
        let notPlay = [];
        let EXplus = [];
        let EX = [];
        let AA = [];
        let A = [];
        let B = [];
        let C = [];
        let D = [];
        for (let i = 0; i < song_list.length; i++) {
        let song_id = songslist[song_list[i]].id;
        let score = "notPlay";
        for (let j = 0; j < filteredData.length; j++) {
            if (filteredData[j].song_id === song_id) {
                score = filteredData[j].score;
                break;
            }
        }
        if (score === "notPlay") {
            notPlay.push(song_list[i]);
        } else if (score >= 9900000) {
            EXplus.push(song_list[i]);
        } else if (score >= 9800000 && score <= 9899999) {
            EX.push(song_list[i]);
        } else if (score >= 9500000 && score <= 9799999) {
            AA.push(song_list[i]);
        } else if (score >= 9200000 && score <= 9499999) {
            A.push(song_list[i]);
        } else if (score >= 8900000 && score <= 9199999) {
            B.push(song_list[i]);
        } else if (score >= 8600000 && score <= 8899999) {
            C.push(song_list[i]);
        } else {
            D.push(song_list[i]);
        }
        }
        if (notPlay.length > 0) {
        result.grade.push({
            grade_: "notPlay",
            grade: notPlay
        });
        }
        if (EXplus.length > 0) {
        result.grade.push({
            grade_: "EX+",
            grade: EXplus
        });
        }
        if (EX.length > 0) {
        result.grade.push({
            grade_: "EX",
            grade: EX
        });
        }
        if (AA.length > 0) {
        result.grade.push({
            grade_: "AA",
            grade: AA
        });
        }
        if (A.length > 0) {
        result.grade.push({
            grade_: "A",
            grade: A
        });
        }
        if (B.length > 0) {
        result.grade.push({
            grade_: "B",
            grade: B
        });
        }
        if (C.length > 0) {
        result.grade.push({
            grade_: "C",
            grade: C
        });
        }
        if (D.length > 0) {
        result.grade.push({
            grade_: "D",
            grade: D
        });
        }
        // console.log(JSON.stringify(result));
        return result;
    }
    classifyByLevel(song_list, dif) {
        let songslist = this.song_json_file.songs;
        let ratings = {};
        for (let i = 0; i < song_list.length; i++) {
            let song_idx = song_list[i];
            let song = songslist.find(s => s.idx === song_idx);
            // console.log(song);
            let difficulty = song.difficulties[dif];
            // console.log(difficulty);
            let rating = difficulty.rating;
            if (difficulty.ratingPlus) {
            rating += "+";
            }
            if (!ratings[rating]) {
            ratings[rating] = [];
            }
            ratings[rating].push(song_idx);
        }
        let result = { level: [] };
        for (let rating in ratings) {
            let level = { level_: rating, level: ratings[rating] };
            result.level.push(level);
        }
        result.level.sort((a, b) => parseFloat(a.level_) - parseFloat(b.level_));
        // console.log(JSON.stringify(result));
        return result;
    }
    isSymbol(char){
        return /\W/.test(char);
    }
    
    isNumber(char) {
        return /\d/.test(char);
    }
      
    isUpperCase(char) {
        return /^[A-Z]$/.test(char);
    }
      
    isLowerCase(char) {
        return /^[a-z]$/.test(char);
    }
}
class SongPreviewer{
    not_interval_array = ["base"];
    interval = true;
    song_id = "";
    remote_dl =false;
    begin_time = 0;
    end_time = 0;
    pack = "";
    timer_0 = null;
    timer_1 = null;
    timer_enter = null;
    timer_leave = null;
    constructor(element_id){
        this.element_id = element_id;
        this.song_id = "";
        this.audio = new Audio();
        this.duration = 0;
    }
    countAudioTime = async () => {
        while (isNaN(this.audio.duration) || this.audio.duration === Infinity) {
            // 延迟一会 不然网页都卡死
            await new Promise(resolve => setTimeout(resolve, 200));
            // 设置随机播放时间，模拟调进度条
            this.audio.currentTime = 1000000;
        }
        // console.log('音频的总时长:',this.audio.duration);
        this.duration = this.audio.duration*1000;
    }
    setSongByName(song_id, remote_dl, begin_time, end_time, pack){
        // if(this.song_id == song_id) return;  // 此处不应该比较id，应该比较音频src?
        let src = "";
        if(document.getElementById(this.element_id).src.indexOf(song_id)!=-1) return;
        document.getElementById(this.element_id).volume = 0.5;  // 懒得调整了
        this.song_id = song_id;
        this.remote_dl =remote_dl;
        this.begin_time = begin_time;
        this.end_time = end_time;
        this.pack = pack;
        clearTimeout(this.timer_0);
        clearTimeout(this.timer_1);
        clearTimeout(this.timer_enter);
        clearTimeout(this.timer_leave);
        if(this.not_interval_array.indexOf(pack)==-1) this.interval = true;
        else this.interval = false;
        if(remote_dl){
            src = "../resources/songs/dl_"+song_id+"/preview.ogg";
            this.begin_time = 0;
            // console.log("remote_dl");
        }
        else src = "../resources/songs/"+song_id+"/base.ogg";
        // console.log(src);
        this.audio.src = src;
        this.countAudioTime();  // 获取总时长
        this.musicEntey(src, this.begin_time);
        let this_ = this;
        if(remote_dl){
            this.timer_0 = setTimeout((function(this_){
                return function(){
                    this_.setMusicLeave();
                }
            })(this_), 1000);
        }else{
            this.timer_0 = setTimeout((function(this_){
                return function(){
                    this_.musicLeave();
                }
            })(this_), end_time - begin_time - 1500);
        }
    }
    setMusicLeave(){
        let this_ = this;
        this.timer_1 = setTimeout((function(this_){
            return function(){
                if(this_.interval){
                    // console.log("setMusicLeave此曲循环");
                    // 此曲循环
                    this_.setSongByName(this_.song_id, this_.remote_dl, this_.begin_time, this_.end_time, this_.pack);
                }else{
                    document.getElementById(this_.element_id).volume = 0.5;
                    document.getElementById(this_.element_id).setAttribute("src", "../resources/audio/bgm_full.ogg");
                    document.getElementById(this_.element_id).play();
                    document.getElementById(this_.element_id).onended=function(){
                        document.getElementById(this_.element_id).loop = true;
                        document.getElementById(this_.element_id).setAttribute("src", "../resources/audio/bgm_loop.ogg");
                        document.getElementById(this_.element_id).play();
                        document.getElementById(this_.element_id).onended="";
                    };
                }
            }
        })(this_), this.duration-1000);
    }

    musicEntey(music_src, music_begin){
        // console.log("music_begin="+music_begin);
        let this_ = this;
        let times = 0;
        document.getElementById(this.element_id).onended="";
        document.getElementById(this.element_id).pause();
        document.getElementById(this.element_id).setAttribute("src", music_src);
        let timer = setInterval((function(this_){
            return function(){
                times++;
                if(times%10==0) document.getElementById(this_.element_id).setAttribute("src", music_src);
                // 防止调试资源加载失败 重新加载资源
                if(document.getElementById(this_.element_id).readyState == 4){
                    clearInterval(timer);
                    document.getElementById(this_.element_id).play();
                    document.getElementById(this_.element_id).currentTime = music_begin / 1000;
                }
            }
        })(this_), 10);
    }
    
    musicLeave(){
        // console.log("musicLeave");
        let this_ = this;
        this.timer_leave = setInterval((function(this_){
            return function(){
                let now_v = document.getElementById(this_.element_id).volume - 0.01;
                if(now_v<0){
                    clearInterval(this_.timer_leave);
                    document.getElementById(this_.element_id).pause();
                    if(this_.interval){
                        // console.log("此曲循环");
                        // 此曲循环
                        this_.setSongByName(this_.song_id, this_.remote_dl, this_.begin_time, this_.end_time, this_.pack);
                    }else{
                        document.getElementById(this_.element_id).volume = 0.5;
                        document.getElementById(this_.element_id).setAttribute("src", "../resources/audio/bgm_full.ogg");
                        document.getElementById(this_.element_id).play();
                        document.getElementById(this_.element_id).onended=function(){
                            document.getElementById(this_.element_id).loop = true;
                            document.getElementById(this_.element_id).setAttribute("src", "../resources/audio/bgm_loop.ogg");
                            document.getElementById(this_.element_id).play();
                            document.getElementById(this_.element_id).onended="";
                        };
                    }
                }else{
                    document.getElementById(this_.element_id).volume = now_v;
                }
            }
        })(this_), 30);
    }
}