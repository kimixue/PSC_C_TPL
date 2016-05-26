!(function(root,fn){
    root.timer = fn(root);
})(window,function(){

    window.everyTime = function(element,interval,fn){
        element.each(function(){
            timer.add($(this),interval,fn);
        })
    };

    window.oneTime = function(element,interval,fn){
        element.each(function(){
            timer.add($(this),interval,fn,1);
        })
    };

    window.stopTime = function(element){
        if(element.timers){
            window.clearInterval(element.timers);
            delete element.timers;
        }
    };

    var timer = {
        regexp:/^([0-9]+)\s*(.*s)?$/,
        t : 0,
        powers: {
            'ms': 1,
            'cs': 10,
            'ds': 100,
            's': 1000,
            'das': 10000,
            'hs': 100000,
            'ks': 1000000
        },
        timeParse:function(value){
            if(value == undefined || value ==null){
                return null;
            };

            var result = this.regexp.exec($.trim(value.toString()));

            if(result[2]){
                var num = parseInt(result[1],10);
                var mult = this.powers[result[2]] || 1;
                return num*mult;
            }else{
                return $.trim(value * 1000);
            }
        },
        add:function(element,interval,fn,time){

            var handler = function(){
                if(isFunction(fn)){
                    fn();
                }
            };

            $('#J-second-show s').html(timer.timeParse(interval)/1000);


            var setDate = function(){

                var intDiff = $('#J-second-show s').html();

                if(intDiff > 0){
                    intDiff--;
                    $('#J-second-show s').html(intDiff);
                    
                }else{
                    window.clearInterval(t);
                    try {
                        isFunction(fn) && fn();
                    } catch (e) {

                    }
                };

            };

            var handler=function(){
                console.log(12);
            };

            if(time){
                t = window.setInterval(setDate,1000);
            }else{
                timer.t = window.setInterval(handler,timer.timeParse(interval));
            }

        },
        remove:function(){

        }
    };

    function isFunction(obj) {
        return typeof obj == 'function';
    }

});