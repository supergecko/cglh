<template>
	<view class="internalWarp">
		<view class="internalHead">
			<view :style="{backgroundImage:`url(${yellowBg})`}" class="yellowBg">
				<view class="internalHeadText1">BTC账户</view>
				<image src="../../static/down.png" style="width: 30upx;height: 16upx;margin-left: 20upx;margin-bottom: 20upx;"></image>
			</view>
			<view :style="{backgroundImage:`url(${blueBg})`}" class="blueBg">
				<view class="internalHeadText2">可用余额</view>
				<view class="internalHeadText3"><span style="font-size: 30upx;">￥</span>8765443987</view>
			</view>
		</view>
		
		<view class="internalInput">
			<view class="internalInputItem">
				<view>对方账号</view>
				<view>
					<input placeholder="请输入对方手机号码" style="width: 268upx;font-size: 30upx;"/>
				</view>
			</view>
			<view style="width:676upx;height:2upx;background:rgba(230,232,237,1);margin-left: 30upx;"></view>
			<view class="internalInputItem">
				<view>到账数量</view>
				<view class="internalNumber">0</view>
			</view>
		</view>
	</view>
</template>

<script>
	import yellowBg from "@/static/yellow.png"
	import blueBg from "@/static/blue.png"
	export default {
		data() {
			return {
				yellowBg:yellowBg,
				blueBg:blueBg,
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.internalNumber{
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
	}
	.internalWarp{
		background: rgb(245,245,245);
		width: 750upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.internalHead{
		display: flex;
		align-items: center;
		justify-content: center;
		color:rgba(255,255,255,1);
	}
	.yellowBg{
		width: 370upx;
		height: 214upx;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.blueBg{
		width: 370upx;
		height: 214upx;
		background-size: 100% 100%;
		box-sizing: border-box;
		padding-left: 55upx;
		padding-top: 50upx;
		padding-bottom: 60upx;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}
	.internalHeadText1{
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(252,249,244,1);
		margin-left: -60upx;
		margin-bottom: 20upx;
	}
	.internalHeadText2{
		font-size:26upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.internalHeadText3{
		font-size:36upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.internalInput{
		width:706upx;
		height:220upx;
		background:rgba(255,255,255,1);
		border-radius:6upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(21,20,20,1);
	}
	.internalInputItem{
		display: flex;
		box-sizing: border-box;
		padding-left: 31upx;
		padding-right: 30upx;
		justify-content: space-between;
		height: 111upx;
		align-items: center;
	}
</style>
