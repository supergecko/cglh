<template>
	<view class="wrap">
		<view class="titleNview-placing"></view>
		<ss-scroll-navbar1 :navArr="navList" :tabCurrentIndex="currentIndex1" @navbarTap="navbarTapHandler1"></ss-scroll-navbar1>
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
	import ssScrollNavbar1 from '@/components/ss-scroll-navbar1/ss-scroll-navbar1.vue'
	export default {
		components: {
			ssScrollNavbar1
		},
		data() {
			return {
				currentIndex1: 2,
				navList: [
					{
						title: '收藏',
						url: '../strategySquare/collect'
					}, {
						title: '策略广场',
						url: '../strategySquare/index'
					}, {
						title: '我的策略',
						url: '../strategySquare/myStrategy'
					}, {
						title: '我的交易所',
						url: '../strategySquare/myExchange'
					}, {
						title: '收益',
						url: '../strategySquare/earning'
					}, {
						title: '租用记录',
						url: '../strategySquare/rentRecord'
					}
				]
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
			},
			navbarTapHandler1 (index) {
				this.currentIndex1 = index;
				var obj = this.navList[index];
				this.toPath(obj.url)
			}
		}
	}
</script>


<style lang="scss" scoped>
	.titleNview-placing {
		height: var(--status-bar-height);
		width: 100%;
	}
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
