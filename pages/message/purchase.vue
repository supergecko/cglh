<template>
	<view class="wrap">
		<view class="line"></view>
		<view class="new">
			<view class="named">
				<view class="n-tit"><text class="way">项目名称</text></view>
				<view class="n-tit">
					<text class="num">{{ presaleInfo.activity_title }}</text>
					<br />
				</view>
			</view>
			<view class="named no">
				<view class="n-tit"><text class="way">剩余可投</text></view>
				<view class="n-tit">
					<text class="num">{{ presaleInfo.rest }} {{ presaleInfo.currency_title }}</text>
					<br />
				</view>
			</view>
		</view>
		<view class="shop">
			<view class="named" style="display: flex;align-items: center;justify-content: space-between;">
				<view class="s-tit sm">
					<text class="way">认购份数</text>
					<br />
					<text class="w-num">最低认购{{ presaleInfo.min_buy_money }}份，最高认购{{ presaleInfo.max_buy_money }})份（每份1{{ presaleInfo.currency_title }})</text>
				</view>
				<view class="s-tit"><input placeholder="请输入认购数量" v-model="number" style="text-align: right;" /></view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;padding-left: 32upx;padding-right: 32upx;margin-top: 20upx;">
				<view style="color: #666;font-size: 33upx;">是否全部认购</view>
				<switch @change="switch1Change" />
			</view>
			<view class="named no">
				<view class="s-tit"><text class="way">可用数量</text></view>
				<view class="s-tit">
					<text class="num">{{ presaleInfo.assets }} {{ presaleInfo.currency_title }}</text>
					<br />
				</view>
			</view>
		</view>
		<view class="but">
			<view class="choose">
				<label>
					<radio style="font-size: 30upx;" :checked="chooseCla" @click="toggleChooseCla" />
					<text class="c-txt">
						我已阅读并同意
						<text class="blue">《BQcoin理财投资服务协议》</text>
					</text>
				</label>
			</view>
			<view class="rush" @click="_checkSecurityPasswordAuth">立即抢购</view>
		</view>
		<chunLei-modal v-model="value" :mData="inputData" type="input" @onConfirm="onConfirm" @cancel="cancel" navMask></chunLei-modal>
	</view>
</template>
<script>
import chunLeiModal from '@/components/chunLei-modal/chunLei-modal.vue';
export default {
	components: {
		chunLeiModal
	},
	data() {
		return {
			value: false,
			inputData: {
				title: '输入资金密码',
				content: [{ title: '密码', content: '', type: 'password', placeholder: '请输入资金密码' }]
			},
			presaleInfo: {},
			number: '', // 认购数量
			activity_product_id: 0,
			activity_id: 0,
			chooseCla: true,
			hour: 0 // 资金密码时效
		};
	},
	onLoad(option) {
		this.activity_product_id = option.activity_product_id;
		this.activity_id = option.activity_id;
		this._presale(option.activity_product_id, option.activity_id);
	},
	methods: {
		switch1Change: function(e) {
			if (e.target.value === true) {
				if (parseFloat(this.presaleInfo.assets) > this.presaleInfo.rest) {
					this.number = this.presaleInfo.rest;
				} else {
					this.number = this.presaleInfo.assets;
				}
			} else {
				this.number = '';
			}
		},
		//选择仓位输入框确认
		onConfirm(e) {
			if (e[0].content === '') {
				console.log('为空' + e[0].content);
			} else {
				console.log('不为空' + e[0].content);
				this._securityPasswordAuthAgain(e[0].content);
			}
		},
		//选择仓位输入框取消
		cancel() {},
		toggleChooseCla() {
			this.chooseCla = !this.chooseCla;
		},
		// 检验资金密码
		_securityPasswordAuthAgain(PassWord) {
			const mobile = uni.getStorageSync('user_mobile');
			const password = PassWord;
			const timestamp = Date.parse(new Date()) / 1000;
			const sign = this.$md5(`${mobile}**${password}**${timestamp}**cglhhaofengshui`);
			let params = { password, timestamp, sign };
			this.$ajax
				.post({
					url: this.$service.api_lists.securityPasswordAuthAgain,
					data: params
				})
				.then(res => {
					if (res.data.code == 1) {
						//初始化信息
						this._buyPresale();
					}
					uni.hideLoading();
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err,
						duration: 2000
					});
				});
		},
		// 校验资金密码时效性
		_checkSecurityPasswordAuth() {
			let lowDissipation = 0;
			if (this.number === '') {
				uni.showToast({
					icon: 'none',
					title: '请输入认购数量'
				});
				return;
			}
			if (this.chooseCla === false) {
				uni.showToast({
					icon: 'none',
					title: '请勾选服务协议'
				});
				return;
			}
			if (parseFloat(this.presaleInfo.assets) > this.presaleInfo.rest) {
				lowDissipation = this.presaleInfo.rest;
			} else {
				lowDissipation = this.presaleInfo.assets;
			}
			if (lowDissipation < this.presaleInfo.rest) {
				if (this.number > lowDissipation) {
					uni.showToast({
						icon: 'none',
						title: '可用数量不足'
					});
					this.number = this.presaleInfo.assets;
					return;
				}
			} else {
				if (this.number > lowDissipation) {
					uni.showToast({
						icon: 'none',
						title: `最高认购${this.presaleInfo.rest}`
					});
					this.number = this.presaleInfo.rest;
					return;
				}
			}
			uni.getNetworkType({
				success: res => {
					if (res.networkType == 'none') {
						uni.showToast({
							icon: 'none',
							title: '当前网络不可用'
						});
					}
				}
			});
			uni.showLoading({
				title: '加载中'
			});
			const mobile = uni.getStorageSync('user_mobile');
			const timestamp = Date.parse(new Date()) / 1000;
			const sign = this.$md5(`${mobile}**${timestamp}**cglhhaofengshui`);
			let params = { timestamp, sign };
			this.$ajax
				.post({
					url: this.$service.api_lists.checkSecurityPasswordAuth,
					data: params
				})
				.then(res => {
					if (res.data.code == 1) {
						//初始化信息
						this.hour = res.data.data.hour;
						console.log(res.data.data.status);
						switch (res.data.data.status) {
							//未设置安全密码
							case 1:
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								});
								break;
							//未设置安全密码时效
							case 2:
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								});
								break;
							//未设置安全密码时效过期  可以输入密码
							case 3:
								this.value = !this.value;
								break;
							//直接过
							default:
								// uni.showToast({
								// 	icon: 'none',
								// 	title: res.data.msg
								// });
								this._buyPresale();
						}
					}
					uni.hideLoading();
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err,
						duration: 2000
					});
				});
		},
		// 加载认购信息
		_presale(activityPId, activityId) {
			uni.getNetworkType({
				success: res => {
					if (res.networkType == 'none') {
						uni.showToast({
							icon: 'none',
							title: '当前网络不可用'
						});
					}
				}
			});
			uni.showLoading({
				title: '加载中'
			});
			const mobile = uni.getStorageSync('user_mobile');
			const activity_product_id = activityPId;
			const activity_id = activityId;
			const timestamp = Date.parse(new Date()) / 1000;
			const sign = this.$md5(`${mobile}**${activity_id}**${activity_product_id}**${timestamp}**cglhhaofengshui`);
			let params = { activity_product_id, activity_id, timestamp, sign };
			this.$ajax
				.post({
					url: this.$service.api_lists.presale,
					data: params
				})
				.then(res => {
					if (res.data.code == 1) {
						//初始化信息
						this.presaleInfo = res.data.data;
					}
					uni.hideLoading();
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err,
						duration: 2000
					});
				});
		},
		// 进行认购
		_buyPresale() {
			uni.getNetworkType({
				success: res => {
					if (res.networkType == 'none') {
						uni.showToast({
							icon: 'none',
							title: '当前网络不可用'
						});
					}
				}
			});

			uni.showLoading({
				title: '加载中'
			});
			const mobile = uni.getStorageSync('user_mobile');
			const activity_product_id = this.activity_product_id;
			const activity_id = this.activity_id;
			const amount = this.number;
			const timestamp = Date.parse(new Date()) / 1000;
			const sign = this.$md5(`${mobile}**${activity_id}**${activity_product_id}**${amount}**${timestamp}**cglhhaofengshui`);
			let params = { activity_product_id, activity_id, amount, timestamp, sign };
			this.$ajax
				.post({
					url: this.$service.api_lists.buyPresale,
					data: params
				})
				.then(res => {
					if (res.data.code == 1) {
						//初始化信息
						console.log(res.data.msg);
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
						const this_ = this
						setTimeout(function() {
							this_._presale(this_.activity_product_id, this_.activity_id);
						}, 1000);
					}
					uni.hideLoading();
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err,
						duration: 2000
					});
				});
		}
	}
};
</script>
<style lang="scss" scoped>
page {
	background-color: #f8f8f8;
}

.line {
	width: 100%;
	height: 1upx;
	background-color: #e6e8ed;
}
.wrap {
	background-color: #f8f8f8;
	.new {
		background-color: #fff;
		.named {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-left: 30upx;
			padding-right: 30upx;
			border-bottom: 1upx solid #e6e8ed;

			.n-tit {
				font-size: 32upx;
				line-height: 106upx;

				.way {
					color: #151414;
				}
				.num {
					color: #666;
				}
			}

			.divide {
				margin-top: 20upx;
			}
		}
		.named.no {
			border: none;
		}
	}
	.shop {
		background-color: #fff;
		margin-top: 20upx;
		.named {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-left: 30upx;
			padding-right: 30upx;
			border-bottom: 1upx solid #e6e8ed;
			.s-tit {
				font-size: 32upx;
				line-height: 106upx;
				.way {
					color: #151414;
				}
				.w-num {
					font-size: 22upx;
					color: #999;
				}
				.num {
					color: #666;
				}
			}
			.s-tit.sm {
				padding: 30upx 0 0 0;
				line-height: 34upx;
			}
		}
		.named.no {
			border: none;
		}
	}
	.but {
		padding: 30upx;
		.choose {
			font-size: 26upx;
			color: #666;
			.blue {
				color: #42a2ec;
			}
			.c-txt {
				vertical-align: -5upx;
			}
		}
		.agree {
			transform: scale(0.6);
		}
		.rush {
			width: 690upx;
			height: 96upx;
			background-color: #e98135;
			color: #fff;
			line-height: 96upx;
			text-align: center;
			border-radius: 10upx;
			margin-top: 76upx;
		}
	}
}
</style>
