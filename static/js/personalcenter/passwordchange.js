
   /*修改密码*/
     $("#passwordchange").click( 
      function() {
        var user_oldPassword=$("#user_oldPassword").val();
        var user_password=$("#user_password").val();
        var user_passwordAgain=$("#user_passwordAgain").val();
        console.log(user_oldPassword);

        jQuery.ajax({
          type : "GET",
          async: true,
          data : {oldPassword:user_oldPassword, password:user_password, passwordAgain: user_passwordAgain},
          cache: false,
          datatype : "json",
          url : "/visitor/changePassword",
          success : function(result){
            if(result.status == "success"){ 
                          
           	}else{
              alert(result.tipMsg);
            }
          },
          error : function(data) {
            alert("系统异常");
          }
        });                        
     });