webpackJsonp([27,44],{366:function(e,t,s){s(886);var i=s(2)(s(480),s(1001),"data-v-a7e5620c",null);e.exports=i.exports},480:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{goodsImg:"https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/cca6d92c415c41028ed89bda3e681c66340f4a63",pageObj:{page:1},curObj:[],typeList:0,isMore:!0,imgObj:[],shareData:{title:"OL圈 试用中心",description:"试，是一种态度。每日整点限量抢试！还有更多新品、海外产品期待您来试用体验！",url:"",picURL:"http://ol-site.olquan.com/plug/mobile/img/logoo.jpg",hide:!0,share:!1}}},created:function(){2==this.$route.params.id?(this.$store.commit("documentTitle","新品首试"),this.typeList=1):4==this.$route.params.id&&(this.$store.commit("documentTitle","试海外"),this.typeList=2),this.getSpecialGoods(),this.getIndexImg()},mounted:function(){window.addEventListener("scroll",this.handleScroll)},methods:{getSpecialGoods:function(){var e={page:this.pageObj.page,rows:20,type:this.$route.params.id};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getFreeUseProducts,e,this.getSpecialGoodsBack)},getSpecialGoodsBack:function(e){this.curObj=e.result,this.shareData.url=USE_URL+"weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+"try/newCenter"),this.addWeixinShare()},getGoods:function(e){this.$router.push({path:"/demo/iscroll/id/"+e+"?memberId="+this.$route.query.memberId+"&isShare=0"})},getIndexImg:function(){var e={type:this.typeList};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.freeUseIndexImg,e,this.getIndexImgBack)},getIndexImgBack:function(e){1==this.typeList?this.imgObj=e.result.firstUseImg:2==this.typeList&&(this.imgObj=e.result.overSeasImg),console.log(this.imgObj)},handleScroll:function(){var e=document.body.scrollHeight;this.scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;var t=window.innerHeight;if(this.scrollTop+t>=e-200&&this.isMore){this.isMore=!1;var s={page:this.pageObj.page+1,rows:20,type:this.$route.params.id};this.pageObj.page=this.pageObj.page+1,this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getFreeUseProducts,s,this.getSpecialGoodsMoreBack)}},getSpecialGoodsMoreBack:function(e){e.result.length<20?(this.isMore=!1,this.showTrue=!0):this.isMore=!0;for(var t=0;t<e.result.length;t++)this.curObj.push(e.result[t])},addWeixinShare:function(){var e={url:location.href,callback:""};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,e,this.shareBack,this)},shareBack:function(e){"fail"==e.result&&(this.shareData.share=!0),this.wxShareFun(e.result,this.shareData)}},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)}}},819:function(e,t,s){t=e.exports=s(3)(),t.push([e.id,".severalTry img[data-v-a7e5620c]{pointer-events:none}.severalTry .goodslTry[data-v-a7e5620c]{padding:.3rem .2rem;background:#fff;margin-top:.2rem}.severalTry .goodslTry .goodsImg[data-v-a7e5620c]{width:100%;height:2.8rem}.severalTry .goodslTry .goodsImg img[data-v-a7e5620c]{display:block;width:100%;height:100%}.severalTry .goodslTry .goodsName[data-v-a7e5620c]{margin-top:.12rem;width:100%;line-height:.34rem;color:#333;overflow:hidden;font-size:.26rem;max-height:.68rem}.severalTry .goodslTry .goodsDesc[data-v-a7e5620c]{font-size:.24rem;color:#777;line-height:.48rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.severalTry .goodslTry .goodsPrice[data-v-a7e5620c]{color:#777;font-size:.24rem;display:flex;display:-moz-flex;display:-ms-flexbox;display:-webkit-flex;-ms-flex-pack:justify;justify-content:space-between;-moz-box-pack:space-between;-webkit--moz-box-pack:space-between;margin-top:.14rem}.severalTry .goodslTry .goodsPrice p[data-v-a7e5620c]{line-height:.24rem}.severalTry .goodslTry .goodsPrice p span[data-v-a7e5620c]{font-size:.34rem;color:#e5006e}",""])},886:function(e,t,s){var i=s(819);"string"==typeof i&&(i=[[e.id,i,""]]);s(4)(i,{});i.locals&&(e.exports=i.locals)},1001:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"severalTry"},[void 0!=e.imgObj?s("div",{staticStyle:{width:"100%"}},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.imgObj.image,expression:"imgObj.image"}],staticStyle:{display:"block",width:"100%"}})]):e._e(),e._v(" "),e._l(e.curObj,function(t){return s("div",{staticClass:"goodslTry",on:{click:function(s){e.getGoods(t.productId)}}},[s("div",{staticClass:"goodsImg"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.indexImage,expression:"item.indexImage"}]})]),e._v(" "),s("div",{staticClass:"goodsName"},[e._v("\n\t\t\t"+e._s(t.productName)+"\n\t\t")]),e._v(" "),s("div",{staticClass:"goodsDesc"},[e._v("\n\t\t\t"+e._s(t.summery)+"\n\t\t")]),e._v(" "),s("div",{staticClass:"goodsPrice"},[s("p",[e._v("保证金"),s("span",[e._v("￥"+e._s(t.price))])]),e._v(" "),s("p",{staticStyle:{"margin-top":".04rem"}},[e._v("已试"+e._s(t.buyCount)+"份")])])])})],2)},staticRenderFns:[]}}});