<template>
	<view class="wrap">
		<!-- <view class="header">行情</view> -->
		<view class="con">
			<view class="inv-h-w">
				<view class="invh" v-bind:class="{invhse:Inv==0}" @click="change(0)" >自选</view>
				<view class="invh" v-bind:class="{invhse:Inv==1}" @click="change(1)" >USDT</view>
				<view class="invh" v-bind:class="{invhse:Inv==2}" @click="change(2)" >BTC</view>
				<view class="invh" v-bind:class="{invhse:Inv==3}" @click="change(3)" >ETH</view>
			</view>
			<view v-if="Inv == 0" v-for="(itemSon,j) in tradingList1" :key="j" >
				<view class="HeaderWarp">
					<view style="margin-left: 30upx;">交易对</view>
					<view :style="{marginLeft:a,marginRight:b}" class="price">最新价</view>
					<view>24H涨跌幅</view>
				</view>
				<view>
					<view class="commonItemWarp ">
						<view class="leftNumber" @click="toPath('../KLine/KLine')">
							<view style="margin-bottom: 20upx;">{{itemSon.target_currency_title}} / <span style="color:#666666">{{itemSon.currency_title}}</span></view>
							<view style="font-size:26upx;color:rgba(136,136,136,1);">24H {{itemSon.cny}} </view>
						</view>
						<view class="middleNumber" @click="toPath('../KLine/KLine')">
							<view style="margin-bottom: 20upx;">{{itemSon.close}}</view>
							<view style="color:rgba(136,136,136,1);">￥{{itemSon.cny}}</view>
						</view>
						<view v-if="itemSon.statuscode == 1" @click="toPath('../KLine/KLine')">
							<view class="commonBtnRed commonBtnGreen cbt" :style="{marginRight:c}">{{itemSon.zhangfu}}%</view>
						</view>
						<view v-if="itemSon.statuscode == 2" @click="toPath('../KLine/KLine')">
							<view class="commonBtnRed commonBtnGreen cbt" :style="{marginRight:c}" style="background: red;">{{itemSon.zhangfu}}%</view>
						</view>
						<view class="but minus" v-bind:class='{ add: itemSon.is_select===0&&itemSon.cate===1}'
						style="width:60upx;height:60upx;" :style="{visibility:d}" :id="itemSon.condition_flag"
						@click="clickBtn(itemSon.target_currency_id,itemSon.currency_id,itemSon.is_select,itemSon.cate,itemSon.trade_id,$event)"></view>
					</view>
				</view>
			</view>
			<view v-if="Inv == 1" v-for="(itemSon,j) in tradingList2" :key="j" >
				<view class="HeaderWarp">
					<view style="margin-left: 30upx;">交易对</view>
					<view :style="{marginLeft:a,marginRight:b}" class="price">最新价</view>
					<view>24H涨跌幅</view>
				</view>
				<view>
					<view class="commonItemWarp ">
						<view class="leftNumber" @click="toPath('../KLine/KLine')">
							<view style="margin-bottom: 20upx;">{{itemSon.target_currency_title}} / <span style="color:#666666">{{itemSon.currency_title}}</span></view>
							<view style="font-size:26upx;color:rgba(136,136,136,1);">24H {{itemSon.cny}} </view>
						</view>
						<view class="middleNumber" @click="toPath('../KLine/KLine')">
							<view style="margin-bottom: 20upx;">{{itemSon.close}}</view>
							<view style="color:rgba(136,136,136,1);">￥{{itemSon.cny}}</view>
						</view>
						<view v-if="itemSon.statuscode == 1" @click="toPath('../KLine/KLine')">
							<view class="commonBtnRed commonBtnGreen cbt" :style="{marginRight:c}">{{itemSon.zhangfu}}%</view>
						</view>
						<view v-if="itemSon.statuscode == 2" @click="toPath('../KLine/KLine')">
							<view class="commonBtnRed commonBtnGreen cbt" :style="{marginRight:c}" style="background: red;">{{itemSon.zhangfu}}%</view>
						</view>
						<view class="but minus" v-bind:class='{ add: itemSon.is_select===0&&itemSon.cate===1}'
						style="width:60upx;height:60upx;" :style="{visibility:d}"
						@click="clickBtn(itemSon.target_currency_id,itemSon.currency_id,itemSon.is_select,itemSon.cate,itemSon.trade_id)"></view>
					</view>
				</view>
			</view>
			<view v-if="Inv == 2" v-for="(itemSon,j) in tradingList3" :key="j" >
				<view class="HeaderWarp">
					<view style="margin-left: 30upx;">交易对</view>
					<view :style="{marginLeft:a,marginRight:b}" class="price">最新价</view>
					<view>24H涨跌幅</view>
				</view>
				<view>
					<view class="commonItemWarp ">
						<view class="leftNumber" @click="toPath('../KLine/KLine')">
							<view style="margin-bottom: 20upx;">{{itemSon.target_currency_title}} / <span style="color:#666666">{{itemSon.currency_title}}</span></view>
							<view style="font-size:26upx;color:rgba(136,136,136,1);">24H {{itemSon.cny}} </view>
						</view>
						<view class="middleNumber" @click="toPath('../KLine/KLine')">
							<view style="margin-bottom: 20upx;">{{itemSon.close}}</view>
							<view style="color:rgba(136,136,136,1);">￥{{itemSon.cny}}</view>
						</view>
						<view v-if="itemSon.statuscode == 1" @click="toPath('../KLine/KLine')">
							<view class="commonBtnRed commonBtnGreen cbt" :style="{marginRight:c}">{{itemSon.zhangfu}}%</view>
						</view>
						<view v-if="itemSon.statuscode == 2" @click="toPath('../KLine/KLine')">
							<view class="commonBtnRed commonBtnGreen cbt" :style="{marginRight:c}" style="background: red;">{{itemSon.zhangfu}}%</view>
						</view>
						<view class="but minus" v-bind:class='{ add: itemSon.is_select===0&&itemSon.cate===1}'
						style="width:60upx;height:60upx;" :style="{visibility:d}"
						@click="clickBtn(itemSon.target_currency_id,itemSon.currency_id,itemSon.is_select,itemSon.cate,itemSon.trade_id)"></view>
					</view>
				</view>
			</view>
			<view v-if="Inv == 3" v-for="(itemSon,j) in tradingList4" :key="j" >
				<view class="HeaderWarp">
					<view style="margin-left: 30upx;">交易对</view>
					<view :style="{marginLeft:a,marginRight:b}" class="price">最新价</view>
					<view>24H涨跌幅</view>
				</view>
				<view>
					<view class="commonItemWarp ">
						<view class="leftNumber" @click="toPath('../KLine/KLine')">
							<view style="margin-bottom: 20upx;">{{itemSon.target_currency_title}} / <span style="color:#666666">{{itemSon.currency_title}}</span></view>
							<view style="font-size:26upx;color:rgba(136,136,136,1);">24H {{itemSon.cny}} </view>
						</view>
						<view class="middleNumber" @click="toPath('../KLine/KLine')">
							<view style="margin-bottom: 20upx;">{{itemSon.close}}</view>
							<view style="color:rgba(136,136,136,1);">￥{{itemSon.cny}}</view>
						</view>
						<view v-if="itemSon.statuscode == 1" @click="toPath('../KLine/KLine')">
							<view class="commonBtnRed commonBtnGreen cbt" :style="{marginRight:c}">{{itemSon.zhangfu}}%</view>
						</view>
						<view v-if="itemSon.statuscode == 2" @click="toPath('../KLine/KLine')">
							<view class="commonBtnRed commonBtnGreen cbt" :style="{marginRight:c}" style="background: red;">{{itemSon.zhangfu}}%</view>
						</view>
						<view class="but minus" v-bind:class='{ add: itemSon.is_select===0&&itemSon.cate===1}'
						style="width:60upx;height:60upx;" :style="{visibility:d}"
						@click="clickBtn(itemSon.target_currency_id,itemSon.currency_id,itemSon.is_select,itemSon.cate,itemSon.trade_id)"></view>
					</view>
				</view>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore && Inv == 1" style="font-size: 14px;">{{loadMoreText2}}</view>
			<view class="uni-loadmore" v-if="showLoadMore && Inv == 2" style="font-size: 14px;">{{loadMoreText3}}</view>
			<view class="uni-loadmore" v-if="showLoadMore && Inv == 3" style="font-size: 14px;">{{loadMoreText4}}</view>
			<view style="height: 37px;"></view>
			<view class="btn">
				<view class="edit" @click="showToggle">编辑</view>
				<view class="addBottom" @click="toPage2">搜索</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import { mapState, mapMutations} from 'vuex'
	export default {
		computed: {
		    ...mapState(['hasLogin']),
		},
		onReady(){
			if (!this.hasLogin) {
			   uni.reLaunch({
			      url: '../login/login'
			  })
			  return
			}
		},
		onLoad() {
			this._trading('自选',this.page1)
		},
		data() {
			return {
				Inv:0,
				a: '260upx',
				b: '144upx',
				c: '-176upx',
				d: 'hidden',
				isShow: false,
				showLoadMore: false,
				loadMoreText1: "加载中...",
				loadMoreText2: "加载中...",
				loadMoreText3: "加载中...",
				loadMoreText4: "加载中...",
				changeNumber:0 ,//关门狗
				page1:1, // 自选
				page2:1, // USDT
				page3:1, // BTC
				page4:1, // ETH
				oldpage1:0, // 自选
				oldpage2:0, // USDT
				oldpage3:0, // BTC
				oldpage4:0, // ETH
				tradingList1:[], // 自选
				tradingList2:[], // USDT
				tradingList3:[], // BTC
				tradingList4:[], // ETH
				end1:0, // 自选
				end2:0, // USDT
				end3:0, // BTC
				end4:0, // ETH
				tableFlag:true // 左右切换flag
			}
		},
		methods: {
			//上拉
			onReachBottom() {
				this.showLoadMore = true
				setTimeout(() => {
					switch(this.changeNumber) {
					     case 0:
							return
					        break;
					     case 1:
							this.page2 = this.page2 + 1
					        this._trading('USDT',this.page2)
					        break;
						 case 2:
							this.page3 = this.page3 + 1
						    this._trading('BTC',this.page3)
						    break;
					     default:
							this.page4 = this.page4 + 1
					        this._trading('ETH',this.page4)
					}
				}, 300);
			},
			toPage2(){
				uni.reLaunch({
					url:'../quotation/add'
				})
			},
			clickBtn(targetCurrencyId,currencyId,isSelect,Cate,tradeId,event){
				console.log(event)
				if (isSelect===0&&Cate===1){
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
						setTimeout(() => {
							this._trading('自选',this.page1)
						}, 300)
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
			
			//获取行情列表
			_trading(Title,PaGe) {
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
				const page = PaGe
				const keyword = Title
				const mobile = uni.getStorageSync('user_mobile')
				const timestamp = Date.parse(new Date()) / 1000
				const sign = this.$md5(`${mobile}**${timestamp}**cglhhaofengshui`)
				let params = {
					page,
					keyword,
					timestamp,
					sign
				}
				this.$ajax.post({
					url: this.$service.api_lists.trading,
					data: params
				}).then((res) => {
					if (res.data.code == 1) {
						//初始化信息
						switch(res.data.data.flag) {
						     case 1:
								if (res.data.data.end === 1) {
									this.loadMoreText1 = "没有更多数据了!"
								}
						        this.tradingList1 = res.data.data.list
								this.end1 = res.data.data.end
						        break
						     case 2:
								if (res.data.data.end === 1) {
									this.loadMoreText2 = "没有更多数据了!"
								}
						        this.tradingList2 = this.tradingList2.concat(res.data.data.list)
								this.end2 = res.data.data.end
						        break
							 case 3:
								if (res.data.data.end === 1) {
									this.loadMoreText3 = "没有更多数据了!"
								}
							    this.tradingList3 = this.tradingList3.concat(res.data.data.list)
								this.end3 = res.data.data.end
							    break
						     default:
								if (res.data.data.end === 1) {
									this.loadMoreText4 = "没有更多数据了!"
								}
								this.end4 = res.data.data.end
						        this.tradingList4 = this.tradingList4.concat(res.data.data.list)
						}
					}
					uni.hideLoading()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: err,
						duration: 2000
					});
				})
			},
			change(index){
				if (this.changeNumber === index){
					return
				}
				switch(index) {
				     case 0:
						this._trading('自选',this.page1)
				        break;
				     case 1:
						if(this.tradingList2.length===0){
							this._trading('USDT',this.page2)
						}
				        break;
					 case 2:
						if(this.tradingList3.length===0){
							this._trading('BTC',this.page3)
						}
					    break;
				     default:
						if(this.tradingList4.length===0){
							this._trading('ETH',this.page4)
						}
				}
				this.Inv = index
				this.isShow = false;
				this.a = '260upx';
				this.b = '144upx';
				this.c = '-176upx';
				this.d = 'hidden'
				this.changeNumber = index
			},
			showToggle(){
					this.isShow = !this.isShow;
						if(this.isShow){
							this.a = '210upx';
							this.b = '70upx';
							this.c = '0';
							this.d = 'visible'
						}else{
							this.a = '260upx';
							this.b = '144upx';
							this.c = '-176upx';
							this.d = 'hidden'
						}
			},
			changeTab(Inv){
					that.navIdx = Inv;		 
			},
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.minus{
		background: url("../../static/images/minus.png") no-repeat;
		background-size: 56upx 56upx ;
	}
	.add{
		background: url("../../static/images/add.png") no-repeat;
		background-size: 56upx 56upx ;
	}
	.uni-loadmore{
		height:80upx;
		line-height:80upx;
		text-align:center;
		padding-bottom:30upx;
	}
	.HeaderWarp{
		font-size:26upx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
		display: flex;
		padding-top: 29upx;
		box-sizing: border-box;
		.price{
			transition: .5s;
		}
	}
	.commonItemWarp{
		display: flex;
		justify-content: space-between;
		height: 140upx;
		align-items: center;
		border-bottom: 1upx solid rgba(230,232,237,1);
		width: 690upx;
		margin: 0 auto;
		.but{
			transition: .2s;
		}
		// .but.add{
		// 	background: url("../../static/images/add.png") no-repeat;
		// 	background-size: 56upx 56upx ;
		// }
		// .but.minus{
		// 	background: url("../../static/images/minus.png") no-repeat;
		// 	background-size: 56upx 56upx ;
		// }
		.price{
			transition: .5s;
		}
	}
	.leftNumber{
		width:220upx;
		display: flex;
		font-size:30upx;
		flex-direction: column;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(21,20,20,1);
		
	}
	.middleNumber{
		width: 96upx;
		display: flex;
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(136,136,136,1);
		flex-direction: column;
		color:rgba(21,20,20,1);
	}
	.cbt{
		margin-right: 124upx;
		transition: .5s;
	}
	.commonBtnRed{
		width:159upx;
		height:70upx;
		background:rgba(232,64,64,1);
		text-align: center;
		line-height: 70upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		// margin-left: -122upx;
	}
	.commonBtnGreen{
		background:rgba(63,159,62,1);
	}
	.btn{
		position: fixed;
		bottom: 50px;
		left: 0;
		right: 0;
		width: 100%;
		height: 50px;
		line-height: 50px;
		background-color: #fff;
		border: 1upx solid #E6E8ED;
		box-sizing: border-box;
		transition: .5s;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.edit,.addBottom{
			display: inline-block;
			width: 240upx;
			height: 34px;
			line-height: 34px;
			border-radius: 334upx;
			font-size: 16px;
			text-align: center;
		}
		.edit{
			color: #4EA0F4;
			border: 1upx solid #4EA0F4;
			// margin: 0 142upx 0 64upx;
		}
		.addBottom{
			color: #F96868;
			border: 1upx solid #F96868;
		}
	}
</style>
<style lang="scss" scoped>
	.wrap{
		width: 100%;
		overflow-x: hidden;
	}
	.header{
		width: 100%;
		height: 150upx;
		line-height: 150upx;
		color: #fff;
		font-size: 38upx;
		text-align: center;
		background-image: linear-gradient(to right,#42A2EC,#61B2F1);
	}
	.con{
		background-color: #fff;
		padding: 0;
		margin-bottom: 24upx;
		.inv-h-w{
			display: flex;
			width: 100%;
			border-bottom: 1upx solid #E6E8ED;
			padding-left: 83upx;
			background-image: linear-gradient(to right,#42A2EC,#61B2F1);
			.invh{
				text-align: center;
				color: #BBDEF9;
				line-height: 80upx;
				font-size: 28upx;
				margin-right: 84upx;
			}
			.invhse{
				font-size: 32upx;
				color: #fff;
				border-bottom: 6upx solid #fff;
			}
		}
	}
</style>

