     // 加载地区
     function initComPlace(){
       jQuery.ajax({
        type : "GET",
        async: false,
        cache: false,
        datatype : "json",
        url : "/region/getAll",
        success : function(result){
          if(result.status == "success"){
            var Complace = result.data; 
          // console.log(Complace[2].secondRegion);
              for(var j=0;j<Complace.length;j++)
              {
                $("#Complace_secondRegion_"+j).css("display","block");
                
                $("#Complace_secondRegion_"+j).text(Complace[j].secondRegion);
                   
                $("#Complace_secondRegion_"+j).attr("val",Complace[j].regionId);
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

     // 加载主题
     function initComTheme(){
        jQuery.ajax({
        type : "GET",
        async: false,
        cache: false,
        datatype : "json",
        url : "/theme/getAll",
        success : function(result){
          if(result.status == "success"){
            var Comtheme = result.data; 
         // console.log(Comtheme.length);
              for(var j=0;j<Comtheme.length;j++)
              {
                $("#Comtheme_name_"+j).css("display","block");
                $("#Comtheme_name_"+j).text(Comtheme[j].name);
                $("#Comtheme_name_"+j).attr("val",Comtheme[j].themeId);
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

	   // 加载经典线路列表
     $(document).ready(function() { 
          initComPlace();
          initComTheme();   
		      var paginationOptions = {
			       domId : "pager2",
			       url : "/route/getByPage",
			       page : 1,
			       rows : 8,
			       queryParams : {regionIds:"",themeIds:"",periods:"",seasonIds:"",orderType:"summary"},
			       dealData : function(dataList){                       
				                var len = dataList.length;
				                if(len > 0){
					                 for(var i=0; i<len; i++){
						                   var row = dataList[i];
                               $("#route_"+i).css("display","block" );                  
                               var href=$("#route_"+i).attr("href");
                               $("#route_"+i).attr("href",href+"?"+"routeId="+row.routeId);              
                               $("#route_name_"+i).text(row.name);
                               $("#route_thumbnail_"+i).attr("src", row.thumbnail);
                               $("#route_detailRecommendation_"+i).text(row.detailRecommendation);
                               $("#route_commentRatio_"+i).text(row.commentRatio);
                               $("#route_purchaseCount_"+i).text(row.purchaseCount);
                               $("#route_bottomPrice_"+i).text(row.bottomPrice);

                               for(var j=0;j<row.themes.length;j++)
                               {
                                  $("#route_themes_"+i+j).css("display","block" );
                                  $("#route_themes_"+i+j).text(row.themes[j].themeName);
                               }
					                 }
			  	              }
			       }
	        }
     		
          //综合排序
          $("#SynthesisComment").click(function()
             { 
                paginationOptions.queryParams.orderType= "summary";
                pagination(paginationOptions); 
                //console.log(paginationOptions.queryParams.orderType);
          });

          //好评率排序
          $("#GoodComment").click(function()
            { 
              paginationOptions.queryParams.orderType= "commentRatio";
              pagination(paginationOptions); 
              //console.log(paginationOptions.queryParams.orderType);
          });

          //价格升序排列
          $("#Price_lowTohigh_Comment").click(function()
            { 
              paginationOptions.queryParams.orderType= "priceAsc";
              pagination(paginationOptions); 
              //console.log(paginationOptions.queryParams.orderType);
          });

          //价格降序排列
          $("#Price_highTolow_Comment").click(function()
            { 
              paginationOptions.queryParams.orderType= "priceDesc";
              pagination(paginationOptions); 
              //console.log(paginationOptions.queryParams.orderType);
          });  

          //选择地区
          $(".RegionID  a").click( 
              function(){
                          var len2_2=$(this).text().length;
                          var textvalue2_1=$(this).text();
                          var textvalue2_2=$(this).text().substring(0,len2_2-1);
                          var Complace = paginationOptions.queryParams.regionIds;
                          var ComplaceNumber = Complace;
                          var  s  = $(this).attr("val");
                          var len=s.length;
                          if($(this).hasClass("place_days_active"))
                          {
                              $(this).removeClass("place_days_active");
                              ipos=Complace.indexOf(s);
                              if (ComplaceNumber.length>len )
                              {
                	               str1=Complace.substr(ipos-1,len+1);
                                 Complace=Complace.replace(str1,"");             
                              }
                              else 
                              {
                                 str2=Complace.substr(ipos,len);
                                 Complace=Complace.replace(str2,"");           
                              }       
                          }
                         else
                          {
                                $(this).addClass("place_days_active");
                                if (ComplaceNumber.length>len||ComplaceNumber.length==len )
                                { Complace=Complace+","+s;}
                                else{Complace=Complace+s; } 
                          }
                          paginationOptions.queryParams.regionIds=Complace; 
                          pagination(paginationOptions); 
                          //console.log(paginationOptions.queryParams.regionIds);
                          if($(this).text().indexOf("√")!=-1){$(this).text(textvalue2_2);}
                          else{$(this).text(textvalue2_1+"√");}
          });

          //选中主题
          $(".ThemeID  a").click( 
            function(){
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
               
                if (ComthemeNumber.length>len )
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
               if (ComthemeNumber.length>len||ComthemeNumber.length==len )
                {
                   Comtheme=Comtheme+","+s;                             
                }
                else
                {
                   Comtheme=Comtheme+s;
                } 
            }
            paginationOptions.queryParams.themeIds=Comtheme; 
            pagination(paginationOptions);   
            //console.log(paginationOptions.queryParams.themeIds);
            if($(this).text().indexOf("√")!=-1){$(this).text(textvalue2_2);}
            else{$(this).text(textvalue2_1+"√");}
          });

          //选择天数
          $(".PeriodsID  a").click( 
            function(){
            var len2_2=$(this).text().length;
            var textvalue2_1=$(this).text();
            var textvalue2_2=$(this).text().substring(0,len2_2-1);
            var Comday = paginationOptions.queryParams.periods;
            var ComdayNumber = Comday;
            var  s  = $(this).attr("val");
            var len=s.length;
            //console.log(len);
            ipos=Comday.indexOf(s);
            if($(this).hasClass("place_days_active"))
              { $(this).removeClass("place_days_active");
                if (ComdayNumber.length>len )
                {
                	str1=Comday.substr(ipos-1,len+1);
                  Comday=Comday.replace(str1,"");             
                }
                else 
                {
                  str2=Comday.substr(ipos,len);
                  Comday=Comday.replace(str2,"");           
                }       
               }
            else{$(this).addClass("place_days_active");
                  if (ComdayNumber.length>len||ComdayNumber.length==len )
                   {
                      Comday=Comday+","+s;               
                   }
                  else
                   {
                      Comday=Comday+s;                   
                   } 
                 }
            paginationOptions.queryParams.periods=Comday;  
            pagination(paginationOptions);  
            //console.log(paginationOptions.queryParams.periods);
            if($(this).text().indexOf("√")!=-1){$(this).text(textvalue2_2);}
            else{$(this).text(textvalue2_1+"√");}
          });

          //选中季节
          $(".SeasonsID  a").click( 
            function(){
             var len2_2=$(this).text().length;
             var textvalue2_1=$(this).text();
             var textvalue2_2=$(this).text().substring(0,len2_2-1);
             var Comtheme = paginationOptions.queryParams.seasonIds;
             var ComthemeNumber = Comtheme;
             var  s  = $(this).attr("val");
             var len=s.length;
             ipos=Comtheme.indexOf(s);
             if($(this).hasClass("else_active"))
              { $(this).removeClass("else_active");               
                if (ComthemeNumber.length>len )
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
             else{ $(this).addClass("else_active");
                   if(ComthemeNumber.length>len||ComthemeNumber.length==len )
                    {
                      Comtheme=Comtheme+","+s;             
                    }
                   else
                    {
                      Comtheme=Comtheme+s;               
                    } 
                 }
              paginationOptions.queryParams.seasonIds=Comtheme;
              pagination(paginationOptions);     
              //console.log(paginationOptions.queryParams.seasonIds);
              if($(this).text().indexOf("√")!=-1){$(this).text(textvalue2_2);}
              else{$(this).text(textvalue2_1+"√");}
          });

          pagination(paginationOptions);
	   });
      
     $(function(){$('[data-toggle="popover"]').popover({ html: "true",});
     });

     $(function () {
            //判断是否宽屏
            var winWide =$(window).width() ;           
            var wideScreen = false;
            if (winWide <= 768) {//768及以下分辨率
                $("#collapseOne").attr("class", "collapse");
                $("#collapseTwo").attr("class", "collapse");
                $("#collapseThree").attr("class", "collapse");
                $("#collapseFour").attr("class", "collapse");
            } else {
                $("#collapseOne").attr("class", "collapse in");
                $("#collapseTwo").attr("class", "collapse in");
                $("#collapseThree").attr("class", "collapse in");
                $("#collapseFour").attr("class", "collapse in");
                wideScreen = true; //是宽屏
            }
     });

     //好评中评价格
     $("#good_bad_comment ul li a").click(function()
	   {
      if($(this).has(".defined_active"))
	    {
       $(this).addClass("defined_active").parent("li").siblings("li").find("a").removeClass("defined_active");
      }
     }); 
     //全部
     $("#all").click(
    function(){
      if($("#remain").css("display")=="none")
        {   
          $("#remain").show();
          $(this).text("收起");
        }
      else
        {
          $("#remain").hide();
          $(this).text("全部");
        }
     });
  