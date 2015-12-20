$(document).ready(function() {
	// 加载经典线路
	initRoutes();
  initSpots();
});

// 加载经典线路
function initRoutes(){
	jQuery.ajax({
		type : "GET",
        async: false,
        cache: false,
        datatype : "json",
        url : "/route/top3",
        success : function(result){
        	if(result.status == "success"){
        		var data = result.data;
        		for(var i=0; i<data.length; i++){
        			var route = data[i];
        			$("#route_thumbnail_"+i).attr("src", route.thumbnail);
        			$("#route_name_"+i).text(route.name);
        			$("#route_themes_"+i).text(route.themes);
        			$("#route_briefRecommendation_"+i).text(route.briefRecommendation);
        			$("#route_commentRatio_"+i).text(route.commentRatio);
        			$("#route_purchaseCount_"+i).text(route.purchaseCount);
        			$("#route_link_"+i).attr("href", "/route/oneRoute.html?routeId="+route.routeId);
        		}
        	}else{
        		alert(result.tipMsg);
        	}
        },
        error : function(data) {
        	alert("系统异常");
        }
	});
}

function initSpots(){
  jQuery.ajax({
    type : "GET",
        async: false,
        cache: false,
        datatype : "json",
        url : "/spot/top4",
        success : function(result){
          if(result.status == "success"){
            var data = result.data;
            for(var i=0; i<data.length; i++){
              //
              
              var spot = data[i];
              //console.log(spot.name);
              //console.log(spot.thumbnail);
              $("#spot_thumbnail_"+i).attr("src",spot.thumbnail);
              $("#spot_name_"+i).text(spot.name);
              $("#spot_feature_"+i).text(spot.feature);
              $("#spot_link_"+i).attr("href", "/discovery/oneSpot.html?spotId="+spot.spotId);
            }
          }else{
            alert(result.tipMsg);
          }
        },
        error : function(data) {
          alert("系统异常");
        }
  });
}

$(function(){
    $('[data-toggle="popover"]').popover({ html: "true",
  });
});