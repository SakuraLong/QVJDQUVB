var waiting_ = null;
function qaq(){
    let timer=setTimeout(function(){
        document.getElementById("onepic").style.animationName="disappear1";
        document.getElementById("onepic").style.animationIterationCount="1";
        document.getElementById("onepic").style.animationDuration="1s";
    },3600);
}
function wasd(){
    // 本地数据库初始化
    localStorageDataCheck();
    document.getElementById("clickpage1").style.display="None";
    qaq();
    document.getElementById("onepic").style.animationName="mymove";
    document.getElementById("test2").style.animationName="disappear1";
    abc();
    pre();
    pic1move();
    // 点击之后开始进行自动login
    console.log("开始自动登录");
    waiting_ = new Waiting(-1, "0%", -1, "0%", "img");
    playerLogin();
}
function playerLogin(){
    // 检查字段
    if(window.localStorage.getItem("online")=="online"){
        let playername = window.localStorage.getItem("playername");
        let playerpassword = window.localStorage.getItem("playerpassword");
        let seed = window.localStorage.getItem("seed");
        // 这里涉及到本地密码加解密
        // seed = decrypt(seed, base_code);
        // playerpassword = decrypt(playerpassword, seed);
        // let msg = [["playername", playername],["playerpassword", playerpassword],["seed", seed]];
        // var login_api = new XMLConnector(API["host"]+API["port"]+API["api"]["login"] , "POST", msg, loginResult, loginWating, loginTimeout);
        // login_api.send();
        let xml_conn = new ArcaeaXMLConnector("login", [playername, playerpassword], "POST", loginResult, loginWating, loginTimeout);
        xml_conn.send();
        console.log("自动登录");
    }else return;
}
function loginResult(msg){
    // 获得返回信息
    console.log("拿到返回信息"+msg);
    let json_msg = JSON.parse(msg);
    let seed = new ArcaeaCode().dataDecrypt(window.localStorage.getItem("seed"), BASE_CODE);
    if(!json_msg["success"]){
        // 登陆失败
        window.localStorage.setItem("online", "offline");
    }else{
        window.localStorage.setItem("playerid", json_msg["id"]);
        window.localStorage.setItem("playername", json_msg["username"]);
        window.localStorage.setItem("loginnumber", new ArcaeaCode().dataEncrypt(json_msg["loginnumber"].toString(), seed));  // 加密保存
        window.localStorage.setItem("charid", json_msg["selectedcharid"]);
        window.localStorage.setItem("score", json_msg["score"]);
        window.localStorage.setItem("level", json_msg["userlevel"]);
        window.localStorage.setItem("fragments", json_msg["userfragment"]);
        window.localStorage.setItem("memories", json_msg["usermemory"]);
        console.log("自动登录成功");
    }
}
function loginWating(iswaiting){
    // 等待信息
    if(iswaiting){
        console.log("开始等待");
        waiting_.appendToElementById("container");
    }else{
        console.log("等待结束");
        waiting_.waitingOver();
    }
}
function loginTimeout(){
    // 超时了
    console.log("超时");
    window.localStorage.setItem("online", "offline");
}
function abc(){
    let timer=setTimeout(function(){
        document.getElementById("onemusic").play();
        document.getElementById("onemusic").onended=function(){bgended();};
    },4600);
}
function pre(){
    let timer=setTimeout(function(){
        document.getElementById("container").style.animationName="movebackground";
    },4600);
}
function pic1move(){
    document.getElementById("logo1").style.display="None";
    document.getElementById("logo2").style.display="None";
    let timer1=setTimeout(function(){
        document.getElementById("firpic").style.animationName="movefirpic";
    },6000);
    let timer2=setTimeout(function(){
        document.getElementById("secpic").style.animationName="movesecpic";
    },8500);
    let timer3=setTimeout(function(){
        document.getElementById("thrpic").style.animationName="movethrpic";
    },11000);
    let timer4=setTimeout(function(){
        document.getElementById("threepics").style.animationName="disappear2";
    },14000);
    let timer5=setTimeout(function(){
        if(document.getElementById("logo1").style.display=="none"){
        document.getElementById("logo1").style.display="block";
        // document.getElementById("fourpic0").style.display="block";
        document.getElementById("logo1").style.animationName="movefourpic";
    }},17500); 
    let timer6=setTimeout(function(){
        if(document.getElementById("logo2").style.display=="none"){
            qwq=false;
            gotomain=true;  
            document.getElementById("fourpic1").style.animationName="flash0";
            document.getElementById("logo2").style.display="block";
            document.getElementById("logo3").style.display="block";
            document.getElementById("finalpic0").style.animationName="movefinalpic";
            document.getElementById("glasspic0").style.animationName="glassflash0";
            document.getElementById("glasspic1").style.animationName="glassflash1";
        }    
    },23000);
     
}
var gotomain = false;
var qwq=true;  // 
function entergame(){
    console.log("点击");
    if(gotomain){
        gotomain=false;
        shutter_show();
        let timer = setTimeout(function(){
            // let jsonString = JSON.stringify(basejson);
            // let url = "mainPage.html?data=" + encodeURIComponent(jsonString);
            let url = "mainPage.html";
            window.location.href = url;
        }, 1500);
    }
    let music_time=19;
    if(document.getElementById("onemusic").duration>0&&!document.getElementById("onemusic").paused){
        if(qwq==true){
            qwq=false;
            gotomain = true;
            document.getElementById("onemusic").currentTime=music_time;
            document.getElementById("container").style.animationName="dsfds";
            document.getElementById("threepics").style.display="None";
            document.getElementById("container").style.backgroundPositionY="80%";
            document.getElementById("logo1").style.display="block";
            
            document.getElementById("fourpic1").style.animationName="flash0";
            document.getElementById("logo2").style.display="block";
            
            document.getElementById("finalpic0").style.display="block";
            document.getElementById("finalpic0").style.animationName="movefinalpic";
            document.getElementById("logo3").style.display="block";
            document.getElementById("glasspic0").style.animationName="glassflash0";
            document.getElementById("glasspic1").style.animationName="glassflash1";
        }
    }
}
var loop = false;
function bgended(){
    if(loop==false){
        loop=true;
        document.getElementById("onemusic").loop = true;
        document.getElementById("onemusic").setAttribute("src", "../resources/audio/in_epilogue_loop.ogg");
        document.getElementById("onemusic").play();
    }
}
// function scrollmoveanimation(begin, end, time, frames, times, type){
//     let pertime = 1/frames;  //获取一帧动画多少秒
//     let ltime = time/pertime;  // 获取一共循环几次
//     // document.getElementById("appname").innerHTML = ltime;
//     let lmove = (end - begin)/ltime;  //获取每次循环移动多少
//     let ratio = 0;
//     let x = times/ltime; //x值
//     if(times == ltime) return;
//     if(type == "linear"){
//         ratio = x;
//     }else if(type == "ease-in-out"){
//         ratio = x*x;
//     }else if(type == "ease-out"){
//         ratio = -x*x + 2*x;
//     }else if(type == "ease-out2"){
//         ratio = Math.sqrt(1-(x-1)*(x-1));
//     }
//     document.getElementById("charlistdiv").scrollTop=begin + (end-begin)*ratio;
//     setTimeout(function(){scrollmoveanimation(begin, end, time, frames, times+1, type);},pertime);
// }