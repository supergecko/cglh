<template>
	<view class="wrap">
		<view class="header">
			<view class="inv-h-w">
				<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">全部</view>
				<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">买入</view>
				<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">卖出</view>
			</view>
		</view>
		<view class="increase" v-show="Inv == 0">
			<view class="item">
				<view style='display:flex;font-size:36upx;justify-content: space-between;margin-bottom:34upx;'>
					<view style='text-indent: -20upx;'>
						<text style="color:#3F9F3E;">【买入】</text>
						<text style="color:#171719;">BTC</text>
						<text style="color:#888888;">/</text>
						<text style="color:#888888;font-size:30upx;">USDT</text>
					</view>
					<view style="color:#42A2EC;font-size:28upx;">已成交</view>
				</view>
				<view style='display:flex;font-size:28upx;justify-content: space-between;margin-bottom:15upx;'>
					<view>
						<view style="color:#666;margin-bottom:10upx;">价格(USDT)</view>
						<view style='color:#171719;font-size:40upx;'>7149.3</view>
					</view>
					<view>
						<view style="color:#666;margin-bottom:10upx;">数量(BTC)</view>
						<view style='color:#171719;font-size:40upx;'>0.0050</view>
					</view>
				</view>
				<view><text style="color:#777;font-size:28upx;">创建时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2020年1月2日&nbsp;&nbsp;&nbsp;19:44:14</text></view>
			</view>
			<view class="item">
				<view style='display:flex;font-size:36upx;justify-content: space-between;margin-bottom:34upx;'>
					<view style='text-indent: -20upx;'>
						<text style="color:#E84040;">【卖出】</text>
						<text style="color:#171719;">BTC</text>
						<text style="color:#888888;">/</text>
						<text style="color:#888888;font-size:30upx;">USDT</text>
					</view>
					<view style="color:#999999;font-size:28upx;">取消</view>
				</view>
				<view style='display:flex;font-size:28upx;justify-content: space-between;margin-bottom:15upx;'>
					<view>
						<view style="color:#666;margin-bottom:10upx;">价格(USDT)</view>
						<view style='color:#171719;font-size:40upx;'>7149.3</view>
					</view>
					<view>
						<view style="color:#666;margin-bottom:10upx;">数量(BTC)</view>
						<view style='color:#171719;font-size:40upx;'>0.0050</view>
					</view>
				</view>
				<view><text style="color:#777;font-size:28upx;">创建时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2020年1月2日&nbsp;&nbsp;&nbsp;19:44:14</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Inv:0
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		background-color: #f5f5f5;
		font-family: PingFang-SC-Bold;
		.header{
			width: 100%;
			border-bottom: 1upx solid #E1E3E8;
			border-top: 1upx solid #E1E3E8;
			padding-left: 50upx;
			padding-bottom: 4upx;
			.inv-h-w{
				display: flex;
				width: 400upx;
				height: 79upx;
				margin-bottom: 4upx;
			}
			.inv-h{
				font-size: 29upx;
				text-align: center;
				color: #666;
				width: 100upx;
				height: 79upx;
				margin-right: 66upx;
				line-height: 79upx;
				}
			.inv-h-se{
				font-size: 30upx;
				color: #171719;
				border-bottom: 6upx solid #5BA7FF;
			}
		}
		.increase{
			width: 710upx;
			margin: 26upx auto 0;
			.item{
				box-sizing: border-box;
				width: 100%;
				height: 307.7upx;
				padding: 38upx 31upx 36upx 32upx;
				background-color: #fff;
				border-radius: 10upx;
				margin-bottom: 24upx;
			}
		}
	}
</style>
