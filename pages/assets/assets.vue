<template>
	<view style="background: rgb(245,245,245);">
		<view class="assetsHeadBg">
		</view>
		<view class="assetsItem1Warp">
			<view class="item1Text1">总资产估值</view>
			<view class="item1Text2">{{totalUSDT}}USD<span style="font-size: 28upx;color: #666666;">≈￥{{cny}}</span></view>
			<view class="item1Footer">
				<view class="item1FooterBtn"  @click="toPath('../assets/pay')">充币</view>
				<view class="item1FooterBtn"  @click="toPath('../assets/getmoney')" style="background: #58AEF1;">提币</view>
				<view class="item1FooterBtn" @click="toPath('../assets/transfer')"  style="background: #F46E81;">划转</view>
			</view>
		</view>
		<view class="item2Header"  @click="toPath('../assets/record')">我的账户</view>
		<view class="itme3Warp">
			<view class="item3" style="height: 90upx;">
				<view class="item3Item1">币种</view>
				<view class="item3Item2">可用</view>
				<view class="item3Item2">冻结</view>
			</view>
			<view class="item3" v-for="(item,i) in asset" :key="i">
				<view class="item3Item1">{{item.title}}</view>
				<view class="item3Item2">{{item.asset.used}}</view>
				<view class="item3Item2">{{item.asset.freezing}}</view>
			</view>
			<view style="width:706upx; height:20upx;"></view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex'
	export default {
		computed: {
		    ...mapState(['hasLogin']),
		},
		data() {
			return {
				totalUSDT:'',
				cny:'',
				asset:[]
			}
		},
		onLoad() {
			this._currency()
		},
		onReady(){
			if (!this.hasLogin) {
			   uni.reLaunch({
			      url: '../login/login'
			  })
			  return
			}
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				//刷新要执行的方法
				this._currency()
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
		onShow() {
			this._currency()
		},
		methods: {
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			},
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
						this.totalUSDT = res.data.data.total
						this.asset = res.data.data.asset
						this.cny = res.data.data.cny
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

<style>
	.item3Item1{
		width: 20%;
		text-align: center;
	}
	.item3Item2{
		width: 40%;
		text-align: center;
	}
	.assetsTitle{
		font-size:38upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(245,245,245,1);
		text-align: center;
		padding-top: 50upx;
	}
	.itme3Warp{
		width:706upx;
		min-height:512upx;
		background:rgba(255,255,255,1);
		border-radius:6upx;
		margin: 0 auto;
		margin-top: 34upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 50upx;
	}
	.item3{
		width:645upx;
		height: 104upx;
		border-bottom: 1px solid rgba(230,232,237,1);
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(21,20,20,1);
	}
	.assetsHeadBg{
		background: url(../../static/assetsBg.png);
		width: 750upx;
		height: 306upx;
		background-size: 100% 100%;
	}
	.assetsItem1Warp{
		width:706upx;
		height:308upx;
		background:rgba(255,255,255,1);
		box-shadow:0px 6upx 10upx 0px rgba(8,14,56,0.11);
		border-radius:14upx;
		margin: 0 auto;
		margin-top: -170upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.item1Text1{
		font-size:30upx;font-family:PingFang SC;font-weight:400;color:rgba(136,136,136,1);
		margin-left: 22upx;
	}
	.item1Text2{
		font-size:44upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		margin-left: 22upx;
		margin-top: -40upx;
	}
	.item1Footer{
		display: flex;
		justify-content: space-around;
		margin-bottom: 20upx;
	}
	.item1FooterBtn{
		width:194upx;
		height:68upx;
		background:rgba(81,119,245,1);
		border-radius:8upx;
		text-align: center;
		line-height: 68upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(245,245,245,1);
	}
	.item2Header{
		font-size:40upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(21,20,20,1);
		margin-left: 26upx;
		margin-top: 66upx;
	}
</style>
