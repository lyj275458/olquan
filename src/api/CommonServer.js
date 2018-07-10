import $ from 'jquery';
//import reqwest from 'reqwest';
//require('es6-promise').polyfill();
// To add to window  
/*if (!window.Promise) {  
  window.Promise = Promise;  
  console.log('Promise')
};*/
import axios from 'axios';
//import Qs from 'qs'
import config from './config';
import Client from './client';
const co = require('co');
//接口地址
const API = {
			getTogetherList:'mobile/together/getTogetherList',//拼团产品列表
			getBestTogetherList:'mobile/together/getBestTogetherList',//获取销量10款最好的商品
      togetherJoinRecordList:'mobile/together/newTogetherJoinRecordList',//我参与的拼单
      togetherRecordDetail:'mobile/together/togetherRecordDetail',//拼团详情
      getTogetherBanners:'mobile/together/getTogetherBanners',//拼团轮播图
      getIndexTogetherList:'mobile/together/getIndexTogetherList',//拼团首页数据
      weixinShare:'mobile/weixin/js/sign',//分享接口
      activityProductList:'mobile/product/activity/activityProductList',//商品活动列表
      getNormal:'mobile/product/getNormal',//获取产品规格和库存
      activityImg:'mobile/product/activity/getById',//获取商品活动信息
      getByModelCode:'mobile/model/getByModelCode',//根据模板CODE获取页面数据
      findProductByContentId:'mobile/model/findProductByContentId',//根据contenId获取产品
      getMember:'mobile/member/getMember',//根据member获取用户信息
      getPlusRecommendData:'mobile/oneYuanBuy/getPlusRecommendData',//粉领特权推荐商品
      recommendProduct:'mobile/product/recommendProduct',//产品相关的推荐产品
      getStoreFee:'/mobile/store/getStoreFee',//开通粉领价格
      getScoreDataAll:'mobile/oneYuanBuy/getScoreDataAll',//试用中心
      getFreeUseTimes:'mobile/freeUse/getFreeUseTimes',//免费试用时间段
      getFreeUseData:'mobile/freeUse/getFreeUseData',//获取免费试用产品
      productDetail:'mobile/product/productDetail',//获取产品详情
      getNewTogetherBanners:'mobile/together/getNewTogetherBanners',//拼团活动页轮播及分类
      getTogetherCategoryDetail:'mobile/together/getTogetherCategoryDetail',//拼团分类详情
      doCollect:'mobile/collect/doCollect',//收藏
      cateGories:'mobile/freeUse/categories',//获取试用分类
      freeUseHomePage:'mobile/freeUse/freeUseHomePage',//获取试用详情
      limitTimeProducts:'mobile/together/limitTimeProducts',//获取限时秒杀
      addTogetherLimitRemind:'mobile/together/addTogetherLimitRemind',//添加限时秒杀提醒
      togetherProductDetail:'mobile/together/togetherProductDetail',//拼团产品详情
      productDetail:'mobile/product/productDetail',//产品详情
      getRandomTogetherRecord:'mobile/together/getRandomTogetherRecord',//获取前5条拼团信息
      getTwoCodeUrl:'mobile/product/getTwoCodeUrl',//获取产品二维码
      singleOrderPay:'mobile/together/singleOrderPay',//拼团立即支付
      memberAddresses:'mobile/hotselect/address/memberAddresses',//会员地址列表
      buyNowConfirmOrder:'mobile/order/buyNowConfirmOrder',//立即购买确认订单
      getActivityInfo:'mobile/coupon/getActivityInfo',//获取活动优惠券
      myCoupons:'mobile/coupon/myCoupons',//我的优惠券
      receiveCoupon:'mobile/coupon/receiveCoupon',//领取优惠券
      conponsByProduct:'mobile/coupon/conponsByProduct',//根据商品获取优惠券
      conponsByCar:'mobile/coupon/conponsByCar',//根据购物车获取优惠券
      getMemberCars:'mobile/carItem/getMemberCars',//获取购物车信息
      updateNum:'mobile/carItem/updateNum',//改变购物车产品数量
      deleteGoods:'mobile/carItem/delete',//删除购物车产品
      addProduct:'mobile/carItem/addProduct',//添加产品购物车
      totalNum:'mobile/carItem/totalNum',//获取购物车产品数量
      getCategory:'mobile/product/category/getCategory',//获取首页头部分类
      advers:'mobile/plus/advers',//新版粉领首页轮播和广告图
      recommendProduct:'mobile/plus/recommendProduct',//获取热门特卖
      timeProduct:'mobile/plus/timeProduct',//今日特卖和明日预告
      moreProduct:'mobile/plus/moreProduct',//获取更多特卖
      getDialog:'mobile/index/getDialog',//获取首页活动图片
      openDialog:'mobile/index/openDialog',//添加打开弹窗记录
      buyNowCreateOrder:'mobile/order/buyNowCreateOrder',//立即购买确认订单
      getFreeUseProducts:'mobile/freeUse/getFreeUseProducts',//根据类型获取试用产品数据
      freeUseNewHomePage:'mobile/freeUse/freeUseNewHomePage',//获取新版试用首页信息
      getFreeUseBannersAndAd:'mobile/freeUse/getFreeUseBannersAndAd',//获取新版试用轮播和banner
      getWholePointFreeUseTimes:'mobile/freeUse/getWholePointFreeUseTimes',//获取当天试用整点抢时间
      getWholePointFreeUseProducts:'mobile/freeUse/getWholePointFreeUseProducts',//获取整点抢试产品
      freeUseIndexImg:'mobile/freeUse/freeUseIndexImg',//获取试用展示图
      getAllCity:'mobile/city/getAllCity',//获取所有区县城市
      addAddress:'mobile/address/addAddress',//添加地址
      getAddress:'mobile/address/getAddress',//获取地址详情
      memberAddresses:'mobile/address/memberAddresses',//获取会员地址列表
      deleteAddress:'mobile/address/deleteAddress',//删除地址
      setDefaultAddress:'mobile/address/setDefaultAddress',//修改默认地址
      getGiftBag:'mobile/buySupervisor/getGiftBag',//礼包及文案信息
      newConfirmOrder:'mobile/buySupervisor/newConfirmOrder',//督导确认订单
      newCreateOrder:'mobile/buySupervisor/newCreateOrder',//加入钱江学院
      addRecord:'mobile/ir/addRecord',//添加浏览记录
      growData:'mobile/member/growData',//我的成长
      newGiftbags:'mobile/store/newGiftbags',//新粉领大礼包
      judgeMobile:'mobile/member/judgeMobile',//判定手机号存不存在
      sendCode:'mobile/code/sendCode2',//条形码
      applyToStoreConfirm:'mobile/store/applyToStoreConfirm',//升级粉领确认订单
      newApplyToStore:'mobile/store/newApplyToStore',//升级粉领订单
      orderCount:'mobile/order/orderCount',//订单统计
      openPayPassword:'mobile/member/openPayPassword',//开启/关闭支付保护
      update:'mobile/member/update',//修改基础会员信息
      updatePayPassword:'mobile/member/updatePayPassword',//修改支付密码
      newFinds:'mobile/find/finds',//发现
      boundMobile:'mobile/member/boundMobile',//绑定手机号
      canSubmitApply:'mobile/memberInvite/canSubmitApply',//判断是否可以提交申请督导
      submitApply:'mobile/memberInvite/submitApply',//提交申请总监邀请经理
      inviteRecords:'mobile/memberInvite/inviteRecords',//会员申请列表
      doAudit:'mobile/memberInvite/doAudit',//是否拒绝督导申请
};
function getCookie(argument) {
    var arrCookie = document.cookie.split(";");
    for (var i = 0; i < arrCookie.length; i++) {
      var arr = arrCookie[i].split("="); //从 = 的位置 分割每对cookie     
     
      if (arr[0].replace(/(^\s*)/g, "")==argument) { //如果前面是 userId 就是找到了
        return arr[1]; //将后面的值赋给 userId ，跳出循环                  
        break;
      }
    }
};
//签名方案
const comAjax=function(url,data,callBack,self){
//	console.log(data)
    //const client = new Client('30245434', 'd3b9d97961c1f954351a24626047d181');
      co(function* () {
        //var url = 'http://api.aaaa.com/postform';    
//      var result = yield client.post(API_HOST+url, {
//        headers: {
//          'Accept': 'application/json',
//          //'X-Ca-Stage' : 'TEST',
//          'Content-Type': 'application/x-www-form-urlencoded;',
//          'C-User-Ticket': getCookie('ticket')
//        },
//        data:data
//      });
          //console.log(result)

       $.ajax({
       type: "POST",
       url: API_HOST+url,
       data: data,
       dataType: "json",
//     headers:result,
       success: function(data){   
					//console.log(data)
					callBack(data);
//					if(data.code==-1){
////						this.$toast(data.message);
//						//alert(data.message)
//						console.log(123)
//					}else{
//						
//						 
//					}        
       },
       // error:function(){
            
       // },
       
   });
   
    return;
	});
}

export {
    API,
    comAjax
};