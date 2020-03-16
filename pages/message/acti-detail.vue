<template>
	<view class="content">
		<view class="annous">
			<text class="title">{{newInfo.post_title}}</text><br/>
			<text class="detail">{{newInfo.published_time}}</text>
		</view>
		<section class="c-content" v-html='newInfo.post_content'></section>
		<!-- <view class="notice">
			<view class="n-con">
				<text class="n-named">一、儿童平安计划</text><br/>
				<text class="n-info">
					项目进展总述：2018年12月，儿童平安训练营整体工作进展顺利，项目进展方面累计开展7场训练营活动，活动累计参与人数共2221人次，共有21名志愿者参与其中。
				</text>
				<view class="n-img">
					<image src="" mode=""></image>
				</view>
				<text class="n-info">
					本月项目学校应急物资配送完毕，共109个校园应急箱和相应的应急物品，100套应急标识，1114套安全教育盒子，53967个儿童应急包，1463件T恤和1000个旗帜，开展了803节安全教育授，40场安全教育主题活动；
				</text>
				<view class="n-img">
					<image src="" mode=""></image>
				</view>
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
		background-color: #fff !important;
	}
	.c-content{
		padding-left: 32upx;
		padding-right: 32upx;
	}
	.content{
		background-color: #fff;
		padding: 0 0 70upx 0;
		.annous{
			padding: 40upx 29upx 0;
			border-top: 1upx solid #E6E8ED;
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
			padding: 0 30upx;
			color: #151414;
			font-size: 32upx;
			.n-con{
				.n-named{
					line-height: 100upx;
				}
				.n-img{
					 width: 690upx;
					 height: 351upx;
					 margin: 43upx 0 60upx;
					 background-color: #eee;
				}
			}
		}
		
	}
</style>
