!(function(root,fn){
    root.pageData = fn(root);
})(window,function(){
    var pageData = function(opts){
        var htmlList = '',
            htmlTemp = opts.id.html();

        if(opts.url){

        }else{

        };

        String.prototype.temp = function(obj) {
            return this.replace(/\{\w+\}/gi, function(matchs) {
                var returns = obj[matchs.replace(/[\{\}]/g, "")];
                return (returns + "") == "undefined"? "": returns;
            });
        };

        function dataPush(){
            opts.data.forEach(function(object) {
                htmlList += htmlTemp.temp(object);
            });

            opts.id.html(htmlList);

            try {
                isFunction(opts.callback) && opts.callback();
            } catch (e) {

            }
        };

        function isFunction(obj) {
            return typeof obj == 'function';
        }

        dataPush();
    };

    return pageData;
});