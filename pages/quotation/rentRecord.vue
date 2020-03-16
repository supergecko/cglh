<template>
	<view class="wrap">
		<view class="main">
			<view class="inv-h-w">
				<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">{{title1}}</view>
				<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">{{title2}}</view>
				<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">{{title3}}</view>
			</view>
			<view class="list info" v-show="Inv == 0" style='padding:0'>
				<view>
					<view class="i-con" v-for="(item,i) in doing" :key='i'>
						<view class="attribute top" style="display: flex;justify-content: space-between;">
							<view style="display: flex;align-items: center;">
								<text class='band green' style="margin-right: 35upx;">租入</text>
								<text style="margin-right: 35upx;">{{item.title}}</text>
								<text class="small">{{item.create_time}}</text>
							</view>
							<view>
								<switch checked @change="switch1Change" />
							</view>
						</view>
						<view class="attribute center">
							<text>租金(ETH/月)</text>
							<text>数量(ETH)</text>
							<text>当前收益(BTC)</text>
							<text>年化收益率(%)</text>
						</view>
						<view class="attribute" style="font-size: 30upx;font-weight:bolder; text-align: center;">
							<text style='display:inline-block;margin-right: -80upx;'>{{item.price}}</text>
							<text style='display:inline-block;margin-right: -60upx;'>{{item.number}}</text>
							<text>{{item.bonus}}</text>
							<text style='display:inline-block;margin-right: 30upx;'>{{item.rates}}%</text>
						</view>
					</view>
				</view>
				<view class="but">确认提交</view>
				<view style='width:100%;display:inline-block;text-align:center; font-size:28upx;color:#666;'>联系我们：18965904532（林经理）</view>
			</view>
			<view class="list info" v-show="Inv == 1" style='padding:0'>
				<view>
					<view class="i-con" v-for="(item,i) in end" :key='i'>
						<view class="attribute top" style="display: flex;justify-content: space-between;">
							<view style="display: flex;align-items: center;">
								<text class='band green' style="margin-right: 35upx;">租入</text>
								<text style="margin-right: 35upx;">ETH策略</text>
								<text class="small">04-25 14:21</text>
							</view>
							<view>
								<switch checked @change="switch1Change" />
							</view>
						</view>
						<view class="attribute center">
							<text>租金(ETH/月)</text>
							<text>数量(ETH)</text>
							<text>当前收益(BTC)</text>
							<text>年化收益率(%)</text>
						</view>
						<view class="attribute" style="font-size: 30upx;font-weight:bolder; text-align: center;">
							<text style='display:inline-block;margin-right: -80upx;'>0.030185</text>
							<text style='display:inline-block;margin-right: -60upx;'>10.86</text>
							<text>5.46</text>
							<text style='display:inline-block;margin-right: 30upx;'>5.46%</text>
						</view>
					</view>
				</view>
				<view class="but">确认提交</view>
				<view style='width:100%;display:inline-block;text-align:center; font-size:28upx;color:#666;'>联系我们：18965904532（林经理）</view>
			</view>
			<view class="list info" v-show="Inv == 2" style='padding:0'>
				<view>
					<view class="i-con" v-for="(item,i) in my" :key='i'>
						<view class="attribute top" style="display: flex;justify-content: space-between;">
							<view style="display: flex;align-items: center;">
								<text class='band green' style="margin-right: 35upx;">租入</text>
								<text style="margin-right: 35upx;">ETH策略</text>
								<text class="small">04-25 14:21</text>
							</view>
							<view>
								<switch checked @change="switch1Change" />
							</view>
						</view>
						<view class="attribute center">
							<text>租金(ETH/月)</text>
							<text>数量(ETH)</text>
							<text>当前收益(BTC)</text>
							<text>年化收益率(%)</text>
						</view>
						<view class="attribute" style="font-size: 30upx;font-weight:bolder; text-align: center;">
							<text style='display:inline-block;margin-right: -80upx;'>0.030185</text>
							<text style='display:inline-block;margin-right: -60upx;'>10.86</text>
							<text>5.46</text>
							<text style='display:inline-block;margin-right: 30upx;'>5.46%</text>
						</view>
					</view>
				</view>
				<view class="but">确认提交</view>
				<view style='width:100%;display:inline-block;text-align:center; font-size:28upx;color:#666;'>联系我们：18965904532（林经理）</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Inv:0,
				title1: '租用中',
				title2: '已结束',
				title3: '我的策略',
				doing:[],
				my:[],
				end:[]
			}
		},
		onLoad() {
			this._Lease()
		},
		methods: {
			switch1Change: function (e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			changeTab(Inv){
					that.navIdx = Inv;		 
			},
			//租用记录
			_Lease(){
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
					url: this.$service.api_lists.Lease,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						// 初始化信息
						this.doing = res.data.data.doing
						this.my = res.data.data.my
						this.end = res.data.data.end
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
		},
	}
</script>
<style lang="scss" scoped>
	.wrap{
		width: 100%;
		background-color: #F8F8F8;
		overflow-x: hidden;
	}
	.main{
		padding: 0;
		margin-bottom: 80upx;
		.inv-h-w{
			display: flex;
			width: 100%;
			border-top: 1upx solid #E6E8ED;
			border-bottom: 1upx solid #E6E8ED;
			padding-left: 52upx;
			background-color: #fff;
			.inv-h{
				text-align: center;
				color: #666;
				line-height: 80upx;
				font-size: 28upx;
				margin-right: 60upx;
			}
			.inv-h-se{
				font-size: 32upx;
				color: #42A2EC;
				border-bottom: 6upx solid #5BA7FF;
			}
		}
		.list{
			font-size: 34upx;
			padding-bottom: 30upx;
			color: #151414;
			
			.i-con{
				padding: 36upx 30upx 0;
				border-bottom: 1upx solid #E6E8ED;
				background-color: #fff;
				.attribute{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					margin-bottom: 30upx;
					.band{
						display: inline-block;
						width: 80upx;
						height: 44upx;
						line-height: 44upx;
						text-align: center;
						color: #fff;
						font-size: 24upx;
						border-radius: 5upx;
					}
					.green{
						background-color: #4DBE7F;
					}
					.red{
						background-color: #F77268;
					}
					.open{
						background: url('../../static/images/sopen.png') no-repeat ;
						background-size: 166upx 66upx;
					}
					.close{
						background: url('../../static/images/sclose.png') no-repeat ;
						background-size: 166upx 66upx;
					}
				}
				.attribute.top{
					justify-content: flex-start;
				}
				.attribute.center,.small{
					color: #888;
					font-size: 22upx;
				}
				.small{
					line-height: 42upx;
				}
			}
			.but{
				width: 690upx;
				height: 96upx;
				margin: 62upx auto 140upx;
				line-height: 96upx;
				color: #fff;
				font-size: 34upx;
				text-align: center;
				background-color: #E98135;
				border-radius: 10upx;
			}
		}
	}
</style>

