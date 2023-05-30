var baseWidth = 1280;
var baseHeight = 601;
var baseAspectRatio = 2.13;
var baseElement= {
    "shutter":{
        "ratio":2.12,
        "height":160.5
    },
    "mainPage":{
        "buttonGroup":[768, 361],
        "fontSize": 40
    },
    "selectPage":{
        "packshower": [1536, 595],
        "pack":[309, 559],
        "packname": 25,
        "packstext": 13,
        "packatext": 18
    },
    "topbar":{
        "arcaea":20,
        "header":5,
        "headerBoeder":7.3,
        "playerName":22,
        "guest":15,
        "settings":13
    }
};
function changeSize(page){
    var width = document.getElementById("body").clientWidth;
    var height = document.getElementById("body").clientHeight;
    var aspectRatio = width/height;
    if(page=="mainPage"){
        var buttonGroup = document.getElementById("buttonGroup");
        var buttonGroupNames=document.getElementsByClassName("buttonGroupNames");
        if(buttonGroup.clientWidth != baseElement["mainPage"]["buttonGroup"][0]){
            buttonGroup.style.height = buttonGroup.clientWidth/baseElement["mainPage"]["buttonGroup"][0]*baseElement["mainPage"]["buttonGroup"][1].toString() + "px";
            for(var i=0; i<buttonGroupNames.length; i++) { 
                buttonGroupNames[i].style.fontSize = buttonGroup.clientWidth/baseElement["mainPage"]["buttonGroup"][0]*baseElement["mainPage"]["fontSize"].toString() + "px";
            }
        }else{
            buttonGroup.style.height = baseElement["mainPage"]["buttonGroup"][1].toString() + "px";
            for(var i=0; i<buttonGroupNames.length; i++) { 
                buttonGroupNames[i].style.fontSize = baseElement["mainPage"]["fontSize"].toString() + "px";
            }
        }   
        // document.getElementById("playname").innerHTML = buttonGroup.clientWidth;
        // document.getElementById("storyname").innerHTML = buttonGroup.clientHeight;
    }else if(page=="selectPagea"){
        let packshower = document.getElementById("songspackshower");
        let packnamefont = document.getElementsByClassName("packtopt");
        let packtopstext = document.getElementsByClassName("packtopstext");
        let packtopatext = document.getElementsByClassName("packtopatext");
        if(packshower.clientWidth/packshower.clientHeight != baseElement["selectPage"]["packshower"][0]/baseElement["selectPage"]["packshower"][1]){
            packshower.style.height = packshower.clientWidth/baseElement["selectPage"]["packshower"][0]*baseElement["selectPage"]["packshower"][1].toString() + "px";
            for(let i=0;i<packnamefont.length;i++){
                packnamefont[i].style.fontSize = packshower.clientWidth/baseElement["selectPage"]["packshower"][0]*baseElement["selectPage"]["packname"].toString() + "px";
                packtopstext[i].style.fontSize = packshower.clientWidth/baseElement["selectPage"]["packshower"][0]*baseElement["selectPage"]["packstext"].toString() + "px";
                packtopatext[i].style.fontSize = packshower.clientWidth/baseElement["selectPage"]["packshower"][0]*baseElement["selectPage"]["packatext"].toString() + "px";
            }
        }else{
            packshower.style.height = "85%";
            packshower.style.width = "100%";
            for(let i=0;i<packnamefont.length;i++){
                packnamefont[i].style.fontSize = baseElement["selectPage"]["packname"].toString() + "px";
                packtopstext[i].style.fontSize = baseElement["selectPage"]["packstext"].toString() + "px";
                packtopatext[i].style.fontSize = baseElement["selectPage"]["packatext"].toString() + "px";
            }
        }
    }
}
function changeTopbar(){
    var i = 0;
}
function shutterResize(type){
    var width = document.getElementById("body").clientWidth;
    var height = document.getElementById("body").clientHeight;
    var aspectRatio = width/height;
    if(type==0){
        if(aspectRatio!=baseElement["shutter"]["ratio"]){
            shutterresizef(width/height, false);
        }else{
            shutterresizef(width/height, true);
        }
    }else if(type==1){
        if(aspectRatio!=baseElement["shutter"]["ratio"]){
            shutterresize(width/height, false);
        }else{
            shutterresize(width/height, true);
        }
    }else if(type==2){
        if(aspectRatio!=baseElement["shutter"]["ratio"]){
            shutterresizef(width/height, false);
        }else{
            shutterresizef(width/height, true);
        }
        document.getElementById("shutter").style.display = "none";
    }
    if(document.getElementById("shutter_song_shadow")!=null||document.getElementById("shutter_song_shadow")!=undefined){
        let c_w = document.getElementById("shutter_l_img").clientWidth;
        document.getElementById("shutter_song_shadow").style.width = (c_w - 23).toString() + "px";
    }
}
function shutterresizef(ratio, base){
    if(base){
        document.getElementById("shutter_l_img").style.height = baseElement["shutter"]["height"].toString() + "%";
        document.getElementById("shutter_r_img").style.height = baseElement["shutter"]["height"].toString() + "%";
    }else{
        document.getElementById("shutter_l_img").style.height = ratio/baseElement["shutter"]["ratio"]*baseElement["shutter"]["height"].toString() + "%";
        document.getElementById("shutter_r_img").style.height = ratio/baseElement["shutter"]["ratio"]*baseElement["shutter"]["height"].toString() + "%";
        // document.getElementById("appname").innerHTML = base/baseElement["shutter"]["ratio"]*baseElement["shutter"]["height"].toString() + "%";
    }
    document.getElementById("shutter_r").style.display = "block";
    document.getElementById("shutter_l").style.display = "block";
    document.getElementById("shutter").style.display = "block";
}
function shutterresize(ratio, base){
    if(base){
        document.getElementById("shutter_l_img").style.height = baseElement["shutter"]["height"].toString() + "%";
        document.getElementById("shutter_r_img").style.height = baseElement["shutter"]["height"].toString() + "%";
    }else{
        document.getElementById("shutter_l_img").style.height = ratio/baseElement["shutter"]["ratio"]*baseElement["shutter"]["height"].toString() + "%";
        document.getElementById("shutter_r_img").style.height = ratio/baseElement["shutter"]["ratio"]*baseElement["shutter"]["height"].toString() + "%";
    }
	
}