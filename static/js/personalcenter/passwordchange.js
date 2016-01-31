/*修改密码*/
$("#passwordchange").click(function() {
	showLoading();// 弹出正在提交的提示
	var user_oldPassword = $("#user_oldPassword").val();
	var user_password = $("#user_password").val();
	var user_passwordAgain = $("#user_passwordAgain").val();
	if (user_password != user_passwordAgain) {
		$("#user_waring").css("display", "block");
		$("#user_password_waring").text("两次输入的密码不一致，请重新输入！");
		return false;
	} else {
		$("#user_waring").css("display", "none");
		jQuery.ajax({
			type : "GET",
			async : true,
			data : {
				oldPassword : user_oldPassword,
				password : user_password,
				passwordAgain : user_passwordAgain
			},
			cache : false,
			datatype : "json",
			url : "/visitor/changePassword",
			success : function(result) {
				hideLoading();// 关闭正在提交的提示
				if (result.status == "success") {
					window.location.href = "/personalcenter/personalinfo-main.html";
				} else {
					dealFailedResponse(result);
				}
			},
			error : function(data) {
				hideLoading();// 关闭正在提交的提示
				alert("系统异常");
			}
		});
	}

});