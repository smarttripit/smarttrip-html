
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
              if(user.realName=="" || user.realName==null )
                {$("#realName").text("未填");}
              else
                {$("#realName").text(user.realName);}
              
              if(user.gender=="" || user.gender==null)
                {$("#gender").text("未填");}
              else if(user.gender==1)
                {$("#gender").text("男");}
              else
                {$("#gender").text("女");}

              if(user.birthday=="" || user.birthday==null)
                {$("#birthday").text("未填");}
              else
                {$("#birthday").text(user.birthday);} 

              if(user.city=="" || user.city==null)
                {$("#city").text("未填");}
              else
                {$("#city").text(user.city);}

              if(user.profession=="" || user.profession==null)
                {$("#profession").text("未填");}
              else
                {$("#profession").text(user.profession);}

              if(user.education=="" || user.education==null)
                {$("#education").text("未填");}
              else
                {$("#education").text(user.education);}

              if(user.introduction=="" || user.introduction==null)
                {$("#introduction").text("未填");}
              else
                {$("#introduction").text(user.introduction);}

              if(user.themes=="" || user.themes==null)
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