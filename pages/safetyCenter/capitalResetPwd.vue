<template>
	<view class="wrap">
		<view class="main">
			<view class="group">
				<input type="text" v-model="registered.oldPassWord" placeholder="请输入您的原始密码"/>
			</view>
			<view class="group">
				<input type="text" v-model="registered.newPassWord" placeholder="请输入新密码（6-20位,数字+字符）"/>
			</view>
			<view class="group no">
				<input type="text" v-model="registered.checkPassWord" placeholder="请确认新密码"/>
			</view>
		</view>
		<view class="but" @click="_securityPasswordModify">确认修改</view>
		<!-- <view class="but" @click="_securityPasswordModify" style="margin-top: 20upx;">重置资金密码</view> -->
	</view>
</template>

<script>
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	export default{
		computed: {
			...mapState(['hasLogin']),
		},
		data (){
			return{
				registered: {
					mobile: '', //手机号
					oldPassWord: '' ,// 旧密码
					newPassWord:'', // 新密码
					checkPassWord:'' // 重复密码
				}
			}
		},
		methods:{
			toPage(Url) {
				uni.navigateTo({
					url:Url
				})
			},
			//修改密码
			_securityPasswordModify() {
				if (this.registered.oldPassWord === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入您的原始密码'
					});
					return;
				}
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
				const mobile = uni.getStorageSync('user_mobile')
				const old_password = this.registered.oldPassWord
				const password = this.registered.newPassWord
				const confirm_password = this.registered.checkPassWord
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${old_password}**${password}**${confirm_password}**${timestamp}**cglhhaofengshui`)
				let params = {old_password, password, confirm_password, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.securityPasswordModify,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
							icon: 'none',
							title: '修改登录密码成功'
						})
					}
					uni.hideLoading()
					uni.navigateBack({
						delta: 1 // 代表返回上 1 页
					})
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
					    title: err,
					    duration: 2000
					});
				})
			}
		},
		onLoad() {
			if (!this.hasLogin) {
			   uni.reLaunch({
			      url: '../login/login'
			  });
			  return
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-input-placeholder{
		font-size: 32upx;
		color: #AFADAD;
	}
	.wrap{
		width: 100%;
		background-color: #f8f8f8;
		.main{
			width: 100%;
			margin-top: 30upx;
			box-shadow: 1upx 1upx 5upx #E6E8ED;
			background-color: #fff;
			.group{
				background-color: #fff;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				width: 100%;
				height: 120upx;
				padding: 44upx 0 0 0;
				margin-left: 30upx;
				border-bottom: 1upx solid #E6E8ED;
				font-size: 30upx;
				color: #333;
				image{
					width: 50upx;
					height: 50upx;
					margin-right: 24upx;
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



