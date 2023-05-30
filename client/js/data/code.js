// 导入所需的CryptoJS文件
{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/pbkdf2.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/enc-base64.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/mode-cbc.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/pad-pkcs7.min.js"></script> */}
// 加密函数，使用AES算法对传入的文本进行加密
function encrypt(text, password) {
    var salt = CryptoJS.lib.WordArray.random(128/8); // 生成一个随机的盐
    console.log("salt=", JSON.stringify(salt).toString());
    let s = JSON.stringify(salt).toString();
    var key = CryptoJS.PBKDF2(password, JSON.parse(s), {
        keySize: 256/32, // 生成256位密钥
        iterations: 1000 // 迭代次数为1000
    });

    var iv = CryptoJS.lib.WordArray.random(128/8); // 生成一个随机的初始化向量
    console.log("iv=", JSON.stringify(iv).toString());
    var encrypted = CryptoJS.AES.encrypt(text, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC // CBC模式下进行加密
    });

    // 将盐和初始化向量合并到加密结果中
    var ciphertext = salt.toString()+ iv.toString() + encrypted.toString();
    return ciphertext;
}

// 解密函数，使用AES算法对传入的加密文本进行解密
function decrypt(ciphertext, password) {
    var salt = CryptoJS.enc.Hex.parse(ciphertext.substr(0, 32)); // 提取加密结果中的盐
    var iv = CryptoJS.enc.Hex.parse(ciphertext.substr(32, 32)); // 提取加密结果中的初始化向量
    var encrypted = ciphertext.substring(64); // 提取加密结果中的密文

    var key = CryptoJS.PBKDF2(password, salt, {
        keySize: 256/32, // 生成256位密钥
        iterations: 1000 // 迭代次数为1000
    });

    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC // CBC模式下进行解密
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
}

// 示例代码
// var text = 'hello world';
// var password = 'my secret password';
// var ciphertext = encrypt(text, password); // 加密
// var decrypted = decrypt(ciphertext, password); // 解密
// console.log('加密结果：' + ciphertext);
// console.log('解密结果：' + decrypted);
var BASE_CODE = "ABCDEFGHIGKLMNARCAEA20230423"; // 基础的加密字段
class Code{
    // code_0,1,2,3.js
    constructor(){}
    encryptByTime(text, password) {
        // 加密
        var salt = CryptoJS.lib.WordArray.random(128/8); // 生成一个随机的盐
        var key = CryptoJS.PBKDF2(password, salt, {
            keySize: 256/32, // 生成256位密钥
            iterations: 1000 // 迭代次数为1000
        });
        var iv = CryptoJS.lib.WordArray.random(128/8); // 生成一个随机的初始化向量
        var encrypted = CryptoJS.AES.encrypt(text, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC // CBC模式下进行加密
        });
        // 将盐和初始化向量合并到加密结果中
        var ciphertext = salt.toString()+ iv.toString() + encrypted.toString();
        return ciphertext;
    }
    decryptByTime(ciphertext, password) {
        // 解密
        var salt = CryptoJS.enc.Hex.parse(ciphertext.substr(0, 32)); // 提取加密结果中的盐
        var iv = CryptoJS.enc.Hex.parse(ciphertext.substr(32, 32)); // 提取加密结果中的初始化向量
        var encrypted = ciphertext.substring(64); // 提取加密结果中的密文
    
        var key = CryptoJS.PBKDF2(password, salt, {
            keySize: 256/32, // 生成256位密钥
            iterations: 1000 // 迭代次数为1000
        });
        var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC // CBC模式下进行解密
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
    encrypt(text, password) {
        // 加密
        var salt = CryptoJS.lib.WordArray.fix(128/8, true);
        var key = CryptoJS.PBKDF2(password, salt, {
            keySize: 256/32, // 生成256位密钥
            iterations: 1000 // 迭代次数为1000
        });
        var iv = CryptoJS.lib.WordArray.fix(128/8, false);
        var encrypted = CryptoJS.AES.encrypt(text, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC // CBC模式下进行加密
        });
        // 将盐和初始化向量合并到加密结果中
        var ciphertext = salt.toString()+ iv.toString() + encrypted.toString();
        return ciphertext;
    }
    decrypt(ciphertext, password) {
        // 解密
        var salt = CryptoJS.enc.Hex.parse(ciphertext.substr(0, 32)); // 提取加密结果中的盐
        var iv = CryptoJS.enc.Hex.parse(ciphertext.substr(32, 32)); // 提取加密结果中的初始化向量
        var encrypted = ciphertext.substring(64); // 提取加密结果中的密文
    
        var key = CryptoJS.PBKDF2(password, salt, {
            keySize: 256/32, // 生成256位密钥
            iterations: 1000 // 迭代次数为1000
        });
        var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC // CBC模式下进行解密
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}
class ArcaeaCode extends Code{
    // 界面需要进行加密的数据，通过此类进行加密解密
    constructor(){
        super();
    }
    dataEncrypt(text, password){
        return this.encrypt(text, password);
    }
    dataDecrypt(ciphertext, password){
        return this.decrypt(ciphertext, password);
    }
    dataEncryptByTime(text, password){
        return this.encryptByTime(text, password);
    }
    dataDecryptByTime(ciphertext, password){
        return this.decryptByTime(ciphertext, password);
    }
}
function testCode(){
    let a = new ArcaeaCode();
    let b = a.dataEncrypt("abc", BASE_CODE);
    console.log("加密"+b);
    let c = a.dataDecrypt(window.localStorage.getItem("seed"), BASE_CODE);
    console.log("解码"+c);
}