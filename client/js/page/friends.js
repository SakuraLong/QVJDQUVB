var FRIEND_PROMPT = null;
class FriendCell{
    element = document.createElement("div");
    time = "";
    song_name = "";
    dif = "";
    score = "";
    constructor(parent, char_path, ptt, player_name, language, friend_id){
        this.parent = parent;
        this.char_path = char_path;
        this.ptt = ptt;
        this.player_name = player_name;
        this.element.setAttribute("class", "friend_element");
        this.parent.appendChild(this.element);
        this.language = language;
        this.friend_id = friend_id;
    }
    setLatestScore(time, song_name, dif, score){
        console.log("setLatestScore");
        let dif_ = ["[PST]", "[PRS]", "[FTR]", "[BYD]"];
        this.time = time;
        this.song_name = song_name;
        this.dif = dif_[dif];
        let s = parseFloat(score);
        let g = "";
        if(s>=0&&s<8600000) g = "「D」";
        else if(s>=8600000&&s<8900000) g = "「C」";
        else if(s>=8900000&&s<9200000) g = "「B」";
        else if(s>=9200000&&s<9500000) g = "「A」";
        else if(s>=9500000&&s<9800000) g = "「AA」";
        else if(s>=9800000&&s<9900000) g = "「EX」";
        else if(s>=9900000) g = "「EX+」";
        this.score = g;
    }
    elementInit(){
        let friend_bg = document.createElement("div");
        friend_bg.setAttribute("class", "friend_bg");
        this.element.appendChild(friend_bg);
        let friend_border = document.createElement("div");
        friend_border.setAttribute("class", "friend_border");
        this.element.appendChild(friend_border);
        let friend_header = document.createElement("img");
        friend_header.setAttribute("class", "friend_header");
        friend_header.setAttribute("src", this.char_path);
        friend_header.setAttribute("draggable", false);
        friend_border.appendChild(friend_header);
        let friend_name = document.createElement("div");
        friend_name.setAttribute("class", "friend_name");
        friend_name.innerHTML = this.player_name;
        this.element.appendChild(friend_name);
        let friend_text = document.createElement("div");
        friend_text.setAttribute("class", "friend_text");
        this.element.appendChild(friend_text);
        let friend_play_time = document.createElement("div");
        friend_play_time.setAttribute("class", "friend_play_time");
        friend_play_time.innerHTML = this.time;
        friend_text.appendChild(friend_play_time);
        let friend_play_score = document.createElement("div");
        friend_play_score.setAttribute("class", "friend_play_score");
        friend_play_score.innerHTML = this.song_name + " " + this.dif + " " + this.score;
        friend_text.appendChild(friend_play_score);

        let friend_rating = document.createElement("img");
        let friend_ptt_m = document.createElement("div");
        let friend_ptt_s = document.createElement("div");
        friend_rating.setAttribute("class", "friend_rating");
        friend_ptt_m.setAttribute("class", "friend_ptt_m");
        friend_ptt_s.setAttribute("class", "friend_ptt_s");
        let score_arr = this.ptt.split(".");
        friend_ptt_m.setAttribute("data-text", score_arr[0] + ".");
        friend_ptt_m.innerHTML = score_arr[0] + ".";
        friend_ptt_s.setAttribute("data-text", score_arr[1]);
        friend_ptt_s.innerHTML = score_arr[1];
        let s = parseFloat(this.ptt);
        let src_str = "../resources/img/rating_";
        if(s>=0&&s<=3.49) src_str += "0.png";
        else if(s>=3.50&&s<=6.99) src_str += "1.png";
        else if(s>=7.00&&s<=9.99) src_str += "2.png";
        else if(s>=10.00&&s<=10.99) src_str += "3.png";
        else if(s>=11.00&&s<=11.99) src_str += "4.png";
        else if(s>=12.00&&s<=12.49) src_str += "5.png";
        else if(s>=12.50&&s<=12.99) src_str += "6.png";
        else if(s>=13.00) src_str += "7.png";
        friend_rating.setAttribute("src", src_str);
        this.element.appendChild(friend_rating);
        this.element.appendChild(friend_ptt_m);
        this.element.appendChild(friend_ptt_s);

        let friend_delete = document.createElement("img");
        friend_delete.setAttribute("class", "friend_delete");
        friend_delete.setAttribute("src", "../resources/img/delete.png");
        let this_ = this;
        // friend_delete.onclick = this_.delete;
        // friend_delete.onclick = this_.delete(this_);
        friend_delete.onclick = (function(this_){
            return function(){
                this_.delete(this_)
            }
        })(this_);
        this.element.appendChild(friend_delete);
    }
    delete(this_){
        // 删除好友 弹出提示框
        FRIEND_PROMPT = new deleteFriendPrompt("friend_prompt", "body", 1,
        base_language_data[this.language]["mainPage"]["net"]["online"]["deleteFriendPrompt"]["title"],
        base_language_data[this.language]["mainPage"]["net"]["online"]["deleteFriendPrompt"]["content"][0]+
        this_.player_name+
        base_language_data[this.language]["mainPage"]["net"]["online"]["deleteFriendPrompt"]["content"][1],
        base_language_data[this.language]["mainPage"]["net"]["online"]["deleteFriendPrompt"]["answer"]);
        let f_id = this.friend_id
        FRIEND_PROMPT.setDeleteFunc(deleteFriendById, f_id);
        FRIEND_PROMPT.show();
    }
}
function deleteFriendById(friend_id){
    console.log(friend_id);
    FRIEND_PROMPT.setAllowLeave(false);
    let xml_conn = new ArcaeaXMLConnector("delete_friend", friend_id, "POST", deleteFriendByIdCallback, deleteFriendByIdWaiting, deleteFriendByIdTimeout);
    xml_conn.send();
}
function deleteFriendByIdCallback(msg){
    console.log(msg);
    msg = JSON.parse(msg)
    if(msg.success){
        FRIEND_PROMPT.setAllowLeave(true);
        FRIEND_PROMPT.leave();
        let search_xml_conn = new ArcaeaXMLConnector("search_friend", "", "POST", getAddPlayerFriendsCallback, null, getPlayerFriendsTimeout);
        search_xml_conn.setTimeout(1000);
        search_xml_conn.send();
    }else{

    }
}
function deleteFriendByIdWaiting(is_waiting){
    if(is_waiting){
        base_page_data.add_friend_waiting.appendToElementById("body");
    }else{
        base_page_data.add_friend_waiting.waitingOver();
    }
}
function deleteFriendByIdTimeout(){

}