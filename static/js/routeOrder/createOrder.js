var productType = $.getUrlParam('productType');
var productId = $.getUrlParam('productId');
var femaleCount = $.getUrlParam('femaleCount');
var maleCount = $.getUrlParam('maleCount');
var startDate = $.getUrlParam('startDate');
var price = $.getUrlParam('price');


$(document).ready(function() {
	// 初始化订单信息
	initOrderInfo();

});

// 初始化订单信息
function initOrderInfo() {
	var totalCount = parseInt(femaleCount) + parseInt(maleCount);
	var totalPrice = parseFloat(price) * totalCount;
	$('#femaleCount').text(femaleCount);
	$('#maleCount').text(maleCount);
	$('#startDate').text(startDate);
	$('#price').text(price);
	$('#totalCount').text(totalCount);
	$('#totalPrice').text(totalPrice);

  for(i=0;i<totalCount;i++)
  { 
    var j=i+1;
    var tourist_name=[];
    var tourist_IDCardNos=[];
    var tourist_mobileNos=[];
    var tourist_weixinNos=[];
    tourist_name[i]="tourist_name_"+i;
    tourist_IDCardNos[i]="tourist_IDCardNos_"+i;
    tourist_mobileNos[i]="tourist_mobileNos_"+i;
    tourist_weixinNos[i]="tourist_weixinNos_"+i;

    $("#tourist_info").next().append('<div class="col-xs-12 col-sm-12 col-md-4 row_bottom_space1">\n'+
                 '<div class="col-xs-12 col-sm-12 col-md-12 ">\n'+
                    '<p><b class="font_size15 row_bottom_space "><i class="fa fa-user"></i>&nbsp;游客\n'+j+'信息</b></p>\n'+
                  '</div>\n'+
                  '<div class="form-group  ">\n'+
                    '<label for="" class="col-xs-4 col-sm-3 col-md-4 control-label pr0 mt5 font_size13">姓名：</label>\n'+
                    '<div class="col-xs-8 col-sm-9 col-md-8 pl0 ">\n'+
                      '<input  type="text" class="form-control" id='+tourist_name[i]+' placeholder="必填，真实姓名，购买保险用">\n'+
                    '</div>\n'+
                  '</div>\n'+
                  '<div class="form-group ">\n'+
                    '<label for="" class="col-xs-4 col-sm-3 col-md-4 control-label pr0 mt5 mt10 font_size13">手机号：</label>\n'+
                    '<div class="col-xs-8 col-sm-9 col-md-8 pl0 mt10">\n'+
                      '<input  type="text" class="form-control" id='+ tourist_mobileNos[i]+' placeholder="必填，方便和您沟通">\n'+
                    '</div>\n'+
                  '</div>\n'+
                  '<div class="form-group ">\n'+
                    '<label for="" class="col-xs-4 col-sm-3 col-md-4 control-label pr0 mt5 mt10 font_size13">身份证号：</label>\n'+
                    '<div class="col-xs-8 col-sm-9 col-md-8 pl0 mt10">\n'+
                      '<input  type="text" class="form-control" id='+ tourist_IDCardNos[i]+' placeholder="必填，购买保险用">\n'+
                    '</div>\n'+
                  '</div>\n'+
                  '<div class="form-group ">\n'+
                    '<label for="" class="col-xs-4 col-sm-3 col-md-4 control-label pr0 mt5 mt10 font_size13">微信号：</label>\n'+
                    '<div class="col-xs-8 col-sm-9 col-md-8 pl0 mt10">\n'+
                      '<input  type="text" class="form-control" id='+tourist_weixinNos[i]+'  placeholder="选填，及时获得保险信息">\n'+
                    '</div>\n'+
                  '</div>\n'+               
                '</div>\n');
    //console.log("1");
  }

	jQuery.ajax({
		type : "GET",
		async : true,
		cache : false,
		datatype : "json",
		url : "/route/detail?routeId=" + productId,
		success : function(result) {
			if (result.status == "success") {
				$("#orderThumbnail").attr("src", result.data.thumbnail);
				$("#orderTitle").text(result.data.name);
			} else {
				dealFailedResponse(result);
			}
		},
		error : function(data) {
			dealFailedResponse(result);
		}
	});
}



//提交订单相关的游客信息
 $("#createorder").click(
    function() {
        var totalCount = parseInt(femaleCount) + parseInt(maleCount);
        var user_name;
        var user_IDCardNos;
        var user_mobileNos;
        var user_weixinNos;
        var tourist_weixinNos=[];
        for(i=0;i<totalCount;i++)
        {
          //游客姓名
          var tourist_name=$("#tourist_name_"+i).val();      
          if(user_name!="" && user_name!=null)
          {
            user_name=user_name+","+tourist_name;
          }
          else
          {
            user_name=tourist_name;
          }
          
          //游客身份证号
          var tourist_IDCardNos=$("#tourist_IDCardNos_"+i).val();                          
          if(user_IDCardNos!="" && user_IDCardNos!=null)
          {
            user_IDCardNos=user_IDCardNos+","+tourist_IDCardNos;
          }
          else
          {
            user_IDCardNos=tourist_IDCardNos;
          }

          //游客手机号
          var  tourist_mobileNos=$("#tourist_mobileNos_"+i).val(); 
          //console.log(tourist_mobileNos)  ;
            
          if(user_mobileNos!="" && user_mobileNos!=null)
          {
            user_mobileNos=user_mobileNos+","+tourist_mobileNos;
          }
          else
          {
            user_mobileNos=tourist_mobileNos;
          }
          //console.log(user_mobileNos)  ;

          //游客微信号
          
          var weixin=$("#tourist_weixinNos_"+i).val();
          tourist_weixinNos.push(weixin); 
         // console.log(tourist_weixinNos);
          //console.log(user_weixinNos);
          if(i==0)  
          {
            user_weixinNos=tourist_weixinNos[i];
          }        
          else
          {
            user_weixinNos=user_weixinNos+","+tourist_weixinNos[i];
          }

          //console.log(user_weixinNos);
         

          
          if (tourist_name == "") {
            alert("请输入您的姓名");
            return false;
          }

          //console.log(tourist_IDCardNos);
          if (tourist_IDCardNos == "" ) {
            alert("请输入您的身份证号");
            return false;
          }
       

          if (tourist_mobileNos == "") {
            alert("请输入您的手机号");
            return false;
          }

       /*   if (tourist_weixinNos == "") {
            alert("请输入您的微信号");
            return false;
          }*/

        }
        //console.log(user_name);

        
        jQuery.ajax({
          type : "GET",
          async: true,
          data : {
            productType:productType, 
            productId:productId, 
            startDate: startDate, 
            maleCount:maleCount, 
            femaleCount:femaleCount, 
            names:user_name, 
            IDCardNos:user_IDCardNos, 
            mobileNos:user_mobileNos, 
            weixinNos:user_weixinNos
          },
          cache: false,
          datatype : "json",
          url : "/routeOrder/create",
          success : function(result){
            if(result.status == "success"){
              hide();
              var routeOrderId=result.data.routeOrderId;
              window.location.href="/personalcenter/myorderlist-sub.html?routeOrderId="+routeOrderId;
              //console.log(user_weixinNos);
                          
            }else{
              dealFailedResponse(result);
            }
          },
          error : function(data) {
            
            alert("系统异常");
          }
        }); 





		}

);
