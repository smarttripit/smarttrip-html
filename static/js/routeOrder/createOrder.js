var productType = $.getUrlParam('productType');
var productId = $.getUrlParam('productId');
var femaleCount = $.getUrlParam('femaleCount');
var maleCount = $.getUrlParam('maleCount');
var startDate = $.getUrlParam('startDate');
var price = $.getUrlParam('price');

$(document).ready( function() {
	//初始化订单信息
	initOrderInfo();
});

//初始化订单信息
function initOrderInfo(){
	var totalCount = parseInt(femaleCount) + parseInt(maleCount);
	var totalPrice = parseFloat(price) * totalCount;
	$('#femaleCount').text(femaleCount);
	$('#maleCount').text(maleCount);
	$('#startDate').text(startDate);
	$('#price').text(price);
	$('#totalCount').text(totalCount);
	$('#totalPrice').text(totalPrice);
  var totalCount = parseInt(femaleCount) + parseInt(maleCount);
  console.log(totalCount);
  for(i=0;i<totalCount;i++)
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

    $("#tourist_info").next().append('<div class="col-xs-12 col-sm-12 col-md-4 row_bottom_space1">\n'+
                 '<div class="col-xs-12 col-sm-12 col-md-12 ">\n'+
                    '<p><b class="font_size14 row_bottom_space "><i class="fa fa-user"></i>&nbsp;游客\n'+j+'信息</b></p>\n'+
                  '</div>\n'+
                  '<div class="form-group  ">\n'+
                    '<label for="" class="col-xs-4 col-sm-3 col-md-4 control-label pr0 mt5 ">姓名：</label>\n'+
                    '<div class="col-xs-8 col-sm-9 col-md-8 pl0 ">\n'+
                      '<input  type="text" class="form-control" id='+tourist_name[i]+' placeholder="必填">\n'+
                    '</div>\n'+
                  '</div>\n'+
                  '<div class="form-group ">\n'+
                    '<label for="" class="col-xs-4 col-sm-3 col-md-4 control-label pr0 mt5 mt10">手机号：</label>\n'+
                    '<div class="col-xs-8 col-sm-9 col-md-8 pl0 mt10">\n'+
                      '<input  type="text" class="form-control" id='+ tourist_IDCardNo[i]+' placeholder="必填">\n'+
                    '</div>\n'+
                  '</div>\n'+
                  '<div class="form-group ">\n'+
                    '<label for="" class="col-xs-4 col-sm-3 col-md-4 control-label pr0 mt5 mt10">身份证号：</label>\n'+
                    '<div class="col-xs-8 col-sm-9 col-md-8 pl0 mt10">\n'+
                      '<input  type="text" class="form-control" id='+ tourist_mobileNo[i]+' placeholder="必填">\n'+
                    '</div>\n'+
                  '</div>\n'+
                  '<div class="form-group ">\n'+
                    '<label for="" class="col-xs-4 col-sm-3 col-md-4 control-label pr0 mt5 mt10">微信号：</label>\n'+
                    '<div class="col-xs-8 col-sm-9 col-md-8 pl0 mt10">\n'+
                      '<input  type="text" class="form-control" id='+tourist_weixinNo[i]+'  placeholder="选填">\n'+
                    '</div>\n'+
                  '</div>\n'+               
                '</div>\n');
    //console.log("1");
  }
	jQuery.ajax({
        type : "GET",
            async: true,
            cache: false,
            datatype : "json",
            url : "/route/detail?routeId="+productId,
            success : function(result){
              if(result.status == "success"){
                 $("#orderThumbnail").attr("src",result.data.thumbnail);
                 $("#orderTitle").text(result.data.name);
              }else{
                alert(result.tipMsg);
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
        var user_name=[];
        var user_IDCardNos=[];
        var user_mobileNos=[];
        var user_weixinNos=[];
        for(i=0;i<totalCount;i++)
        {
          user_name[i]=$("#tourist_name_"+i).val();
          user_IDCardNos[i]=$("#tourist_IDCardNo_"+i).val();
          user_mobileNos[i]=$("#tourist_mobileNos_"+i).val();
          user_weixinNos[i]=$("#tourist_weixinNos_"+i).val();
        }

        jQuery.ajax({
          type : "GET",
          async: true,
          data : {productType:productType, productId:productId, startDate: startDate, maleCount:maleCount, femaleCount:femaleCount, names:user_name, IDCardNos:user_IDCardNos, mobileNos:user_mobileNos, weixinNos:user_weixinNos,},
          cache: false,
          datatype : "json",
          url : "/routeOrder/create",
          success : function(result){
            if(result.status == "success"){ 
              $("#createorder").attr("href","/personalcenter/myorderlist-sub.html");
                          
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

          

