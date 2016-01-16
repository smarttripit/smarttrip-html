 // 加载订单

    var routeOrderId = $.getUrlParam('routeOrderId');
    //console.log(spotId);
    $(document).ready(function() { 
       initOrderInfo();// 加载订单基本信息

    });

    // 加载订单详情
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
              $("#orderTitle").text(order.orderTitle);
              $("#sigleprice").text(order.price);
              $("#startTime").text(order.startTime);
              $("#maleCount").text(order.maleCount);
              $("#femaleCount").text(order.femaleCount);
              //console.log(order.orderStatus);
              var orderStatus=parseInt(order.orderStatus);
              switch(orderStatus)
              {
                case 01:
                
                $("#orderStatus").text("未支付");
                break;

                case 02:
                $("#orderStatus").text("已支付");
                break;

                case 03:
                $("#orderStatus").text("待评价");
                break;

                case 04:
                $("#orderStatus").text("已评价");
                break;

                case 05:
                $("#orderStatus").text("已过期");
                break;

                case 06:
                $("#orderStatus").text("已取消");
                break;

                case 07:
                $("#orderStatus").text("已删除");
                break;

                case 08:
                $("#orderStatus").text("已退款");
                break;
              }
              if(order.orderStatus!=01)
              {$("#quickly_pay").addClass("disabled")}
              $("#weixinGroupPic").attr("src", order.weixinGroupPic);
              var male=parseInt(order.maleCount);
              var female=parseInt(order.femaleCount);
              var people_total_number=male+female;
              //console.log(people_total_number);
              for(i=0;i<people_total_number;i++)
              { 
                
                $("#tourist_info").next().append('<div class="col-xs-12 col-sm-12 col-md-4 row_bottom_space1">\n'+
                      '<div class="col-xs-12 col-sm-12 col-md-12">\n'+
                        '<p><b class="font_size14 row_bottom_space">游客1</b></p>\n'+
                      '</div>\n'+
                      '<div class="col-xs-12 col-sm-12 col-md-12">\n'+
                        '<p class="font_size12"><b>姓名：</b><span></span></p>\n'+
                        '<p class="font_size12"><b>身份证号：</b><span></span></p>\n'+
                        '<p class="font_size12"><b>手机号：</b><span></span></p>\n'+
                        '<p class="font_size12"><b>微信号：</b><span></span></p>\n'+
                      '</div>\n'+
                      '</div>\n');
                console.log("1");
              }
              

          }else{
             dealFailedResponse(result);
            //alert(result.tipMsg);
          }
        },
        error : function(data) {
          alert("系统异常");
        }
      });
    }

    // 加载发现游客详情
    function initUserInfo(){
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
              $("#orderTitle").text(order.orderTitle);
              $("#sigleprice").text(order.price);
              $("#startTime").text(order.startTime);
              $("#maleCount").text(order.maleCount);
              $("#femaleCount").text(order.femaleCount);
              //console.log(order.orderStatus);
              var orderStatus=parseInt(order.orderStatus);
              switch(orderStatus)
              {
                case 01:
                console.log(order.orderStatus);
                $("#orderStatus").text("未支付");
                break;

                case 02:
                $("#orderStatus").text("已支付");
                break;

                case 03:
                $("#orderStatus").text("待评价");
                break;

                case 04:
                $("#orderStatus").text("已评价");
                break;

                case 05:
                $("#orderStatus").text("已过期");
                break;

                case 06:
                $("#orderStatus").text("已取消");
                break;

                case 07:
                $("#orderStatus").text("已删除");
                break;

                case 08:
                $("#orderStatus").text("已退款");
                break;
              }
              if(order.orderStatus!=01)
              {$("#quickly_pay").addClass("disabled")}
              $("#weixinGroupPic").attr("src", order.weixinGroupPic);
          }else{
             dealFailedResponse(result);
            //alert(result.tipMsg);
          }
        },
        error : function(data) {
          alert("系统异常");
        }
      });
    }