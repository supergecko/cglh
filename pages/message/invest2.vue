<template>
	<view class="wrap">
		<view class="header"></view>
		<view class="main">
			<view class="notice" v-for="(item,i) in managementArr" :key="i">
				<view class="percent">
					<text class="per-num">{{item.products[0].annual_interest_rate}}%</text><br/>
					<text>预期年化利率</text>
				</view>
				<view class="case">
					<text class="title">{{item.products[0].name}}</text><br/>
					<text>期限：{{item.products[0].cycle_day}}天</text><br/>
					<text>剩余可投：{{item.products[0].rest}}{{item.products[0].title}}</text>
				</view>
				<view class="but" v-bind:class="{ bid: item.status===2,start:item.status===0,end:item.status===1&&item.products[0].rest===0 }" 
				@click="toJump(item.status,item.products[0].rest,item.products[0].activity_product_id,item.activity_id)">
					{{item.status===2?'流标':
					item.status===1&&item.products[0].rest===0? '售磐':
					 item.status===0? `${item.start_time}开售`:
					 item.status===1? '立即抢购' : ''}}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				managementArr:[]
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
			　　title:'量化基金'
			})
			this._myManagement()
		},
		methods: {
			// 跳转到详情
			toJump(state,rest,activity_product_id,activity_id){
				switch(state) {
				     case 0:
				        uni.showToast({
				        	icon: 'none',
				        	title: '敬请期待'
				        })
						break;
				     case 1:
				        if (rest ===0) {
							uni.showToast({
								icon: 'none',
								title: '已售磐'
							})
						} else {
							uni.navigateTo({
								url:`../message/item-detail?activity_product_id=${activity_product_id}&activity_id=${activity_id}`
							})
						}
				        break;
					 case 2:
					    uni.showToast({
					    	icon: 'none',
					    	title: '该活动已结束'
					    })
					    break;
				     default:
				        
				}
			},
			// 首页基本信息
			_myManagement() {
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
				const type = 2 // 1余币宝2量化
				let params = {type}
				this.$ajax.post({
					url: this.$service.api_lists.myManagement,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.managementArr = res.data.data
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
		}
	}
</script>
<style lang="scss" scoped>
	.wrap{
		width: 100%;
		height: 1800upx;
		background-color: #F8F8F8;
		.header{
			display: block;
			width: 100%;
			height: 200upx;
			background-color:  #42A2EC;
		}
		.main{
			width: 92%;
			margin: -175upx auto;
			background-color: #F8F8F8;
			.notice{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				margin-bottom: 24upx;
				padding-top: 60upx;
				font-size: 26upx;
				color: #888;
				border-bottom: 1upx solid #E6E8ED;
				background-color: #fff;
				border-radius: 10upx;
				.percent{
					text-align: center;
					border-right: 1upx solid #E6E8ED;
					padding: 0 29upx 0;
					.per-num{
						color: #E98135;
						font-size: 58upx;
						line-height: 110upx;
					}
				}
				.case{
					padding-left: 33upx;
					.title{
						color: #000;
						font-size: 32upx;
						font-weight: bolder;
						line-height: 80upx;
					}
				}
				// 默认抢购状态
				.but{
					width: 646upx;
					height: 96upx;
					margin: 54upx auto;
					background-color: #E98135;
					line-height: 96upx;
					color: #fff;
					font-size: 34upx;
					text-align: center;
					border-radius: 10upx;
				}
				// 开售状态
				.but.start{
					color: #E98135;
					background-color: #fff;
					border: 1upx solid #E98135;
				}
				// 售磐状态
				.but.end{
					background-color: rgb(243,184,142);
					color: #fff;
				}
				// 流标状态
				.but.bid{
					background-color: #D7D7D8;
					color: #fff;
				}
			}
		}
	}
</style>
