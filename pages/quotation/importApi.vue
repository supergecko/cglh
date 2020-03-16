<template>
	<view class="wrap">
		<view class="con">
			<view class="header" v-if='Bourse_detailArr.bourse'>
				<image :src="Bourse_detailArr.bourse.icon" mode="" style="width:190upx;height: 190upx;margin-top: 20upx;"></image>
				<view style="color:#171719;font-size:34upx;">{{Bourse_detailArr.bourse.title}}</view>
				<view style="color:#42A2EC;font-size:32upx; line-height: 120upx;">查看获取API教程</view>
			</view>
			<view class="main">
				<view class="item" style="border-bottom: 1upx solid #E6E8ED;">
					<text style="display:line-block;color:#171719;font-size:32upx;margin-right:10upx;">导入API Key:</text>
					<input type="text" v-model="InApiKey" placeholder="请导入API Key" style="display:inline-block;vertical-align: -12upx;"/>
				</view>
				<view class="item">
					<text style="display:line-block;color:#171719;font-size:32upx;margin-right:10upx;">API Key:</text>
					<input type="text" v-model="APIkey" placeholder="请输入API Key" style="display:inline-block;vertical-align: -12upx;"/>
					<view style="float: right;width:116upx;height:54upx;margin-top:28upx;line-height:54upx;text-align: center; background-color:#42A2EC;font-size: 26upx;color:#fff;border-radius:10upx;" @click="copyText1">粘贴</view>
				</view>
				<view class="item" style="height: 200upx;">
					<text style="display:line-block;color:#171719;font-size:32upx;margin-right:30upx;">secret Key:</text>
					<input type="text" v-model="secretKey" placeholder="请输入secret key" style="display:inline-block;vertical-align: -12upx;"/>
					<view style="float: right;width:116upx;height:54upx;margin-top:70upx;line-height:54upx;text-align: center; background-color:#42A2EC;font-size: 26upx;color:#fff;border-radius:10upx;" @click="copyText2">粘贴</view>
				</view>
			</view>
			<view class="footer">
				<view class="tit">
					<image src="../../static/images/tip.png" mode="" style="width: 46upx;height:46upx;vertical-align: -12upx;"></image>
					<text style="color:#E7931B;font-size:30upx;">温馨提示</text>
					<view style="color:#666;font-size:28upx;margin-top:29upx;">
						交易所提供的API Key和Secret Key 非常重要，请小心保管，不要通过QQ、微信等软件进行传输，不要保存在云端，确保资金安全！
					</view>
				</view>
				<view class="but" v-if="btnFlag" @click="_bourse_add">导入</view>
				<view class="but" v-if="!btnFlag" @click="_Bourse_edit">修改</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				InApiKey:'',
				APIkey:'',
				secretKey:'',
				btnFlag:false,
				bourse_id:0,
				Bourse_detailArr:{}
			}
		},
		onLoad(option) {
			this.bourse_id = option.bourse_id
			if(option.binding==='1'){
				this.btnFlag = false
				uni.setNavigationBarTitle({
				    title: '编辑API'
				});
			} else{
				this.btnFlag = true
			}
			this._Bourse_detail()
		},
		onShow() {
			
		},
		methods: {
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			},
			//交易所绑定API明细
			_Bourse_detail(){
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
				const bourse_id = this.bourse_id
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${bourse_id}**${timestamp}**cglhhaofengshui`)
				let params = {bourse_id,timestamp,sign}
				this.$ajax.post({
					url: this.$service.api_lists.Bourse_detail,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						// 初始化信息
						this.Bourse_detailArr = res.data.data
						if(res.data.data.user){
							this.InApiKey = res.data.data.user.user_bourse_id
							this.APIkey = res.data.data.user.api_key
							this.secretKey = res.data.data.user.secret_key
						}
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
			
			// 导入API
			_bourse_add() {
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
				const bourse_id = this.bourse_id
				const api_key = this.APIkey
				const secret_key = this.secretKey
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${bourse_id}**${api_key}**${secret_key}**${timestamp}**cglhhaofengshui`)
				let params = {bourse_id,api_key,secret_key,timestamp,sign}
				this.$ajax.post({
					url: this.$service.api_lists.bourse_add,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						// 初始化信息
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						uni.reLaunch({
							url:'../quotation/rent'
						})
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			
			},
			// 修改API
			_Bourse_edit() {
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
				const user_bourse_id = this.InApiKey
 				const bourse_id = this.bourse_id
				const api_key = this.APIkey
				const secret_key = this.secretKey
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${user_bourse_id}**${bourse_id}**${api_key}**${secret_key}**${timestamp}**cglhhaofengshui`)
				let params = {user_bourse_id,bourse_id,api_key,secret_key,timestamp,sign}
				this.$ajax.post({
					url: this.$service.api_lists.Bourse_edit,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						// 初始化信息
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						uni.reLaunch({
							url:'../quotation/rent'
						})
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			
			},
			//#ifdef APP-PLUS
			// 获取剪贴板内容
			copyText1() {
				uni.getClipboardData({
				    success: function (res) {
				        this.APIkey = res.data
				    }
				});
			},
			copyText2() {
				uni.getClipboardData({
				    success: function (res) {
				        this.secretKey = res.data
				    }
				});
			},
			//#endif
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #42A2EC;
		font-family: PingFang-SC-Medium;
		.wrap{
			width: 100%;
			background-color: #42A2EC !important;
		}
		.con{
			width: 710upx;
			margin: 0 auto 64upx;
			border-radius: 30upx;
			padding-bottom: 50upx;
			background-color: #fff;
		}
		.header{
			width: 244upx;
			text-align: center;
			margin: 20upx auto;
		}
		.main{
			width: 668upx;
			margin: 0 auto;
			border-top: 1upx solid #E6E8ED;
			border-bottom: 1upx solid #E6E8ED;
			.item{
				padding: 48upx 0;
			}
		}
		.tit{
			width: 642upx;
			margin: 37upx auto 101upx;
		}
		.but{
			width: 642upx;
			height: 96upx;
			margin: 0 auto 79upx;
			line-height: 96upx;
			color: #fff;
			font-size: 34upx;
			border-radius: 10upx;
			text-align: center;
			background-color: #42A2EC;
		}
	}
</style>
