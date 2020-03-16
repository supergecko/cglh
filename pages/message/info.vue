<template>
	<view class='wrap'>
		<view class="center">
			<view class="activity" @click="toPath('../message/ac-center')">
				<image class="a-img" src="../../static/images/acvtive.png" mode=""></image>
				<text class="a-txt">活动中心</text>
			</view>
			<view class="activity" @click="toPath('../message/detail')">
				<image class="a-img" src="../../static/images/flatform.png" mode=""></image>
				<text class="a-txt">平台公告</text>
			</view>
			<view class="activity" @click="toPath('../message/system-info')">
				<image class="a-img" src="../../static/images/system.png" mode=""></image>
				<text class="a-txt">系统通知</text>
			</view>
		</view>
		<view class="example">
			<view class="inv-h-w">
				<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">{{title1}}</view>
				<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">{{title2}}</view>
			</view>
			<!-- 快讯 -->
			<view class='news' v-show="Inv == 0">
				<view class="new1" v-for="(item,i) in newInfo2" :key="i">
					<text class="n-time">{{item.published_time}}</text><br/>
					<text class="n-tit">{{item.post_title}}</text><br/>
					<section class="c-content" v-html='item.post_content'></section>
				</view>
			</view>
			<!-- 咨讯 -->
			<view class='news' v-show="Inv == 1">
				<view v-for="(item,i) in newInfo1" :key="i">
					<text class="n-time">{{item.published_time}}</text><br/>
					<text class="n-tit">{{item.post_title}}</text><br/>
					 <section class="c-content" v-html='item.post_content'></section>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Inv:0,
				title1: '快讯',
				title2: '资讯',
				newInfo1:[] ,//咨讯
				newInfo2:[] ,//快讯
			}
		},
		onLoad() {
			this._Articles_by_category1()
			this._Articles_by_category2()
		},
		methods: {
			changeTab(Inv){
					that.navIdx = Inv;		 
			},
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			},
			//咨讯
			_Articles_by_category1(){
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
				const category_id = 5
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${category_id}**${timestamp}**cglhhaofengshui`)
				let params = {category_id,timestamp,sign}
				this.$ajax.post({
					url: this.$service.api_lists.Articles_by_category,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						// 初始化信息
						this.newInfo1 = res.data.data
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
			//快讯
			_Articles_by_category2(){
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
				const category_id = 3
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${category_id}**${timestamp}**cglhhaofengshui`)
				let params = {category_id,timestamp,sign}
				this.$ajax.post({
					url: this.$service.api_lists.Articles_by_category,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						// 初始化信息
						this.newInfo2 = res.data.data
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
		}
	}
</script>

<style lang="scss" scoped>
	page {background-color: #F8F8F8;}
	.wrap{
		background-color: #F8F8F8;
		width: 750upx;
		.center{
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			margin-bottom: 20upx;
			padding: 40upx 0;
			background-color: #fff;
			border-top: 1upx solid #E6E8ED;
			.activity{
				.a-img{
					display: block;
					width: 116upx;
					height: 116upx;
				}
				.a-txt{
					font-size: 26upx;
				}
			}
		}
	}
	
</style>
<style lang="scss" scoped>
	.example{
		background-color: #fff;
	}
	.inv-h-w{
		display: flex;
		width: 280upx;
		height: 56upx;
		margin-left: 30upx;
		margin-bottom: 4upx;
		padding-top: 24upx;
		}
	.inv-h{
		font-size: 32upx;
		flex: 1;
		text-align: center;
		color: #C9C9C9;
		width: 100upx;
		height: 56upx;
		margin-right: 66upx;
		line-height: 36upx;}
	.inv-h-se{
		color: #5BA7FF;
		border-bottom: 6upx solid #5BA7FF;}
	.news{
		border-top: 1upx solid #E6E8ED;
		padding: 34upx 26upx;
		.new1{
			
			margin-bottom: 20upx;
		}
		.n-time{
			font-size: 30upx;
			color: #E66803;
			line-height: 84upx;
		}
		.n-time:before{
			content: '';
			display: inline-block;
			width: 20upx;
			height: 20upx;
			background-color: #E66803;
			border-radius: 10upx;
			margin-right: 14upx;
		}
		.n-tit{
			line-height: 48upx;
			font-size: 34upx;
			font-weight: bolder;
			color: #171719;
		}
		.n-con{
			font-family: 'PingFang-SC-Regular';
			font-size: 30upx;
			color: #333;
		}
	}
	
</style>
