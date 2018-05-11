<template>
	<div class="rule">
		<div class="step">
			<p class="stepDetail">
				<img  :src="oneImg"/>
				<span>支付开团/参团</span>
			</p>
			<p class="stepNext">
				<img :src="rowtopImg"/>
			</p>
			
			<p class="stepDetail">
				<img  :src="twoImg"/>
				<span>邀请拼团</span>
			</p>
			<p class="stepNext">
				<img :src="rowtopImg"/>
			</p>
			<p class="stepDetail">
				<img  :src="threeImg"/>
				<span>人满成团/不满退款</span>
			</p>
		</div>
		<div style="border-bottom: .02rem solid #f2f2f2;"></div>
		<ul class="explain">
					<li>
						1、开团送积分，OL圈会员开团支付成功，平台赠送团长拼团商品价格的等数量积分。
					</li>
					<li>
						2、拼团成功之后可以在商品有库存的情况下，多次邀请会员参与拼团。平台根据参团会员购买商品数量赠送商品价格*购买数量的积分给团长。
					</li>
					<li>
						3、团长拼团成功后，申请退货退款的，则获得的所有积分全部退回。并且继续邀请的参团不再赠送积分。
					</li>
					<li>
						4、拼团有效期是自开团时刻起24小时内，如果距离商品失效时间小于24小时，则以商品的结束时间为准。
					</li>
					<li>
						5、超过成团有效期24小时，未达成相应参团人数的团，则该拼团失败。开团及参团的会员支付金额按原路返回至您的支付账户。
					</li>
					<li>
						6、在拼团有效期24小时内，商品已提前售罄，若还未拼团成功的，则该拼团失败。
					</li>
				</ul>
	</div>
</template>

<script>
	export default {
		name:'b',
		data : function() {
			return{
				oneImg:'/static/images/one.png',
				twoImg:'/static/images/two.png',
				threeImg:'/static/images/three.png',
				rowtopImg:'/static/images/rowtop.png',
			}
		},
	}
</script>

<style lang="scss" scoped>
.rule{
	background: #fff;
	padding-top: .20rem;
	.step{
		
		overflow: hidden;
		display: flex;
		display:-webkit-box;
	    display: -moz-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: -moz-flex;
		padding: 0 .24rem;
		-webkit-justify-content:center;
		justify-content:center;
		-moz-box-pack:center;
		-webkit--moz-box-pack:center;
		height: .90rem;
		.stepNext{
			
			margin: 0 .46rem;
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
				margin-top: -.12rem;
			}
		}
		.stepDetail{
			position: relative;
			text-align: center;
			font-size: .24rem;
			float: left;
			
			img{
				display: block;
				height: .24rem;
				width: .24rem;
				position: absolute;
				left: 50%;
				margin-left: -.12rem;
			}
			span{
				display: inline-block;
				padding-top: .38rem;
			}
		}
	}
	.explain{
		color: #666;
		font-size: .24rem;
		line-height: .40rem;
		padding: 0rem .26rem .05rem;
		li{
			margin: .42rem 0;
		}
	}
}
</style>