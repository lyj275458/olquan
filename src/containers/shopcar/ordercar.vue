<template>
	<div class="myshoppingCar">
		
		<div class="carTop">
			购物车
			<p @click="deitGoods" v-show="isOneGoods==true">编辑全部</p>
			<p @click="wanchengGoods" v-show="isOneGoods==false">完成</p>
		</div>
		<div class="cardetail" v-for="(item,index) in cartList">
			<div class="agency" v-show="item.detailDtos.length>0">
				<div class="angecy-l">
					<img :src="nochoseImg" v-show="item.selectM==false" @click="chooseShop(index)"/>
					<img :src="checkedImg" v-show="item.selectM==true" @click="chooseShop(index)"/>
					<span>{{item.sellerName}}</span>
				</div>
				<div class="angecy-r">
					<span @click="getCoupon(item.sellerId)" v-show="item.hasCoupon==1">领券</span>
					<span style="color: #8a8a8a;" v-show="item.addNum==false" @click="addgoodNum(index)">编辑</span>
					<span style="color: #8a8a8a;" v-show="item.addNum==true && isOneGoods" @click="removegoodNum(index)">完成</span>
				</div>
			</div>
			<div class="goodsDetail" v-for="(itemSon,indexSon) in item.detailDtos">
				<div class="goods">
					<div class="chooseGoods" @click="chooseGoos(index,indexSon)">
						<img :src="nochoseImg" v-show="itemSon.selectSon==false"/>
						<img :src="checkedImg" v-show="itemSon.selectSon==true"/>
					</div>
					<div style="overflow: hidden;" @click="getGoodsDetail(itemSon.productId)">
						<div class="goodsImg">
							<img :src='itemSon.productImage'/>
						</div>
						<div class="goodsName" v-show="item.addNum==false">
							<div style="overflow: hidden;">
								<div class="name">
									{{itemSon.productName}}
								</div>
								<div class="priceNum">
									<p>￥<span style="font-weight: 700;">{{itemSon.appPrice}}</span></p>
									<p style="color: #999;">x{{itemSon.num}}</p>
								</div>
							</div>
							<div class="normal">{{itemSon.normal}}</div>
						</div>
					</div>
					
				</div>
				<div class="changeNum" v-show="item.addNum==true">
					<div style="overflow: hidden;float: left;">
						<span class="del" @click="delgoodsNum(index,indexSon,itemSon.carId)">
							-
						</span>
						<span class="num">{{itemSon.num}}</span>
						<span class="add" @click="addgoodsNum(index,indexSon,itemSon.carId)">
							+
						</span>
					</div>
					<img :src="chaImg" v-show="isOneGoods" style="float: right; width: .30rem;height: .30rem;margin-top: .10rem;margin-right: .10rem;" @click="removeGoods(index,indexSon,itemSon.carId)"/>
				</div>
				
			</div>
		</div>
		<div class="countDetail">
			<div class="countLeft">
				<div class="cotl-l" @click="getAllgoods">
					<img :src="nochoseImg" v-show="chooseAll==false"/>
					<img :src="checkedImg" v-show="chooseAll==true"/>
					<span>全选</span>
				</div>
				<div class="cotl-r" v-show="isOneGoods">合计：￥{{finalPriceObj}}</div>
			</div>
			<div class="countRigth"  v-show="isOneGoods==true" @click="getMoney">结算({{chooseNum}})</div>
			<div class="countRigth"  v-show="isOneGoods==false" @click="allGoodsDel">删除</div>
		</div>
		<div class="getBottom">
			<div class="getIndex" @click="getIndex">
				<div class="top">
					<img :src="indexImg" />
				</div>
				<div class="bot">特卖</div>
			</div>
			<div class="getIndex" @click="getShangcheng">
				<div class="top">
					<img :src="find1Img" />
				</div>
				<div class="bot">分类</div>
			</div>
			<div class="getIndex">
				<div class="top">
					<img :src="cartImg" />
				</div>
				<div class="bot" style="color: #000;">购物车</div>
				<div class="cartNum" v-show="cartNum>0">{{cartNum}}</div>
			</div>
			<div class="getIndex" @click="getkefu">
				<div class="top">
					<img :src="serviceImg" />
				</div>
				<div class="bot">客服</div>
			</div>
			<div class="getIndex" @click="getMindIndex">
				<div class="top">
					<img :src="myImg" />
				</div>
				<div class="bot">我的</div>
			</div>
		</div>
		<!--优惠券弹窗-->
		<div class="pinFen" v-show="getCouponList || delGoods" @click="showFen"></div>
		<div class="sureDelgoods" v-show="delGoods">
			<p>你确定要删除该商品吗?</p>
			<div class="chooseDel">
				<span style="border-right: 0.01rem solid #e5e5e5;" @click="showFen">取消</span>
				<span style="color: #40AFFE;" @click="sureDelGoods" v-show="delOneGoods==true">确定</span>
				<span style="color: #40AFFE;" @click="delAllGoods" v-show="delOneGoods==false">确定</span>
			</div>
		</div>
		<div class="rule" style="height: 6.80rem;"  v-show="getCouponList">
			<div class="ruleDetail">
				<img class="closeRule" :src="colseImg" @click="showFen"/>
				<div class="topName couSpecial" style="border-bottom: 0.01rem solid #f2f2f2;">
					领取优惠券
				</div>
				<div class="step clear couSpecial">
					可领优惠券
				</div>
				<div style="padding: 0 .20rem; height: 5.00rem; overflow: auto;">
					<div class="coupon" v-for="(item,index) in couponObj" >
						<div class="couponDescribe">
							<div class="money"><span>￥</span>{{item.amount}}</div>
							<div class="describe">
								<div class="couponName">{{item.title}}</div>
								<div class="getCoupon">
									<span>剩余{{item.vaildNum}}张</span>
									<p style="background: url(../../../static/images/havenone.png) no-repeat center;background-size:1.40rem .42rem ;" v-show="item.vaildNum==0 && item.receivedStatus==1">已领完</p>
									<p v-show="item.receivedStatus ==1 && item.vaildNum!=0" @click="getCouponId(item.couponId,index)">点击领取</p>
									<p style="background: url(../../../static/images/havenone.png) no-repeat center;background-size:1.40rem .42rem ;;" v-show="item.receivedStatus ==3 || item.receivedStatus ==2">已领取</p>
									
								</div>
							</div>
						</div>
						<div class="couponTime">
							有效期：{{item.startTime}} 至 {{item.endTime}}
						</div>
					</div>
				</div>
				
			</div>
		</div
		</div>
		
	</div>
</template>

<script>
	export default {
		data : function() {
			return{
				nochoseImg:'/static/images/nochose.png',
				colseImg:'/static/images/colse.png',
				goodsImg:'/static/images/goodsImg.png',
				checkedImg:'/static/images/checked.png',
				delImg:'/static/images/del.png',
				addImg:'/static/images/add.png',
				chaImg:'/static/images/sanchu.png',
				indexImg:'/static/images/icon-index.png',
				cartImg:'/static/images/icon-cart02.png',
				findImg:'/static/images/icon-find.png',
				serviceImg:'/static/images/icon-service.png',
				myImg:'/static/images/icon-my.png',
				find1Img:'/static/images/shangcheng.png',
				couponObj:[],
				getCouponList:false,
				delGoods:false,
				isOneGoods:true,
				chooseAll:false,
				delOneGoods:true,
				cartList:[],
				totalFee:0,
				finalPrice:0,
				ischooseAll:0,
				chooseNum:0,
				indexGoods:0,
				indexSonGoods:0,
				carIds:[],
				carIdOne:0,
				shareData : {
					'title': "",
					'description': "",
					'url': "",
					'picURL': "",
					'hide':true,
					'share':true
				},
				showMember:false,
				
			}
		},
		created: function() {
			this.$store.commit('documentTitle','购物车');
			this.getMemberCars();
			this.getMember();
		},
		components: {
			
		},
		watch:{
			chooseNum:function(val,oldval){
				for(let a=0;a<this.cartList.length;a++){
					//console.log(this.cartList[a])
					if(this.cartList[a].selectM==false){
						this.chooseAll=false;
						return;
					}else{
						this.chooseAll=true;
					}
				}
			}
		},
		mounted(){
			this.addWeixinShare();
		},
		computed:{
			finalPriceObj(){
				if(this.totalFee<=0){
					this.totalFee=0;
				}
				return this.totalFee.toFixed(2);
			},
		},
		methods:{
			//获取会员信息
			getMember(){
				let data={
					//memberId:this.$route.query.memberId,
				}
				//console.log(data)
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMember,data,this.getMemberBack,this);
			},
			getMemberBack(data){
				if(data.result.isGetStoreCommission){
					this.showMember=true;
				}else{
					this.showMember=false;
				}
			},
			//获取购物车信息
			getMemberCars(){
				let data={
					//memberId:this.$route.query.memberId,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.getMemberCars,data,this.getMemberCarsBack,this);
			},
			getMemberCarsBack(data){
				for(let i=0;i<data.result.length;i++){
					this.$set(data.result[i],'selectM',false);
					this.$set(data.result[i],'addNum',false);
				}
				for(let i=0;i<data.result.length;i++){
					let _subCartList = data.result[i].detailDtos;
					for(let y=0;y<_subCartList.length;y++){
						_subCartList[y].selectSon=false;
					}
				}
				this.cartList=data.result;
				console.log(this.cartList)
			},
			//全选单个商家商品
			chooseShop(index){
				this.cartList[index].selectM=!this.cartList[index].selectM;
				if(this.cartList[index].selectM){
					for(let i=0;i<this.cartList[index].detailDtos.length;i++){
						//console.log(this.cartList[index].detailDtos[i].selectSon)
						if(this.cartList[index].detailDtos[i].selectSon){
							this.totalFee-=this.cartList[index].detailDtos[i].appPrice*this.cartList[index].detailDtos[i].num;
							this.chooseNum-=this.cartList[index].detailDtos[i].num;
						}
						this.cartList[index].detailDtos[i].selectSon=true;
						this.totalFee+=this.cartList[index].detailDtos[i].appPrice*this.cartList[index].detailDtos[i].num;
						this.chooseNum+=this.cartList[index].detailDtos[i].num;
						this.carIds.push(this.cartList[index].detailDtos[i].carId)
						this.carIds=[...new Set(this.carIds)];
						
					}
					
				}else{
					for(let i=0;i<this.cartList[index].detailDtos.length;i++){
						if(this.cartList[index].detailDtos[i].selectSon===false){
							this.totalFee+=this.cartList[index].detailDtos[i].appPrice*this.cartList[index].detailDtos[i].num;
							this.chooseNum+=this.cartList[index].detailDtos[i].num;
						}
						this.cartList[index].detailDtos[i].selectSon=false;
						this.totalFee-=this.cartList[index].detailDtos[i].appPrice*this.cartList[index].detailDtos[i].num;
						this.chooseNum-=this.cartList[index].detailDtos[i].num;
						for(let a=0;a<this.carIds.length;a++){
							if(this.cartList[index].detailDtos[i].carId==this.carIds[a]){
								this.carIds.splice(a,1)
							}
						}
					}
				}
				console.log(this.carIds)
			},
			//点击单个商品选中
			chooseGoos(index,indexSon){
				this.cartList[index].detailDtos[indexSon].selectSon=!this.cartList[index].detailDtos[indexSon].selectSon;
//				console.log(index,indexSon);
//				console.log(this.cartList[index].detailDtos[indexSon].carId)
				if(this.cartList[index].detailDtos[indexSon].selectSon){
					this.totalFee+=this.cartList[index].detailDtos[indexSon].appPrice*this.cartList[index].detailDtos[indexSon].num;
					this.chooseNum+=this.cartList[index].detailDtos[indexSon].num;
					this.carIds.push(this.cartList[index].detailDtos[indexSon].carId)
				}else{
					this.totalFee-=this.cartList[index].detailDtos[indexSon].appPrice*this.cartList[index].detailDtos[indexSon].num;
					this.chooseNum-=this.cartList[index].detailDtos[indexSon].num;
					for(let a=0;a<this.carIds.length;a++){
						if(this.cartList[index].detailDtos[indexSon].carId==this.carIds[a]){
							this.carIds.splice(a,1)
						}
					}
				}
				for(let i=0;i<this.cartList[index].detailDtos.length;i++){
					//console.log(this.cartList[index].detailDtos[i].selectSon)
					if(this.cartList[index].detailDtos[i].selectSon==false){
						this.cartList[index].selectM=false;
						return;
//						this.ischooseAll=1
					}else{
						this.cartList[index].selectM=true;
					}
				}
				//this.isChooseAll();
//				console.log(this.carIds)
			},
			isChooseAll(){
				for(let a=0;a<this.cartList.length;a++){
					if(this.cartList[a].selectM){
						this.chooseAll=true;
						console.log(1545)
					}else{
						console.log(1231)
						this.chooseAll=false
					}
				}
			},
			//点击单个编辑
			addgoodNum(index){
				console.log(1)
				this.cartList[index].addNum=true;
				this.$set(this.cartList[index],'addNum',true);
			},
			//点击完成
			removegoodNum(index){
				this.cartList[index].addNum=false;
				this.$set(this.cartList[index],'addNum',false);
			},
			//改变数量
			delgoodsNum(index,indexSon,carId){
				console.log(1)
				this.indexGoods=index;
				this.indexSonGoods=indexSon;
				this.cartList[index].detailDtos[indexSon].num-=1;
				if(this.cartList[index].detailDtos[indexSon].num<=0){
					this.cartList[index].detailDtos[indexSon].num=1;
				}else{
					let data={
						num:-1,
						carId:carId
					}
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.updateNum,data,this.delgoodsNumBack,this);
				}
			},
			delgoodsNumBack(){
				
				if(this.cartList[this.indexGoods].detailDtos[this.indexSonGoods].selectSon){
					this.totalFee-=this.cartList[this.indexGoods].detailDtos[this.indexSonGoods].appPrice;
					this.chooseNum-=1;
				}
				this.$set(this.cartList[this.indexGoods].detailDtos[this.indexSonGoods],'num',this.cartList[this.indexGoods].detailDtos[this.indexSonGoods].num);
			},
			addgoodsNum(index,indexSon,carId){
				this.indexGoods=index;
				this.indexSonGoods=indexSon;
				let addNum=this.cartList[index].detailDtos[indexSon].num;
				console.log(addNum)
				this.cartList[index].detailDtos[indexSon].num+=1;
				let data={
					num:1,
					carId:carId
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.updateNum,data,this.addgoodsNumBack,this);
				
			},
			
			addgoodsNumBack(){
				
				//console.log(this.cartList[this.indexGoods].detailDtos[this.indexSonGoods].appPrice)
				if(this.cartList[this.indexGoods].detailDtos[this.indexSonGoods].selectSon){
					this.totalFee+=this.cartList[this.indexGoods].detailDtos[this.indexSonGoods].appPrice;
					this.chooseNum+=1;
				}
				this.$set(this.cartList[this.indexGoods].detailDtos[this.indexSonGoods],'num',this.cartList[this.indexGoods].detailDtos[this.indexSonGoods].num);
//				console.log(this.cartList[index].detailDtos[index].num)
			},
			//删除产品
			removeGoods(index,indexSon,carId){
				this.delOneGoods=true;
				this.indexGoods=index;
				this.indexSonGoods=indexSon;
				this.carIdOne=carId;
				this.delGoods=true;
				console.log(this.carIdOne);
				
				let data={
					carIds:carId,
				}
				//this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.deleteGoods,data,this.removeGoodsBack,this);
			},
			sureDelGoods(){
				let data={
					carIds:this.carIdOne,
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.deleteGoods,data,this.removeGoodsBack,this);
			},
			removeGoodsBack(){
				
				this.delGoods=false;
				if(this.cartList[this.indexGoods].detailDtos[this.indexSonGoods].selectSon){
					this.totalFee-=this.cartList[this.indexGoods].detailDtos[this.indexSonGoods].appPrice*this.cartList[this.indexGoods].detailDtos[this.indexSonGoods].num;
					this.chooseNum-=this.cartList[this.indexGoods].detailDtos[this.indexSonGoods].num;
					for(let a=0;a<this.carIds.length;a++){
						if(this.cartList[this.indexGoods].detailDtos[this.indexSonGoods].carId==this.carIds[a]){
							this.carIds.splice(a,1)
						}
					}
				}
				this.cartList[this.indexGoods].detailDtos.splice(this.indexSonGoods,1);
			},
			//编辑全部
			deitGoods(){
				this.isOneGoods=false;
				for(let y=0;y<this.cartList.length;y++){
					this.cartList[y].addNum=true;
				}
			},
			wanchengGoods(){
				this.isOneGoods=true;
				for(let y=0;y<this.cartList.length;y++){
					this.cartList[y].addNum=false;
				}
			},
			//点击结算
			getMoney(){
				//console.log(this.chooseAll)
				if(this.carIds.length==0){
					this.$toast('请先选择商品');
				}else{
					if(this.chooseAll){
						for(let i=0;i<this.cartList.length;i++){
							for(let y=0;y<this.cartList[i].detailDtos.length;y++){
								this.carIds.push(this.cartList[i].detailDtos[y].carId);
								this.carIds=[...new Set(this.carIds)];
							}
						}
					}
					window.location.href=USE_URL+'ol/confirmOrder.html?carIds='+this.carIds.toString()+'&urlMark=gwc&cart=1'
				}
				
			},
			//删除所有产品
			allGoodsDel(){
				this.delOneGoods=false;
				if(this.carIds.length==0){
					this.$toast('请先选择删除的商品');
				}else{
					this.delGoods=true;
					if(this.chooseAll){
						for(let i=0;i<this.cartList.length;i++){
							for(let y=0;y<this.cartList[i].detailDtos.length;y++){
								this.carIds.push(this.cartList[i].detailDtos[y].carId);
								this.carIds=[...new Set(this.carIds)];
							}
						}
					}
					console.log(this.carIds)
				}
			},
			delAllGoods(){
				if(this.carIds.length!=0){
					let data={
						carIds:this.carIds.toString(),
					}
					this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.deleteGoods,data,this.delAllGoodsBack,this);
				}else{
					this.$toast('请先选择删除的商品');
				}
			},
			delAllGoodsBack(){
				
				if(this.chooseAll){
					this.cartList=[]
				}else{
					let result=[]
					for(let z=0;z<this.carIds.length;z++){
						for(let i=0;i<this.cartList.length;i++){
							for(let y=0;y<this.cartList[i].detailDtos.length;y++){
								if(this.carIds[z]==this.cartList[i].detailDtos[y].carId){
									this.cartList[i].detailDtos.splice(y,1);
									this.carIds.splice(z,1);
									z=z-1;
								}
							}
						}
					}
				}
				this.delGoods=false;
				this.totalFee=0;
				this.chooseNum=0;
				this.carIds=[];
				
			},
			//全选商品
			getAllgoods(){
				//console.log(this.cartList)
				this.chooseAll=!this.chooseAll;
				for(let y=0;y<this.cartList.length;y++){
					if(this.chooseAll){
						
						this.cartList[y].selectM=true;
						for(let i=0;i<this.cartList[y].detailDtos.length;i++){
							if(this.cartList[y].detailDtos[i].selectSon){
								this.totalFee-=this.cartList[y].detailDtos[i].appPrice*this.cartList[y].detailDtos[i].num;
								this.chooseNum-=this.cartList[y].detailDtos[i].num;
							}
							this.cartList[y].detailDtos[i].selectSon=true;
							this.totalFee+=this.cartList[y].detailDtos[i].appPrice*this.cartList[y].detailDtos[i].num;
							this.chooseNum+=this.cartList[y].detailDtos[i].num;
							this.carIds.push(this.cartList[y].detailDtos[i].carId);
							this.carIds=[...new Set(this.carIds)];
						}
						
					}else{
						this.cartList[y].selectM=false;
						for(let i=0;i<this.cartList[y].detailDtos.length;i++){
							this.cartList[y].detailDtos[i].selectSon=false;
							this.totalFee=0;
							this.chooseNum=0;
							this.carIds=[];
						}
					}
					
				}
			},
			showFen(){
				this.getCouponList=false;
				this.delGoods=false;
			},
			//跳转产品详情
			getGoodsDetail(id){
				
				this.$router.push({path:'/demo/iscroll/id/'+id+'?isShare=0&type=1'});
			},
			//跳转首页
			getIndex(){
				window.location.href=CUR_URLBACK+'index/pinkIndex';
				
			},
			getShangcheng(){
				window.location.href=USE_URL+'weixin/product/productCategoryDetail?pcatId=33';
			},
			//点击客服
			getkefu(){
				window.location.href='https://kefu.easemob.com/webim/im.html?tenantId=40231&ticket=false';	
			},
			getMindIndex(){
				window.location.href=USE_URL+'weixin/member/membercore';
			},
			//点击领券
			getCoupon(id){
				this.getCouponList=true;
				let data={
					//memberId:this.$route.query.memberId,
					page:1,
					rows:20,
					sellerId:id
					
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.conponsByCar,data,this.getCouponBack,this);
			},
			getCouponBack(data){
				this.couponObj=data.result;
			},
			//点击立即领取
			getCouponId(id,index){
				console.log(index)
				this.curTargetS=index;
				let data={
					//memberId:this.$route.query.memberId,
					couponId:id
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.receiveCoupon,data,this.getCouponIdBack,this);
			},
			getCouponIdBack(data){
				console.log(this.couponObj)
				this.$toast(data.message);
				
				if(data.code==0){
					this.$set(this.couponObj[this.curTargetS],'vaildNum',this.couponObj[this.curTargetS].vaildNum-1);
					if(this.couponObj[this.curTargetS].isCanUse==0){
						this.$set(this.couponObj[this.curTargetS],'receivedStatus',2);
					}else{
						this.$set(this.couponObj[this.curTargetS],'receivedStatus',3);
					}
					
				}
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
				console.log(this.shareData)
				//console.log(JSON.stringify(data.result))
				this.wxShareFun(data.result,this.shareData);
				//this.locationWx(data);
			},
		}
		
	}
</script>

<style lang="scss" scoped>
	.myshoppingCar{
		padding-top: .82rem;
		padding-bottom: 1.88rem;
		.carTop{
			position: fixed;
			width: 100%;
			top: 0;
			left: 0;
			text-align: center;
			font-size: .32rem;
			line-height: .82rem;
			border-bottom: 0.01rem solid #e5e5e5;
			z-index: 2;
			background: #fff;
			p{
				position: absolute;
				font-size: .26rem;
				right: .24rem;
				top: 0;
			}
		}
		.cardetail{
			margin-bottom: .20rem;
			background: #fff;
			.agency{
				padding: 0 .24rem 0 .30rem;
				border-bottom: 0.01rem solid #e5e5e5;
				overflow: hidden;
				.angecy-l{
					font-size: .24rem;
					line-height: .82rem;
					float: left;
					img{
						display: inline-block;
						height: .36rem;
						width: .36rem;
						vertical-align: middle;
						margin-top: -0.05rem;
						margin-right: .15rem;
					}
				}
				.angecy-r{
					float: right;
					font-size: .24rem;
					line-height: .82rem;
					span{
						margin-left: .20rem;
						color: #333;
					}
				}
			}
			.goodsDetail{
				padding: .20rem .24rem .20rem .30rem;
				border-bottom: 0.01rem solid #e5e5e5;
				height: 1.50rem;
				position: relative;
				overflow: hidden;
				.goods{
					height: 1.50rem;
					
					overflow: hidden;
					.chooseGoods{
						height: 100%;
						position: relative;
						width: .40rem;
						margin-right: .10rem;
						float:left;
						img{
							display: block;
							position: absolute;
							top: 50%;
							margin-top: -.18rem;
							height: .36rem;
							width: .36rem;
							vertical-align: middle;
							
						}
					}
					.goodsImg{
						float: left;
						img{
							display: block;
							height: 1.50rem;
							width: 1.50rem;
						}
					}
					.goodsName{
						float: left;
						font-size: .24rem;
						overflow: hidden;
						width: 66.9%;
						padding-left: .20rem;
						.name{
							width: 2.50rem;
							line-height: .32rem;
							height: .64rem;
							overflow: hidden;
							float: left;
						}
						.priceNum{
							float: right;
							P{
								text-align: right;
								line-height: .32rem;
							}
						}
						.normal{
							color: #999;
							margin-top: .30rem;
							font-size: .20rem;
						}
					}
				}
				.changeNum{
					position: absolute;
					width: 4.76rem;
					top: .20rem;
					left: 2.50rem;
					.num{
						float: left;
						line-height: .58rem;
						height: .56rem;
						
						font-size: .24rem;
						min-width: .72rem;
						border-top: 0.01rem solid #e5e5e5;
						border-bottom: 0.01rem solid #e5e5e5;
						text-align: center;
					}
					.del{
						
						float: left;
						height: .56rem;
						width: .56rem;
						vertical-align: middle;
						text-align: center;
						line-height: .53rem;
						font-size: .36rem;
						border: 0.01rem solid #e5e5e5;
						color: #e5e5e5;
						.delnum{
							display: block;
							height: 100%;
							width: 100%;
						}
					}
					.add{
						float: right;
						height: .56rem;
						width: .56rem;
						color: #e5e5e5;
						line-height: .53rem;
						
						font-size: .36rem;
						border: 0.01rem solid #e5e5e5;
						vertical-align: middle;
						text-align: center;
						
						.addnum{
							display: block;
							height: 100%;
							width: 100%;
						}
						
					}
				
				}
			}
		}
		.countDetail{
			overflow: hidden;
			font-size: .32rem;
			height: .88rem;
			position: fixed;
			left: 0;
			bottom: 1.00rem;
			width: 100%;
			background: #fff;
			.countLeft{
				float: left;
				width: 72%;
				overflow: hidden;
				.cotl-l{
					float: left;
					padding-left: .30rem;
					img{
						display: inline-block;
						height: .36rem;
						width: .36rem;
						vertical-align: middle;
						margin-top: 0rem;
						
					}
					span{
						line-height: .88rem;
						font-size: .24rem;
						color: #666;
					}
				}
				.cotl-r{
					float: right;
					color: #e50f71;
					line-height: .88rem;
					font-size: .24rem;
					margin-right: .20rem;
				}
			}
			.countRigth{
				float: right;
				background: #e50f71;
				width: 28%;
				line-height: .88rem;
				color: #fff;
				text-align: center;
			}
		}
		.getBottom{
			position: fixed;
			bottom: 0;
			left: 0;
			background: #f7f7f7;
			height: .85rem;
			padding-top: .15rem;
			width: 100%;
			display: flex;
			display:-webkit-box;
			display: -webkit-flex;
			display: -moz-box;
			display: -moz-flex;
			display: -ms-flexbox;
			.getIndex{
				width: 20%;
				font-size: .18rem;
				text-align: center;
				color: #b2b2b2;
				.top{
					position: relative;
					height: .50rem;
					img{
						display: block;
						position: absolute;
						left: 50%;
						margin-left: -.22rem;
						height: .44rem;
						width: .44rem;
					}
				}
			}
		}
		.pinFen{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
			background: rgba(0,0,0,.5);
		}
		.sureDelgoods{
			position: fixed;
			width: 7.00rem;
			background: #fff;
			top: 50%;
			margin-top: -1.70rem;
			left: 50%;
			margin-left: -3.50rem;
			border-radius: 0.15rem;
			overflow: hidden;
			height: 3.40rem;
			z-index: 3;
			p{
				line-height: 2.39rem;
				font-size: .32rem;
				text-align: center;
				border-bottom: .01rem solid #e5e5e5;
			}
			.chooseDel{
				font-size: .28rem;
				background: #F2F2F2;
				display: flex;
				display:-webkit-box;
				display: -webkit-flex;
				display: -moz-box;
				display: -moz-flex;
				display: -ms-flexbox;
				/*-webkit-justify-content:space-around;
				justify-content:space-around;
				-moz-box-pack:space-around;
				-webkit--moz-box-pack:space-around;*/
				width: 100%;
				overflow: hidden;
				line-height: 1.00rem;
				
				span{
					display: inline-block;
					text-align: center;
					width: 50%;
					
				}
			}
		}
		.rule{
			
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 9.50rem;
			background: #fff;
			z-index: 3;
			.ruleDetail{
				width: 100%;
				
				height: 100%;
				.topName{
					font-size: .32rem;
					color: #333;
					line-height: 1.08rem;
					text-align: center;
					width: 100%;
				}
				.step{
					padding: 0 .60rem;
					height: .90rem;
					.stepNext{
						margin: 0 .42rem;
						float: left;
						height: 100%;
						position: relative;
						img{
							display: block;
							height: .12rem;
							width: .08rem;
							position: absolute;
							left: 0;
							top: 50%;
							margin-top: -.24rem;
							
						}
					}
					
				}
				.couSpecial{
					text-align: left; 
					padding: 0 .24rem;
					line-height: .88rem;
					font-size: .25rem;
				}
				.closeRule{
					position: absolute;
					right: .24rem;
					top: 0.24rem;
					display: block;
					height: .36rem;
					width: .36rem;
				}
				
				.coupon{
					margin-bottom: .20rem;
					background: url(../../../static/images/dihong.png) no-repeat;
					background-size: 7.10rem 2.33rem;
					width: 7.10rem;
					height: 2.33rem;
					.couponDescribe{
						display: flex;
						display:-webkit-box;
					    display: -moz-box;
					    display: -moz-flex;
					    display: -ms-flexbox;
					    display: -webkit-flex;
						-webkit-justify-content:flex-start;
						justify-content:flex-start;
						-moz-box-pack:flex-start;
						-webkit--moz-box-pack:flex-start;
						.money{
							width: 2.00rem;
							color: #ed0276;
							line-height: 1.60rem;
							font-size: .60rem;
							text-align: center;
							font-weight: 600;
							span{
								font-size: .30rem;
								font-weight: normal;
							}
						}
						.describe{
							-webkit-box-flex: 1;
						    -webkit-flex: 1;
						    -ms-flex: 1;
						    flex: 1;
							margin-left: .20rem;
							padding-top: .28rem;
							font-size: .24rem;
							.couponName{
								color: #333;
								width: 4.70rem;
								line-height: .32rem;
								height: .64rem;
								overflow: hidden;
							}
							.getCoupon{
								padding: 0;
								margin-top: .28rem;
								color: #666;
								width: 4.00rem;
								position: relative;
								p{
									width: 1.40rem;
									line-height: .42rem;
									height: .42rem;
									text-align: center;
									font-size: .24rem;
									color: #fff;
									background: url(../../../dist/static/images/getting.png);
									background-size:1.40rem .42rem ;
									position: absolute;
									right: -.75rem;
									top: -50%;
								}
							}
						}
					}
					.couponTime{
						font-size: .24rem;
						color: #333;
						margin-left: .24rem;
						margin-top: 0.2rem;
					}
				
				}
			}
		
		}
	}
</style>