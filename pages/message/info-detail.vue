<template>
	<view class="content">
		<view class="annous">
			<text class="title">{{newInfo.title}}</text><br/>
			<text class="detail">{{newInfo.create_time}}</text>
		</view>
		<section class="c-content" v-html='newInfo.content' style='padding-left: 32upx;padding-right: 32upx;'></section>
		<!-- <view class="notice">
			<view class="n-con">
				<text class="n-named">尊敬的创谷社区用户：</text><br/>
				<text class="n-info">您提交的USDT申请已通过审核。</text><br/>
				<text class="n-time">
					创谷量化团队
					2019年7月23日
				</text>
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
			this._Sys_detail(option.newId)
		},
		methods:{
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			},
			//系统消息
			_Sys_detail(newId){
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
				let params = {id, timestamp,sign}
				this.$ajax.post({
					url: this.$service.api_lists.Sys_detail,
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
		background-color: #fff;
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
					text-align: center;
					margin: 88upx 70upx 0 0;
					display: block;
					float: right;
				}
			}
		}
		
	}
</style>
