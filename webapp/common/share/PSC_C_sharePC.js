(function(){
    function fShareQQZone() {
        var data = $.extend({},window.shareConfig).
                sUrl = data['sUrl'],
            sTitle = data['sTitle'],
            sSummary = data['sSummary'],
            sPic = data['sPicZone'],
            NewUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + encodeURIComponent(sUrl) +
                '&summary=' + encodeURIComponent(sSummary) +
                '&title=' + encodeURIComponent(sTitle) +
                '&pics=' + encodeURIComponent(sPic);
        window.open(NewUrl);
    }
    function fShareWeibo() {
        var data = $.extend({},window.shareConfig),
            sUrl = data['sUrl'],
            sDesc = data['sDesc'],
            sTitle = data['sTitle'],
            sPic = data['sPicWb'],
            sAppkey = '2400401496',
            NewUrl = 'http://service.weibo.com/share/share.php?title=' + encodeURIComponent(sDesc + sUrl) +
                '&appkey=' + encodeURIComponent(sAppkey) +
                '&pic=' + encodeURIComponent(sPic);
        window.open(NewUrl);
    }

    window.WeiXin = function(boxId,_url){
        var _img = '<img src="http://s.jiathis.com/qrcode.php?url=' + encodeURIComponent(_url) + '" alt="二维码加载失败...">',
            _id = function(){
                if(typeof opts.id == 'string'){
                    if(/\^[.#]/g.test(opts.id)){
                        console.log(opts.id);
                        return $(opts.id);
                    }else{
                        console.log(opts.id);
                        return $('#' + opts.id);
                    }
                }else{
                    return opts.id;
                }
            };

        _id.html(_img);
    };

    $('.J_share').click(function(){
        if($(this).hasClass('J_zone')) fShareQQZone();
        else fShareWeibo()
    });

    $('.J-copyMes').on('click',function(){
        var mes = $(this).attr('data-copy');
        window.clipboardData.setData("Text",mes);
    });

})();
