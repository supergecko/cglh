<template>
	<view class="wrap">
		<view class="titleNview-placing"></view>
		<ss-scroll-navbar1 :navArr="navList" :tabCurrentIndex="currentIndex1" @navbarTap="navbarTapHandler1"></ss-scroll-navbar1>
		<view class="main">
			<view class="item" v-for="(item,i) in strategyArr" :key="i" >
				<view style='margin-right:41upx;' @click="toDetails(`../strategySquare/neuralNet`)">
					<view style="color:#fff;"><text style="font-size:90upx;">{{item.rate}}</text>%</view>
					<view style="color:#CAE6FD;font-size:26upx;text-align:center;">月化收益</view>
				</view>
				<view style="color:#fff;" @click="toDetails(`../strategySquare/neuralNet`)">
					<view>
						<view style='font-size:36upx;'>
							<text>{{item.title}}</text><image src="../../static/newimg/hot.png" style=' width: 34upx;height:42upx;margin-left:14upx;'></image>
						</view>
						<text style='font-size:26upx;'>{{item.keyword}}</text>
						<view style="display:flex;font-size:22upx;margin-top:19upx;" >
							<view class="tip" style='background-color:#2E66F5;'v-for="(item,i) in item.bourse" :key="i">{{item}}</view>
						</view>
					</view>
				</view>
				<view style="text-align:center;position: absolute;right: 26px;min-width: 36px;">
					<image :src="item.collection_status===0?'../../static/newimg/save.png':'../../static/newimg/saved.png'" style=' width: 46upx;height:46upx;vertical-align: 3upx;'></image>
					<view style="font-size:22upx;color:#F7F9FE;text-align:center;">{{item.collection_status===0?'收藏':'已收藏'}}</view>
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
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				//刷新要执行的方法
				this._Strategy_list()
				uni.stopPullDownRefresh(); //停止下拉刷新动画
				uni.showToast({
					icon: 'none',
					title: '刷新成功'
				});
			}, 1000);
			uni.getNetworkType({
				success: res => {
					if (res.networkType == 'none') {
						uni.showToast({
							icon: 'none',
							title: '当前网络不可用'
						});
						clearTimeout(fres);
						uni.stopPullDownRefresh(); //停止下拉刷新动画
					}
				}
			});
		},
		onLoad() {
			this._collection_list()
			// this.getds = setInterval(()=>{
			// 	this.setData();
			// }, 4000)
		},
		data() {
			return {
				currentIndex1: 0,
				strategyArr:[],
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
			},
			// 获取策略列表
			_collection_list() {
				uni.getNetworkType({
					success: (res) => {
						if (res.networkType == 'none') {
							uni.showToast({
								icon: 'none',
								title: '当前网络不可用'
							})
						}
					}
				})
				uni.showLoading({
					title: '加载中'
				})
				const mobile = uni.getStorageSync('user_mobile')
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${timestamp}**cglhhaofengshui`)
				let params = {timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.collection_list,
					data: params
				}).then((res) => {
					uni.hideLoading()
					if (res.data.code == 1) {
						//初始化信息
						this.strategyArr = res.data.data
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
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
			margin: 56upx auto 0;
			.item{
				box-sizing:border-box;
				display: flex;
				width: 100%;
				padding:26upx 0 40upx 46upx;
				background-color:#0C85EB;
				border-radius:10upx;
				margin-top: 24upx;
			}
			.tip{
				padding:8upx 14upx;
				margin-right: 16upx;
			}
		}
	}
</style>
