    (function($){
          $.getUrlParam
            = function(name)
                     {
                      var reg = new RegExp("(^|&)"+name +"=([^&]*)(&|$)");
                      var r = window.location.search.substr(1).match(reg);
                      if (r!=null) 
                        return unescape(r[2]); 
                      return null;
                     }
    })(jQuery);
    var spotId = $.getUrlParam('spotId');
    var productId = $.getUrlParam('productId');

    $(document).ready(function() { 
       initSpots();// 加载发现北京详情页
       initImages();// 加载景点详情的图片集
       initLocations();// 加载景点详情的图片集
    });

    // 加载发现北京详情页
    function initSpots(){
      jQuery.ajax({
        type : "GET",
        async: false,
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
        async: false,
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
        async: false,
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





