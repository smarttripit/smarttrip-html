 	// 加载订单
    var routeOrderId = $.getUrlParam('routeOrderId');
    var code = $.getUrlParam('code');
    var state = $.getUrlParam('state');
    //var prepayId = "";
    var orderStatus = "";
    //alert("routeOrderId:" + routeOrderId);
    //alert("code:" + code);
    //console.log(spotId);
    $(document).ready(function() {
    	initOrderInfo();// 加载订单详情
    	$("#quickly_pay").on('click', function(){
    		payTheOrder();
    	});
    });
    
    /**
     * 支付订单
     */
    function payTheOrder(){
    	showLoading();// 弹出正在处理的蒙版
    	if(orderStatus == 01){
      	  if(code == null  ||  code == ""){
        		window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx416f8f3a376313a9&redirect_uri=http%3a%2f%2fsongjie.ngrok.cc%2fpersonalcenter%2fmyorderlist-sub.html%3frouteOrderId%3d"+routeOrderId+"&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect";
      	  }else{
      		jQuery.ajax({
                type : "GET",
                async: true,
                cache: false,
                datatype : "json",
                url : "/weixin/getH5Data?code="+code+"&routeOrderId="+routeOrderId,
                success : function(result){
                	hideLoading();// 关闭正在处理的蒙版
                	code = "";// 将code重置为空，以便能够不刷新当前页面也能重新支付
                    if(result.status == "success"){
                    	popWeixinPay(result.data);
                    }else{
                        dealFailedResponse(result);
                    }
                },
                error : function(data) {
                	hideLoading();// 关闭正在处理的蒙版
                	code = "";// 将code重置为空，以便能够不刷新当前页面也能重新支付
                    alert("系统异常");
                }
              });
      	  }
        }else{
        	showLoading();// 弹出正在处理的蒙版
        	alert("该订单不是未支付状态");
        }
    }
    
    /**
     * 弹出微信支付界面
     * @param prepayId
     * @param timeStamp
     * @param nonceStr
     * @param paySign
     */
    function popWeixinPay(data){
    	WeixinJSBridge.invoke(
	       'getBrandWCPayRequest', 
	       {
	           "appId":data.appId,     //公众号名称，由商户传入     
	           "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数     
	           "nonceStr":data.nonceStr, //随机串     
	           "package":data.package,     
	           "signType":data.signType,         //微信签名方式：     
	           "paySign":data.paySign //微信签名 
	       },
	       function(res){
	    	   code = "";// 将code重置为空，以便能够不刷新当前页面也能重新支付
	    	   // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
	           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
	        	   // 支付成功，重新加载页面
	        	   window.location.href="/personalcenter/myorderlist-sub.html?routeOrderId=" + routeOrderId;
	           }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
	        	   // 用户取消支付，则什么都不做
	           } else{
	        	   // 支付失败，给用户提示
	        	   alert("支付失败，请稍后重试");
	           }
	       }
	   ); 
    }
    
    /**
     * 加载订单详情
     */
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
            var total_Price=parseFloat(order.price)*total_Count;         
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
              orderStatus=parseInt(order.orderStatus);
              if(!(code == null)){
	          	payTheOrder();
	          }
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

    // 加载游客详情
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
