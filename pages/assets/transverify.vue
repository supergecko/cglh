<template>
	<view class="wrap">
		<view class="main">
			<view class="con">
				{{userPhone}}
			</view>
			<view class="con" style="display: flex;align-items: center;justify-content: space-between;">
				<input type="text" v-model="verification_code" placeholder="请输入验证码"/>
				<view @click="_sendCode" class="sendText">
					{{sendCodeText}}
				</view>
			</view>
			<view class="but" @click="_drawing">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userPhone:uni.getStorageSync('user_mobile'),
				currency_id:'', // 币种ID
				balance:'', // 提币金额
				send_code:'', // 提币地址
				verification_code:'' ,// 验证码
				sendCodeText:'获取验证码',
				memo:''
			}
		},
		onLoad(option){
			this.userPhone = uni.getStorageSync('user_mobile')
			this.currency_id = option.currency_id
			this.balance = option.balance
			this.send_code = option.address
			this.memo = option.memo
		},
		methods: {
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			},
			//发送验证码
			_sendCode() {
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
				const mobile = '86'+this.userPhone
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
			// 提交提币
			_drawing(){
				if (this.verification_code === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
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
				const mobile = uni.getStorageSync('user_mobile')
				const currency_id = this.currency_id
				const balance = this.balance
				const send_code = this.send_code
				const verification_code = this.verification_code
				const timestamp = Date.parse(new Date()) / 1000
				const memo = this.memo
				const sign = this.$md5(`${mobile}**${currency_id}**${balance}**${send_code}**${verification_code}**${memo}**${timestamp}**cglhhaofengshui`)
				let params = {currency_id, balance, send_code, verification_code, memo, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.drawing,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
					uni.reLaunch({
						url:'../assets/checksucc'
					})
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
	.sendText{
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		width: 150upx;
		text-align: center;
	}
	.wrap{
		width: 100%;
		.main{
			width: 670upx;
			margin: 40upx auto;
			.con{
				padding: 53upx 0 35upx;
				border-bottom: 1upx solid #E6E8ED;
				input{
					display: inline-block;
				}
			}
			.but{
				width: 670upx;
				height: 96upx;
				margin: 84upx auto;
				color: #fff;
				font-size: 34upx;
				line-height: 96upx;
				border-radius: 10upx;
				text-align: center;
				background-color: #42A2EC;
			}
		}
	}
</style>
