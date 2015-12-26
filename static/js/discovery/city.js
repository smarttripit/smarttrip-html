/*ajax加载后台数据*/
  // 加载地区
  function initComPlace(){
       jQuery.ajax({
        type : "GET",
        async: true,
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
        async: true,
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

  // 加载游玩同伴
  function initComPartner(){
        jQuery.ajax({
        type : "GET",
        async: true,
        cache: false,
        datatype : "json",
        url : "/companion/getAll",
        success : function(result){
          if(result.status == "success"){
            var Compartner = result.data; 
         // console.log(Comtheme.length);
              for(var j=0;j<Compartner.length;j++)
              {
                $("#Compartner_name_"+j).css("display","block");                
                $("#Compartner_name_"+j).text(Compartner[j].companionName); 
                $("#Compartner_name_"+j).attr("val",Compartner[j].companionId);
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

    // 加载发现北京列表
  $(document).ready(function() {   
      initComPlace();
      initComTheme();
      initComPartner(); 
      var paginationOptions = {
          domId : "pager2",
          url : "/spot/getByPage",
          page : 1,
          rows : 8,
          queryParams : {name:"",regionIds:"",themeIds:"",companionIds:"",seasonIds:""},

          dealData : function(dataList){

            var len = dataList.length;
            if(len > 0){
              for(var i=0; i<len; i++){
                var row = dataList[i];
                $("#spot_"+i).css("display","block" );
                var href=$("#spot_"+i).attr("href");
                $("#spot_"+i).attr("href",href+"?"+"spotId="+row.spotId); 
                $("#spot_thumbnail_"+i).attr("src", row.thumbnail); 
                $("#spot_name_"+i).text(row.name);
                $("#spot_commentRatio_"+i).text(row.commentRatio);          
                $("#spot_recommendation_"+i).text(row.recommendation);
              }
           }           
          }
      }
        
     //选择地区
     $(".RegionID  a").click( 
        function(){            
            var Complace = paginationOptions.queryParams.regionIds;            
            var  s  = $(this).attr("val");            
            Complace=s;
            paginationOptions.queryParams.regionIds=Complace;
            for(var i=0; i<8; i++)
            {$("#spot_"+i).css("display","none" );}
            pagination(paginationOptions); 
            console.log(paginationOptions.queryParams.regionIds);         
     });

     $("area").click( 
        function(){            
            var Complace = paginationOptions.queryParams.regionIds;            
            var  idname  = $(this).attr("id");
            var citys=$('.city li');
            var city_len=citys.length;            
            for(var i=0;i<city_len;i++)
               {
                if(citys.eq(i).attr('name')==idname)
                {
                 var Complace = paginationOptions.queryParams.regionIds;            
                 var s=citys.eq(i).find('a').attr("val");            
                 Complace=s;
                 paginationOptions.queryParams.regionIds=Complace;
                 for(var i=0; i<8; i++)
                 {$("#spot_"+i).css("display","none" );}   
                 pagination(paginationOptions); 
                 console.log(paginationOptions.queryParams.regionIds);
                };
              }         
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

     //选中同伴
     $(".CompanionId  a").click( 
         function(){
             var len2_2=$(this).text().length;
             var textvalue2_1=$(this).text();
             var textvalue2_2=$(this).text().substring(0,len2_2-1);
             var Comcompanion = paginationOptions.queryParams.companionIds;
             var ComcompanionNumber = Comcompanion;
             var  s  = $(this).attr("val");
             var len=s.length;
             ipos=Comcompanion.indexOf(s);
             if($(this).hasClass("else_active"))
              { $(this).removeClass("else_active");               
                if (ComcompanionNumber.length>1 )
                {
                  str1=Comcompanion.substr(ipos-1,len+1);
                  Comcompanion=Comcompanion.replace(str1,"");             
                }
                else 
                {
                  str2=Comcompanion.substr(ipos,len);
                  Comcompanion=Comcompanion.replace(str2,"");           
                }               
               }
             else{ $(this).addClass("else_active");
                   if(ComcompanionNumber.length>len||ComcompanionNumber.length==len)
                    {
                      Comcompanion=Comcompanion+","+s;             
                    }
                   else
                    {
                      Comcompanion=Comcompanion+s;               
                    } 
                 }
              paginationOptions.queryParams.companionIds=Comcompanion;
              for(var i=0; i<8; i++)
              {$("#spot_"+i).css("display","none" );} 
              pagination(paginationOptions);   
              console.log(paginationOptions.queryParams.companionIds);
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
              for(var i=0; i<8; i++)
              {$("#spot_"+i).css("display","none" );} 
              pagination(paginationOptions);   
              console.log(paginationOptions.queryParams.seasonIds);
              if($(this).text().indexOf("√")!=-1){$(this).text(textvalue2_2);}
              else{$(this).text(textvalue2_1+"√");}
     });

    
      /*搜索功能*/
     $("#Search").click( 
         function(){
          var Searchname = $("#Searchname").val();
          paginationOptions.queryParams.name=Searchname;
          for(var i=0; i<8; i++)
          {$("#spot_"+i).css("display","none" );} 
          pagination(paginationOptions);
          console.log(paginationOptions.queryParams.name); 
          console.log(paginationOptions.queryParams);          
     });
     pagination(paginationOptions);

     
      var imgs=$('.beijingmap').find('a');
      var citys=$('.city li'); 
      var city_len=citys.length;           
      citys.click(function(){
           citys.find('a').removeClass('city_active');
           for(var i=0;i<city_len;i++)
           {if(citys.eq(i).find('a').text().indexOf("√")!=-1)
            {
              var a_len=citys.eq(i).find('a').text().length;
              var sub1=citys.eq(i).find('a').text().substr(a_len-1,1);
              citys.eq(i).find('a').text(citys.eq(i).find('a').text().replace(sub1,""));
            }
           }
           $(this).find('a').addClass('city_active');
           imgs.hide();
           $('.'+$(this).attr('name')).show();
           var len2_2=$(this).text().length;
           var textvalue2_1=$(this).text();
           var textvalue2_2=$(this).text().substring(0,len2_2-1);             
           if($(this).find('a').text().indexOf("√")!=-1)
           {$(this).find('a').text(textvalue2_2);}
           else
           {$(this).find('a').text(textvalue2_1+"√");}
      });   
  });


   $(function(){
  $('[data-toggle="popover"]').popover({ html: "true",
                                      });
             });

/*根据窗口大小室地图消失掉*/
 var winWidth = 0; 
 var winHeight = 0; 
 function findDimensions() //函数：获取尺寸 
 { 
   //获取窗口宽度 
  if (window.innerWidth) 
     winWidth = window.innerWidth; 
  else if ((document.body) && (document.body.clientWidth)) 
     winWidth = document.body.clientWidth; 
  //获取窗口高度 
  if (window.innerHeight) 
     winHeight = window.innerHeight; 
  else if ((document.body) && (document.body.clientHeight)) 
     winHeight = document.body.clientHeight; 
 //通过深入Document内部对body进行检测，获取窗口大小 
  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) 
  { 
    winHeight = document.documentElement.clientHeight; 
    winWidth = document.documentElement.clientWidth; 
  } 
  //结果输出至两个文本框 
   return winWidth;
 } 

  $(function(){
    findDimensions();
    window.onresize=findDimensions; 
    $(window).resize(function(){  
        if (winWidth <= 1170) {//768及以下分辨率
                $("#beijingmap").attr("class", "col-xs-12 col-sm-12 col-md-12 col-lg-6 beijingmap display_none");               
            } else
            { $("#beijingmap").attr("class", "col-xs-12 col-sm-12 col-md-12 col-lg-6 beijingmap display_in");}
   });

             //判断是否宽屏
            var winWide =$(window).width() ;
            
            var wideScreen = false;
            if (winWide <= 1170) {//768及以下分辨率
                $("#beijingmap").attr("class", "col-xs-12 col-sm-12 col-md-12 col-lg-6 beijingmap display_none");
            } else {
                  $("#beijingmap").attr("class", "col-xs-12 col-sm-12 col-md-12 col-lg-6 beijingmap display_in");
                wideScreen = true; //是宽屏
            }
  });

  function show_map(str)
  {
       var imgs=$('.beijingmap').find('a');
       var citys=$('.city li');
       var city_len=citys.length;
       imgs.hide();
       $('.'+str).show();
       for(var i=0;i<city_len;i++)
       {
        if(citys.eq(i).find('a').text().indexOf("√")!=-1)
           {
             var a_len=citys.eq(i).find('a').text().length;
             var sub1=citys.eq(i).find('a').text().substr(a_len-1,1);
             citys.eq(i).find('a').text(citys.eq(i).find('a').text().replace(sub1,""));
           }
        if(citys.eq(i).attr('name')==str)
          {
             citys.find('a').removeClass('city_active');
             citys.eq(i).find('a').addClass('city_active');
             var len2_2=citys.eq(i).find('a').text().length;
             var textvalue2_1=citys.eq(i).find('a').text();
             var textvalue2_2=citys.eq(i).find('a').text().substring(0,len2_2-1); 
             if(citys.eq(i).find('a').text().indexOf("√")!=-1)
             {
                citys.eq(i).find('a').text(textvalue2_2);
             }
             else
             {
                citys.eq(i).find('a').text(textvalue2_1+"√");
             }
          }
       }

  }

  $(".city_theme_all").click(
     function(){
         if($("#city_remain").css("display")=="none")
         {   
            $("#city_remain").show();
            $(this).text("收起>>");
         }
         else
         {
            $("#city_remain").hide();
            $(this).text("全部>>");
         }
  });


