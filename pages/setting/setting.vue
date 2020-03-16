<template>
	<view style="background: rgb(245,245,245);">
		<view style="height: 24upx;width: 750upx;"></view>
		<view class="settingItem" @click="toPath('../feedback/feedback')">
			<view class="leftText">问题反馈</view>
			<view style="display:flex;margin-right: 38upx;align-items: center;">
				<view class="rightText"></view>
				<image src="../../static/right.png" style="width: 18upx;height: 30upx;"></image>
			</view>
		</view>
		<view style="height: 24upx;width: 750upx;"></view>
		
		<view class="settingItem">
			<view class="leftText">语言</view>
			<view style="display:flex;margin-right: 38upx;align-items: center;">
				<view class="rightText">简体中文</view>
				<image src="../../static/right.png" style="width: 18upx;height: 30upx;"></image>
			</view>
		</view>
		<view style="width:710upx;height:1upx;background:rgba(230,232,237,1);margin-left: 40upx;"></view>
		<view class="settingItem">
			<view class="leftText">计价方式</view>
			<view style="display:flex;margin-right: 38upx;align-items: center;">
				<view class="rightText">人民币(CNY)</view>
				<image src="../../static/right.png" style="width: 18upx;height: 30upx;"></image>
			</view>
		</view>
		<view style="height: 24upx;width: 750upx;"></view>
		
		<view class="settingItem" @click="toPath('../setting/rateInfo')">
			<view class="leftText">费率详情</view>
			<view style="display:flex;margin-right: 38upx;align-items: center;">
				<view class="rightText"></view>
				<image src="../../static/right.png" style="width: 18upx;height: 30upx;"></image>
			</view>
		</view>
		<view style="height: 24upx;width: 750upx;"></view>
		<view class="settingBTn" @click="bindLogout">退出登录</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			...mapMutations(['logout']),
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			},
			// 退出
			bindLogout() {
				const _this = this
				uni.showModal({
					title: '提示',
					content: '是否确定退出登录',
					success: function(res) {
						if (res.confirm) {
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
								title: '退出中'
							})
							uni.hideLoading()
							const mobile = uni.getStorageSync('user_mobile')
							const timestamp = Date.parse(new Date()) / 1000
							const sign = _this.$md5(`${mobile}**${timestamp}**cglhhaofengshui`)
							let params = {
								timestamp,
								sign
							}
							_this.$ajax.post({
								url: _this.$service.api_lists.loginOut,
								data: params
							}).then((res) => {
								if (res.data.code == 1) {
									//初始化信息
									_this.logout()
									uni.reLaunch({
										url: '../login/login',
									})
								}
								uni.hideLoading()
								console.log(res)
							}).catch((err) => {
								uni.hideLoading()
								uni.showToast({
									title: err,
									duration: 2000
								});
							})
						
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style>
	.settingBTn{
		width:750upx;
		height:110upx;
		background:rgba(255,255,255,1);
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(245,80,88,1);
		text-align: center;
		line-height: 110upx;
	}
	.settingItem{
		width:750upx;
		height:110upx;
		background:rgba(255,255,255,1);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.leftText{
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(21,20,20,1);
		margin-left: 40upx;
	}
	.rightText{
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(129,129,129,1);
		margin-right: 24upx;
	}
</style>
