webpackJsonp([35,44],{351:function(e,t,a){a(835);var s=a(2)(a(464),a(946),"data-v-10a6c70e",null);e.exports=s.exports},464:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{successImg:"/static/images/success.png",failImg:"/static/images/fail.png",moreImg:"/static/images/more.png",gomoreImg:"/static/images/gomore.png",nameImg:"/static/images/name.png",speImg:"/static/images/pin.png",copyImg:"/static/images/copy.png",shareImg:"/static/images/share.png",underWay:"/static/images/underway.png",curObj:{},shareSure:!1,length:0,shareData:{title:"我们一起来拼团吧",description:"",url:"",picURL:"",hide:!0,share:!1}}},created:function(){this.$store.commit("documentTitle","拼团详情"),this.getList({}),this.locationHref()},mounted:function(){},methods:{getList:function(){var e={togetherRecordId:this.$route.params.id};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.togetherRecordDetail,e,this.getListBack,this)},getListBack:function(e){e.result?(this.curObj=e.result,this.shareData.picURL=this.curObj.productImage,this.shareData.url="http://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+"share/share?id="+this.$route.params.id),this.shareData.title="【OL圈拼团】我花了"+this.curObj.togetherPrice+"元买了"+this.curObj.productName,this.shareData.description=this.curObj.productDesc):this.curObj=[],e.result.joinMemberData?this.length=e.result.joinMemberData.length:this.length=0,this.addWeixinShare(),console.log(e.result.joinMemberData.length)},shareFriend:function(){window.location.href=CUR_URLBACK+"index/newIndex?memberId="+this.$route.query.memberId},colseSure:function(){this.shareSure=!1},goDetail:function(e){console.log(e),window.location.href=USE_URL+"weixin/product/newProductDetail?productId="+e+"&memberId="+this.$route.query.memberId},getDetail:function(e){console.log(e),window.location.href=USE_URL+"ol/orderdDetail.html?orderId="+e},joinFight:function(){this.shareSure=!0},locationHref:function(){return this.keyId=this.getCookie("number"),"1"!=this.keyId&&(window.location.href=location.href,this.addWeixinShare(),void this.setCookie("number","1"))},addWeixinShare:function(){var e={url:location.href,callback:""};console.log(location.href),this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,e,this.shareBack,this)},shareBack:function(e){"fail"==e.result&&(this.shareData.share=!0),this.wxShareFun(e.result,this.shareData)}}}},777:function(e,t,a){t=e.exports=a(3)(),t.push([e.id,".orderstaus[data-v-10a6c70e]{height:100%;position:relative;overflow:auto}.orderstaus .staus[data-v-10a6c70e]{text-align:center;background:#fff}.orderstaus .staus img[data-v-10a6c70e]{display:inline-block;height:.3rem;vertical-align:middle;width:.3rem}.orderstaus .staus span[data-v-10a6c70e]{font-size:.32rem;vertical-align:middle;color:#1afa29;margin-left:-.2rem}.orderstaus .reson[data-v-10a6c70e]{background:#fff;font-size:.2rem;color:#a2a2a2;text-align:center}.orderstaus .name[data-v-10a6c70e]{background:#fff;width:100%;display:flex;display:-ms-flexbox;display:-moz-flex;-ms-flex-pack:center;justify-content:center;-moz-box-pack:center;-webkit--moz-box-pack:center}.orderstaus .name .name-list[data-v-10a6c70e]{width:6.1rem;display:flex;display:-ms-flexbox;display:-moz-flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-flex-wrap:wrap;-webkit-box-lines:multiple;-moz-flex-wrap:wrap;-ms-flex-pack:start;justify-content:flex-start;-moz-box-pack:flex-start;-webkit--moz-box-pack:flex-start}.orderstaus .name .name-list li[data-v-10a6c70e]{margin:0 .21rem;position:relative}.orderstaus .name .name-list li img[data-v-10a6c70e]{display:inline-block;height:.8rem;width:.8rem;border-radius:50%}.orderstaus .name .name-list li .special[data-v-10a6c70e]{display:inline-block;width:.58rem;height:.32rem;position:absolute;left:-.12rem;top:-.06rem}.orderstaus .specialName[data-v-10a6c70e]{padding-top:.2rem}.orderstaus .botton[data-v-10a6c70e]{background:#fff;position:relative;height:1.28rem}.orderstaus .botton p[data-v-10a6c70e]{width:7.02rem;height:.88rem;background:linear-gradient(90deg,#bbb,#949594);font-size:.32rem;color:#fff;text-align:center;line-height:.88rem;border-radius:.05rem;position:absolute;left:50%;margin-left:-3.51rem;top:50%;margin-top:-.44rem}.orderstaus .showorder[data-v-10a6c70e]{background:#fff;border-bottom:.01rem #f2f2f2;line-height:.88rem;font-size:.28rem;padding:0 .2rem;position:relative;margin-top:.1rem}.orderstaus .showorder img[data-v-10a6c70e]{display:inline-block;width:.22rem;height:.4rem;position:absolute;right:.2rem;top:50%;margin-top:-.2rem}.orderstaus .orderlist[data-v-10a6c70e]{background:#fff;color:#9c9c9c;font-size:.24rem;padding:.26rem 0 .26rem .2rem}.orderstaus .orderlist li[data-v-10a6c70e]{line-height:.56rem}.orderstaus .orderlist li img[data-v-10a6c70e]{display:inline-block;height:.44rem;width:.8rem;vertical-align:middle;margin-left:.1rem}.orderstaus .shareDetail[data-v-10a6c70e]{position:absolute;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.8)}.orderstaus .shareDetail .share .time[data-v-10a6c70e]{font-size:.28rem;text-align:center;width:100%;color:#fff;line-height:.76rem;position:absolute;top:0}.orderstaus .shareDetail .share img[data-v-10a6c70e]{width:1.6rem;height:1.64rem;position:absolute;right:.4rem;top:.4rem}.orderstaus .shareDetail .share .people[data-v-10a6c70e]{margin-top:2.36rem;color:#fff;font-size:.36rem;text-align:center}.orderstaus .shareDetail .share .people span[data-v-10a6c70e]{color:#ff3892}.orderstaus .shareDetail .share .people i[data-v-10a6c70e]{font-style:normal}.orderstaus .shareDetail .share .sure[data-v-10a6c70e]{font-size:.28rem;text-align:center;color:#fff;margin-top:.5rem}",""])},835:function(e,t,a){var s=a(777);"string"==typeof s&&(s=[[e.id,s,""]]);a(4)(s,{});s.locals&&(e.exports=s.locals)},946:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"orderstaus"},[a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.curObj.status,expression:"curObj.status==1"}],staticClass:"staus"},[a("img",{attrs:{src:e.successImg}}),e._v(" "),a("span",[e._v("拼团成功")])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2==e.curObj.status,expression:"curObj.status==2"}],staticClass:"staus"},[a("img",{attrs:{src:e.failImg}}),e._v(" "),a("span",{staticStyle:{color:"#d81e06"}},[e._v("拼团失败")])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0==e.curObj.status,expression:"curObj.status==0"}],staticClass:"staus"},[a("img",{attrs:{src:e.underWay}}),e._v(" "),a("span",{staticStyle:{color:"#f4ea2a"}},[e._v("正在拼团中")])]),e._v(" "),a("div",{staticClass:"name",class:{specialName:3==e.curObj.status}},[a("ul",{staticClass:"name-list"},[e._l(e.curObj.joinMemberData,function(t,s){return s<15?a("li",[a("img",{attrs:{src:t.memberLogo}}),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:1==t.isOwner,expression:"item.isOwner==1"}],staticClass:"special",attrs:{src:e.speImg}})]):e._e()}),e._v(" "),a("li",{directives:[{name:"show",rawName:"v-show",value:e.length>=16,expression:"length>=16"}]},[a("img",{attrs:{src:e.moreImg}})])],2)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2==e.curObj.status,expression:"curObj.status==2"}],staticClass:"botton"},[a("p",{staticStyle:{background:"#fb2c8d"},on:{click:function(t){e.goDetail(e.curObj.productId)}}},[e._v("重新拼团")])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.curObj.status,expression:"curObj.status==1"}],staticClass:"botton"},[a("p",{staticStyle:{background:"#fb2c8d"},on:{click:e.shareFriend}},[e._v("去商城逛逛")])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0==e.curObj.status,expression:"curObj.status==0"}],staticClass:"botton"},[a("p",{staticStyle:{background:"#fb2c8d"},on:{click:e.joinFight}},[e._v("邀请好友拼团")])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:3==e.curObj.status,expression:"curObj.status==3"}],staticClass:"botton"},[a("p",[e._v("产品已下架无法拼团")])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2!=e.curObj.isSuccess,expression:"curObj.isSuccess!=2"}],staticClass:"showorder",on:{click:function(t){e.getDetail(e.curObj.orderId)}}},[a("span",[e._v("订单详情")]),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:null==e.curObj.orderId,expression:"curObj.orderId==null"}],attrs:{src:e.gomoreImg}}),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:null!=e.curObj.orderId,expression:"curObj.orderId!=null"}],attrs:{src:e.gomoreImg}})]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2!=e.curObj.isSuccess,expression:"curObj.isSuccess!=2"}],staticClass:"orderlist"},[a("ul",[a("li",{directives:[{name:"show",rawName:"v-show",value:""!=e.curObj.orderNo,expression:"curObj.orderNo!=''"}]},[a("span",[e._v("订单编号：")]),e._v(" "),a("span",[e._v(e._s(e.curObj.orderNo))])]),e._v(" "),a("li",{directives:[{name:"show",rawName:"v-show",value:e.curObj.payMethod,expression:"curObj.payMethod"}]},[a("span",[e._v("支付方式：")]),e._v(" "),a("span",[e._v(e._s(e.curObj.payMethod))])]),e._v(" "),a("li",{directives:[{name:"show",rawName:"v-show",value:e.curObj.openTime,expression:"curObj.openTime"}]},[a("span",[e._v("下单时间：")]),e._v(" "),a("span",[e._v(e._s(e.curObj.openTime))])]),e._v(" "),a("li",{directives:[{name:"show",rawName:"v-show",value:e.curObj.joinTogetherTime,expression:"curObj.joinTogetherTime"}]},[a("span",[e._v("拼团时间：")]),e._v(" "),a("span",[e._v(e._s(e.curObj.joinTogetherTime))])])])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.shareSure,expression:"shareSure"}],staticClass:"shareDetail",on:{click:e.colseSure}},[a("div",{staticClass:"share"},[a("img",{attrs:{src:e.shareImg}}),e._v(" "),a("div",{staticClass:"people"},[e._v("赶紧邀请好友来拼团吧")]),e._v(" "),a("div",{staticClass:"sure"},[e._v("点击右上角分享拼团")])])])])},staticRenderFns:[]}}});