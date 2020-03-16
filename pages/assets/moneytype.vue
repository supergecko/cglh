<template>
	<view class="wrap">
		<view class="main">
			<view class="list" v-for="item in items"> {{item}} </view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				message: 'hello World!',
				items:["USDT","ETH","BTC","EOS"]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		background-color: #F8F8F8;
		.main{
			background-color: #fff;
			margin-top: 20upx;
			.list{
				font-size: 34upx;
				color: #151414;
				padding: 40upx 0;
				margin-left: 30upx;
				border-bottom: 1upx solid #E6E8ED;
			}
		}
	}
</style>
