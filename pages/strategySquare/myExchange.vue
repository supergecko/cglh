<template>
	<view class="wrap">
		<view class="titleNview-placing"></view>
		<ss-scroll-navbar1 :navArr="navList" :tabCurrentIndex="currentIndex1" @navbarTap="navbarTapHandler1" ></ss-scroll-navbar1>
		<view class="increase">
			<view class="main">
				<view style='width: 100%;height:264upx;border-radius:10upx;'  @click="toDetails(`../strategySquare/exDetail`)">
					<image src="../../static/newimg/bg.png" style="width: 100%;height: 100%;border-radius:10upx;"></image>
				</view>
				<view class="item2" v-for="(item,i) in 4" :key="i">
					<view style="display: flex;">
						<view><image src="../../static/newimg/fcoin.png" style='width: 80upx;height:80upx;'></image></view>
						<view style="margin-left: 20upx;">
							<view style="color:#171719;font-size: 30upx;">Fcoin</view>
							<view style="color:#666;font-size: 24upx;">平台优惠</view>
						</view>
					</view>
					<view class="but" style='background-color:#3B88FA;margin-top:10upx;'  @click="toDetails(`../strategySquare/alterExchange`)">修改</view>
				</view>
				<view class="addbut" @click="toDetails(`../strategySquare/addExchange`)">
					<image src="../../static/newimg/add.png"  style="width: 98upx;height:120upx;"></image>
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
				currentIndex1: 3,
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
				.item2{
					box-sizing:border-box;
					display: flex;
					width: 100%;
					height: 176upx;
					padding: 48upx 37upx 48upx 30upx;
					border-radius:10upx;
					margin-top: 24upx;
					box-shadow: 2upx 2upx 8upx #aaa;
					justify-content: space-between;
					.but{
						margin-right: 0;
					}
				}
				.addbut{
					position: fixed;
					right: 10upx;
					bottom: 221upx;
					width: 98upx;
					height: 120upx;
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
