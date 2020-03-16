<template>
	<view class="wrap">
		<view class="con">
			<view @click="openPopup">
				<text>选择币种</text>
				<view style="float: right;">
					<text class="txt" v-show="coinFlag" style="color: #888888;">请选择币种</text>
					<text class="gray" v-show="!coinFlag">{{coinName}}</text> 
					<image src="../../static/right.png" mode="" style="width:18upx;height:30upx;vertical-align:-5upx;margin-left: 30upx;"></image>
				</view>
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
		<view class="con">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<text>提币地址</text>
				<view @click="scanning">
					<image src="../../static/scan.png" mode="" style="width:46upx;height: 46upx;float:right;"></image>
				</view>
			</view>
			<view>
				<input type="text" v-model="address" placeholder="请输入提币的钱包地址"/>
			</view>
		</view>
		<view class="con" v-if="memoFlag">
			<view>
				<text>MEMO</text>
			</view>
			<view>
				<input type="text" v-model="memo" placeholder="请添加该地址的MEMO"/>
			</view>
		</view>
		<view class="con">
			<view>
				<text>备注</text>
			</view>
			<view>
				<input type="text" v-model="remarks" placeholder="请添加该地址的备注信息"/>
			</view>
		</view>
		<view class="but" @click="_modifyAddress">修改</view>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		components: {
			uniPopup
		},
		data () {
			return{
				coinName:'',
				coinId:0,
				coinArry:[],
				coinFlag: true, // 币种flag
				memoFlag:false,
				address:'',
				memo:'',
				remarks:'',
				bank_id:''
			}
		},
		onLoad(option){
			this.bank_id = option.bank_id
			this._currency()
		},
		methods:{
			toPath (URL) {
				uni.navigateTo({
					url:URL
				})
			},
			checkPopup(item) {
				this.$refs.popup.close()
				this.coinName = item.title
				this.coinId = item.currency_id
				this.coinFlag = false
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
					url: this.$service.api_lists.currency,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.coinArry = res.data.data
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
			},
			
			// 编辑提币地址
			_modifyAddress() {
				if (this.coinName === '') {
					uni.showToast({
						icon: 'none',
						title: '请选择币种'
					});
					return;
				}
				if (this.address === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入提币的钱包地址'
					});
					return;
				}
				if (this.coinName === 'EOS' && this.memo === '') {
					uni.showToast({
						icon: 'none',
						title: '请添加该地址的MEMO'
					});
					return;
				}
				if (this.remarks === '') {
					uni.showToast({
						icon: 'none',
						title: '请添加该地址的备注信息'
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
				const bank_id = this.bank_id
				const currency_id = this.coinId
				const address = this.address
				const bank_memo = this.memo
				const description = this.remarks
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${bank_id}**${currency_id}**${address}**${bank_memo}**${description}**${timestamp}**cglhhaofengshui`)
				let params = {
					bank_id,
					currency_id,
					address,
					bank_memo,
					description,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.modifyAddress,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
						    title: res.data.msg,
						    duration: 2000
						})
					}
					uni.navigateBack({
						delta: 1 // 代表返回上 1 页
					})
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					});
				})
			},
			// 扫描图片
			scanning() {
				const _this = this
				uni.scanCode({
				    success: function (res) {
				        // console.log('条码类型：' + res.scanType);
				        // console.log('条码内容：' + res.result);
						_this.address = res.result
				    },
					fail: function(err){
						console.log(err)
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		border-bottom: 1upx solid #E6E8ED;
		.con{
			font-size: 32upx;
			line-height: 70upx;
			margin-left: 30upx;
			border-bottom: 1upx solid #E6E8ED;
			padding: 26upx 30upx 26upx 0;
			.named{
				margin-right: 390upx;
				font-size: 32upx;
				color: #151414;
				line-height: 76upx;
			}
			.called{
				.gray{
					color: #818181;
					font-size: 32upx;
				}
				image{
					margin: 16upx 0 0 12upx;
				}
			}
			.address{
				color: #AFADAD;
			}
		}
		.but{
			width: 690upx;
			height: 96upx;
			margin: 61upx auto;
			line-height: 96upx;
			color: #fff;
			font-size: 34upx;
			border-radius: 10upx;
			text-align: center;
			background-color: #42A2EC;
		}
	}
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
</style>
