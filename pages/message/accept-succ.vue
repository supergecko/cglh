<template>
	<view class="content">
		<view class="c-img">
			<image class="img" src="../../static/images/success.png" mode="" width="176" height="76"></image>
			<br/><text class="tit">认购受理成功</text><br/>
			<text class="subtit">请耐心等待项目认购进度，认购完成后开始起息</text>
		</view>
		<view class="new">
			<view class="named">
				<view class="n-tit">
					<text class="way">认购份数</text>
				</view>
				<view class="n-tit">
					<text class="num">10份</text><br/>
				</view>
			</view>
			<view class="named">
				<view class="n-tit">
					<text class="way">认购数量</text>
				</view>
				<view class="n-tit">
					<text class="num">10 ETH</text><br/>
				</view>
			</view>
			<view class="named no">
				<view class="n-tit">
					<text class="way">认购时间</text>
				</view>
				<view class="n-tit">
					<text class="num">2019.08.09 10:02</text><br/>
				</view>
			</view>
		</view>	
		<view class="shop">
			<view class="named">
				<view class="s-tit sm">
					<text class="way">项目名称</text><br/>
				</view>	
				<view class="s-tit">
					<text class="num">ETH余币宝理财系列-003期</text><br/>
				</view>
			</view>	
			<view class="named">		
				<view class="s-tit">
					<text class="way">预期年化利率</text>
				</view>
				<view class="s-tit">
					<text class="num">12%</text><br/>
				</view>
			</view>
			<view class="named">
				<view class="s-tit">
					<text class="way">投资期限</text>
				</view>
				<view class="s-tit">
					<text class="num">30天</text><br/>
				</view>
			</view>
			<view class="named">
				<view class="s-tit">
					<text class="way">起息时间</text>
				</view>
				<view class="s-tit">
					<text class="num">2019.08.09</text><br/>
				</view>
			</view>
			<view class="named no">
				<view class="s-tit">
					<text class="way">回款时间</text>
				</view>
				<view class="s-tit">
					<text class="num">2019.09.09</text><br/>
				</view>
			</view>
		</view>
		<view class="but">
			查看我的账户
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
	.content{
		padding: 0 22upx;
		background-color: #F8F8F8;
		.c-img{
			margin: 0 0 20upx;
			padding: 60upx 0;
			background-color: #fff;
			text-align: center;
			.img{
				width: 388upx;
				height: 152upx;
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
		}
		.new{
			background-color: #fff;
			.named{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-left: 30upx;
				padding-right: 30upx;
				border-bottom: 1upx solid #E6E8ED;
				.n-tit{
					font-size: 32upx;	
					line-height: 106upx;
					.way{
						color: #151414;
					}
					.num{
						color: #666;
					}
				}
				.divide{
					margin-top: 20upx;
				}
			}
			.named.no{
				border: none;
			}
		}
		.shop{
			background-color: #fff;
			margin-top: 20upx; 
			.named{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-left: 30upx;
				padding-right: 30upx;
				border-bottom: 1upx solid #E6E8ED;
				.s-tit{
					font-size: 32upx;	
					line-height: 106upx;
					.way{
						color: #151414;
					}
					.w-num{
						font-size: 22upx;
						color: #999;
					}
					.num{
						color: #666;
					}
				}
				.s-tit.sm{
					padding: 30upx 0;
					line-height: 50upx;
				}
			}
			.named.no{
				border: none;
			}
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
</style>

