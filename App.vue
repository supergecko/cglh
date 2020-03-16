<script>
export default {
	onLaunch: function() {
		// #ifdef APP-PLUS
		//app启动时打开启动广告页
		var w = plus.webview.open(
			'hybrid/html/advertise/advertise.html',
			'本地地址',
			{ top: 0, bottom: 0, zindex: 999 },
			'fade-in',
			500
		)
		//设置定时器，4s后关闭启动广告页
		setTimeout(function() {
			plus.webview.close(w)
		}, 3060)
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
		    uni.request({  
		        url: 'http://api.haofengshui.wang/api/home/index/checkupdate',  
		        data: {  
		            version: widgetInfo.version,  
		            app_name: 'cglh'  
		        },
		        success: (result) => {
		            var data = result.data
					console.log(data)
		            if (data.code ==="10002") {
						uni.downloadFile({
						    url: data.wgtUrl,  
						    success: (downloadResult) => { 
						        if (downloadResult.statusCode === 200) {
									plus.nativeUI.closeWaiting()
						            plus.runtime.install(downloadResult.tempFilePath, {  
						                force: false //是否强制安装  
						            }, function() {  
										console.log('install success...');
						                plus.runtime.restart();  
						            }, function(e) { 
										console.error('install fail...'); 
						            });  
						        }  
						    }
						})
		            }  
		        }  
		    });  
		})
		// #endif
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
page {
	min-height: 100%;
	display: flex;
}

/* #ifdef MP-BAIDU */
page {
	width: 100%;
	height: 100%;
	display: block;
}

swan-template {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
	min-height: 100vh;
}

/* #endif */

/* 原生组件模式下需要注意组件外部样式 */
m-input {
	width: 100%;
	min-height: 100%;
	display: flex;
}

.content {
	display: flex;
	flex: 1;
	flex-direction: column;
	background-color: #efeff4;
	padding: 20upx;
}

.input-group {
	background-color: #ffffff;
	margin-top: 40upx;
	position: relative;
}

.input-group::before {
	position: absolute;
	right: 0;
	top: 0;
	left: 0;
	height: 1upx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-group::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 1upx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-row {
	display: flex;
	flex-direction: row;
	position: relative;
}

.input-row .title {
	width: 20%;
	height: 50upx;
	min-height: 50upx;
	padding: 15upx 0;
	padding-left: 30upx;
	line-height: 50upx;
}

.input-row.border::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 15upx;
	height: 1upx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.btn-row {
	margin-top: 50upx;
	padding: 20upx;
}

button.primary {
	background-color: #0faeff;
}
</style>
