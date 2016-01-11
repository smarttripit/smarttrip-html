$(document).ready(function() {
	judgeHasLogin();// 判断是否已经登录

});

// 判断是否已经登录
function judgeHasLogin(){
	$.ajax({
	    type: "GET",
	    cache: false,
	    url: "/visitor/hasLogin",
	    dataType: "json",
	    success: function(result){
	               if(result.status == 'success'){
	            	   $("#li_login").replaceWith("<a href='/personalcenter/personalcenter.html'>" + result.data.userName + "</a>");
	            	   $("#li_register").replaceWith("<a href='/visitor/logout'>退出</a>");
	               }
	               $("#li_login").removeClass("nodi").addClass("db");
	        	   $("#li_register").removeClass("nodi").addClass("db");
	             }
  });
}


            
function send(oform,elemen){
  /**当手机号码输入正确时才能发送验证码，并且60秒后才能重发**/
  if (($(oform).validate().element($(elemen)))&&(!($(elemen).val()==""))&&($('.div-phone span').html()=="发送验证码")) {
    var time = 60;
    //验证手机号是否已经被注册
 $.ajax({
     type: "GET",
     cache: false,
     url: "/visitor/isMobileNoRegister",
     data: {mobileNo:$(elemen).val()},
     dataType: "json",
     success: function(data){
                if(data.status == 'success'){
                    //手机号未被注册，则发送验证码
                    timeCountDown();
                    
               $.ajax({
                   type: "GET",
                   cache: false,
                   url: "/authCode/send",
                   data: {mobileNo:$(elemen).val()},
                   dataType: "json",
                   success: function(data){
                              if(data.status == 'success'){
                                
                              }else{
                    alert(data.tipMsg);
                              };
                            }
               });
                }else{
      alert(data.tipMsg);
                };
              }
   });
    
    
    function timeCountDown(){
      if(time==0){
        clearInterval(timer);
        $('.div-phone span').html("发送验证码");
        
        return true;
      }
      $('.div-phone span').html(time+"S后再次发送");
      time--;
      return false;
      
    }
    //timeCountDown();
    var timer = setInterval(timeCountDown,1000);
  }
};


/**$('#password').keyup(function () { 
  var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g"); 
  var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g"); 
  var enoughRegex = new RegExp("(?=.{6,}).*", "g"); 

  if (false == enoughRegex.test($(this).val())) { 
    $("#level").html("密码过短");
     
     //密码小于六位的时候，密码强度图片都为灰色 
  } 
  else if (strongRegex.test($(this).val())) { 
    
    $('#level').html("强");
     //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强 
  } 
  else if (mediumRegex.test($(this).val())) { 
    $("#level").html("中");
   
     //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等 
  } 
  else { 
    $("#level").html("弱");
    
     //如果密码为6为及以下，就算字母、数字、特殊字符三项都包括，强度也是弱的 
  } 
  return true; 
});**/
    /**手机号验证**/
    jQuery.validator.addMethod("mobile", function (value, element) {
        var mobile = /^1[3|4|5|7|8]\d{9}$/;
      return this.optional(element) || (mobile.test(value));

    }, "手机号码格式不正确");
    /**登录名验证**/
    jQuery.validator.addMethod("NameMobileEmail", function (value, element) {
        var user =  /^[a-zA-Z]\w{5,17}$/;
        var mobile1 = /^1[3|4|5|7|8]\d{9}$/;
        var email1 =  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      return this.optional(element) || (mobile1.test(value)||(email1.test(value)||(user.test(value))));
    }, "请输入正确的用户名/手机号/邮箱");


    /**注册名验证（只能为数字字母下划线）**/
    jQuery.validator.addMethod("username_test", function (value, element) {
        var user =  /^[a-zA-Z0-9_]+$/;
        
      return this.optional(element) || (user.test(value));
    }, "用户名只能为数字字母下划线");


    /**身份证号验证**/
    jQuery.validator.addMethod("isIdCardNo", function (value, element) {
            return this.optional(element) || isIdCardNo(value);
        }, "请正确输入您的身份证号码");
    
    function isIdCardNo(num) {
        var factorArr = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
        var parityBit = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
        var varArray = new Array();
        var intValue;
        var lngProduct = 0;
        var intCheckDigit;
        var intStrLen = num.length;
        var idNumber = num;
        // initialize
        if ((intStrLen != 15) && (intStrLen != 18)) {
            return false;
        }
        // check and set value
        for (i = 0; i < intStrLen; i++) {
            varArray[i] = idNumber.charAt(i);
            if ((varArray[i] < '0' || varArray[i] > '9') && (i != 17)) {
                return false;
            } else if (i < 17) {
                varArray[i] = varArray[i] * factorArr[i];
            }
        }
        if (intStrLen == 18) {
            //check date
            var date8 = idNumber.substring(6, 14);
            if (isDate8(date8) == false) {
                return false;
            }
            // calculate the sum of the products
            for (i = 0; i < 17; i++) {
                lngProduct = lngProduct + varArray[i];
            }
            // calculate the check digit
            intCheckDigit = parityBit[lngProduct % 11];
            // check last digit
            if (varArray[17] != intCheckDigit) {
                return false;
            }
        }
        else {        //length is 15
            //check date
            var date6 = idNumber.substring(6, 12);
            if (isDate6(date6) == false) {
                return false;
            }
        }
        return true;
    }
    function isDate6(sDate) {
        if (!/^[0-9]{6}$/.test(sDate)) {
            return false;
        }
        var year, month, day;
        year = sDate.substring(0, 4);
        month = sDate.substring(4, 6);
        if (year < 1700 || year > 2500) return false
        if (month < 1 || month > 12) return false
        return true
    }

    function isDate8(sDate) {
        if (!/^[0-9]{8}$/.test(sDate)) {
            return false;
        }
        var year, month, day;
        year = sDate.substring(0, 4);
        month = sDate.substring(4, 6);
        day = sDate.substring(6, 8);
        var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if (year < 1700 || year > 2500) return false
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) iaMonthDays[1] = 29;
        if (month < 1 || month > 12) return false
        if (day < 1 || day > iaMonthDays[month - 1]) return false
        return true
    }

     
  $("#login-form").validate({
      debug:true,      //调试模式（并不会提交）
      errorPlacement: function(error, element) {  
          error.appendTo(element.parent().next());  
      },
      submitHandler:function(form){
          $.ajax({
              cache: false,
              type: "POST",
              url:"/visitor/login",
              data:{userName:$("#login").val(),password:$("#password1").val()},
              async: false,
              error: function(request) {
              },
              success: function(data) {
                if(data.status == 'success'){
                	judgeHasLogin();// 判断是否已经登录
                	$('#loginModal').modal('hide')
                } else {
                	alert(data.tipMsg);
                }
              }
          });
      },
      rules:{

        password:{
          required:true,
          rangelength:[6,12]
        },
       
        login:{
          required:true,
          
        }
      },
      
      //自定义提示
      messages:{
      
        password:{
          required:"请输入密码",
          rangelength:"密码长度在6~12"
        },
        login:{
          required:"不能为空"
        }
      }
    });


  $("#register-form").validate({
    debug:true,      //调试模式（并不会提交）
    errorPlacement: function(error, element) {  
        error.appendTo(element.parent().next());  
    },
    submitHandler:function(form){
        $.ajax({
            cache: false,
            type: "POST",
            url:"/visitor/register",
            data:{mobileNo:$("#phone").val(), name:$("#username").val(),password:$("#password").val(),passwordAgain:$("#confirm-password").val(),verifyCode:$("#code_number").val()},
            async: false,
            error: function(request) {
            },
            success: function(result) {
              if(result.status == 'success'){
                alert("注册成功");
              }else{
                alert(result.tipMsg);
              }
            }
        });
    },
    rules:{

      username:{                
        required:true,        //开启必填项
        rangelength:[2,20],    //请输入的数值在2至20位之间
        username_test:true
      },
      number:{
        required:true
      },
      email:{
        required:true
      },
      password:{
        required:true,
        rangelength:[6,12]
      },
      url:{
        required:true
      },
      date:{

      },
      "confirm-password":{
        equalTo:"#password2"     //必须密码相同
      },
      phone1:{
        mobile:true
      },
      code_number:{                
        required:true,        //开启必填项
        rangelength:[6,6],
        number:true    //请输入的数值在2至12位之间
      }
    },
    
    //自定义提示
    messages:{
      username:{
        required:"用户名不能留空",      //用户名的必填项提示
        rangelength:"请检查您输入的数值的长度是否在2至20之间"    //用户名的长度提示
      },
      password:{
        required:"密码不能为空",
        rangelength:"密码长度在6~12"
      },
      "confirm-password":{
        equalTo:"两次密码输入不一致"     //必须密码相同
      },
      code_number:{
        required:"请输入验证码",
        rangelength:"验证码长度为6位",
        number:"请输入合法数字"
      }
    }
  });


$("#forgetPasswd-form").validate({
    debug:true,      //调试模式（并不会提交）
    errorPlacement: function(error, element) {  
        error.appendTo(element.parent().next());  
    },
    submitHandler:function(form){
        $.ajax({
            cache: false,
            type: "POST",
            url:"/visitor/resetPassword",
            data:{mobileNo:$("#phone2").val(), authCode:$("#username").val(),password:$("#code_number").val(),password:$("#password3").val(),passwordAgain:$("#confirm-password3").val()},
            async: false,
            error: function(request) {
            },
            success: function(result) {
              if(result.status == 'success'){
                alert("重置密码成功");
              }else{
                alert(result.tipMsg);
              }
            }
        });
    },
   
    rules:{
      password:{
        required:true,
        rangelength:[6,12]
      },
      "confirm-password":{
        equalTo:"#password3"     //必须密码相同
      },

      phone2:{
        required:true,
        mobile:true
      },
       code_number:{                
        required:true,        //开启必填项
        rangelength:[6,6],
        number:true    //请输入的数值在2至12位之间
      }
      },
       messages:{
        password:{
        required:"密码不能为空",
        rangelength:"密码长度在6~12"
      },
        "confirm-password":{
          equalTo:"两次密码输入不一致"     //必须密码相同
        },
        phone2:{
          required:"手机号不能为空",

        },
    
      code_number:{
        required:"请输入验证码",
        rangelength:"验证码长度为6位",
        number:"请输入合法数字"
      }
    }
 
  });



  $("#js_form").validate({
    debug:true,      //调试模式（并不会提交）
    errorPlacement: function(error, element) {  
        error.appendTo(element.parent().next());  
    },
   
    rules:{
      idCard:{
        required:true,
        isIdCardNo:true
      },
      phoneNum:{
        required:true,
        mobile:true
      }
    },
    
    //自定义提示
    messages:{
      idCard:{
        required:"身份证号不能为空"
      },
      phoneNum:{
        required:"手机号不能为空"
      }  
    }
  });


  $(".required").validate({  
    onsubmit:true
  });

  /**点“立即注册”,关闭注册页面**/
$('#register_btn').click(function(){
  $('#loginModal').modal('hide');
  alert('hide');
})
  

