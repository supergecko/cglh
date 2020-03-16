<template>
	<view>
		<view style="display:flex ;justify-content: center;width: 750upx;margin-top: 157upx;"><image src="../../static/logo.png" class="aboutUsImg"></image></view>
		<view style="text-align: center;margin-top: 28upx;font-size:34upx;font-family:PingFang SC;font-weight:400;color:rgba(21,20,20,1);">
			创谷量化
		</view>
		<view style="margin-top: 557upx;text-align: center;font-size:34upx;font-family:PingFang SC;font-weight:400;color:rgba(51,51,51,1);">
			{{versionNumber}}
		</view>
		<view style="font-size:32upx;font-family:PingFang SC;font-weight:400;color:rgba(66,162,236,1);text-align: center;margin-top: 16upx;">检查更新</view>
		<view style="font-size:28upx;font-family:PingFang SC;font-weight:400;color:rgba(136,136,136,1);text-align: center;margin-top: 70upx;">
			copyright©2019 BQcoin.All Rights Reserved
			</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				versionNumber:'v2.0.0'
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			var appid = plus.runtime.version
			this.versionNumber = appid
			console.log('应用的 appid 为：' + appid)
			// #endif
		},
		methods:{
			
		}
	}
</script>

<style>
.aboutUsImg {
	width: 200upx;
	height: 200upx;
}
</style>
