function show()  //显示隐藏层和弹出层
{
   var hideobj=document.getElementById("hidebg");
   hidebg.style.display="block";  //显示隐藏层
   hidebg.style.height=document.body.clientHeight+"px";  //设置隐藏层的高度为当前页面高度
   document.getElementById("loading").style.display="block";  //显示弹出层
}

function hide()  //去除隐藏层和弹出层
{
   document.getElementById("hidebg").style.display="none";
   document.getElementById("loading").style.display="none";
}
    
//浏览器窗口居中         
function getScroll(){      
                var bodyTop = 0;        
                if (typeof window.pageYOffset != 'undefined') {        
                    bodyTop = window.pageYOffset;        
                } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {        
                    bodyTop = document.documentElement.scrollTop;        
                }        
                else if (typeof document.body != 'undefined') {        
                   bodyTop = document.body.scrollTop;        
                }        
                return bodyTop      
}

$(document).ready(function() {

  // 获取窗口宽度
  if (window.innerWidth)
  winWidth = window.innerWidth;
  else if ((document.body) && (document.body.clientWidth))
  winWidth = document.body.clientWidth;
  // 获取窗口高度
  if (window.innerHeight)
  winHeight = window.innerHeight;
  else if ((document.body) && (document.body.clientHeight))
  winHeight = document.body.clientHeight;
  // 通过深入 Document 内部对 body 进行检测，获取窗口大小
  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
  {
  winHeight = document.documentElement.clientHeight;
  winWidth = document.documentElement.clientWidth;
  }
//浏览器窗口居中
  var timer;    
  $(window).scroll(function (){      
          clearInterval(timer);      
          var topScroll=getScroll();      
          var topDiv=1/2*(winHeight-70);      
          var top=topScroll+topDiv;
                  
          timer=setInterval(function(){      
                  $("#loading").stop(true).animate({"top":top},50);
                  //$("#loading").stop(true).animate({"left":left},50);      
          },50)      
        })
  var left= 1/2*(winWidth-160);
  document.getElementById("loading").style.left = left+"px";

});