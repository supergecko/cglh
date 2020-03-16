<template>
	<view class="wrap">
		<view class="main">
			<view class="intro">
				<h2 style='color:#171719;font-size:34upx;margin-bottom:28upx;'>策略介绍</h2>
				<!-- <view  style='color:#171719;font-size:30upx;line-height: 46upx;margin-bottom: 48upx;'>
					<view>如果实际交易数据都大于-1，无法买入。</view>
					<view>如果实际交易数据都小于 1，无法卖出。</view>
					<view>只有实际交易数据都小于-1，才能买入。实际交易数据都大于 1，才能卖出。</view>
					<view style="margin-bottom: 38upx;">注定实际交易我们会出现一定程度亏损幅度和天数，一定程度少盈利幅度和天数。</view>
					<view>假设是单边上涨，最大程度盈利取决于如何定义“顶”。</view>
					<view style="margin-bottom: 38upx;">假设是单边下跌，最小程度亏损取决于如何定义“底”。</view>
					<view>假设是震荡，如果只保留“顶”和“底”，触发“顶”和“底”次数越多，盈利越多，如果分的级别越多，未必可以增加盈利。</view>
				</view> -->
				<section style='color:#171719;font-size:30upx;line-height: 46upx;margin-bottom: 48upx;' v-html='strategyInfo.instruction'></section>
			</view>
			<view class="condition" style="margin-bottom: 48upx;">
				<h2 style='color:#171719;font-size:34upx;margin-bottom:28upx;'>申购条件</h2>
				<view style='display:flex;' v-for="(item,i) in strategyInfo.apply" v-if="strategyInfo.apply" :key="i">
					<view style='margin-right:78upx;'>
						<view style='color:#666666;font-size:28upx;'>交易所</view>
						<view style='color:#171719;font-size:32upx;'>{{item.bourse_title}}</view>
					</view>
					<view>
						<view style='color:#666666;font-size:28upx;'>资金要求</view>
						<view style='color:#171719;font-size:32upx;'>{{item.value}}</view>
					</view>
				</view>
			</view>
			<view class="exchange" style="margin-bottom: 81upx;">
				<h2 style='color:#171719;font-size:34upx;margin-bottom:28upx;'>交易所</h2>
				<view style="display:flex;justify-content: space-between;margin-bottom:51upx;">
					<view>
						<select class="selectExchange" v-model="exchangeSelectedId" @change="getSelected">
						    <option :value="item.account.user_bourse_id" v-for="(item,i) in exchangeList" :key="i" v-if="item.account">{{item.title}}</option>                                    
						</select>
					</view>
					<view style="width: 156upx;height:67upx;margin-top:7upx;line-height:67upx;text-align:center;background-color:#42A2EC;font-size:30upx;color:#fff;border-radius:10upx;" @click="_Bourse_api_check()">
						未验证
					</view>
				</view>
				<view>
					<!-- 交易对 -->
					<view class="item" @click="openTransactionPairs()">
						<view class="item1">交易对</view>
						<view class="item2">
							<text>{{transactionText}}</text>
							<image src="../../static/newimg/right.png" style='width:30upx;height:34upx;margin-left:10upx;vertical-align: -6upx;'></image>
						</view>
					</view>
					<view class="item" @click="openLeverageMultiple()">
						<view class="item1">
							<text>杠杆倍数</text>
<!-- 							<image src="../../static/newimg/tip.png" style='width:32upx;height:32upx;margin-left:12upx;vertical-align: -6upx;'></image> -->
						</view>
						<view class="item2">
							<text> {{leverageNumber}} 倍</text>
							<image src="../../static/newimg/right.png" style='width:30upx;height: 34upx;margin-left:10upx;vertical-align: -6upx;'></image>
						</view>
					</view>
					<view class="item">
						<view class="item1">
							<text>开仓比例</text>
						</view>
						<view class="item2">
							<yp-number-box @change="change1" :index="openProportion" :min="0" :max="99999" :step="0.001"/>
						</view>
					</view>
					<view class="item">
						<view class="item1">
							<text>平仓比例</text>
						</view>
						<view class="item2">
							<yp-number-box @change="change2" :index="openPositionRatio" :min="0" :max="99999" :step="0.001"/>
						</view>
					</view>
					<view class="item" @click="openDirection()">
						<view class="item1">
							<text>方向</text>
						</view>
						<view class="item2">{{direction}}</view>
					</view>
					<view class="item">
						<view class="item1">
							<text>网格总量</text>
						</view>
						<view class="item2">
							<yp-number-box @change="change3" :index="openPositionRatio" :min="0" :max="99999"/>
						</view>
					</view>
					<view class="item">
						<view class="item1">
							<text>下单张数</text>
						</view>
						<view class="item2">
							<yp-number-box @change="change4" :index="openPositionRatio" :min="0" :max="99999"/>
						</view>
					</view>
					<view class="item">
						<view class="item1">软件服务费</view>
						<view class="item2">￥1.00</view>
					</view>
					<view class="item" >
						<view class="item1" style="line-height: 36upx;margin-top:18upx;" >
							<text>支付方式</text><br/>
							<text style="color:#FE8E15;font-size:4upx;">USDT支付可享更多优惠</text>
						</view>
						<view class="item2">
							<text>USDT</text>
							<!-- <image src="../../static/newimg/right.png" style='width:30upx;height: 34upx;margin-left:10upx;vertical-align: -6upx;'></image> -->
						</view>
					</view>
				</view>
			</view>
			<view class="condition" style="margin-bottom: 48upx;">
				<h2 style='color:#171719;font-size:34upx;margin-bottom:50upx;'>套餐选择</h2>
				<radio-group name="chose" style="font-size:32upx;color:#171719;">
					<label v-for="(item,i) in strategy_price" :key="i">
						<view style='margin-bottom:29upx;'>
							<radio/><text>{{item.title}}({{item.price}}元)</text>
						</view>
					</label>
				</radio-group>
			</view>
		</view>
		<view style="width: 710upx;margin: 36upx auto 60upx;color:#171719;font-size:28upx;">
			<label>
				<checkbox /><text>我同意相关协议及风险提示</text>
			</label>
		</view>
		<view class="but" @click="toPath(`../strategySquare/cashier`)">创建策略</view>
		<!--客服-->
		<uni-popup ref="customerService" :custom="true">
			<view class="uniShare" style="width:440upx;height: 493upx;">
				<image src="../../static/images/server/server.png" style="width: 274upx;height: 274upx;"></image>
				<view class="customerServiceText">咨询火星量化客服<br>请点击下载二维码图片 </view>
			</view>
			<view style="display: flex;justify-content: center;padding-top: 66upx;" @click="cancel('customerService')">
				<image src="../../static/img/delea.png" style="width: 72upx;height: 72upx;"></image>
			</view>
		</uni-popup>
		
		<!-- 杠杆倍数 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpvuePicker1"
			:mode="mode"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm1"
			@onCancel="onCancel"
			:pickerValueArray="pickerValueArray1"
		></mpvue-picker>
		<!-- 交易对 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpvuePicker2"
			:mode="mode"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm2"
			@onCancel="onCancel"
			:pickerValueArray="pickerValueArray2"
		></mpvue-picker>
		<!-- 方向 -->
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpvuePicker3"
			:mode="mode"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm3"
			@onCancel="onCancel"
			:pickerValueArray="pickerValueArray3"
		></mpvue-picker>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import contractData from '@/util/contractData.js'
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue'
	import ypNumberBox from "@/components/yp-number-box/yp-number-box.vue"
	export default {
		onNavigationBarButtonTap: function(e) {
			this.$refs.customerService.open()
		},
		onLoad(option) {
			this.strategyId = option.strategyId
			this.pickerValueArray1 = contractData.leverageMultiple
			this.pickerValueArray2 = contractData.transactionPairs
			this.pickerValueArray3 = contractData.direction
			this._Strategy_detail()
			this._Bourse_by_self()
			uni.setNavigationBarTitle({
			　　title:option.title
			})
		},
		data() {
			return {
				listBoxStyle: `height: 40px; font-size: 16px;`,
				strategy_price:[],//套餐选择
				exchangeSelectedId: '' ,//交易所ID
				exchangeList: [],//交易所Arr
				strategyId:'' ,// 策略ID
				strategyInfo:{},
				leverageNumber:0,//杠杆倍数
				transactionText:'BTC_USDT',//交易对
				openProportion:0,//开仓比例
				openPositionRatio:0,//平仓比例
				totalGrid:0,//网格总量
				orderNumber:0,//下单张数
				direction:'',
				pickerValueArray1:'',
				pickerValueArray2:'',
				pickerValueArray3:'',
				themeColor: '#007AFF', //主题色
				mode: 'selector',
				deepLength: 1, //几级联动
				pickerValueDefault: [1] //默认值
			}
		},
		methods: {
			//获取选中的交易所
			getSelected(){
				console.log(this.exchangeSelectedId)
			},
			change1(e){
				this.openProportion = e[1]
			},
			change2(e){
				this.openPositionRatio = e[1]
			},
			change3(e){
				this.totalGrid = e[1]
			},
			change4(e){
				this.orderNumber = e[1]
			},
			//打开杠杆倍数
			openLeverageMultiple(){
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker1.show()
			},
			//打开交易对
			openTransactionPairs(){
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker2.show()
			},
			//打开方向
			openDirection(){
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker3.show()
			},
			onCancel(e) {
				console.log(e);
			},
			//确定杠杆倍数
			onConfirm1(e) {
				this.leverageNumber = e.label
			},
			//确定交易对
			onConfirm2(e) {
				this.transactionText = e.label
			},
			//确定方向
			onConfirm3(e) {
				this.direction = e.label
			},
			//获取选中的值
			change({newVal, oldVal, index, orignItem}){ 
				console.log(newVal, oldVal, index, orignItem);
			},
			toPath(URL){
				uni.navigateTo({
					url:URL
				})
			},
			// 通用关闭弹框
			cancel(type) {
				this.$refs[type].close()
			},
			//通用打开弹框
			openuniPopup(type){
				this.$refs[type].open()
			},
			//策略详情
			_Strategy_detail(){
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
				const strategy_id = this.strategyId
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${strategy_id}**${timestamp}**cglhhaofengshui`)
				let params = {strategy_id, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.Strategy_detail,
					data: params
				}).then((res) => {
					uni.hideLoading()
					if (res.data.code == 1) {
						//初始化信息
						this.strategyInfo = res.data.data
						this.strategy_price = res.data.data.strategy_price
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
			
			//购买时候我的交易所列表
			_Bourse_by_self(){
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
				const strategy_id = this.strategyId
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${strategy_id}**${timestamp}**cglhhaofengshui`)
				let params = {strategy_id, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.Bourse_by_self,
					data: params
				}).then((res) => {
					uni.hideLoading()
					if (res.data.code == 1) {
						//初始化信息
						this.exchangeList = res.data.data
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
			
			//交易所api验证
			_Bourse_api_check(){
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
				const user_bourse_id = this.exchangeSelectedId
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${user_bourse_id}**${timestamp}**cglhhaofengshui`)
				let params = {user_bourse_id, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.Bourse_api_check,
					data: params
				}).then((res) => {
					uni.hideLoading()
					if (res.data.code == 1) {
						//初始化信息
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
			
		},
		components: { uniPopup,mpvuePicker,ypNumberBox }
	}
</script>

<style lang="scss" scoped>
	.selectExchange{
		width:320upx;
		height:70upx;
		border:2upx solid rgba(153,153,153,1);
		border-radius:4upx;
	}
	/deep/ .uni-checkbox-input{
		border-radius: 24upx;
	}
	.wrap{
		width: 100%;
		background-color: #f5f5f5;
		font-family: 'PingFang-SC-Bold';
		.main{
			box-sizing: border-box;
			width: 710upx;
			margin: 0 auto;
			padding: 35upx 34upx 20upx 28upx;
			background-color: #fff;
			border-radius: 20upx;
			.exchange{
				.item{
					display: flex;
					width: 100%;
					height: 105upx;
					line-height: 105upx;
					border-bottom: 1upx solid #E6E8ED;
					justify-content: space-between;
					.item1{
						color: #666;
						font-size: 32upx;
					}
					.item2{
						color: #171719;
						font-size: 32upx;
					}
				}
			}
		}
		.but{
			width:276upx;
			height: 70upx;
			margin: 0 auto 64upx;
			line-height: 70upx;
			text-align: center;
			font-size: 34upx;
			border-radius: 10upx;
			color: #fff;
			background-color: #42A2EC;
		}
	}
	
	/* 客服 */
	.uniShare {
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
	
	/* 底部分享 */
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
</style>
