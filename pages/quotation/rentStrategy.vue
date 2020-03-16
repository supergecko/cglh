<template>
	<view class="wrap">
		<view class="txt">
			<textarea maxlength="500" value="" placeholder="请输入您的策略概述" style="width: 690upx;" />
		</view>
		<view class="way">
			<input type="text" value="" placeholder="请输入您的联系方式(手机或邮箱)"/>
		</view>
		<view class="but">
			确认提交
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		background-color: #F8F8F8;
		.txt{
			box-sizing: border-box;
			width: 100%;
			height: 400upx;
			padding: 31upx;
			margin-bottom: 20upx;
			background-color: #fff;
			border-top: 1upx solid #E6E8ED;
			box-shadow: 1upx 1upx 8upx #E6E8ED;
		}
		.way{
			box-sizing: border-box;
			width: 100%;
			height: 196upx;
			background-color: #fff;
			padding: 37upx 30upx;
			box-shadow: 1upx 1upx 8upx #E6E8ED;
		}
		.but{
			width: 646upx;
			height: 96upx;
			margin: 62upx auto 140upx;
			line-height: 96upx;
			color: #fff;
			font-size: 34upx;
			text-align: center;
			background-color: #42A2EC;
			border-radius: 10upx;
		}
	}
</style>
