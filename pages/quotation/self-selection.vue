<template>
	<view class="wrap">
		<view class="header">
			<view>交易对</view>
			<view style="margin: 0 102upx 0 390upx;">置顶</view>
			<view style="font-size: 32upx;">拖动</view>
		</view>
		<view class="main">
			<view class="con">
				<view class="item m-left choosing "></view>
				<view class="item" style="color: #171719;font-size:30upx;margin-right:20upx">
					<text style="color: #171719;font-size:30upx;">BTC /</text><text style="color: #666;font-size:30upx;">ETH</text><br/>
					<text style="color: #888;font-size:26upx;">24H78564123.5689</text>
				</view>
				<view class="item" style="margin: 12upx 104upx 0 164upx;"><image style="width: 50upx;height:50upx" src="../../static/images/top.png" mode=""></image></view>
				<view class="item" style="margin-top:12upx;"><image style="width: 50upx;height:50upx" src="../../static/images/grap.png" mode=""></image></view>
			</view>
			<view class="con">
				<view class="item m-left"></view>
				<view class="item" style="color: #171719;font-size:30upx;margin-right:20upx">
					<text style="color: #171719;font-size:30upx;">BTC /</text><text style="color: #666;font-size:30upx;">ETH</text><br/>
					<text style="color: #888;font-size:26upx;">24H78564123.5689</text>
				</view>
				<view class="item" style="margin: 12upx 104upx 0 164upx;"><image style="width: 50upx;height:50upx" src="../../static/images/top.png" mode=""></image></view>
				<view class="item" style="margin-top:12upx;"><image style="width: 50upx;height:50upx" src="../../static/images/grap.png" mode=""></image></view>
			</view>
			<view class="con">
				<view class="item m-left"></view>
				<view class="item" style="color: #171719;font-size:30upx;margin-right:20upx">
					<text style="color: #171719;font-size:30upx;">BTC /</text><text style="color: #666;font-size:30upx;">ETH</text><br/>
					<text style="color: #888;font-size:26upx;">24H78564123.5689</text>
				</view>
				<view class="item" style="margin: 12upx 104upx 0 164upx;"><image style="width: 50upx;height:50upx" src="../../static/images/top.png" mode=""></image></view>
				<view class="item" style="margin-top:12upx;"><image style="width: 50upx;height:50upx" src="../../static/images/grap.png" mode=""></image></view>
			</view>
			<view class="con">
				<view class="item m-left choosing "></view>
				<view class="item" style="color: #171719;font-size:30upx;margin-right:20upx">
					<text style="color: #171719;font-size:30upx;">BTC /</text><text style="color: #666;font-size:30upx;">ETH</text><br/>
					<text style="color: #888;font-size:26upx;">24H78564123.5689</text>
				</view>
				<view class="item" style="margin: 12upx 104upx 0 164upx;"><image style="width: 50upx;height:50upx" src="../../static/images/top.png" mode=""></image></view>
				<view class="item" style="margin-top:12upx;"><image style="width: 50upx;height:50upx" src="../../static/images/grap.png" mode=""></image></view>
			</view>
		</view>
		<view class="but">
			<view style="padding-top: 10upx;display: flex">
				<view class="img"></view>
				<text style="margin-left:10upx;color: #666;">全选</text>
			</view>
			<view class="clear">删除</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		font-family: 'PingFang-SC-Regular';
		overflow-x: hidden; 
		.header{
			display: flex;
			width: 100%;
			height: 68upx;
			line-height: 68upx;
			padding: 0 31upx;
			color: #888888;
			font-size: 28upx;
			background-color: #E7E9EE;
		}
		.main{
			padding: 0 31upx;
			.con{
				display: flex;
				border-bottom: 1upx solid #E6E8ED;
				.m-left{
					width: 50upx;
					background: url("../../static/images/default.png") no-repeat;
					background-position: center center;
					background-size: 50upx 50upx;
					margin-right: 20upx;
				}
				.m-left.choosing{
					background: url("../../static/images/choosing.png") no-repeat;
					background-position: center center;
					background-size: 50upx 50upx;
				}
				.item{
					padding: 36upx 0;
				}
				
			}
		}
		.but{
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 750upx;
			height: 74upx;
			padding: 11upx 16upx 11upx 31upx;
			border: 1upx solid #E6E8ED;
			.clear{
				width: 222upx;
				height: 78upx;
				margin-left: 350upx;
				line-height: 78upx;
				text-align: center;
				font-size: 32upx;
				color: #fff;
				background-color: #E84848;
				border-radius: 39upx;
			}
			.img{
				width: 50upx;
				height:50upx;
				background: url("../../static/images/default.png") no-repeat center/cover;
				background-size: 50upx 50upx;
			}
			.img.choose{
				background: url("../../static/images/choosing.png") no-repeat center/cover;
				background-size: 50upx 50upx;
			}
		}
	}
</style>
