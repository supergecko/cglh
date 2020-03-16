<template>
	<view class="wrap">
		<view class="item">
			<view class="item1">第一步：下载谷歌验证器APP</view>
			<view class="item2">ios用户登录APP Stroe搜索“Authenticator" 下载。</view>
			<view class="item2">安卓用户登录应用商店或使用手机浏览器搜索"谷歌验证器"下载</view>
		</view>
		<view class="item">
			<view class="item1">第二步:在谷歌验证器中添加秘钥并备份</view>
			<view class="item2">打开谷歌验证器，扫描下方二维码或手动输 入下述秘钥添加验证令牌。</view>
			<view style="font-size: 28upx;color:#E94444;margin-bottom: 42upx;">注：秘钥用于手机更换或遗失时找回谷歌验证器， 绑定前请务必将以下述秘钥备份保存。</view>
			<view class="googleQrcode" @click="handleDownloadQrIMg(qrCodeUrl)">
				<image @load="imgLoad" :src="qrCodeUrl" mode="" style="width: 204upx;height: 204upx;" lazy-load></image>
				<image src="../../static/loading.gif" mode="" class="loadingImg" v-if="imgLoading" ></image>
			</view>
			<view style="font-size:28upx;text-align: center;margin-top: 20upx;display: flex;justify-content: center;">
				<view >{{secret}}</view>
				<view style="color:#42A2EC;display:inline-block;margin-left:20upx;" @click="copyText(secret)">复制</view>
			</view>
		</view>
		<view class="item" >
			<view class="item1">第三步：输入谷歌验证器中6位验证码</view>
			<validcode ref="code" :maxlength="6" :isPwd="false" @finish="getCode" ></validcode>
		</view>
		<view class="but" style="margin-bottom: 150upx;" @click="_checkGoogleAuth">确认开启</view>
	</view>
</template>

<script>
	export default{
		data (){
			return{
				qrCodeUrl:'',
				secret:'',
				imgLoading:true,
				google_code:''
			}
		},
		onNavigationBarButtonTap() {
			
		},
		onLoad() {
			this._getGoogleAuth()
		},
		methods:{
			imgLoad(){
				this.imgLoading = false
			},
			//获取输入的code码
			getCode(val) {
				console.log(val);
				this.google_code = val
			},
			_checkGoogleAuth() {
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
				const google_code = this.google_code
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${google_code}**${timestamp}**cglhhaofengshui`)
				let params = {
					google_code,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.checkGoogleAuth,
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
			// 获取谷歌验证码图片
			_getGoogleAuth() {
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
					url: this.$service.api_lists.getGoogleAuth,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.qrCodeUrl = res.data.data.qrCodeUrl
						this.secret = res.data.data.secret
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
		}
	}
</script>
<style lang="scss" scoped>
	page{
		background-color: rgb(105,139,249);
	}
	.googleQrcode{
		width: 204upx;
		height: 204upx;
		margin: 0 auto;
		border: 4upx solid;
		position: relative;
		border-image: -webkit-linear-gradient( #3a46e7, #ac48e5) 30 30;
		border-image: -moz-linear-gradient( #3a46e7, #ac48e5) 30 30;
		border-image: linear-gradient( #3a46e7, #ac48e5) 30 30;
	}
	.loadingImg{
		position: absolute;
		left: 0;
		right: 0;
		top: 42%;
		bottom: 0;
		margin: 0 auto;
		width: 32upx;
		height: 32upx;
	}
	.wrap{
		box-sizing: border-box;
		width: 710upx;
		margin: 0 auto 30upx;
		background-color: #fff;
		border-radius: 30upx;
		padding: 0 45upx 81upx;
		font-family: 'PingFang-SC-Medium';
		color: #171719;
		.item{
			.item1{
				margin-top: 81upx;
				margin-bottom: 46upx;
				font-size: 34upx;
				text-align: center;
				font-weight: bold;
			}
			.item2{
				font-size: 30upx;
				margin-bottom: 20upx;
			}
			.code{
				margin: 0 auto;
				width: 630upx;
				text-align: center;
				.tip{
					font-size: 34upx;
					color: red;
				}
				.num {
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					list-style: none;
					padding: 0;
					li{
						box-sizing: border-box;
						width: 90upx;
						height: 90upx;
						padding-top: 10upx;
						line-height: 90upx;
						text-align: center;
						border: 1upx solid #888; 
						color: #333;
						input{
							font-size: 54upx;
						}
					}
				}
			}
		}
		.but{
			width: 614upx;
			height: 96upx;
			margin: 64upx auto 0;
			line-height: 96upx;
			color: #fff;
			background-color: #42A2EC;
			border-radius: 10upx;
			text-align: center;
		}
	}
</style>
