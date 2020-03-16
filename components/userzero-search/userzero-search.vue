<template>
	<view class="wrap">
		<view class="header">
			<view class="item" style="display: flex;align-items: center;">
				<image src="../../static/images/search.png" mode="" style="width:36upx;height:36upx;"></image>
				<input type="text" v-model="inputText" style="display: inline-block;text-indent:15upx;font-size: 30upx;vertical-align: -8upx;" placeholder="请输入币种" />
			</view>
			<view style="color: #fff;font-size:32upx;margin: 14upx 0 0 31upx;" @click="toPage('../quotation/quotation1')">取消</view>
		</view>
		<view class="con" v-for="(item,index) in inputArr" :key="index"  @click="selectIndex(item)">
			<view class="item">
				<text class="item1">{{ item.target_currency_title}} / </text>
				<text class="item2"> {{ item.currency_title}}</text>
				<image class="img" src="../../static/images/minus.png" mode="" style="width:56upx;height:56upx;" v-if="item.is_select===1"></image>
				<image class="img" src="../../static/images/add.png" mode="" style="width:56upx;height:56upx;" v-if="item.is_select===0"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'uSearch',
		computed: {
			searchArr (){
				var that = this;
				var newArr = []
				var len = that.dictArr.length
				if(!that.searchKey){
					for (var i=0;i<len;i++) {
						if(that.dictArr[i].indexOf(that.searchModel)>-1){
							newArr.push(that.dictArr[i])
						}
					}
				}else{
					for (var i=0;i<len;i++) {
						if(that.dictArr[i][that.searchKey].indexOf(that.searchModel)>-1){
							newArr.push(that.dictArr[i])
						}
					}	
				}
				return newArr
			}
		},
		props: {
			"dictArr": {
				type: Array,
				default () {
					return []
				}
			},
			"searchKey": {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				searchModel: '',
				inputText:'',//输入值
				inputArr:[]
			}
		},
		created(){
			
		},
		mounted() {
			
		},
		methods: {
			toPage(URL){
				uni.reLaunch({
					url:URL
				})
			},
			clickBtn(targetCurrencyId,currencyId,isSelect,tradeId){
				if (isSelect===0){
					this._custom_add(targetCurrencyId,currencyId) //加好
				} else {
					this._custom_delete(tradeId) //减号
				}
			},
			// 行情添加自选
			_custom_add(targetCurrencyId,currencyId){
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
				const target_currency_id = targetCurrencyId
				const currency_id = currencyId
				const sign = this.$md5(`${mobile}**${target_currency_id}**${currency_id}**${timestamp}**cglhhaofengshui`)
				let params = {
					target_currency_id,
					currency_id,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.custom_add,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						uni.reLaunch({
							url:'../quotation/quotation1'
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
			},
			// 行情自选删除
			_custom_delete(tradeId){
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
				const trade_id = tradeId
				const sign = this.$md5(`${mobile}**${trade_id}**${timestamp}**cglhhaofengshui`)
				let params = {
					trade_id,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.custom_delete,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						uni.reLaunch({
							url:'../quotation/quotation1'
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
			},
			// 自动搜索
			_Trading(Text){
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
				// uni.showLoading({
				// 	title: '加载中'
				// })
				const mobile = uni.getStorageSync('user_mobile')
				const keyword = Text
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${keyword}**${timestamp}**cglhhaofengshui`)
				let params = {keyword,timestamp,sign}
				this.$ajax.post({
					url: this.$service.api_lists.Trading,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						// 初始化信息
						this.inputArr = res.data.data
					}
					// uni.hideLoading()
				}).catch((err) => {
					// uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
			getSearchInputValue(){
				return this.searchModel
			},
			selectIndex(item){
				this.clickBtn(item.target_currency_id,item.currency_id,item.is_select,item.trade_id)
			}
		},
		watch: {
			inputText(newName, oldName) {
				if (newName !== ''){
					this._Trading(newName)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		background-color: #f8f8f8;
		overflow-x: hidden;
		.header{
			display: flex;
			width: 100%;
			padding: 20upx 0 20upx 30upx;
			background-image: linear-gradient(#42A2EC,#61B2F1);
			.item{
				box-sizing: border-box;
				width: 600upx;
				height: 68upx;
				padding-left: 40upx;
				line-height: 78upx;
				background-color: #fff;
				border-radius: 34upx;
			}
			.uni-input-placeholder{
				font-size:30upx;
			}
		}
		.con{
			width: 100%;
			background-color: #fff;
			.item{
				width: 100%;
				height: 110upx;
				line-height: 110upx;
				border-bottom: 1upx solid #E6E8ED;
				margin-left: 32upx;
				.item1{
					font-size: 34upx;
					color: #171719;
				}
				.item2{
					font-size: 34upx;
					color: #888;
				}
				.img{
					float: right;
					margin-right: 60upx;
					margin-top: 26upx;
				}
			}
		}
		.item.no{
			border: none;
		}
	}
</style>
