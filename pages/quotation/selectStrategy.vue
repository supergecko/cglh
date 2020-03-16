<template>
	<view class="wrap">
		<view class="item1">
			<h2 style="font-size:32upx;color:#171719;">第一步：选择策略</h2>
			<radio-group @change="radioChange">
				<view class="con" v-for="(item, i) in Strategy_listArr" :key="i">
					<view class="tit">
						<view style="display:inline-block;margin-right:110upx;"><text style="color:#05275A;font-size:38upx;">{{item.title}}</text></view>
						<view style="display:inline-block">
							<view style="display:inline-block;color:#333;font-size:30upx;">推荐指数：</view>
							<view class="star" v-for="(itemStar,j) in item.star" :key="j"></view>
							<!-- <view class="star no"></view> -->
						</view>
					</view>
					<view class="txt" style="font-size:32upx;color:#333; margin: 45upx 0">
						{{item.instruction}}
					</view>
					<view class="footer">
						<view style="display: flex;align-items: center;">
							<radio style="font-size: 30upx;" :value="item.strategy_id" :checked="i == current" />
							<view style="font-size:32upx;">选择此策略</view>
						</view>
						<view style="font-size:30upx;">策略费用：{{item.price}}USDT/月</view>
					</view>
				</view>
			</radio-group>
		</view>
		<view style="height:370upx;width:750upx;"></view>
		<view class="item2">
			<h2 style="font-size:32upx;color:#171719;">第二步：选择仓位</h2>
			<view class="main">
				<helang-checkbox ref="checkbox" @change="onChange"></helang-checkbox>
			</view>
			<view class="but" @click="checkIn">确定</view>
		</view>
		<chunLei-modal v-model="value" :mData="inputData" type="input" @onConfirm="onConfirm" @cancel="cancel" navMask>
		</chunLei-modal>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import chunLeiModal from '@/components/chunLei-modal/chunLei-modal.vue'
	import helangCheckbox from "@/components/helang-checkbox/helang-checkbox.vue"
	export default {
		components: {
			helangCheckbox,
			chunLeiModal
		},
		onLoad() {
			this.getds = setTimeout(()=>{
				this.selectDemoType();
			}, 500)
			this._Strategy_list()
		},
		data() {
			return {
				value:false,
				inputData:{
					title:'输入仓位',
					content:[
						{title:'仓位',content:'',type:'number',placeholder:'请输入仓位(单位USDT)'},
					]
				},
				current: 0,
				testText:'自定义',
				indexFlag:0,
				Strategy_listArr:[],
				strategy_id:0, //策略Id
				WarehouseNuber:500, // 仓位
				strategyTitle:'', // 策略标题
				strategyCose:'', // 策略费用
			};
		},
		methods: {
			...mapMutations(['WarehouseNuber2', 'strategyTitle2', 'strategyCose2','strategyId']),
			//策略列表
			_Strategy_list(){
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
				let params = {timestamp,sign}
				this.$ajax.post({
					url: this.$service.api_lists.Strategy_list,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						// 初始化信息
						this.Strategy_listArr = res.data.data
						this.strategy_id = res.data.data[0].strategy_id
						this.strategyCose = res.data.data[0].price
						this.strategyTitle = res.data.data[0].title
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
			// 确定
			checkIn(){
				this.WarehouseNuber2(this.WarehouseNuber)
				this.strategyTitle2(this.strategyTitle)
				this.strategyCose2(this.strategyCose)
				this.strategyId(this.strategy_id)
				// uni.setStorageSync("WarehouseNuber", this.WarehouseNuber)
				// uni.setStorageSync("strategyTitle", this.strategyTitle)
				// uni.setStorageSync("strategyCose", this.strategyCose)
				uni.switchTab({
					url:'../quotation/rent'
				})
			},
			//选择仓位输入框确认
			onConfirm(e){
				if(e[0].content ==="") {
					this.testText = '自定义'
				} else {
					this.testText = e[0].content+'USDT'
					this.WarehouseNuber = e[0].content
				}
				this.indexFlag = 2
				this.selectDemoType()
			},
			//选择仓位输入框取消
			cancel(){
				// uni.showToast({title:'取消',icon:'none'})
			},
			tapBtn(){
				this.value = !this.value
			},
			//选择仓位
			onChange(data,content){
				if(data.id == 3){
					this.tapBtn()
				} else {
					this.WarehouseNuber = data.number
				}
			},
			// 选择策略
			radioChange: function(evt) {
				for (let i = 0; i < this.Strategy_listArr.length; i++) {
					if (this.Strategy_listArr[i].strategy_id == evt.target.value) {
						this.current = i
						this.strategy_id = this.Strategy_listArr[i].strategy_id
						this.strategyTitle = this.Strategy_listArr[i].title
						this.strategyCose = this.Strategy_listArr[i].price
						break
					}
				}
			},
			selectDemoType(){
				this.$refs.checkbox.set({
					type:'radio',   // 类型：单选框
					index:this.indexFlag, // 默认选中的项
					column:3,  // 分列
					list:[     // 列表数据
						{text:'500USDT',id:1,number:500},
						{text:'2000USDT',id:2,number:2000},
						{text:this.testText,id:3,number:this.testText}
					]   
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
.wrap {
	width: 100%;
	border-top: 1upx solid #e6e8ed;
	padding: 40upx 0;
	font-family: 'PingFang-SC-Regular';
	h2:before {
		content: '';
		display: inline-block;
		width: 10upx;
		height: 32upx;
		margin-right: 10upx;
		vertical-align: -5upx;
		background-color: #1a77eb;
	}
	.item1 {
		width: 691upx;
		margin: 0 auto;
	}
	.con {
		box-sizing: border-box;
		width: 691upx;
		border-radius: 30upx;
		margin: 44upx 0 47upx;
		padding: 42upx 31upx 20upx;
		box-shadow: 0upx 0upx 10upx 10upx rgb(230, 233, 237);
		.star {
			display: inline-block;
			width: 38upx;
			height: 38upx;
			vertical-align: -10upx;
			background: url(../../static/images/star.png) no-repeat;
			background-size: 38upx 38upx;
		}
		.star.no {
			background: url(../../static/images/grayStar.png) no-repeat;
			background-size: 38upx 38upx;
		}
		.footer {
			padding-top: 33upx;
			border-top: 1upx solid #e6e8ed;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #171719;
			.img {
				width: 46upx;
				height: 46upx;
				background: url(../../static/images/default.png) no-repeat;
				background-size: 46upx 46upx;
			}
			.img.choose {
				background: url(../../static/images/choosing.png) no-repeat;
				background-size: 46upx 46upx;
			}
		}
	}
	.item2 {
		padding: 37upx 29upx;
		border-top: 1upx solid #e6e8ed;
		position: fixed;
		bottom: 0;
		background: #fff;
		.main {
			margin-top: 46upx;
		}
		.but {
			width: 690upx;
			height: 96upx;
			margin: 0 auto;
			line-height: 96upx;
			text-align: center;
			font-size: 34upx;
			color: #fff;
			background-color: #42a2ec;
			border-radius: 10upx;
		}
	}
}
</style>
