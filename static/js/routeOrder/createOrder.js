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