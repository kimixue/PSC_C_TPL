
/*!
 * PSC_ImgLoad v1.0.0
 * Licensed under MIT ()
 * Developer kimi
 */


/**
 * PSC_ImgLoad({
 * 	resources:[],  //需要预先加载的图片url
 * 	onStart:function(total){ //加载开始回调函数  加载的个数
 * 		
 * 	},
 * 	onProgress:function(current,total){
 * 		//正在加载回调函数
 * 		//currrnt 已经加载完成的个数
 * 		//total 加载文件的总个数
 * 	},
 * 	onComplete:function(total){
 * 		//加载完毕回调函数，传入参数total
 * 	}
 * })
 */

;(function(global,factory){
	if (typeof define === 'function' && define.amd) {
        //AMD
        define(factory);
    } else if (typeof exports === 'object') {
        //Node, CommonJS之类的
        module.exports = factory();
    } else {
        //浏览器全局变量(global 即 window)
        global.PSC_ImgLoad = factory(global);
    }
}(typeof window !== "undefined" ? window : this,function(){
	var isFunc = function(f){
        return typeof f === 'function';
    };

	var PSC_ImgLoad = function(config){
    	this.option = {
            resourceType : 'image', //资源类型，默认为图片
            baseUrl : './', //基准url
            resources : [], //资源路径数组
            onStart : null, //加载开始回调函数，传入参数total
            onProgress : null, //正在加载回调函数，传入参数currentIndex, total
            onComplete : null //加载完毕回调函数，传入参数total
        }
        if(config){
            for(i in config){
                this.option[i] = config[i];
            }
        }
        else{
            alert('参数错误！');
            return;
        }
        this.status = 0; //加载器的状态，0：未启动   1：正在加载   2：加载完毕
        this.total = this.option.resources.length || 0; //资源总数
        this.currentIndex = 0; //当前正在加载的资源索引

        return new PSC_ImgLoad.prototype.init();
    };

    PSC_ImgLoad.prototype = {
    	init:function(){
    		var _this = this;
    		_this.start();
    		return _this;
    	},
    	start:function(){
    		this.status = 1;
	        var _this = this;
	        var baseUrl = this.option.baseUrl;
	        for(var i=0,l=this.option.resources.length; i<l; i++){
	            var r = this.option.resources[i], url = '';
	            if(r.indexOf('http://')===0 || r.indexOf('https://')===0){
	                url = r;
	            }
	            else{
	                url = baseUrl + r;
	            }

	            var image = new Image();
	            image.onload = function(){_this.loaded();};
	            image.onerror = function(){_this.loaded();};
	            image.src = url;
	        }
	        if(isFunc(this.option.onStart)){
	            this.option.onStart(this.total);
	        }
    	},
    	loaded:function(){
    		if(isFunc(this.option.onProgress)){
	            this.option.onProgress(++this.currentIndex, this.total);
	        }
	        //加载完毕
	        if(this.currentIndex===this.total){  //检测加载的音乐文件数量等于
	            if(isFunc(this.option.onComplete)){
	                this.option.onComplete(this.total);
	            }
	        }
    	}

    };

    PSC_ImgLoad.prototype.init.prototype = PSC_ImgLoad.prototype;
    return PSC_ImgLoad();
});
