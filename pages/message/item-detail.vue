<template>
	<view class="wrap">
		<view class="header"></view>
		<view class="main">
			<view class="notice">
				<view class="percent">
					<text class="per-num">{{itemInfo.annual_interest_rate}}%</text><br/>
					<text>预期年化利率</text>
				</view>
				<view class="case">
					<text class="title">{{itemInfo.name}}</text><br/>
					<text>期限：{{itemInfo.cycle_day}}天</text><br/>
					<text>剩余可投：{{itemInfo.rest}}{{itemInfo.title}}</text>
				</view>
			</view>
			<view class="con">
				<view class="inv-h-w">
					<view style="width: 30upx;height: 100%;"></view>
					<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">{{title1}}</view>
					<!-- <view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">{{title2}}</view> -->
					<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">{{title3}}</view>
				</view>
				<view class="list info" v-if="Inv == 0">
					<view class="i-con">
						<view class="attribute">
							<text class="way">管理方</text>
						</view>
						<view class="avalue">
							<text class="USDT">创谷量化团队</text><br/>
						</view>
					</view>
					<view class="i-con">
						<view class="attribute">
							<text class="way time">认购时间</text>
						</view>
						<view class="avalue">
							 {{itemInfo.start_buy_time}}<br/>
							-{{itemInfo.end_buy_time}}
						</view>
					</view>
					<view class="i-con">
						<view class="attribute">
							<text class="way">认购币种</text>
						</view>
						<view class="avalue">
							<text class="USDT">{{itemInfo.title}}</text><br/>
						</view>
					</view>
					<view class="i-con">
						<view class="attribute">
							<text class="way">最低认购</text>
						</view>
						<view class="avalue">
							<text class="USDT">{{itemInfo.min_buy_money}}份(每份1个{{itemInfo.title}})</text><br/>
						</view>
					</view>
					<view class="i-con">
						<view class="attribute">
							<text class="way">最高认购</text>
						</view>
						<view class="avalue">
							<text class="USDT">{{itemInfo.max_buy_money}}份(每份1个{{itemInfo.title}})</text><br/>
						</view>
					</view>
					<view class="i-con">
						<view class="attribute">
							<text class="way">起息时间</text>
						</view>
						<view class="avalue">
							<text class="USDT">{{itemInfo.start_time}}</text><br/>
						</view>
					</view>
					<view class="i-con">
						<view class="attribute">
							<text class="way">回款时间</text>
						</view>
						<view class="avalue">
							<text class="USDT">{{itemInfo.end_time}}</text><br/>
						</view>
					</view>
					<view class="i-con">
						<view class="attribute">
							<text class="way">回款方式</text>
						</view>
						<view class="avalue">
							<text class="USDT">{{itemInfo.financing_type}}</text><br/>
						</view>
					</view>
					<view class="intro">
						<text class="in-tit">管理方简介</text><br/>
						<section class="c-content" v-html='itemInfo.team_introduction'></section>
					</view>
					<view class="but" @click="toPage">立即抢购</view>
				</view>
				<!-- <view class="list invest" v-if="Inv == 1">
					<view class="i-con">
						<view class="attribute">
							<text class="way">管理方</text>
						</view>
						<view class="avalue">
							<text class="USDT">创谷量化团队</text><br/>
						</view>
					</view>
					<view class="i-con">
						<view class="attribute">
							<text class="way time">认购时间</text>
						</view>
						<view class="avalue">
							 2019.08.07 10:00<br/>
							-2019.08.08 24:00
						</view>
					</view>
					<view class="i-con">
						<view class="attribute">
							<text class="way">认购币种</text>
						</view>
						<view class="avalue">
							<text class="USDT">ETH</text><br/>
						</view>
					</view>
					<view class="i-con">
						<view class="attribute">
							<text class="way">最低认购</text>
						</view>
						<view class="avalue">
							<text class="USDT">10份(每份1个ETH)</text><br/>
						</view>
					</view>
				</view>
				 -->
				<view class="list issue" v-if="Inv == 2" style="min-height:800upx;">
					<view class="i-con" style="border-bottom: 0px solid #E6E8ED;text-align: center;justify-content: center;">
						{{commonProblemArr.post_title}}
					</view>
					<section class="c-content" v-html='commonProblemArr.post_content' style='padding-left: 32upx;padding-right: 32upx;'></section>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				Inv:0,
				title1: '项目信息',
				title2: '投资列表',
				title3: '常见问题',
				itemInfo:{},
				activity_product_id:0,
				activity_id:0,
				commonProblemArr:[]
			}
		},
		onLoad(option) {
			this.activity_product_id = option.activity_product_id
			this.activity_id = option.activity_id
			this._financingDetail(option.activity_product_id,option.activity_id)
			this._commonProblem()
		},
		methods: {
			changeTab(Inv){
				that.navIdx = Inv		 
			},
			//进行认购
			toPage(){
				uni.navigateTo({
					url:`../message/purchase?activity_product_id=${this.activity_product_id}&activity_id=${this.activity_id}`
				})
			},
			//常见问题
			_commonProblem(){
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
				// const activity_product_id = activityPId
				// const activity_id = activityId
				let params = {}
				this.$ajax.post({
					url: this.$service.api_lists.commonProblem,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						console.log(res.data)
						this.commonProblemArr = res.data.data
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
			// 加载产品单页信息
			_financingDetail(activityPId,activityId) {
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
				const activity_product_id = activityPId
				const activity_id = activityId
				let params = {activity_product_id, activity_id}
				this.$ajax.post({
					url: this.$service.api_lists.financingDetail,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						this.itemInfo = res.data.data
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					})
				})
			}
		},
	}
</script>
<style lang="scss" scoped>
	.wrap{
		width: 100%; 
		height: 2050upx;
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
			padding-top: 64upx;
			background-color: #fff;
			border-radius: 10upx;
			.notice{
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				padding-bottom: 50upx;
				font-size: 26upx;
				color: #888;
				border-bottom: 1upx solid #E6E8ED;
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
			}
		}
	}
</style>
<style lang="scss" scoped>
	.con{
		background-color: #fff;
		padding: 0;
		margin-bottom: 24upx;
		.inv-h-w{
			display: flex;
			width: 100%;
			border-bottom: 1upx solid #E6E8ED;
			// padding-left: 30upx;
			.inv-h{
				text-align: center;
				color: #666;
				line-height: 80upx;
				font-size: 28upx;
				margin-right: 60upx;
			}
			.inv-h-se{
				font-size: 32upx;
				color: #42A2EC;
				border-bottom: 6upx solid #5BA7FF;
			}
		}
		.list{
			font-size: 32upx;
			padding-left: 29upx;
			padding-bottom: 30upx;
			.i-con{
				padding: 36upx 30upx 36upx 0;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-bottom: 1upx solid #E6E8ED;
				.attribute{
					color: #151414;
					.way.time{
						vertical-align: -20upx;
					}
				}
				.avalue{
					text-align: right;
					color: #666;
				}
			}
			.intro{
				font-size: 32upx;
				padding-right: 30upx;
				.in-tit{
					line-height: 102upx;
					color: #151414;
				}
				.info{
					line-height: 46upx;
					color: #666;
				}
			}
			.but{
				width: 646upx;
				height: 96upx;
				margin: 50upx 0 0 -8upx;
				background-color: #E98135;
				line-height: 96upx;
				color: #fff;
				font-size: 34upx;
				text-align: center;
				border-radius: 10upx;
			}
		}
	}
</style>
<!-- <template>
	<view class="content">
			<view class="card">
				<view class="new">
					<view class="notice">
						<view class="percent">
							<text class="per-num">12%</text><br/>
							<text class="per-con">预期年化利率</text>
						</view>
						<view class="case">
							<text class="title">ETH量化基金理财系列-002期</text><br/>
							<text class="time">期限：30天</text><br/>
							<text class="time">剩余可投：10000ETH</text>
							
						</view>
					</view>
					<view class="example">
						<view class="inv-h-w">
							<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">{{title1}}</view>
							<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">{{title2}}</view>
							<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">{{title3}}</view>
						</view>
						<view class="ad">
							<view class="adname">
								<text class="named">管理方</text>
							</view>
							<view class="teamname">
								<text class="named">创谷量化团队</text><br/>
							</view>
						</view>
						<view class="list" v-show="Inv == 0">
							<view class="e-content">
								<view class="i-con top">
									<view class="cg">
										<text class="way center">认购时间</text>
									</view>
									<view class="cg">
										<text class="USDT">2019.08.07 10:00</text><br/><text class="USDT" >-2019.08.08 24:00</text>
									</view>
								</view>
								<view class="i-con">
									<view class="cg">
										<text class="way">认购币种</text>
									</view>
									<view class="cg">
										<text class="USDT">ETH</text><br/>
									</view>
								</view>
								<view class="i-con">
									<view class="cg">
										<text class="way">最低认购</text>
									</view>
									<view class="cg">
										<text class="USDT">10份(每份1个ETH)</text><br/>
									</view>
								</view>
								<view class="i-con">
									<view class="cg">
										<text class="way">最高认购</text>
									</view>
									<view class="cg">
										<text class="USDT">100份(每份1个ETH)</text><br/>
									</view>
								</view>
								<view class="i-con">
									<view class="cg">
										<text class="way">起息时间</text>
									</view>
									<view class="cg">
										<text class="USDT">2019.08.09</text><br/>
									</view>
								</view>
								<view class="i-con">
									<view class="cg">
										<text class="way">回款时间</text>
									</view>
									<view class="cg">
										<text class="USDT">2019.09.09</text><br/>
									</view>
								</view>
								<view class="i-con">
									<view class="cg">
										<text class="way">回款方式</text>
									</view>
									<view class="cg">
										<text class="USDT">到期还本付期</text><br/>
									</view>
								</view>
								<view class="intro">
									<view class="in-tit">
										<text class="way">管理方简介</text><br/>
										<text class="info">
											创谷量化是一家专业的数字资产量化管理公司。创始国际团队由经验丰富的量化投资基金管理人，期货、证券行业的金融精英、BAT的技术大牛组建，截止2019年7月，总资产管理规模超过400万美金，为投资者提供专业的数字货币资产管理、做市商方案以及场外交易服务等服务，帮助投资者大幅度提升资产增值，大幅度降低投资风险。
										</text>
									</view>
								</view>
								<view class="but">立即抢购</view>
							</view>	
						</view>
						<view class="fall increase" v-show="Inv == 1">
							<view class="e-content">
								<view class="i-con top">
									<view class="cg">
										<text class="way">认购时间</text>
									</view>
									<view class="cg">
										<text class="USDT">2019.08.07 10:00 </text><br/>
										<text class="USDT" >- 2019.08.08 24:00</text>
									</view>
								</view>
							</view>	
						</view>
						<view class="fall increase" v-show="Inv == 2">
							<view class="e-content">
								<view class="i-con top">
									<view class="cg">
										<text class="way">认购时间</text>
									</view>
									<view class="cg">
										<text class="USDT">2019.08.07 10:00 </text><br/>
										<text class="USDT" >- 2019.08.08 24:00</text>
									</view>
								</view>
								<view class="i-con">
									<view class="cg">
										<text class="way">回款方式</text>
									</view>
									<view class="cg">
										<text class="USDT">到期还本付期</text><br/>
									</view>
								</view>
							</view>	
						</view>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Inv:0,
				title1: '项目信息',
				title2: '投资列表',
				title3: '常见问题'
			}
		},
		methods: {
			changeTab(Inv){
					that.navIdx = Inv;		 
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		color: #fff;
		background-color: #F8F8F8;
	}
	.content{
		margin: 0 auto;
		height: 100%;
			.card{
				position: absolute;
				top: 30upx;
				left: 22upx;
				width: 706upx;
				.new{
					box-sizing: border-box;
					width: 100%;
					background-color: #fff;
					margin-bottom: 30upx;
					color: #000;
					font-family: "PingFang-SC-Bold";
					.notice{
						display: flex;
						flex-wrap: wrap;
						flex-direction: row;
						justify-content: space-around;
						padding-top: 64upx;
					}
					.percent{
						text-align: center;
						.per-num{
							color: #E98135;
							font-size: 60upx;
						}
						.per-con{
							color: #888;
							font-size: 26upx;
							vertical-align: -30upx;
						}
					}
					.case{
						border-left: 1upx solid #E6E8ED;
						padding-left: 33upx;
						.title{
							color: #151414;
							font-size: 32upx;
							font-weight: bolder;
						}
						.time{
							font-size: 26upx;
							color: #888;
						}
					}
				}
			}
	}
</style>
<style lang="scss" scoped>
	.example{
		margin-top: 50upx;
		padding: 10upx 0 10upx 0;
		border-top: 1upx solid #E6E8ED;
		.ad{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 36upx 30upx 36upx 38upx;
			font-size: 32upx;
			border-top: 1upx solid #E6E8ED;
			.adname{
				color: #151414;
			}
			.teamname{
				color: #666;
			}
		}
		.inv-h-w{
			padding-left: 39upx;
			display: flex;
			width: 600upx;
			height: 70upx;
			margin-bottom: 4upx;
		}
		.inv-h{
			font-size: 29upx;
			flex: 1;
			text-align: center;
			color: #C9C9C9;
			width: 100upx;
			height: 70upx;
			margin-right: 66upx;
			line-height: 56upx;
			font-size: 28upx;
		}
		.inv-h-se{
			font-size: 32upx;
			color: #5BA7FF;
			border-bottom: 6upx solid #5BA7FF;}
		.increase{
			.title{
				display:flex;
				flex-direction: row;
				justify-content: space-between;
				line-height: 82upx;
				border-top: 3upx solid #E6E8ED; 
				.i-tit{
					font-size: 26upx;
					color: #666;
				}
			}
			.e-content{
				margin-left: 39upx;
				.i-con{
					box-sizing: border-box;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					padding: 28upx 30upx 28upx 0;
					border-bottom: 2upx solid #E6E8ED;
					.case{
						margin-top: -15upx;
					}
					.cg{
						line-height: 100%;
					}
					.cg.right{
						text-align: right;
					}
					.way{
						font-size: 30upx;
						color: #151414;
					}
					.way.center{
						vertical-align: -20upx;
					}
					.USDT{
						text-align: right;
						font-size: 30upx;
						color: #666;
					}
			 	}
				.i-con.top{
					border-top: 2upx solid #E6E8ED;
				}
				.intro{
					padding: 28upx 0;
					.in-tit{
						font-size: 32upx;
						.way{
							color: #151414;
						}
						.info{
							display: block;
							margin-top: 34upx;
							color: #666;
						}
					}
				}
				.but{
					width: 646upx;
					height: 86upx;
					line-height: 86upx;
					text-align: center;
					font-size: 34upx;
					border-radius: 10upx;
					margin-bottom: 32upx;
					color: #fff;
					background-color: #E98135;
				}
			}
		}
	}
</style>
 -->