<template>
	<div class="tryexplain">
		<ul>
			<li>
				<span class="title">一、试用流程：</span>
				<span class="content">申请试用-缴纳保证金-试用30天-试用报告-退还保证金。</span>
			</li>
			<li>
				<span class="title">二、试用流程详情说明：</span>
				<span class="title" style="font-size: .32rem; line-height: .58rem;">1、申请试用</span>
				<span class="content">进入试用中心，选择心仪的试用商品，点击“申请试用”。试用商品分为有积分试用和无积分试用。无积分试用只需缴纳保证金便可试用，积分试用需缴纳保证金与一定数量的积分方可试用。</span>
				<span class="title" style="font-size: .32rem; line-height: .58rem;">2、付保证金</span>
				<span class="content">选定试用商品后，进入‘提交申请’页面，选择保证金缴纳方式，提交试用申请，缴纳商品试用保证金，完成试用申请。</span>
				<span class="title" style="font-size: .32rem; line-height: .58rem;">3、试用30天</span>
				<span class="content">等待试用商品发货，物流，签收，确认收货之后，试用开始，试用30天后，在我的试用商品列表填写试用报告。</span>
				<span class="title" style="font-size: .32rem; line-height: .58rem;">4、试用报告</span>
				<span class="content">填写试用报告，请至少上传三张实拍照片，并书写不少于30字的真实试用体验，点击提交后，平台将于一个工作日内审核。</span>
				<span class="title" style="font-size: .32rem; line-height: .58rem;">5、退保证金</span>
				<span class="content">（1）提交试用报告后，审核通过的，则保证金将自动退至余额账户或小金库账户；审核未通过，需重新填写试用报告，直至试用报告审核通过。</span>
				<span class="content">（2）积分试用，只退还缴纳的保证金，积分不退还。</span>
			</li>
			<li>
				<span class="title">三、试用说明</span>
				<span class="title" style="font-size: .32rem; line-height: .58rem;">*什么是保证金？</span>
				<span class="content">OL圈试用保证金，是申请试用商品时，为确保会员在试用周期内会认真体验产品，并于试用周期结束后，按要求认真如实地提交试用报告而缴纳的保证金，试用报告审核通过后24小时内，商品的试用保证金会全额退至余额账户或小金库。</span>
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
	.tryexplain{
		background: #fff;
		ul{
			padding:0 .24rem;
			li{
				span{
					display: block;
					font-size: .28rem;
				}
				.content{
					text-indent:.64rem;
					line-height: .46rem;
				}
				.title{
					font-size: .36rem;
					font-weight: 600;
					line-height: .86rem;
				}
			}
		}
	}
</style>