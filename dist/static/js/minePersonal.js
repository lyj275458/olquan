webpackJsonp([40,61],{620:function(e,t,i){i(1456);var s=i(2)(i(756),i(1570),"data-v-eef9b376",null);e.exports=s.exports},756:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{perBackImg:"/static/images/perBack.png",index01Img:"/static/images/icon-index.png",cartImg:"/static/images/icon-cart.png",findImg:"/static/images/icon-find.png",serviceImg:"/static/images/icon-service.png",myImg:"/static/images/icon-my02.png",mineRowImg:"/static/images/mineRow.png",daiPayImg:"/static/images/daiPay.png",waitSongImg:"/static/images/waitSong.png",waitShouImg:"/static/images/waitShou.png",waitPingImg:"/static/images/waitPing.png",shouhouImg:"/static/images/shouhou.png",orderListImg:"/static/images/orderList.png",myPagektImg:"/static/images/myPagekt.png",myTryUesImg:"/static/images/myTryUes.png",myPinImg:"/static/images/myPin.png",myCoupinImg:"/static/images/myCoupin.png",mycelectImg:"/static/images/mycelect.png",myBookImg:"/static/images/myBook.png",myInvitedImg:"/static/images/myInvited.png",myQuanImg:"/static/images/myQuan.png",myPartentImg:"/static/images/myPartent.png",mySetupImg:"/static/images/mySetup.png",userIcon06Img:"/static/images/user-icon06.png",myHelpImg:"/static/images/myHelp.png",user_skImg:"/static/images/user_sk.png",userHuaImg:"/static/images/user-hua.png",memList:[],orderList:[],cartNum:"",showMember:!1,time:""}},components:{},created:function(){"undefined"==this.$route.query.memberId&&(this.$route.query.memberId=""),this.$store.commit("documentTitle","个人中心"),this.getMember(),this.getcartNum(),this.orderCount()},mounted:function(){window.addEventListener("scroll",this.handleScroll)},methods:{orderCount:function(){var e={memberId:this.$route.query.memberId};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.orderCount,e,this.orderCountBack,this)},orderCountBack:function(e){this.orderList=e.result},getWaitPay:function(){window.location.href=USE_URL+"ol/order.html?type=1&status=0"},getWaitSend:function(){window.location.href=USE_URL+"ol/order.html?type=1&status=1"},getWaitConfirm:function(){window.location.href=USE_URL+"ol/order.html?type=1&status=2"},getWaitComment:function(){window.location.href=USE_URL+"ol/order.html?type=1&status=3"},getWaitRefund:function(){window.location.href=USE_URL+"ol/order.html?type=1&status=4"},getOrderList:function(){window.location.href=USE_URL+"ol/order.html?type=1&status="},getMyPacket:function(){window.location.href=USE_URL+"weixin/member/wallet"},getTryUes:function(){window.location.href=USE_URL+"weixin/member/freeUseCore"},getMyPin:function(){window.location.href=CUR_URLBACK+"fightAlone/mygoods"},getMyCoupon:function(){window.location.href=CUR_URLBACK+"coupon/mycoupon"},getMycelect:function(){window.location.href=USE_URL+"ol/myCollection.html?htmlRoot="+CUR_URLBACK},getMycode:function(){window.location.href=USE_URL+"mobile/weixin/member/memberTwoCode2"},getInvitedPink:function(){this.$router.push({path:"/supervisor/buyPink"})},getMyQuan:function(){window.location.href=USE_URL+"weixin/member/fans"},getBaoBiao:function(){window.location.href=USE_URL+"weixin/member/supervisorAmountRecord"},getPartner:function(){window.location.href=USE_URL+"weixin/partner/partner"},getSetUp:function(){window.location.href=USE_URL+"weixin/member/set"},getMyHelp:function(){window.location.href=USE_URL+"weixin/helpinfo/toListVM"},getSK:function(){window.location.href=USE_URL+"weixin/member/storeTwocode"},getSuper:function(){this.$router.push({path:"/supervisor/buySuper"})},getRenew:function(){window.location.href=USE_URL+"weixin/member/renewConfirmOrder"},getMyGrow:function(){this.$router.push({path:"/mine/myGrow"})},getMember:function(){var e={memberId:this.$route.query.memberId};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,e,this.getMemberBack,this)},getMemberBack:function(e){this.memList=e.result,this.time=this.memList.validTime.split("至")[1],e.result.isGetStoreCommission?this.showMember=!0:this.showMember=!1},getcartNum:function(){var e={memberId:this.$route.query.memberId};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.totalNum,e,this.getcartNumBack)},getcartNumBack:function(e){this.cartNum=e.result},goIndex:function(){this.showMember?window.location.href=CUR_URLBACK+"index/pinkIndex":window.location.href=CUR_URLBACK+"index/newIndex"},getIndex:function(){window.location.href=CUR_URLBACK+"shopcar/ordercar"},getFind:function(){window.location.href="http://live-weixin.olquan.cn"},getkefu:function(){window.location.href="https://kefu.easemob.com/webim/im.html?tenantId=40231&ticket=false"}},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)}}},1120:function(e,t,i){t=e.exports=i(4)(),t.push([e.id,".personal[data-v-eef9b376]{padding-bottom:1rem}.personal img[data-v-eef9b376]{pointer-events:none}.personal .perTop[data-v-eef9b376]{background:url("+i(1489)+") no-repeat;background-size:100% 1.82rem;height:1.82rem;width:100%;position:relative}.personal .perTop .personalImg[data-v-eef9b376]{position:absolute;width:1.08rem;height:1.08rem;left:.24rem;border:.06rem solid hsla(0,0%,100%,.5);border-radius:50%;top:50%;margin-top:-.6rem}.personal .perTop .personalImg img[data-v-eef9b376]{display:block;width:1.08rem;background:#fff;height:1.08rem;border-radius:50%}.personal .perTop .personalName[data-v-eef9b376]{font-size:.28rem;color:#fff;position:absolute;left:1.7rem;top:.5rem}.personal .perTop .personalLevel[data-v-eef9b376]{position:absolute;width:auto;left:1.7rem;top:.98rem;font-size:0}.personal .perTop .personalLevel P[data-v-eef9b376]{display:inline-block;padding:.08rem;font-size:.24rem;color:#ee1c7d;text-align:center;border-radius:.06rem;background-color:hsla(0,0%,100%,.5)}.personal .perTop .getGrow[data-v-eef9b376]{position:absolute;width:.16rem;height:.28rem;right:.24rem;top:50%;margin-top:-.08rem}.personal .perTop .getGrow img[data-v-eef9b376]{display:block;width:100%;height:100%}.personal .renewGet[data-v-eef9b376]{height:.98rem;line-height:.98rem;font-size:.24rem;background:#fff;position:relative;margin-bottom:.2rem}.personal .renewGet .getDate[data-v-eef9b376]{padding:0 .24rem}.personal .renewGet .goRenew[data-v-eef9b376]{position:absolute;right:.24rem;top:50%;margin-top:-.24rem;height:.48rem;line-height:.48rem;text-align:center;width:1.4rem;background:#df3c82;color:#fff;border-radius:.48rem}.personal .useNavTab[data-v-eef9b376]{margin-bottom:.2rem;display:flex;display:-ms-flexbox;display:-moz-flex;-ms-flex-pack:start;justify-content:flex-start;-moz-box-pack:flex-start;-webkit--moz-box-pack:flex-start;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-flex-wrap:wrap;-webkit-box-lines:multiple;-moz-flex-wrap:wrap;border-top:.01rem solid #ebebeb}.personal .useNavTab .navTab[data-v-eef9b376]{width:33.33%;background:#fff}.personal .useNavTab .navTab p[data-v-eef9b376]{height:1.32rem;border-bottom:.01rem solid #ebebeb;border-right:.01rem solid #ebebeb;font-size:0;position:relative}.personal .useNavTab .navTab p img[data-v-eef9b376]{width:.44rem;height:.44rem;display:block;position:absolute;top:.32rem;left:50%;margin-left:-.22rem}.personal .useNavTab .navTab p span[data-v-eef9b376]{width:100%;position:absolute;font-size:.24rem;display:block;top:.88rem;color:#333;text-align:center}.personal .useNavTab .navTab p .severalNum[data-v-eef9b376]{display:block;font-style:normal;position:absolute;top:.2rem;left:1.35rem;width:.28rem;height:.28rem;text-align:center;line-height:.28rem;font-size:.16rem;border-radius:50%;color:#fff;background:#df3c82}.personal .getBottom[data-v-eef9b376]{border-top:.01rem solid #e1e1e1;position:fixed;bottom:0;left:0;background:#f7f7f7;height:.85rem;padding-top:.15rem;width:100%;z-index:99999;display:flex;display:-moz-flex;display:-ms-flexbox}.personal .getBottom .getIndex[data-v-eef9b376]{width:20%;font-size:.18rem;text-align:center;position:relative;color:#b2b2b2}.personal .getBottom .getIndex .cartNum[data-v-eef9b376]{width:.26rem;height:.26rem;font-size:.16rem;background:#e5006e;line-height:.26rem;color:#fff;position:absolute;border-radius:50%;right:.25rem;top:0}.personal .getBottom .getIndex .top[data-v-eef9b376]{position:relative;height:.5rem}.personal .getBottom .getIndex .top img[data-v-eef9b376]{display:block;position:absolute;left:50%;margin-left:-.22rem;height:.44rem;width:.44rem}",""])},1456:function(e,t,i){var s=i(1120);"string"==typeof s&&(s=[[e.id,s,""]]);i(5)(s,{});s.locals&&(e.exports=s.locals)},1489:function(e,t,i){e.exports=i.p+"static/img/perBack.b826668.png"},1570:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"personal"},[i("div",{staticClass:"perTop",on:{click:e.getMyGrow}},[i("div",{staticClass:"personalImg"},[i("img",{attrs:{src:e.memList.logo}})]),e._v(" "),i("div",{staticClass:"personalName"},[e._v("\n\t\t\t"+e._s(e.memList.nickName)+"\n\t\t")]),e._v(" "),i("div",{staticClass:"personalLevel"},[i("p",[e._v("\n\t\t\t\t"+e._s(e.memList.levelName)+"\n\t\t\t")]),e._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:null!=e.memList.partnerLevel,expression:"memList.partnerLevel!=null"}],staticStyle:{"margin-left":".12rem"}},[e._v(e._s(e.memList.partnerLevel))]),e._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:1==e.memList.isCityPartner,expression:"memList.isCityPartner==1"}],staticStyle:{"margin-left":".12rem"}},[e._v("城市合伙人")]),e._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:1==e.memList.isBrandPartner,expression:"memList.isBrandPartner==1"}],staticStyle:{"margin-left":".12rem"}},[e._v("品牌合伙人")])]),e._v(" "),i("div",{staticClass:"getGrow"},[i("img",{attrs:{src:e.mineRowImg}})])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0!=e.memList.isShowRenewButton,expression:"memList.isShowRenewButton!=0"}],staticClass:"renewGet"},[i("div",{staticClass:"getDate"},[e._v("您的店主将于"+e._s(e.time)+"到期")]),e._v(" "),i("div",{staticClass:"goRenew",on:{click:e.getRenew}},[e._v("立即续费")])]),e._v(" "),i("div",{staticClass:"useNavTab"},[i("div",{staticClass:"navTab"},[i("p",{on:{click:e.getWaitPay}},[i("img",{attrs:{src:e.daiPayImg}}),e._v(" "),i("span",[e._v("待付款")]),e._v(" "),i("i",{directives:[{name:"show",rawName:"v-show",value:0!=e.orderList.waitPayCount,expression:"orderList.waitPayCount!=0"}],staticClass:"severalNum"},[e._v(e._s(e.orderList.waitPayCount))])])]),e._v(" "),i("div",{staticClass:"navTab"},[i("p",{on:{click:e.getWaitSend}},[i("img",{attrs:{src:e.waitSongImg}}),e._v(" "),i("span",[e._v("待配送")]),e._v(" "),i("i",{directives:[{name:"show",rawName:"v-show",value:0!=e.orderList.waitSendCount,expression:"orderList.waitSendCount!=0"}],staticClass:"severalNum"},[e._v(e._s(e.orderList.waitSendCount))])])]),e._v(" "),i("div",{staticClass:"navTab"},[i("p",{staticStyle:{"border-right":"none"},on:{click:e.getWaitConfirm}},[i("img",{attrs:{src:e.waitShouImg}}),e._v(" "),i("span",[e._v("待收货")]),e._v(" "),i("i",{directives:[{name:"show",rawName:"v-show",value:0!=e.orderList.waitConfirmCount,expression:"orderList.waitConfirmCount!=0"}],staticClass:"severalNum"},[e._v(e._s(e.orderList.waitConfirmCount))])])]),e._v(" "),i("div",{staticClass:"navTab"},[i("p",{on:{click:e.getWaitComment}},[i("img",{attrs:{src:e.waitPingImg}}),e._v(" "),i("span",[e._v("待评价")]),e._v(" "),i("i",{directives:[{name:"show",rawName:"v-show",value:0!=e.orderList.waitCommentCount,expression:"orderList.waitCommentCount!=0"}],staticClass:"severalNum"},[e._v(e._s(e.orderList.waitCommentCount))])])]),e._v(" "),i("div",{staticClass:"navTab"},[i("p",{on:{click:e.getWaitRefund}},[i("img",{attrs:{src:e.shouhouImg}}),e._v(" "),i("span",[e._v("售后服务")]),e._v(" "),i("i",{directives:[{name:"show",rawName:"v-show",value:0!=e.orderList.waitRefundCount,expression:"orderList.waitRefundCount!=0"}],staticClass:"severalNum"},[e._v(e._s(e.orderList.waitRefundCount))])])]),e._v(" "),i("div",{staticClass:"navTab"},[i("p",{staticStyle:{"border-right":"none"},on:{click:e.getOrderList}},[i("img",{attrs:{src:e.orderListImg}}),e._v(" "),i("span",[e._v("全部订单")])])])]),e._v(" "),i("div",{staticClass:"useNavTab"},[i("div",{staticClass:"navTab"},[i("p",{on:{click:e.getMyPacket}},[i("img",{attrs:{src:e.myPagektImg}}),e._v(" "),i("span",[e._v("我的钱包")])])]),e._v(" "),i("div",{staticClass:"navTab"},[i("p",{on:{click:e.getTryUes}},[i("img",{attrs:{src:e.myTryUesImg}}),e._v(" "),i("span",[e._v("我的试用")]),e._v(" "),i("i",{directives:[{name:"show",rawName:"v-show",value:0!=e.orderList.freeUseCount,expression:"orderList.freeUseCount!=0"}],staticClass:"severalNum"},[e._v(e._s(e.orderList.freeUseCount))])])]),e._v(" "),i("div",{staticClass:"navTab"},[i("p",{on:{click:e.getMyPin}},[i("img",{attrs:{src:e.myPinImg}}),e._v(" "),i("span",[e._v("我的拼团")])])]),e._v(" "),i("div",{staticClass:"navTab"},[i("p",{on:{click:e.getMyCoupon}},[i("img",{attrs:{src:e.myCoupinImg}}),e._v(" "),i("span",[e._v("我的优惠券")])])]),e._v(" "),i("div",{staticClass:"navTab"},[i("p",{on:{click:e.getMycelect}},[i("img",{attrs:{src:e.mycelectImg}}),e._v(" "),i("span",[e._v("我的收藏")])])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"white"!=e.memList.levelCode,expression:"memList.levelCode!='white'"}],staticClass:"navTab"},[i("p",{on:{click:e.getMycode}},[i("img",{attrs:{src:e.myBookImg}}),e._v(" "),i("span",[e._v("推广海报")])])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"white"!=e.memList.levelCode&&"golden"!=e.memList.levelCode&&0==e.memList.isShowRenewButton,expression:"memList.levelCode!='white' &&  memList.levelCode!='golden' && memList.isShowRenewButton==0"}],staticClass:"navTab"},[i("p",{on:{click:e.getInvitedPink}},[i("img",{attrs:{src:e.myInvitedImg}}),e._v(" "),i("span",[e._v("邀请店主")])])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:0!=e.memList.isShowRenewButton,expression:"memList.isShowRenewButton!=0"}],staticClass:"navTab"},[i("p",{on:{click:e.getRenew}},[i("img",{attrs:{src:e.myInvitedImg}}),e._v(" "),i("span",[e._v("店主续费")])])]),e._v(" "),i("div",{staticClass:"navTab"},[i("p",{on:{click:e.getMyQuan}},[i("img",{attrs:{src:e.myQuanImg}}),e._v(" "),i("span",[e._v("粉圈")])])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"white"!=e.memList.levelCode&&"golden"!=e.memList.levelCode&&"store"!=e.memList.levelCode,expression:"memList.levelCode!='white' &&  memList.levelCode!='golden' && memList.levelCode!='store'"}],staticClass:"navTab"},[i("p",{on:{click:e.getBaoBiao}},[i("img",{attrs:{src:e.userIcon06Img}}),e._v(" "),i("span",[e._v("报表中心")])])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:null!=e.memList.partnerLevel||1==e.memList.isCityPartner||1==e.memList.isBrandPartner,expression:"memList.partnerLevel!=null || memList.isCityPartner==1 || memList.isBrandPartner==1"}],staticClass:"navTab"},[i("p",{staticClass:"getPartner"},[i("img",{attrs:{src:e.myPartentImg}}),e._v(" "),i("span",[e._v("合伙人")])])]),e._v(" "),i("div",{staticClass:"navTab"},[i("p",{on:{click:e.getSetUp}},[i("img",{attrs:{src:e.mySetupImg}}),e._v(" "),i("span",[e._v("设置")])])]),e._v(" "),i("div",{staticClass:"navTab"},[i("p",{on:{click:e.getMyHelp}},[i("img",{attrs:{src:e.myHelpImg}}),e._v(" "),i("span",[e._v("帮助中心")])])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:1==e.memList.isPhysicalStore,expression:"memList.isPhysicalStore==1"}],staticClass:"navTab"},[i("p",{on:{click:e.getSK}},[i("img",{attrs:{src:e.user_skImg}}),e._v(" "),i("span",[e._v("收款二维码")])])]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:"white"!=e.memList.levelCode&&"golden"!=e.memList.levelCode,expression:"memList.levelCode!='white' &&  memList.levelCode!='golden'"}],staticClass:"navTab"},[i("p",{on:{click:e.getSuper}},[i("img",{attrs:{src:e.userHuaImg}}),e._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:"store"==e.memList.levelCode,expression:"memList.levelCode=='store'"}]},[e._v("申请经理")]),e._v(" "),i("span",{directives:[{name:"show",rawName:"v-show",value:"store"!=e.memList.levelCode,expression:"memList.levelCode!='store'"}]},[e._v("邀请经理")])])])]),e._v(" "),i("div",{staticClass:"getBottom"},[i("div",{staticClass:"getIndex",on:{click:e.goIndex}},[i("div",{staticClass:"top"},[i("img",{attrs:{src:e.index01Img}})]),e._v(" "),i("div",{staticClass:"bot"},[e._v("首页")])]),e._v(" "),i("div",{staticClass:"getIndex",on:{click:e.getIndex}},[i("div",{staticClass:"top"},[i("img",{attrs:{src:e.cartImg}})]),e._v(" "),i("div",{staticClass:"bot"},[e._v("购物车")]),e._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.cartNum>0,expression:"cartNum>0"}],staticClass:"cartNum"},[e._v(e._s(e.cartNum))])]),e._v(" "),i("div",{staticClass:"getIndex",on:{click:e.getFind}},[i("div",{staticClass:"top"},[i("img",{attrs:{src:e.findImg}})]),e._v(" "),i("div",{staticClass:"bot"},[e._v("发现")])]),e._v(" "),i("div",{staticClass:"getIndex",on:{click:e.getkefu}},[i("div",{staticClass:"top"},[i("img",{attrs:{src:e.serviceImg}})]),e._v(" "),i("div",{staticClass:"bot"},[e._v("客服")])]),e._v(" "),i("div",{staticClass:"getIndex"},[i("div",{staticClass:"top"},[i("img",{attrs:{src:e.myImg}})]),e._v(" "),i("div",{staticClass:"bot",staticStyle:{color:"#000"}},[e._v("我的")])])])])},staticRenderFns:[]}}});