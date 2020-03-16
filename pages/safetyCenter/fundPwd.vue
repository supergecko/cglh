<template>
	<view class="wrap">
		<view class="main">
			<view class="group" @click="toPage('../safetyCenter/capitalPwd')">
				<view style="font-size: 32upx;color: #151414;">设置资金密码</view>
				<view style="padding-right: 31upx;">
					<text style="font-size: 28upx;color: #42A2EC;margin-right: 20upx;">{{safetyInfo.security_pass}}</text>
					<image src="../../static/right.png" mode="" style="width:18upx; height:30upx;vertical-align: -5upx;"></image>
				</view>
			</view>
			<view class="group" @click="openPopup()">
				<view style="font-size: 32upx;color: #151414;">资金密码时效</view>
				<view style="padding-right: 31upx;display: flex;align-items: center;">
					<view style="font-size: 28upx;color: #818181;margin-right: 20upx;">{{hourText}}</view>
					<image src="../../static/right.png" mode="" style="width:18upx; height:30upx;vertical-align: -5upx;"></image>
				</view>
			</view>
			<chunLei-modal v-model="value" :mData="inputData" type="input" @onConfirm="onConfirm" @cancel="cancel" navMask></chunLei-modal>
			<uni-popup class="pop" ref="popup" type="bottom">
				<view class="pop-item" @click='checkPopup(item)' v-for="(item, i) in hourArr" :key="i" >
					{{item.name}}
				</view>
				<view class="line" style="height: 0upx;">
				</view>
				<view class="pop-item cancel" @click='closePopup'>取消</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import chunLeiModal from '@/components/chunLei-modal/chunLei-modal.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default{
		components: {
			chunLeiModal,
			uniPopup
		},
		data(){
			return{
				safetyInfo:{},
				value:false,
				password:'',
				inputData:{
					title:'设置',
					content:[
						{title:'资金密码',content:'',type:'password',placeholder:'请输入资金密码'},
					]
				},
				hourArr:[
					{name:'2小时',id:2},
					{name:'4小时',id:4},
					{name:'8小时',id:8},
					{name:'12小时',id:12},
					{name:'24小时',id:24}
				],
				hourText:'请选择时效',
				hour:0
			}
		},
		onLoad(option) {
			this._safetyIndex()
		},
		onShow() {
			this._safetyIndex()
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				//刷新要执行的方法
				this._safetyIndex()
				uni.stopPullDownRefresh(); //停止下拉刷新动画
				uni.showToast({
					icon: 'none',
					title: '刷新成功'
				})
			}, 1000);
			uni.getNetworkType({
			    success:  (res) => {
			        if(res.networkType == 'none'){
						uni.showToast({
							icon:'none',
							title:'当前网络不可用'
						})
						clearTimeout(fres)
						uni.stopPullDownRefresh(); //停止下拉刷新动画
					}
			    }
			})
		},
		methods:{
			onConfirm(e){
				this.password = e[0].content
				this._securityPasswordAuth()
			},
			cancel(){
				this.hourText = '请选择时效'
			},
			checkPopup(item) {
				this.$refs.popup.close()
				this.hourText = item.name
				this.hour = item.id
				this.value = !this.value
			},
			closePopup() {
				this.$refs.popup.close()
			},
			openPopup() {
				this.$refs.popup.open()
			},
			toPage(){
				if(this.safetyInfo.security_pass==='未设置'){
					uni.navigateTo({
						url:'../safetyCenter/capitalPwd'
					})
				} else {
					uni.navigateTo({
						url:'../safetyCenter/capitalResetPwd'
					})
				}
				
			},
			// 安全中心首页
			_safetyIndex() {
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
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${timestamp}**cglhhaofengshui`)
				let params = {
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.safetyIndex,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.safetyInfo = res.data.data
						if(res.data.data.security_pass_hour !== 0){
							this.hourText = res.data.data.security_pass_hour + '小时'
						}
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
			},
			// 设置资金密码时效
			_securityPasswordAuth() {
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
					title: '设置中'
				})
				const mobile = uni.getStorageSync('user_mobile')
				const password = this.password
				const hour = this.hour
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${password}**${hour}**${timestamp}**cglhhaofengshui`)
				let params = {
					password,
					hour,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.securityPasswordAuth,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
						    title: res.data.msg,
						    icon: 'none'
						})
						this._safetyIndex()
					} else{
						uni.showToast({
						    title: res.data.msg,
						    icon: 'none'
						})
						this.getds = setTimeout(()=>{
							this.value = !this.value
						}, 2000)
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					this.hourText = '请选择时效'
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-item {
		height: 100upx;
		border-bottom: 1upx solid rgb(245, 245, 245);
		background-color: #fff;
		line-height: 100upx;
		display: block;
		text-align: center;
		font-size: 34upx;
		color: #151414;
	}
	.uni-input-placeholder{
		font-size: 32upx;
		color: #AFADAD;
	}
	.wrap{
		width: 100%;
		background-color: #f8f8f8;
		font-family: 'PingFang-SC-Medium';
		.main{
			width: 100%;
			margin-top: 30upx;
			box-shadow: 1upx 1upx 5upx #E6E8ED;
			background-color: #fff;
			font-family: 'PingFang-SC-Medium';
			.group{
				background-color: #fff;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				height: 120upx;
				
				margin-left: 30upx;
				border-bottom: 1upx solid #E6E8ED;
				font-size: 30upx;
				color: #333;
				image{
					width: 50upx;
					height: 50upx;
					margin-right: 24upx;
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
	}
</style>




