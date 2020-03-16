<template>
	<view class="wrap">
		<view class="increase">
			<view class="search" style='display:flex;margin-bottom:24upx; box-sizing: border-box;border-radius:5upx;width:100%;padding:15upx 25upx;height:72upx;background-color:#F4F4F4;'>
				<image src="../../static/newimg/search.png" mode="" style=' width: 42upx;height:42upx;'></image>
				<input type="text" value="" style="text-indent:23upx;font-size:28upx;" placeholder="USDT"/>
			</view>
			<view class="main">
				<view style='width: 100%;height:264upx;border-radius:10upx;'  @click="toDetails(`../strategySquare/exDetail`)">
					<image src="../../static/newimg/bg.png" style="width: 100%;height: 100%;border-radius:10upx;"></image>
				</view>
				<view class="item1">
					<view style='margin-right:87upx;'>
						<view style="color:#171719;font-size:40upx;font-weight: bolder;margin-bottom:16upx;">神经网格</view>
						<view style="color:#333;font-size:28upx;text-align: center;">剩余：<text>10天</text></view>
					</view>
					<view style='display:flex;padding-top:16upx;'> 
						<view class="but" style="background-color:#FC9F67;">续费</view>
						<view class="but" style="background-color:#3B88FA;">修改</view>
						<view><img src="../../static/newimg/open.png" style='width: 154upx;height:64upx;'></view>
					</view>
				</view>
				<view class="item1">
					<view style='margin-right:87upx;'>
						<view style="color:#171719;font-size:40upx;font-weight: bolder;margin-bottom:16upx;">神经网格</view>
						<view style="color:#333;font-size:28upx;text-align: center;">剩余：<text>10天</text></view>
					</view>
					<view style='display:flex;padding-top:16upx;'> 
						<view class="but" style="background-color:#FC9F67;">续费</view>
						<view class="but" style="background-color:#3B88FA;">修改</view>
						<view><img src="../../static/newimg/close.png" style='width: 154upx;height:64upx;'></view>
					</view>
				</view>
				<view class="item1">
					<view style='margin-right:87upx;'>
						<view style="color:#171719;font-size:40upx;font-weight: bolder;margin-bottom:16upx;">神经网格</view>
						<view style="color:#333;font-size:28upx;text-align: center;">剩余：<text>10天</text></view>
					</view>
					<view style='display:flex;padding-top:16upx;'> 
						<view class="but" style="background-color:#FC9F67;">续费</view>
						<view class="but" style="background-color:#3B88FA;">修改</view>
						<view><img src="../../static/newimg/open.png" style='width: 154upx;height:64upx;'></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'strategyCollect',
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
		background-color: #fff;
		font-family: PingFang-SC-Bold;
		.increase{
			width: 710upx;
			margin: 0 auto;
			.main{
				.item1{
					box-sizing:border-box;
					display: flex;
					width: 100%;
					height: 196upx;
					padding:52upx 0 53upx 32upx;
					border-radius:10upx;
					margin-top: 24upx;
					box-shadow: 2upx 2upx 8upx #aaa;	
				}
				.but{
					width: 116upx;
					height: 60upx;
					margin-right: 14upx;
					line-height: 60upx;
					text-align: center;
					color: #fff;
					font-size: 28upx;
					border-radius: 30upx;
				}
			}
		}
	}
</style>
