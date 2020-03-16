<template>
	<view>
		<view style="height: 1upx;width: 750upx;background:rgba(230,232,237,1);"></view>
		<view v-for="(item,i) in withdawingArry" :key="i">
			<view class="recordItem">
				<view class="recordItemHead">
					<view style="display: flex;align-items: center;">
						<view class="ItemHeadText1">
							{{item.type==="recharge"?'充币' : '提币'}}
						</view>
						<view class="ItemHeadText2">{{item.currency_title}}</view>
					</view>
					<view class="ItemHeadText3">{{item.create_time}}</view>
					<!-- <view class="ItemHeadText4">
						{{item.status===0? '审核中':
						item.status===1? '到账':
						item.status===2? '拒绝':
						item.status===3? '撤单':''}}
					</view> -->
				</view>
				<view class="recordItemMiddle">
					<view>数量({{item.currency_title}})</view>
					<view style="margin-left: -48upx;" v-if="item.type!=='recharge'">手续费</view>
					<view>状态</view>
				</view>
				<view class="recordItemMiddle recordItemFooter">
					<view>{{item.balance}}</view>
					<view v-if="item.type!=='recharge'">0.23</view>
					<view>{{item.status===0? '审核中':
						item.status===1? '到账':
						item.status===2? '拒绝':
						item.status===3? '撤单':''}}</view>
				</view>
				<view></view>
			</view>
			<view style="width:698upx;height:2upx;background:rgba(230,232,237,1);margin-left: 52upx;"></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				withdawingArry:[]
			}
		},
		onLoad() {
			this._recharge_withdawing_log()
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				//刷新要执行的方法
				this._recharge_withdawing_log()
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
			// 充提记录接口
			_recharge_withdawing_log() {
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
				const currency_id = '' // 可为空
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${currency_id}**${timestamp}**cglhhaofengshui`)
				let params = {currency_id,timestamp,sign}
				this.$ajax.post({
					url: this.$service.api_lists.recharge_withdawing_log,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						// 初始化信息
						this.withdawingArry = res.data.data.list
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
		}
	}
</script>

<style>
	.recordItemMiddle{
		font-size:26upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(136,136,136,1);
		display: flex;
		justify-content: space-between;
		margin-top: 26upx;
	}
	.recordItemFooter{
		font-size:34upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(21,20,20,1);
	}
	.recordItem{
		height: 220upx;
		padding-left: 52upx;
		padding-right: 52upx;
		box-sizing: border-box;
	}
	.recordItemHead{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 26upx;
	}
	/* 默认蓝色按钮 */
	.ItemHeadText1{
		width:80upx;
		height:42upx;
		background:linear-gradient(90deg,rgba(85,171,238,1) 0%,rgba(121,189,243,1) 100%);
		border-radius:4upx;
		font-size:26upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 42upx;
	}
	/* 橘色按钮 */
	.orangeBtn{
		background:linear-gradient(90deg,rgba(243,162,105,1) 0%,rgba(253,185,135,1) 100%);
	}
	.ItemHeadText2{
		font-size:34upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(21,20,20,1);
		margin-left: 21upx;
	}
	.ItemHeadText3{
		font-size:26upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(136,136,136,1);
	}
	.ItemHeadText4{
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(250,152,82,1);
		float: right;
	}
</style>
