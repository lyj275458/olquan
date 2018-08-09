import Vue from 'vue'
import {
  Toast,
  Indicator,
  MessageBox
} from '../components/common.js';
Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$indicator = Vue.prototype.$indicator = Indicator;
Vue.prototype.loadingOpen = function(style) {
	console.log(style)
  //设置默认样式
  let defaultStyle = style ? style : 'fading-circle';
  Vue.$indicator.open({
    spinnerType: defaultStyle
  });
}
Vue.prototype.loadingClose = function(style) {
    //设置默认样式
    this.$indicator.close();
}
//用户来源--判断是否来自youxAPP
Vue.$userSource=Vue.prototype.$userSource = function(v) {
	    //设置默认样式
	    let userAgent=navigator.userAgent;
	    if(userAgent.indexOf('YouXuan') != -1){
	      return true;
	    }else{
	      return false;
	    }
};
//获取cookie
Vue.prototype.getCookie = function(argument) {
    var arrCookie = document.cookie.split("; ");
        //console.log(arrCookie)
        for (var i = 0; i < arrCookie.length; i++) {
          var arr = arrCookie[i].split("="); //从 = 的位置 分割每对cookie  
          //console.log(argument)
          //console.log(arr[0])
            if (arr[0]==argument) { //如果前面是 userId 就是找到了
//            console.log(arr[1])
                return arr[1]; //将后面的值赋给 userId ，跳出循环                  
                break;
            }
        }
   
    
    
};
  //设置cookie
Vue.prototype.setCookie = function(name, value) {
    var exp = new Date();
    exp.setTime(exp.getTime() + 3 * 24 * 60 * 60 * 1000); //3天过期  
    document.cookie =name + "=" + value + ";expires=" + exp.toGMTString() + ";path=/";
    return true;
};
  //获取地址栏参数（&后面的）
Vue.prototype.$urlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.href.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};
