<template>
	<view class="wrap">
		<view class="header"><image src="../../static/images/LOGO.png" mode=""></image></view>
		<view class="main">
			<view class="group">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{ array[index] }}</view>
						</picker>
					</view>
				</view>
				<image src="../../static/images/down.png" mode="" style="width: 28upx; height: 18upx;margin: 12upx 0 0 10upx;"></image>
				<input type="text" v-model="registered.mobile" placeholder="请输入手机号" style="text-indent: 1em;" />
			</view>
			<view class="group">
				<input type="text" v-model="registered.verificationCode" placeholder="请输入验证码" />
				<view @click="_sendCode" style="width: 150upx;text-align: center;">
					{{sendCodeText}}
				</view>
			</view>
			<view class="group">
				<input :password='showPas' type="text" v-model="registered.userPwd" placeholder="请输入新密码（至少6-20位,数字+字符）" style="width:570upx;" />
				<view>
					<image src="../../static/images/hide.png" mode="" style="width: 36upx;height: 24upx;margin: 12upx 0 0 30upx;" v-show="showPas" @click="changePas"></image>
					<image src="../../static/images/show.png" mode="" style="width: 36upx;height: 24upx;margin: 12upx 0 0 30upx;" v-show="!showPas" @click="changePas"></image>
				</view>
			</view>
			<view class="group"><input type="text" v-model="registered.userPhone" placeholder="请输入邀请码（非必填项）" /></view>
			<view class="but" @click="_register">立即注册</view>
			<view class="footer"><text class="reg" @click="toPage('../login/login')">账号登录</text></view>
			<view class="protocol">
				<label>
					<checkbox/>
					<text>我已阅读并接受</text>
					<text style="color:#42A2EC">《用户服务协议》</text>
				</label>
			</view>
		</view>
	</view>
</template>

<script>
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	export default {
		computed: {
			
		},
		data() {
			return {
				title: 'picker',
				array: ['+86', '+87', '+88', '+89'],
				index: 0,
				showPas: true,
				registered: {
					mobile: '', // 手机号
					verificationCode: '', // 验证码
					userPwd: '', // 新密码
					userPhone: '' // 用户的邀请码
				},
				sendCodeFlag: false, // 发送验证码flag
				sendCodeText:'获取验证码',
				invite_codeFlag:false
			}
		},
		 methods: {
			...mapMutations(['userinfoarr']),
			changePas(){
			   this.showPas =!this.showPas
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
				console.log(e.target)
			},
			toPage (Url) {
				uni.reLaunch({
					url: Url
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
			},
			//注册
			_register() {
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
						title: '请输入验证码'
					});
					return;
				}
				if (this.registered.userPwd === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入新密码'
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
				const { mobile, userPwd, verificationCode, userPhone } = this.registered
				const password = userPwd
				const verification_code = verificationCode
				const code = 86
				const invite_code = userPhone
				const device_type = 'mobile'
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${code}**${mobile}**${password}**${verification_code}**${invite_code}**${device_type}**${timestamp}**cglhhaofengshui`)
				let params = {mobile, verification_code, password, code, device_type, timestamp, invite_code, sign}
				this.$ajax.post({
					url: this.$service.api_lists.register,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						//初始化用户信息
						uni.setStorageSync("user_token", res.data.data.token);
						const userinfo = uni.setStorageSync("userinfo", res.data.data.user);
						this.userinfoarr(userinfo);
						uni.showToast({
							icon: 'none',
							title: '注册成功'
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
.wrap {
	width: 100%;
	.header {
		padding: 47upx 0 55upx 0;
		image {
			width: 150upx;
			height: 150upx;
			margin: 0 auto;
			display: block;
		}
	}
	#num {
		appearance: none;
		outline: none;
		border: none;
		width: 97upx;
		height: 54upx;
		color: #666;
		font-size: 32upx;
		background: url(../../static/images/down.png) no-repeat right center;
	}
	.main {
		.group {
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			width: 670upx;
			height: 120upx;
			padding: 44upx 0 0 0;
			margin: 0 auto;
			border-bottom: 1upx solid #e6e8ed;
			font-size: 30upx;
			color: #333;
			image {
				width: 50upx;
				height: 50upx;
				margin-right: 24upx;
			}
			.hide {
				width: 42upx;
				height: 20upx;
				margin: 20upx 0 0 0;
			}
			input {
				font-size: 32upx;
				color: #000;
				width: 520upx;
			}
		}
		.but {
			width: 670upx;
			height: 96upx;
			margin: 84upx auto 42upx;
			padding: 0;
			line-height: 96upx;
			text-align: center;
			font-size: 34upx;
			color: #fff;
			background-color: rgb(145, 201, 244);
			border-radius: 10upx;
			cursor: pointer;
		}
		.footer {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 0 42upx;
			margin: 0 auto;
			font-size: 28upx;
			color: #000;
			cursor: pointer;
		}
		.protocol {
			margin-top: 156upx;
			font-size: 26upx;
			text-align: center;
			checkbox {
				transform: scale(0.6);
				vertical-align: 5upx;
			}
		}
	}
}
</style>
