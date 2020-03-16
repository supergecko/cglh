<template>
	<view class="wrap">
		<view class="header">
			<view class="h-img item1" @click="openPopup">
				<text>{{coinName}}账户</text><image class="img" src="../../static/down.png" mode="" style="width: 30upx;height: 16upx;margin-left: 20upx;"></image>
			</view>
			<view class="h-img item2">
				<text style='font-size: 26upx;'>可用余额</text><br/>
				<text>{{asset.used}}</text>
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
		<view class="main">
			<view class="con">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view>对方账户</view>
					<input type="text" v-model="withdraw.to_mobile" placeholder="请输入对方手机号码" style='width:500upx;text-align: right;' />
				</view>
			</view>
			<!-- <view class="con" v-if="memoFlag">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view>MEMO</view>
					<input type="text" v-model="withdraw.memo" placeholder="请输入MEMO" style='width:500upx;text-align: right;' />
				</view>
			</view> -->
			<view class="con no">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<text>到账数量</text>
					<input type="text" v-model="withdraw.number" placeholder="请输入到账数量" style='width:500upx;text-align: right;' />
				</view>
			</view>
		</view>
		<view class="but" @click="checkWithdraw">确认划转</view>
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
					to_mobile:'',
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
			// 确认划转
			checkWithdraw() {
				if (this.withdraw.to_mobile === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入对方手机号码'
					});
					return
				}
				// if (this.withdraw.memo === '' && this.coinName=='EOS') {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '请输入MEMO'
				// 	});
				// 	return
				// }
				if (this.withdraw.number === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入到账数量'
					});
					return
				}
				uni.navigateTo({
					url:`../assets/transverify2?currency_id=${this.withdraw.currency_id}&to_mobile=${this.withdraw.to_mobile}&number=${this.withdraw.number}&memo=${this.withdraw.memo}`
				})
			},
			checkPopup(item) {
				this.$refs.popup.close()
				this.coinName = item.title
				this.asset = item.asset
				this.withdraw.currency_id = item.asset.currency_id
				// if(this.coinName=='EOS'){
				// 	this.memoFlag = true
				// } else{
				// 	this.memoFlag = false
				// }
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
		}
	}
</script>

<style lang="scss" scoped>
	page{background-color: #F5F5F5;}
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
		.header{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 10upx auto;
			color: #fff;
			font-size: 32upx;
			.h-img{
				box-sizing: border-box;
				width: 370upx;
				height: 214upx;
				padding: 60upx 0 0 60upx;
				background: url(../../static/images/transBg1.png) no-repeat;
			}
			.h-img.item2{
				padding-top: 30upx;
				line-height: 60upx;
				background: url(../../static/images/transBg2.png) no-repeat;
			}
		}
		.main{
			width: 706upx;
			// height: 222upx;
			margin: 20upx auto;
			background-color: #fff;
			.con{
				box-sizing: border-box;
				font-size: 32upx;
				line-height: 58upx;
				border-bottom: 1upx solid #E6E8ED;
				padding: 26upx 30upx 26upx 0;
				margin-left: 30upx;
				.address{
					color: #AFADAD;
				}
				image{
					display: inline-block;
					margin-left: 474upx;
					vertical-align: -4upx;
				}
				.a-img{
					margin-left: 296upx;
				}
				.blue{
					float: right;
				}
				.num{
					float: right;
				}
			}
			.con.no{
				border: none;
			}
			
		}
		.but{
			width: 704upx;
			height: 94upx;
			margin: 68upx auto;
			line-height: 94upx;
			text-align: center;
			border-radius: 10upx;
			color: #fff;
			background-color: #42A2EC;
		}
	}
</style>
