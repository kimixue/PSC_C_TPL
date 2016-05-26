// MVC

// 视图（View）：用户界面。
// 控制器（Controller）：业务逻辑
// 模型（Model）：数据保存


//Controller
var youqianACT = {
	init:function(){
		this.view.rule();
	}
};

//Model
youqianACT.model = {
	dialog:function(_id){
		
	}
};

//View
youqianACT.view = {
	rule:function(){
		$('.J-rule').on('click',function(){
			dialog('#J-ruleBox');
		})
	}
};

youqianACT.init();