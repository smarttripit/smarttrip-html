
    //var spotId = $.getUrlParam('spotId');
    //console.log(spotId);
    $(document).ready(function() { 
       initUserInfo();// 加载游客基本信息
    });

    // 加载发现北京详情页
    function initUserInfo(){
      jQuery.ajax({
        type : "GET",
        async: true,
        cache: false,
        datatype : "json",
        url : "/visitor/showVisitorInfo",
        success : function(result){
          if(result.status == "success"){
            var user = result.data;            
              $("#userName").text(user.userName);
              $("#mobileNo").text(user.mobileNo);
              //$("#headerSmall").attr("src", user.headerSmall);
              if(user.realName=="")
                {$("#realName").text("未填");}
              else
                {$("#realName").text(user.realName);}
              
              if(user.gender=="")
                {$("#gender").text("未填");}
              else if(user.gender==1)
                {$("#gender").text("男");}
              else
                {$("#gender").text("女");}

              if(user.birthday=="")
                {$("#birthday").text("未填");}
              else
                {$("#birthday").text(user.birthday);} 

              if(user.city=="")
                {$("#city").text("未填");}
              else
                {$("#city").text(user.city);}

              if(user.profession=="")
                {$("#profession").text("未填");}
              else
                {$("#profession").text(user.profession);}

              if(user.education=="")
                {$("#education").text("未填");}
              else
                {$("#education").text(user.education);}

              if(user.introduction=="")
                {$("#introduction").text("未填");}
              else
                {$("#introduction").text(user.introduction);}

              if(user.themes=="")
                {$("#themes").text("未填");}
              else
                {$("#themes").text(user.themes);}

          }else{
            alert(result.tipMsg);
          }
        },
        error : function(data) {
          alert("系统异常");
        }
      });
    }