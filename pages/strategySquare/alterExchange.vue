<template>
	<view class="wrap">
		<view class="main">
			<view style="color:#171719;font-size:32upx;margin-bottom:96upx;">
				<view style="display:flex;margin-bottom: 32upx;font-size:38upx;">
					<view style="line-height:74upx;">交易所：</view>
					<view style="line-height:74upx;">{{bourseTitle}}</view>
				</view>
				<view style="display: flex;margin-bottom: 32upx;">
					<view style="line-height:76.1upx;">名称：</view>
					<view style="box-sizing:border-box;width:555upx;height: 76.1upx;padding:15upx;border:2upx solid #BCBDC1;border-radius:10upx;">
						<input type="text" placeholder="请输入该交易所账户名称" v-model="account_title">
					</view>
				</view>
				<view style="display: flex;margin-bottom: 32upx;">
					<view style="line-height:76.1upx;margin-right:25upx;">PK：</view>
					<view style="box-sizing:border-box;width:555upx;height: 76.1upx;padding:15upx;border:2upx solid #BCBDC1;border-radius:10upx;">
						<input type="text" placeholder="请输入交易所API-KEY" v-model="api_key">
					</view>
				</view>
				<view style="display: flex;margin-bottom: 32upx;">
					<view style="line-height:76.1upx;margin-right:25upx;">SK：</view>
					<view style="box-sizing:border-box;width:555upx;height: 76.1upx;padding:15upx;border:2upx solid #BCBDC1;border-radius:10upx;">
						<input type="text" placeholder="请输入交易所SECRET-KEY" v-model="secret_key">
					</view>
				</view>
			</view>
			<view>
				<view style="color:#171719;font-size:32upx;margin-bottom:44upx;">步骤</view>
				<view style="font-size:30upx;color:#144088;line-height: 48upx;">
					<view>1.登录交易所账户</view>
					<view>2.进入”我的账户“下"设置"菜单</view>
					<view>3.选择”API设置"，并点击"创建API" </view>
					<view>4.复制对应秘钥填入以上</view>
					<view>5.如有疑问请联系创谷量化客服</view>
				</view>
			</view>
			<view class="but" @click="_Bourse_edit">修改	</view>
		</view>
		<!--客服-->
		<uni-popup ref="customerService" :custom="true">
			<view class="uni-share" style="width:440upx;height: 493upx;">
				<image src="../../static/images/server/server.png" style="width: 274upx;height: 274upx;"></image>
				<view class="customerServiceText">咨询火星量化客服<br>请点击下载二维码图片 </view>
			</view>
			<view style="display: flex;justify-content: center;padding-top: 66upx;" @click="cancel('customerService')">
				<image src="../../static/img/delea.png" style="width: 72upx;height: 72upx;"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	export default {
		onNavigationBarButtonTap: function(e) {
			this.$refs.customerService.open()
		},
		onLoad(option) {
			this.user_bourse_id = option.userBourseId
			this.bourseTitle = option.title
			this.bourseId = option.bourseId
			this._Bourse_info()
		},
		data() {
			return {
				bourseTitle:'', //交易所名称
				user_bourse_id:'' ,//交易所用户id
				bourseId:'',//交易所ID
				account_title:'',//用户交易所名称
				api_key:'',//apikey
				secret_key:''
			}
		},
		methods: {
			// 通用关闭弹框
			cancel(type) {
				this.$refs[type].close()
			},
			//交易所详情
			_Bourse_info(){
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
				const user_bourse_id = this.user_bourse_id
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${user_bourse_id}**${timestamp}**cglhhaofengshui`)
				let params = {user_bourse_id,timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.Bourse_info,
					data: params
				}).then((res) => {
					uni.hideLoading()
					if (res.data.code == 1) {
						//初始化信息
						this.account_title = res.data.data.account_title
						this.api_key = res.data.data.api_key
						this.secret_key = res.data.data.secret_key
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
			
			//修改交易所账号
			_Bourse_edit(){
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
				if (this.account_title=='') {
					uni.showToast({
						icon: 'none',
						title: '请输入交易所账户名称'
					});
					return;
				}
				if (this.api_key=='') {
					uni.showToast({
						icon: 'none',
						title: '请输入交易所API-KEY'
					});
					return;
				}
				if (this.secret_key=='') {
					uni.showToast({
						icon: 'none',
						title: '请输入交易所SECRET-KEY'
					});
					return;
				}
				uni.showLoading({
					title: '加载中'
				})
				const mobile = uni.getStorageSync('user_mobile')
				const user_bourse_id = this.user_bourse_id
				const bourse_id = this.bourseId
				const account_title = this.account_title
				const api_key = this.api_key
				const secret_key = this.secret_key
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${user_bourse_id}**${bourse_id}**${account_title}**${api_key}**${secret_key}**${timestamp}**cglhhaofengshui`)
				let params = {user_bourse_id,bourse_id,account_title,api_key,secret_key,timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.Bourse_edit,
					data: params
				}).then((res) => {
					uni.hideLoading()
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						this.getds = setInterval(()=>{
							uni.navigateBack()
						}, 1000)
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			}
		},
		components: { 
			uniPopup
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		background-color:#f5f5f5;
		font-family: 'PingFang-SC-Bold';
		.main{
			box-sizing: border-box;
			width: 710upx;
			margin: 34upx auto 105upx;
			padding: 49upx 0 72upx 31upx;
			background-color: #fff;
			border-radius: 15upx;
			.but{
				width: 642upx;
				height: 96upx;
				margin-top: 66upx;
				color: #fff;
				font-size: 34upx;
				line-height: 96upx;
				text-align: center;
				border-radius: 10upx;
				background-color: #42A2EC
			}
		}
	}
	/* 底部分享 */
	.uni-share {
		width:440upx;
		height:493upx;
		background:rgba(255,255,255,1);
		border-radius:24upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	.customerServiceText{
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(23,23,25,1);
		text-align: center;
		margin-top: -60upx;
	}
</style>
