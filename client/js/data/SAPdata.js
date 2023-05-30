/* songs and pack data
    访问用户歌曲表 用songlist.json查看各个歌曲在曲包的情况
    数据存储在浏览器的临时数据库用json转字符串存储
*/
class SaveJson{
    /* json存储在浏览器数据库 */
    constructor(type){
        //type 0代表长期 1代表短期
        this.type = type;
    }
    put(key, value){
        if(this.type==0){
            window.localStorage.setItem(key, JSON.stringify(value).toString());
        }else{
            window.sessionStorage.setItem(key, JSON.stringify(value).toString());
        }
    }
    get(key){
        if(this.type==0){
            return JSON.parse(window.localStorage.getItem(key));
        }else{
            return JSON.parse(window.sessionStorage.getItem(key));
        }
    }
    delete(key){
        if(this.type==0){
            return JSON.parse(window.localStorage.removeItem(key));
        }else{
            return JSON.parse(window.sessionStorage.removeItem(key));
        }
    }
}
class GetPlayerScoreData{
    xmlhttp = null;
    userid = 0;
    loginnumber = 0;
    constructor(userid, loginnumber){
        this.userid = userid;
        this.loginnumber = loginnumber;
        this.xmlhttp=new XMLHttpRequest();
        let this_ = this;
        this.xmlhttp.onreadystatechange=(function(this_){
            return function(){
                if(this_.xmlhttp.readyState==4 && this_.xmlhttp.status==200){
                    this_.backFunction(this_.xmlhttp.responseText);
                }
            }
        })(this_);
        this.xmlhttp.open("POST","../php/playerSongs/scoreData.php",true);
        this.xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        this.xmlhttp.send("playerid="+this.userid.toString()+"&loginnumber="+this.loginnumber.toString());
    }
    backFunction(resultData){
        let result_json = JSON.parse(resultData);
        if(result_json["success"]){
            console.log(result_json["songList"]);
            let saveJson = new SaveJson(1);
            saveJson.put("SAPdata", result_json);
        }
    }
}
//  = "../resources/songs/songlist.json"
class SavePackData{
    /* 
        获得用户歌曲分数之后，需要确定曲包歌曲数目和clr fmpm
        初始：拿到曲包信息->建立曲包和对应dif的json->拿到歌曲信息->用歌曲信息更新曲包信息->
        用用户歌曲分数信息更新曲包信息->将曲包信息存储到会话存储空间
        更新：用歌曲信息更新曲包信息->用用户歌曲分数信息更新曲包信息->将曲包信息存储到会话存储空间
    */
    func = null;
    pack_json = null;  // 读取的
    song_json = null;  // 读取的
    pack_json_save = {};  // 需要存储到会话存储空间的
    constructor(){
        // console.log("SavePackData");
        this.song_json_path = "../resources/songs/songlist.json";
        this.pack_json_path = "../resources/songs/packlist.json";
        this.song_json_reader = null;
        this.pack_json_reader = null;
        this.packInit();
        this.songInit();
    }
    packInit(){
        // 曲包数据获取
        this.pack_json_reader = new jsonReader(this.pack_json_path);
        let this_ = this;
        let timer_0 = setInterval((function(this_){
            return function(){
                if(this_.pack_json_reader.onready()){
                    clearInterval(timer_0);
                    this_.pack_json = this_.pack_json_reader.backJson();
                    // console.log(this_.pack_json);
                }
            }
        })(this_), 100);
    }
    onready(){
        // 检查数据是否加载完毕
        return this.pack_json != null && this.song_json != null;
    }
    songInit(){
        // 歌曲数据获取
        this.song_json_reader = new jsonReader(this.song_json_path);
        let this_ = this;
        let timer_0 = setInterval((function(this_){
            return function(){
                if(this_.song_json_reader.onready()){
                    clearInterval(timer_0);
                    this_.song_json = this_.song_json_reader.backJson();
                }
            }
        })(this_), 100);
    }
    save(){
        let saveJson = new SaveJson(0);
        saveJson.put("packdata");
    }
    createPackJson_check(){
        // 包括检查
        let this_ = this;
        let timer = setInterval((function(this_){
            return function(){
                if(this_.onready()){
                    clearInterval(timer);
                    this_.createPackJson();
                }
            }
        })(this_), 100);
    }
    createPackJson(){
        // 创建初始的packJson
        for(let i=0;i<this.pack_json["packs"].length;i++){
            let every_msg = this.pack_json["packs"][i];
            this.pack_json_save[every_msg["id"]] = {
                "dif":[
                    {
                        "all":0,
                        "clr":0,
                        "frpm":0
                    },
                    {
                        "all":0,
                        "clr":0,
                        "frpm":0
                    },
                    {
                        "all":0,
                        "clr":0,
                        "frpm":0
                    },
                    {
                        "all":0,
                        "clr":0,
                        "frpm":0
                    }
                ]
            };
        }
        this.pack_json_save["single"] = {
            "dif":[
                {
                    "all":0,
                    "clr":0,
                    "frpm":0
                },
                {
                    "all":0,
                    "clr":0,
                    "frpm":0
                },
                {
                    "all":0,
                    "clr":0,
                    "frpm":0
                },
                {
                    "all":0,
                    "clr":0,
                    "frpm":0
                }
            ]
        };  // 单独的
        // 为初始的packJson all 赋值
        for(let i=0;i<this.song_json["songs"].length;i++){
            let every_msg = this.song_json["songs"][i];
            let pack_name = every_msg["set"].toString().split("_")[0];
            if(pack_name=="epilogue") pack_name="finale";
            for(let j=0;j<every_msg["difficulties"].length;j++){
                this.pack_json_save[pack_name]["dif"][j]["all"]++;
            }
        }
        let saveJson = new SaveJson(1); 
        let song_list = saveJson.get("SAPdata");// 拿到用户的歌曲表
        if(song_list!=null){
            // 未登录
            for(let i=0;i<song_list["songList"].length;i++){
                let every_msg = song_list["songList"][i];
                let song_id = every_msg["songid"].toString();
                let index = this.song_json_reader.compare(["songs", "id"], song_id);
                if(index.length==1){
                    index = index[0];
                    let pack_name = this.song_json["songs"][index]["set"].toString().split("_")[0];
                    if(every_msg["cleartype"]==4||every_msg["cleartype"]==5){
                        // frpm
                        this.pack_json_save[pack_name]["dif"][every_msg["dif"]]["frpm"]++;
                        this.pack_json_save[pack_name]["dif"][every_msg["dif"]]["clr"]++;
                    }else if(every_msg["cleartype"]!=0){
                        this.pack_json_save[pack_name]["dif"][every_msg["dif"]]["clr"]++;
                    }
                }else continue;
            }
        }
        // console.log(this.pack_json_save);
        let saveJson_ = new SaveJson(0);
        saveJson_.put("packdata", this.pack_json_save);
        if(this.func!=null){
            this.func();
        }
    }
    setReadyCallback(func){
        this.func = func;
    }
}
function getPlayerScoreData(){
    let getPlayerScoreData_ = new GetPlayerScoreData(100000025, 579432989);
    console.log("SavePackDataaaa");
    let savePackData = new SavePackData();
    savePackData.createPackJson_check();
}