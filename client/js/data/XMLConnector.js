class XMLConnector{
    /* 
        url: API 的 url
            必填
        method: 调用方法 "GET" 或者 "POST"
            必填
        msg:传入的数据 建议key值应该为字符串 格式为 [[key0, value0], [key1, value1]]
            如GET方法想传递信息 ../url?name=lihua&sex=0 则msg为: [["name", "lihua"], ["sex", 0]]
            不需要填null
        func_callback:获取数据之后的回调函数 回调函数格式应该为 func_callback(result_msg) 会返回获取到的信息
            result_msg 类型为回调信息的类型
            不需要填null
        func_wating:发送请求、接收到结果、超时，都会调用此函数 一次发送请求中 超时和接收到结果只会调用一次
            func_wating函数格式应该为 func_wating(is_wating) is_wating 类型为bool
            发送请求会调用func_wating(true) 接收到结果、超时会调用func_wating(false)
            不需要填null
        func_timeout:超时会调用此函数 调用方式为:func_timeout() 没有入参
            不需要填null
        可用方法:
            send()  发出请求
            setTimeOut(time_out)  设置超时时间 单位为ms 默认为500ms
    */
    time_out = 5000;  // ms
    is_wating = false;
    timer = null;
    constructor(url, method, msg, func_callback, func_wating, func_timeout){
        this.url = url;
        this.method = method;
        this.msg = msg;  // [[key0, value0], [key1, value1]]
        this.func_callback = func_callback;
        this.func_wating = func_wating;
        this.func_timeout = func_timeout;
        this.xml_http = new XMLHttpRequest();
    }
    setTimeout(time_out){
        this.time_out = time_out;
    }
    send(){
        let this_ = this;
        this.xml_http.onreadystatechange=(function(this_){
            return function(){
                if(this_.xml_http.readyState==4 && this_.xml_http.status==200){
                    if(!this_.is_wating) return;  // 已经超时
                    this_.is_wating = false;
                    if(this_.func_callback!=null&&this_.func_callback!=undefined){
                        this_.func_callback(this_.xml_http.responseText);
                    }
                    if(this_.func_wating!=null&&this_.func_wating!=undefined){
                        this_.func_wating(false);  // 传入false 代表结束
                    }
                }
            }
        })(this_);
        if(this.method=="POST"){
            this.xml_http.open("POST",this.url,true);
            this.xml_http.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=utf-8");
            if(this.msg!=null&&this.msg!=undefined) this.xml_http.send(this.msgToStr());
            else this.xml_http.send();
            // console.log(this.msgToStr());
        }else if(this.method=="GET"){
            if(this.msg!=null&&this.msg!=undefined) this.xml_http.open("GET",this.url + "?" + this.msgToStr(),true);
            else this.xml_http.open("GET",this.url,true);
            this.xml_http.send();
        }
        this.is_wating = true;
        if(this_.func_wating!=null&&this_.func_wating!=undefined){
            this_.func_wating(true);  // 传入true 代表开始
        }
        this.setTimer();  // 设置超时计时器
    }
    msgToStr(){
        let str = "";
        for(let i=0;i<this.msg.length;i++){
            if(i!=0) str += "&";
            str += this.msg[i][0].toString() + "=" + this.msg[i][1].toString();
        }
        return str;
    }
    setTimer(){
        // console.log("设置计时器");
        let this_ = this;
        this.timer = setTimeout((function(this_){
            return function(){
                if(!this_.is_wating) return;
                else{
                    this_.is_wating = false;
                    if(this_.func_timeout!=null&&this_.func_timeout!=undefined){
                        this_.func_timeout();  // 超时
                    }
                    if(this_.func_wating!=null&&this_.func_wating!=undefined){
                        this_.func_wating(false);  // 传入false 代表结束
                    }
                }
            }
        })(this_), this.time_out);
    }
}
class ArcaeaXMLConnector extends XMLConnector{
    // 在此处统一处理数据
    constructor(api, msg, type, func_callback, func_wating, func_timeout){
        let para = getSendMsg(api, msg);
        let url = API["host"]+API["port"]+API["api"][api] + "/";
        super(url, type, para, func_callback, func_wating, func_timeout);
    }
}
function getSendMsg(api, msg){
    // 此处msg格式不确定
    let para = API_PARA[api];
    let arcaea_code = new ArcaeaCode();
    let seed = "";
    // console.log("seed");
    if(window.localStorage.getItem("online")!="offline"){
        if(window.localStorage.getItem("seed")!=null||window.localStorage.getItem("seed")!="") seed = arcaea_code.dataDecrypt(window.localStorage.getItem("seed"), BASE_CODE).toString();
    }
    // console.log(seed);
    let id = null;
    let loginnumber = null;
    let user_name = null;
    let user_password = null;
    switch(api){
        case "register":
            para[0][1] = msg[0];
            para[1][1] = msg[1];
            para[2][1] = parseInt(Math.random()*(1000000000-100000000)+100000000).toString();
            // console.log("09876543456789");
            let register_temp_0 = new ArcaeaCode().dataEncrypt(para[1][1], BASE_CODE);
            let register_temp_1 = new ArcaeaCode().dataEncrypt(para[2][1], BASE_CODE);
            window.localStorage.setItem("playerpassword", register_temp_0);
            window.localStorage.setItem("playername", para[0][1]);
            window.localStorage.setItem("seed", register_temp_1);
            para[1][1] = register_temp_0;
            para[2][1] = register_temp_1;
            console.log("09876543456789");
            break;
        case "login":
            para[0][1] = msg[0];
            para[1][1] = msg[1];  // 加密之后的
            para[2][1] = "";    // 此处不需要seed
            break;
        case "delete": 
            user_name = window.localStorage.getItem("playername");
            user_password = window.localStorage.getItem("playerpassword");
            loginnumber = arcaea_code.dataDecrypt(window.localStorage.getItem("loginnumber"), seed);
            id = window.localStorage.getItem("playerid");
            para[0][1] = user_name;
            para[1][1] = user_password;
            para[2][1] = window.localStorage.getItem("seed");
            para[3][1] = loginnumber;
            para[4][1] = id;
            break;
        case "search_friend":
            id = window.localStorage.getItem("playerid");
            loginnumber = arcaea_code.dataDecrypt(window.localStorage.getItem("loginnumber"), seed);
            para[0][1] = id;
            para[1][1] = loginnumber;
            // console.log(seed);
            break;
        case "add_friend":
            id = window.localStorage.getItem("playerid");
            loginnumber = arcaea_code.dataDecrypt(window.localStorage.getItem("loginnumber"), seed);
            para[0][1] = id;
            para[1][1] = loginnumber;
            para[2][1] = msg.toString();
            break;
        case "delete_friend":
            id = window.localStorage.getItem("playerid");
            loginnumber = arcaea_code.dataDecrypt(window.localStorage.getItem("loginnumber"), seed);
            para[0][1] = id;
            para[1][1] = loginnumber;
            para[2][1] = msg.toString();
            break;
        case "search_player_data":
            id = window.localStorage.getItem("playerid");
            loginnumber = arcaea_code.dataDecrypt(window.localStorage.getItem("loginnumber"), seed);
            para[0][1] = id;
            para[1][1] = loginnumber;
            break;
        case "change_char":
            id = window.localStorage.getItem("playerid");
            loginnumber = arcaea_code.dataDecrypt(window.localStorage.getItem("loginnumber"), seed);
            para[0][1] = id;
            para[1][1] = loginnumber;
            para[2][1] = msg;
            break;
        case "send_score":
            id = window.localStorage.getItem("playerid");
            loginnumber = arcaea_code.dataDecrypt(window.localStorage.getItem("loginnumber").toString(), seed);
            let idx = msg["playing"]["songidx"].toString();
            let lastestscore = msg["playing"]["score"].toString();
            let cleartype = msg["playing"]["clear_type"].toString();
            let selectedcharid = window.localStorage.getItem("charid").toString();
            let dif = window.localStorage.getItem("dif").toString();
            para[0][1] = id;
            para[1][1] = loginnumber;
            para[2][1] = idx;
            para[3][1] = lastestscore;
            para[4][1] = cleartype;
            para[5][1] = selectedcharid;
            para[6][1] = dif;
            break; 
    }
    return para;
}
var API = {
    "host":"http://127.0.0.1",
    "port":":8000/",
    "api":{
        "register":"register",
        "login":"login",
        "delete":"deleteAccount",
        "search_friend":"getFriends",
        "add_friend":"addFriend",
        "delete_friend":"deleteFriend",
        "search_player_data":"getScores",
        "change_char":"switchChar",
        "send_score":"uploadScore"
    }
};
var API_PARA = {
    "register":[["username", ""], ["userpassword", ""], ["seed", ""]],
    "login":[["username", ""], ["userpassword", ""], ["seed", ""]],
    "delete":[["username", ""], ["userpassword", ""], ["seed", ""], ["loginnumber", ""], ["id", ""]],
    "search_friend":[["id", ""], ["loginnumber", ""]],
    "add_friend":[["id", ""], ["loginnumber", ""], ["findid", ""]],
    "delete_friend":[["id", ""], ["loginnumber", ""], ["findid", ""]],
    "search_player_data":[["id", ""], ["loginnumber", ""]],
    "change_char":[["id", ""], ["loginnumber", ""], ["selectedcharid", ""]],
    "send_score":[["id", ""], ["loginnumber", ""], ["idx", ""], ["lastestscore", ""], ["cleartype", ""], ["selectedcharid", ""], ["dif", ""]]
}
/* 
以下为示例
1. 需要访问http://127.0.0.1:5500/log/log接口 传递参数为name=lihua,sex=0,class=1 POST 回调函数等都存在
    let url = "http://127.0.0.1:5500/log/log";
    let msg = [["name", "lihua"], ["sex", 0], ["class", 1]];
    let XML_connector = new XMLConnector(url, "POST", msg, func0, func1, func2);
    // XML_connector.setTimeout(1000);  // 把默认的500ms超时改成1000ms
    XML_connector.send();  // 发送请求
    //  之后如果没用超时 则会调用回调函数 把获得的数据传入
    // 超时则会调用超时的函数
    // 发出请求之后 等待函数会被调用 会传入true (ture 是值)
    // 超时或者数据获得之后 等待函数会被调用 会传入false (false 是值)
    -->此时函数运行等价于
        this.xml_http.open("POST","http://127.0.0.1:5500/log/log",true);
        this.xml_http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        this.xml_http.send("name=lihua&sex=0&class=1");
    <--
*/