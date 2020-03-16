<template>
	<view class="content">
		<view class="code">
			<text class="tip">请输入谷歌验证码</text>
			<ul class="num">
				<li class="num1"><input type="text" value="" maxlength="1"/></li>
				<li class="num2"><input type="text" value="" maxlength="1" /></li>
				<li class="num3"><input type="text" value="" maxlength="1" /></li>
				<li class="num4"><input type="text" value="" maxlength="1" /></li>
				<li class="num5"><input type="text" value="" maxlength="1" /></li>
				<li class="num6"><input type="text" value="" maxlength="1" /></li>
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
				color: #888;
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
					padding-top: 20upx;
					line-height: 90upx;
					text-align: center;
					border: 1upx solid #888; 
					border-radius: 5upx;
					color: #333;
					input{
						font-size: 40upx;
					}
				}
			}
		}
		
	}
</style>
