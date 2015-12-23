// 扩展jquery，增加获取url中参数值的方法
(function($){
    $.getUrlParam
     = function(name)
    {
    var reg
     = new RegExp("(^|&)"+
     name +"=([^&]*)(&|$)");
    var r
     = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
    }
    })(jQuery);
    //