webpackJsonp([57,61],{596:function(e,t,s){s(1390);var a=s(2)(s(732),s(1504),"data-v-0ce50dda",null);e.exports=a.exports},732:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{weixinImg:"/static/images/weixin.png",nochoseImg:"/static/images/nochose.png",choseImg:"/static/images/waychose.png",zhifubImg:"/static/images/zhifub.png",payforanotherImg:"/static/images/payforanother.png",checkImg:"/static/images/checked.png",sureCheckone:!0,sureChecktwo:!1,sureCheckthree:!1,showWXpay:!0,payMethod:1,isPayAnother:0,payInfo:{},shareData:{title:"",description:"",url:"",picURL:"",hide:!1,share:!1,close:!0}}},created:function(){"wx"==tsApp.getClientBrowser()?this.showWXpay=!0:this.showWXpay=!1,this.$store.commit("documentTitle","立即支付"),this.addRecord(),this.locationHref()},methods:{addRecord:function(){var e={terminalType:5,pageuri:"fightAlone/ordersure/ordersure"};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addRecord,e,this.addRecordBack,this)},addRecordBack:function(e){},locationHref:function(){return this.keyId=this.getCookie("number"),"1"!=this.keyId&&(window.location.href=location.href,void this.setCookie("number","1"))},checkOne:function(){this.sureCheckone=!0,this.sureChecktwo=!1,this.sureCheckthree=!1,this.payMethod=1,this.isPayAnother=0},checkTwo:function(){this.sureCheckone=!1,this.sureChecktwo=!0,this.sureCheckthree=!1,this.payMethod=4,this.isPayAnother=0,console.log(this.payMethod)},checkThree:function(){this.sureCheckone=!1,this.sureChecktwo=!1,this.sureCheckthree=!0,this.payMethod=1,this.isPayAnother=1,console.log(this.payMethod)},sureOrder:function(){var e={togetherJoinRecordId:this.$route.params.id,payMethod:this.payMethod,isPayAnother:this.isPayAnother,uutype:1};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.singleOrderPay,e,this.sureOrderBack)},sureOrderBack:function(e){1==this.payMethod&&0==this.isPayAnother?0!=e.code?this.$toast(e.message):(this.payInfo=e.result.payInfo,this.addWeixinPay()):1==this.isPayAnother?0!=e.code?this.$toast(e.message):window.location.href=USE_URL+"weixin/member/payAnother?payRecordNo="+e.result.payRecordNo:4==this.payMethod&&0==this.isPayAnother&&(0!=e.code?this.$toast(e.message):window.location.href=USE_URL+"ol/weixin/index/alipay?type=1&recordId="+e.result)},addWeixinPay:function(){var e={url:location.href,callback:""};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,e,this.payBack,this)},payBack:function(e){this.wxPayFun(e.result,this.payInfo)},addWeixinShare:function(){var e={url:location.href,callback:""};console.log(location.href),this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,e,this.shareBack,this)},shareBack:function(e){"fail"==e.result&&(this.shareData.share=!0),this.wxShareFun(e.result,this.shareData)}}}},1065:function(e,t,s){t=e.exports=s(4)(),t.push([e.id,".orderSure[data-v-0ce50dda]{height:100%}.orderSure .chooseOrder[data-v-0ce50dda]{padding:0 .24rem;background:#f2f2f2;line-height:.56rem;font-size:.24rem}.orderSure .orderWay[data-v-0ce50dda]{padding:.24rem;overflow:hidden;position:relative;background:#fff;border-bottom:.01rem solid #e5e5e5}.orderSure .orderWay .wayLeft[data-v-0ce50dda]{font-size:.28rem}.orderSure .orderWay .wayLeft img[data-v-0ce50dda]{display:inline-block;width:.6rem;height:.6rem;vertical-align:middle}.orderSure .orderWay .wayRight[data-v-0ce50dda]{position:absolute;top:50%;margin-top:-.2rem;right:.24rem}.orderSure .orderWay .wayRight img[data-v-0ce50dda]{display:block;height:.4rem;width:.4rem}.orderSure .sureOrder[data-v-0ce50dda]{padding:0 .24rem;margin-top:.8rem}.orderSure .sureOrder p[data-v-0ce50dda]{font-size:.26rem;color:#fff;background:#e30067;text-align:center;line-height:.8rem}",""])},1390:function(e,t,s){var a=s(1065);"string"==typeof a&&(a=[[e.id,a,""]]);s(5)(a,{});a.locals&&(e.exports=a.locals)},1504:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"orderSure"},[s("div",{staticClass:"chooseOrder"},[e._v("\n\t\t请选择支付方式\n\t")]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.showWXpay,expression:"showWXpay"}],staticClass:"orderWay"},[s("div",{staticClass:"wayLeft"},[s("img",{attrs:{src:e.weixinImg}}),e._v("\n\t\t\t微信\n\t\t")]),e._v(" "),s("div",{staticClass:"wayRight",on:{click:e.checkOne}},[s("img",{directives:[{name:"show",rawName:"v-show",value:0==e.sureCheckone,expression:"sureCheckone==false"}],attrs:{src:e.nochoseImg}}),e._v(" "),s("img",{directives:[{name:"show",rawName:"v-show",value:1==e.sureCheckone,expression:"sureCheckone==true"}],attrs:{src:e.checkImg}})])]),e._v(" "),s("div",{staticClass:"orderWay"},[s("div",{staticClass:"wayLeft"},[s("img",{attrs:{src:e.zhifubImg}}),e._v("\n\t\t\t支付宝\n\t\t")]),e._v(" "),s("div",{staticClass:"wayRight",on:{click:e.checkTwo}},[s("img",{directives:[{name:"show",rawName:"v-show",value:0==e.sureChecktwo,expression:"sureChecktwo==false"}],attrs:{src:e.nochoseImg}}),e._v(" "),s("img",{directives:[{name:"show",rawName:"v-show",value:1==e.sureChecktwo,expression:"sureChecktwo==true"}],attrs:{src:e.checkImg}})])]),e._v(" "),s("div",{staticClass:"orderWay"},[s("div",{staticClass:"wayLeft"},[s("img",{attrs:{src:e.payforanotherImg}}),e._v("\n\t\t\t找人代付\n\t\t")]),e._v(" "),s("div",{staticClass:"wayRight",on:{click:e.checkThree}},[s("img",{directives:[{name:"show",rawName:"v-show",value:0==e.sureCheckthree,expression:"sureCheckthree==false"}],attrs:{src:e.nochoseImg}}),e._v(" "),s("img",{directives:[{name:"show",rawName:"v-show",value:1==e.sureCheckthree,expression:"sureCheckthree==true"}],attrs:{src:e.checkImg}})])]),e._v(" "),s("div",{staticClass:"sureOrder",on:{click:e.sureOrder}},[s("p",[e._v("立即支付")])])])},staticRenderFns:[]}}});