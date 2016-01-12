var routeId = $.getUrlParam('routeId');
var productType;
    function initRouteInfo(){
      jQuery.ajax({
        type : "GET",
            async: true,
            cache: false,
            datatype : "json",
            url : "/route/detail?routeId="+routeId,
            success : function(result){
              if(result.status == "success"){
                 var oneRoute = result.data;
                 if(oneRoute.routeType == "1"){
                	 productType = "10";
                 }else if(oneRoute.routeType == "2"){
                	 productType = "11";
                 }
                 $("#oneRoute_name").html(oneRoute.name);
                 $(".bgimg").css("background-image", "url("+oneRoute.backgroundImg+")");
                 $("#oneRoute_feature").html(oneRoute.feature);
                 $("#oneRoute_detailRecommendation").html(oneRoute.detailRecommendation);
                 $("#oneRoute_commentRatio").html(oneRoute.commentRatio);
                 $("#oneRoute_period").html(oneRoute.period);
                 $("#oneRoute_detail").html(oneRoute.detail);
                 $("#oneRoute_map").attr("src",oneRoute.map);
                 $("#oneRoute_feeDescription").html(oneRoute.feeDescription);
                 $("#oneRoute_bookingNotice").html(oneRoute.bookingNotice);
              }else{
                alert(result.tipMsg);
              }
            },
            error : function(data) {
              alert("系统异常");
            }
      });
     }
     function initSchedules(){
       jQuery.ajax({
         type : "GET",
             async: true,
             cache: false,
             datatype : "json",
             url : "/route/schedules?routeId="+routeId,

             success : function(result){
               if(result.status == "success"){
                 var count=0;
                 var Content="";
                 var myDir = " ";
                 var description = [];
                 var data = result.data;
                 for(var i=0; i<data.length; i++){
                   var oneLocal = data[i];
                   var scheduleId = oneLocal.scheduleId;
                   var period = oneLocal.period;
                   var scheduleType = oneLocal.scheduleType;
                   var name = oneLocal.name;
                   var summary = oneLocal.summary;
                   description[i] = oneLocal.description;
                   var thumbnail = oneLocal.thumbnail;
                   var direction = oneLocal.direction;
                   var link = oneLocal.link;
                   
                   if(direction==1)
                   {
                     myDir = "";
                   }else if(direction==0){
                     myDir = "class = \"timeline-inverted\"";
                   };

                   switch(parseInt(scheduleType)){
                     case 1:
                     Content += "<li"+" "+myDir+"><div class=\"timeline-badge\"><i class=\"fa fa-bus\"></i></div><div class=\"timeline-panel\"><div class=\"timeline-heading\"><h4 class=\"timeline-title\">"+name+"</h4><a><small class=\"text-muted\"><i class=\"fa fa-clock-o\"></i>"+period+"</small></a></div></div></li>";
                     break;
                     case 2:
                     Content +="<li"+" "+myDir+"><div class=\"timeline-badge warning\"><i class=\"fa fa-money\"></i></div><div class=\"timeline-panel\"><div class=\"timeline-heading\"><h4 class=\"timeline-title\">"+summary+"</h4><p><small class=\"text-muted\">"+description+"</small></p></div></div></li>";
                     break;
                     case 3:
                     Content +="<li"+ " "+myDir+"><div class=\"timeline-badge danger\"><i class=\"fa fa-map-marker\"></i></div><div class=\"timeline-panel\" data-toggle=\"modal\" data-target=\"#myModal\"><div class=\"timeline-body img_des\"><img src="+thumbnail+" class=\"img-responsive\"></div><div class=\"panel-footer\"><p>"+name+"</p>"+summary+"<br/><small class=\"text-muted\"><i class=\"fa fa-clock-o\"></i>"+period+"</small></div></div></li>";
     
                     break;
                     case 4:
                     Content +="<li"+ " "+myDir+"><div class=\"timeline-badge danger\"><i class=\"fa fa-coffee\"></i></div><div class=\"timeline-panel\" data-toggle=\"modal\" data-target=\"#myModal\"><div class=\"timeline-body img_des\"><img src="+thumbnail+" class=\"img-responsive\"></div><div class=\"panel-footer\"><p>"+name+"</p>"+summary+"<br/><small class=\"text-muted\"><i class=\"fa fa-clock-o\"></i>"+period+"</small></div></div></li>";
                       
                     break;
                     case 5:
                     Content +="<li><div id=\"day1\" class=\"tldate\">"+name+"</div></li>";
                     break;
                   }
                 }
                

               $('.timeline').append(Content);

               var timeline_lis = $('.timeline li');


               $.each(timeline_lis,function(key,val){
                  $(this).click(function(){
                    var this_key = key;
                    $('.oneLocal').html(description[this_key]);
                  })
               })
               
               }else{
                 alert(result.tipMsg);
               }
             },
             error : function(data) {
               alert("系统异常");
             }
       });
     }
     
     function initRelatedRoutes(){
    	 jQuery.ajax({
             type : "GET",
                 async: true,
                 cache: false,
                 datatype : "json",
                 url : "/route/relatedRoutes?routeId="+routeId,
                 success : function(result){
                	 if(result.status == "success"){
                		 var relatedContent = "";
                		 if(result.data.total > 0){
                			 var relatedRoutes = result.data.rows;
                    		 for(var i=0;i<relatedRoutes.length;i++){
                    			 var one = relatedRoutes[i];
                    			 var template = $('#relatedRoutesTemplate').html();
                    			 template = template.replaceAll("@href@", "/route/oneRoute.html?routeId="+one.routeId, false);
                    			 template = template.replaceAll("@thumbnail@", one.thumbnail, false);
                    			 template = template.replaceAll("@feature@", one.feature, false);
                    			 template = template.replaceAll("@name@", one.name, false);
                    			 template = template.replaceAll("@price@", one.price, false);
                    			 relatedContent += template;
                    		 }
                		 }
                		 var customizationHtml = $('#gotoCustomizationTemplate').html();
                		 relatedContent += customizationHtml;
                		 $('#relatedRoutes').html(relatedContent);
                		 //跳转到团建定制页面
                  	     $('#gotoCustomization').on('click', function(){
                  		     window.location.href = "/mytrip-customize/mytrip-customize.html?productType="+productType+"&productId="+routeId; 
                  	     });
                	 }else{
                		 dealFailedResponse(result);
                	 }
                 },
                 error : function(data) {
                   alert("系统异常");
                 }
           });
     }
      

      //判断订单是否成功
      function isOrderOk(){
        var pn = parseInt($('.people_num').text());
        var mn = parseInt($('.male_num option:selected').text());
        var fn = parseInt($('.female_num option:selected').text());
        if((mn+fn<=pn)&&(mn+fn)>0){
          return true;
        }else
        {
          return false;
        }
      }

     jQuery(function($) {
       $(document).ready( function() {
    	   // 跳转到订单填写页面
    	   $('#gotoBooking').on('click', function(){
    		   window.location.href = "/order/createOrder.html?productType="+productType+"&productId="+routeId; 
    	   });

         //导航栏切换效果
         $('.navbar-wrapper').stickUp({
           parts: {                         
             0:'product_detail',
             1: 'introduce',
             2: 'transport-map',
             3: 'cost',
             4: 'book',
             5: 'recommend',
             6: 'comment'
            
           },
           parts1: {                         
             0:'product_detail1',
             1: 'introduce1',
             2: 'transport-map1',
             3: 'cost1',
             4: 'book1',
             5: 'recommend1',
             6: 'comment1'
            
           },
           itemClass: 'menuItem',
           itemHover: 'active',
           topMargin: 'auto'
         });
         
         //弹出框
         function place(klass){
           $(klass).height($(window).height()*0.7);
         }
         function adjustNavShow(myId){
           $(myId).on('show.bs.modal',function(){
             if($('#navId').hasClass('isStuck')){
               $('.stuckMenu').css('width',$(window).width());
             }
           });
         }

         function adjustNavHide(myId){
           $(myId).on('hidden.bs.modal',function(){
               $('.stuckMenu').css('width','100%');
             
           });
         }
         $('#myModal').on('show.bs.modal',place('.oneLocal')); 
         adjustNavShow('#myModal');
         adjustNavHide('#myModal');
         
         //timeline每一个列表项的鼠标移入移出事件  

         // 加载经典线路数据
         initRouteInfo();
         // 加载线路行程
         initSchedules();
         // 加载相关推荐
         initRelatedRoutes();

          $('.rili_btn').click(function(){
            if(!isOrderOk()){
              alert('请选择人数');
              $('.rili_btn a').attr('href',' ');
            }else{
              return 0;
            }
          })

       });


     });

    

