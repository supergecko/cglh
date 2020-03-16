<template>
	<view class="wrap">
		<view class="choose">
			<view class="con">
				<view class="named"><text>ETH</text></view>
			</view>
			<view class="con top">
				<view class="left">
					<text class="tit">可用</text><br/>
					<text >43587.56</text>
				</view>
				<view class="right">
					<text class="tit">冻结BTC</text><br/>
					<text>536.1743</text>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="inv-h-w">
				<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">{{title1}}</view>
				<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">{{title2}}</view>
			</view>
			<view class="list info" v-show="Inv == 0">
				<view class="i-con">
					<view class="attribute top">
						<text style="margin-right: 35upx;">ETH</text><text class="small">04-25 14:21</text>
					</view>
					<view class="attribute center">
						<text style="margin-right: -50upx;">数量(ETH)</text><text>手续费</text><text>状态</text>
					</view>
					<view class="attribute" style="margin: 0">
						<text >10.86</text><text>0.23</text><text>成功</text>
					</view>
				</view>
				<view class="i-con">
					<view class="attribute top">
						<text style="margin-right: 35upx;">ETH</text><text class="small">04-25 14:21</text>
					</view>
					<view class="attribute center">
						<text style="margin-right: -50upx;">数量(ETH)</text><text>手续费</text><text>状态</text>
					</view>
					<view class="attribute" style="margin: 0">
						<text >10.86</text><text>0.23</text><text>成功</text>
					</view>
				</view>
				<view class="i-con">
					<view class="attribute top">
						<text style="margin-right: 35upx;">ETH</text><text class="small">04-25 14:21</text>
					</view>
					<view class="attribute center">
						<text style="margin-right: -50upx;">数量(ETH)</text><text>手续费</text><text>状态</text>
					</view>
					<view class="attribute" style="margin: 0">
						<text >10.86</text><text>0.23</text><text>成功</text>
					</view>
				</view>
				<view class="i-con">
					<view class="attribute top">
						<text style="margin-right: 35upx;">ETH</text><text class="small">04-25 14:21</text>
					</view>
					<view class="attribute center">
						<text style="margin-right: -50upx;">数量(ETH)</text><text>手续费</text><text>状态</text>
					</view>
					<view class="attribute" style="margin: 0">
						<text >10.86</text><text>0.23</text><text>成功</text>
					</view>
				</view>
			</view>
			<view class="list info" v-show="Inv == 1">
				<view class="i-con">
					<view class="attribute top">
						<text style="margin-right: 35upx;">ETH</text><text class="small">04-25 14:21</text>
					</view>
					<view class="attribute center">
						<text style="margin-right: -50upx;">数量(ETH)</text><text>手续费</text><text>状态</text>
					</view>
					<view class="attribute" style="margin: 0">
						<text >10.86</text><text>0.23</text><text>成功</text>
					</view>
				</view>
				<view class="i-con">
					<view class="attribute top">
						<text style="margin-right: 35upx;">ETH</text><text class="small">04-25 14:21</text>
					</view>
					<view class="attribute center">
						<text style="margin-right: -50upx;">数量(ETH)</text><text>手续费</text><text>状态</text>
					</view>
					<view class="attribute" style="margin: 0">
						<text >10.86</text><text>0.23</text><text>成功</text>
					</view>
				</view>
				<view class="i-con">
					<view class="attribute top">
						<text style="margin-right: 35upx;">ETH</text><text class="small">04-25 14:21</text>
					</view>
					<view class="attribute center">
						<text style="margin-right: -50upx;">数量(ETH)</text><text>手续费</text><text>状态</text>
					</view>
					<view class="attribute" style="margin: 0">
						<text >10.86</text><text>0.23</text><text>成功</text>
					</view>
				</view>
				<view class="i-con">
					<view class="attribute top">
						<text style="margin-right: 35upx;">ETH</text><text class="small">04-25 14:21</text>
					</view>
					<view class="attribute center">
						<text style="margin-right: -50upx;">数量(ETH)</text><text>手续费</text><text>状态</text>
					</view>
					<view class="attribute" style="margin: 0">
						<text >10.86</text><text>0.23</text><text>成功</text>
					</view>
				</view>
			</view>
		</view>
		<view class="but">
			<view class="buy">充币</view>
			<view class="get">提币</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Inv:0,
				title1: '充币记录',
				title2: '提币记录'
			}
		},
		methods: {
			changeTab(Inv){
					that.navIdx = Inv;		 
			}
		},
	}
</script>

<style lang='scss' scoped>
	.wrap{
		width: 100%;
		overflow-x: hidden;
		.choose{
			box-sizing: border-box;
			width: 706upx;
			height: 336upx;
			margin: 20upx auto 0;
			padding: 20upx 30upx 0;
			color: #fff;
			background: url('../../static/images/recordBg.png') no-repeat center/cover;
			.named{
				margin-right: 428upx;
				font-size: 32upx;
				line-height: 76upx;
			}
			.con{
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
			}
			.con.top{
				margin-top: 20upx;
				.left{
					border-right: 1upx solid #fff;
					padding-left: 15upx;
				}
				.right{
					padding-left: 44upx; 
				}
				.left,.right{
					width: 50%;
					text-align: left;
					font-size: 40upx;
					font-weight: bold;
					.tit{
						display: inline-block;
						font-size: 30upx;
						margin-bottom: 24upx;
						font-weight: 100;
					}
				}
			}
		}
		.but{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			margin: 0 auto;
			.get,.buy{
				display: inline-block;
				width: 50%;
				height: 96upx;
				line-height: 96upx;
				text-align: center;
				color: #fff;
				font-size: 34upx;
			}
			.buy{
				background: url('../../static/images/buy.png') no-repeat center/cover
			}
			.get{
				background: url('../../static/images/get.png') no-repeat center/cover;
			}
		}
	}
</style>
<style lang="scss" scoped>
	.main{
		padding: 0;
		margin-bottom: 80upx;
		.inv-h-w{
			display: flex;
			width: 100%;
			border-bottom: 1upx solid #E6E8ED;
			padding-left: 52upx;
			.inv-h{
				text-align: center;
				color: #666;
				line-height: 80upx;
				font-size: 28upx;
				margin-right: 60upx;
			}
			.inv-h-se{
				font-size: 32upx;
				color: #42A2EC;
				border-bottom: 6upx solid #5BA7FF;
			}
		}
		.list{
			font-size: 34upx;
			padding-bottom: 30upx;
			color: #151414;
			.i-con{
				padding: 36upx  52upx;
				border-bottom: 1upx solid #E6E8ED;
				.attribute{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					margin-bottom: 30upx;
				}
				.attribute.top{
					justify-content: flex-start;
				}
				.attribute.center,.small{
					color: #888;
					font-size: 26upx;
				}
				.small{
					line-height: 42upx;
				}
			}
		}
	}
</style>
