//时间选择器和地图长宽设定
$(function(){ 
    $("#date_1").datepicker(); 
    $("#date_2").datepicker();
    $('#allmap').height($(window).height());
    $('#allmap').width($('.panel-body').width()*0.3);
});

//导航栏active切换
var tabs_lis = $('#tabs div');
$.each(tabs_lis,function(key,val){
  $(this).click(function(){
    var this_index = key;
    $('#tabs div').removeClass('tab-current');
    $(this).addClass('tab-current');
    if(key==0){
      $('ul.select').hide();
    }else{
      $('ul.select').show();
    }   
  })
})

// 百度地图API功能
var map = new BMap.Map("allmap");
var point = new BMap.Point(116.404, 39.915);
map.centerAndZoom(point, 15);
// 编写自定义函数,创建标注
function addMarker(point){
  var marker = new BMap.Marker(point);
  map.addOverlay(marker);
}
// 随机向地图添加6个标注
var bounds = map.getBounds();
var sw = bounds.getSouthWest();
var ne = bounds.getNorthEast();
var lngSpan = Math.abs(sw.lng - ne.lng);
var latSpan = Math.abs(ne.lat - sw.lat);
for (var i = 0; i < 6; i ++) {
  var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
  addMarker(point);
}
//地图固定
$('#nav').affix({
    offset: {
        top: $('#nav').offset().top,bottom:428
    }
});