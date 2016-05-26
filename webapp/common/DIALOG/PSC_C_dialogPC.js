!(function(){
    var dialog = {
        init:function(){
            var self = this;
            //创建mask
            var maskBg = '<div class="m-mask J-maskBg"></div>';
            this.add('.m-mask',{
                'width':'100%',
                'height':'100%',
                'position':'fixed',
                'background-color':'#000',
                'opacity': 0.5,
                'z-index':2
            });

            $('body').append(maskBg);
        },
        show:function(opts){
            var self = this;
            var winH = $(window).height(),
                winW = $(window).width(),
                winB = opts.class || $('.J-dialog'),
                id = function(){
                    if(typeof opts.id == 'string'){
                        if(/\^[.#]/g.test(opts.id)){
                            return $(opts.id);
                        }else{
                            return $('#' + opts.id);
                        }
                    }else{
                        return opts.id;
                    }
                };
            var boxH = id().height(),
                boxW = id().width(),
                left = (winW-boxW)/ 2 +'px',
                top = (winH-boxH)/2 +'px';

            if(id().attr('class').match('m-pop-top') || id().attr('class').match('m-pop-center')){
                return;
            }else{
                if(left < 0){
                    self.add('.m-pop-top',{
                        'position':'fixed',
                        'top':0,
                        'left':left,
                        'z-index':3,
                        'display':'block'
                    });
                    id().addClass('m-pop-top');
                }else{
                    self.add('.m-pop-center',{
                        'position':'fixed',
                        'top':top,
                        'left':left,
                        'z-index':3,
                        'display':'block'
                    });
                    id().addClass('m-pop-center');
                }
            };

            self.animation.show(id(),opts.showAnima);
            opts['closeId'].on('click',function(){
                if(opts['closeFn']){
                    $('.J-maskBg').css('z-index',4);
                    opts.closeFn();
                }else{
                    self.hide(id(),opts['hideAnima']);
                }
            });

            self.clearData();
        },
        hide:function(obj,anima){
            var self = this;
            self.animation.hide(obj,anima);
        },
        add:function(ele,styles){ //动态添加样式
            var str = '',
                styleObj = '',
                tag = document.createElement('style'),
                eleTag = ele.replace(/\"/g,"");

            for(var i in styles){
                if(styles.hasOwnProperty(i)){
                    styleObj += i+':'+styles[i] + ';';
                }
            };

            str = eleTag + '{' + styleObj + '}';
            if(tag.stylesheet){
                tag.stylesheet.cssText = str;
            }else{
                tag.innerHTML = str;
            };

            if(document.getElementsByTagName('style')[0]){
                document.getElementsByTagName('style')[0].innerHTML += str;
            }else{
                document.getElementsByTagName('head')[0].appendChild(tag);
            }

        },
        clearData:function(){
            $('input[type="text"]').val();
            $('.J-error').html('');
        },
        animation:{
            show:function(obj,anima){
                if(anima){
                    obj.addClass(anima);
                }
            },
            hide:function(obj,anima){
                if(anima){
                    obj.addClass(anima);
                }else{
                    obj.hide();
                    $('.J-maskBg').css('z-index',2).hide();
                }
            }
        }
    };

    dialog.init();
    window.dialog = dialog;
})();