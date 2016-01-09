     $("#orderliststate ul li a").click(function()
	   {
      if($(this).has(".defined_active"))
	    {
       $(this).addClass("defined_active").parent("li").siblings("li").find("a").removeClass("defined_active");
      }
     }); 
    
     $(document).ready(function() { 
      var paginationOptions = {
			       domId : "pager2",
			       url : "/routeOrder/getByPage",
			       page : 1,
			       rows : 8,
			       queryParams : {orderStatus:""},
			       dealData : function(dataList){                       
				                var len = dataList.length;
				                if(len > 0){
					                 for(var i=0; i<len; i++){
						                   var row = dataList[i];
                               $("#route_"+i).css("display","block" );                  
                               var href=$("#route_"+i).attr("href");
                               $("#route_"+i).attr("href",href+"?"+"routeId="+row.routeId);              
                               $("#route_name_"+i).text(row.name);
                               $("#route_thumbnail_"+i).attr("src", row.thumbnail);
                               $("#route_detailRecommendation_"+i).text(row.detailRecommendation);
                               $("#route_commentRatio_"+i).text(row.commentRatio);
                               $("#route_purchaseCount_"+i).text(row.purchaseCount);
                               $("#route_bottomPrice_"+i).text(row.bottomPrice);

                               for(var j=0;j<row.themes.length;j++)
                               {
                                  $("#route_themes_"+i+j).css("display","block" );
                                  $("#route_themes_"+i+j).text(row.themes[j].themeName);
                               }
					                 }
			  	              }
			       }
	        }

	  });