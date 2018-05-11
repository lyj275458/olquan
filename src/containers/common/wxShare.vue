<template>
	<div class="onlyWxopen">
		<input type="date" style="width: 4rem;height: 1rem;line-height: 1rem; font-size: .28rem; border: 0;outline: 0; -webkit-appearance: none; display: block;" />
	<!--wgs84 gps转百度 http://api.map.baidu.com/geoconv/v1/?coords=120.24945,30.311949&from=1&to=5&ak=tT65aZpLojRgwTvRFkCkZN8y -->
		微信分享测试
		定位wgs84的gps坐标:<br>
		纬度:{{loactionObj.latitude}}经度:{{loactionObj.longitude}}
	</div>
</template>

<script>

  export default {
    data() {
      return {
      	loactionObj:{
      		latitude:'',//纬度
      		longitude:'',//经度

      	},  	
		shareData : {
			'title': "",
			'description': "iphone7 Plus、电影券和千万红包等大奖给你送来了！",
			'url': "",
			'picURL': "",
			'hide':false,
		},//分享的数据
      };
    },
    
	created: function() {
		this.$store.commit('documentTitle','微信打开');
		//window.location.href="/?h=1&v=4"
		//window.shareData = this.shareData;
//		console.log(this.loactionObj)
		
	},
	mounted: function() {
		
			this.addWeixinShare();//微信分享 	
		
	},
	components: {
	  
	},
    methods: {
    	addWeixinShare:function(){
			var data = {                 
				"url":location.href,
				"callback":'',
            };
            this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,data,this.shareBack,this);			
		},
		
        //微信分享 
		shareBack:function(data){
			//调用共用的分享接口
			//this.wxShareFun(data,this.shareData);
			this.locationWx(data.result,this.shareData);

		},
//
		locationWx:function(wconfig,data){
			let _this = this;

			 wx.config({
		        debug: true,
		        appId: wconfig.appId,
		          timestamp: wconfig.timestamp,
		          nonceStr: wconfig.noncestr,
		          signature: wconfig.sign,
		        jsApiList: [
		          'checkJsApi',
		          'chooseImage',
		          'previewImage',
		          'uploadImage',
		          'downloadImage',
		          'onMenuShareTimeline',
		          'onMenuShareAppMessage',
		          'onMenuShareQQ',
		          'getLocation',
		        ]
		      }); 
		      wx.ready(function() {
		                //位置
//		                wx.getLocation({  
//		                	
//		                   type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'  
//		                   success: function (res) { 
//		
//		                       _this.loactionObj.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90  
//		                       _this.loactionObj.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。  
//		                       var speed = res.speed; // 速度，以米/每秒计  
//		                       var accuracy = res.accuracy; // 位置精度  
//		
//		                   }  
//		                });  
		                wx.onMenuShareTimeline({
		                    title: data.title, // 分享标题
		                    link: data.url, // 分享链接
		                    imgUrl: data.picURL, // 分享图标
		                    success: function() {
		                        // 用户确认分享后执行的回调函数
		                        this.$toast('分享成功')
		                    },
		                    cancel: function() {
		                        // 用户取消分享后执行的回调函数
		                    }
		                });
		
		                wx.onMenuShareAppMessage({
		                    title: data.title, // 分享标题
		                    desc: data.description, // 分享描述
		                    link: data.url, // 分享链接
		                    imgUrl: data.picURL, // 分享图标
		                    type: '', // 分享类型,music、video或link，不填默认为link
		                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		                    success: function() {
		                        // 用户确认分享后执行的回调函数
		                        // setShareCount()
		                    },
		                    cancel: function() {
		                        // 用户取消分享后执行的回调函数
		                    },
		                    fail:function(){
		                    },
		                    trigger:function(){
		                    }
		                });
		
		                wx.onMenuShareQQ({
		                    title: data.title, // 分享标题
		                    desc: data.description, // 分享描述
		                    link: data.url, // 分享链接
		                    imgUrl: data.picURL, // 分享图标
		                    success: function() {
		                        // 用户确认分享后执行的回调函数
		                        // setShareCount()
		                    },
		                    cancel: function() {
		                        // 用户取消分享后执行的回调函数
		                    }
		                });
		            });
				},
			

    }
  };
</script>

<style lang="scss" scoped>
	.onlyWxopen{font-size: .26rem;padding-top: 1.6rem;text-align: center;}
</style>