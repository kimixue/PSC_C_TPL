
(function(){
    var  _ua =navigator.userAgent.toLowerCase();
    if(/mailmaster/.test(_ua) || /mailmasterpro/.test(_ua) || /mailmaster_android_mobile/.test(_ua) || /mailmaster_android_pad/.test(_ua)){
        $('.J-masterShare').on('click',function(){
            window.appHost.invoke("share", {
                default: {
                    shareTitle: window.shareConfig.title,
                    shareContent: window.shareConfig.desc,
                    shareUrl: window.shareConfig.url,
                    thumbUrl: window.shareConfig.img
                },
                list: [
                    {type: "WeiXinFriend"},
                    {type: "WeiXinTimeline"},
                    {
                        type: "WeiBo",
                        data: {
                            shareTitle: window.shareConfig.title,
                            shareContent: window.shareConfig.desc,
                            shareUrl: window.shareConfig.url,
                            thumbUrl: window.shareConfig.wbpic || window.shareConfig.img
                        }
                    },
                    {type: "QQFriend"},
                    {type: "QQZone"},
                    {type: "YiXinFriend"},
                    {type: "YiXinTimeline"}
                ]
            },function (result){
                try {
                    isFunction(window.shareConfig.callback) && window.shareConfig.callback();
                } catch (e) {

                }
            });
        })
    }

    if(/moneykeeper/.test(_ua)){
        var oHead = document.getElementsByTagName('head')[0];
        var oScript= document.createElement("script");
        oScript.type = "text/javascript";
        oScript.src="http://mimg.127.net/pub/common/js/appHost_mk_version_1.0.0.js";
        oHead.appendChild( oScript);

        $('.J-moneyShare').on('click',function(){
            window.appHost.invoke('socialShare',
                {'content':{
                    'panelTitle':'网易旗下专业金融',
                    'subject':window.shareConfig.title,
                    'description':window.shareConfig.desc,
                    'imageUrl':window.shareConfig.img,
                    'link':window.shareConfig.url
                },
                    'actionList':[{'name':'deleteAll','value':1}],supportList:["wechatFriend", "wechatPengYouQuan", "yixinFriend", "yixinPengYouQuan", "weibo","qzone"]}
            );
        })
    }

    if(/yanxuan/.test(_ua)){
        document.addEventListener("NEJsbridgeReady",shareOnYX,false)
    } else if (typeof window.WeixinJSBridge == "object" || typeof window.YixinJSBridge == "object") {
        WXReadyFn();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", WXReadyFn, false);
            document.addEventListener("YixinJSBridgeReady", WXReadyFn, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", WXReadyFn);
            document.attachEvent("YixinJSBridgeReady", WXReadyFn);
            document.attachEvent("onWeixinJSBridgeReady", WXReadyFn);
            document.attachEvent("onYixinJSBridgeReady", WXReadyFn);
        }
    }

    function shareOnYX(){
        NEJsbridge.call("setShareParams", "{'title':'" + (window.shareConfig.timeline_title ? window.shareConfig.timeline_title : window.shareConfig.title) + "','content':'" + window.shareConfig.desc + "','imageUrl':'" + window.shareConfig.img + "','topicId':" + (window.shareConfig.topicId % 1 !== 0 ?  window.shareConfig.topicId : new Date().getTime()) + "}")
        window.setShareToSNSCallback = function(successOrNot, shareToWhichSNS){
            try {
                isFunction(window.shareConfig.callback) && window.shareConfig.callback(successOrNot, shareToWhichSNS);
            } catch (e) {

            }
        }
    }

    function isFunction(obj) {
        return typeof obj == 'function';
    }

    function WXReadyFn() {
        window.YixinJSBridge = window.WeixinJSBridge || window.YixinJSBridge;
        try {
            YixinJSBridge.on("menu:share:timeline", function(argv) {
                YixinJSBridge.invoke("shareTimeline", {
                    "img_url": window.shareConfig.img,
                    "img_width": 55,
                    "img_height": 55,
                    "link": window.shareConfig.url,
                    "desc": window.shareConfig.desc,
                    "title": window.shareConfig.timeline_title?window.shareConfig.timeline_title:window.shareConfig.title
                }, function() {
                    try {
                        isFunction(window.shareConfig.callback) && window.shareConfig.callback();
                    } catch (e) {
                    }
                },function(){});
            });
            if (/android/i.test(navigator.userAgent)) {
                YixinJSBridge.on("menu:share:weibo", function() {
                    YixinJSBridge.invoke("shareWeibo", {
                        "url": isFunction(window.shareConfig.url) ? window.shareConfig.url(2) : window.shareConfig.url,
                        "content": window.shareConfig.title + ':' + window.shareConfig.desc
                    }, function() {
                        try {
                            isFunction(window.shareConfig.callback) && window.shareConfig.callback();
                        } catch (e) {

                        }
                    });
                });
            } else {
                YixinJSBridge.on("menu:share:weibo", function() {
                    YixinJSBridge.invoke("shareWeibo", {
                        "img_url": window.shareConfig.img,
                        "img_width": 55,
                        "img_height": 55,
                        "url": isFunction(window.shareConfig.url) ? window.shareConfig.url(2) : window.shareConfig.url,
                        "content": window.shareConfig.wContent
                    }, function() {
                        try {
                            isFunction(window.shareConfig.callback) && window.shareConfig.callback();
                        } catch (e) {

                        }
                    });
                });
            }
            YixinJSBridge.on("menu:share:appmessage", function() {
                YixinJSBridge.invoke("sendAppMessage", {
                    "img_url": window.shareConfig.img,
                    "img_width": 55,
                    "img_height": 55,
                    "link": isFunction(window.shareConfig.url) ? window.shareConfig.url(3) : window.shareConfig.url,
                    "desc": window.shareConfig.desc,
                    "title": window.shareConfig.title
                }, function() {
                    try {
                        isFunction(window.shareConfig.callback) && window.shareConfig.callback();
                    } catch (e) {

                    }
                });
            });
            isFunction(window.shareConfig.readycallback) && window.shareConfig.readycallback();
        } catch (e) {}
    }

})();