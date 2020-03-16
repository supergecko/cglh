<template>
	<view class="wrap">
		<view class="titleNview-placing"></view>
		<ss-scroll-navbar1 :navArr="navList" :tabCurrentIndex="currentIndex1" @navbarTap="navbarTapHandler1" :scrollLeftWidth="130"></ss-scroll-navbar1>
		<view class="main">
			<view class="item1"v-for="(item,i) in 4" :key="i"  @click="toDetails(`../strategySquare/neuralNet`)">
				<view style='margin-right:87upx;'>
					<view style="color:#171719;font-size:40upx;font-weight: bolder;margin-bottom:16upx;">
						<image src="../../static/newimg/hot.png" style="width:38upx;height:48upx;margin-right:16upx;vertical-align:-6upx;"></image>
						<text>神经网格</text>
					</view>
				</view>
				<view style='display:flex;'> 
					<view class="but" style="background-color:#767FFC;">反馈</view>
					<view class="but" style="background-color:#3AA5F7;">租用</view>
				</view>
				<view style="color:#666;font-size:26upx;margin-top:20upx;">
					 租用时间：2019-10-01 至 2020-01-01 </text>
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
				currentIndex1: 5,
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
				uni.reLaunch({
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
		.main{
			width: 710upx;
			margin: 0 auto;
			.item1{
				box-sizing:border-box;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				width: 100%;
				height: 196upx;
				padding:41upx 0 32upx 32upx;
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
</style>
