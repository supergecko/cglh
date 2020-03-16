<template>
	<view class="addressWarp">
		<view v-for="(item, i) in addressList" :key="i" class="ItemWarp">
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-with-animation="true" scroll-left="0">
				<view class="addressItem">
					<view class="itemHeader">
						<view style="margin-left: 30upx;">{{ item.currency_title }}</view>
						<view style="font-size:26upx;font-weight:400;color:rgba(102,102,102,1);margin-right: 31upx;">{{ item.create_time }}</view>
					</view>
					<view class="addressItemText2">{{ item.description }}</view>
					<view class="addressItemText3">{{ item.address }}</view>
				</view>
				<view class="itemBtnWarp">
					<view class="blueBtn" @click="toPage(`../address/editAddress?bank_id=${item.bank_id}`)">编辑</view>
					<view class="pinkBtn" @click="deleAddress(item.bank_id)">删除</view>
				</view>
			</scroll-view>
		</view>
		
		<view style="width: 750upx; height:184upx ;"></view>
		<view class="addressBTn" @click="toPage('../address/addAddress')">添加提币地址</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			addressList: [],
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			leftOffset:120
		};
	},
	onShow() {
		this._addressList();
		this.leftOffset = 0
	},
	onLoad() {
		this._addressList();
	},
	methods: {
		// 删除地址
		deleAddress(bankID) {
			const _this = this
			uni.showModal({
			    title: '提示',
			    content: '是否确定删除该提币地址?',
			    success: function (res) {
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
			            	title: '删除中'
			            });
			            const mobile = uni.getStorageSync('user_mobile')
			            const bank_id = bankID
			            const timestamp = Date.parse(new Date()) / 1000
			            const sign = _this.$md5(`${mobile}**${bank_id}**${timestamp}**cglhhaofengshui`)
			            let params = {bank_id, timestamp, sign}
			            _this.$ajax.post({
			            	url: _this.$service.api_lists.deleteAddress,
			            	data: params
			            }).then((res) => { 
			            	if (res.data.code == 1) {
			            		//初始化信息
			            		uni.showToast({
			            		    title: '删除成功',
			            		    duration: 2000
			            		})
			            	}
							_this._addressList()
			            	uni.hideLoading()
			            }).catch((err) => {
			            	uni.hideLoading()
			            	uni.showToast({
			            		title: err,
			            		duration: 2000
			            	});
			            })
			        } else if (res.cancel) {
			            return
			        }
			    }
			})
		},
		toPage(Url) {
			uni.navigateTo({
				url: Url
			});
		},
		// 拉取钱包地址列表
		_addressList() {
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
			let params = {
				timestamp,
				sign
			};
			this.$ajax
				.post({
					url: this.$service.api_lists.addressList,
					data: params
				})
				.then(res => {
					if (res.data.code == 1) {
						//初始化信息
						this.addressList = res.data.data;
					}
					uni.hideLoading();
					console.log(res);
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err,
						duration: 2000
					});
				});
		},
		
		scroll: function(e) {
			this.old.scrollTop = e.detail.scrollTop
		}
	}
};
</script>
<style>
.itemBtnWarp {
	display: flex;
	position: absolute;
	top: 62upx;
	right: -272upx;
	padding-right: 30upx;
	padding-left: 30upx;
}
.blueBtn {
	width: 112upx;
	height: 112upx;
	background: rgba(91, 178, 246, 1);
	border-radius: 50%;
	font-size: 28upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 112upx;
	text-align: center;
	margin-right: 15upx;
}
.pinkBtn {
	width: 112upx;
	height: 112upx;
	background: rgba(254, 156, 172, 1);
	border-radius: 50%;
	font-size: 28upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	line-height: 112upx;
	text-align: center;
}
.ItemWarp {
	width: 100%;
	position: relative;
	margin-top: 20upx;
}
.addressBTn {
	width: 646upx;
	height: 96upx;
	background: rgba(66, 162, 236, 1);
	opacity: 0.94;
	border-radius: 10px;
	font-size: 32upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
	text-align: center;
	line-height: 96upx;
	position: fixed;
	bottom: 44upx;
}
.addressWarp {
	background: rgb(245, 245, 245);
	width: 750upx;
	display: flex;
	align-items: center;
	flex-direction: column;
	box-sizing: border-box;
}
.addressItem {
	width: 714upx;
	height: 234upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 14upx;
	margin: 0 auto;
	/* margin-top: 30upx; */
	font-size: 34upx;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(23, 23, 25, 1);
}
.itemHeader {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 38upx;
}
.addressItemText2 {
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(119, 119, 119, 1);
	margin-left: 30upx;
	margin-top: 36upx;
}
.addressItemText3 {
	font-size: 32upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(23, 23, 25, 1);
	margin-left: 30upx;
	margin-top: 10upx;
	width: 654upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
