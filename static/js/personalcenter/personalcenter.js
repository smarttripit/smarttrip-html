
    //var spotId = $.getUrlParam('spotId');
    //console.log(spotId);
    $(document).ready(function() { 
            initUserInfo();// 加载游客基本信息
            var paginationOptions = {
                domId : "pager2",
                url : "/routeOrder/getByPage",
                page : 1,
                rows : 6,
                queryParams : {orderStatus:""},
                dealData : function(dataList){
                      for(var j=0; j<6; j++)
                      {$("#order_"+j).css("display","none" );}                       
                      var len = dataList.length;
                      if(len > 0)
                      {
                        for(var i=0; i<len; i++)
                        {
                            var row = dataList[i];
                            $("#order_"+i).css("display","block" );                  
                            var href=$("#ordermore_"+i).attr("href");
                                                        
                            $("#ordermore_"+i).attr("href","/personalcenter/myorderlist-sub.html"+"?"+"routeOrderId="+row.routeOrderId);
                            $("#quickly_pay_"+i).attr("href","/personalcenter/myorderlist-sub.html"+"?"+"routeOrderId="+row.routeOrderId);
                            $("#quickly_comment_"+i).attr("href","/personalcenter/myorderlist-comment.html"+"?"+"routeOrderId="+row.routeOrderId);                               
                                            
                            $("#order_number_"+i).text(row.orderNo);
                            $("#order_thumbnail_"+i).attr("src", row.orderThumbnail);
                            $("#order_startTime_"+i).text(row.startTime);
                            $("#order_Title_"+i).text(row.orderTitle);
                            var orderStatus=parseInt(row.orderStatus);
                            switch(orderStatus)
                            {
                                    case 01:
                                    $("#order_Status_"+i).text("未支付");
                                    break;

                                    case 02:
                                    $("#order_Status_"+i).text("已支付");
                                    break;

                                    case 03:
                                    $("#order_Status_"+i).text("待评价");
                                    break;

                                    case 04:
                                    $("#order_Status_"+i).text("已评价");
                                    break;

                                    case 05:
                                    $("#order_Status_"+i).text("已过期");
                                    break;

                                    case 06:
                                    $("#order_Status_"+i).text("已取消");
                                    break;

                                    case 07:
                                    $("#order_Status_"+i).text("已删除");
                                    break;

                                    case 08:
                                    $("#order_Status_"+i).text("已退款");
                                    break;

                                    case 09:
                                    $("#order_Status_"+i).text("退款中");
                                    break;
                            }
                            
                            if(row.orderStatus!=01)
                            {
                              $("#quickly_pay_"+i).addClass("disabled");
                              $("#quickly_delete_"+i).addClass("disabled");
                            }

                            if(row.orderStatus!=03)
                            {
                              $("#quickly_comment_"+i).addClass("disabled");
                            }
                                  
                            $("#quickly_delete_"+i).attr("value",row.routeOrderId);
                            var maleCount=parseInt(row.maleCount);
                            var femaleCount=parseInt(row.femaleCount);
                            var price=parseFloat(row.price);
                            $("#order_totalprice_"+i).text(price*(maleCount+femaleCount));
                            $("#order_totalcount_"+i).text(maleCount+femaleCount);
                            $("#order_createTime_"+i).text(row.createTime);
                        }
                      }
                }
            }

            $(".quickly_delete").click(
               function(){    
               console.log("hahahh");                                                                        
                           var routeOrderId=$(this).attr("value");
                           //console.log(routeOrderId);
                           jQuery.ajax({
                                         type : "GET",
                                         async: true,
                                         cache: false,
                                         datatype : "json",
                                         url : "/routeOrder/cancel",
                                         data:{routeOrderId:routeOrderId},
                                         success : function(result){
                                                   if(result.status == "success")
                                                   { 
                                                       for(var j=0; j<6; j++)
                                                       {$("#order_"+j).css("display","none" );}     
                                                       pagination(paginationOptions);                                     
                                
                                                   }
                                                    else
                                                    {
                                                       dealFailedResponse(result);
                                                    }
                                         },
                                         error : function(data) 
                                         {                                        
                                               alert("系统异常");
                                         }
                           }); 

            });
            pagination(paginationOptions); 

            //进入订单页已付款页面
            

            $("#AlreadyPay").click(
              function(){
                        console.log("hah");
                        window.location.href="/personalcenter/myorderlist.html?orderStatus="+"02";
            });

            //进入订单页未付款页面
            $("#NeedToPay").click(
              function(){
                        window.location.href="/personalcenter/myorderlist.html?orderStatus="+"01";
            });

            //进入订单页已付款页面
            $("#NeedToComment").click(
              function(){
                        window.location.href="/personalcenter/myorderlist.html?orderStatus="+"03";
            });

            //进入全部订单页面
            $("#Allorderlist").click(
              function(){
                        window.location.href="/personalcenter/myorderlist.html?orderStatus="+"";
            });
    });

    // 加载游客基本信息
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
              //console.log(user.headerSmall);
              if(user.headerSmall==""||user.headerSmall==null)
              {
                //console.log("1");
                $("#headerSmall").attr("src", "/static/images/default-image.jpg");
              }
              else
              {
                $("#headerSmall").attr("src", user.headerSmall);
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