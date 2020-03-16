<template>
	<view class="wrap">
		<view class="main">
			<view class="item">
				<view class="item1">交易对</view>
				<view class="item2">
					<text>BTC_USD</text>
					<image src="../../static/newimg/right.png" style='width:30upx;height:34upx;margin-left:10upx;vertical-align: -6upx;'></image>
				</view>
			</view>
			<view class="item">
				<view class="item1">
					<text>杠杆倍数</text>
					<image src="../../static/newimg/tip.png" style='width:32upx;height:32upx;margin-left:12upx;vertical-align: -6upx;'></image>
				</view>
				<view class="item2">
					<text>0 倍</text>
					<image src="../../static/newimg/right.png" style='width:30upx;height: 34upx;margin-left:10upx;vertical-align: -6upx;'></image>
				</view>
			</view>
			<view class="item">
				<view class="item1">
					<text>网格间价格差</text>
					<image src="../../static/newimg/tip.png" style='width:32upx;height:32upx;margin-left:12upx;vertical-align: -6upx;'></image>
				</view>
				<view class="item2">
					<text>2美元</text>
					<image src="../../static/newimg/right.png" style='width:30upx;height: 34upx;margin-left:10upx;vertical-align: -6upx;'></image>
				</view>
			</view>
			<view class="item">
				<view class="item1">
					<text>每笔挂单量</text>
					<image src="../../static/newimg/tip.png" style='width:32upx;height:32upx;margin-left:12upx;vertical-align: -6upx;'></image>
				</view>
				<view class="item2">
					<text>20美元</text>
					<image src="../../static/newimg/right.png" style='width:30upx;height: 34upx;margin-left:10upx;vertical-align: -6upx;'></image>
				</view>
			</view>
			<view class="item">
				<view class="item1">策略时长</view>
				<view class="item2">
					<text>3天</text>
					<image src="../../static/newimg/right.png" style='width:30upx;height: 34upx;margin-left:10upx;vertical-align: -6upx;'></image>
				</view>
			</view>
			<view class="but">确认修改</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		background-color: #f5f5f5;
		font-family: PingFang-SC-Bold;
		.main{
			box-sizing: border-box;
			width: 710upx;
			height:1198upx;
			margin: 0 auto;
			padding: 0 0 20upx 28upx;
			background-color: #fff;
			border-radius: 20upx;
			.item{
				box-sizing: border-box;
				display: flex;
				width: 100%;
				height: 105upx;
				padding-right: 34upx;
				line-height: 105upx;
				border-bottom: 1upx solid #E6E8ED;
				justify-content: space-between;
				.item1{
					color: #666;
					font-size: 32upx;
				}
				.item2{
					color: #171719;
					font-size: 32upx;
				}
			}
			.but{
				width: 646.2upx;
				height: 96upx;
				margin: 56upx 0 0 5upx; 
				line-height: 96upx;
				color: #fff;
				font-size: 34upx;
				background-color: #42A2EC;
				text-align: center;
				border-radius: 15upx;
			}
		}
	}
</style>
