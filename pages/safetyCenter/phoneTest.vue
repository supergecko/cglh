<template>
	<view class="wrap">
		<view class="main">
			<view class="group">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>
				<input type="text" value="" placeholder="请输入手机号" style="text-indent: 1em;"/>
			</view>
			<view class="group no">
				<input type="text" value="" placeholder="请输入短信验证码"/>
				<text>获取验证码</text>
			</view>
		</view>
		<view class="but">确认</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            title: 'picker',
	            array: ['+86', '+87', '+88', '+89'],
	            index: 0
	        }
	    },
		 methods: {
		        bindPickerChange: function(e) {
		            console.log('picker发送选择改变，携带值为', e.target.value)
		            this.index = e.target.value
		        }
		    }
		}
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		background-color: #f8f8f8;
		#num{
			appearance:none;
			outline: none;
			border: none;
			width: 97upx;
			height: 54upx;
			color: #666;
			font-size: 32upx;
			background: url(../../static/images/down.png) no-repeat right center;
		}
		.main{
			width: 100%;
			margin-top: 30upx;
			box-shadow: 1upx 1upx 5upx #E6E8ED;
			background-color: #fff;
			.group{
				background-color: #fff;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				width: 100%;
				height: 120upx;
				padding: 44upx 0 0 0;
				margin-left: 30upx;
				border-bottom: 1upx solid #E6E8ED;
				font-size: 30upx;
				color: #333;
				image{
					width: 50upx;
					height: 50upx;
					margin-right: 24upx;
				}
				.hide{
					width: 42upx;
					height: 20upx;
					margin: 20upx 0 0 0;
				}
				input{
					font-size: 32upx;
					color: #000;
					width: 520upx;	
				}
			}
			.group.no{
				border: 0;
			}
		}
		.but{
			width: 670upx;
			height: 96upx;
			margin: 84upx auto 42upx;
			padding: 0;
			line-height: 96upx;
			text-align: center;
			font-size: 34upx;
			color: #fff;
			background-color: rgb(145,201,244);
			border-radius: 10upx;
			cursor: pointer;
		}
	}
</style>


