 // 加载订单

    var routeOrderId = $.getUrlParam('routeOrderId');
    //console.log(spotId);
    $(document).ready(function() { 
       initOrderInfo();// 加载游客基本信息
    });

    // 加载订单详情
    function initOrderInfo(){
      jQuery.ajax({
        type : "GET",
        async: true,
        cache: false,
        datatype : "json",
        url : "/routeOrder/detail?routeOrderId="+routeOrderId,
        success : function(result){
          if(result.status == "success"){
            var order = result.data;            
              $("#orderNo").text(order.orderNo);
              $("#orderThumbnail").attr("src", order.orderThumbnail);
              $("#orderTitle").text(order.orderTitle);
              //$("#sigleprice").text(order.price);
              //$("#startTime").text(order.startTime);
              //$("#maleCount").text(order.maleCount);
              //$("#femaleCount").text(order.femaleCount);
              //console.log(order.orderStatus);
              var orderStatus=parseInt(order.orderStatus);
              switch(orderStatus)
              {
                case 01:
                console.log(order.orderStatus);
                $("#orderStatus").text("未支付");
                break;

                case 02:
                $("#orderStatus").text("已支付");
                break;

                case 03:
                $("#orderStatus").text("待评价");
                break;

                case 04:
                $("#orderStatus").text("已评价");
                break;

                case 05:
                $("#orderStatus").text("已过期");
                break;

                case 06:
                $("#orderStatus").text("已取消");
                break;

                case 07:
                $("#orderStatus").text("已删除");
                break;

                case 08:
                $("#orderStatus").text("已退款");
                break;
              }
              //if(order.orderStatus!=01)
              //{$("#quickly_pay").addClass("disabled")}
                //$("#weixinGroupPic").attr("src", order.weixinGroupPic);
              
          }
          else{
             dealFailedResponse(result);
            //alert(result.tipMsg);
          }
          
        },
        error : function(data) {
          alert("系统异常");
        }
      });
    }


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