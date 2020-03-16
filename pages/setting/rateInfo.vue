<template>
	<view :style="{backgroundImage:`url(${infoBg})`}" class="rateInfoBg">
		<view class="infoWhite">
			<view class="infoText">提币费率为0.2% 资产划转无手续费</view>
		</view>
	</view>
</template>

<script>
	import infoBg from "@/static/info.png"
	export default {
		data() {
			return {
				infoBg:infoBg
			}
		},
		methods: {
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			}
		}
	}
</script>

<style>
	.rateInfoBg{
		width: 750upx;
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
	}
	.infoWhite{
		width:710upx;
		height:846upx;
		background:rgba(255,255,255,1);
		border-radius:28upx;
		margin-top: 36upx;
		display: flex;
		justify-content: center;
		box-sizing: border-box;
		padding-top: 253upx;
	}
	.infoText{
		font-size:34upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(23,23,25,1);
		width: 272upx;
		text-align: center;
	}
</style>
