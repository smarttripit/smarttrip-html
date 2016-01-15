/*发表评论*/
   var routeId = $.getUrlParam('routeId');
     $("#commentpublish").click( 
      function() {
          var comment_content=$("#commentcontent").val();
          var comment_score=$("#input-21e").val();
          var image_urls=[];
          var comment_img="";
          var img_num=$("#img_preview").find("img").size();
          for(var i=0;i<img_num;i++)
          {
            image_urls[i]=$("#img_preview").find("img").eq(i).attr("src");
            if (comment_img.length>1||comment_img.length==1 )
            {
              comment_img=comment_img+","+image_urls[i];                             
            }
            else
            {
              comment_img=comment_img+image_urls[i];
            } 
          }        
          console.log(comment_content);
          //console.log(comment_score);
          //console.log(comment_img);
          jQuery.ajax({
            type : "GET",
            async: true,
            data : {productType:"01",content:comment_content,score:comment_score,imageURL:comment_img},
            cache: false,
            datatype : "json",
            url : "/comment/newComment?productId="+routeId,
            success : function(result){
              if(result.status == "success"){ 
              

              // pagination(paginationOptions); 
              //data.content=$("#commentcontent").val();
                //console.log(data);
                //data.score=$("#input-21e").val();
              }else{
                 dealFailedResponse(result);
                //alert(result.tipMsg);
              }
          },
          error : function(data) {
              alert("系统异常");
          }
          });                        
     });