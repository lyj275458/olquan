 //常用方法库
 const tsLib = {
     //判断是否为空
     isNull: function(str) {
         if (str == null || str == undefined || str == '') {
             return true;
         } else {
             return false;
         }
     },
     //判断身份证格式
     isCard: function(str) {
         console.log(str);
         var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
         console.log(regIdCard.test(str));
         return regIdCard.test(str);
     },
     //去掉字符串头尾空格
     trim: function(str) {
         return str.replace(/(^\s*)|(\s*$)/g, "");
     },
     //判断客户端来源
     getClientBrowser: function() {
         var _userAgent = navigator.userAgent;
         var _broMark;
         //如果是手机浏览器
         if (/Mobile/gi.test(_userAgent)) {
             if (/MicroMessenger/gi.test(_userAgent)) {
                 _broMark = 'wx';
             } else if (/ycBrowser/gi.test(_userAgent)) {
                 _broMark = 'yc';
             } else {
                 _broMark = 'browser';
             }
             //
             var _search = window.location.search;
             if (/appVer/g.test(_search)) {
                 _broMark = 'yc';
             }
         }
         return _broMark
     },
     //判断手机号是否正确
     isPhoneNum: function(string) {
         return /^1[3|4|5|7|8]\d{9}$/.test(string);
     },
     //判断邮箱是否正确
     isMail: function(string) {
         return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(string);
     },
     //获取URL指定参数
     getUrlparam: function(keyName) {
         /*
          * 获取URL
          * */
         var _url = window.location.href.split("?")[1];
         if (_url != undefined) {
             var _index;
             var _arr = _url.split("&");
             for (var i = 0, _len = _arr.length; i < _len; i++) {
                 if (_arr[i].indexOf(keyName + "=") >= 0) {
                     _index = i;
                     break;
                 } else {
                     _index = -1;
                 }
             }
             if (_index >= 0) {
                 var _key = _arr[_index].split("=")[1];
                 return _key;
             }
         }
     },
     //卡号四位分段处理
     formatNum: function(num) {
         var _num = num.toString();
         var _num = _num.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
         return _num;
     },
     //判断是否为iPhone
     isIphone: function() {
         return navigator.userAgent.match(/(iPhone\sOS)\s([\d_]+)/);
     },
     //判断是否为安卓
     isAndroid: function() {
         return navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/);
     }
 }
 export {
     tsLib
 };