<template>
	<view class="wrap">
		<view class="header">
			<image src="../../static/images/header.png" mode=""></image>
		</view>
		<view class="main">
			<view class="group">
				<image src="../../static/images/tel-num.png" mode=""></image>
				<input type="text" v-model="userInfo.username" placeholder="请输入手机号"/>
			</view>
			<view class="group">
				<image class="password" src="../../static/images/password.png" mode=""></image>
				<input :password='showPas' type="text" v-model="userInfo.verification" placeholder="请输入密码"/>
				<view>
					<image class="hide" src="../../static/images/hide.png" v-show="showPas" @click="changePas"></image>
					<image class="hide" src="../../static/images/show.png" v-show="!showPas" @click="changePas"></image>
				</view>
			</view>
			<view class="but" @click="bindLogin">登录</view>
			<view class="footer">
				<text class="reg" @click="toPage('../login/reg')">立即注册</text>
				<text class="fot" @click="toPage('../login/reset')">忘记密码</text>
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
		data() {
			return {
				showPas: true,
				userInfo: {
					username: '', // 手机号
					verification: '' // 密码
				}
			}
		},
		onNavigationBarButtonTap() {
			 uni.reLaunch({
			    url: '../home/home',
			});
		},
		computed: {
			...mapState(['hasLogin']),
		},
		methods: {
			...mapMutations(['login', 'logout', 'userinfoarr']),
			changePas(){
				this.showPas =!this.showPas
			},
			toPage (Url) {
				uni.navigateTo({
					url: Url
				})
			},
			toMain(token) {
			    this.login(token);
			    if (this.hasLogin) {
			        uni.reLaunch({
			            url: '../home/home',
			        });
			    } else {
			        uni.navigateBack();
			    }
			
			},
			bindLogin() {
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
				if (this.userInfo.username.length < 11 || this.userInfo.username.length > 11) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的账号'
					});
					return;
				}
				if (this.userInfo.verification.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '密码不能小于5位'
					});
					return;
				}
				uni.showLoading({
					title: '登录中'
				});
				const mobile = this.userInfo.username
				const password = this.userInfo.verification
				const device_type = 'mobile'
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${password}**${timestamp}**cglhhaofengshui`)
				let params = {
					mobile,
					password,
					device_type,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.login,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化用户信息
						uni.setStorageSync("user_token", res.data.data.token)
						uni.setStorageSync("user_mobile", this.userInfo.username)
						const userinfo = uni.setStorageSync("userinfo", res.data.data.user)
						this.userinfoarr(userinfo)
						uni.showToast({
							icon: 'none',
							title: '登录成功'
						})
						this.toMain(res.data.data.token)
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
		},
		onLoad() {
		},
		onReady(){
			this.logout()
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		.header{
			position: relative;
			margin-bottom: 149upx;
			image{
				width: 750upx;
				height: 328upx;
			}
			.h-img{
				position: absolute;
				top: 67upx;
				left: 37upx;
				image{
					width: 36upx;
					height: 36upx;
				}
			}
		}
		.main{
			.group{
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				width: 670upx;
				height: 120upx;
				padding: 44upx 0 0 0;
				margin: 0 auto;
				border-bottom: 1upx solid #E6E8ED;
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
					width: 600upx;	
				}
			}
			.but{
				width: 670upx;
				height: 96upx;
				margin: 84upx auto;
				padding: 0;
				line-height: 96upx;
				text-align: center;
				font-size: 34upx;
				color: #fff;
				background-color: rgb(145,201,244);
				border-radius: 10upx;
				cursor: pointer;
			}
			.footer{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 0 42upx;
				margin: 0 auto;
				font-size: 28upx;
				color: rgb(145,201,244);
				cursor: pointer;
			}
		}
	}
</style>
