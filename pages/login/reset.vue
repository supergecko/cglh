<template>
	<view class="wrap">
		<view class="tel-num">
			<text>+86</text>
			<input type="text" style="text-indent: 1em;" placeholder="请输入手机号" v-model="registered.mobile">	
		</view>
		<view class="auth-code">
			<input type="text" placeholder="请输入验证码" v-model="registered.verificationCode">	
			<view @click="_sendCode" style="width: 150upx;text-align: center;">
				{{sendCodeText}}
			</view>
		</view>
		<view class="but" @click="toNextPage">下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				registered: {
					mobile: '', // 手机号
					verificationCode: '' // 验证码
				},
				sendCodeFlag: false, // 发送验证码flag
				sendCodeText:'获取验证码'
			}
		},
		methods: {
			// 下一步
			toNextPage() {
				if (this.registered.mobile === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
					});
					return;
				}
				if (this.registered.verificationCode === '') {
					uni.showToast({
						icon: 'none',
						title: '验证码'
					});
					return;
				}
				const mobile = '86'+this.registered.mobile
				const verification_code = this.registered.verificationCode
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${verification_code}**${timestamp}**cglhhaofengshui`)
				let params = {mobile, verification_code, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.check_verification_code,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						uni.navigateTo({
							url: '../login/reset1?mobile='+this.registered.mobile+'&verificationCode='+this.registered.verificationCode
						})
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
					    title: err,
					    duration: 2000
					});
				})
			},
			//发送验证码
			_sendCode() {
				if (this.registered.mobile === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号'
					});
					return;
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
				});
				const mobile = '86'+this.registered.mobile
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${timestamp}**cglhhaofengshui`)
				let params = {mobile, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.sendmobilecode,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.sendCodeFlag = true
						this.sendCodeText = 60
						this.intervalId = setInterval(() => {
						  this.sendCodeText--
						}, 1000)
						uni.showToast({
							icon: 'none',
							title: '发送成功'
						})
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
		},
		onLoad(option) {
			
		},
		watch: {
		  sendCodeText (newName, oldName) {
		    if (newName === 0) {
		      clearInterval(this.intervalId)
		      this.sendCodeText = '获取验证码'
		      this.sendCodeFlag = false
		    }
		  }
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		margin-top: 50upx;
		padding: 0 41upx 0 40upx;
		.tel-num{
			display: flex;
			flex-direction: row;
			font-size: 34upx;
			padding: 37upx 0;
			color: #171719;
			border-bottom: 1upx solid #E6E8ED;
		}
		.auth-code{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 37upx 0;
			font-size: 30upx;
			color: #333;
			border-bottom: 1upx solid #E6E8ED;
		}
		.but{
			width: 669upx;
			height: 96upx;
			margin: 84upx auto;
			font-size: 34upx;
			color: #fff;
			line-height: 96upx;
			text-align: center;
			background-color: #42A2EC;
			border-radius: 10upx;
		}
	}
</style>
