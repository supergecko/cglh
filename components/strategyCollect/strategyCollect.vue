<template>
	<view class="wrap">
		<view class="main">
			<view class="item" v-for="(item,i) in collectionArr" :key="i" >
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
	export default {
		name: 'strategyCollect',
		data() {
			return {
				collectionArr:[]
			}
		},
		methods:{
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
						this.collectionArr = res.data.data
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
