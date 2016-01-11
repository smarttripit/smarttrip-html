// 弹出登录模态框
function needLogin(){
	$('#loginModal').modal('show');
}

function dealFailedResponse(result){
	if(result.tipCode == "notLogin"){
    	needLogin();
    }else{
    	alert(result.tipMsg);
    }
}

// 根据url中的参数名称获取参数值
(function($) {
	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	}
})(jQuery);