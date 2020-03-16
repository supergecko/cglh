<template>
	<view class="wrap">
		<view class="choose">
			<view class="con" @click="openPopup">
				<view class="named">选择币种</view>
				<view class="called">
					<text class="blue">{{coinName}}</text>
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
		<view class="main">
			<view class="con">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view>提币地址</view>
					<view style="height: 44upx;" @click="scanning">
						<image src="../../static/scan.png" mode="" style="width:44upx;height: 44upx;"></image>
					</view>
				</view>
				<view>
					<input class='address' type="text" value="" placeholder="请输入提币的钱包地址" v-model="withdraw.address"  style="width:646upx;"/>
					<!-- <image class='a-img' src="../../static/images/down.png" mode="" style="width:30upx;height: 18upx;"></image> -->
				</view>
			</view>
			<view class="con">
				<view>
					<text>提币数量</text>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<input class='address' type="text" value="" placeholder="最小提币X个" style="width: 560upx;" v-model="withdraw.number"/>
					<view class='blue' style='color:#42A2EC' @click="maxNumber">最大</view>
				</view>
			</view>
			<view class="con" v-if="memoFlag">
				<view>
					<text>MEMO</text>
				</view>
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<input class='address' type="text" value="" placeholder="请输入MEMO" style="width: 560upx;" v-model="withdraw.memo"/>
				</view>
			</view>
			<view class="con">
				<view>
					<text>网络手续费</text>
					<text class='num'>0.5%</text>
				</view>
			</view>
			<view class="con">
				<view>
					<text>到账数量</text>
					<text class='num'>{{quantum}}</text>
				</view>
			</view>
			<view class="but" @click="checkWithdraw">确认提币</view>
			<view class="word">
				<text>注意：</text><br/>
				<text>1. 单笔转出最小币数 0.01 BTC，单日转出最大币数 200 BTC</text><br/>
				<text>2. 禁止向BTC地址充值除BTC 之外的资产，任何充入BTC 地址的非BTC 资产将不可找回。</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				coinName:'BTC',
				coinArry:[],
				asset:{},
				memoFlag:false,
				withdraw:{
					address:'',
					number:'',
					currency_id:'',
					memo:''
				},
				quantum:0 // 到账数量
			}
		},
		onLoad(option){
			this._currency()
		},
		methods: {
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			},
			// 确认提币
			checkWithdraw() {
				if (this.withdraw.address === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入提币的钱包地址'
					});
					return
				}
				if (this.withdraw.number === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入提币数量'
					});
					return
				}
				if (this.withdraw.memo === '' && this.coinName=='EOS') {
					uni.showToast({
						icon: 'none',
						title: '请输入MEMO'
					});
					return
				}
				if (this.withdraw.number <0.01) {
					uni.showToast({
						icon: 'none',
						title: '单笔转出最少 0.01 BTC'
					});
					return
				}
				if (this.withdraw.number > 200) {
					uni.showToast({
						icon: 'none',
						title: '单日转出最大币数 200 BTC'
					});
					return
				}
				uni.navigateTo({
					url:`../assets/transverify?currency_id=${this.withdraw.currency_id}&balance=${this.withdraw.number}&address=${this.withdraw.address}&memo=${this.withdraw.memo}`
				})
			},
			// 扫描图片
			scanning() {
				const _this = this
				uni.scanCode({
				    success: function (res) {
				        // console.log('条码类型：' + res.scanType);
				        // console.log('条码内容：' + res.result);
						_this.withdraw.address = res.result
				    },
					fail: function(err){
						console.log(err)
					}
				});
			},
			// 可用的最大提币数量
			maxNumber() {
				this.withdraw.number = this.asset.used
			},
			checkPopup(item) {
				this.$refs.popup.close()
				this.coinName = item.title
				this.asset = item.asset
				this.withdraw.currency_id = item.asset.currency_id
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
						this.coinArry = res.data.data.asset
						this.asset = res.data.data.asset[0].asset
						this.withdraw.currency_id = res.data.data.asset[0].asset.currency_id
					}
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
			'withdraw.number' (newName, oldName) {
				this.quantum = parseFloat(newName) - (parseFloat(newName)*0.005)
				this.quantum = parseFloat(this.quantum).toFixed(7)
				if(this.quantum==='NaN'){
					this.quantum = 0
				}
			}
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
	.wrap{
		width: 100%;
		.choose{
			box-sizing: border-box;
			width: 706upx;
			height: 336upx;
			margin: 20upx auto 0;
			padding: 20upx 30upx 0;
			background: url('../../static/images/getBg.png') no-repeat center/cover;
			.named{
				margin-right: 428upx;
				font-size: 32upx;
				color: #704805;
				line-height: 76upx;
			}
			.called{
				margin-top: 8upx;
				.blue{
					color: #704805;
					font-size: 32upx;
				}
				image{
					margin: 16upx 0 0 12upx;
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
					border-right: 1upx solid #C19F68;
				}
				.left,.right{
					width: 50%;
					text-align: center;
					font-size: 40upx;
					font-weight: bolder;
					color: #563703;
					.tit{
						display: inline-block;
						color: #5E3A01;
						font-size: 30upx;
						margin-bottom: 24upx;
						font-weight: 100;
					}
				}
			}
		}
		.main{
			width: 646upx;
			margin: 0 auto;
			.con{
				font-size: 32upx;
				line-height: 58upx;
				border-bottom: 1upx solid #E6E8ED;
				padding: 20upx 0;
				.address{
					color: #AFADAD;
					display: inline-block;
				}

				// .a-img{
				// 	margin-left: 250upx;
				// 	margin-bottom: 14upx;
				// }
				.blue{
					float: right;
				}
				.num{
					float: right;
				}
			}
			.but{
				width: 100%;
				height: 96upx;
				line-height: 96upx;
				font-size: 34upx;
				background-color: #42A2EC;
				color: #fff;
				border-radius: 10upx;
				text-align: center;
				margin: 62upx 0  49upx 0;
			}
			.word{
				font-size: 28upx;
				color: #666;
				margin-bottom: 30upx;
				text{
					display: block;
				}
			}
		}
	}
</style>
