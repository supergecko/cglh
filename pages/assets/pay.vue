<template>
	<view class="wrap">
		<view class="choose">
			<view class="con"  style="display: flex;align-items: center;justify-content: space-between;" @click="openPopup"> 
				<view class="named"><text>选择币种</text></view>
				<view class="called" style="display: flex;align-items: center;">
					<text class="blue">{{coinName}}</text> 
					<image src="../../static/right.png" mode="" style="width:18upx;height:30upx"></image>
				</view>	
			</view>
			<uni-popup class="pop" ref="popup" type="bottom">
				<view class="pop-item" @click='checkPopup(item)' v-for="(item, i) in coinArry" :key="i" >
					{{item.title}}
				</view>
				<view class="line" style="height: 0upx;">
				</view>
				<view class="pop-item cancel" @click='closePopup'>取消</view>
			</uni-popup>
			<view class="con top">
				<view class="left">
					<text class="tit">可用{{coinName}}</text><br/>
					<text >{{asset.used}}</text>
				</view>
				<view class="right">
					<text class="tit">冻结{{coinName}}</text><br/>
					<text>{{asset.freezing}}</text>
				</view>
			</view>
		</view>
		<view class="payMiddleWarp">
			<view class="payMiddleItem">
				<view class="payMiddleLeftText">充值金额</view>
				<view>
					<input placeholder="请输入充值金额" class="payMiddleInput" v-model="rechargeInfo.balance"/>
				</view>
			</view>
			<view style="width:646upx;height:2upx;background:rgba(189,189,189,1);margin: 0 auto;"></view>
			<view class="payMiddleItem">
				<view class="payMiddleLeftText">转出地址</view>
				<view>
					<input placeholder="转出地址为交易所该币种充币地址" class="payMiddleInput" v-model="rechargeInfo.send_code"/>
				</view>
			</view>
			<view style="width:646upx;height:2upx;background:rgba(189,189,189,1);margin: 0 auto;"></view>
			<view class="payMiddleItem" v-if="memoFlag" >
				<view class="payMiddleLeftText" style="margin-right: 72upx;">MEMO</view>
				<view>
					<input placeholder="请输入MEMO" class="payMiddleInput" v-model="rechargeInfo.memo"/>
				</view>
			</view>
			<view style="width:646upx;height:2upx;background:rgba(189,189,189,1);margin: 0 auto;" v-if="memoFlag"></view>
			<view class="payMiddleImgWarp" v-if="isImgFlag">
				<view style="margin-top: 84upx;margin-bottom: 20upx;">
					<qrcode :val="qrcodeurl" :size="180" ref="qrcode"></qrcode>
				</view>
				<view style="font-size:30upx;font-family:PingFang SC;font-weight:400;color:rgba(62,120,253,1);margin-bottom: 20upx;" @click="copyText(qrcodeurl)">复制地址</view>
				<view class="addressWarp">
					<view class="addressItemText"><span style="color: #171719;">地址:</span>{{qrcodeurl}}</view>
				</view>
			</view>
			<view class="but" v-if="!isImgFlag" @click="toggleImg">获取充币地址</view>
			<view class="but" v-if="isImgFlag" @click="submitRecharge">提交</view>
			<view style="height: 77upx;width: 100%;"></view>
		</view>
		<view class="word">
			<view class="main">
				<text>
					1.您充值到上述地址后，需要整个网络节点的确认，10次网络确认后到账，50次网络确认后可提币。
				</text>
				<text>
					2.最小充值金额：xxx USDT，小于最小金额的充值将不会上账且无法退回。
				</text>
				<text>
					3.您的充值地址不会经常改变，可以重复充值；如有更改，我们会尽量通过系统消息或邮件通知您。
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import qrcode from '@/components/qrcode/qrcode.vue';
	export default {
		components: {
			uniPopup,
			qrcode
		},
		data() {
			return {
				isImgFlag:false,
				coinName:'BTC',
				coinArry:[],
				memoFlag:false,
				asset:{},
				qrcodeurl: '',
				rechargeInfo:{
					balance:'', // 充值金额
					send_code:'', // 转出地址
					currency_id:'' ,// 
					memo:''
				}
			}
		},
		onLoad(option){
			this._currency()
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				//刷新要执行的方法
				this._currency()
				uni.stopPullDownRefresh(); //停止下拉刷新动画
				uni.showToast({
					icon: 'none',
					title: '刷新成功'
				})
			}, 1000);
			uni.getNetworkType({
			    success:  (res) => {
			        if(res.networkType == 'none'){
						uni.showToast({
							icon:'none',
							title:'当前网络不可用'
						})
						clearTimeout(fres)
						uni.stopPullDownRefresh(); //停止下拉刷新动画
					}
			    }
			})
		},
		methods: {
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			},
			toggleImg(){
				this.isImgFlag = true
				setTimeout(() => {
					this.$refs.qrcode.creatQrcode()
				}, 100)
			},
			checkPopup(item) {
				this.$refs.popup.close()
				this.coinName = item.title
				this.asset = item.asset
				this.rechargeInfo.currency_id = item.asset.currency_id
				this.qrcodeurl = item.asset.receivable_address
				// setTimeout(() => {
				// 	this.$refs.qrcode.creatQrcode();
				// }, 100)
				this.isImgFlag = false
				if(this.coinName=='EOS'){
					this.memoFlag = true
				} else{
					this.memoFlag = false
				}
			},
			closePopup() {
				this.$refs.popup.close()
			},
			openPopup() {
				this.$refs.popup.open()
			},
			// 提交充币信息
			submitRecharge(){
				if (this.rechargeInfo.balance === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入充值金额'
					});
					return;
				}
				if (this.rechargeInfo.send_code === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入转出地址'
					});
					return;
				}
				if (this.rechargeInfo.memo === '' && this.memoFlag===true) {
					uni.showToast({
						icon: 'none',
						title: '请输入MEMO'
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
				const currency_id = this.rechargeInfo.currency_id
				const balance = this.rechargeInfo.balance
				const memo = this.rechargeInfo.memo
				const send_code = this.rechargeInfo.send_code
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${currency_id}**${balance}**${send_code}**${memo}**${timestamp}**cglhhaofengshui`)
				let params = {currency_id, memo, balance, send_code, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.recharge,
					data: params
				}).then((res) => {
					uni.hideLoading()
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
					    title: err,
					    duration: 2000
					});
				})
			},
			// 拉取币种列表
			_currency() {
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
					url: this.$service.api_lists.assetsIndex,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.memoFlag = false
						this.isImgFlag = false
						this.coinArry = res.data.data.asset
						this.asset = res.data.data.asset[0].asset // 可用的余额
						this.coinName = res.data.data.asset[0].title
						this.qrcodeurl = res.data.data.asset[0].asset.receivable_address
						this.rechargeInfo.currency_id = res.data.data.asset[0].asset.currency_id
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
			// 点击下载图片 (H5端)
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
			// 复制 (H5)
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
			// 点击下载图片 (APP端)
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
			//复制 (APP)
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
	.pop-item {
		height: 100upx;
		border-bottom: 1upx solid rgb(245, 245, 245);
		background-color: #fff;
		line-height: 100upx;
		display: block;
		text-align: center;
		font-size: 34upx;
		color: #151414;
	}	
	.addressWarp{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.addressItemText{
		color: #666666;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		width: 600upx;
		text-align: center;
	}
	.payMiddleWarp{
		width:706upx;
		background:rgba(255,255,255,1);
		border-radius:6upx;
		margin: 0 auto;
	}
	.payMiddleItem{
		display: flex;
		align-items: center;
		height: 126upx;
		padding-left: 30upx;
		padding-right: 30upx;
	}
	.payMiddleLeftText{
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(23,23,25,1);
		margin-right: 50upx;
	}
	.payMiddleInput{
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(175,173,173,1);
		width: 466upx;
	}
	.payMiddleImgWarp{
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(23,23,25,1);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.but{
		width:638upx;
		height:96upx;
		background:rgba(66,162,236,1);
		opacity:0.94;
		border-radius:10upx;
		line-height: 96upx;
		text-align: center;
		margin: 0 auto;
		margin-top: 75upx;
		font-size:34upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(245,245,245,1);
	}
	.wrap{
		width: 100%;
		background-color: #eee;
		.choose{
			box-sizing: border-box;
			width: 706upx;
			height: 284upx;
			margin: 20upx auto;
			padding: 38upx 30upx;
			background-color: #fff;
			.named{
				margin-right: 390upx;
				font-size: 32upx;
				color: #151414;
				line-height: 76upx;
			}
			.called{
				.blue{
					color: #42A2EC;
					font-size: 32upx;
				}
				image{
					margin: 0 0 0 12upx;
				}
			}
			.con{
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
			}
			.con.top{
				margin-top: 20upx;
				.left{
					border-right: 1upx solid #E6E8ED;
				}
				.left,.right{
					width: 50%;
					text-align: center;
					font-size: 40upx;
					font-weight: bolder;
					color: #333;
					.tit{
						display: inline-block;
						color: #888;
						font-size: 30upx;
						margin-bottom: 24upx;
						font-weight: 100;
					}
				}
			}
		}
		.word{
			box-sizing: border-box;
			width: 706upx;
			// height: 702upx;
			margin: 20upx auto;
			background-color: #fff;
			padding: 78upx 29upx;
			
			.main{
				margin: 0upx auto;
				font-size: 28upx;
				color: #888;
				text{
					display: block;
					margin-bottom: 41upx;
				}
			}
		}
	}
</style>
