
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
              $("#headerSmall").attr("src", user.headerSmall);

          }else{
            alert(result.tipMsg);
          }
        },
        error : function(data) {
          alert("系统异常");
        }
      });
    }