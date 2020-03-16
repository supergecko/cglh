<template>
	<view class="wrap">
		<view class="increase">
			<view class="main">
				<view style='width: 100%;height:264upx;border-radius:10upx;'  @click="toDetails(`../strategySquare/exDetail`)">
					<image src="../../static/newimg/bg.png" style="width: 100%;height: 100%;border-radius:10upx;"></image>
				</view>
				<view class="item2" v-for="(item,i) in myExchangeList" :key="i">
					<view style="display: flex;">
						<view><image src="../../static/newimg/fcoin.png" style='width: 80upx;height:80upx;'></image></view>
						<view style="margin-left: 20upx;">
							<view style="color:#171719;font-size: 30upx;">{{item.title}}</view>
							<view style="color:#666;font-size: 24upx;">{{item.discounts}}</view>
						</view>
					</view>
					<view class="but" style='background-color:#3B88FA;margin-top:10upx;'  @click="toDetails(`../strategySquare/alterExchange?userBourseId=${item.user_bourse_id}&title=${item.title}&bourseId=${item.bourse_id}`)">修改</view>
				</view>
				<view class="addbut" @click="toDetails(`../strategySquare/addExchange`)">
					<image src="../../static/newimg/add.png"  style="width: 98upx;height:120upx;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'strategyExchange',
		data() {
			return {
				myExchangeList:[]
			}
		},
		onLoad() {
			
		},
		methods:{
			toPath(URL){
				uni.navigateTo({
					url:URL
				})
			},
			toDetails(URL){
				uni.navigateTo({
					url:URL
				})
			},
			//我的交易所列表
			_My_bourse(){
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
				let params = {timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.My_bourse,
					data: params
				}).then((res) => {
					uni.hideLoading()
					if (res.data.code == 1) {
						//初始化信息
						this.myExchangeList = res.data.data
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
			
		}
	}
</script>


<style lang="scss" scoped>
	.wrap{
		width: 100%;
		background-color: #fff;
		font-family: PingFang-SC-Bold;
		.increase{
			width: 710upx;
			margin: 0 auto;
			.main{
				.item2{
					box-sizing:border-box;
					display: flex;
					width: 100%;
					height: 176upx;
					padding: 48upx 37upx 48upx 30upx;
					border-radius:10upx;
					margin-top: 24upx;
					box-shadow: 2upx 2upx 8upx #aaa;
					justify-content: space-between;
					.but{
						margin-right: 0;
					}
				}
				.addbut{
					position: fixed;
					right: 10upx;
					bottom: 50px;
					width: 98upx;
					height: 120upx;
				}
				.but{
					width: 116upx;
					height: 60upx;
					margin-right: 14upx;
					line-height: 60upx;
					text-align: center;
					color: #fff;
					font-size: 28upx;
					border-radius: 30upx;
				}
			}
		}
	}
</style>
