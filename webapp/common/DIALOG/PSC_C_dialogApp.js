(function(){
    var dialog = {
        init:function(){

        },
        show:function(opts){
            var _id = function(){
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

            console.log(_id());

            if(opts.type == 'alert'){

            }else if(opts.type == 'tab'){

            }
        },
        hide:function(){

        }
    };
    dialog.init();
    window.dialog = dialog;
})();



// page:['home','page-oldUser']


//记录home位置

