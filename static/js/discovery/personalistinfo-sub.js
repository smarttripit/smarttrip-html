     //选中主题
     $(".travel_love  a").click( 
         function(){
            console.log("1");
            var len2_2=$(this).text().length;
            var textvalue2_1=$(this).text();
            var textvalue2_2=$(this).text().substring(0,len2_2-1);
            var Comtheme = paginationOptions.queryParams.themeIds;
            var ComthemeNumber = Comtheme;
            var  s  = $(this).attr("val");
            var len=s.length;
            ipos=Comtheme.indexOf(s);
            if($(this).hasClass("else_active"))
              {$(this).removeClass("else_active");
               
                if (ComthemeNumber.length>1 )
                {
                  str1=Comtheme.substr(ipos-1,len+1);
                    Comtheme=Comtheme.replace(str1,"");             
                }
                else 
                {
                    str2=Comtheme.substr(ipos,len);
                    Comtheme=Comtheme.replace(str2,"");           
                }               
               }
            else{$(this).addClass("else_active");
               if (ComthemeNumber.length>1||ComthemeNumber.length==1 )
                {
                   Comtheme=Comtheme+","+s;                             
                }
                else
                {
                   Comtheme=Comtheme+s;
                } 
          }
         paginationOptions.queryParams.themeIds=Comtheme;
         for(var i=0; i<8; i++)
         {$("#spot_"+i).css("display","none" );} 
         pagination(paginationOptions);   
         console.log(paginationOptions.queryParams.themeIds);
         if($(this).text().indexOf("√")!=-1){$(this).text(textvalue2_2);}
         else{$(this).text(textvalue2_1+"√");}
     });