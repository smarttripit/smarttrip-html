
    var spotId = $.getUrlParam('spotId');
    //console.log(spotId);
    $(document).ready(function() { 
       initSpots();// 加载发现北京详情页
       initImages();// 加载景点详情的图片集
       initLocations();// 加载景点详情的图片集
    });

    // 加载发现北京详情页
    function initSpots(){
      jQuery.ajax({
        type : "GET",
        async: true,
        cache: false,
        datatype : "json",
        url : "/spot/detail?spotId="+spotId,
        success : function(result){
          if(result.status == "success"){
            var spot = result.data;            
              $(".scenery_spot1").css("background-image", "url("+spot.backgroundImg+")");
              $("#spot_name").text(spot.name);
              $("#spot_recommendation").text(spot.recommendation);
              $("#spot_commentRatio").text(spot.commentRatio);
              $("#spot_duration").text(spot.duration);
              $("#spot_travelTime").text(spot.travelTime);
              $("#spot_map").attr("src", spot.map);
              $("#spot_basicInfo").html(spot.basicInfo);
              $("#spot_ticketInfo").html(spot.ticketInfo);
              $("#spot_transportInfo").html(spot.transportInfo);
              $("#spot_notice").html(spot.notice);
              $("#spot_spotLocationInfo").html(spot.spotLocationInfo);
              for(var j=0;j<spot.themes.length;j++)
              {
                $("#spot_themes_"+j).css("display","block" );
                $("#spot_themes_"+j).text(spot.themes[j].name);
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

    function initImages(){
      jQuery.ajax({
        type : "GET",
        async: true,
        cache: false,
        datatype : "json",
        url : "/spot/images?spotId="+spotId,
        success : function(result){
          if(result.status == "success"){
              var imagesHref=[];
              for(var j=0;j<result.data.length;j++)
              {
                var image = result.data[j];
                var obj=new Object();
                $(".spot_images_"+j).css("display","block" );
                $(".spot_images_"+j).attr("src",image.imageURL);
                obj.href= image.imageURL;
                imagesHref.push(obj);//按顺序依次push进去
              }
              //console.log(imagesHref);
             $('.fancybox').fancybox();
             $("#fancybox-manual-c").click(function() {
                    $.fancybox.open(imagesHref,
                      {
                        helpers : {thumbs : {width: 75,height: 50}}
                      });
                   });   
         }else{
            alert(result.tipMsg);
          }
        },
        error : function(data) {
          alert("系统异常");
        }
     });
    }

    function initLocations(){
      jQuery.ajax({
        type : "GET",
        async: true,
        cache: false,
        datatype : "json",
        url : "/spot/locations?spotId="+spotId,
        success : function(result){
          if(result.status == "success"){ 
              var locations=Array();
              locations.push(result.data.type1);
              locations.push(result.data.type2);
              locations.push(result.data.type3);
              //console.log(locations);
              //console.log(locations.length);
              for(var i=0;i<locations.length;i++)
              {
                for(var j=0;j<locations[i].length;j++)
                { 
                  //console.log(locations[i].length);
                  //console.log(locations[i]);
                  $("#locations_"+i+j).css("display","block" );                                  
                  $("#locations_name_"+i+j).text(locations[i][j].name);
                  $("#locations_description_"+i+j).text(locations[i][j].description);
                  $("#locations_imageURL_"+i+j).attr("src",locations[i][j].imageURL);
                  $("#locations_link_"+i+j).attr("href",locations[i][j].link);
                }
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


       //好评差评中评
       $("#good_bad_comment ul li a").click(function(){if($(this).has(".defined_active")){ 
       $(this).addClass("defined_active").parent("li").siblings("li").find("a").removeClass("defined_active");}}) 

    $(document).ready(function() {
     // 加载发现北京评论列表
     var paginationOptions = {
       domId : "pager2",
       productType:"03",
       url : "/comment/getByPage?productId="+spotId,
       page : 1,
       rows : 6,
       queryParams : {score:""},
       dealData : function(dataList){
         var len = dataList.length;
         if(len > 0){
             $("#navpills").css("display","block");
           for(var i=0; i<len; i++){
             var row = dataList[i];
             $("#comment_"+i).css("display","block" );
             //console.log(row.routeId);            
             $("#comment_id_"+i).text(row.commentId);//
             $("#comment_content_"+i).text(row.content);            
             $("#comment_score_"+i).text(row.score);//
             $("#comment_commentTime_"+i).text(row.commentTime);             
             $("#comment_visitorThumbnail_"+i).attr("src",row.visitorThumbnail);
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
             //console.log(imagesHref2);
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

/*发表评论*/
     $("#commentpublish").click( 
      function() {
        jQuery.ajax({
          type : "GET",
          async: true,
          data : $("#commentform").serialize(),
          cache: false,
          productType:"03",
          datatype : "json",
          url : "/comment/newComment?productId="+spotId,
          success : function(result){
            if(result.status == "success"){ 

              //data.content=$("#commentcontent").val();
                console.log(data);
                //data.score=$("#input-21e").val();
           }else{
              alert(result.tipMsg);
            }
          },
          error : function(data) {
            alert("系统异常");
          }
       });                        
     });
