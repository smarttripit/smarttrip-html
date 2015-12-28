 var productId = $.getUrlParam('productId');
 
/*获取当前时间后的DaysToAdd天的日期*/
 function AddDays(DaysToAdd) {
    
   var newdate=new Date();
   var newtimems=newdate.getTime()+(DaysToAdd*24*60*60*1000);

   newdate.setTime(newtimems);
   var myYear = newdate.getFullYear().toString();
   var myMon = (newdate.getMonth()+1).toString();
   var myDate = newdate.getDate().toString();
   var riqi = myYear+'-'+myMon+'-'+myDate;
   return riqi;
 } 
 /*设置订房和退房日期的默认值*/
 $('#currentDay').val(AddDays(0));

 $('#nextDay').val(AddDays(1));

 jQuery(function($) {
      $(document).ready( function() {

        $('.navbar-wrapper').stickUp({

          parts: {                         
            0:'hotel_style',
            1: 'hotel_address',
            2: 'hotel_information',
            3: 'hotel_photos',
            4: 'hotel_policy',
            5: 'hotel_infrastructure',
            6: 'neighbor_infrastructure',
            7: 'zhouzhou_commend',
            8: 'zhouzhou_comment'
            
          },
          parts1: {                         
            0:'hotel_style1',
            1: 'hotel_address1',
            2: 'hotel_information1',
            3: 'hotel_photos1',
            4: 'hotel_policy1',
            5: 'hotel_infrastructure1',
            6: 'neighbor_infrastructure1',
            7: 'zhouzhou_commend1',
            8: 'zhouzhou_comment1'
          },
          itemClass: 'menuItem',
          itemHover: 'active',
          topMargin: 'auto'
        });
      });
 

      //时间选择器
      
      $(".date_in").datepicker({minDate: 0});
      $(".date_out").datepicker({minDate: 0});

  });



 /*ajax获取评论数据*/
  //好评差评中评
  $("#good_bad_comment ul li a").click(function(){if($(this).has(".defined_active")){ 
  $(this).addClass("defined_active").parent("li").siblings("li").find("a").removeClass("defined_active");}}) 

  $(document).ready(function() {
  // 加载发现北京评论列表
  var paginationOptions = {
    domId : "pager2",
    productType:"03",
    url : "/comment/getByPage?productId="+productId,
    page : 1,
    rows : 6,
    queryParams : {score:""},
    dealData : function(dataList){
      var len = dataList.length;
      if(len > 0){
        for(var i=0; i<len; i++){
          var row = dataList[i];
          $("#comment_"+i).css("display","block" );
          //console.log(row.routeId);            
          $("#comment_id_"+i).text(row.commentId);//
          $("#comment_content_"+i).text(row.content);            
          $("#comment_score_"+i).text(row.score);//
          $("#comment_commentTime_"+i).text(row.commentTime);
          $("#comment_visitorName_"+i).text(row.visitorName);
          $("#comment_visitorId_"+i).text(row.visitorId);//
          var images = row.images;
          var len1=images.length;
          $("#comment_imgNum_"+i).text(len1);
          var imagesHref2=[];

          if(images.length > 0){
            for(var j=0; j<images.length; j++){
              var img = images[j];
              var obj=new Object();
              $("#comment_images_"+i+j).css("display","block" );
              $("#comment_images_"+i+j).attr("src",img.imageURL);
              obj.href= img.imageURL;
              imagesHref2.push(obj);//按顺序依次push进去 
            }
          }
          console.log(imagesHref2);
          $('.fancybox').fancybox();
          $(".fancybox-manual-a").click(function() {
             $.fancybox.open(imagesHref2,
               {
                 helpers : { thumbs : {width: 75,height: 50}
               }
             });
          });
        }
      }
    }
  }
  pagination(paginationOptions);
 });