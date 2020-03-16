<template>
	<view class="profitBg" :style="{backgroundImage:`url(${profitBg})`}">
		<view class="titleNview-placing"></view>
		<view class="profitHeader">
			<view class="logo" :style="{backgroundImage:`url(${logo})`}"></view>
			<view class="logoText">创谷量化</view>
		</view>
		<view class="titleText">用网格策略轻松赚币</view>
		
		<view class="middleWarp">
			<view class="middleContent1">
				<view class="head" :style="{backgroundImage:`url(${head})`}"></view>
				<view class="headText">小哥带你玩转币圈</view>
			</view>
			<view class="middleContent2">
				<view class="bigNumber">2.98%</view>
				<view class="smallNumber">预期年化收益率300.66%</view>
			</view>
			
			<view class="middleContent3">
				<view>
					<view class="content3Title">运行时间</view>
					<view class="content3Tip">12422天</view>
				</view>
				<view>
					<view class="content3Title">运行时间</view>
					<view class="content3Tip">12422天</view>
				</view>
				<view>
					<view class="content3Title">运行时间</view>
					<view class="content3Tip">12422天</view>
				</view>
			</view>
			
			<view class="middleContent2"></view>
			<view class="middleContent3"></view>
		</view>
		
		<view class="footerContent">
			<view class="service" :style="{backgroundImage:`url(${service})`}"></view>
			<view class="footerTextContent">
				<view>请扫码添加客服咨询</view>
				<view style="font-size: 27upx;">点击二维码进行保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import profitBg from "@/static/images/profit/bg.png"
	import logo from "@/static/images/profit/logo.png"
	import service from "@/static/images/profit/service.png"
	import head from "@/static/images/profit/head.png"
	export default {
		data() {
			return {
				profitBg:profitBg,
				logo:logo,
				service:service,
				head:head
			}
		},
	}
</script>

<style scoped>
	.titleNview-placing {
		height: var(--status-bar-height);
		width: 100%;
	}
	.profitBg{
		width: 100%;
		background-size: 100% 100%;
	}
	.profitHeader{
		display: flex;
		padding-top: 49upx;
		padding-left: 25upx;
		align-items: center;
	}
	.logo{
		width: 58upx;
		height: 58upx;
		background-size: 100% 100%;
	}
	.logoText{
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		margin-left: 14upx;
	}
	.titleText{
		font-size: 60upx;
		margin-bottom: 106upx;
		margin-top: 64upx;
		text-align: center;
		font-family:FZZhengHeiS-M-GB;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.middleWarp{
		width:690upx;
		height:740upx;
		background:rgba(255,255,255,1);
		border-radius:24upx;
		margin: 0 auto;
	}
	.middleContent1{
		display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
		padding-top: 53upx;
	}
	.head{
		width: 142upx;
		height: 142upx;
		background-size: 100% 100%;
	}
	.headText{
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(23,23,25,1);
		margin-top: 20upx;
	}
	.middleContent2{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 90upx;
	}
	.bigNumber{
		font-size:68upx;
		font-family:307-CAI978;
		font-weight:bold;
		color:rgba(39,68,152,1);
	}
	.smallNumber{
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(39,68,152,1);
	}
	.middleContent3{
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-top: 90upx;
	}
	.content3Title{
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(119,119,119,1);
		margin-bottom: 20upx;
	}
	.content3Tip{
		font-size:32Upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(23,23,25,1);
	}
	.footerContent{
		margin-top: 60upx;
		margin-left: 30upx;
		display: flex;
		align-content: center;
	}
	.service{
		width: 132upx;
		height: 132upx;
		background-size: 100% 100%;
	}
	.footerTextContent{
		margin-left: 29upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
		font-size: 31upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
</style>
