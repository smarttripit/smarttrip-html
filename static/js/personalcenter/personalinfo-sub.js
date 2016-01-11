     //选中主题
   /* $(".travel_love  a").click( 
         function(){
            console.log("1");
            var len2_2=$(this).text().length;
            var textvalue2_1=$(this).text();
            var textvalue2_2=$(this).text().substring(0,len2_2-1);*/
            /*var Comtheme = paginationOptions.queryParams.themeIds;
            var ComthemeNumber = Comtheme;
            var  s  = $(this).attr("val");
            var len=s.length;
            ipos=Comtheme.indexOf(s);*/
         /*   if($(this).hasClass("else_active"))
              {$(this).removeClass("else_active");*/
               
               /* if (ComthemeNumber.length>1 )
                {
                  str1=Comtheme.substr(ipos-1,len+1);
                    Comtheme=Comtheme.replace(str1,"");             
                }
                else 
                {
                    str2=Comtheme.substr(ipos,len);
                    Comtheme=Comtheme.replace(str2,"");           
                }             
               }*/  
          /*  else{$(this).addClass("else_active");*/
              /* if (ComthemeNumber.length>1||ComthemeNumber.length==1 )
                {
                   Comtheme=Comtheme+","+s;                             
                }
                else
                {
                   Comtheme=Comtheme+s;
                } */
         /* }*/
         /*paginationOptions.queryParams.themeIds=Comtheme;
         for(var i=0; i<8; i++)
         {$("#spot_"+i).css("display","none" );} 
         pagination(paginationOptions);   
         console.log(paginationOptions.queryParams.themeIds);*/
        /* if($(this).text().indexOf("√")!=-1){$(this).text(textvalue2_2);}
         else{$(this).text(textvalue2_1+"√");}
     });*/

      /*修改信息*/
     $("#userinfo_change").click( 
      function() {
        var user_truename=$("#user_truename").val();
        var user_gender=$('#user_gender label input[name="usergender"]:checked').val();
        var user_birthday=$("#user_birthday").val();
        var user_city=$("#user_city").val();
        var user_profession=$("#user_profession").val();
        var user_education=$("#user_education").find("option:selected").text();
        var user_introduction=$("#user_introduction").val();

        console.log(user_gender);
        console.log(user_education);
        jQuery.ajax({
          type : "GET",
          async: true,
          data : {realName:user_truename, gender:user_gender, birthday: user_birthday, city:user_city, profession:user_profession,education:user_education,introduction:user_introduction,},
          cache: false,
          datatype : "json",
          url : "/visitor/modifyVisitorInfo",
          success : function(result){
            if(result.status == "success"){ 
                          
            }else{
              alert(result.tipMsg);
            }
          },
          error : function(data) {
            alert("系统异常");
          }
        });                        
     });