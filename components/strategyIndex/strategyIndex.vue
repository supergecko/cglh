<template>
	<view class="wrap">
		<view class="increase">
			<view class="search" style='display:flex;margin-bottom:24upx; box-sizing: border-box;border-radius:5upx;width:100%;padding:15upx 25upx;height:72upx;background-color:#F4F4F4;'>
				<image src="../../static/newimg/search.png" mode="" style=' width: 42upx;height:42upx;' @click="search()"></image>
				<input type="text" v-model="inputTitle" style="text-indent:23upx;font-size:28upx;" placeholder="USDT" @confirm="search()"/>
			</view>
			<view class="main">
				<view style='width: 100%;height:264upx;border-radius:10upx;' @click="toDetails(`../strategySquare/exDetail`)">
					<image src="../../static/newimg/bg.png" style="width: 100%;height: 100%;border-radius:10upx;"></image>
				</view>
				<view class="item" v-for="(item,i) in strategyArr" :key="i">
					<view style='margin-right:41upx;' @click="toDetails(`../strategySquare/neuralNet?strategyId=${item.strategy_id}&title=${item.title}`)">
						<view style="color:#fff;"><text style="font-size:90upx;">{{item.rate}}</text>%</view>
						<view style="color:#CAE6FD;font-size:26upx;text-align:center;">月化收益</view>
					</view>
					<view style="color:#fff;" @click="toDetails(`../strategySquare/neuralNet?strategyId=${item.strategy_id}&title=${item.title}`)">
						<view>
							<view style='font-size:36upx;'>
								<text>{{item.title}}</text><image src="../../static/newimg/hot.png" style=' width: 34upx;height:42upx;margin-left:14upx;'></image>
							</view>
							<text style='font-size:26upx;'>{{item.keyword}}</text>
							<view style="display:flex;font-size:22upx;margin-top:19upx;">
								<view class="tip" style='background-color:#2E66F5;' v-for="(item,i) in item.bourse" :key="i">{{item}}</view>
							</view>
						</view>
					</view>
					<view style="text-align:center;position: absolute;right: 26px;min-width: 36px;" @click="toggleHeart(item.strategy_id,item.collection_status)">
						<image :src="item.collection_status===0?'../../static/newimg/save.png':'../../static/newimg/saved.png'" style=' width: 46upx;height:46upx;vertical-align: 3upx;'></image>
						<view style="font-size:22upx;color:#F7F9FE;text-align:center;">{{item.collection_status===0?'收藏':'已收藏'}}</view>
					</view>
				</view>
			</view>
		</view>
		<chunLei-modal v-model="value" :mData="defaultData" type="default" @onConfirm="onConfirm" @cancel="cancel" :navHeight="0"></chunLei-modal>
	</view>
</template>

<script>
	import chunLeiModal from '@/components/chunLei-modal/chunLei-modal.vue'
	export default {
		name: 'strategyIndex',
		components: {		
			chunLeiModal
		},
		
		onLoad() {
			this._Strategy_list()
			// this.getds = setInterval(()=>{
			// 	this.setData();
			// }, 4000)
		},
		data() {
			return {
				strategyArr:[],
				heartImgSrc:'../../static/newimg/save.png',
				value:false,
				strategyId:'',
				inputTitle:'',
				collectionStatus:'',
				defaultData:{},
			}
		},
		methods:{
			toPath(URL){
				uni.navigateTo({
					url:URL
				})
			},
			toDetails(URL){
				uni.navigateTo({
					url:URL
				})
			},
			//搜索
			search(){
				this._Strategy_list()
			},
			//收藏
			toggleHeart(strategyId,collectionStatus){
				if(collectionStatus == 0){
					this.defaultData = {title:'提示',content:'是否收藏此策略',cancelText:'取消',confirmColor:'#3CC51F'}
				} else{
					this.defaultData = {title:'提示',content:'是否取消收藏此策略',cancelText:'取消',confirmColor:'#3CC51F'}
				}
				this.value = !this.value
				this.strategyId = strategyId
				this.collectionStatus = collectionStatus
			},
			//确定
			onConfirm(e){
				this._Do_collection()
			},
			//取消
			cancel(){
				// uni.showToast({title:'取消',icon:'none'})
			},
			//策略收藏/取消
			_Do_collection(){
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
				const action = this.collectionStatus==0? 'dolike' :'unlike'
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${strategy_id}**${action}**${timestamp}**cglhhaofengshui`)
				let params = {strategy_id, action, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.Do_collection,
					data: params
				}).then((res) => {
					uni.hideLoading()
					if (res.data.code == 1) {
						//初始化信息
						this._Strategy_list()
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
			
			// 获取策略列表
			_Strategy_list() {
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
				const title = this.inputTitle
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${title}**${timestamp}**cglhhaofengshui`)
				let params = {title, timestamp, sign}
				this.$ajax.post({
					url: this.$service.api_lists.Strategy_list,
					data: params
				}).then((res) => {
					uni.hideLoading()
					if (res.data.code == 1) {
						//初始化信息
						this.strategyArr = res.data.data
						this.inputTitle = ''
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.titleNview-placing {
		height: var(--status-bar-height);
		width: 100%;
	}
	.wrap{
		width: 100%;
		background-color: #fff;
		font-family: PingFang-SC-Bold;
		.increase{
			width: 710upx;
			margin: 0 auto;
			.main{
				.item{
					box-sizing:border-box;
					display: flex;
					width: 100%;
					height: 230upx;
					padding:26upx 0 40upx 46upx;
					background-color:#0C85EB;
					border-radius:10upx;
					margin-top: 24upx;
				}
				.tip{
					padding:8upx 14upx;
					margin-right: 16upx;
				}
			}
		}
	}

</style>