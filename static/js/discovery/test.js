<script type="text/javascript">
function adddata()
    {
     var typeName=$("#<%=this.typeName.ClientID%>").val();
     var msg=" not be empty";
     if(typeName=="")
     {
        if(msg!="")
          {
            alert(msg);
            return false;
          }
     }
     else
     {
         //显示进度条
         $("#loading").ajaxStart(function(){
         $(this).show();
         });
         //提交前触发的事件
         $("#msg").ajaxSend(function(request, settings){$(this).append("<li>Starting request at " + settings.url + "</li>");});
          //这里的countryid 可以动态从GridView里面取
          var countryid= $("#<%=this.drpCountry.ClientID%>").val();//获取下拉菜单值
          var countryname=format_get_name(countryid);//获取下拉菜单文本
          var typeName = $("#<%=this.typeName.ClientID%>").val();//获取txt为typeName的值
          var showTypeDesc = $("#<%=this.showTypeDesc.ClientID%>").val();//获取txt为showTypeDesc的值
           //调用Juqery Ajax
           $.ajax({
           type: "POST",
           url: "addNews.aspx",
           timeout: 20000,
           error: function(){alert('error');},
           data: "countryid="+countryid+"&countryname="+countryname+"&typeName="+typeName+"&showTypeDesc="+showTypeDesc,
           success: function(msg)
           {
           var text=msg.split('<');
           //当AJAX请求失败时添加一个被执行的方法
           $("#msg").ajaxError(function(request, settings){
           $(this).append("<li>Error requesting page " + settings.url + "</li>");
           });
            //当AJAX请求成功时添加一个被执行的方法
           $("#msg").ajaxSuccess(function(request, settings){
           $(this).append(text[0]);
           });
          //清空文本里面的值
           $("#<%=this.typeName.ClientID%>").val("");
           $("#<%=this.showTypeDesc.ClientID%>").val("");
           return false;
           }
           });
      }
   }
    //获取下拉菜单里面的文本内容
    function format_get_name(id)
    {
        var drp = $('<%=drpCountry.ClientID%>');
        for ( var i =0;i<drp.options.length;i++)
        {
            if ( drp.options[i].value == id )
            {
                return drp.options[i].text;
            }
        }
        return '';
    }
</script>


<form> 
<div><input type="text"name="a"value="1"id="a"/></div> 
<div><input type="text"name="b"value="2"id="b"/></div> 
<div><input type="hidden"name="c"value="3"id="c"/></div> 
<div> 
<textarea name="d"rows="8"cols="40">4</textarea> 
</div> 
<div><selectname="e"> 
<option value="5"selected="selected">5</option> 
<option value="6">6</option> 
<option value="7">7</option> 
</select></div> 
<div> 
<input type="checkbox"name="f"value="8"id="f"/> 
</div> 
<div> 
<input type="submit"name="g"value="Submit"id="g"/> 
</div> 
</form>