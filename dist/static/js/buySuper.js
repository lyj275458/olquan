webpackJsonp([30,44],{360:function(e,t,a){a(837);var i=a(2)(a(474),a(948),"data-v-15664465",null);e.exports=i.exports},474:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=a(12),o=i(s);t.default={data:function(){return{memList:[],curObj:[],moreSaleImg:"/static/images/goodsImg.png",colseImg:"/static/images/colse.png",shareImg:"/static/images/share.png",shareSuperImg:"/static/images/shareSuper.png",addSelect:0,isCanBuy:-1,chooseBag:!1,bagId:0,shareIMg:!1,shareData:{title:"OL圈 试用中心",description:"试,是一种态度。每日10,20点限量开抢！",url:"",picURL:"http://ol-site.olquan.com/plug/mobile/img/logoo.jpg",hide:!0,share:!1}}},components:{},created:function(){this.$store.commit("documentTitle","试用中心"),this.getMember(),this.getGiftBag()},mounted:function(){window.addEventListener("scroll",this.handleScroll)},methods:{openShow:function(){this.chooseBag=!0},colseShow:function(){this.chooseBag=!1},getMember:function(){var e={};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,e,this.getMemberBack,this)},getMemberBack:function(e){this.memList=e.result,this.setCookie("memberId",e.result.id),console.log(this.getCookie("memberId")),"supervisor"==this.memList.levelCode?this.$store.commit("documentTitle","邀请督导"):this.$store.commit("documentTitle","申请督导")},getGiftBag:function(){var e={};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getGiftBag,e,this.getGiftBagBack,this)},yaoqing:function(){this.shareIMg=!0},colseShare:function(){this.shareIMg=!1},getGiftBagBack:function(e){this.curObj=e.result,this.moreSaleImg=e.result.gifts[0].bagImage,this.isCanBuy=e.result.gifts[0].bagCanBuy,this.bagId=e.result.gifts[0].bagId,this.shareData.url="http://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+"supervisor/buySuper"),this.shareData.title=this.curObj.shareTitle,this.shareData.description=this.curObj.shareDesc,this.shareData.picURL=this.curObj.shareLogo,this.moreWeixinShare()},getBagId:function(e,t,a){this.addSelect=e,this.moreSaleImg=this.curObj.gifts[e].bagImage,this.bagId=t,this.isCanBuy=a},getOrder:function(){if(0==this.isCanBuy)this.$toast("库存不足");else if(0==this.memList.isGetStoreCommission)this.$toast("您还不是粉领，请先升级粉领");else{var e={bagId:this.bagId};localStorage.setItem("bagIdObj",(0,o.default)(e));JSON.parse(localStorage.getItem("bagIdObj"));console.log(this.bagId),window.location.href=CUR_URLBACK+"fightAlone/ordersure/superorder?memberId="+this.$route.query.memberId}},moreWeixinShare:function(){var e={url:location.href,callback:""};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,e,this.shareBack,this)},shareBack:function(e){this.wxShareFun(e.result,this.shareData)}},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)}}},778:function(e,t,a){t=e.exports=a(3)(),t.push([e.id,".bugSuper[data-v-15664465]{min-height:100%;background:#fff}.bugSuper img[data-v-15664465]{pointer-events:none}.bugSuper .imgdetail[data-v-15664465]{padding-bottom:1.4rem;border-radius:.08rem}.bugSuper .sureBut[data-v-15664465]{position:fixed;left:0;width:100%;background:#fff;bottom:0}.bugSuper .sureBut .outDiv[data-v-15664465]{padding:0 .3rem .5rem}.bugSuper .sureBut .outDiv p[data-v-15664465]{width:100%;background:#e50f72;font-size:.36rem;text-align:center;border-radius:.08rem;color:#fff;line-height:.9rem}.bugSuper .backImg[data-v-15664465]{position:fixed;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.25);z-index:11}.bugSuper .chooseBag[data-v-15664465]{position:fixed;left:0;bottom:0;width:100%;background:#fff;z-index:13}.bugSuper .chooseBag .outBag[data-v-15664465]{min-height:2.96rem;padding-bottom:.98rem;position:relative}.bugSuper .chooseBag .outBag .bagImg[data-v-15664465]{position:absolute;left:.24rem;top:-.46rem;width:1.64rem;height:1.64rem}.bugSuper .chooseBag .outBag .bagImg img[data-v-15664465]{display:block;width:100%;height:100%}.bugSuper .chooseBag .outBag .bagName[data-v-15664465]{font-size:.28rem;padding-left:2.12rem;color:#333;padding-top:.32rem}.bugSuper .chooseBag .outBag .colseImg[data-v-15664465]{position:absolute;right:.24rem;top:.24rem}.bugSuper .chooseBag .outBag .colseImg img[data-v-15664465]{display:block;height:.32rem;width:.32rem}.bugSuper .chooseBag .outBag .normal[data-v-15664465]{color:#999;font-size:.24rem;padding-left:.24rem;margin-top:.5rem}.bugSuper .chooseBag .outBag .bagMore[data-v-15664465]{padding:0 .24rem;overflow:hidden;margin-top:.6rem}.bugSuper .chooseBag .outBag .bagMore li[data-v-15664465]{float:left;border:.01rem solid #eaeaea;color:#666;padding:.12rem .24rem;font-size:.24rem;border-radius:.06rem;margin-right:.2rem;margin-bottom:.2rem}.bugSuper .chooseBag .outBag .bagMore .speciLi[data-v-15664465]{border:.01rem solid #da3176;color:#da3176}.bugSuper .chooseBag .outBag .sureChoose[data-v-15664465]{width:100%;position:fixed;left:0;bottom:0;background:#da3176;color:#fff;font-size:.36rem;text-align:center;line-height:.98rem}.bugSuper .yaoqingImg[data-v-15664465]{background:rgba(0,0,0,.6);position:fixed;top:0;left:0;height:100%;width:100%}.bugSuper .yaoqingImg .shareDiv[data-v-15664465]{width:5.6rem;height:4.1rem;background:#fff;padding-top:.3rem;position:fixed;top:3.84rem;left:50%;margin-left:-2.8rem}.bugSuper .yaoqingImg .shareDiv .colseImg[data-v-15664465]{position:absolute;right:.24rem;top:.24rem}.bugSuper .yaoqingImg .shareDiv .colseImg img[data-v-15664465]{display:block;height:.32rem;width:.32rem}.bugSuper .yaoqingImg .shareDiv .shareImgS[data-v-15664465]{text-align:center;width:100%}.bugSuper .yaoqingImg .shareDiv .shareImgS img[data-v-15664465]{display:inline-block;width:1.36rem;height:1.41rem}.bugSuper .yaoqingImg .shareDiv .shareDetail[data-v-15664465]{width:100%;text-align:center}.bugSuper .yaoqingImg .shareDiv .shareDetail p[data-v-15664465]{display:inline-block;font-size:.26rem;width:3.7rem;height:.64rem;line-height:.32rem;color:#333}.bugSuper .yaoqingImg .shareDiv .sureShare[data-v-15664465]{margin-top:.54rem;width:100%;background:#fff}.bugSuper .yaoqingImg .shareDiv .sureShare .shareSure[data-v-15664465]{padding:0 1.06rem}.bugSuper .yaoqingImg .shareDiv .sureShare .shareSure p[data-v-15664465]{width:100%;background:#e50f72;border-radius:.06rem;color:#fff;font-size:.3rem;text-align:center;line-height:.7rem}",""])},837:function(e,t,a){var i=a(778);"string"==typeof i&&(i=[[e.id,i,""]]);a(4)(i,{});i.locals&&(e.exports=i.locals)},948:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"bugSuper"},[a("div",{directives:[{name:"show",rawName:"v-show",value:"supervisor"==e.memList.levelCode,expression:"memList.levelCode=='supervisor'"}],staticClass:"imgdetail",staticStyle:{width:"100%"},domProps:{innerHTML:e._s(e.curObj.content)}},[a("p",{staticStyle:{width:"100%"}},[e._v(e._s(e.curObj.content))])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:"supervisor"!=e.memList.levelCode,expression:"memList.levelCode!='supervisor'"}],staticClass:"imgdetail",staticStyle:{width:"100%"},domProps:{innerHTML:e._s(e.curObj.inviteContent)}},[a("p",{staticStyle:{width:"100%"}},[e._v(e._s(e.curObj.inviteContent))])]),e._v(" "),a("div",{staticClass:"sureBut"},[a("div",{staticClass:"outDiv"},[a("p",{directives:[{name:"show",rawName:"v-show",value:"supervisor"!=e.memList.levelCode,expression:"memList.levelCode!='supervisor'"}],on:{click:e.openShow}},[e._v("立即申请")]),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:"supervisor"==e.memList.levelCode,expression:"memList.levelCode=='supervisor'"}],on:{click:e.yaoqing}},[e._v("立即邀请")])])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.chooseBag,expression:"chooseBag"}],staticClass:"backImg",on:{click:e.colseShow}}),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.chooseBag,expression:"chooseBag"}],staticClass:"chooseBag"},[a("div",{staticClass:"outBag"},[a("div",{staticClass:"bagImg"},[a("img",{attrs:{src:e.moreSaleImg}})]),e._v(" "),a("div",{staticClass:"bagName"},[a("p",{staticStyle:{"margin-bottom":".36rem"}},[e._v("选择督导礼包")]),e._v(" "),a("p",[e._v("￥"+e._s(e.curObj.totalFee))])]),e._v(" "),a("div",{staticClass:"colseImg",on:{click:e.colseShow}},[a("img",{staticClass:"close",attrs:{src:e.colseImg}})]),e._v(" "),a("ul",{staticClass:"bagMore"},e._l(e.curObj.gifts,function(t,i){return a("li",{class:{speciLi:i==e.addSelect},on:{click:function(a){e.getBagId(i,t.bagId,t.bagCanBuy)}}},[e._v("\n\t\t\t\t\t"+e._s(t.bagName)+"\n\t\t\t\t")])})),e._v(" "),a("div",{staticClass:"sureChoose",on:{click:e.getOrder}},[e._v("确定")])])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.shareIMg,expression:"shareIMg"}],staticClass:"yaoqingImg",on:{click:e.colseShare}},[a("div",{staticClass:"shareDiv"},[a("div",{staticClass:"colseImg",on:{click:e.colseShow}},[a("img",{staticClass:"close",attrs:{src:e.colseImg}})]),e._v(" "),a("div",{staticClass:"shareImgS"},[a("img",{attrs:{src:e.shareSuperImg}})]),e._v(" "),e._m(0),e._v(" "),e._m(1)])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"shareDetail"},[a("p",[e._v("点击右上角，分享给您的好友，邀请开通督导！")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sureShare"},[a("div",{staticClass:"shareSure"},[a("p",[e._v("确定")])])])}]}}});