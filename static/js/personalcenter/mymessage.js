     $("#message_tab li a").click(function()
	   {
      if($(this).has(".defined_active"))
	    {
       $(this).addClass("defined_active").parent("li").siblings("li").find("a").removeClass("defined_active");
      }
     }); 

     $(function () {
      $("#message_tab li:eq(0) a").tab('show');
     });

