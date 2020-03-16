<template>
	<view class="wrap">
		<view class="titleNview-placing"></view>
		<ss-scroll-navbar1 :navArr="navList" :tabCurrentIndex="currentIndex1" @navbarTap="navbarTapHandler1" :scrollLeftWidth="130"></ss-scroll-navbar1>
		<view class="increase" style="margin: 0 auto;">
			<view class="main">
				<view class="item3" v-for="(item,i) in 3" :key="i"  @click="toDetails(`../strategySquare/detail`)">
					<view style='display:flex;margin-bottom:35upx;'>
						<view style='font-size:36upx;margin-right: 56upx;'>神经网格</view>
						<view style='font-size:32upx;margin:5upx 12upx 0 0;'>BTC 51329.68</view>
						<view><image src="../../static/newimg/down.png" style="width:24upx;height:26upx;vertical-align:14upx;"></image></view>
					</view>
					<view style='display:flex;'>
						<view style='margin-right: 233upx;'>
							<view style='font-size:26upx;margin-bottom:12upx;color:#FEF7ED;'>平仓收益</view>
							<view>12.5942</view>
						</view>
						<view>
							<view style='font-size:26upx;margin-bottom:12upx;color:#FEF7ED;'>账户余额</view>
							<view>1BTC</view>
						</view>
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
				currentIndex1: 4,
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
			margin: 0 atuo;
			.main{
				.item3{
					box-sizing:border-box;
					width: 100%;
					height: 239.9upx;
					padding: 38upx 0 38upx 31upx;
					border-radius:10upx;
					margin-top: 24upx;
					background-color: #5980FE;
					color: #fff;
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

