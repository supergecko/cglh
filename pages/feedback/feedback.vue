<template>
	<view class="wrap">
		<view class="txt">
			<textarea maxlength="500" v-model="feedback" placeholder="请输入您的反馈信息" style="width: 690upx;" />
		</view>
		<view class="way">
			<input type="text" v-model="contact" placeholder="请输入您的联系方式(手机或邮箱)"/>
		</view>
		<view class="but" @click="_feedback">
			确认提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feedback:'',
				contact:''
			}
		},
		methods: {
			_feedback() {
				if (this.feedback === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入您的反馈信息'
					});
					return
				}
				if (this.contact === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入您的联系方式(手机或邮箱)'
					});
					return
				}
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
				const feedback = this.feedback
				const contact = this.contact
				const mobile = uni.getStorageSync('user_mobile')
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${feedback}**${contact}**${timestamp}**cglhhaofengshui`)
				let params = {
					feedback,
					contact,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.feedback,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						this.feedback = ''
						this.contact = ''
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					});
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		background-color: #F8F8F8;
		.txt{
			box-sizing: border-box;
			width: 100%;
			height: 400upx;
			padding: 31upx;
			margin-bottom: 20upx;
			background-color: #fff;
			border-top: 1upx solid #E6E8ED;
			box-shadow: 1upx 1upx 8upx #E6E8ED;
		}
		.way{
			box-sizing: border-box;
			width: 100%;
			height: 196upx;
			background-color: #fff;
			padding: 37upx 30upx;
			box-shadow: 1upx 1upx 8upx #E6E8ED;
		}
		.but{
			width: 646upx;
			height: 96upx;
			margin: 62upx auto 140upx;
			line-height: 96upx;
			color: #fff;
			font-size: 34upx;
			text-align: center;
			background-color: #42A2EC;
			border-radius: 10upx;
		}
	}
</style>
