<template>
	<view class="wrap">
		<view class="c-img">
			<image class="img" src="../../static/images/getsucc.png" mode=""></image>
			<br/><text class="tit">提币成功</text><br/>
			<text class="subtit">已成功向对应的地址转入币，请耐心等待区块确认</text>
			<view class="but">
				查看我的资产
			</view>
		</view>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {	
			}
		},
		methods: {	
		}
	}
</script>
<style lang="scss" scoped>
	page{
		background-color: #F8F8F8;
	}
	.wrap{
		width: 100%;
		padding: 0 22upx;
		.c-img{
			margin: 20upx auto 20upx;
			padding: 60upx 0;
			background-color: #fff;
			text-align: center;
			.img{
				width: 148upx;
				height: 148upx;
				margin-bottom: 30upx;
			}
			.tit{
				font-size: 30upx;
				color: #151414;
			}
			.subtit{
				font-size: 26upx;
				color: #666;
			}
			.but{
				width: 646upx;
				height: 96upx;
				margin: 52upx auto;
				line-height: 96upx;
				font-size: 34upx;
				color: #fff;
				text-align: center;
				background-color: #42A2EC;
				border-radius: 10upx;
			}
		}
		
	}
</style>


