
const map = resolve => {
    require.ensure(['../containers/map.vue'], () => {
        resolve(require('../containers/map.vue'));
    }, 'map');
    
};

export default [
    //嵌套路由
    {
        path: '/map',
        component: map,
        name: '组件模块',
        
    },{//测试--
        path: '/fightAlone/detail',
        
        component: resolve => {
            require.ensure(['../containers/fightAlone/detail.vue'], () => {
                resolve(require('../containers/fightAlone/detail.vue'));
            }, 'fightAloneDetail');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
        
    },{//测试--
        path: '/activity/detail',
        
        component: resolve => {
            require.ensure(['../containers/activity/detail.vue'], () => {
                resolve(require('../containers/activity/detail.vue'));
            }, 'activitDetail');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//拼单--
        path: '/order/partake/id/:id',
        
        component: resolve => {
            require.ensure(['../containers/order/partake.vue'], () => {
                resolve(require('../containers/order/partake.vue'));
            }, 'orderPartake');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//拼单详情--
        path: '/order/detail/id/:id',
       
        component: resolve => {
            require.ensure(['../containers/order/detail.vue'], () => {
                resolve(require('../containers/order/detail.vue'));
            }, 'orderdDetail');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//我的订单--
        path: '/order/myOrder',
       
        component: resolve => {
            require.ensure(['../containers/order/myOrder.vue'], () => {
                resolve(require('../containers/order/myOrder.vue'));
            }, 'myOrder');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//我的拼团--
        path: '/fightAlone/mygoods',
        
        component: resolve => {
            require.ensure(['../containers/fightAlone/mygoods.vue'], () => {
                resolve(require('../containers/fightAlone/mygoods.vue'));
            }, 'fightMygoods');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//我的拼团--
        path: '/common/scroll',
       
        component: resolve => {
            require.ensure(['../containers/common/scroll.vue'], () => {
                resolve(require('../containers/common/scroll.vue'));
            }, 'commonScroll');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//我的拼团--
        path: '/demo/iscroll/id/:id',
       
        component: resolve => {
            require.ensure(['../containers/demo/iscroll.vue'], () => {
                resolve(require('../containers/demo/iscroll.vue'));
            }, 'demoiScroll');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//分享--
        path: '/fightAlone/share',
        
        component: resolve => {
            require.ensure(['../containers/fightAlone/share.vue'], () => {
                resolve(require('../containers/fightAlone/share.vue'));
            }, 'aloneShare');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//首页--
        path: '/index/index',
        
        component: resolve => {
            require.ensure(['../containers/index/index.vue'], () => {
                resolve(require('../containers/index/index.vue'));
            }, 'index');
        },
        meta: { keepAlive: true }
        
    },{//新版首页--
        path: '/index/newIndex',
        
        component: resolve => {
            require.ensure(['../containers/index/newIndex.vue'], () => {
                resolve(require('../containers/index/newIndex.vue'));
            }, 'newIndex');
        },
        meta: { keepAlive: true }
        
    },{//首页--
        path: '/goods/detail',
        
        component: resolve => {
            require.ensure(['../containers/goods/detail.vue'], () => {
                resolve(require('../containers/goods/detail.vue'));
            }, 'goodsDetail');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//分享--
        path: '/share/share',
        
        component: resolve => {
            require.ensure(['../containers/share/share.vue'], () => {
                resolve(require('../containers/share/share.vue'));
            }, 'sharePay');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//拼单--
        path: '/order/back',
        
        component: resolve => {
            require.ensure(['../containers/order/partake.vue'], () => {
                resolve(require('../containers/order/partake.vue'));
            }, 'orderPartake');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//分享测试
        path: '/common/wxShare',
        
        component: resolve => {
            require.ensure(['../containers/common/wxShare.vue'], () => {
                resolve(require('../containers/common/wxShare.vue'));
            }, 'commonShare');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//分享测试
        path: '/integral/uesget',
        
        component: resolve => {
            require.ensure(['../containers/integral/uesget.vue'], () => {
                resolve(require('../containers/integral/uesget.vue'));
            }, 'integral');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//会员分类
        path: '/mine/index',
        
        component: resolve => {
            require.ensure(['../containers/mine/index.vue'], () => {
                resolve(require('../containers/mine/index.vue'));
            }, 'mineIndex');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//会员分类
        path: '/safe/safety',
        
        component: resolve => {
            require.ensure(['../containers/safe/safety.vue'], () => {
                resolve(require('../containers/safe/safety.vue'));
            }, 'safetyIndex');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//规则
        path: '/rule/rule',
        
        component: resolve => {
            require.ensure(['../containers/rule/rule.vue'], () => {
                resolve(require('../containers/rule/rule.vue'));
            }, 'ruleDetail');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//试用
        path: '/try/center',
        
        component: resolve => {
            require.ensure(['../containers/try/center.vue'], () => {
                resolve(require('../containers/try/center.vue'));
            }, 'tryCenter');
        },
        meta: { keepAlive: true}
        
    },{//更多试用
        path: '/try/moretry',
        
        component: resolve => {
            require.ensure(['../containers/try/moretry.vue'], () => {
                resolve(require('../containers/try/moretry.vue'));
            }, 'tryMoretry');
        },
        meta: { keepAlive: true }
        
    },{//更多试用
        path: '/try/trygoods/id/:id',
        
        component: resolve => {
            require.ensure(['../containers/try/trygoods.vue'], () => {
                resolve(require('../containers/try/trygoods.vue'));
            }, 'tryGoods');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//拼团分类
        path: '/index/moreindex/id/:id',
        
        component: resolve => {
            require.ensure(['../containers/index/moreindex.vue'], () => {
                resolve(require('../containers/index/moreindex.vue'));
            }, 'indexMore');
        },
        meta: { keepAlive: true }
        
    },{//更多试用列表
        path: '/try/detailtry/id/:id',
       
        component: resolve => {
            require.ensure(['../containers/try/detailtry.vue'], () => {
                resolve(require('../containers/try/detailtry.vue'));
            }, 'detailTry');
        },
        meta: { keepAlive: true }
        
    },{//限时特卖
        path: '/index/hotsale',
        
        component: resolve => {
            require.ensure(['../containers/index/hotsale.vue'], () => {
                resolve(require('../containers/index/hotsale.vue'));
            }, 'hotSale');
        },
        meta: { keepAlive: true }
        
    },{//商品详情
        path: '/index/goodsDetali/id/:id',
        
        component: resolve => {
            require.ensure(['../containers/index/goodsDetali.vue'], () => {
                resolve(require('../containers/index/goodsDetali.vue'));
            }, 'goodsDetali');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//试用说明
        path: '/rule/trydetail',
       
        component: resolve => {
            require.ensure(['../containers/rule/trydetail.vue'], () => {
                resolve(require('../containers/rule/trydetail.vue'));
            }, 'tryExplain');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
    },{//新版活动页面
        path: '/activity/newact',
        
        component: resolve => {
            require.ensure(['../containers/activity/newact.vue'], () => {
                resolve(require('../containers/activity/newact.vue'));
            }, 'newAct');
        },
        meta: {
		  keepAlive: true // 不需要缓存
		}
        
    },{//立即支付--
        path: '/fightAlone/ordersure/id/:id',
        
        component: resolve => {
            require.ensure(['../containers/fightAlone/ordersure.vue'], () => {
                resolve(require('../containers/fightAlone/ordersure.vue'));
            }, 'orderSure');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
        
    },{//找人代付--
        path: '/fightAlone/otherpay/id/:id',
        
        component: resolve => {
            require.ensure(['../containers/fightAlone/otherpay.vue'], () => {
                resolve(require('../containers/fightAlone/otherpay.vue'));
            }, 'otherPay');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
        
    },{//确认订单--
        path: '/payMain/payorder',
        
        component: resolve => {
            require.ensure(['../containers/payMain/payorder.vue'], () => {
                resolve(require('../containers/payMain/payorder.vue'));
            }, 'payOrder');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
        
    },{//确认订单--
        path: '/payMain/address',
        
        component: resolve => {
            require.ensure(['../containers/payMain/address.vue'], () => {
                resolve(require('../containers/payMain/address.vue'));
            }, 'payAddress');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
        
    },{//我的优惠券--
        path: '/coupon/mycoupon',
        
        component: resolve => {
            require.ensure(['../containers/coupon/mycoupon.vue'], () => {
                resolve(require('../containers/coupon/mycoupon.vue'));
            }, 'myCoupon');
        },
        meta: {
		  keepAlive: true // 需要缓存
		}
        
        
    },{//领券中心--
        path: '/coupon/getcoupon/id/:id',
        
        component: resolve => {
            require.ensure(['../containers/coupon/getcoupon.vue'], () => {
                resolve(require('../containers/coupon/getcoupon.vue'));
            }, 'getCoupon');
        },
        meta: {
		  keepAlive: false // 需要缓存
		}
        
        
    },{//购物车--
        path: '/shopcar/ordercar',
        
        component: resolve => {
            require.ensure(['../containers/shopcar/ordercar.vue'], () => {
                resolve(require('../containers/shopcar/ordercar.vue'));
            }, 'orderCar');
        },
        meta: {
		  keepAlive: true // 需要缓存
		}
        
        
    },{//新版粉领首页--
        path: '/index/pinkIndex',
        
        component: resolve => {
            require.ensure(['../containers/index/pinkIndex.vue'], () => {
                resolve(require('../containers/index/pinkIndex.vue'));
            }, 'pinkIndex');
        },
        meta: {
		  keepAlive: true // 需要缓存
		}
        
        
    },{//新版试用
        path: '/try/newCenter',
        
        component: resolve => {
            require.ensure(['../containers/try/newCenter.vue'], () => {
                resolve(require('../containers/try/newCenter.vue'));
            }, 'tryNewCenter');
        },
        meta: { keepAlive: true}
        
    },{//新版试用各种试
        path: '/try/severalTry/id/:id',
        
        component: resolve => {
            require.ensure(['../containers/try/severalTry.vue'], () => {
                resolve(require('../containers/try/severalTry.vue'));
            }, 'trySeveralTry');
        },
        meta: { keepAlive: true}
        
    },{//新版试用整点试
        path: '/try/pointTry',
        
        component: resolve => {
            require.ensure(['../containers/try/pointTry.vue'], () => {
                resolve(require('../containers/try/pointTry.vue'));
            }, 'tryPointTry');
        },
        meta: { keepAlive: true}
        
    },{//新版试用整点试
        path: '/add/addAdress',
        
        component: resolve => {
            require.ensure(['../containers/add/addAdress.vue'], () => {
                resolve(require('../containers/add/addAdress.vue'));
            }, 'addAdress');
        },
        meta: { keepAlive: false}
        
    },{//立即支付--
        path: '/fightAlone/ordersure/ordersure/id/:id',
        
        component: resolve => {
            require.ensure(['../containers/fightAlone/ordersure/ordersure.vue'], () => {
                resolve(require('../containers/fightAlone/ordersure/ordersure.vue'));
            }, 'orderSureNer');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
        
    },{//立即支付--
        path: '/fightAlone/ordersure/payorder',
        
        component: resolve => {
            require.ensure(['../containers/fightAlone/ordersure/payorder.vue'], () => {
                resolve(require('../containers/fightAlone/ordersure/payorder.vue'));
            }, 'newPayorder');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
        
    },{//升级督导--
        path: '/supervisor/buySuper',
        
        component: resolve => {
            require.ensure(['../containers/supervisor/buySuper.vue'], () => {
                resolve(require('../containers/supervisor/buySuper.vue'));
            }, 'buySuper');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
        
    },{//督导确认订单--
        path: '/fightAlone/ordersure/superorder',
        
        component: resolve => {
            require.ensure(['../containers/fightAlone/ordersure/superorder.vue'], () => {
                resolve(require('../containers/fightAlone/ordersure/superorder.vue'));
            }, 'superOrder');
        },
        meta: {
		  keepAlive: false // 不需要缓存
		}
        
        
    },{
        path: '*',
        component: map
    }
]
