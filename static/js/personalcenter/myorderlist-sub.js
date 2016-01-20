 // 加载订单
    var routeOrderId = $.getUrlParam('routeOrderId');
    //console.log(spotId);
    $(document).ready(function() { 

        initOrderInfo();// 加载游客基本信息
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
            var total_Count=parseInt(order.maleCount)+ parseInt(order.femaleCount); 
            var total_Price=order.price*total_Count;         
              $("#orderNo").text(order.orderNo);
              $("#orderThumbnail").attr("src", order.orderThumbnail);
              $("#orderTitle").text(order.orderTitle);
              $("#sigleprice").text(order.price);
              $("#price").text(total_Price);
              $("#startTime").text(order.startTime);
              $("#maleCount").text(order.maleCount);
              $("#femaleCount").text(order.femaleCount);
              $("#toOneRoute").click(function(){
                if(order.productType==10||order.productType==11){
                  $("#toOneRoute").attr("href","/route/oneRoute.html?routeId="+order.productId);
                }
              })
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

                case 09:
                $("#order_Status_"+i).text("退款中");
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
                var j=i+1;
                var tourist_name=[];
                var tourist_IDCardNo=[];
                var tourist_mobileNo=[];
                var tourist_weixinNo=[];
                tourist_name[i]="tourist_name_"+i;
                tourist_IDCardNo[i]="tourist_IDCardNo_"+i;
                tourist_mobileNo[i]="tourist_mobileNo_"+i;
                tourist_weixinNo[i]="tourist_weixinNo_"+i;
                //console.log(tourist_name[i]);
                $("#tourist_info").next().append('<div class="col-xs-12 col-sm-12 col-md-4 row_bottom_space1">\n'+
                      '<div class="col-xs-12 col-sm-12 col-md-12">\n'+
                        '<p><b class="font_size15 row_bottom_space">游客\n'+j+
                        '</b></p>\n'+
                      '</div>\n'+
                      '<div class="col-xs-12 col-sm-12 col-md-12">\n'+
                        '<p class="font_size13"><b>姓名：</b><span id='+tourist_name[i]+'></span></p>\n'+
                        '<p class="font_size13"><b>身份证号：</b><span id='+tourist_IDCardNo[i]+'></span></p>\n'+
                        '<p class="font_size13"><b>手机号：</b><span id='+tourist_mobileNo[i]+'></span></p>\n'+
                        '<p class="font_size13"><b>微信号：</b><span id='+tourist_weixinNo[i]+'></span></p>\n'+
                      '</div>\n'+
                      '</div>\n');

                //console.log("1");
              }
              initUserInfo();
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
        url : "/routeOrder/orderPersonList?routeOrderId="+routeOrderId,
        success : function(result){
          if(result.status == "success"){

            var tourist = result.data.rows; 
            var len= tourist.length; 
         
            //console.log(len);
            for(i=0;i<len;i++) 
            {
                 //console.log(tourist[i]);
              $("#tourist_name_"+i).text(tourist[i].name);
              $("#tourist_IDCardNo_"+i).text(tourist[i].idcardNo);
              $("#tourist_mobileNo_"+i).text(tourist[i].mobileNo);
              console.log(tourist[i].weixinNo);
              if(tourist[i].weixinNo==" "||tourist[i].weixinNo==null)
              {$("#tourist_weixinNo_"+i).text("未填");}
            else{$("#tourist_weixinNo_"+i).text(tourist[i].weixinNo);}
              
            }        

              
          }else{
             dealFailedResponse(result);
          }
        },
        error : function(data) {
          alert("系统异常");
        }
      });
    }
