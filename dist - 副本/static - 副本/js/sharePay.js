webpackJsonp([22,36],{315:function(e,t,a){a(769);var i=a(2)(a(415),a(859),"data-v-4431c390",null);e.exports=i.exports},415:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"b",data:function(){return{goodsImg:"/static/images/goodsImg.png",colseImg:"/static/images/colse.png",chooseImg:"/static/images/choose.png",quesImg:"/static/images/question.png",nameImg:"/static/images/name.png",speImg:"/static/images/pin.png",delImg:"/static/images/del.png",addImg:"/static/images/add.png",indexImg:"/static/images/index.png",shiyongImg:"/static/images/shiyong.png",dajiaImg:"/static/images/dajia.png",zhuanxiangImg:"/static/images/zhuanxiang.png",pinpinImg:"/static/images/pinpin.png",temaiImg:"/static/images/temai.png",soldOut:"/static/images/soldOut.png",showHeigth:!1,curObj:[],time:"",day:"",hour:"",mint:"",secon:"",shareImg:"/static/images/share.png",shareSure:!1,getMemberId:"",getTogetherRecordId:"",nomoreOne:"",nomoreTwo:"",nomoreThree:"",getVlaueOne:"",getVlaueTwo:"",getVlaueThree:"",addSelect:-1,addSelectTwo:-1,addSelectThree:-1,getNomoreObj:"",num:1,normalId:"",chooseNor:!1,productId:"",listObj:[],isMore:!0,pageObj:{page:1},showTrue:!1,shareData:{title:"我们一起来拼团吧",description:"",url:"",picURL:"",hide:!0,share:!1},maxNumber:0,showMoney:0,quesImgList:["/static/images/question.png","/static/images/question.png","/static/images/question.png","/static/images/question.png","/static/images/question.png","/static/images/question.png"],showMember:!1}},created:function(){this.$store.commit("documentTitle","拼团"),console.log(this.$route.query.id),this.getTogetherRecordId=this.getCookie("togetherRecordId"),console.log(this.getCookie("togetherRecordId")),this.getMember(),this.getList(),this.moveTime()},mounted:function(){window.addEventListener("scroll",this.handleScroll)},methods:{goOne:function(){this.showMember?window.location.href=CUR_URLBACK+"index/pinkIndex?memberId="+this.$route.query.memberId:window.location.href=CUR_URLBACK+"index/newIndex?memberId="+this.$route.query.memberId},goTwo:function(){window.location.href=CUR_URLBACK+"index/index?memberId="+this.$route.query.memberId},goThree:function(){window.location.href=CUR_URLBACK+"mine/index?memberId="+this.$route.query.memberId},goFour:function(){window.location.href=CUR_URLBACK+"try/moretry?memberId="+this.$route.query.memberId},goFive:function(){window.location.href=API_HOST+"ol/weixin/index/indexRecommendBrand?memberId="+this.$route.query.memberId},getMember:function(){var e={memberId:this.$route.query.memberId};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,e,this.getMemberBack,this)},getMemberBack:function(e){e.result.isGetStoreCommission?this.showMember=!0:this.showMember=!1},getList:function(){var e={memberId:this.$route.query.memberId,togetherRecordId:this.$route.query.id};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.togetherRecordDetail,e,this.getListBack,this)},getListBack:function(e){e.result?this.curObj=e.result:this.curObj=[],console.log(e.result.normals),0!=e.result.normals.length&&(e.result.normals.length>0&&e.result.normals.length<2?(this.nomoreOne=e.result.normals[0],console.log(this.nomoreOne)):e.result.normals.length>1&&(this.nomoreOne=e.result.normals[0],console.log(this.nomoreOne),this.nomoreTwo=e.result.normals[1],this.nomoreThree=e.result.normals[3]),console.log(this.nomoreThree)),this.productId=e.result.productId,this.getOrderDetail(),this.time=this.curObj.endTime.replace(/-/g,"/"),this.shareData.picURL=this.curObj.productImage,this.showMoney=this.curObj.normals.length,console.log(this.showMoney),this.shareData.url="http://ol-site.olquan.com/weixin/auth?recId="+this.$route.query.memberId+"&view="+encodeURIComponent(CUR_URLBACK+"share/share?id="+this.$route.query.id),this.shareData.title="【OL圈拼团】我花了"+this.curObj.togetherPrice+"元买了"+this.curObj.productName,this.shareData.description=this.curObj.productDesc,this.addWeixinShare()},goBuy:function(e){this.$router.push({path:"/index/goodsDetali/id/"+e+"?memberId="+this.$route.query.memberId+"&isLimit=0"})},getOrderDetail:function(){var e={};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getBestTogetherList,e,this.getOrderDetailBack,this)},getOrderDetailBack:function(e){console.log(e),this.listObj=e.result},getPordcut:function(e){console.log(e),window.location.href=API_HOST+"weixin/product/newProductDetail?productId="+e+"&memberId="+this.$route.query.memberId},getRtime:function(){function e(e){return e<10&&(e="0"+e),e}var t=new Date(this.time),a=new Date,i=t.getTime()-a.getTime(),s=0,o=0,r=0,n=0;i>=0&&(s=e(Math.floor(i/1e3/60/60/24)),o=e(Math.floor(i/1e3/60/60%24)),r=e(Math.floor(i/1e3/60%60)),n=e(Math.floor(i/1e3%60))),this.day=s,this.hour=o,this.mint=r,this.secon=n},moveTime:function(){var e=this;console.log(this),setInterval(e.getRtime,0)},shareOrder:function(){this.shareSure=!0},colseShare:function(){this.shareSure=!1},buyGoods:function(){this.chooseNor=!0,this.showHeigth=!0},closeShow:function(){this.chooseNor=!1,this.showHeigth=!1},getValue:function(e,t,a){console.log(e),console.log(t),console.log(a)},getVlaueone:function(e,t){this.addSelect=e,this.getVlaueOne=t,this.getValueDetail()},getValueDetail:function(){var e={productId:this.curObj.productId,valueIds:this.getVlaueOne+","+this.getVlaueTwo,uutype:1,memberId:this.$route.query.memberId,type:this.curObj.type};console.log(this.getVlaueOne),console.log(this.getVlaueTwo),this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getNormal,e,this.getNormalBack,this)},getVlauetwo:function(e,t){this.addSelectTwo=e,this.getVlaueTwo=t,this.getValueDetail()},getNormalBack:function(e){console.log(e),null!=e.result?this.getNomoreObj=e.result:this.getNomoreObj="",e.result.norms.length>0?this.normalId=e.result.id:this.normalId="",console.log(this.normalId)},delNum:function(){this.num-=1,this.num<=0&&(this.num=1)},addNum:function(){this.num+=1,this.num>this.curObj.limitBuyCount&&(this.num=this.curObj.limitBuyCount,this.$toast("该产品最多购买"+this.num+"件"))},goBuything:function(){this.setCookie("number","");({num:this.num,normalId:this.normalId,memberId:this.$route.query.memberId,togetherId:this.curObj.togetherId,togetherRecordId:this.$route.query.id});""==this.normalId&&0!=this.showMoney?this.$toast("请选择规格"):window.location.href=API_HOST+"ol/confirmOrder1.html?num="+this.num+"&type="+this.curObj.type+"&normalId="+this.normalId+"&memberId="+this.$route.query.memberId+"&togetherId="+this.curObj.togetherId+"&togetherRecordId="+this.$route.query.id},goGood:function(e){console.log(e),this.$router.push({path:"/index/goodsDetali/id/"+e+"?memberId="+this.$route.query.memberId+"&isLimit=0"})},addWeixinShare:function(){var e={url:location.href,callback:""};console.log(location.href),this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,e,this.shareBack,this)},shareBack:function(e){"fail"==e.result&&(this.shareData.share=!0),this.wxShareFun(e.result,this.shareData)}},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)}}},720:function(e,t,a){t=e.exports=a(3)(),t.push([e.id,".spe[data-v-4431c390]{width:100%;height:100%;overflow:hidden;position:relative}.partake[data-v-4431c390]{width:100%;min-height:100%;position:relative}.partake .know[data-v-4431c390]{overflow:hidden;font-size:.28rem;padding:0 .24rem;background:#fff;line-height:.5rem}.partake .know .know-l[data-v-4431c390]{float:left}.partake .know .know-r[data-v-4431c390]{float:right;color:#949494;display:inline-block}.partake .know .know-r p[data-v-4431c390]{display:inline-block;height:.05rem;width:.05rem;background:#949494;border-radius:50%;vertical-align:middle}.partake .goodsdetail[data-v-4431c390]{display:flex;display:-moz-flex;display:-ms-flexbox;display:-webkit-flex;-ms-flex-pack:start;justify-content:flex-start;-moz-box-pack:flex-start;-webkit--moz-box-pack:flex-start;padding:.24rem;background:#fff}.partake .goodsdetail .goods-l[data-v-4431c390]{height:2.2rem;width:2.2rem}.partake .goodsdetail .goods-l img[data-v-4431c390]{height:2.2rem;width:2.2rem;display:block}.partake .goodsdetail .goods-r[data-v-4431c390]{width:65%;overflow:hidden;margin-left:.24rem;line-height:.36rem;font-size:.3rem;position:relative}.partake .goodsdetail .goods-r .bot[data-v-4431c390]{position:absolute;left:0;bottom:0}.partake .goodsdetail .goods-r .bot .top[data-v-4431c390],.partake .goodsdetail .goods-r .bot .xia[data-v-4431c390]{font-size:.24rem;color:#a9a9a9}.partake .goodsdetail .goods-r .bot .xia i[data-v-4431c390]{font-style:normal;font-size:.32rem;color:#e51072}.partake .list[data-v-4431c390]{display:flex;display:-ms-flexbox;display:-moz-flex;padding:0 .24rem;-ms-flex-pack:start;justify-content:flex-start;-moz-box-pack:flex-start;-webkit--moz-box-pack:flex-start;font-size:.24rem;background:#f2f2f2}.partake .list li[data-v-4431c390]{line-height:.64rem;position:relative;padding-left:.38rem;margin:0 .2rem}.partake .list li img[data-v-4431c390]{display:inline-block;height:.28rem;width:.28rem;position:absolute;left:0;top:50%;margin-top:-.14rem;border-radius:50%}.partake .name[data-v-4431c390]{background:#fff;display:flex;width:100%;display:-ms-flexbox;display:-webkit-flex}.partake .name .name-list[data-v-4431c390],.partake .name[data-v-4431c390]{-ms-flex-pack:center;justify-content:center;-moz-box-pack:center;-webkit--moz-box-pack:center}.partake .name .name-list[data-v-4431c390]{width:6.1rem;display:flex;display:-moz-flex;display:-ms-flexbox;display:-webkit-flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-flex-wrap:wrap;-webkit-box-lines:multiple;-moz-flex-wrap:wrap;font-size:.24rem;padding:.4rem 0}.partake .name .name-list li[data-v-4431c390]{margin:.05rem .16rem;position:relative}.partake .name .name-list li img[data-v-4431c390]{display:inline-block;height:.8rem;width:.8rem;border-radius:50%}.partake .name .name-list li .special[data-v-4431c390]{display:inline-block;width:.58rem;height:.32rem;position:absolute;left:-.18rem;top:-.1rem}.partake .time[data-v-4431c390]{background:#fff;padding-bottom:.2rem}.partake .time .name-time[data-v-4431c390]{font-size:.36rem;text-align:center;color:#333;margin-bottom:.4rem}.partake .time .name-time .front[data-v-4431c390]{color:#ff3892;font-weight:700}.partake .time .name-time .back[data-v-4431c390]{font-weight:700}.partake .time .button[data-v-4431c390]{display:flex;display:-ms-flexbox;display:-moz-flex;-ms-flex-pack:center;justify-content:center;-moz-box-pack:center;-webkit--moz-box-pack:center}.partake .time .button p[data-v-4431c390]{width:7.02rem;height:.88rem;background:#fe3491;border-radius:.05rem;font-size:.32rem;color:#fff;text-align:center;line-height:.88rem}.partake .shareDetail[data-v-4431c390]{position:absolute;width:100%;height:100%;left:0;top:0;z-index:222;background:rgba(0,0,0,.8)}.partake .shareDetail .share .time[data-v-4431c390]{background:none;font-size:.28rem;text-align:center;width:100%;color:#fff;line-height:.76rem;position:absolute;top:0}.partake .shareDetail .share img[data-v-4431c390]{width:1.6rem;height:1.64rem;position:absolute;right:.4rem;top:.4rem}.partake .shareDetail .share .people[data-v-4431c390]{margin-top:2.36rem;color:#fff;font-size:.36rem;text-align:center}.partake .shareDetail .share .people span[data-v-4431c390]{color:#ff3892}.partake .shareDetail .share .people i[data-v-4431c390]{font-style:normal}.partake .shareDetail .share .sure[data-v-4431c390]{font-size:.28rem;text-align:center;color:#fff;margin-top:.5rem}.partake .norms[data-v-4431c390]{position:absolute;left:0;top:0;height:100%;width:100%;z-index:999;background:rgba(0,0,0,.5)}.partake .norms .choose[data-v-4431c390]{position:absolute;left:0;bottom:0;min-height:1.56rem;width:100%;background:#fff}.partake .norms .choose .productImage[data-v-4431c390]{position:absolute;left:.26rem;top:-.2rem;height:1.56rem;width:1.56rem;display:block}.partake .norms .choose .close[data-v-4431c390]{display:block;position:absolute;left:6.9rem;top:.26rem;z-index:222;height:.32rem;width:.32rem}.partake .norms .choose .detail[data-v-4431c390]{font-size:.26rem;padding-left:2.04rem;height:1.56rem}.partake .norms .choose .detail .money[data-v-4431c390]{line-height:.5rem;font-weight:700;font-size:.36rem;color:#fe3491}.partake .norms .choose .detail .num[data-v-4431c390]{font-size:.2rem}.partake .norms .choose .noMores .nameClass[data-v-4431c390]{font-size:.26rem;margin-left:.26rem;line-height:.8rem}.partake .norms .choose .noMores .size[data-v-4431c390]{overflow:hidden;padding-left:.26rem}.partake .norms .choose .noMores .size span[data-v-4431c390]{margin:0 .2rem .2rem 0;float:left;height:.54rem;min-width:1.2rem;border:.01rem solid #cfcfcf;font-size:.24rem;text-align:center;line-height:.56rem}.partake .norms .choose .noMores .size .special[data-v-4431c390]{border:.01rem solid #e30067;color:#e30067}.partake .norms .buyNum[data-v-4431c390]{font-size:.26rem;padding:.26rem;overflow:hidden}.partake .norms .buyNum .left[data-v-4431c390]{float:left;line-height:.5rem}.partake .norms .buyNum .right[data-v-4431c390]{float:right;overflow:hidden}.partake .norms .buyNum .right .num[data-v-4431c390]{float:left;line-height:.5rem;font-size:.32rem;min-width:.48rem;text-align:center}.partake .norms .buyNum .right .del[data-v-4431c390]{float:left;height:.48rem;width:.48rem;vertical-align:middle;text-align:center;line-height:.5rem;font-size:.48rem;margin-right:.2rem}.partake .norms .buyNum .right .del .delnum[data-v-4431c390]{display:block;height:100%;width:100%}.partake .norms .buyNum .right .add[data-v-4431c390]{float:right;height:.48rem;width:.48rem;color:#e30067;line-height:.5rem;font-size:.48rem;vertical-align:middle;text-align:center;margin-left:.2rem}.partake .norms .buyNum .right .add .addnum[data-v-4431c390]{display:block;height:100%;width:100%}.partake .norms .surePay[data-v-4431c390]{width:100%;background:#e30067;font-size:.34rem;color:#fff;line-height:1rem;text-align:center}.partake .benefit[data-v-4431c390]{margin-top:.2rem;padding:.2rem .4rem 0;background:#fff}.partake .benefit ul[data-v-4431c390]{display:flex;display:-ms-flexbox;display:-moz-flex;-ms-flex-pack:start;justify-content:flex-start;-moz-box-pack:flex-start;-webkit--moz-box-pack:flex-start}.partake .benefit ul li[data-v-4431c390]{margin-bottom:.2rem;font-size:.24rem;text-align:center;width:20%;display:flex;display:-moz-flex;display:-ms-flexbox;display:-webkit-flex;-ms-flex-pack:center;justify-content:center;-moz-box-pack:center;-webkit--moz-box-pack:center;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-flex-wrap:wrap;-webkit-box-lines:multiple;-moz-flex-wrap:wrap}.partake .benefit ul li span[data-v-4431c390]{color:#666;display:block}.partake .benefit ul li img[data-v-4431c390]{display:block;height:.9rem;width:.9rem;border-radius:50%;margin-bottom:.2rem}.partake .content[data-v-4431c390]{padding:.2rem .12rem}.partake .content ul[data-v-4431c390]{width:100%;display:flex;display:-ms-flexbox;display:-moz-flex;-ms-flex-pack:justify;justify-content:space-between;-moz-box-pack:space-between;-webkit--moz-box-pack:space-between;box-pack:space-between;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-flex-wrap:wrap;-webkit-box-lines:multiple;-moz-flex-wrap:wrap}.partake .content ul .special[data-v-4431c390]{width:100%;height:.56rem;background:none;color:#9c9c9c;line-height:.56rem;text-align:center;font-size:.28rem}.partake .content ul li[data-v-4431c390]{width:49.5%;padding-bottom:.2rem;background:#fff;margin-bottom:.1rem;position:relative}.partake .content ul li .soldOut[data-v-4431c390]{position:absolute;left:50%;margin-left:-.9rem;top:50%;margin-top:-.9rem;display:block;width:1.8rem;height:1.8rem}.partake .content ul li img[data-v-4431c390]{display:block;width:100%}.partake .content ul li .top[data-v-4431c390]{font-weight:400;font-size:.3rem;color:#333;line-height:.45rem;height:.86rem;overflow:hidden;padding:.08rem;margin-bottom:.25rem}.partake .content ul li .botMoney[data-v-4431c390]{display:block;overflow:hidden;font-size:.2rem;color:#b2b2b2;font-style:normal;position:absolute;right:0;bottom:.1rem;z-index:222;width:100%;height:.48rem;padding-right:.24rem}.partake .content ul li .botMoney .goBuy[data-v-4431c390]{display:block;width:1.2rem;height:.48rem;background:#fa006a;text-align:center;font-size:.3rem;color:#fff;line-height:.48rem;border-radius:.05rem;position:absolute;top:0;right:.12rem}.partake .content ul li .botMoney img[data-v-4431c390]{display:inline-block;height:.48rem;width:.48rem;border-radius:50%}.partake .content ul li .botMoney img[data-v-4431c390]:first-child{position:absolute;right:.12rem;top:0;z-index:200}.partake .content ul li .botMoney img[data-v-4431c390]:nth-child(3){position:absolute;right:.58rem;top:0;z-index:206}.partake .content ul li .botMoney img[data-v-4431c390]:nth-child(2){position:absolute;right:.36rem;top:0;z-index:202}",""])},769:function(e,t,a){var i=a(720);"string"==typeof i&&(i=[[e.id,i,""]]);a(4)(i,{});i.locals&&(e.exports=i.locals)},859:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"partake",class:{spe:e.showHeigth===!0}},[a("div",{staticClass:"goodsdetail",on:{click:function(t){e.goGood(e.curObj.togetherId)}}},[a("div",{staticClass:"goods-l"},[a("img",{attrs:{src:e.curObj.productImage}})]),e._v(" "),a("div",{staticClass:"goods-r"},[a("div",{staticStyle:{height:"1.435rem",overflow:"hidden"}},[e._v("\n\t\t\t\t"+e._s(e.curObj.productName)+"\n\t\t\t")]),e._v(" "),a("p",{staticClass:"bot"},[a("span",{staticClass:"top"},[e._v("  "+e._s(e.curObj.count)+"人团·已拼"+e._s(e.curObj.joinCount)+"件")]),a("br"),e._v(" "),a("span",{staticClass:"xia"},[a("i",[e._v("￥"+e._s(e.curObj.togetherPrice))]),e._v(" 拼团省"+e._s(e.curObj.economizePrice)+"元")])])])]),e._v(" "),a("ul",{staticClass:"list"},e._l(e.curObj.productTags,function(t){return a("li",[a("img",{attrs:{src:e.chooseImg}}),e._v(e._s(t))])})),e._v(" "),a("div",{staticClass:"name"},[a("ul",{staticClass:"name-list"},[e._l(e.curObj.joinMemberData,function(t){return a("li",[a("img",{attrs:{src:t.memberLogo}}),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:1==t.isOwner,expression:"item.isOwner==1"}],staticClass:"special",attrs:{src:e.speImg}})])}),e._v(" "),e._l(e.quesImgList,function(t,i){return i<e.curObj.plusCount?a("li",{directives:[{name:"show",rawName:"v-show",value:1!=e.curObj.isSuccess,expression:"curObj.isSuccess!=1"}]},[a("img",{attrs:{src:t}})]):e._e()})],2)]),e._v(" "),a("div",{staticClass:"time"},[a("p",{directives:[{name:"show",rawName:"v-show",value:0==e.curObj.status,expression:"curObj.status==0"}],staticClass:"name-time"},[e._v("\n\t\t\t还差"),a("span",{staticClass:"front"},[e._v(e._s(e.curObj.plusCount))]),e._v("个名额，"),a("span",{staticClass:"back"},[e._v(e._s(e.hour)+":"+e._s(e.mint)+":"+e._s(e.secon))]),e._v("后结束\n\t\t")]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:0==e.curObj.isJoinTogether,expression:"curObj.isJoinTogether==0"}],staticClass:"button",on:{click:e.buyGoods}},[a("p",[e._v("参与拼团")])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:1==e.curObj.isJoinTogether,expression:"curObj.isJoinTogether==1"}],staticClass:"button",on:{click:e.shareOrder}},[a("p",[e._v("邀请好友拼团")])])]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.shareSure,expression:"shareSure"}],staticClass:"shareDetail",on:{click:e.colseShare}},[a("div",{staticClass:"share"},[a("div",{directives:[{name:"show",rawName:"v-show",value:0==e.curObj.status,expression:"curObj.status==0"}],staticClass:"time"},[e._v(e._s(e.hour)+":"+e._s(e.mint)+":"+e._s(e.secon))]),e._v(" "),a("img",{attrs:{src:e.shareImg}}),e._v(" "),a("div",{staticClass:"people"},[a("i",{directives:[{name:"show",rawName:"v-show",value:e.curObj.plusCount>0,expression:"curObj.plusCount>0"}]},[e._v("还差"),a("span",[e._v(e._s(e.curObj.plusCount))]),e._v("人，")]),e._v("赶紧邀请好友来拼团吧")]),e._v(" "),a("div",{staticClass:"sure"},[e._v("点击右上角分享拼团")])])]),e._v(" "),e._m(0),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.chooseNor,expression:"chooseNor"}],staticClass:"norms"},[a("div",{staticClass:"choose"},[a("img",{staticClass:"close",attrs:{src:e.colseImg},on:{click:e.closeShow}}),e._v(" "),a("img",{staticClass:"productImage",attrs:{src:e.curObj.productImage}}),e._v(" "),a("p",{staticClass:"detail"},[e.curObj.normals!=[]&&void 0!=e.getNomoreObj.valueIds&&""!=e.getNomoreObj.valueIds?a("span",{staticClass:"money",staticStyle:{display:"block"}},[e._v("￥"+e._s(e.getNomoreObj.salePriceView))]):a("span",{staticClass:"money",staticStyle:{display:"block"}},[e._v("￥"+e._s(e.curObj.activePriceInterval))]),e._v(" "),0!=e.showMoney&&void 0!=e.getNomoreObj.valueIds&&""!=e.getNomoreObj.valueIds?a("span",{staticClass:"num"},[e._v("已选规格："+e._s(e.getNomoreObj.values))]):e._e(),e._v(" "),0!=e.showMoney&&void 0==e.getNomoreObj.valueIds||""==e.getNomoreObj.valueIds?a("span",{staticClass:"num"},[e._v("请选择规格")]):e._e(),e._v(" "),0==e.showMoney?a("span",{staticClass:"num"}):e._e()]),e._v(" "),void 0!=e.nomoreOne?a("div",{staticClass:"noMores"},[a("p",{staticClass:"nameClass"},[e._v("\n\t\t\t\t\t"+e._s(e.nomoreOne.key)+"\n\t\t\t\t")]),e._v(" "),a("p",{staticClass:"size"},e._l(e.nomoreOne.normses,function(t,i){return a("span",{class:{special:i===e.addSelect},on:{click:function(a){e.getVlaueone(i,t.valueId)}},model:{value:e.getVlaueOne,callback:function(t){e.getVlaueOne=t},expression:"getVlaueOne"}},[e._v(e._s(t.value))])}))]):e._e(),e._v(" "),void 0!=e.nomoreTwo?a("div",{staticClass:"noMores"},[a("p",{staticClass:"nameClass"},[e._v("\n\t\t\t\t\t"+e._s(e.nomoreTwo.key)+"\n\t\t\t\t")]),e._v(" "),a("p",{staticClass:"size"},e._l(e.nomoreTwo.normses,function(t,i){return a("span",{class:{special:i===e.addSelectTwo},on:{click:function(a){e.getVlauetwo(i,t.valueId)}}},[e._v(e._s(t.value))])}))]):e._e(),e._v(" "),void 0!=e.nomoreThree?a("div",{staticClass:"noMores"},[a("p",{staticClass:"nameClass"},[e._v("\n\t\t\t\t\t"+e._s(e.nomoreThree.key)+"\n\t\t\t\t")]),e._v(" "),a("p",{staticClass:"size"},e._l(e.nomoreThree.normses,function(t,i){return a("span",{class:{special:i===e.addSelectThree}},[e._v(e._s(t.value))])}))]):e._e(),e._v(" "),a("div",{staticClass:"buyNum"},[a("p",{staticClass:"left"},[e._v("购买数量")]),e._v(" "),a("p",{staticClass:"right"},[a("span",{staticClass:"del",on:{click:e.delNum}},[a("img",{staticClass:"delnum",attrs:{src:e.delImg}})]),e._v(" "),a("span",{staticClass:"num"},[e._v(e._s(e.num))]),e._v(" "),a("span",{staticClass:"add",on:{click:e.addNum}},[a("img",{staticClass:"addnum",attrs:{src:e.addImg}})])])]),e._v(" "),a("div",{staticClass:"surePay",on:{click:e.goBuything}},[e._v("\n\t\t\t\t确 定\n\t\t\t")])])]),e._v(" "),a("div",{staticClass:"benefit"},[a("ul",[a("li",{on:{click:e.goOne}},[a("img",{attrs:{src:e.indexImg}}),e._v(" "),a("span",[e._v("首页")])]),e._v(" "),a("li",{on:{click:e.goTwo}},[a("img",{attrs:{src:e.pinpinImg}}),e._v(" "),a("span",[e._v("拼团")])]),e._v(" "),a("li",{on:{click:e.goThree}},[a("img",{attrs:{src:e.zhuanxiangImg}}),e._v(" "),a("span",[e._v("粉领会员")])]),e._v(" "),a("li",{on:{click:e.goFour}},[a("img",{attrs:{src:e.shiyongImg}}),e._v(" "),a("span",[e._v("试用中心")])]),e._v(" "),a("li",{on:{click:e.goFive}},[a("img",{attrs:{src:e.temaiImg}}),e._v(" "),a("span",[e._v("品牌特卖")])])])]),e._v(" "),a("div",{staticClass:"content"},[a("ul",[e._l(e.listObj,function(t){return a("li",{on:{click:function(a){e.goBuy(t.togetherId)}}},[a("p",{staticStyle:{position:"relative"}},[a("img",{attrs:{src:t.productImage}}),e._v(" "),a("img",{directives:[{name:"show",rawName:"v-show",value:0==t.store,expression:"item.store==0"}],staticClass:"soldOut",attrs:{src:e.soldOut}})]),e._v(" "),a("p",{staticClass:"top"},[e._v(e._s(t.productName))]),e._v(" "),a("p",{staticStyle:{"font-size":".30rem",color:"#fa006a","font-weight":"700"}},[e._v("￥"+e._s(t.price)+"\n\t\t\t\t\t"),a("span",{directives:[{name:"show",rawName:"v-show",value:t.count>0,expression:"item.count>0"}],staticStyle:{color:"#b3b3b3","font-size":".24rem","font-weight":"normal"}},[e._v("已拼"+e._s(t.count)+"件")])]),e._v(" "),a("p",{staticClass:"botMoney"},e._l(t.joinMembers,function(e){return a("img",{directives:[{name:"show",rawName:"v-show",value:t.joinMembers.length>0,expression:"item.joinMembers.length>0"}],attrs:{src:e.memberLogo}})}))])}),e._v(" "),a("li",{directives:[{name:"show",rawName:"v-show",value:e.showTrue,expression:"showTrue"}],staticClass:"special"},[e._v("没有更多了")])],2)])])},staticRenderFns:[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"know"},[a("p",{staticClass:"know-l"},[e._v("拼团须知")]),e._v(" "),a("div",{staticClass:"know-r"},[a("p"),e._v(" "),a("span",[e._v("好友拼团")]),e._v(" "),a("p"),e._v(" "),a("span",[e._v("人满发货")]),e._v(" "),a("p"),e._v(" "),a("span",[e._v("人不满退款")])])])}]}}});