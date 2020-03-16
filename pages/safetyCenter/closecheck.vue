<template>
	<view class="wrap">
		<view class="main">
			<view class="group">
				<input type="text" v-model="password" placeholder="请输入您的登录密码"/>
			</view>
			<view class="group no">
				<input type="text" v-model="googleCode" placeholder="请输入您的谷歌验证码"/>
			</view>
		</view>
		<view class="txt" style=" width: 690upx; margin:0 auto;color:#E94444;font-size:26upx;">
			注：为了您的资产安全，谷歌验证码停用后24小时内不可提币
		</view>
		<view class="but" @click="_closeGoogleAuth">确认修改</view>
	</view>
</template>

<script>
	export default{
		data (){
			return{
				password:'',
				googleCode:''
			}
		},
		onNavigationBarButtonTap() {
			
		},
		onLoad() {
			
		},
		methods:{
			// 关闭谷歌验证码
			_closeGoogleAuth() {
				if (this.password === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入您的登录密码'
					});
					return;
				}
				if (this.googleCode === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入您的谷歌验证码'
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
				const mobile = uni.getStorageSync('user_mobile')
				const google_code = this.googleCode
				const password = this.password
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${password}**${google_code}**${timestamp}**cglhhaofengshui`)
				let params = {
					google_code,
					password,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.closeGoogleAuth,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						uni.navigateBack({
							delta: 1 // 代表返回上 1 页
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
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		background-color: #f8f8f8;
		.main{
			width: 100%;
			margin: 30upx 0 30upx 0;
			box-shadow: 1upx 1upx 5upx #E6E8ED;
			background-color: #fff;
			.group{
				background-color: #fff;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				width: 100%;
				height: 120upx;
				
				margin-left: 30upx;
				border-bottom: 1upx solid #E6E8ED;
				font-size: 30upx;
				color: #333;
				image{
					width: 50upx;
					height: 50upx;
					margin-right: 24upx;
				}
				.hide{
					width: 42upx;
					height: 20upx;
					margin: 20upx 0 0 0;
				}
				input{
					font-size: 32upx;
					color: #000;
					width: 520upx;	
				}
			}
			.group.no{
				border: 0;
			}
		}
		.but{
			width: 670upx;
			height: 96upx;
			margin: 84upx auto 42upx;
			padding: 0;
			line-height: 96upx;
			text-align: center;
			font-size: 34upx;
			color: #fff;
			background-color: rgb(145,201,244);
			border-radius: 10upx;
			cursor: pointer;
		}
	}
</style>


