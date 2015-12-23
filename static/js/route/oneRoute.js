var routeId = $.getUrlParam('routeId');
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
                 $("#oneRoute_name").html(oneRoute.name);
                 $(".bgimg").css("background-image", "url("+oneRoute.backgroundImg+")");
                 $("#oneRoute_feature").html(oneRoute.feature);
                 $("#oneRoute_detailRecommendation").html(oneRoute.detailRecommendation);
                 $("#oneRoute_commentRatio").html(oneRoute.commentRatio);
                 $("#oneRoute_period").html(oneRoute.period);
                 $("#oneRoute_detail").html(oneRoute.detail);
                 $("#oneRoute_map").css("background-image", "url("+oneRoute.map+")");
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
     function initRoute1Info(){
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
                 description = [];
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


     jQuery(function($) {
       $(document).ready( function() {

         //导航栏切换效果
         $('.navbar-wrapper').stickUp({
           parts: {                         
             0:'product_detail',
             1: 'introduce',
             2: 'transport-map',
             3: 'cost',
             4: 'book',
             5: 'comment'
            
           },
           parts1: {                         
             0:'product_detail1',
             1: 'introduce1',
             2: 'transport-map1',
             3: 'cost1',
             4: 'book1',
             5: 'comment1'
            
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
         initRoute1Info();


         

       });
     });


