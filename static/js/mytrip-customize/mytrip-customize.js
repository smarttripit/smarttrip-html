var productType = $.getUrlParam('productType');
var productId = $.getUrlParam('productId');
// 提交团建定制需求
function submitCustomize() {
	var startPlace = $('#startPlace').val();
	var destination = $('#destination').val();
	var startDate = $('#startDate').val();
	var period = $('#period').val();
	var personCount = $('#personCount').val();
	var price = $('#price').val();
	var addition = $('#addition').val();
	var name = $('#name').val();
	var mobileNo = $('#mobileNo').val();
	var email = $('#email').val();
	var weixinNo = $('#weixinNo').val();
	if (startPlace == "") {
		alert("请输入您的出发地");
		return false;
	}
	if (destination == "") {
		alert("请输入您的目的地");
		return false;
	}
	if (startDate == "") {
		alert("请输入您的出发日期");
		return false;
	}else if(!isdate(startDate)){
		alert("出发时间格式不正确");
		return false;
	}
	if (period == "") {
		alert("请输入您的出游天数");
		return false;
	}else if(period.length > 2 || !isint(period)){
		alert("出游天数只能是整数，且不能大于99");
		return false;
	}
	if (personCount == "") {
		alert("请输入您的出游人数");
		return false;
	}else if(personCount.length > 3 || !isint(personCount)){
		alert("出游人数只能是整数，且不能大于999");
		return false;
	}
	if (price == "") {
		alert("请输入您的人均预算");
		return false;
	}else if(!isnumber(price)){
		alert("人均预算只能是小数或整数");
		return false;
	}
	if (name == "") {
		alert("请输入您的姓名");
		return false;
	}
	if (mobileNo == "") {
		alert("请输入您的手机号");
		return false;
	}
	if (email == "") {
		alert("请输入您的邮箱");
		return false;
	}

	jQuery.ajax({
		type : "GET",
		async : true,
		cache : false,
		datatype : "json",
		url : "/customization/create",
		data : {
			"productType":productType,
			"productId":productId,
			"startPlace" : startPlace,
			"destination" : destination,
			"startDate" : startDate,
			"period" : period,
			"personCount" : personCount,
			"price":price,
			"addition":addition,
			"name":name,
			"mobileNo":mobileNo,
			"email":email,
			"weixinNo":weixinNo
		},
		success : function(result) {
			if (result.status == "success") {
				alert("您的团建定制需求已经提交，我们会尽快联系您的！");
				window.location.href = "/route/route.html";
			} else {
				dealFailedResponse(result);
			}
		},
		error : function(data) {
			alert("系统异常");
		}
	});
}