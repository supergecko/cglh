<template>
	<view class="text">
		<view class="line"></view>
		<view class="con">
			<view class="new" v-for="(item,i) in newInfo" :key="i" @click="toPath(`../message/anno-detail?newId=${item.id}`)">
				<view class="n-con">{{item.post_title}}</view>
				<text class="n-time">{{item.published_time}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				newInfo:[]
			}
		},
		onLoad() {
			this._Articles_by_category()
		},
		methods:{
			toPath(URL){
				uni.navigateTo({
					url:URL
				})
			},
			//新闻页面
			_Articles_by_category(){
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
				const category_id = 1
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${category_id}**${timestamp}**cglhhaofengshui`)
				let params = {category_id,timestamp,sign}
				this.$ajax.post({
					url: this.$service.api_lists.Articles_by_category,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						// 初始化信息
						this.newInfo = res.data.data
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {background-color: #F8F8F8;}
	.text{
		background-color: #FFFFFF;
	}
	.line{
		width: 100%;
		height: 1upx;
		background-color: #E6E8ED;
	}
	.text{
		width: 100%;
	}
	.con{
		box-sizing: border-box;
		width: 100%;
		padding-left: 30upx;
		padding-right: 30upx;
		background-color: #fff;
		.new{
			border-bottom: 2upx solid #E6E8ED;
			line-height: 60upx;
			padding: 25upx 0;
			.n-con{
				font-size: 34upx;
				color: #151414;
			}
			.n-time{
				font-size: 26upx;
				color: #888;
			}
		}	
	}
</style>
