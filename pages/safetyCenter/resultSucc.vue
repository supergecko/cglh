<template>
	<view class="wrap">
		<view class="main">
			<image src="../../static/images/result-succ.png" mode="" style="display:block;width: 146upx;height: 146upx;margin:0 auto 52upx;"></image>
			<view class="con">
				<text style="font-size:30upx;color:#151414;">认证通过</text><br/>
				<text style="font-size:26upx;color:#666;">恭喜您已通过实名认证</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data (){
			return{
				
			}
		},
		onNavigationBarButtonTap() {
			uni.reLaunch({
				url: '../safetyCenter/safetyCenter',
			});
		},
		onLoad(option) {
			
		},
		methods:{
			toPage(Url) {
				uni.navigateTo({
					url:Url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F8F8F8;
	}
	.wrap{
		width: 100%;
		.main{
			box-sizing: border-box;
			width: 706upx;
			height: 617upx;
			margin: 34upx auto;
			padding: 112upx 0 0 0;
			background-color: #fff;
			text-align: center;
		}
	}
</style>

