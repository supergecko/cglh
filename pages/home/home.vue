<template>
	<view class="wrap">
		<!-- 轮播图 -->
		<view class="swiper">
			<swiper autoplay="true" interval="3000">
				<swiper-item v-for="(item,index) in homeInfo.slide_item" :key="index" v-if="homeInfo.slide_item" @click="wheelJump(item.url_type,item.url)">
					<image :src="item.image" style="width: 100%;height: 240upx;"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 公告 -->
		<view class="info"  @click="toPath('../message/detail')">
			<view>
				<image src="../../static/newimg/flash.png" style="width:76upx;height:34upx;vertical-align: -6upx;"></image>
				<text style="color:#E02F33;">【量化基金】</text>
				<text class="word" style="color: #171719;">在任何一个价位，买入</text>
				<text style="color: #171719;">| 更多</text>
			</view>
		</view>
		<view class="action">
			<view  @click="toPath('../message/guide')">
				<view>
					<image src="../../static/newimg/noob.png" ></image>
					<text class="text">新手教程</text>
				</view>
			</view>
			<view @click="toPath('../message/invest')">
				<view>
					<image src="../../static/newimg/yubibao.png" ></image>
					<text class="text">余币宝</text>
				</view>
			</view>
			<view @click="toPath('../message/invest2')">
				<view>
					<image src="../../static/newimg/quantFund.png" ></image>
					<text class="text">量化基金</text>
				</view>
			</view>
			<view @click="toPath('../message/info')">
				<view>
					<image src="../../static/newimg/acCenter.png" ></image>
					<text class="text">活动中心</text>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="item">
				<view style='margin-right:41upx;'>
					<view style="color:#fff;"><text style="font-size:90upx;">10</text>%</view>
					<view style="color:#CAE6FD;font-size:26upx;text-align:center;">月化收益</view>
				</view>
				<view style="color:#fff;margin-right: 150upx;">
					<view>
						<view style='font-size:36upx;'>
							<text>神经网格</text><image src="../../static/newimg/hot.png" style=' width: 34upx;height:42upx;margin-left:14upx;'></image>
						</view>
						<text style='font-size:26upx;'>100USD起，随开随停</text>
						<view style="display:flex;font-size:22upx;margin-top:19upx;" >
							<view class="tip" style='background-color:#2E66F5;'>Fcoin</view>
							<view class="tip" style='background-color:#2CABFB;'>Huobi</view>
						</view>
					</view>
				</view>
				<view style="text-align:center;">
					<image src="../../static/newimg/save.png" style=' width: 46upx;height:46upx;vertical-align: 3upx;'></image>
					<view style="font-size:22upx;color:#F7F9FE;text-align:center;">收藏</view>
				</view>
			</view>
			
			<view class="item1">
				<view style='margin-right:41upx;'>
					<view style="color:#3A74F7;"><text style="font-size:90upx;">10</text>%</view>
					<view style="color:#777777;font-size:26upx;text-align:center;">月化收益</view>
				</view>
				<view style="color:#171719;margin-right: 150upx;">
					<view>
						<view style='font-size:36upx;'>
							<text>神经网格</text><image src="../../static/newimg/hot.png" style=' width: 34upx;height:42upx;margin-left:14upx;'></image>
						</view>
						<text style='font-size:26upx;'>100USD起，随开随停</text>
						<view style="display:flex;font-size:22upx;margin-top:19upx;color:#fff" >
							<view class="tip" style='background-color:#2E66F5;'>Fcoin</view>
							<view class="tip" style='background-color:#2CABFB;'>Huobi</view>
						</view>
					</view>
				</view>
				<view style="text-align:center;">
					<image src="../../static/newimg/b-save.png" style=' width: 46upx;height:46upx;vertical-align: 3upx;'></image>
					<view style="font-size:22upx;color:#3A74F7;text-align:center;">收藏</view>
				</view>
			</view>
			
			<view class="item1">
				<view style='margin-right:41upx;'>
					<view style="color:#3A74F7;"><text style="font-size:90upx;">10</text>%</view>
					<view style="color:#777777;font-size:26upx;text-align:center;">月化收益</view>
				</view>
				<view style="color:#171719;margin-right: 150upx;">
					<view>
						<view style='font-size:36upx;'>
							<text>神经网格</text><image src="../../static/newimg/hot.png" style=' width: 34upx;height:42upx;margin-left:14upx;'></image>
						</view>
						<text style='font-size:26upx;'>100USD起，随开随停</text>
						<view style="display:flex;font-size:22upx;margin-top:19upx;color:#fff" >
							<view class="tip" style='background-color:#2E66F5;'>Fcoin</view>
							<view class="tip" style='background-color:#2CABFB;'>Huobi</view>
						</view>
					</view>
				</view>
				<view style="text-align:center;">
					<image src="../../static/newimg/b-saved.png" style=' width: 46upx;height:46upx;vertical-align: 3upx;'></image>
					<view style="font-size:22upx;color:#888888;text-align:center;">已收藏</view>
				</view>
			</view>
			
			     <!-- 更多 -->
			<view class="but">查看更多</view>
		</view>
	</view>
</template>
　　
<script>
	export default {
		data() {
			return {
				Inv:0,
				title1: '涨幅榜',
				title2: '跌幅榜',
				homeInfo:{},//首页基础信息
				transactionInfo:[],//实时汇率
				Increaselist:{}//涨幅榜
			}
		},
		onLoad() {
			this._appIndexInfo()
			// this.getds = setInterval(()=>{
			// 	this.setData();
			// }, 4000)
		},
		methods: {
			// 首页轮播跳转
			wheelJump(ID,SRC){
				if(ID==="1"){
					uni.reLaunch({
						url:`../${SRC}`
					})
				} else {
					uni.navigateTo({
						url:`../${SRC}`
					})
				}
			},
			changeTab(Inv){
				that.navIdx = Inv;		 
			},
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			},
			toRelaunch(URL){
				uni.reLaunch({
					url:URL
				})
			},
			setData(){
				this._mainCoin()
			},
			// 首页基本信息
			_appIndexInfo() {
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
				// uni.showLoading({
				// 	title: '加载中'
				// })
				let params = {}
				this.$ajax.post({
					url: this.$service.api_lists.appIndexInfo,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.homeInfo = res.data.data
						this._mainCoin()
					}
				}).catch((err) => {
					// uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
			// 首页实时汇率接口
			_mainCoin() {
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
				let params = {}
				this.$ajax.post({
					url: this.$service.api_lists.mainCoin,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.transactionInfo = res.data.data
						this._Increaselist()
					}
				}).catch((err) => {
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
			// 首页涨幅榜接口
			_Increaselist() {
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
				let params = {}
				this.$ajax.post({
					url: this.$service.api_lists.Increaselist,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.Increaselist = res.data.data
					}
					// uni.hideLoading()
				}).catch((err) => {
					// uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.wrap{
		width: 100%;
		font-family: 'PingFang-SC-Bold';
		.header{
			width: 690upx;
			height: 240upx;
			margin: 50upx auto 24upx;
			background-color: #4076EE;
			border-radius: 10upx;
		}
		.swiper{
			width: 690upx;
			height: 240upx;
			border-radius: 10upx;
			margin: 0 auto 24upx;
			margin-top: 64upx;
			image{
				width: 690upx;
				height: 240upx;
				text-align: center;
			}
		}
		.info{
			box-sizing: border-box;
			width:690upx;
			height: 96upx;
			line-height: 96upx;
			padding: 0 17upx;
			font-size: 30upx;
			margin: 0 auto 53upx; 
			border: 1upx solid #E6E8ED;
			.word::after{
				content: '';
				display: inline-block;
				width: 20upx;
			}
		}
		.action{
			display: flex;
			justify-content: space-around;
			width: 690upx;
			margin: 0 auto 70upx;
			text-align: center;
			image{
				display: block;
				width: 114upx;
				height: 130upx;
			}
			.text{
				color: #333;
				font-size: 26upx;
			}
		}
		.main{
			width:710upx;
			margin: 0 auto 37upx;
			.item{
				box-sizing:border-box;
				display: flex;
				width: 100%;
				height: 230upx;
				padding:26upx 0 40upx 46upx;
				background-color:#0C85EB;
				border-radius:10upx;
				margin-top: 24upx;
			}
			.item1{
				box-sizing:border-box;
				display: flex;
				width: 100%;
				// height: 230upx;
				border: 1upx solid #D6D5D5;
				padding:26upx 0 40upx 46upx;
				background-color:#fff;
				border-radius:10upx;
				margin-top: 24upx;
			}
			.tip{
				padding:8upx 14upx;
				margin-right: 16upx;
			}
			.but{
				width: 100%;
				height: 88upx;
				margin-top: 37upx;
				background-color: #DDEFFD;
				color: #42A2EC;
				font-size: 32upx;
				line-height: 88upx;
				text-align: center;
				border-radius: 10upx;
			}
		}
	}
</style>
