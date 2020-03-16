<template>
	<view :style="{backgroundImage:`url(${redBg})`}" class="redBg">
		<view :style="{backgroundImage:`url(${whiteBg})`}" class="whiteBg">
			<view class="invitationHead">
				<view class="invitationHeadText1">已邀请好友</view>
				<view class="invitationHeadText2">{{Invitation.invite_number}}</view>
				<view class="invitationHeadText3">邀请码</view>
				<view class="invitationHeadText4">{{Invitation.incite_code}}</view>
				<view class="copyBTN"  @click="copyText(Invitation.incite_code)">复制</view>
			</view>
			<view style="width:645upx;height:1upx;background:rgba(220,222,226,1);"></view>
			<view class="invitationMiddle">
				<view class="invitationMiddleText1">邀请链接</view>
				<view class="invitationMiddleText2">{{Invitation.invite_url}}</view>
				<view class="copyBTN" @click="copyText(Invitation.invite_url)">复制</view>
			</view>
			
			<view class="invitationFooter">
				<view class="invitationFooterText1">邀请二维码</view>
				<view class="invitationFooterText2">
					<image :src="Invitation.qrcodeurl" style="width: 191upx;height: 191upx;"></image>
				</view>
				<view class="invitationFooterText3" @click="handleDownloadQrIMg(Invitation.qrcodeurl)">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import redBg from "@/static/invitation/bgRed.png"
	import whiteBg from "@/static/invitation/bgb.png"
	export default {
		data() {
			return {
				redBg:redBg,
				whiteBg:whiteBg,
				Invitation:[]
			}
		},
		onLoad() {
			this._Invitation()
		},
		methods: {
			//#ifdef H5
			// 点击下载图片(H5端)
			handleDownloadQrIMg(ImgSrc) {
				// 这里是获取到的图片base64编码
				const imgUrl = this.qrCodeUrl
				// 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候）
				if (window.navigator.msSaveOrOpenBlob) {
					var bstr = atob(imgUrl.split(',')[1])
					var n = bstr.length
					var u8arr = new Uint8Array(n)
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n)
					}
					var blob = new Blob([u8arr])
					window.navigator.msSaveOrOpenBlob(blob, 'paymentImg' + '.' + 'png')
				} else {
					// 这里就按照chrome等新版浏览器来处理
					const a = document.createElement('a')
					a.href = imgUrl
					a.setAttribute('download', 'paymentImg.png')
					a.click()
				}
			},
			//复制(H5)
			copyText(item) {
				const _this = this
				this.$copyText(item).then(function(e) {
					uni.showToast({
						icon: 'none',
						title: '复制成功'
					})
				}, function(e) {
					uni.showToast({
						icon: 'none',
						title: '复制失败，请重试'
					})
				})
			},
			//#endif
			
			//#ifdef APP-PLUS
			// 点击下载图片(APP端)
			handleDownloadQrIMg(ImgSrc) {
				uni.showActionSheet({  
					itemList:["保存到相册"],  
					success:res=>{  
						if(res.tapIndex==0){  
							uni.showLoading({  
								title:"保存中..."  
							})  
							setTimeout(function() {   
								uni.hideLoading()  
							}, 6000);  
							uni.downloadFile({  
								url: ImgSrc,//网络路径，下载下来  
								success: (res) => {
									if (res.statusCode === 200) {  
										uni.saveImageToPhotosAlbum({  
											filePath: res.tempFilePath,//下载后的临时路径  
											success:  res => {//下载完成后在相册里压根找不到  
												uni.hideLoading()  
												uni.showToast({  
													title:"保存成功！"   
												})  
											}  
										})  
									}  
								}  
							});  
						}  
					}  
				})
			},
			//复制(app端)
			copyText(item) {
				uni.setClipboardData({
				    data: item,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			//#endif
			
			//邀请返佣
			_Invitation(){
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
				let params = {timestamp,sign}
				this.$ajax.post({
					url: this.$service.api_lists.Invitation,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						// 初始化信息
						this.Invitation = res.data.data
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
		}
	}
</script>

<style>
	.redBg{
		width: 750upx;
		height: 1790upx;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
	}
	.whiteBg{
		background-size: 100% 100%;
		width: 710upx;
		height: 1394upx;
		margin-top: 360upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.invitationHead{
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 496upx;
	}
	.invitationHeadText1{
		font-size:26upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(136,136,136,1);
		margin-top: 73upx;
	}
	.invitationHeadText2{
		font-size:56upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(23,23,25,1);
	}
	.invitationHeadText3{
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(21,20,20,1);
		margin-top: 26upx;
	}
	.invitationHeadText4{
		font-size:42upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(23,23,25,1);
		margin-top: 30upx;
		margin-bottom: 30upx;
	}
	.copyBTN{
		width:210upx;
		height:60upx;
		border:2upx solid rgba(103,186,250,1);
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(66,162,236,1);
		line-height: 60upx;
		text-align: center;
	}
	.invitationMiddle{
		width: 644upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 374upx;
		justify-content: space-between;
		border-bottom: 2upx dashed rgba(220,222,226,1); 
		box-sizing: border-box;
		padding-top: 70upx;
		padding-bottom: 60upx;
	}
	.invitationMiddleText1{
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(21,20,20,1);
	}
	.invitationMiddleText2{
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(23,23,25,1);
		text-align: center;
	}
	.invitationFooter{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding-top: 70upx;
		padding-bottom: 60upx;
		height: 522upx;
	}
	.invitationFooterText1{
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(21,20,20,1);
	}
	.invitationFooterText2{
		width:232upx;
		height:232upx;
		border:2upx solid rgba(51,51,51,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.invitationFooterText3{
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(66,162,236,1);
	}
</style>
