     $("#orderliststate ul li a").click(function()
	   {
      if($(this).has(".defined_active"))
	    {
       $(this).addClass("defined_active").parent("li").siblings("li").find("a").removeClass("defined_active");
      }
     }); 