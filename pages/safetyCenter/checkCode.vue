<template>
	<view class="content">
		<view class="code">
			<text class="tip">两次资金密码不一致，请重新设置</text>
			<ul class="num">
				<li class="num1"><input type="text" value="" /></li>
				<li class="num2"><input type="text" value="" /></li>
				<li class="num3"><input type="text" value="" /></li>
				<li class="num4"><input type="text" value="" /></li>
				<li class="num5"><input type="text" value="" /></li>
				<li class="num6"><input type="text" value="" /></li>
			</ul>
		</view>
	</view>
</template>

<script>
</script>
	
<style lang="scss" scoped>
	page{
		background-color: #fbfbfb;
	}
	.content{
		width: 100%;
		height: 772upx;
		background-color: #fff;
		border-top: 1upx solid #E6EBED; 
		.code{
			margin: 164upx auto;
			width: 630upx;
			text-align: center;
			.tip{
				font-size: 34upx;
				color: red;
			}
			.num {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				list-style: none;
				margin-top: 100upx;
				padding: 0;
				li{
					box-sizing: border-box;
					width: 90upx;
					height: 90upx;
					padding-top: 10upx;
					line-height: 90upx;
					text-align: center;
					border: 1upx solid #888; 
					color: #333;
					input{
						font-size: 54upx;
					}
				}
			}
		}
		
	}
</style>

