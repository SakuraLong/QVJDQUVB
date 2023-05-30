/* 语言文件 */
var base_language_data = {
    "en":{
        "topbar":{
            "setting":"Setting",
            "frag":"Fragments",
            "memo":"Memories",
            "fragPrompt":{
                "title":"Fragments",
                "content":"Fragments are used to unlock new songs.<br>They are acquired as you play.",
                "answer":"OK"
            },
            "memoPrompt":{
                "title":"Memories",
                "content":"Memories are used to unlock new songs and packs.<br>You need to be online and signed in to use them.",
                "answer":"OK"
            },
            "settingPage":{
                "setting":"Setting",
                "done":"Done",
                "gameplay":"Gameplay",
                "audio":"Audio",
                "visual":"Visual",
                "gameplayPage":{
                    "pure":"Pure Late/Early",
                    "pureContent":"Enable to include<br>late/early 'Pure' timings",
                    "pureMsg":["Disabled", "Enabled"],
                    "note":"Note Speed",
                    "noteContent":"Control the speed at<br>which notes approach",
                    "skill":"Skill Display",
                    "skillContent":"Show Partner skill<br>before song start",
                    "skillMsg":["Enabled", "Disabled"]
                },
                "audioPage":{
                    "note":"Note Volume",
                    "noteContent":"Adjust the volume<br>of note sound effects",
                    "noteContentDisable":"Note sounds disabled<br>due to high offset",
                    "offset":"Offset",
                    "offsetContent":"Adjust the synchronization<br>of music",
                    "offsetRecommended":"Recommended:0",
                    "offsetSetup":"Setup",
                    "audio":"Audio Preset",
                    "audioContent":"Tap to switch preset<br>for audio setups",
                    "offsetPrompt":{
                        "title":"Offset Setup",
                        "content":{
                            "content":"Tap the button once on every 3rd Beat",
                            "tap":"Tap"
                        },
                        "answer":[["Start", "Restart"], ["Cancel", "Back", "Done"]],
                        "CancelPrompt":{
                            "title":"Warning",
                            "content":"Setup is not complete.Are you sure you want to cancel?",
                            "answer":["Yes", "No"]
                        }
                    }
                },
                "visualPage":{
                    "color":"Coloeblind Mode",
                    "colorContent":"Enable to change<br>Arc colors",
                    "colorMsg":["Disabled", "Enabled"],
                    "frpm":"FR/PM Indicator",
                    "frpmContent":"Adjust where the FR/PM<br>indicators display",
                    "frpmMsg":["Disable", "Top", "Combo"],
                    "lePos":"Late/Early Position",
                    "lePosContent":"Adjust the position of<br>late/early timing display",
                    "lePosMsg":["Middle", "Top", "Bottom"],
                    "performance":"Performance Mode",
                    "performanceContent":"Reduce Visual Effects<br>For low end devices",
                    "performanceMsg":["Disabled", "Enabled"],
                    "show":"Show Touches",
                    "showContent":"Display a visual effect<br>on screen touch",
                    "showMsg":["Disabled", "Enabled"]
                }
            }
        },
        "mainPage":{
            "play":"Music Play",
            "story":"Story Mode",
            "more":"More",
            "course":"Course Mode",
            "morePage":{
                "tutorial":"Tutorial",
                "language":"Language",
                "manage":"Manage Downloads",
                "prompt":{
                    "title":"Language",
                    "content":"<div class='prompt_language_text' onclick='changeLanguage(" + '"en"' +")'>English</div><div class='prompt_language_text' onclick='changeLanguage(" + '"zh-Hans"' +")'>中文（简体）</div>",
                    "answer":"Cancel"
                },
                "about":{
                    "title":"Producer Information",
                    "content":[
                        "Sakura 0000000<br>by 0000000<br>水木 0000000<br>dd 0000000<br>No.7 0000000"
                    ]
                }
            },
            "net":{
                "online":{
                    "add":"Add",
                    "profile":"Profile",
                    "cloud":"Cloud Sync",
                    "account":"Account Management",
                    "redeem":"Reddeem Code",
                    "y":"y",
                    "d":"d",
                    "h":"h",
                    "m":"m",
                    "now":"now",
                    "prompt":{
                        "title":"Account Management",
                        "content":"<div class='prompt_logout_button' onclick='accountLogout()'>Logout</div><div class='prompt_leave_button' onclick='accountDelete()'>Delete Account</div>",
                        "answer":"Cancel"
                    },
                    "deletePrompt":{
                        "title":"Delete Account",
                        "content":"English<br>中文（简体）需要修改",
                        "answerLeft":"Delete",
                        "answerRight":"Cancel"
                    },
                    "addFriendsPrompt":{
                        "title":"Add Friends",
                        "content":{
                            "content":"<div class='prompt_search_friend_class'>Friend ID:<input id='prompt_search_friend' type='input' placeholder='000000000' autocomplete='off'></div><div id='prompt_search_friend_alert'></div>",
                            "prompt":{
                                "input_prompt":"ID must be 9 digits.",
                                "repetition_prompt":"This is already your friend.",
                                "self_prompt":"You can't be friends with yourself;_;",
                                "exist_prompt":"This user does not exist.",
                                "error":"There was a problem while searching for friends."
                            }
                        },
                        "answerLeft":"Add",
                        "answerRight":"Cancel"
                    },
                    "deleteFriendPrompt":{
                        "title":"Confirmation",
                        "content":["Are you sure you want to remove '", "'?"],
                        "answer":["Delete", "Cancel"]
                    }
                },
                "offline":{
                    "login":"Login",
                    "register":"Register",
                    "content":"Login to get new packs,add friends<br>and use network features",
                    "loginPage":{
                        "login":"Login",
                        "loginError":{
                            "error":"There was a problem while accessing the server.",
                            "incorrect":"Username or password incorrect."
                        }
                    },
                    "registerPage":{
                        "password":"Password",
                        "passwordConfirm":"Password(confirm)",
                        "username":"Username",
                        "prompt":{
                            "title":"Terms of Service",
                            "content":"In order to use the Arcaea online services<br>you must read and agree to the following:<br><div><a href='http://www.baidu.com'>Terms of Service</a><a href='http://www.baidu.com'>Privacy Policy</a></div>",
                            "answerLeft":"I Agree",
                            "answerRight":"Decline"
                        },
                        "create":"Create Account",
                        "registerError":{
                            "error":"There was a problem while accessing the server.",
                            "repeat":"The user name already exists.",
                            "confirm":"The two passwords are different."
                        }
                    }
                }

            },
            "select":{
                "scenery":[
                    "Beginnins",
                    "Lost World",
                    "Outer Reaches",
                    "Spire of Convergence",
                    "Dormant Echoes",
                    "Boundless Divide",
                    "Forgotten Construct",
                    "Horizon of Anamnesis"
                ]
            }
        },
        "selectPage":{
            "back":"Back"
        },
        "scorePage":{
            "back":"Back",
            "share":"Share",
            "retry":"Retry",
            "prompt":{
                "title":"Error",
                "content":"There was a problem submitting this score online.",
                "answer":["Retry", "Ignore"]
            }
        }
    },
    "zh-Hans":{
        "topbar":{
            "setting":"设定",
            "frag":"残片",
            "memo":"记忆源点",
            "fragPrompt":{
                "title":"残片",
                "content":"残片可用于解锁新曲目<br>游戏中可以获得残片",
                "answer":"好的"
            },
            "memoPrompt":{
                "title":"记忆源点",
                "content":"记忆源点可用于解锁故事包<br>你需要登录来使用它们",
                "answer":"好的"
            },
            "settingPage":{
                "setting":"设置",
                "done":"完成",
                "gameplay":"玩法",
                "audio":"音频",
                "visual":"视觉",
                "gameplayPage":{
                    "pure":"纯粹 【过早/过晚】",
                    "pureContent":"开启后会在纯粹(Pure)时<br>显示【过早/过晚】",
                    "pureMsg":["关闭", "开启"],
                    "note":"音符流速",
                    "noteContent":"控制音符的下落速度",
                    "skill":"技能显示",
                    "skillContent":"在歌曲开始前<br>显示搭档技能",
                    "skillMsg":["显示", "关闭"]
                },
                "audioPage":{
                    "note":"音效音量",
                    "noteContent":"调整音符的音效音量",
                    "noteContentDisable":"因为偏移率过高，<br>音符音效已关闭",
                    "offset":"偏移率",
                    "offsetContent":"调整音乐的同步性",
                    "offsetRecommended":"建议:0",
                    "offsetSetup":"设定",
                    "audio":"音频预设",
                    "audioContent":"点击切换预设项目",
                    "offsetPrompt":{
                        "title":"偏移率设置",
                        "content":{
                            "content":"在每个第三拍点击按钮或者按下空格",
                            "tap":"点击"
                        },
                        "answer":[["开始", "重新开始"], ["取消", "返回", "完成"]],
                        "CancelPrompt":{
                            "title":"警告",
                            "content":"设置尚未结束。确定退出吗？",
                            "answer":["确定", "取消"]
                        }
                    }
                },
                "visualPage":{
                    "color":"色彩辅助",
                    "colorContent":"开启以改变<br>音弧配色",
                    "colorMsg":["关闭", "开启"],
                    "frpm":"FR/PM 指示灯",
                    "frpmContent":"调整FR/PM<br>指示灯的显示位置",
                    "frpmMsg":["关闭", "顶端", "连击数量"],
                    "lePos":"【过早/过晚】 位置",
                    "lePosContent":"调整【过早/过晚】<br>判定的显示位置",
                    "lePosMsg":["界面中央", "界面顶端", "界面底部"],
                    "performance":"低性能模式",
                    "performanceContent":"减少视觉特效<br>适用于入门级设备",
                    "performanceMsg":["关闭", "开启"],
                    "show":"触控显示",
                    "showContent":"显示屏幕的<br>触控视觉效果",
                    "showMsg":["关闭", "开启"]
                }
            }
        },
        "mainPage":{
            "play":"开始游戏",
            "story":"故事模式",
            "more":"其他",
            "course":"段位挑战",
            "morePage":{
                "tutorial":"教程",
                "language":"语言",
                "manage":"下载管理",
                "prompt":{
                    "title":"语言",
                    "content":"<div class='prompt_language_text' onclick='changeLanguage(" + '"en"' +")'>English</div><div class='prompt_language_text' onclick='changeLanguage(" + '"zh-Hans"' +")'>中文（简体）</div>",
                    "answer":"取消"
                },
                "about":{
                    "title":"制作人员信息",
                    "content":[
                        "Sakura 0000000<br>by 0000000<br>水木 0000000<br>dd 0000000<br>No.7 0000000"
                    ]
                }
            },
            "net":{
                "online":{
                    "add":"添加",
                    "profile":"档案",
                    "cloud":"云端同步",
                    "account":"账号管理",
                    "redeem":"兑换码",
                    "y":"年",
                    "d":"天",
                    "h":"小时",
                    "m":"分",
                    "now":"现在",
                    "prompt":{
                        "title":"账号管理",
                        "content":"<div class='prompt_logout_button' onclick='accountLogout()'>登出</div><div class='prompt_leave_button' onclick='accountDelete()'>删除账号</div>",
                        "answer":"取消"
                    },
                    "deletePrompt":{
                        "title":"删除账号",
                        "content":"English<br>中文（简体）需要修改",
                        "answerLeft":"删除",
                        "answerRight":"取消"
                    },
                    "addFriendsPrompt":{
                        "title":"添加好友",
                        "content":{
                            "content":"<div class='prompt_search_friend_class'>好友 ID:<input id='prompt_search_friend' type='input' placeholder='000000000' autocomplete='off'></div><div id='prompt_search_friend_alert'></div>",
                            "prompt":{
                                "input_prompt":"ID应为9位数字",
                                "repetition_prompt":"此用户已是好友",
                                "self_prompt":"你不能加自己为好友;_;",
                                "exist_prompt":"用户不存在",
                                "error":"查询好友时发生了错误"
                            }
                        },
                        "answerLeft":"添加",
                        "answerRight":"取消"
                    },
                    "deleteFriendPrompt":{
                        "title":"确认",
                        "content":["真的要将", "移出列表吗？"],
                        "answer":["删除", "取消"]
                    }
                },
                "offline":{
                    "login":"登入",
                    "register":"注册",
                    "content":"登录来获取新故事包、添加好友<br>或使用在线功能",
                    "loginPage":{
                        "login":"登入",
                        "loginError":{
                            "error":"访问服务器失败",
                            "incorrect":"用户名或密码错误"
                        }
                    },
                    "registerPage":{
                        "password":"密码",
                        "passwordConfirm":"确认密码",
                        "username":"用户名",
                        "prompt":{
                            "title":"服务条款",
                            "content":"如要享受韵律源点的网络相关服务，<br>您需要阅读并同意如下条款：<br><div><a href='http://www.baidu.com'>Terms of Service</a><a href='http://www.baidu.com'>Privacy Policy</a></div>",
                            "answerLeft":"同意",
                            "answerRight":"拒绝"
                        },
                        "create":"创建账号",
                        "registerError":{
                            "error":"访问服务器失败",
                            "repeat":"用户名已存在",
                            "confirm":"两次输入的密码不一致"
                        }
                    }
                }

            },
            "select":{
                "scenery":[
                    "起始之章",
                    "失落的世界",
                    "谜域的界外",
                    "聚合的塔尖",
                    "沉眠的回声",
                    "无央的决裂",
                    "遗忘的构念",
                    "回首的天际"
                ]
            }
        },
        "selectPage":{
            "back":"返回"
        },
        "scorePage":{
            "back":"返回",
            "share":"分享",
            "retry":"重试",
            "prompt":{
                "title":"错误",
                "content":"上传分数时发生了错误",
                "answer":["重试", "无视"]
            }
        }
    }
}
// 界面文字初始化
function elementLanguageInit(language, page){
    if(page=="mainPage"){
        document.getElementById("playname").innerHTML = base_language_data[language]["mainPage"]["play"];
        document.getElementById("storyname").innerHTML = base_language_data[language]["mainPage"]["story"];
        document.getElementById("morename").innerHTML = base_language_data[language]["mainPage"]["more"];
        document.getElementById("compositionname").innerHTML = base_language_data[language]["mainPage"]["course"];
        for(let i=0;i<=7;i++){
            document.getElementById("scenery"+i.toString()+"name").innerHTML = base_language_data[language]["mainPage"]["select"]["scenery"][i];
            document.getElementById("scenery"+i.toString()+"names").innerHTML = base_language_data[language]["mainPage"]["select"]["scenery"][i];
        }
        document.getElementById("movebtn1").innerHTML = base_language_data[language]["mainPage"]["morePage"]["tutorial"];
        document.getElementById("movebtn2").innerHTML = base_language_data[language]["mainPage"]["morePage"]["language"];
        document.getElementById("movebtn3").innerHTML = base_language_data[language]["mainPage"]["morePage"]["manage"];
        document.getElementById("friendbtn-one").firstChild.innerHTML = base_language_data[language]["mainPage"]["net"]["online"]["add"];
        document.getElementById("net-files").firstChild.innerHTML = base_language_data[language]["mainPage"]["net"]["online"]["profile"];
        document.getElementById("net-cloud").firstChild.innerHTML = base_language_data[language]["mainPage"]["net"]["online"]["cloud"];
        document.getElementById("num-manage").innerHTML = base_language_data[language]["mainPage"]["net"]["online"]["account"];
        document.getElementById("ex-code").innerHTML = base_language_data[language]["mainPage"]["net"]["online"]["redeem"];
        document.getElementById("user_log").firstChild.innerHTML = base_language_data[language]["mainPage"]["net"]["offline"]["login"];
        document.getElementById("user_sign").firstChild.innerHTML = base_language_data[language]["mainPage"]["net"]["offline"]["register"];
        document.getElementById("log-sign-remindtext1").firstChild.innerHTML = base_language_data[language]["mainPage"]["net"]["offline"]["content"];
        document.getElementById("logbtn").firstChild.innerHTML = base_language_data[language]["mainPage"]["net"]["offline"]["loginPage"]["login"];
        document.getElementById("account_button").firstChild.innerHTML = base_language_data[language]["mainPage"]["net"]["offline"]["registerPage"]["create"];
        document.getElementById("sign_password").setAttribute("placeholder", base_language_data[language]["mainPage"]["net"]["offline"]["registerPage"]["password"]);
        document.getElementById("sign_password_confirm").setAttribute("placeholder", base_language_data[language]["mainPage"]["net"]["offline"]["registerPage"]["passwordConfirm"]);
        document.getElementById("sign_username").setAttribute("placeholder", base_language_data[language]["mainPage"]["net"]["offline"]["registerPage"]["username"]);
        document.getElementById("more_about_text_title").innerHTML = base_language_data[language]["mainPage"]["morePage"]["about"]["title"];
        for(let i=0;i<base_language_data[language]["mainPage"]["morePage"]["about"]["content"].length;i++)
        document.getElementById("more_about_text_"+i.toString()).innerHTML = base_language_data[language]["mainPage"]["morePage"]["about"]["content"][i];
    }else if(page=="topbar"){
        document.getElementById("fragmentstext").innerHTML = base_language_data[language]["topbar"]["frag"];
        document.getElementById("memoriestext").innerHTML = base_language_data[language]["topbar"]["memo"];
        document.getElementById("settingtext").innerHTML = base_language_data[language]["topbar"]["setting"];
        document.getElementById("settingtext").setAttribute("data-text", base_language_data[language]["topbar"]["setting"]);
       try{
        document.getElementById("settingname").innerHTML = base_language_data[language]["topbar"]["settingPage"]["setting"];
        document.getElementById("tablabelplay").innerHTML = base_language_data[language]["topbar"]["settingPage"]["gameplay"];
        document.getElementById("tablabelmusic").innerHTML = base_language_data[language]["topbar"]["settingPage"]["audio"];
        document.getElementById("tablabelshow").innerHTML = base_language_data[language]["topbar"]["settingPage"]["visual"];
        document.getElementById("exitsetting").innerHTML = base_language_data[language]["topbar"]["settingPage"]["done"];
        document.getElementById("tabmsg_set_sheer_top").innerHTML = base_language_data[language]["topbar"]["settingPage"]["gameplayPage"]["pure"];
        document.getElementById("tabmsg_set_sheer_mid").innerHTML = base_language_data[language]["topbar"]["settingPage"]["gameplayPage"]["pureContent"];
        pure_option = base_language_data[language]["topbar"]["settingPage"]["gameplayPage"]["pureMsg"];
        document.getElementById("tabmsg_set_speed_top").innerHTML = base_language_data[language]["topbar"]["settingPage"]["gameplayPage"]["note"];
        document.getElementById("tabmsg_set_speed_mid").innerHTML = base_language_data[language]["topbar"]["settingPage"]["gameplayPage"]["noteContent"];
        document.getElementById("tabmsg_set_skill_top").innerHTML = base_language_data[language]["topbar"]["settingPage"]["gameplayPage"]["skill"];
        document.getElementById("tabmsg_set_skill_mid").innerHTML = base_language_data[language]["topbar"]["settingPage"]["gameplayPage"]["skillContent"];
        skill_display_option = base_language_data[language]["topbar"]["settingPage"]["gameplayPage"]["skillMsg"];
        document.getElementById("tabmsg_set_sound_top").innerHTML = base_language_data[language]["topbar"]["settingPage"]["audioPage"]["note"];
        document.getElementById("remindtxt1").innerHTML = base_language_data[language]["topbar"]["settingPage"]["audioPage"]["noteContent"];
        document.getElementById("remindtxt2").innerHTML = base_language_data[language]["topbar"]["settingPage"]["audioPage"]["noteContentDisable"];
        document.getElementById("tabmsg_set_offset_top").innerHTML = base_language_data[language]["topbar"]["settingPage"]["audioPage"]["offset"];
        document.getElementById("tabmsg_set_offset_mid").innerHTML = base_language_data[language]["topbar"]["settingPage"]["audioPage"]["offsetContent"];
        document.getElementById("remindtxt3").innerHTML = base_language_data[language]["topbar"]["settingPage"]["audioPage"]["offsetRecommended"];
        document.getElementById("suggestset").innerHTML = base_language_data[language]["topbar"]["settingPage"]["audioPage"]["offsetSetup"];
        document.getElementById("tabmsg_set_preinstall_top").innerHTML = base_language_data[language]["topbar"]["settingPage"]["audioPage"]["audio"];
        document.getElementById("tabmsg_set_preinstall_mid").innerHTML = base_language_data[language]["topbar"]["settingPage"]["audioPage"]["audioContent"];
        document.getElementById("tabmsg_set_colorsup_top").innerHTML = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["color"];
        document.getElementById("tabmsg_set_colorsup_mid").innerHTML = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["colorContent"];
        color_sup_option = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["colorMsg"];
        document.getElementById("tabmsg_set_FRPM_top").innerHTML = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["frpm"];
        document.getElementById("tabmsg_set_FRPM_mid").innerHTML = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["frpmContent"];
        FRorPM_option = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["frpmMsg"];
        document.getElementById("tabmsg_set_eaorla_top").innerHTML = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["lePos"];
        document.getElementById("tabmsg_set_eaorla_mid").innerHTML = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["lePosContent"];
        early_late_pos_option = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["lePosMsg"];
        document.getElementById("tabmsg_set_mode_top").innerHTML = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["performance"];
        document.getElementById("tabmsg_set_mode_mid").innerHTML = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["performanceContent"];
        low_performance_option = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["performanceMsg"];
        document.getElementById("tabmsg_set_touch_top").innerHTML = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["show"];
        document.getElementById("tabmsg_set_touch_mid").innerHTML = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["showContent"];
        touch_display_option = base_language_data[language]["topbar"]["settingPage"]["visualPage"]["showMsg"];
       }catch{
        
       }
    }else if(page=="scorePage"){
        document.getElementById("rbtext1").innerHTML = base_language_data[language]["scorePage"]["back"];
        document.getElementById("rbtext2").innerHTML = base_language_data[language]["scorePage"]["share"];
        document.getElementById("rbtext3").innerHTML = base_language_data[language]["scorePage"]["retry"];
    }else if(page=="selectPage"){
        document.getElementById("rbtext1").innerHTML = base_language_data[language]["selectPage"]["back"];
    }
}