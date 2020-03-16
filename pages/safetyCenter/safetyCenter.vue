<template>
	<view style="background: rgb(245,245,245);">
		<view style="height: 24upx;width: 750upx;"></view>
		<view class="settingItem" @click="toPage('../safetyCenter/phoneTest1')">
			<view class="leftText">手机认证</view>
			<view style="display:flex;margin-right: 38upx;align-items: center;">
				<view class="rightText">{{safetyInfo.mobile}}</view>
				<image src="../../static/right.png" style="width: 18upx;height: 30upx;"></image>
			</view>
		</view>
		<view style="width:710upx;height:1upx;background:rgba(230,232,237,1);margin-left: 40upx;"></view>
		<view class="settingItem" @click="toPage(`../safetyCenter/realName?realname=${safetyInfo.realname}`)">
			<view class="leftText">实名认证</view>
			<view style="display:flex;margin-right: 38upx;align-items: center;">
				<view class="rightText" style="color: #42A2EC;">{{safetyInfo.realname}}</view>
				<image src="../../static/right.png" style="width: 18upx;height: 30upx;"></image>
			</view>
		</view>
		<view style="height: 24upx;width: 750upx;"></view>
		
		<view class="settingItem" @click="toPage('../safetyCenter/changePwd')">
			<view class="leftText">登录密码</view>
			<view style="display:flex;margin-right: 38upx;align-items: center;">
				<view class="rightText">修改</view>
				<image src="../../static/right.png" style="width: 18upx;height: 30upx;"></image>
			</view>
		</view>
		<view style="width:710upx;height:2upx;background:rgba(230,232,237,1);margin-left: 40upx;"></view>
		<view class="settingItem" @click="toPage(`../safetyCenter/fundPwd`)">
			<view class="leftText">资金密码</view>
			<view style="display:flex;margin-right: 38upx;align-items: center;">
				<view class="rightText" style="color: #42A2EC;">{{safetyInfo.security_pass}}</view>
				<image src="../../static/right.png" style="width: 18upx;height: 30upx;"></image>
			</view>
		</view>
		<view style="height: 24upx;width: 750upx;"></view>
		
		<view class="settingItem" @click="toGoogle(safetyInfo.google)">
			<view class="leftText">谷歌验证</view>
			<view style="display:flex;margin-right: 38upx;align-items: center;">
				<view class="rightText">{{safetyInfo.google}}</view>
				<image src="../../static/right.png" style="width: 18upx;height: 30upx;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data (){
			return{
				safetyInfo:{}
			}
		},
		onNavigationBarButtonTap() {
			uni.reLaunch({
				url: '../user/user',
			})
		},
		onShow() {
			this._safetyIndex()
		},
		onLoad() {
			this._safetyIndex()
		},
		methods:{
			toPage(Url) {
				uni.navigateTo({
					url:Url
				})
			},
			toGoogle(item){
				if(item==='已开启'){
					uni.navigateTo({
						url:'../safetyCenter/closecheck'
					})
				} else{
					uni.navigateTo({
						url:'../safetyCenter/gooleCheck'
					})
				}
			},
			// 安全中心首页
			_safetyIndex() {
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
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${timestamp}**cglhhaofengshui`)
				let params = {
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.safetyIndex,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.safetyInfo = res.data.data
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
