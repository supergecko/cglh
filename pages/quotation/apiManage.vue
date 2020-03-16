<template>
	<view class="wrap">
		<view class="main">
			<view class="bite" v-for="(item,i) in BourseArr" :key="i">
				<view>
					<image class="t-img" :src="item.icon" mode=""></image>
					<text class="t-txt">{{item.title}}</text>
				</view>
				<view class="item">
					<view @click="toPath(`../quotation/importApi?binding=${item.binding}&bourse_id=${item.bourse_id}`)" style="display: flex;align-items: center;">
						<image class="b-img" src="../../static/images/lead.png" mode=""></image>
						<view class="b-txt blue">{{item.binding===0? '导入api':'编辑api'}}</view>
					</view>
					<view style="display: flex;align-items: center;">
						<image class="b-img" src="../../static/images/delete.png" mode=""></image>
						<view class="b-txt">删除api</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	export default {
		computed: {
			...mapState(['hasLogin']),
		},
		data() {
			return {
				BourseArr:[]
			}
		},
		onLoad() {
			if (!this.hasLogin) {
			   uni.reLaunch({
			      url: '../login/login'
			  });
			  return;
			}
			this._Bourse()
		},
		onShow() {
			
		},
		methods: {
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			},
			// 获取api信息
			_Bourse(){
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
					url: this.$service.api_lists.Bourse,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						// 初始化信息
						this.BourseArr = res.data.data
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
	.wrap{
		width: 100%;
		border-top: 1upx solid #E6E8ED;
		font-family: 'PingFang-SC-Medium';
		background-color: #f5f5f5;
		overflow-x: hidden;
		.main{
			width: 100%;
			.bite{
				display:flex;
				justify-content: space-between;
				width: 100%;
				height: 201upx;
				line-height: 201upx;
				padding: 0 30upx;
				margin-top: 16upx;
				background: #fff url('../../static/images/bgDress.png') no-repeat  600upx center/cover;
				background-size: 156upx 201upx;
				.item{
					display: flex;
					padding: 40upx 60upx 0 0;
				}
				.t-img{
					width:76upx;
					height:76upx;
					margin-right: 10upx;
					vertical-align: -26upx;
				}
				.t-txt{
					color:#151414;
					font-size:34upx;
				}
				.b-img{
					width:50upx;
					height:50upx;
					vertical-align: -16upx;
				}
				.b-txt{
					color:#666;
					font-size:30upx;
				}
				.b-txt.blue{
					color: #42A2EC;
					margin-right: 60upx;
				}
			}
			.bite.no{
				border: none;
			}
		}
	}
</style>
