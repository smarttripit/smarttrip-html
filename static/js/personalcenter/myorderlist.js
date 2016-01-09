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

			       }
	        }
      pagination(paginationOptions);
	  });