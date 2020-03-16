<template>
	<view class="con">
		<ul class='active'>
			<li @click="toPath(`../message/acti-detail?newId=${item.id}`)" v-for="(item,i) in newInfo" :key="i">
				<image :src="item.thumbnail" mode=""></image>
			</li>
		</ul>
	</view>
</template>
<script>
	export default {
		data(){
			return{
				newInfo:{}
			}
		},
		onLoad() {
			this._Articles_by_category()
		},
		methods:{
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			},
			//活动中心
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
				const category_id = 4
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
	.con{
		width: 100%;
		background-color: #F8F8F8;
		.active{
			width: 706upx;
			height: 248upx;
			list-style: none;
			padding: 0;
			margin: 34upx auto;
			li{
				width: 100%;
				height: 100%;
				margin-bottom: 30upx;
				background-color: #aaa;
				border-radius: 20upx;
				image{
					width: 706upx;
					height: 248upx;
				}
			}
		}
		
	}
</style>
