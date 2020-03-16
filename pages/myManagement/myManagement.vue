<template>
	<view style="background: rgb(245,245,245);width: 750upx;">
		<view v-for="(item,i) in myFinancingArr" :key="i" @click="toPath(item.user_financing_id)">
			<view style="height: 2upx;width: 750upx;background:rgba(230,232,237,1);"></view>
			<view class="managementItem">
				<view class="managementItemHead">
					<view>{{item.financing_name}}</view>
					<view class="managementItembTN"
					v-bind:class="{ BTN2: item.status===2}">
						{{item.status===1? '计息中':
						item.status===2? '已结束':''}}
					</view>
				</view>
				<view class="managementItemMiddle">
					<view>{{item.amount}}{{item.currency_title}}</view>
					<view style="margin-left:-82upx;">{{item.rate}}%</view>
					<view style="color: #E98135;">{{item.bonus}}{{item.currency_title}}</view>
				</view>
				<view class="managementItemMiddle managementItemFooter">
					<view>认购数量</view>
					<view>预期年化利率</view>
					<view>预估总收益</view>
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
				myFinancingArr: []
			}
		},
		methods:{
			_myManagement() {
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
				const page = 1
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${page}**${timestamp}**cglhhaofengshui`)
				let params = {page,timestamp,sign}
				this.$ajax.post({
					url: this.$service.api_lists.myFinancing,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.myFinancingArr = res.data.data
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
		onLoad() {
			if (!this.hasLogin) {
			   uni.reLaunch({
			      url: '../login/login'
			  })
			  return;
			}
			this._myManagement()
		}
	}
</script>

<style>
	/* 默认计息中  浅蓝*/
	.managementItembTN{
		width:104upx;
		height:44upx;
		border:1px solid rgba(66,162,236,1);
		border-radius:4upx;
		text-align: center;
		line-height: 44upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(66,162,236,1);
		margin-left: 26upx;
	}
	/* 待到账 绿色*/
	.BTN2{
		border:1px solid rgba(7,169,60,1);
		color:rgba(7,169,60,1);
	}
	/* 已到账 橙色*/
	.BTN3{
		border:1px solid rgba(237,128,49,1);
		color:rgba(6,161,57,1);
	}
	/* 认购中 蓝色*/
	.BTN4{
		border:1px solid rgba(82,126,237,1);
		color:rgba(57,105,228,1);
	}
	/* 流标 灰色*/
	.BTN5{
		border:1px solid rgba(153,153,153,1);
		color:rgba(136,136,136,1);
	}
	.managementItemMiddle{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-top: 20upx;
	}
	.managementItemFooter{
		font-size:26upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(136,136,136,1);
	}
	.managementItem{
		height:236upx;
		background:rgba(255,255,255,1);
		box-sizing: border-box;
		padding-top: 37upx;
		padding-left: 30upx;
		padding-right: 30upx;
	}
	.managementItemHead{
		display: flex;
		font-size:34upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(21,20,20,1);
	}
</style>
