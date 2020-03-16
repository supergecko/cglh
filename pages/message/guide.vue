<template>
	<view class="content">
		<view class="line"></view>
		<view class="new" v-for="(item,i) in newInfo" :key="i" @click="toPath(`../message/acti-detail?newId=${item.id}`)">
			<view class="n-con">
				<text class="n-tit">{{item.post_title}}</text><br/>
				<text class="n-txt">{{item.published_time}}</text>
			</view>
			<view class="n-img">
				<image src="../../static/images/block.png" mode=""></image>
			</view>
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
			toPath(Url) {
				uni.navigateTo({
					url:Url
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
				const category_id = 2
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
	.line{
		width: 100%;
		height: 1upx;
		background-color: #E6E8ED;
	}
	.content{
		box-sizing: border-box;
		width: 100%;
		padding: 28upx 0 0;
		background-color: #fff;
		.new{
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			margin: 40upx 30upx 0;
			border-bottom: 2upx solid #E6E8ED;
			.n-img{
				width: 220upx;
				height: 156upx;
				margin-left: 40upx;
				background-color: #F8BB7B;
				image{
					width: 220upx;
					height: 156upx;
				}
			}
			.n-con{
				padding-bottom: 35upx;
				.n-tit{
					font-size: 34upx;
					color: #151414;
				}
				.n-txt{
					font-size: 26upx;
					color: #888;
				}
			}
		}	
		.new.no{
			border: none;
		}
	}
</style>


