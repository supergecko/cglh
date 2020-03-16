<template>
	<view class="wrap">
		<view class="c-img">
			<image class="img" src="../../static/images/failure.png" mode="" width="74" height="74"></image>
			<br/><text class="tit">认购失败</text><br/>
			<text class="subtit">该项目的剩余可投数不足，建议您投资其他理财产品</text>
			<view class="but">
				查看其他理财产品
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
		background-color: #F8F8F8; 
		.c-img{
			width: 706upx;
			margin: 0 auto;
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


