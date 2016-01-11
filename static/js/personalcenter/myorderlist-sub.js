 // 加载订单

    var routeOrderId = $.getUrlParam('routeOrderId');
    //console.log(spotId);
    $(document).ready(function() { 
       initOrderInfo();// 加载游客基本信息
    });

    // 加载发现北京详情页
    function initOrderInfo(){
      jQuery.ajax({
        type : "GET",
        async: true,
        cache: false,
        datatype : "json",
        url : "/routeOrder/detail?routeOrderId="+routeOrderId,
        success : function(result){
          if(result.status == "success"){
            var order = result.data;            
              $("#orderNo").text(order.orderNo);
              $("#orderThumbnail").attr("src", order.orderThumbnail);
              $("#sigleprice").text(order.sigleprice);
              $("#startTime").text(order.startTime);
              $("#maleCount").text(order.maleCount);
              $("#femaleCount").text(order.femaleCount);
              $("#orderStatus").text(order.orderStatus);
              $("#weixinGroupPic").attr("src", order.weixinGroupPic);
          }else{
            alert(result.tipMsg);
          }
        },
        error : function(data) {
          alert("系统异常");
        }
      });
    }