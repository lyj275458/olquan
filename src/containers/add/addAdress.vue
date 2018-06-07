<template>
   <div id='newAdree'>
	   	<group title="1"  label-width="5em" label-align="left">
	     	<x-input title="收货人" name="username" placeholder="请输入收货人姓名" is-type="china-name" v-model="userName"></x-input>
	       	<x-input title="手机号" name="mobile" placeholder="请输入收货人手机号" keyboard="number" is-type="china-mobile" v-model="userPhone"></x-input>
	    	<!--<x-address :raw-value="true" @on-hide="changeAdress" :title="title2" v-model="value2" raw-value :list="addressData" value-text-align="left"></x-address>
	     	<x-input title="详细地址" placeholder="请输入详细地址" v-model="userHome"></x-input>-->
	   	</group>
	   	<div class="chooseCityList">
	   		<div class="left">
	   			<p>省市区</p>
	   			
	   		</div>
	   		<div class="selectCity">
	   			<div class="chooseKuang">
	   				<select v-model="prov">
			   			<option value="0">请选择</option>
						<option v-for="option in arr" :value="option.id">
							{{ option.name }}
						</option>
					</select>
	   			</div>
	   			<div class="chooseKuang">
		   			<select v-model="city">
			   			<option value="0">请选择</option>
						<option v-for="option in cityList" :value="option.id">
							{{ option.name }}
						</option>
					</select>
		   		</div>
		   		<div class="chooseKuang">
		   			<select v-model="district">
						<option value="0">请选择</option>
						<option v-for="option in districtList" :value="option.id">
							{{ option.name }}
						</option>
					</select>
		   		</div>
				
				<!--<span style="display: block;font-size: .24rem;">Selected: {{ prov }} :{{city}}:{{district}}</span>  -->
		   	</div>
	   	</div>
	   	<group title="1"  label-width="5em" label-align="left">
	     	<x-input title="详细地址" placeholder="请输入详细地址" v-model="userHome"></x-input>
	   	</group>
	    <div class="weak">
	    	<img :src="weakUrl" alt="" />
	    	根据海关规定，购买跨境产品需要办理清关手续,请您如实填写以下信息,以保证您购买的产品顺利通过海关检查。
	    </div>
		<group title="1"  label-width="6em" label-align="left">
	       	<x-input title="身份证号码" name="mobile" placeholder="请输入身份证号码" is-type="cheackSfz" :max="18" v-model="userSFZ"></x-input>
	   	</group>
		<div class="uoLoadImg">
			<div>
				<p>上传国徽页照片</p>
				<div @click="getFaceImg">
					<img :src="ownImg" alt="" />
				</div>
			</div>
			<div>
				<p>上传人像页照片</p>
				<div @click="getBackImg">
					<img :src="ownImg2" alt="" />
				</div>
			</div>
		</div>
		<!--<div @click="select()" class="selected">
   					
					<div class="imgDiv"><img :src="imgUrl" alt="" /></div>
					<span>设置为默认地址</span>
   		</div>-->
   		<div class="button" @click="addAddress">
   			<p class="buttonList">确认</p>
   		</div>
   </div>
</template>
<script>
//import HeaderSub from '../publicSub/headerSub.vue'
import { XInput, XSwitch, TransferDomDirective as TransferDom } from 'vux'
import { Group, XAddress, ChinaAddressV4Data, XButton, Cell, Value2nameFilter as value2name } from 'vux'

export default {
	 directives: {
    TransferDom
  },
  name: 'zero',
  data () {
    return {
    	userPhone:'',
    	userName:'',
    	title2:'省市区',
    	value2:['','',''],
    	addressData:ChinaAddressV4Data,
    	userHome:'',
    	weakUrl:'/static/weakTo.png',
    	ownImg:'/static/zhen.png',
    	ownImg2:'/static/fan.png',
    	userSFZ:'',
    	imgWhich:false,
    	faceImg:'',
    	arr:[],
    	cityList:[],
    	districtList:[],
    	city:0,
    	cityId:0,
    	districtId:0,
    	prov:0,
    	district:0,
    	isChoose:1,
    	localId:'',
    	nationalNore:'',
    	nationalNback:'',
    	shareData : {
			'title': "",
			'description': "",
			'url': "",
			'picURL': "",
			'hide':true,
			'share':true,
			'close':true
		},
    }
  },
  components:{
    XButton,
    Group,
    XSwitch,
    XInput,
    XAddress
  },
    created: function() {
		this.$store.commit('documentTitle','收货地址管理');
		
		
		this.getAllCity();
		
		//console.log(this.$route.query.addressId)
		
//			this.getCate();
	},
  mounted(){
  	//this.$emit('to-App',this.title[0])
  	//console.log(this.addressData)
//	this.$http.get('/apis/weixin/js/sign',{
//		params:{url:'document.URL',"callback":''}
//	}).then((res) => {
//		console.log(res)
//	})
  },
  computed:{
  imgUrl(){
	  		if(!this.imgWhich){
	  			return '/static/ol.png'
	  		}else{
	  			return '/static/selecrt.png'
	  		}
	  	}
  	},
  	watch:{
  		prov(){
  			this.chooseCity();
			this.chooseDistrict();
			
  		},
  		city(){
  			this.chooseDistrict();
  			this.isChoose=1;
  			
  		},
  	},
  methods:{
  	updateCity(){
  		
  	},
  	cheackSfz(val){
  		if(val=='123'){
  			return {
  				valid:false, msg:"错误"
  			}
  		}
  	},
  	getAllCity(){
  		let data = {
  			
  		}
  		this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getAllCity,data,this.getAllCityBack,this);
  		
  	},
  	getAllCityBack(data){
//		console.log(data)
  		this.arr=data.result;
//		this.prov=this.arr[0].id;
  		this.chooseCity();
  		if(this.$route.query.addressId!=undefined){
			this.isChoose=0;
			this.getAddress();
		}
  		this.addWeixinShare();
  	},
  	chooseCity(){
  		for(let i=0;i<this.arr.length;i++){
  			if(this.prov==this.arr[i].id){
  				this.cityList=this.arr[i].childreList;
  				if(this.isChoose){
  					this.city=0;
  				}else{
  					this.city=this.cityId;
  				}
				
  				break;
  			}
  		}
  		//console.log(this.cityList)
  	},
  	chooseDistrict(){
		
  		for(let i=0;i<this.cityList.length;i++){
  			if(this.city==this.cityList[i].id){
  				this.districtList=this.cityList[i].childreList;
  				if(this.isChoose){
  					this.district=0;
  				}else{
  					this.district=this.districtId
  				}
				
  				
  			}
  			
  		}
  		
  		//console.log(this.districtList)
  	},
  	 select () {
      this.imgWhich=!this.imgWhich
    },
    changeAdress(val){
    	//console.log(this.value2)
    },
    //获取地址详情
    getAddress(){
    	let data = {
    		addressId:this.$route.query.addressId,
    	}
    	//console.log(data)
    	this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getAddress,data,this.getAddressBack,this);
    },
    getAddressBack(data){
    	this.prov=data.result.provinceId;
    	this.cityId=data.result.cityId;
//  	for(let i=0;i<this.arr.length;i++){
//			if(this.prov==this.arr[i].id){
//				this.cityList=this.arr[i].childreList;
//				this.city=data.result.cityId;
//				break;
//			}
//		}
//  	for(let i=0;i<this.cityList.length;i++){
//			if(this.city==this.cityList[i].id){
//				this.districtList=this.cityList[i].childreList;
//				this.district=data.result.districtId;
//				break;
//			}
//		}
		this.districtId=data.result.districtId;
    	this.userName=data.result.name;
    	this.userPhone=data.result.mobile;
    	this.userHome=data.result.address;
    	if(data.result.identityFrontImage!=null){
    		this.ownImg=data.result.identityFrontImage
    	}
    	if(data.result.identityOppImage!=null){
    		this.ownImg2=data.result.identityOppImage
    	}
    	
    },
    //添加地址
    addAddress(){
    	if(this.prov==0 || this.city==0 ||this.district==0 || this.userName=='' || this.userPhone=='' || this.userHome==''){
    		this.$toast('请填写完整地址');
    	}else{
    		let data ={
	    		addressId:this.$route.query.addressId,
	    		provinceId:this.prov,
	    		cityId:this.city,
	    		districtId:this.district,
	    		identityNo:this.userSFZ,
	    		name:this.userName,
	    		mobile:this.userPhone,
	    		uutype:1,
//	    		memberId:this.$route.query.memberId,
	    		address:this.userHome,
	    		frontServerId:this.nationalNore,
	    		oppServerId:this.nationalNback,
	    	}
    		//alert(this.nationalNore)
	    	this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.addAddress,data,this.addAddressBack,this);
    	}
    	
    },
    addAddressBack(data){
    	//console.log(data)
    	if(this.$route.query.isBuyGoods==1){
    		this.$router.push({path:'/fightAlone/ordersure/payorder?memberId='+this.$route.query.memberId+'&addressId='+data.result});
    	} else if(this.$route.query.getSuper==1){
    		this.$router.push({path:'/fightAlone/ordersure/superorder?memberId='+this.$route.query.memberId+'&addressId='+data.result});
    	}else if(this.$route.query.getPink==1){
    		this.$router.push({path:'/fightAlone/ordersure/pinkorder?memberId='+this.$route.query.memberId+'&addressId='+data.result});
    	}else{
    		this.$router.push({path:'/payMain/address?memberId='+this.$route.query.memberId});
    	}
    },
    //国徽面
    getFaceImg(){
    	let _this=this;
    	wx.ready(function() {
    		wx.chooseImage({
	            count: 1, // 默认9
	            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	            success: function (res) {
	                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
	              	_this.ownImg=localIds;
	              	_this.uploadImageUrl(_this.ownImg);
	            }
	        });
	        
    	});
    	
    	
    },
    uploadImageUrl(localId){
    	let _this=this;
    	
    	//alert(123)
    	wx.uploadImage({
			localId: localId.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
			isShowProgressTips: 1, // 默认为1，显示进度提示
			success: function (res) {
			var serverId = res.serverId; // 返回图片的服务器端ID
				_this.nationalNore=serverId;
				//alert(_this.nationalNore)
			},
			fail:function(res){
				//alert(JSON.stringify(res))
			}
		});
		
    },
    //人物面
    getBackImg(){
    	let _this=this;
    	wx.ready(function() {
    		wx.chooseImage({
	            count: 1, // 默认9
	            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	            success: function (res) {
	                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
	              	_this.ownImg2=localIds;
	              	_this.uploadImageBackUrl(_this.ownImg2);
	            }
	        });
	        
    	});
    },
    uploadImageBackUrl(localId){
    	let _this=this;
    	
    	//alert(123)
    	wx.uploadImage({
			localId: localId.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
			isShowProgressTips: 1, // 默认为1，显示进度提示
			success: function (res) {
			var serverId = res.serverId; // 返回图片的服务器端ID
				_this.nationalNback=serverId;
				//alert(_this.nationalNore)
			},
			fail:function(res){
				//alert(JSON.stringify(res))
			}
		});
		
    },
    //微信分享 
	addWeixinShare:function(){
		var data = {                 
			"url":location.href,
			"callback":'',
		};
	  // console.log(location.href)
	    
	    this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,data,this.shareBack,this);			
	},
	shareBack:function(data){
		//调用共用的分享接口
		//alert(JSON.stringify(this.shareData))
//		console.log(this.shareData)
		//console.log(JSON.stringify(data.result))
		this.getImgSrc(data.result);
		//this.locationWx(data);
	},
	getImgSrc(wconfig){
			 
	  //alert(JSON.stringify(data))
	  console.log(wconfig)
	  let _this = this;
			wx.config({
	        debug:false,
	        appId:wconfig.appId,
	        timestamp:wconfig.timestamp,
	        nonceStr:wconfig.noncestr,
	        signature:wconfig.sign,
	        jsApiList: [
	          'checkJsApi',
	          'chooseImage',
	          'previewImage',
	          'uploadImage',
	          'downloadImage',
	          'onMenuShareTimeline',
	          'onMenuShareAppMessage',
	//        'onMenuShareQQ',
	          'getLocation',
	          'hideMenuItems',
	          
	        ]
	      }); 
	     
	     
	  
	
	},

  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
	#newAdree{
		.chooseCityList{
			border-top: 0.01rem solid #e1e1e1;
			display: flex;
			background:#fff;
			.left{
				width: 26%;
				line-height: .92rem;
				font-size: .34rem;
				p{
					padding-left: .30rem;
				}
			}
			.selectCity{
				display: flex;
				width: 74%;
				font-size: 0;
				justify-content:flex-start;
				.chooseKuang{
					width: 33%;
					margin-right: .10rem;
				}
			}
			select{
				flex: 1;
				width: 100%;
				height: .92rem;
				border: none;
			    appearance:none;
				-moz-appearance:none;
				-webkit-appearance:none;
				background: url("../../../static/images/selectarrow.png") no-repeat scroll right center transparent;
				padding-right: .28rem;
				/*outline: none;*/
				
			}
		}
		
	}
	#newAdree .weui-cells__title{
		display: none;
	}
	#newAdree .weak{
		font-size: 0.24rem;
		padding: 0.11rem 0.12rem 0.11rem 0.13rem;
		color: #999999;
		background: #F2F2F2;
		line-height: 0.32rem;
		img{
			display: inline-block;width: 0.24rem;height: 0.24rem;
			margin-top: -0.08rem;
			vertical-align: middle;
		}
	}
	#newAdree .uoLoadImg{
		display: flex;justify-content: space-between;
		padding: 0.12rem 0.70rem 0.40rem 0.70rem;
		font-size: 0.24rem;text-align: center;
		background:#FFFFFF;
		p{
			line-height: 0.84rem;
		}
		img{
			display: block;
			width:100%;
		}
		& > div{
			width: 2.68rem;
		}
	}
	#newAdree .selected{
		font-size: 0.24rem;padding:0.2rem 0.24rem;
		.imgDiv{
					margin-right: 0.16rem;display: inline-block;vertical-align: middle;
					margin-top:-0.04rem;
					img{
						display: block;
					}
				}
				}
	#newAdree .button{
		width: 95%;
		position: fixed;
		bottom: 0.32rem;
		left: 50%;
		margin-left: -47.5%;
		font-size: 0.32rem;
		color:#FFFFFF;
		text-align: center;
		
		.buttonList{
			font-size: .32rem;
			color: #fff;
			line-height: 1.04rem;width:100%;background:#D23172 ;border:none;
			
		}
	}
</style>
