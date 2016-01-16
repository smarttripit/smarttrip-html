     $("#orderliststate ul li a").click(function()
	   {
      if($(this).has(".defined_active"))
	    {
       $(this).addClass("defined_active").parent("li").siblings("li").find("a").removeClass("defined_active");
      }
     }); 
    
	   // 加载经典线路列表
     $(document).ready(function() { 
 
 
		      var paginationOptions = {
			       domId : "pager2",
			       url : "/routeOrder/getByPage",
			       page : 1,
			       rows : 6,
			       queryParams : {orderStatus:""},
			       dealData : function(dataList){                       
				              var len = dataList.length;
				               if(len > 0)
				               {
					              for(var i=0; i<len; i++)
					              {
						             var row = dataList[i];
                               		 $("#order_"+i).css("display","block" );                  
                               		 var href=$("#ordermore_"+i).attr("href");
                               		 //console.log(href);
                               		if(href.indexOf("routeOrderId")!=-1)
                              		 {
                               		 	//console.log(href);
                                		$("#ordermore_"+i).attr("href",href);                               
                               		 }
                               		 else
                               		{
                                		$("#ordermore_"+i).attr("href",href+"?"+"routeOrderId="+row.routeOrderId);
                               		}                                 
                                            
                               		$("#order_number_"+i).text(row.orderNo);
                               		$("#order_thumbnail_"+i).attr("src", row.orderThumbnail);
                               		$("#order_startTime_"+i).text(row.startTime);
                               		$("#order_Title_"+i).text(row.orderTitle);
                                  console.log(row.orderStatus);
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
                                    	{$("#quickly_pay_"+i).addClass("disabled");
                                       $("#quickly_delete_"+i).addClass("disabled");
                                      }
                                    if(row.orderStatus!=03)
                                    	{$("#quickly_comment_"+i).addClass("disabled")}
                                  $("#quickly_delete_"+i).click(
                                      function(){
                                        jQuery.ajax({
                                        type : "GET",
                                        async: true,
                                        cache: false,
                                        datatype : "json",
                                        url : "/routeOrder/cancel",
                                        data:{routeOrderId:row.routeOrderId,},
                                        success : function(result){
                                          if(result.status == "success"){ 
                                             for(var j=0; j<6; j++)
                                             {$("#order_"+j).css("display","none" );}     
                                             pagination(paginationOptions);                                     
                                            //$("#order_"+i).css("display","none");
                                            //console.log("/routeOrder/cancel?routeOrderId=");
                                           //$("#passwordchange").attr("href","/personalcenter/personalinfo-main.html");                                                      
                                         }else{
                                           dealFailedResponse(result);
                                         }
                                       },
                                       error : function(data) {
                                         
                                         alert("系统异常");
                                       }
                                     }); 

                                   });
                               		$("#order_totalprice_"+i).text(row.price*(row.maleCount+row.femaleCount));
                               		$("#order_totalcount_"+i).text(row.maleCount+row.femaleCount);
                               		$("#order_createTime_"+i).text(row.createTime);
					               }
			  	              }
			        }
	         }
     		
          //全部排序
          $("#SynthesisComment").click(function()
             { 
                paginationOptions.queryParams.orderStatus= "";
                for(var i=0; i<6; i++)
                {$("#order_"+i).css("display","none" );}
                pagination(paginationOptions); 
                //console.log(paginationOptions.queryParams.orderType);
          });

          //待付款
          $("#NeedToPay").click(function()
            { 
              paginationOptions.queryParams.orderStatus= "01";
              for(var i=0; i<6; i++)
              {$("#order_"+i).css("display","none" );}
              pagination(paginationOptions); 
              //console.log(paginationOptions.queryParams.orderType);
          });

          //待评价
          $("#NeedToComment").click(function()
            { 
              paginationOptions.queryParams.orderStatus= "03";
              for(var i=0; i<6; i++)
              {$("#order_"+i).css("display","none" );}
              pagination(paginationOptions); 
              //console.log(paginationOptions.queryParams.orderType);
          });

          pagination(paginationOptions);
	   });

