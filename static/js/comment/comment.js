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