// 内部只有一个类：jsonReader
// 初始化入参(jsonPath, json, gbk=18010)
// 入参：文件路径, json文件, gbk为打开json的编码（编码是否是这个不太记得了反正是180开头的一个；不确定打开json需要还是不需要，python需要）

// let { readFile, writeFile,truncate } = require('fs')

class jsonReader{
    jsonpath=null;
    jsonfile="none";
    json_loaded = false;
    constructor(jsonpath=false,jsonfile=false) {
        if(jsonpath){
            this.jsonpath = String(jsonpath);
            this.jsonfile = "none";
            // this.jsonfile = this.readFiles(this.jsonpath);
            this.readFiles();
            //this.flag=1;
            
            this.flag=0;
        }
        else if(jsonfile){
            this.jsonfile= JSON.parse(String(jsonfile));
            this.flag=0;
        }
        else{
            console.log("false");
            return false;
        }
    }
    //输出测试，请务在意
    test(){
        //console.log(this.jsonpath);
        console.log("___________________________________");
        console.log(this.jsonfile);
        console.log("___________________________________");
    }

    readFiles(){
        // const fs = require('fs');
        // let rawdata = fs.readFileSync(jsonpath);
        // let jsonfile = JSON.parse(rawdata);
        // console.log(this.jsonpath);
        // console.log(jsonfile["l"]);
        // console.log(jsonfile["l"][0]);
        var url = this.jsonpath/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        var request = new XMLHttpRequest();
        let jsonfile_f = NaN;
        request.open("get", this.jsonpath, true);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        let this_ = this;
        request.onload = (function(this_){
            return function(){
                if (request.status == 200 && request.readyState == 4) {/*返回状态为200，即为数据获取成功*/
                    jsonfile_f = JSON.parse(request.responseText);
                    // for(var i=0;i<jsonfile.length;i++){
                    //     console.log(jsonfile[i].name);
                    // }
                    this_.jsonfile = jsonfile_f;
                    this_.json_loaded = true;
                }
            }
        })(this_);
    }

    add(list=NaN,json){
        if(this.flag){
            readFile(this.jsonpath, 'utf-8', (err, data) => {
                if (err) throw err
                let res = JSON.parse(data)
                let midarray=new Array()
                if(!list){
                    var keys = Object.keys(json);
                    for(var i = 0, len = keys.length; i < len; i++) {
                        res[keys[i]]=json[keys[i]];
                    }
                    console.log(res)
                    console.log("这里执行了")
                }
                else{
                    midarray.push(res);
                    for(var i = 0, len = list.length; i < len; i++) {
                        midarray.push(midarray[i][list[i]])
                    };
                    var keys = Object.keys(json);
                    for(var i = 0, len = keys.length; i < len; i++) {
                        midarray[midarray.length-1][keys[i]]=json[keys[i]];
                    }
                    // for(var i = 0, len = midarray.length; i < len; i++) {
                    //     console.log(midarray[i]);
                    // }
                    console.log(midarray[0]);
                    res=midarray[0];
                }
                //写入到json文件中 --> 需要把res转为字符串写入到json文件
            writeFile(this.jsonpath, JSON.stringify(res), err => {
                    if (err) throw err
                    console.log('添加成功')
                })
            })
            this.jsonfile=this.readFiles(this.jsonpath);
        }
        else{
            let res = this.jsonfile;
            let midarray=new Array()
            if(!list){
                var keys = Object.keys(json);
                for(var i = 0, len = keys.length; i < len; i++) {
                    res[keys[i]]=json[keys[i]];
                }
                console.log(res)
                console.log("这里执行了")
            }
            else{
                midarray.push(res);
                for(var i = 0, len = list.length; i < len; i++) {
                    midarray.push(midarray[i][list[i]])
                };
                var keys = Object.keys(json);
                for(var i = 0, len = keys.length; i < len; i++) {
                    midarray[midarray.length-1][keys[i]]=json[keys[i]];
                }
                // for(var i = 0, len = midarray.length; i < len; i++) {
                //     console.log(midarray[i]);
                // }
                console.log(midarray[0]);
            }
        }
        
    }

    find(list=NaN){
        if(!list){
            console.log(this.jsonfile);
            return this.jsonfile;
        }
        else{
            let res = this.jsonfile;
            let midarray=new Array();
            midarray.push(res);
            try{
                for(var i = 0, len = list.length; i < len; i++) {
                    midarray.push(midarray[i][list[i]])
                };
            }catch(error){
                console.log("find false");
                return false;
            }
            if(midarray[midarray.length-1]==undefined){
                return false;
            }else{
                return midarray[midarray.length-1]
            }
        }
    }

    modify(list,key){
        if(this.flag){
            readFile(this.jsonpath, 'utf-8', (err, data) => {
                if (err) throw err
                let res = JSON.parse(data)
                let midarray=new Array()
                midarray.push(res);
                try{
                    for(var i = 0, len = list.length; i < len; i++) {
                        midarray.push(midarray[i][list[i]])
                    };
                }catch(error){
                    console.log("find false");
                    return false;
                }
                midarray[midarray.length-1]=key;
                for(var i = midarray.length-2; i >0; i--) {
                    midarray[i][list[i]]=midarray[i+1]
                }
                res=midarray[0];
                writeFile(this.jsonpath, JSON.stringify(res), err => {
                    if (err) throw err
                    console.log('修改成功')
                })
            })
            this.jsonfile = this.readFiles(this.jsonpath);
        }
        else{
                let midarray=new Array()
                midarray.push(this.jsonfile);
                try{
                    for(var i = 0, len = list.length; i < len; i++) {
                        midarray.push(midarray[i][list[i]])
                    };
                }catch(error){
                    console.log("find false");
                    return false;
                }
                midarray[midarray.length-1]=key;
                for(var i = midarray.length-2; i >0; i--) {
                    midarray[i][list[i]]=midarray[i+1]
                }
                this.jsonfile=midarray[0];
        }
        return true
    }

    delete(list){
        if(this.flag){
            readFile(this.jsonpath, 'utf-8', (err, data) => {
                if (err) throw err
                let res = JSON.parse(data)
                let midarray=new Array()
                midarray.push(res);
                try{
                    for(var i = 0, len = list.length; i < len; i++) {
                        midarray.push(midarray[i][list[i]])
                    };
                }catch(error){
                    console.log("find false");
                    return false;
                }
                delete midarray[midarray.length-2][list[list.length-1]];
                // for(var i=0,len=midarray.length;i<len;i++){
                //     console.log(midarray[i])
                // }
                //console.log(midarray[0])
                // for(var i = midarray.length-2; i >0; i--) {
                //     midarray[i][list[i]]=midarray[i+1]
                // }
                res=midarray[0];
                console.log(res);
                var jsonpath=this.jsonpath;
                truncate(jsonpath, 0, function(){
                    console.log('done')
                    writeFile(jsonpath,JSON.stringify(res), err => {
                        if (err) throw err
                        console.log('删除成功')
                    })
                })
            })    
            this.jsonfile = this.readFiles(this.jsonpath); 
        }else{
            let midarray=new Array()
            midarray.push(this.jsonfile);
            try{
                for(var i = 0, len = list.length; i < len; i++) {
                    midarray.push(midarray[i][list[i]])
                };
            }catch(error){
                console.log("find false");
                return false;
            }
            delete midarray[midarray.length-2][list[list.length-1]];
            this.jsonfile=midarray[0];
        }
        return true
    }

    compare(list, key){
        var jsonfile=this.jsonfile;
        var index=[];
        for(var i=0,len=jsonfile[list[0]].length;i<len;i++){
            // console.log(jsonfile[list[0]][i][list[1]]);
            if(jsonfile[list[0]][i][list[1]]==key){
                index.push(i);
            };
        };
        // console.log(index);
        //console.log(midarray[midarray.length-2]);
        return index;
    }

    index(index){
        var num=index;
        var jsonfile=this.jsonfile;
        var x;
        for (x in jsonfile) {
            if(jsonfile[x][num]!=undefined){
                console.log(jsonfile[x][num]);
                return jsonfile[x][num];
            }
        }
        console.log(false);
        return false;
    }

    backJson(){
        return this.jsonfile;
        // console.log(this.jsonfile);
    }

    onready(){
        return this.json_loaded;
    }
}
//jsonReader=new jsonReader('input.json');
//jsonReader.test();
//jsonReader.compare(["songs","a"], "apple2");
//jsonReader.index(2);
// jsonReader.find(['l',0,'a'])
// jsonReader.modify(['l',0,'a'],"xiaosiwole")
// jsonReader.delete(['l',0,'b'])
// jsonReader.test();
