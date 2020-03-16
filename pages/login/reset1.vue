<template>
	<view class="wrap">
		<view class="new-pwd">
			<input type="password" placeholder="请输入新密码（至少6-20位,数字+字符）" v-model="registered.newPassWord">
			<image src="../../static/images/hide.png" mode="" ></image>
		</view>
		<view class="new-pwd">
			<input type="password" placeholder="请确认新密码" v-model="registered.checkPassWord">	
		</view>
		<view class="but" @click="_resetPassword">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				registered: {
					mobile: '', //手机号
					verificationCode: '' ,// 验证码
					newPassWord:'', // 新密码
					checkPassWord:'' // 重复密码
				},
				sendCodeFlag: false, // 发送验证码flag
				sendCodeText:'获取验证码'
			}
		},
		methods: {
			//重置密码
			_resetPassword() {
				if (this.registered.newPassWord === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入新密码'
					});
					return;
				}
				if (this.registered.checkPassWord === '') {
					uni.showToast({
						icon: 'none',
						title: '请再次输入新密码'
					});
					return;
				}
				if (!(this.registered.newPassWord === this.registered.checkPassWord)) {
					uni.showToast({
						icon: 'none',
						title: '请检查两次密码是否相同'
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
				})
				const mobile = this.registered.mobile
				const password = this.registered.newPassWord
				const confirm_password = this.registered.checkPassWord
				const verification_code = this.registered.verificationCode
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${password}**${confirm_password}**${verification_code}**${timestamp}**cglhhaofengshui`)
				let params = {mobile, password, confirm_password, verification_code, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.passwordModify,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
							icon: 'none',
							title: '重置密码成功'
						})
						const fres = setTimeout(() => {
							uni.reLaunch({
								url: '../login/login'
							})
						}, 1500)
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
			this.registered.verificationCode = option.verificationCode
			this.registered.mobile = option.mobile
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		margin-top: 50upx;
		padding: 0 41upx 0 40upx;
		.new-pwd{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 37upx 0;
			font-size: 30upx;
			color: #333;
			border-bottom: 1upx solid #E6E8ED;
			input{
				width: 575upx;
			}
			image{
				width: 40upx;
				height: 20upx;
				margin-top: 15upx;
			}
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
