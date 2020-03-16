<template>
	<view class="wrap">
		<view class="main">
			<view class="item" v-for="item in 4">
				<view style="display: flex;justify-content:space-between;margin-bottom:22upx;font-size:30upx;">
					<view>网格策略</view>
					<view style="font-size:28upx;color:#42A2EC;">已支付</view>
				</view>
				<view style="display: flex;justify-content:space-between;margin-bottom:20upx;font-size:38upx;">
					<view>一个月套餐</view>
					<view>30.00元</view>
				</view>
				<view style="color:#777;font-size:26upx;">2020年1月6日 16:52:58</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'strategyRent',
		data() {
			return {
				
			}
		},
		methods:{
			toPath(URL){
				uni.navigateTo({
					url:URL
				})
			},
			toDetails(URL){
				uni.navigateTo({
					url:URL
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		background-color: #f5f5f5;
		font-family: 'PingFang-SC-Bold';
		.main{
			.item{
				box-sizing: border-box;
				width: 710upx;
				height: 244upx;
				margin: 24upx auto 0;
				color: #171719;
				padding: 38upx 24upx 0 32upx;
				background-color: #fff;
				border-radius: 15upx;
			}
		}
	}
</style>
