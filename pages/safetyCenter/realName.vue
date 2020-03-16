<template>
	<view class="wrap">
		<view class="main">
			<view class="group">
				<view style="font-size: 32upx;color: #171719;font-weight: bold;">国家地区</view>
				<view style="padding-right: 31upx;">
					<text style="font-size: 30upx;color: #666;margin-right: 20upx;">中国</text>
					<image src="../../static/right.png" mode="" style="width:18upx; height:30upx;vertical-align: -5upx;"></image>
				</view>
			</view>
		</view>
		<view class="main">
			<view class="group">
				<input type="text" v-model="realname" placeholder="请输入您的姓名"/>
			</view>
			<view class="group no">
				<input type="text" v-model="id_card" placeholder="请输入您的身份证号"/>
			</view>
		</view>
		<view class="but" @click="_uploadIDCard">下一步</view>
	</view>
</template>

<script>
	export default{
		data (){
			return{
				realname:'',
				id_card:''
			}
		},
		onLoad(option) {
			switch(option.realname) {
			     case '审核中':
			        uni.reLaunch({
			        	url:'../safetyCenter/result'
			        })
			        break
			     case '已认证':
			        uni.reLaunch({
			        	url:'../safetyCenter/resultSucc'			        ,
					})
			        break
			     default:
			        
			}
			
		},
		methods:{
			toPage(Url) {
				uni.navigateTo({
					url:Url
				})
			},
			// 上传身份证信息
			_uploadIDCard() {
				if (this.realname === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入您的姓名'
					});
					return;
				}
				if (this.id_card === '') {
					uni.showToast({
						icon: 'none',
						title: '请输入您的身份证号'
					});
					return;
				}
				uni.getNetworkType({
					success: (res) => {
						if (res.networkType == 'none') {
							uni.showToast({
								icon: 'none',
								title: '当前网络不可用'
							})
						}
					}
				})
				uni.showLoading({
					title: '加载中'
				})
				const mobile = uni.getStorageSync('user_mobile')
				const code = '86'
				const realname = this.realname
				const id_card = this.id_card
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${code}**${realname}**${id_card}**${timestamp}**cglhhaofengshui`)
				let params = {
					code,
					realname,
					id_card,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.uploadIDCard,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
						    title: res.data.msg,
						    duration: 2000
						})
						uni.reLaunch({
							url:'../safetyCenter/result'
						})
					}
					uni.hideLoading()
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					});
				})
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
				justify-content: space-between;
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


