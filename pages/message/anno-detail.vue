<template>
	<view class="content">
		<view class="annous">
			<text class="title">
				{{newInfo.post_title}}
			</text><br/>
			<text class="detail">{{newInfo.published_time}} 来源领鹿谷资讯</text>
		</view>
		<section class="c-content" v-html='newInfo.post_content'></section>
		<!-- <view class="notice">
			<view class="n-con">
				<text class="n-named">尊敬的创谷社区用户：</text><br/>
				<text class="n-info">开班票价优惠:</text><br/>
				<text class="n-info1">1.早鸟票85折，截止7月31日，之后恢复原价</text><br/>
				<text class="n-info1">2.团购双人套票，85折，截止到开课前。</text><br/>
				<text class="n-info1">优惠力度请直接联系李先生：13275903178，寻找属 于你的地方社群</text><br/>
				<text class="n-time">2019年7月23日</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data(){
			return{
				newInfo:{}
			}
		},
		onLoad(option) {
			this._Articles_detail(option.newId)
		},
		methods:{
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			},
			//新闻详情
			_Articles_detail(newId){
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
				const id = newId
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${id}**${timestamp}**cglhhaofengshui`)
				let params = {id,timestamp,sign}
				this.$ajax.post({
					url: this.$service.api_lists.Articles_detail,
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
	page{
		background-color: #FFF;
	}
	.content{
		height: 1280upx;
		background-color: #fff;
		.annous{
			padding: 0 29upx 30upx;
			border-bottom: 1upx solid #E6E8ED;
			.title{
				font-size: 38upx;
				color: #171719;
				font-weight: bolder;
			}
			.detail{
				font-size: 25upx;
				color: #888;
			}
		}
		.notice{
			padding: 40upx 30upx;
			.n-con{
				font-size: 32upx;
				color: #171719;
				.n-info{
					line-height: 100upx;
				}
				.n-info1{
					line-height: 55upx;
				}
				.n-named{
					font-size: 34upx;
				}
				.n-time{
					margin-top: 88upx;
					display: block;
					float: right;
				}
			}
		}
		
	}
</style>
