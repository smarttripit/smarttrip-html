var productType = $.getUrlParam('productType');
var productId = $.getUrlParam('productId');
var totalCount = $.getUrlParam('totalCount');
var startDate = $.getUrlParam('startDate');
var price = $.getUrlParam('price');
var currentUserInfoIndex;

$(document).ready(function() {
	// 初始化订单信息
	initOrderInfo();
});

// 初始化订单信息
function initOrderInfo() {
	var totalPrice = parseFloat(price) * totalCount;
	$('#startDate').text(startDate);
	$('#price').text(price);
	$('#totalCount').text(totalCount);
	$('#totalPrice').text(totalPrice);
	
	currentUserInfoIndex = parseInt(totalCount);

	for(i=0;i<totalCount;i++){ 
	    var tourist_name=[];
	    var tourist_IDCardNos=[];
	    var tourist_mobileNos=[];
	    var tourist_weixinNos=[];
	    tourist_name[i]="tourist_name_"+i;
	    tourist_IDCardNos[i]="tourist_IDCardNos_"+i;
	    tourist_mobileNos[i]="tourist_mobileNos_"+i;
	    tourist_weixinNos[i]="tourist_weixinNos_"+i;
	    $("#tourist_info").next().append(onePersonInfoHTML(i));
	}
	
	$("#tourist_info").next().append('<div id="add_one_persion_info" class="col-xs-12 col-sm-12 col-md-4 row_bottom_space1">\n'+
            '<div class="col-xs-12 col-sm-12 col-md-12 ">\n'+
               '<p><b class="font_size15 row_bottom_space "><i class="fa fa-user"></i>&nbsp;<a href="javascript:void(0)" onclick="addOnePersonInfo()">+添加一位游客信息</a></b></p>\n'+
             '</div>\n');

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

// 一位游客信息的HTML片段
function onePersonInfoHTML(index){
	return '<div class="col-xs-12 col-sm-12 col-md-4 row_bottom_space1">\n'+
    '<div class="col-xs-12 col-sm-12 col-md-12 ">\n'+
    '<p><b class="font_size15 row_bottom_space "><i class="fa fa-user"></i>&nbsp;游客\n'+(index+1)+'信息</b></p>\n'+
  '</div>\n'+
  '<div class="form-group  ">\n'+
  '<label for="" class="col-xs-4 col-sm-3 col-md-4 control-label pr0 mt5 font_size13 line_height24">性别：</label>\n'+
  '<div class="col-xs-8 col-sm-9 col-md-8 pl0 mb5">\n'+
    '<select id="tourist_gender_'+index+'" class="form-control"><option value="-1">请选择</option><option value="0">女</option><option value="1">男</option></select>'+
  '</div>\n'+
  '</div>\n'+
  '<div class="form-group  ">\n'+
    '<label for="" class="col-xs-4 col-sm-3 col-md-4 control-label pr0 mt5 font_size13 line_height24">姓名：</label>\n'+
    '<div class="col-xs-8 col-sm-9 col-md-8 pl0 ">\n'+
      '<input  type="text" class="form-control" id=tourist_name_'+index+' placeholder="必填，真实姓名，购买保险用">\n'+
    '</div>\n'+
  '</div>\n'+
  '<div class="form-group ">\n'+
    '<label for="" class="col-xs-4 col-sm-3 col-md-4 control-label pr0 mt5 mt10 font_size13 line_height24">手机号：</label>\n'+
    '<div class="col-xs-8 col-sm-9 col-md-8 pl0 mt10">\n'+
      '<input  type="text" class="form-control" id=tourist_mobileNos_'+ index +' placeholder="必填，方便和您沟通">\n'+
    '</div>\n'+
  '</div>\n'+
  '<div class="form-group ">\n'+
    '<label for="" class="col-xs-4 col-sm-3 col-md-4 control-label pr0 mt5 mt10 font_size13 line_height24">身份证号：</label>\n'+
    '<div class="col-xs-8 col-sm-9 col-md-8 pl0 mt10">\n'+
      '<input  type="text" class="form-control" id=tourist_IDCardNos_'+ index +' placeholder="必填，购买保险用">\n'+
    '</div>\n'+
  '</div>\n'+
  '<div class="form-group ">\n'+
    '<label for="" class="col-xs-4 col-sm-3 col-md-4 control-label pr0 mt5 mt10 font_size13 line_height24">微信号：</label>\n'+
    '<div class="col-xs-8 col-sm-9 col-md-8 pl0 mt10">\n'+
      '<input  type="text" class="form-control" id=tourist_weixinNos_'+index+'  placeholder="选填，及时获得保险信息">\n'+
    '</div>\n'+
  '</div>\n'+               
'</div>\n'
}

// 添加一位游客信息
function addOnePersonInfo(){
	$("#add_one_persion_info").before(onePersonInfoHTML(currentUserInfoIndex));
	currentUserInfoIndex++;
}

//提交订单相关的游客信息
$("#createorder").click(function(){
	var user_genders;
    var user_name;
    var user_IDCardNos;
    var user_mobileNos;
    var user_weixinNos;
    var tourist_weixinNos=[];
    for(i=0;i<currentUserInfoIndex;i++)
    {
    	
      // 游客性别
      var tourist_gender = $("#tourist_gender_"+i).val();
      if(tourist_gender == -1){
    	  alert("请选择游客"+(i+1)+"的性别");
    	  return false;
      }
      if(user_genders!="" && user_genders!=null)
      {
    	  user_genders=user_genders+","+tourist_gender;
      }
      else
      {
    	  user_genders=tourist_gender;
      }
    	
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
        
      if(user_mobileNos!="" && user_mobileNos!=null)
      {
        user_mobileNos=user_mobileNos+","+tourist_mobileNos;
      }
      else
      {
        user_mobileNos=tourist_mobileNos;
      }

      //游客微信号
      var weixin=$("#tourist_weixinNos_"+i).val();
      tourist_weixinNos.push(weixin); 
      if(i==0)  
      {
        user_weixinNos=tourist_weixinNos[i];
      }        
      else
      {
        user_weixinNos=user_weixinNos+","+tourist_weixinNos[i];
      }

      if (tourist_name == "") {
        alert("请输入游客"+(i+1)+"的姓名");
        return false;
      }

      if (tourist_mobileNos == "") {
        alert("请输入游客"+(i+1)+"的手机号");
        return false;
      }
      
      if(isMobileNo(tourist_mobileNos) == false){
    	  alert("游客"+(i+1)+"的手机号格式不正确");
    	  return false;
      }
      
      if (tourist_IDCardNos == "" ) {
	     alert("请输入游客"+(i+1)+"的身份证号");
	     return false;
	  }
    
      if(IdentityCodeValid(tourist_IDCardNos) == false){
  	    alert("游客"+(i+1)+"的身份证号格式不正确");
  	    return false;
      }
    }

    showLoading();// 弹出正在提交的提示
    jQuery.ajax({
      type : "GET",
      async: true,
      data : {
        productType:productType, 
        productId:productId, 
        startDate: startDate, 
        totalCount:totalCount, 
        names:user_name, 
        IDCardNos:user_IDCardNos, 
        mobileNos:user_mobileNos, 
        weixinNos:user_weixinNos
      },
      cache: false,
      datatype : "json",
      url : "/routeOrder/create",
      success : function(result){
        hideLoading();// 关闭正在提交的提示
        if(result.status == "success"){
          var routeOrderId=result.data.routeOrderId;
          window.location.href="/personalcenter/myorderlist-sub.html?routeOrderId="+routeOrderId;
        }else{
          dealFailedResponse(result);
        }
      },
      error : function(data) {
    	hideLoading();// 关闭正在提交的提示
        alert("系统异常");
      }
    }); 
	}
);
