webpackJsonp([54,61],{609:function(e,t,o){o(1455);var i=o(2)(o(745),o(1569),"data-v-edc1b5ae",null);e.exports=i.exports},745:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=o(41),s=i(a);t.default={data:function(){return{selectVlaue:"默认",downImg:"/static/images/download.png",goTopImg:"/static/images/goTop.png",godownImg:"/static/images/godown.png",gofotopImg:"/static/images/gofotop.png",shangupImg:"/static/images/shangup.png",xiaupImg:"/static/images/xiaup.png",showChoose:!1,imgObj:[],curObj:[],addIndex:0,showTrue:!1,showTop:!1,sort:1,togetherCategoryId:this.$route.params.id,pageObj:{page:1},searchBarFixed:!1,isMore:!0,offsetTop:0,showFive:!0,shareData:{title:"OL圈拼团",description:"拼优惠，拼乐趣",url:"",picURL:"http://ol-h5-preview.olquan.cn/static/images/pinpin.png",hide:!0,share:!1}}},components:{$:s.default},created:function(){this.$store.commit("documentTitle","拼团"),this.addRecord(),this.getList(),this.getGoods()},mounted:function(){window.addEventListener("scroll",this.handleScroll)},methods:{addRecord:function(){var e={terminalType:5,pageuri:"index/moreindex/id/"+this.togetherCategoryId};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addRecord,e,this.addRecordBack,this)},addRecordBack:function(e){},getList:function(){var e={};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getNewTogetherBanners,e,this.getListBack)},getListBack:function(e){console.log(e),this.imgObj=e.result,this.imgObj.togetherCateries.length>=6?this.showFive=!1:this.showFive=!0},getGoods:function(){var e={page:1,rows:20,isRecommend:2,togetherCategoryId:this.togetherCategoryId,sort:this.sort};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getTogetherList,e,this.getGoodsBack)},getGoodsBack:function(e){console.log(e),this.curObj=e.result,this.shareData.url="https://ol-site.olquan.cn/weixin/auth?recId="+this.getCookie("memberId")+"&view="+encodeURIComponent(CUR_URLBACK+"index/newIndex"),this.shareData.description="拼优惠，拼乐趣",this.addWeixinShare()},goBuy:function(e){this.$router.push({path:"/index/goodsDetali/id/"+e+"?isLimit=0"})},getShow:function(){this.showChoose=!this.showChoose},getDetailNex:function(e,t){(0,s.default)("html,body").animate({scrollTop:0},0),console.log(t),this.addIndex=e,this.togetherCategoryId=t,this.sort=1,this.isMore=!0,this.pageObj.page=1,this.getGoods(),this.addRecord()},lowPrice:function(){this.sort=1,this.getGoods()},higPrice:function(){this.sort=2,this.getGoods()},handleScroll:function(){var e=document.body.scrollHeight;this.scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,this.scrollTop>600?this.showTop=!0:this.showTop=!1;var t=window.innerHeight;if(this.scrollTop+t>=e-200&&this.isMore){this.isMore=!1;var o={page:this.pageObj.page+1,rows:20,isRecommend:2,togetherCategoryId:this.togetherCategoryId,sort:this.sort};this.pageObj.page=this.pageObj.page+1,this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getTogetherList,o,this.getListMoreBack)}},getListMoreBack:function(e){e.result.length<20?(this.isMore=!1,this.showTrue=!0):this.isMore=!0;for(var t=0;t<e.result.length;t++)this.curObj.push(e.result[t])},addWeixinShare:function(){var e={url:location.href,callback:""};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,e,this.shareBack,this)},shareBack:function(e){"fail"==e.result&&(this.shareData.share=!0),this.wxShareFun(e.result,this.shareData)}},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)}}},1119:function(e,t,o){t=e.exports=o(4)(),t.push([e.id,".indexMore[data-v-edc1b5ae]{padding-top:1.42rem}.indexMore .topmodel[data-v-edc1b5ae]{padding:.12rem 0;background:#fff;border-bottom:.01rem solid #f2f2f2;position:fixed;left:0;top:0;width:100%;z-index:2222}.indexMore .topmodel .score[data-v-edc1b5ae]{border-top:.01rem solid #f2f2f2;font-size:.24rem;color:#999;width:100%;padding-top:.06rem;overflow:hidden}.indexMore .topmodel .score img[data-v-edc1b5ae]{display:inline-block;height:.2rem;width:.2rem}.indexMore .topmodel .score .scoreS[data-v-edc1b5ae]{color:#000}.indexMore .topmodel .score .scoreL[data-v-edc1b5ae]{float:left;width:49.9%;text-align:center;line-height:.46rem}.indexMore .topmodel .score .scoreR[data-v-edc1b5ae]{float:left;width:48.9%;text-align:center;line-height:.46rem;border-left:.01rem solid #e5e5e5}.indexMore .topmodel .atuoPage[data-v-edc1b5ae]{overflow-x:scroll;position:relative}.indexMore .topmodel .atuoPage .select[data-v-edc1b5ae]{font-size:.24rem;color:#666;float:left;width:1.9rem;text-align:center;border:.01rem solid #f2f2f2;background:#fff;height:.62rem;line-height:.64rem;margin-left:.24rem}.indexMore .topmodel .atuoPage .selectImg[data-v-edc1b5ae]{width:.5rem;height:.62rem;border:.01rem solid #f2f2f2;border-left:none;position:relative;float:left}.indexMore .topmodel .atuoPage .selectImg img[data-v-edc1b5ae]{display:block;position:absolute;left:50%;margin-left:-.08rem;width:.16rem;height:.1rem;top:50%;margin-top:-.05rem}.indexMore .topmodel .atuoPage .list[data-v-edc1b5ae]{white-space:nowrap;width:100%;height:.64rem;float:left;overflow-y:hidden;z-index:333;overflow-x:auto}.indexMore .topmodel .atuoPage .list .listItem[data-v-edc1b5ae]{font-size:.28rem;line-height:.64rem;margin:0 .2rem;color:#666;vertical-align:text-top;display:inline-block}.indexMore .topmodel .atuoPage .list .specialList[data-v-edc1b5ae]{color:#ed0477;font-weight:600}.indexMore .topmodel .atuoPage .listSpecial[data-v-edc1b5ae]{display:flex;display:-ms-flexbox;display:-moz-flex;-ms-flex-pack:distribute;justify-content:space-around;-moz-box-pack:space-around;-webkit--moz-box-pack:space-around;box-pack:space-around}.indexMore .topmodel .choose[data-v-edc1b5ae]{font-size:.24rem;position:absolute;line-height:.62rem;width:2.41rem;text-align:center;background:#fff;border:.01rem solid #f2f2f2;z-index:22;left:.24rem;top:.76rem;border-top:none}.indexMore .isFixed[data-v-edc1b5ae]{position:fixed;left:0;top:0;width:100%;z-index:2222}.indexMore .content[data-v-edc1b5ae]{padding:.05rem .12rem}.indexMore .content ul[data-v-edc1b5ae]{width:100%;display:flex;display:-ms-flexbox;display:-moz-flex;-ms-flex-pack:justify;justify-content:space-between;-moz-box-pack:space-between;-webkit--moz-box-pack:space-between;box-pack:space-between;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-flex-wrap:wrap;-webkit-box-lines:multiple;-moz-flex-wrap:wrap}.indexMore .content ul .special[data-v-edc1b5ae]{width:100%;height:.56rem;background:none;color:#9c9c9c;line-height:.56rem;text-align:center;font-size:.28rem}.indexMore .content ul li[data-v-edc1b5ae]{width:49.2%;padding-bottom:.2rem;background:#fff;margin-bottom:.1rem;position:relative}.indexMore .content ul li .imgDetail[data-v-edc1b5ae]{width:100%;height:3.6rem;display:flex;display:-moz-flex;display:-ms-flexbox;-webkit-box-pack:center;-moz-box-pack:center;-ms-flex-align:center;-moz-align-items:center;align-items:center;position:relative}.indexMore .content ul li .specialZhe[data-v-edc1b5ae]{position:absolute;width:100%;height:100%;left:0;z-index:22;top:0;background:transparent}.indexMore .content ul li img[data-v-edc1b5ae]{display:block;width:100%}.indexMore .content ul li .imgTage[data-v-edc1b5ae]{position:absolute;left:.1rem;top:0;width:30%}.indexMore .content ul li .top[data-v-edc1b5ae]{font-weight:400;font-size:.28rem;color:#333;line-height:.4rem;height:.8rem;overflow:hidden;margin-bottom:.25rem}.indexMore .content ul li .top span[data-v-edc1b5ae]{color:#fa006a;border:.01rem solid #fa006a;padding:0 .05rem;line-height:.36rem}.indexMore .content ul li .botMoney[data-v-edc1b5ae]{display:block;overflow:hidden;font-size:.2rem;color:#b2b2b2;font-style:normal;position:absolute;right:0;bottom:.1rem;z-index:222;width:100%;height:.48rem;padding-right:.24rem}.indexMore .content ul li .botMoney .goBuy[data-v-edc1b5ae]{display:block;width:1.2rem;height:.48rem;background:#fa006a;text-align:center;font-size:.3rem;color:#fff;line-height:.48rem;border-radius:.05rem;position:absolute;top:0;right:.12rem}.indexMore .content ul li .botMoney img[data-v-edc1b5ae]{display:inline-block;height:.48rem;width:.48rem;border-radius:50%}.indexMore .content ul li .botMoney img[data-v-edc1b5ae]:first-child{position:absolute;right:.12rem;top:0;z-index:200}.indexMore .content ul li .botMoney img[data-v-edc1b5ae]:nth-child(3){position:absolute;right:.58rem;top:0;z-index:206}.indexMore .content ul li .botMoney img[data-v-edc1b5ae]:nth-child(2){position:absolute;right:.36rem;top:0;z-index:202}.indexMore .goFortop[data-v-edc1b5ae]{position:fixed;bottom:.6rem;right:.6rem;z-index:333}.indexMore .goFortop img[data-v-edc1b5ae]{display:block;width:.6rem;height:.6rem}",""])},1455:function(e,t,o){var i=o(1119);"string"==typeof i&&(i=[[e.id,i,""]]);o(5)(i,{});i.locals&&(e.exports=i.locals)},1569:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"indexMore"},[o("Linking"),e._v(" "),o("div",{staticClass:"topmodel"},[o("div",{staticClass:"atuoPage"},[o("ul",{staticClass:"list",class:{listSpecial:1==e.showFive}},e._l(e.imgObj.togetherCateries,function(t,i){return o("li",{directives:[{name:"show",rawName:"v-show",value:2!=t.type,expression:"itemSon.type!=2"}],staticClass:"listItem",class:{specialList:t.togetherCategoryId==e.togetherCategoryId},on:{click:function(o){e.getDetailNex(i,t.togetherCategoryId)}}},[e._v(e._s(t.name))])}))]),e._v(" "),o("div",{staticClass:"score"},[o("p",{staticClass:"scoreL",class:{scoreS:1==e.sort},on:{click:e.lowPrice}},[e._v("价格从低到高\n\t\t\t\t"),o("img",{directives:[{name:"show",rawName:"v-show",value:1==e.sort,expression:"sort==1"}],attrs:{src:e.gofotopImg}}),e._v(" "),o("img",{directives:[{name:"show",rawName:"v-show",value:2==e.sort,expression:"sort==2"}],attrs:{src:e.shangupImg}})]),e._v(" "),o("p",{staticClass:"scoreR",class:{scoreS:2==e.sort},on:{click:e.higPrice}},[e._v("价格从高到低\n\t\t\t\t\n\t\t\t\t"),o("img",{directives:[{name:"show",rawName:"v-show",value:1==e.sort,expression:"sort==1"}],attrs:{src:e.godownImg}}),e._v(" "),o("img",{directives:[{name:"show",rawName:"v-show",value:2==e.sort,expression:"sort==2"}],attrs:{src:e.xiaupImg}})])])]),e._v(" "),o("div",{staticClass:"content"},[o("ul",[e._l(e.curObj,function(t){return o("li",{on:{click:function(o){e.goBuy(t.togetherId)}}},[o("p",{staticClass:"imgTage"},[o("img",{directives:[{name:"show",rawName:"v-show",value:2!=t.togetherTagType,expression:"item.togetherTagType!=2"}],attrs:{src:t.tagLogo}})]),e._v(" "),o("p",{staticClass:"imgDetail"},[o("img",{attrs:{src:t.productImage}})]),o("p",{staticClass:"specialZhe"}),e._v(" "),o("p"),e._v(" "),o("p",{staticClass:"top"},[o("span",{directives:[{name:"show",rawName:"v-show",value:""!=t.tagName&&1!=t.togetherTagType,expression:"item.tagName!='' && item.togetherTagType!=1"}],staticStyle:{"font-size":".20rem","margin-right":".10rem"}},[e._v(e._s(t.tagName))]),e._v(e._s(t.productName))]),e._v(" "),o("p",{staticStyle:{"font-size":".30rem",color:"#fa006a","font-weight":"700"}},[e._v("￥"+e._s(t.price)+"\n\t\t\t\t\t"),o("span",{directives:[{name:"show",rawName:"v-show",value:t.count>0,expression:"item.count>0"}],staticStyle:{color:"#b3b3b3","font-size":".24rem","font-weight":"normal"}},[e._v("已拼"+e._s(t.count)+"件")])]),e._v(" "),o("p",{staticClass:"botMoney"},e._l(t.joinMembers,function(e){return o("img",{directives:[{name:"show",rawName:"v-show",value:t.joinMembers.length>0,expression:"item.joinMembers.length>0"}],attrs:{src:e.memberLogo}})}))])}),e._v(" "),o("li",{directives:[{name:"show",rawName:"v-show",value:e.showTrue,expression:"showTrue"}],staticClass:"special"},[e._v("没有更多了")])],2)])],1)},staticRenderFns:[]}}});