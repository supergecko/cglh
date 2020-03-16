<template>
	<view class="wrap">
		<view class="header">
			<!-- <view class="tit" style="color:#fff;text-align:center;font-size:38upx;font-family:'PingFang-SC-Medium';display:flex;">
				<view><image src="../../static/images/left2.png" mode="" style="width:50upx;height:50upx;margin: 0 230upx 0 20upx;"></image> </view>
				 <view>理财记录</view>
			</view> -->
			<view class="con" v-if="manageRecord">
				<view class="conitem" >
					<view>{{manageRecord.financing_name}}</view>
					<view class="item1" v-bind:class="{ BTN2: manageRecord.status===2}">
					{{manageRecord.status===1? '计息中':
						manageRecord.status===2? '已结束':''}}</view>
				</view>
				<view class="main">
					<view class="item" style="text-align: center;">
						<view style="font-weight:bolder;">{{manageRecord.bonus}}{{manageRecord.currency_title}}</view>
						<view style="font-size:30upx;color: #888;">预估总收益</view>
					</view>
					<!-- <view class="item">
						<view style="font-weight:bolder;">0.003{{manageRecord.currency_title}}</view>
						<view style="font-size:30upx;color: #888;">今日预估收益</view>
					</view> -->
				</view>
			</view>
		</view>
		<view class="new">
			<!-- <view class="named">
				<view class="n-tit">
					<text class="way">认购份数</text>
				</view>
				<view class="n-tit">
					<text class="num">{{manageRecord.amount}}份</text><br/>
				</view>
			</view> -->
			<view class="named">
				<view class="n-tit">
					<text class="way">认购数量</text>
				</view>
				<view class="n-tit">
					<text class="num">{{manageRecord.amount}} {{manageRecord.currency_title}}</text><br/>
				</view>
			</view>
			<view class="named no">
				<view class="n-tit">
					<text class="way">认购时间</text>
				</view>
				<view class="n-tit">
					<text class="num">{{manageRecord.create_time}}</text><br/>
				</view>
			</view>
		</view>	
		<view class="shop">
			<view class="named">
				<view class="s-tit sm">
					<text class="way">项目名称</text><br/>
				</view>	
				<view class="s-tit">
					<text class="num">{{manageRecord.name}}</text><br/>
				</view>
			</view>	
			<view class="named">		
				<view class="s-tit">
					<text class="way">预期年化利率</text>
				</view>
				<view class="s-tit">
					<text class="num">{{manageRecord.rate}}%</text><br/>
				</view>
			</view>
			<view class="named">
				<view class="s-tit">
					<text class="way">投资期限</text>
				</view>
				<view class="s-tit">
					<text class="num">{{manageRecord.cycle_day}}天</text><br/>
				</view>
			</view>
			<view class="named">
				<view class="s-tit">
					<text class="way">起息时间</text>
				</view>
				<view class="s-tit">
					<text class="num">{{manageRecord.start_time}}</text><br/>
				</view>
			</view>
			<view class="named no">
				<view class="s-tit">
					<text class="way">回款时间</text>
				</view>
				<view class="s-tit">
					<text class="num">{{manageRecord.end_time}}</text><br/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex'
	export default{
		computed: {
		    ...mapState(['hasLogin']),
		},
		data () {
			return{
				manageRecord: []
			}
		},
		methods:{
			_manageRecord(userFinancingId) {
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
				const user_financing_id = userFinancingId
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${user_financing_id}**${timestamp}**cglhhaofengshui`)
				let params = {user_financing_id,timestamp,sign}
				this.$ajax.post({
					url: this.$service.api_lists.manageRecord,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.manageRecord = res.data.data
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
			toPath(userFinancingId){
				uni.navigateTo({
					url:`../myManagement/manageRecord?userFinancingId=${userFinancingId}`
				})
			}
		},
		onLoad(option) {
			if (!this.hasLogin) {
			   uni.reLaunch({
			      url: '../login/login'
			  })
			  return;
			}
			this._manageRecord(option.userFinancingId)
		}
	}
</script>

<style lang="scss" scoped>
	.BTN2{
		border:1px solid rgba(7,169,60,1)!important;
		color:rgba(7,169,60,1)!important;
	}
	.wrap{
		width: 100%;
		background-color: #F8F8F8;
		font-family: PingFang-SC-Medium;
		.header{
			position:relative;
			width: 100%;
			height: 382upx;
			padding-top: 40upx;
			background: url(../../static/images/manageBg.png) no-repeat center/cover;		 
			.con{
				box-sizing: border-box;
				width: 706upx;
				height: 288upx;
				margin: 40upx auto;
				padding-top: 38upx;
				background-color: #fff;
				border-radius: 10upx;
				box-shadow: 1upx 2upx 10upx #E6E8ED;	
				.conitem,.main{
					display: flex;
					align-items: center;
					justify-content: center;
					color: #171719;
					font-size: 36upx;
					.item1{
						display:inline-block;
						width: 104upx;
						height: 44upx;
						margin-left: 24upx;
						line-height: 44upx;
						text-align: center;
						border:1px solid rgba(66,162,236,1);
						color:rgba(66,162,236,1);
						font-size:24upx; 
					}
				}
				.main{
					margin-top: 30upx;
					padding-left: 15upx;
					line-height: 70upx;
				}
			}
		}
		.new,.shop{
			width: 706upx;
			margin: 25upx auto;
			background-color: #fff;
			box-shadow: 1upx 2upx 10upx #E6E8ED;	
			.named{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-left: 30upx;
				padding-right: 30upx;
				border-bottom: 1upx solid #E6E8ED;
				.n-tit{
					font-size: 32upx;	
					line-height: 106upx;
					.way{
						color: #151414;
					}
					.num{
						color: #666;
					}
				}
				.divide{
					margin-top: 20upx;
				}
			}
			.named.no{
				border: none;
			}
		}
		.shop{
			.named{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-left: 30upx;
				padding-right: 30upx;
				border-bottom: 1upx solid #E6E8ED;
				.s-tit{
					font-size: 32upx;	
					line-height: 106upx;
					.way{
						color: #151414;
					}
					.w-num{
						font-size: 22upx;
						color: #999;
					}
					.num{
						color: #666;
					}
				}
				.s-tit.sm{
					padding: 30upx 0;
					line-height: 50upx;
				}
			}
			.named.no{
				border: none;
			}
		}
	}
</style>
