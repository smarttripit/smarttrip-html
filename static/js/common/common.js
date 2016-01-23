//微信支付相关--开始
var weixin_appId = "wx2421b1c4370ec43b";
var weixin_signType = "MD5";
//微信支付相关--结束

// 弹出登录模态框
function needLogin() {
	$('#loginModal').modal('show');
}

function dealFailedResponse(result) {
	if (result.tipCode == "notLogin") {
		needLogin();
	} else {
		alert(result.tipMsg);
	}
}

// 根据url中的参数名称获取参数值
(function($) {
	$.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	}
})(jQuery);

String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {  
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {  
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);  
    } else {  
        return this.replace(reallyDo, replaceWith);  
    }  
}  

/** *************************** */
// 判断输入是否是一个由 0-9 / A-Z / a-z 组成的字符串
function isalphanumber(str) {
	var result = str.match(/^[a-zA-Z0-9]+$/);
	if (result == null)
		return false;
	return true;
}
/** *************************** */
// 判断输入是否是一个数字--(数字包含小数)--
function isnumber(str) {
	return !isNaN(str);
}

// 判断输入是否是一个整数
function isint(str) {
	var result = str.match(/^(-|\+)?\d+$/);
	if (result == null)
		return false;
	return true;
}

// 判断输入是否是有效的长日期格式 - "YYYY-MM-DD HH:MM:SS" || "YYYY/MM/DD HH:MM:SS"
function isdatetime(str) {
	var result = str
			.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
	if (result == null)
		return false;
	var d = new Date(result[1], result[3] - 1, result[4], result[5], result[6],
			result[7]);
	return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3]
			&& d.getDate() == result[4] && d.getHours() == result[5]
			&& d.getMinutes() == result[6] && d.getSeconds() == result[7]);
}

// 检查是否为 YYYY-MM-DD || YYYY/MM/DD 的日期格式
function isdate(str) {
	var result = str.match(/^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (result == null)
		return false;
	var d = new Date(result[1], result[3] - 1, result[4]);
	return (d.getFullYear() == result[1] && d.getMonth() + 1 == result[3] && d
			.getDate() == result[4]);
}

// 判断输入是否是有效的电子邮件
function isemail(str) {
	var result = str
			.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
	if (result == null)
		return false;
	return true;
}

// 去除字符串的首尾的空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 返回字符串的实际长度, 一个汉字算2个长度
function strlen(str) {
	return str.replace(/[^\x00-\xff]/g, "**").length;
}

// 匹配中国邮政编码(6位)
function ispostcode(str) {
	var result = str.match(/[1-9]\d{5}(?!\d)/);
	if (result == null)
		return false;
	return true;
}
// 匹配国内电话号码(0511-4405222 或 021-87888822)
function istell(str) {
	var result = str.match(/\d{3}-\d{8}|\d{4}-\d{7}/);
	if (result == null)
		return false;
	return true;
}

// 校验是否为(0-10000)的整数
function isint1(str) {
	var result = str.match(/^[0-9]$|^([1-9])([0-9]){0,3}$|^10000$/);
	if (result == null)
		return false;
	return true;
}

// 匹配腾讯QQ号
function isqq(str) {
	var result = str.match(/[1-9][0-9]{4,}/);
	if (result == null)
		return false;
	return true;
}

// 匹配身份证(15位或18位)
function isidcard(str) {
	var result = str.match(/\d{15}|\d{18}/);
	if (result == null)
		return false;
	return true;
}

function IdentityCodeValid(code) { 
           var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
           var tip = "";
           var pass= true;
           
           if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
               tip = "身份证号格式错误";
               pass = false;
           }
           
          else if(!city[code.substr(0,2)]){
               tip = "地址编码错误";
               pass = false;
           }
           else{
               //18位身份证需要验证最后一位校验位
               if(code.length == 18){
                   code = code.split('');
                   //∑(ai×Wi)(mod 11)
                   //加权因子
                   var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                   //校验位
                   var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                   var sum = 0;
                   var ai = 0;
                   var wi = 0;
                   for (var i = 0; i < 17; i++)
                   {
                       ai = code[i];
                       wi = factor[i];
                       sum += ai * wi;
                   }
                   var last = parity[sum % 11];
                   if(parity[sum % 11] != code[17]){
                       tip = "校验位错误";
                       pass =false;
                   }
               }
           }
           if(!pass) alert(tip);
           return pass;
       }

// 校验文本是否为空
function checknull(field, sval) {
	if (field.value == "") {
		alert("请填写" + sval + "！");
		field.focus();
		return false;
	}
	return true;
}

// 屏蔽输入字符
/*******************************************************************************
 * 调用方法： 在文本框中加上 onkeypress="return checkChar()"
 ******************************************************************************/
function checkChar() {
	var keycode = event.keyCode;
	if (!(keycode >= 48 && keycode <= 57)) {
		return false;
	}
}