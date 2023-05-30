class txtReader{
    txtdata;
    txtBack1=[];//返回的数组
    txtBack2=[];//返回的数组
    //返回文件中"-"出现之后的所有行,按照列表（数组）返回,不存在返回空列表
    readLines(){
        var allow= false;
        var txtt=[];
        this.txtBack2 = [];
        txtt=this.txtdata.split("\n");
        txtt.forEach((item, index) => {
            txtt[index] = item.toString().replace('\r', "");
        });
        txtt.forEach((item)=>{
            if(allow) this.txtBack2.push(item);
            if(item=="-") allow=true;
        });
        return this.txtBack2;
    }
    //返回文件中"-"出现之前的所有行,按照列表（数组）返回,不存在返回空列表
    readConfig(){
        var allow = true;
        var txtt=[];
        this.txtBack1 = [];
        txtt=this.txtdata.split("\n");
        txtt.forEach((item, index) => {
            txtt[index] = item.toString().replace('\r', "");
        });
        txtt.forEach((item)=>{
            if(item=="-") allow = false;
            if(allow) this.txtBack1.push(item);
        });
        return this.txtBack1;
    }
    //按照list中的内容完全重写txt 成功重写返回true,失败重写返回false
    rewrite(list){
        var i = 0;
        this.txtdata="";
        var txtt=[];
        txtt=list.split("\n");
        while (txtt[i]!=""){
            this.txtdata+=txtt[i];
            i++;
        }
    }
    onready(){
        return this.txt_loaded;
    }
    constructor(txtPath){
        this.txt_loaded = false;
        this.txtPath=txtPath;
        var fso=new XMLHttpRequest();
        fso.open("GET",this.txtPath,false);
        console.log(this.txtPath);
        //fso.overrideMimeType("text/html;charset=utf-8");
        fso.send(null);
        let this_ =this;
        let timer = setInterval(()=>{
            let d = fso.responseText;
            if(d!=undefined||d!=null){
                this_.txtdata=fso.responseText.toString();
                this_.txt_loaded = true;
                // console.log(this_.txtdata);
                clearInterval(timer);
            }
            // console.log(d);
        }, 50);
    }
};




function test(){
    /* 测试函数 */
    let path = "test.txt";
    let txtreader = new textReader(path);
    document.getElementById("div1").innerHTML = txtreader.readLines();
    document.getElementById("div2").innerHTML = txtreader.readConfig();
}