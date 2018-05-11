<template>
	<div>
		<p class="question">
			<span style="font-size: .42rem;color: #e6e7e9; font-weight: 700;">Q:</span> 谨防假借OL圈名义的诈骗？
		</p>
		<div style="padding: 0 .24rem;">
			<p class="xian"></p>
		</div>
		
		<div style="padding-left: .70rem; position: relative;">
			<span class="spe">A:</span> 
			<p class="answer">
				为保护用户的财产安全，做此《诈骗预防必备手册》，供你参阅。
			</p>
			<p class="answer">
				1.OL圈平台及平台商家不会存在订单卡单、无效等情况；OL圈客服人员不会通过私人手机号码、400电话或短信形式告知您的订单异常，更不会引导你ATM转账、QQ提供退款链接等操作。
			</p>
			<p class="answer">
				2.订单实际状态请您以“我的订单”页面的交易状态为准。如需查看订单、取消订单、请点击“我的订单”进行操作。	
			</p>
			<p class="answer">
				3.拒绝向陌生人转账、代付款项，不要在陌生链接中付款，不要接受陌生文件或随意扫描二维码付款。
			</p>
			<p class="answer">
				4.不要轻信咚咚、QQ、短信、邮件、等传送的非法钓鱼链接，通过前述方式并以OL圈名义要求你点击链接操作退款、转账或者招聘代刷信誉等均属于诈骗活动。	
			</p>
			<p class="answer">
				5.任何一个验证码都有可能和您的款项相关，请勿随意告知他人。
			</p>
			<p class="answer">
				6.任何涉及款项、个人信息等相关操作请第一时间联系官方客服核实确认。
			</p>
		</div>
		
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
.question{
	font-size: .38rem;
	padding: .40rem .24rem;

}
.xian{
	border-bottom: 0.02rem solid #e6e7e9;
	width: 100%;
	margin-bottom: .40rem;
	
}
.spe{
	font-size: .42rem;
	color: #e6e7e9; 
	font-weight: 700;
	position: absolute;
	left: .24rem;
	top:0;
}
.answer{
	font-size: .28rem;
	padding: 0 .24rem;
	color: #999;
	line-height: .52rem;
	margin-bottom: .10rem;
}
</style>