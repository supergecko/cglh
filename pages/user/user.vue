<template>
	<view>
		<view class="userHeader">
			<view style="position: absolute;top: 59upx;right: 27upx;" @click="toPath('../setting/setting')"><image src="../../static/user/set.png" style="width: 52upx;height: 52upx;"></image></view>
			<view class="headerImg"><image src="../../static/renwu.jpg" style="width:100%;height:100%;border-radius: 50%;"></image></view>
			<view style="margin-top: 29upx;">{{userMobile}}</view>
			<!-- <view style="font-weight:400;font-size:26upx;">未认证</view> -->
		</view>
		<view class="userMiddle" >
			<view class="middleItem" style="margin-left: 53upx;" @click="toPath('../quotation/rentRecord')">
				<image src="../../static/user/clzl.png" style="width: 94upx;height: 94upx;"></image>
				<view>策略租用记录</view>
			</view>
			<view class="middleItem" style="margin-left: 86upx;" @click="toPath('../myManagement/myManagement')">
				<image src="../../static/user/money.png" style="width: 94upx;height: 94upx;"></image>
				<view>我的理财</view>
			</view>
			<view class="middleItem" style="margin-left: 116upx;" @click="toPath('../assets/transfer')">
				<image src="../../static/user/hz.png" style="width: 94upx;height: 94upx;"></image>
				<view>资产划转</view>
			</view>
		</view>

		<view style="margin-top: 82upx;">
			<view class="userFooterItem" @click="toPath('../address/address')">
				<image src="../../static/user/address.png" style="width: 60upx;height: 60upx;"></image>
				<view style="margin-left: 14upx;">提币地址</view>
			</view>
			<view style="width:712upx;height:1upx;background:rgba(230,232,237,1);margin-left: 37upx;"></view>
			<view class="userFooterItem" @click="toPath('../rechargeRecord/rechargeRecord')">
				<image src="../../static/user/czjl.png" style="width: 60upx;height: 60upx;"></image>
				<view style="margin-left: 14upx;">充提记录</view>
			</view>
			<view style="width:712upx;height:3upx;background:rgba(230,232,237,1);margin-left: 37upx;"></view>
			<view class="userFooterItem" @click="toPath('../invitation/invitation')">
				<image src="../../static/user/fy.png" style="width: 60upx;height: 60upx;"></image>
				<view style="margin-left: 14upx;">邀请返佣</view>
			</view>
			<view style="width:750upx;height:20upx;background:rgba(245,245,245,1);"></view>
			<view class="userFooterItem" @click="toReLaunch('../safetyCenter/safetyCenter')">
				<image src="../../static/user/aqzx.png" style="width: 60upx;height: 60upx;"></image>
				<view style="margin-left: 14upx;">安全中心</view>
			</view>
			<view style="width:712upx;height:3upx;background:rgba(230,232,237,1);margin-left: 37upx;"></view>
			<view class="userFooterItem" @click="toPath('../aboutUs/aboutUs')">
				<image src="../../static/user/about.png" style="width: 60upx;height: 60upx;"></image>
				<view style="margin-left: 14upx;">关于我们</view>
			</view>
			<view style="width:750upx;height:20upx;background:rgba(245,245,245,1);"></view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex'
	export default{
		computed: {
		    ...mapState(['hasLogin', 'forcedLogin','userinfo']),
		},
		data () {
			return{
				userMobile: ''
			}
		},
		methods:{
			...mapMutations(['logout', 'userinfoarr']),
			toPath (URL) {
				uni.navigateTo({
					url:URL
				})
			},
			toReLaunch(URL){
				uni.reLaunch({
					url:URL
				})
			}
		},
		onLoad() {
			if (!this.hasLogin) {
			   uni.reLaunch({
			      url: '../login/login'
			  });
			  return;
			}
			this.userMobile = uni.getStorageSync('user_mobile')
		}
	}
</script>

<style>
.userFooterItem {
	height: 115upx;
	font-size:32upx;
	font-family:PingFang SC;
	font-weight:400;
	color:rgba(23,23,25,1);
	display: flex;
	align-items: center;
	margin-left: 25upx;
}
.userHeader {
	background: url(../../static/user/bj.png);
	width: 750upx;
	height: 504upx;
	background-size: 100% 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(255, 255, 255, 1);
	font-size: 36upx;
}
.headerImg {
	width: 150upx;
	height: 150upx;
	border-radius: 50%;
	-moz-border-radius: 50%;
	-webkit-border-radius: 50%;
	margin-top: 90upx;
}
.userMiddle {
	width: 690upx;
	height: 198upx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 10upx 16upx 0px rgba(223, 152, 52, 0.15);
	border-radius: 14upx;
	margin: 0 auto;
	position: absolute;
	top: 368upx;
	left: 30upx;
	font-size: 26upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(51, 51, 51, 1);
	display: flex;
	align-items: center;
}
.middleItem {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
