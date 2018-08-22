<template>
	<div id='zero'>
  		<div class="bot" @click="addNew()">增加新地址</div>
	    <ul>
	   		<li v-for="(item , index) in adressList">
	   			<div @click="chooseAddressId(item.id)">
	   				<div class="topActive">
		   				<p>{{item.name}}</p>
		   				<p>{{item.mobile}}</p>
		   			</div>
		   			<div class="centerActive">{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.address}}</div>
	   			</div>
	   			
	   			<div class="bottomActive">
	   				<div @click="select()">
	   					<!--<mt-radio
						  v-model="value"
						  :options="['设为默认地址']">
						</mt-radio>-->
						<!--<input type="radio" v-model="value" />设置为默认地址-->
						<!--<span v-bind:class="{'active' : isTrue}" class="icon iconfont"></span>-->
						<div class="imgDiv" v-show="item.type==0" @click="chooseDefault(item.id,index)"><img :src="defaultFalse" /></div>
						<div class="imgDiv" v-show="item.type==1" @click="chooseDefault(item.id,index)"><img :src="defaultTrue"/></div>
						<span>设置为默认地址</span>
	   				</div>
	   				<div>
	   					<span @click="upData(item.id)"><i class="icon iconfont icon-icon-"></i>编辑</span>
	   					<span @click="deleteData(item.id,index)"><i class="icon iconfont icon-shanchu"></i>删除</span>
	   				</div>
	   			
	   			</div>
	   		</li>
	    </ul>
   		<div v-show="alertShow" class="alertShow"></div>
    	<div v-show="alertShow" class="ToSure">
	   	  	<p>确定要删除此收货地址么？</p>
	   	  	<p>
	   	  		<button @click="calTrue()">取消</button>
	   	  		<button @click="delAddress()">确定</button>
	   	  	</p>
	   	  </div>
  </div>
</template>

<script>
	import { XDialog, XButton, Group, XSwitch, TransferDomDirective as TransferDom } from 'vux'
	export default{
		data : function() {
			return{
		    	msg:'WeChat',
		    	show: false,
			    show2: false,
			    showToast: false,
			    showHideOnBlur: false,
			    showScrollBox: false,
			    showDialogStyle: false,
			    adressList:[],
			    Totitle:'newAdress',
			    defaultFalse:'/static/ol.png',
			    defaultTrue:'/static/selecrt.png',
			    value:true,
			    isTrue:false,
			    imgWhich:false,
			    alertShow:false,
			    chooseIndex:0,
			    chooseId:0,
			    defalutIndex:0,
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
		created: function() {
			this.$store.commit('documentTitle','收货地址管理');
			this.getMemAddress();
			this.addWeixinShare();
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
		methods:{
			getMemAddress(){
				let data = {
//					memberId:this.$route.query.memberId,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.memberAddresses,data,this.getMemAddressBack,this);
			},
			getMemAddressBack(data){
				this.adressList=data.result;
				//console.log(this.adressList)
			},
			select () {
		      this.imgWhich=!this.imgWhich
		    },
		    calTrue(){
		    	this.alertShow=false;
		    },
		    upData(id){
		    	if(this.$route.query.isBuyGoods){
		    		this.$router.push({path:'/add/addAdress?isBuyGoods='+this.$route.query.isBuyGoods+'&addressId='+id+'&isOverseasDirectMailProduct='+this.$route.query.isOverseasDirectMailProduct+'&isCrossBorderProduct='+this.$route.query.isCrossBorderProduct});
		    	}else if(this.$route.query.isPinkGoods){
		    		this.$router.push({path:'/add/addAdress?isPinkGoods='+this.$route.query.isPinkGoods+'&addressId='+id+'&isOverseasDirectMailProduct='+this.$route.query.isOverseasDirectMailProduct+'&isCrossBorderProduct='+this.$route.query.isCrossBorderProduct});
		    	}else if(this.$route.query.getSuper){
		    		this.$router.push({path:'/add/addAdress?getSuper='+this.$route.query.getSuper+'&addressId='+id});
		    	}else if(this.$route.query.getPink){
		    		this.$router.push({path:'/add/addAdress?getPink='+this.$route.query.getPink+'&addressId='+id});
		    	}else{
		    		this.$router.push({path:'/add/addAdress?addressId='+id});
		    	}
		    	
		    },
		    deleteData(id,index){
		    	this.alertShow=true;
		    	this.chooseIndex=index;
		    	this.chooseId=id;
		    },
		    addNew(){
		    	if(this.$route.query.isBuyGoods){
		    		this.$router.push({path:'/add/addAdress?isBuyGoods='+this.$route.query.isBuyGoods+'&isOverseasDirectMailProduct='+this.$route.query.isOverseasDirectMailProduct+'&isCrossBorderProduct='+this.$route.query.isCrossBorderProduct});
		    	}else if(this.$route.query.isPinkGoods){
		    		this.$router.push({path:'/add/addAdress?isPinkGoods='+this.$route.query.isBuyGoods+'&isOverseasDirectMailProduct='+this.$route.query.isOverseasDirectMailProduct+'&isCrossBorderProduct='+this.$route.query.isCrossBorderProduct});
		    	}else if(this.$route.query.getSuper){
		    		this.$router.push({path:'/add/addAdress?getSuper='+this.$route.query.getSuper});
		    	}else if(this.$route.query.getPink){
		    		this.$router.push({path:'/add/addAdress?getPink='+this.$route.query.getPink});
		    	}else{
		    		this.$router.push({path:'/add/addAdress'});
		    	}
		    	
		    },
		    //删除地址
		    delAddress(){
		    	let data = {
		    		addressId:this.chooseId
		    	}
		    	this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.deleteAddress,data,this.delAddressBack,this);
		    },
		    delAddressBack(data){
		    	this.alertShow=false;
		    	if(data.message=="success"){
		    		this.$toast('删除成功');
		    		this.adressList.splice(this.chooseIndex,1);
		    	}
		    	
		    },
		    //设置默认地址
		    chooseDefault(id,index){
		    	this.defalutIndex=index;
		    	let data = {
//		    		memberId:this.$route.query.memberId,
		    		addressId:id,
		    	}
		    	this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.setDefaultAddress,data,this.chooseDefaultBack,this);
		    },
		    chooseDefaultBack(data){
		    	for(let i=0;i<this.adressList.length;i++){
		    		this.adressList[i].type=0;
		    	}
		    	this.$set(this.adressList[this.defalutIndex],'type',1)
		    },
		    chooseAddressId(id){
		    	if(this.$route.query.isBuyGoods){
		    		window.location.href=CUR_URLBACK+'fightAlone/ordersure/payorder?addressId='+id;
		    		//this.$router.push({path:'/fightAlone/ordersure/payorder?addressId='+id});
		    	}else if(this.$route.query.isPinkGoods){
		    		window.location.href=CUR_URLBACK+'fightAlone/ordersure/payorderPink?addressId='+id;
		    	}else if(this.$route.query.getSuper){
		    		window.location.href=CUR_URLBACK+'fightAlone/ordersure/superorder?addressId='+id;
		    		//this.$router.push({path:'/fightAlone/ordersure/superorder?addressId='+id});
		    	}else if(this.$route.query.getPink){
		    		window.location.href=CUR_URLBACK+'fightAlone/ordersure/pinkorder?addressId='+id;
		    		//this.$router.push({path:'/fightAlone/ordersure/pinkorder?addressId='+id});
		    	}
		    },
		    //微信分享
			  addWeixinShare:function(){
				var data = {                 
					"url":location.href,
					"callback":'',
			    };
			   //console.log(location.href)
			    
			    this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.weixinShare,data,this.shareBack,this);			
			  },
			  shareBack:function(data){
	//		  	console.log("data")
	//		  	console.log(data)
				
		      	//console.log()
				//调用共用的分享接口
				//console.log(JSON.stringify(data.result))
				
				
				this.wxShareFun(data.result,this.shareData);
				
				
				//this.locationWx(data);
				
			  },
			
		}
	}
</script>

<style lang="scss" scoped>
	#zero{
		width: 100%;
		min-height: 100%;
		/*overflow-x: hidden;
		word-wrap : break-word;*/
		font-size: 0.32rem;
		.bot{
			background: #D23172;line-height: 0.88rem;text-align: center;width: 100%;color: #FFFFFF;border:none;
		}
		ul{
			font-size: 0.28rem;color: #333333;
			li{
				margin-bottom: 0.2rem;padding: 0.32rem 0.24rem 0 0.24rem;background: #FFFFFF;
			}
			.topActive{
				display: flex;justify-content: space-between;
				p:last-child{
					color: #999999;
				}
			}
			.centerActive{
				line-height:0.86rem ;font-size: 0.26rem;border-bottom: 1px solid #EBEBEB;
			}
			.bottomActive{
				display: flex;justify-content: space-between;font-size: 0.24rem;line-height: 0.66rem;
				.imgDiv{
					margin-right: 0.16rem;display: inline-block;vertical-align: middle;
					margin-top:-0.06rem;
					img{
						display: block;
					}
				}
				/*span{
			display: inline-block;width: 0.16rem;height: 0.16rem;border-radius: 50%;border: 1px solid #;
		}*/
		/*.active{
			background: url('../../static/selecrt.png') no-repeat center;
		}*/
		div:last-child i{
			font-size: 0.24rem;
			&:first-child{margin-right: 0.12rem;}
			&:last-child{
				margin: 0 0.12rem 0 0.2rem;
			}
		}
	}
}
.alertShow{
	position: fixed;width: 100%;height: 100%;background: #000000;opacity: 0.2;top: 0;z-index: 222;left: 0;
}
.ToSure{
		width: 4.9rem;position: fixed;top: 50%;left: 50%;margin-left: -2.45rem;text-align: center;margin-top: -0.9rem;
		color: #000000;background: #F9F9F9;-webkit-border-radius: 0.10rem;color: #000000;font-size: 0.28rem;font-weight: 600;
		z-index: 224;
		p:first-child{
			line-height: 1rem;border-bottom: 0.01rem solid #EBEBEB;
		}
		p:last-child{
			display: flex;justify-content: space-between;
			button{
				border: none;color: deepskyblue;background: none;flex: 1;line-height: 0.8rem;
				&:first-child{
					border-right: 1px solid #EBEBEB;
				}
			};
		}
	}
}
</style>