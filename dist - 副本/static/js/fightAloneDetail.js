webpackJsonp([15,44],{9:function(t,e,i){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function n(t,e){if(!/^javas/.test(t)&&t){var i="object"===("undefined"==typeof t?"undefined":(0,a.default)(t))||e&&"string"==typeof t&&!/http/.test(t);i?"object"===("undefined"==typeof t?"undefined":(0,a.default)(t))&&t.replace===!0?e.replace(t):"BACK"===t?e.go(-1):e.push(t):window.location.href=t}}function s(t,e){return!e||e._history||"string"!=typeof t||/http/.test(t)?t&&"object"!==("undefined"==typeof t?"undefined":(0,a.default)(t))?t:"javascript:void(0);":"#!"+t}Object.defineProperty(e,"__esModule",{value:!0});var r=i(16),a=o(r);e.go=n,e.getUrl=s},11:function(t,e){/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
"use strict";function i(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}function o(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},i=0;i<10;i++)e["_"+String.fromCharCode(i)]=i;var o=Object.getOwnPropertyNames(e).map(function(t){return e[t]});if("0123456789"!==o.join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(t){n[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(t){return!1}}var n=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable;t.exports=o()?Object.assign:function(t,e){for(var o,a,l=i(t),c=1;c<arguments.length;c++){o=Object(arguments[c]);for(var u in o)s.call(o,u)&&(l[u]=o[u]);if(n){a=n(o);for(var h=0;h<a.length;h++)r.call(o,a[h])&&(l[a[h]]=o[a[h]])}}return l}},14:function(t,e,i){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=i(12),s=o(n),r=i(15),a=o(r),l=i(9);e.default={name:"swiper",created:function(){this.index=this.value||0,this.index&&(this.current=this.index)},mounted:function(){var t=this;this.hasTwoLoopItem(),this.$nextTick(function(){t.list&&0===t.list.length||t.render(t.index),t.xheight=t.getHeight(),t.$emit("on-get-height",t.xheight)})},methods:{hasTwoLoopItem:function(){2===this.list.length&&this.loop?this.listTwoLoopItem=this.list:this.listTwoLoopItem=[]},clickListItem:function(t){(0,l.go)(t.url,this.$router),this.$emit("on-click-list-item",JSON.parse((0,s.default)(t)))},buildBackgroundUrl:function(t){return t.fallbackImg?"url("+t.img+"), url("+t.fallbackImg+")":"url("+t.img+")"},render:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.swiper&&this.swiper.destroy(),this.swiper=new a.default({container:this.$el,direction:this.direction,auto:this.auto,loop:this.loop,interval:this.interval,threshold:this.threshold,duration:this.duration,height:this.height||this._height,minMovingDistance:this.minMovingDistance,imgList:this.imgList}).on("swiped",function(e,i){t.current=i%t.length,t.index=i%t.length}),e>0&&this.swiper.go(e)},rerender:function(){var t=this;this.$el&&!this.hasRender&&(this.hasRender=!0,this.hasTwoLoopItem(),this.$nextTick(function(){t.index=t.value||0,t.current=t.value||0,t.length=t.list.length||t.$children.length,t.destroy(),t.render(t.value)}))},destroy:function(){this.hasRender=!1,this.swiper&&this.swiper.destroy()},getHeight:function(){var t=parseInt(this.height,10);return t?this.height:t?void 0:this.aspectRatio?this.$el.offsetWidth*this.aspectRatio+"px":"180px"}},props:{list:{type:Array,default:function(){return[]}},direction:{type:String,default:"horizontal"},showDots:{type:Boolean,default:!0},showDescMask:{type:Boolean,default:!0},dotsPosition:{type:String,default:"right"},dotsClass:String,auto:Boolean,loop:Boolean,interval:{type:Number,default:3e3},threshold:{type:Number,default:50},duration:{type:Number,default:300},height:{type:String,default:"auto"},aspectRatio:Number,minMovingDistance:{type:Number,default:0},value:{type:Number,default:0}},data:function(){return{hasRender:!1,current:this.index||0,xheight:"auto",length:this.list.length,index:0,listTwoLoopItem:[]}},watch:{auto:function(t){t?this.swiper&&this.swiper._auto():this.swiper&&this.swiper.stop()},list:function(t){this.rerender()},current:function(t){this.index=t,this.$emit("on-index-change",t)},index:function(t){var e=this;t!==this.current&&this.$nextTick(function(){e.swiper&&e.swiper.go(t)}),this.$emit("input",t)},value:function(t){this.index=t}},beforeDestroy:function(){this.destroy()}}},15:function(t,e,i){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=i(31),s=o(n),r=i(32),a=o(r),l=i(11),c=o(l),u=function(t){return Array.prototype.slice.call(t)},h=function(){function t(e){if((0,s.default)(this,t),this._default={container:".vux-swiper",item:".vux-swiper-item",direction:"vertical",activeClass:"active",threshold:50,duration:300,auto:!1,loop:!1,interval:3e3,height:"auto",minMovingDistance:0},this._options=(0,c.default)(this._default,e),this._options.height=this._options.height.replace("px",""),this._start={},this._move={},this._end={},this._eventHandlers={},this._prev=this._current=this._goto=0,this._width=this._height=this._distance=0,this._offset=[],this.$box=this._options.container,this.$container=this._options.container.querySelector(".vux-swiper"),this.$items=this.$container.querySelectorAll(this._options.item),this.count=this.$items.length,this.realCount=this.$items.length,this._position=[],this._firstItemIndex=0,this.count)return this._init(),this._auto(),this._bind(),this._onResize(),this}return(0,a.default)(t,[{key:"_auto",value:function(){var t=this;t.stop(),t._options.auto&&(t.timer=setTimeout(function(){t.next()},t._options.interval))}},{key:"updateItemWidth",value:function(){this._width=this.$box.offsetWidth||document.documentElement.offsetWidth,this._distance="horizontal"===this._options.direction?this._width:this._height}},{key:"stop",value:function(){this.timer&&clearTimeout(this.timer)}},{key:"_loop",value:function(){return this._options.loop&&this.realCount>=3}},{key:"_onResize",value:function(){var t=this;this.resizeHandler=function(){setTimeout(function(){t.updateItemWidth(),t._setOffset(),t._setTransform()},100)},window.addEventListener("orientationchange",this.resizeHandler,!1)}},{key:"_init",value:function(){this._height="auto"===this._options.height?"auto":this._options.height-0,this.updateItemWidth(),this._initPosition(),this._activate(this._current),this._setOffset(),this._setTransform(),this._loop()&&this._loopRender()}},{key:"_initPosition",value:function(){for(var t=0;t<this.realCount;t++)this._position.push(t)}},{key:"_movePosition",value:function(t){var e=this;if(t>0){var i=e._position.splice(0,1);e._position.push(i[0])}else if(t<0){var o=e._position.pop();e._position.unshift(o)}}},{key:"_setOffset",value:function(){var t=this,e=t._position.indexOf(t._current);t._offset=[],u(t.$items).forEach(function(i,o){t._offset.push((o-e)*t._distance)})}},{key:"_setTransition",value:function(t){t=t||this._options.duration||"none";var e="none"===t?"none":t+"ms";u(this.$items).forEach(function(t,i){t.style.webkitTransition=e,t.style.transition=e})}},{key:"_setTransform",value:function(t){var e=this;t=t||0,u(e.$items).forEach(function(i,o){var n=e._offset[o]+t,s="translate3d("+n+"px, 0, 0)";"vertical"===e._options.direction&&(s="translate3d(0, "+n+"px, 0)"),i.style.webkitTransform=s,i.style.transform=s})}},{key:"_bind",value:function(){var t=this,e=this;e.touchstartHandler=function(t){e.stop(),e._start.x=t.changedTouches[0].pageX,e._start.y=t.changedTouches[0].pageY,e._setTransition("none")},e.touchmoveHandler=function(i){if(1!==e.count){e._move.x=i.changedTouches[0].pageX,e._move.y=i.changedTouches[0].pageY;var o=e._move.x-e._start.x,n=e._move.y-e._start.y,s=n,r=Math.abs(o)>Math.abs(n);"horizontal"===e._options.direction&&r&&(s=o),t._options.loop||t._current!==t.count-1&&0!==t._current||(s/=3),(e._options.minMovingDistance&&Math.abs(s)>=e._options.minMovingDistance||!e._options.minMovingDistance)&&r&&e._setTransform(s),r&&i.preventDefault()}},e.touchendHandler=function(t){if(1!==e.count){e._end.x=t.changedTouches[0].pageX,e._end.y=t.changedTouches[0].pageY;var i=e._end.y-e._start.y;"horizontal"===e._options.direction&&(i=e._end.x-e._start.x),i=e.getDistance(i),0!==i&&e._options.minMovingDistance&&Math.abs(i)<e._options.minMovingDistance||(i>e._options.threshold?e.move(-1):i<-e._options.threshold?e.move(1):e.move(0),e._loopRender())}},e.transitionEndHandler=function(t){e._activate(e._current);var i=e._eventHandlers.swiped;i&&i.apply(e,[e._prev%e.count,e._current%e.count]),e._auto(),e._loopRender(),t.preventDefault()},e.$container.addEventListener("touchstart",e.touchstartHandler,!1),e.$container.addEventListener("touchmove",e.touchmoveHandler,!1),e.$container.addEventListener("touchend",e.touchendHandler,!1),e.$items[1]&&e.$items[1].addEventListener("webkitTransitionEnd",e.transitionEndHandler,!1)}},{key:"_loopRender",value:function(){var t=this;t._loop()&&(0===t._offset[t._offset.length-1]?(t.$container.appendChild(t.$items[0]),t._loopEvent(1)):0===t._offset[0]&&(t.$container.insertBefore(t.$items[t.$items.length-1],t.$container.firstChild),t._loopEvent(-1)))}},{key:"_loopEvent",value:function(t){var e=this;e._itemDestoy(),e.$items=e.$container.querySelectorAll(e._options.item),e.$items[1]&&e.$items[1].addEventListener("webkitTransitionEnd",e.transitionEndHandler,!1),e._movePosition(t),e._setOffset(),e._setTransform()}},{key:"getDistance",value:function(t){return this._loop()?t:t>0&&0===this._current?0:t<0&&this._current===this.realCount-1?0:t}},{key:"_moveIndex",value:function(t){0!==t&&(this._prev=this._current,this._current+=this.realCount,this._current+=t,this._current%=this.realCount)}},{key:"_activate",value:function(t){var e=this._options.activeClass;Array.prototype.forEach.call(this.$items,function(i,o){i.classList.remove(e),t===Number(i.dataset.index)&&i.classList.add(e)})}},{key:"go",value:function(t){var e=this;return e.stop(),t=t||0,t+=this.realCount,t%=this.realCount,t=this._position.indexOf(t)-this._position.indexOf(this._current),e._moveIndex(t),e._setOffset(),e._setTransition(),e._setTransform(),e._auto(),this}},{key:"next",value:function(){return this.move(1),this}},{key:"move",value:function(t){return this.go(this._current+t),this}},{key:"on",value:function(t,e){return this._eventHandlers[t]&&console.error("[swiper] event "+t+" is already register"),"function"!=typeof e&&console.error("[swiper] parameter callback must be a function"),this._eventHandlers[t]=e,this}},{key:"_itemDestoy",value:function(){var t=this;this.$items.length&&u(this.$items).forEach(function(e){e.removeEventListener("webkitTransitionEnd",t.transitionEndHandler,!1)})}},{key:"destroy",value:function(){if(this.stop(),this._current=0,this._setTransform(0),window.removeEventListener("orientationchange",this.resizeHandler,!1),this.$container.removeEventListener("touchstart",this.touchstartHandler,!1),this.$container.removeEventListener("touchmove",this.touchmoveHandler,!1),this.$container.removeEventListener("touchend",this.touchendHandler,!1),this._itemDestoy(),this._options.loop&&2===this.count){var t=this.$container.querySelector(this._options.item+"-clone");t&&this.$container.removeChild(t),t=this.$container.querySelector(this._options.item+"-clone"),t&&this.$container.removeChild(t)}}}]),t}();e.default=h},20:function(t,e,i){e=t.exports=i(3)(),e.push([t.id,".vux-slider{overflow:hidden;position:relative}.vux-slider .vux-indicator-right,.vux-slider>.vux-indicator{position:absolute;right:15px;bottom:10px}.vux-slider .vux-indicator-right>a,.vux-slider>.vux-indicator>a{float:left;margin-left:6px}.vux-slider .vux-indicator-right>a>.vux-icon-dot,.vux-slider>.vux-indicator>a>.vux-icon-dot{display:inline-block;vertical-align:middle;width:6px;height:6px;border-radius:3px;background-color:#d0cdd1}.vux-slider .vux-indicator-right>a>.vux-icon-dot.active,.vux-slider>.vux-indicator>a>.vux-icon-dot.active{background-color:#04be02}.vux-slider>.vux-indicator-center{right:50%;transform:translateX(50%)}.vux-slider>.vux-indicator-left{left:15px;right:auto}.vux-slider>.vux-swiper{overflow:hidden;position:relative}.vux-slider>.vux-swiper>.vux-swiper-item{position:absolute;top:0;left:0;width:100%;height:100%}.vux-slider>.vux-swiper>.vux-swiper-item>a{display:block;width:100%;height:100%}.vux-slider>.vux-swiper>.vux-swiper-item>a>.vux-img{display:block;width:100%;height:100%;background:50% no-repeat;background-size:cover}.vux-slider>.vux-swiper>.vux-swiper-item>a>.vux-swiper-desc{position:absolute;left:0;right:0;bottom:0;height:1.4em;font-size:16px;padding:20px 50px 12px 13px;margin:0;background-image:linear-gradient(180deg,transparent 0,rgba(0,0,0,.7));color:#fff;text-shadow:0 1px 0 rgba(0,0,0,.5);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}",""])},21:function(t,e,i){var o=i(20);"string"==typeof o&&(o=[[t.id,o,""]]);i(4)(o,{});o.locals&&(t.exports=o.locals)},22:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"vux-slider"},[i("div",{staticClass:"vux-swiper",style:{height:t.xheight}},[t._t("default"),t._v(" "),t._l(t.list,function(e,o){return i("div",{staticClass:"vux-swiper-item",attrs:{"data-index":o},on:{click:function(i){t.clickListItem(e)}}},[i("a",{attrs:{href:"javascript:"}},[i("div",{staticClass:"vux-img",style:{backgroundImage:t.buildBackgroundUrl(e)}}),t._v(" "),t.showDescMask?i("p",{staticClass:"vux-swiper-desc"},[t._v(t._s(e.title))]):t._e()])])}),t._v(" "),t._l(t.listTwoLoopItem,function(e,o){return t.listTwoLoopItem.length>0?i("div",{staticClass:"vux-swiper-item vux-swiper-item-clone",attrs:{"data-index":o},on:{click:function(i){t.clickListItem(e)}}},[i("a",{attrs:{href:"javascript:"}},[i("div",{staticClass:"vux-img",style:{backgroundImage:t.buildBackgroundUrl(e)}}),t._v(" "),t.showDescMask?i("p",{staticClass:"vux-swiper-desc"},[t._v(t._s(e.title))]):t._e()])]):t._e()})],2),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.showDots,expression:"showDots"}],class:[t.dotsClass,"vux-indicator","vux-indicator-"+t.dotsPosition]},t._l(t.length,function(e){return i("a",{attrs:{href:"javascript:"}},[i("i",{staticClass:"vux-icon-dot",class:{active:e-1===t.current}})])}))])},staticRenderFns:[]}},23:function(t,e,i){i(21);var o=i(2)(i(14),i(22),null,null);t.exports=o.exports},333:function(t,e,i){i(870);var o=i(2)(i(446),i(982),"data-v-5576b37e",null);t.exports=o.exports},446:function(t,e,i){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n,s=i(23),r=o(s);e.default={name:"b",data:function(){return{imgObj:{},urlList:[],curObj:{},pageObj:{page:1},isMore:!0,showTrue:!1,activity:0}},components:{Swiper:r.default},mounted:function(){window.addEventListener("scroll",this.handleScroll)},ready:function(){},created:function(){this.$store.commit("documentTitle","活动商品"),this.getList(),this.getImg({}),console.log(this.getCookie("memberId"))},methods:{handleScroll:function(){var t=document.body.scrollHeight;console.log(t),this.scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;var e=window.innerHeight;if(this.scrollTop+e>=t-200&&(console.log(21),this.isMore)){this.isMore=!1;var i={page:this.pageObj.page+1,rows:20,activityId:this.$route.query.activityId};this.pageObj.page=this.pageObj.page+1,this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.activityProductList,i,this.getListMoreBack)}},getListMoreBack:function(t){t.result.length<20?(this.isMore=!1,this.showTrue=!0):this.isMore=!0;for(var e=0;e<t.result.length;e++)this.curObj.push(t.result[e]);console.log(this.curObj)},getList:function(){var t={activityId:this.$route.query.activityId};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.activityProductList,t,this.getListBack)},getListBack:function(t){console.log("data"),this.curObj=t.result,console.log(this.curObj)},curUrlParam:function(t,e){console.log(123),console.log(e);var i=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),o=e.match(i);return null!=o?unescape(o[2]):null},loadMore:function(){var t=this;return!this.loading&&(this.loading=!0,void(n=setTimeout(function(){var e={page:t.pageObj.page+1};t.pageObj.page=t.pageObj.page+1,t.$store.state.ajaxObj.comAjax(t.$store.state.ajaxObj.API.getTogetherList,e,t.moreFun)},500)))},moreFun:function(t){console.log(t.result);for(var e=0;e<t.result.length;e++)this.curObj.push(t.result[e]);console.log(this.curObj),t.result.length<20&&(clearTimeout(n),this.showTrue=!0)},onSwiperItemIndexChange:function(t){console.log("demo item change",t)},getImg:function(){var t={id:this.$route.query.activityId};this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.activityImg,t,this.getImgBack)},getImgBack:function(t){this.imgObj=t.result.images,this.urlList=this.imgObj.map(function(t,e){return{url:"javascript:",img:t}}),console.log("data"),console.log(this.imgObj)},goBuy:function(t){console.log(t),window.location.href=USE_URL+"weixin/product/newProductDetail?productId="+t+"&memberId="+this.$route.query.memberId},goUrl:function(){this.$nextTick(function(){console.log(123)})}},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)}}},806:function(t,e,i){e=t.exports=i(3)(),e.push([t.id,"li[data-v-5576b37e]{font-size:.24rem}li img[data-v-5576b37e]{display:block;width:100%}.copyright[data-v-5576b37e]{font-size:12px;color:#ccc;text-align:center}.text-scroll[data-v-5576b37e]{border:1px solid #ddd;border-left:none;border-right:none}.text-scroll p[data-v-5576b37e]{font-size:12px;text-align:center;line-height:30px}.black[data-v-5576b37e]{background-color:#000}.title[data-v-5576b37e]{line-height:100px;text-align:center;color:#fff}.animated[data-v-5576b37e]{animation-duration:1s;animation-fill-mode:both}.vux-indicator.custom-bottom[data-v-5576b37e]{bottom:30px}@keyframes fadeInUp{0%{opacity:0;transform:translate3d(0,100%,0)}to{opacity:1;transform:none}}.fadeInUp[data-v-5576b37e]{animation-name:fadeInUp}.swiper-demo-img img[data-v-5576b37e]{width:100%}.cent[data-v-5576b37e]{padding:.2rem .12rem;background:#f2f2f2}.cent ul[data-v-5576b37e]{width:100%;display:flex;display:-ms-flexbox;display:-moz-flex;-ms-flex-pack:justify;justify-content:space-between;-moz-box-pack:space-between;-webkit--moz-box-pack:space-between;box-pack:space-between;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-flex-wrap:wrap;-webkit-box-lines:multiple;-moz-flex-wrap:wrap}.cent ul .special[data-v-5576b37e]{width:100%;height:.56rem;background:none;color:#9c9c9c;line-height:.56rem;text-align:center;font-size:.28rem}.cent ul li[data-v-5576b37e]{width:3.6rem;height:5.2rem;background:#fff;margin-bottom:.1rem;position:relative}.cent ul li img[data-v-5576b37e]{display:block;width:100%;height:3.59rem}.cent ul li .top[data-v-5576b37e]{font-weight:400;font-size:.24rem;color:#333;line-height:.3rem;padding:.08rem}.cent ul li .bot[data-v-5576b37e]{position:absolute;left:.08rem;bottom:.12rem;width:100%;overflow:hidden}.cent ul li .bot .left[data-v-5576b37e]{font-weight:400;font-size:.28rem;float:left;color:#e20630}.cent ul li .bot .left i[data-v-5576b37e]{font-size:.2rem;color:#b2b2b2;font-style:normal;text-decoration:line-through}.cent ul li .bot .right[data-v-5576b37e]{font-size:.2rem;color:#ff3893;float:right;text-align:center;width:1.18rem;height:.48rem;font-size:.26rem;line-height:.5rem;border:.01rem solid #ff3893;border-radius:.05rem;position:absolute;right:.24rem;bottom:.02rem}",""])},870:function(t,e,i){var o=i(806);"string"==typeof o&&(o=[[t.id,o,""]]);i(4)(o,{});o.locals&&(t.exports=o.locals)},982:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("swiper",{attrs:{loop:"",auto:"",list:t.urlList,height:"3.20rem","dots-position":"center"}}),t._v(" "),i("div",{staticClass:"cent"},[i("ul",{staticClass:"init"},[t._l(t.curObj,function(e){return i("li",{on:{click:function(i){t.goBuy(e.productId)}}},[i("img",{attrs:{src:e.image}}),t._v(" "),i("p",{staticClass:"top"},[t._v(t._s(e.title))]),t._v(" "),i("p",{staticClass:"bot"},[i("span",{staticClass:"left"},[i("b",[t._v("￥"+t._s(e.salePrice))]),i("br"),t._v(" "),i("i",[t._v("￥"+t._s(e.marketPrice))])]),t._v(" "),i("span",{staticClass:"right"},[t._v("去购买")])])])}),t._v(" "),i("li",{directives:[{name:"show",rawName:"v-show",value:t.showTrue,expression:"showTrue"}],staticClass:"special"},[t._v("没有更多了")])],2)])],1)},staticRenderFns:[]}}});