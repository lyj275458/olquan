<template>
	<div class="otherPay">
		<div class="otherTop">
			<p class="top">让你的朋友来扫一扫吧，为你付款</p>
			<p><img class="erwei" :src="curObj.twocodeUrl" /></p>
		</div>
		<div class="orderdetail" v-for="item in curObj.orderDtos">
			<div class="shopName">{{item.sellerName}}</div>
			<div class="shopDetail" v-for="itemSon in item.items">
				<div class="shopL">
					<img :src="itemSon.productImage" />
				</div>
				<div class="shopR">
					<div style="padding: 0 .10rem; ">
						<div class="goods">
							<p class="shopRL">{{itemSon.productName}}</p>
							<p class="shopRR">{{itemSon.price}}</p>
						</div>
						<div class="number">x {{itemSon.num}}</div>
						<div class="normal">{{itemSon.normal}}</div>
					</div>
				</div>
			</div>
			<div class="freight">
				<p class="freightL">运费</p>
				<p class="freightR"></p>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		data : function() {
			return{
				shareImg:'/static/images/share.png',
				
				curObj:[],
				
			}
		},
		created: function() {
			this.$store.commit('documentTitle','找人代付');
			this.getList();
		},
		methods:{
			getList(){
				let data={
					togetherJoinRecordId:this.$route.params.id,
					//memberId:this.$route.query.memberId,
					payMethod:1,
					isPayAnother:1,
					uutype:1
				}
				this.$store.state.ajaxObj.comAjax(this.$store.state.ajaxObj.API.singleOrderPay,data,this.getListBack);
			},
			getListBack(data){
				console.log(data)
				this.curObj=data.result
			},
		}
	}
</script>

<style lang="scss" scoped>
.otherPay{
	.otherTop{
		background: #fff;
		font-size: .30rem;
		p{
			text-align: center;
		}
		.top{
			
			line-height: .54rem;
		}
		.erwei{
			display: inline-block;
			text-align: center;
			width: 2.50rem;
			height: 2.50rem;
		}
	}
	.orderdetail{
		background: #fff;
		margin-top: .20rem;
		
		.shopName{
			
			font-size: .30rem;
			padding: 0 .24rem;
			line-height: .62rem;
		}
		.shopDetail{
			background: #f7f7f7;
			padding: .24rem;
			overflow: hidden;
			position: relative;
			.shopL{
				float: left;
				width: 20%;
				
				img{
					display: block;
					width: 100%;
				}
			}
			.shopR{
				float: left;
				width: 80%;
				
				.goods{
					overflow: hidden;
					.shopRL{
						float: left;
						width: 80%;
						font-size: .24rem;
						height: .76rem;
						line-height: .36rem;
						overflow: hidden;
					}
					.shopRR{
						font-size: .24rem;
						line-height: .36rem;
						float: right;
					}
				}
				.number{
					font-size: .24rem;
					text-align: right;
				}
				.normal{
					font-size: .20rem;
					color: #ddd;
					
					
				}
			}
		}
		.freight{
			background: #fff;
			padding: 0 .24rem;
			border-bottom: .01rem solid #e5e5e5;
			overflow: hidden;
			font-size: .30rem;
			line-height: .62rem;
			.freightL{
				float: left;
			}
			.freightR{
				float: right;
			}
		}
	}
	
}
</style>