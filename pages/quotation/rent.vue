<template>
	<view id="wrap">
		<view class="header">
			<view hover-class="word-btn--hover" :hover-start-time="20" :hover-stay-time="70">
				<view @click="show" style="display: flex;align-items: center;">
					<image src="../../static/images/pic.png" mode="" style="width: 40upx;height: 40upx;vertical-align: -6upx;margin-right:15upx;"></image>
					<view style="display: flex;align-items: center;">
						<image :src="iconImg" style="width:70upx;height: 70upx;margin-right: 22upx;" v-if="iconImgFlag"></image>
						<view>{{ exchangeText }}</view>
					</view>
				</view>
				<uni-drawer :visible="showLeft" mode="left" @close="hide" style="color:#171719">
					<uni-list>
						<view class="tit" style="margin-bottom:52upx;">
							<image src="../../static/images/pic.png" mode="" style="width:40upx;height:40upx;vertical-align:-12upx;margin-right:19upx;"></image>
							<text style="font-size:40upx;">选择交易所</text>
						</view>
						<view class="h-con">
							<view class="h-item" v-for="(item, i) in BourseArr" :key="i" @click="chooseItem(item)" :hover-start-time="20" :hover-stay-time="70">
								<view><image class="h-img" :src="item.icon" mode=""></image></view>
								<view style="display: flex;">
									<view>{{ item.title }}</view>
									<view style="font-size:28upx;color:#42A2EC;">({{ item.binding_str }})</view>
								</view>
								<view class="checkImgIn" v-bind:class="{ checkImgFlag: item.title === exchangeText }">
									<image src="../../static/images/tick.png" mode="" style="width:44upx;height:30upx;"></image>
								</view>
							</view>
						</view>
					</uni-list>
				</uni-drawer>
			</view>
			<view class="rentcode" @click="showToggle" style="display: flex;align-items: center;">
				<view>租用记录</view>
				<view><image class="q-img" :src="src" mode="" style="width: 42upx;height: 42upx;margin-left:15upx;"></image></view>
				<view class="list" v-show="isShow">
					<view @click="toPage('../quotation/apiManage')">API管理</view>
					<view @click="toPage('../quotation/rentRecord')">租用记录</view>
					<view class="no">关于交易策略</view>
				</view>
			</view>
		</view>
		<view class="img">
			<image src="../../static/images/q-img1.png" mode="" style="width:338upx;height:274upx;"></image>
			<view style="font-size:30upx;color:#C7E2F7;">暂未开启量化策略</view>
		</view>
		<view class="center">
			<h2 style="color: #fff;font-size:34upx;font-weight:bold;">仓位配置</h2>
			<view class="main">
				<view class="left">
					<view style="margin-bottom:30upx;">
						<text class="tit">策略</text>
						<text class="txt">{{ strategyTitle }}</text>
					</view>
					<view style="margin-bottom:30upx;">
						<text class="tit">仓位</text>
						<text class="txt">{{ WarehouseNuber }}USDT</text>
					</view>
					<view>
						<text class="tit">费用</text>
						<text class="txt">{{ strategyCose }}USDT/月</text>
					</view>
				</view>
				<view class="right" style="display: flex;align-items: center;" @click="toPage('../quotation/selectStrategy')">
					<view>去选择</view>
					<image src="../../static/images/q-right.png" mode="" style="width:18upx;height: 34upx;margin-left:10upx;vertical-align:-6upx;"></image>
				</view>
			</view>
		</view>
		<view class="con">
			<view class="add">
				<view class="item" style="border-right: 1upx solid #fff; font-size:64upx;" @click="toReduce">-</view>
				<view style="color:#98D1FC;font-size:30upx;width:264upx;line-height:82upx;text-align:center;">{{ rentTime }}个月(租用时间)</view>
				<view class="item" style="border-left: 1upx solid #fff;" @click="toAdd">+</view>
			</view>
			<view class="renew">
				<radio style="font-size: 30upx;" :checked="chooseCla" @click="toggleChooseCla" />
				<!-- <view class="r-img"></view> -->
				<view style="color:#F2F8FD;font-size: 30upx;">到期自动续费</view>
			</view>
		</view>
		<view class="but" @click="_Strategy_buy">开启量化</view>
		<view class="footer">
			<h2 style="font-size:40upx;color:#fff;">运行结果</h2>
			<view style="display: flex;flex-direction: column;align-items: center;padding-top:168upx;">
				<view style="width:272upx;"><image src="../../static/images/q-img2.png" mode="" style="width: 272upx;height: 248upx;"></image></view>
				<view style="color:#C7E2F7;font-size: 30upx;text-align: center;">暂无记录</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue';
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import uniSection from '@/components/uni-section/uni-section.vue';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
export default {
	components: {
		uniIcons,
		uniDrawer,
		uniList,
		uniListItem,
		uniSection,
		uniNumberBox
	},
	onPullDownRefresh() {
		//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
		var fres = setTimeout(() => {
			//刷新要执行的方法
			this.clearList();
			this.WarehouseNuber = this.WarehouseNuber2 ? this.WarehouseNuber2 : uni.getStorageSync('WarehouseNuber');
			this.strategyTitle = this.strategyTitle2 ? this.strategyTitle2 : uni.getStorageSync('strategyTitle');
			this.strategyCose = this.strategyCose2 ? this.strategyCose2 : uni.getStorageSync('strategyCose');
			this._Bourse();
			uni.stopPullDownRefresh(); //停止下拉刷新动画
			uni.showToast({
				icon: 'none',
				title: '刷新成功'
			});
		}, 1000);
		uni.getNetworkType({
			success: res => {
				if (res.networkType == 'none') {
					uni.showToast({
						icon: 'none',
						title: '当前网络不可用'
					});
					clearTimeout(fres);
					uni.stopPullDownRefresh(); //停止下拉刷新动画
				}
			}
		});
	},
	computed: {
		...mapState(['WarehouseNuber2', 'strategyTitle2', 'strategyCose2', 'strategy_id'])
	},
	onLoad() {
		this.clearList();
		this._Bourse();
	},
	onShow() {
		this.WarehouseNuber = this.WarehouseNuber2 ? this.WarehouseNuber2 : uni.getStorageSync('WarehouseNuber');
		this.strategyTitle = this.strategyTitle2 ? this.strategyTitle2 : uni.getStorageSync('strategyTitle');
		this.strategyCose = this.strategyCose2 ? this.strategyCose2 : uni.getStorageSync('strategyCose');
	},
	data() {
		return {
			isShow: false,
			showRight: false,
			showLeft: false,
			src: '../../static/images/more.png',
			rentTime: 0,
			chooseCla: true,
			BourseArr: [], // api数组
			exchangeText: '选择交易所',
			iconImg: '',
			iconImgFlag: false,
			WarehouseNuber: 0, // 仓位
			strategyTitle: '', // 策略标题
			strategyCose: 0, // 策略费用
			StrategyFindArr:{}, //点击交易所返回最新有效策略
			exchangeArr: [
				{
					name: '火币全球站',
					isbind: '去绑定',
					imgSrc: 'okex.png'
				},
				{
					name: 'okex',
					isbind: '已绑定',
					imgSrc: 'okex.png'
				},
				{
					name: '币安',
					isbind: '去绑定',
					imgSrc: 'okex.png'
				}
			]
		};
	},
	methods: {
		...mapMutations(['clearList',]),
		//点击交易所返回最新有效策略
		_Strategy_find(BourseId) {
			uni.getNetworkType({
				success: res => {
					if (res.networkType == 'none') {
						uni.showToast({
							icon: 'none',
							title: '当前网络不可用'
						});
					}
				}
			})
			uni.showLoading({
				title: '加载中'
			})
			const mobile = uni.getStorageSync('user_mobile')
			const bourse_id = BourseId
			const timestamp = Date.parse(new Date()) / 1000
			const sign = this.$md5(`${mobile}**${bourse_id}**${timestamp}**cglhhaofengshui`)
			let params = { bourse_id, timestamp, sign }
			this.$ajax
				.post({
					url: this.$service.api_lists.Strategy_find,
					data: params
				})
				.then(res => {
					if (res.data.code == 1) {
						// 初始化信息
						this.StrategyFindArr = res.data.data.bourse
						if(res.data.data.strategy){
							this.WarehouseNuber = res.data.data.strategy.positions // 仓位
							this.strategyTitle = res.data.data.strategy.title // 策略标题
							this.strategyCose = res.data.data.strategy.price // 策略费用
							this.rentTime = res.data.data.strategy.month
							if(res.data.data.strategy.is_continuous===1){
								this.chooseCla = true
							} else {
								this.chooseCla = false
							}
						}
					}
					uni.hideLoading();
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err,
						duration: 2000
					});
				});
		},
		//开启策略
		_Strategy_buy() {
			if (this.StrategyFindArr === {}) {
				uni.showToast({
					icon: 'none',
					title: '请选择交易所'
				});
				return;
			}
			if (this.strategy_id === '') {
				uni.showToast({
					icon: 'none',
					title: '请选择策略'
				});
				return;
			}
			if (this.rentTime === 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择认购月数'
				});
				return;
			}
			uni.getNetworkType({
				success: res => {
					if (res.networkType == 'none') {
						uni.showToast({
							icon: 'none',
							title: '当前网络不可用'
						});
					}
				}
			});
			uni.showLoading({
				title: '加载中'
			});
			const mobile = uni.getStorageSync('user_mobile');
			const strategy_id = this.strategy_id;
			const bourse_id = this.StrategyFindArr.bourse_id;
			const month = this.rentTime;
			const number = this.WarehouseNuber2;
			const is_continuous = this.chooseCla;
			const timestamp = Date.parse(new Date()) / 1000;
			const sign = this.$md5(`${mobile}**${strategy_id}**${bourse_id}**${month}**${number}**${is_continuous}**${timestamp}**cglhhaofengshui`);
			let params = { strategy_id, bourse_id, month, number, is_continuous, timestamp, sign };
			this.$ajax
				.post({
					url: this.$service.api_lists.Strategy_buy,
					data: params
				})
				.then(res => {
					if (res.data.code == 1) {
						// 初始化信息
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						});
					}
					uni.hideLoading();
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err,
						duration: 2000
					});
				});
		},
		// 获取api信息
		_Bourse() {
			uni.getNetworkType({
				success: res => {
					if (res.networkType == 'none') {
						uni.showToast({
							icon: 'none',
							title: '当前网络不可用'
						});
					}
				}
			});
			uni.showLoading({
				title: '加载中'
			});
			const mobile = uni.getStorageSync('user_mobile');
			const timestamp = Date.parse(new Date()) / 1000;
			const sign = this.$md5(`${mobile}**${timestamp}**cglhhaofengshui`);
			let params = { timestamp, sign };
			this.$ajax
				.post({
					url: this.$service.api_lists.Bourse,
					data: params
				})
				.then(res => {
					if (res.data.code == 1) {
						// 初始化信息
						this.BourseArr = res.data.data;
					}
					uni.hideLoading();
				})
				.catch(err => {
					uni.hideLoading();
					uni.showToast({
						title: err,
						duration: 2000
					});
				});
		},
		// 选择交易所
		chooseItem(item) {
			this.showLeft = false;
			if (item.binding_str === '已绑定') {
				this.iconImgFlag = true;
				this.exchangeText = item.title;
				this.iconImg = item.icon;
				this._Strategy_find(item.bourse_id)
			} else {
				uni.navigateTo({
					url: `../quotation/importApi?binding=${item.binding}&bourse_id=${item.bourse_id}`
				});
			}
		},
		toggleChooseCla() {
			this.chooseCla = !this.chooseCla;
		},
		toAdd() {
			this.rentTime = this.rentTime + 1;
		},
		toReduce() {
			if (this.rentTime > 0) {
				this.rentTime = this.rentTime - 1;
			}
		},
		toPage(URL) {
			uni.navigateTo({
				url: URL
			});
		},
		showToggle() {
			this.isShow = !this.isShow;
		},
		show() {
			this.showLeft = true;
		},
		hide() {
			this.showLeft = false;
		},
		confirm() {}
	},
	onNavigationBarButtonTap(e) {
		this.showLeft = !this.showLeft;
	},
	onBackPress() {
		if (this.showLeft) {
			this.hide();
			return true;
		}
	}
};
</script>
<style lang="scss" scoped>
.checkImgIn {
	position: absolute;
	right: 0;
	display: none;
}
.checkImgFlag {
	display: block;
}
/deep/ .uni-drawer__content {
	box-sizing: border-box;
	padding: 51upx 26upx;
}
.h-con {
	.h-item {
		display: flex;
		height: 70upx;
		line-height: 70upx;
		font-size: 34upx;
		margin-bottom: 50upx;
		.h-img {
			width: 70upx;
			height: 70upx;
			margin-right: 20upx;
			vertical-align: -10upx;
		}
	}
}
</style>

<style lang="scss" scoped>
page {
	background-image: linear-gradient(#0a76c6, #0370c2);
}
#wrap {
	width: 100%;
	background-image: linear-gradient(#0a76c6, #0370c2);
}
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20upx 27upx 0;
	font-size: 32upx;
	color: #fff;
	min-height: 164upx;
	.rentcode {
		position: relative;
		.list {
			position: absolute;
			top: 0;
			left: -88upx;
			box-sizing: border-box;
			width: 225upx;
			height: 216upx;
			line-height: 72upx;
			text-align: center;
			padding: 0 26upx;
			background-color: #5cb2f3;
			color: #fff;
			font-size: 28upx;
			border-radius: 10upx;
			transition: display 0.5s;
			view {
				border-bottom: 1upx solid #a1d4fb;
			}
			.no {
				border: none;
			}
		}
	}
}
.img {
	width: 338upx;
	margin: 161upx auto 161upx;
	text-align: center;
}
.center {
	box-sizing: border-box;
	width: 710upx;
	height: 410upx;
	margin: 0 auto;
	padding: 42upx 34upx;
	background-color: #0b87e5;
	border-radius: 10upx;
	.main {
		display: flex;
		margin-top: 61upx;
		color: #fefefe;
		font-size: 34upx;
		.left {
			border-right: 1upx solid #c2e3fc;
			padding-right: 34upx;
			min-width: 440upx;
			.tit {
				color: #c2e3fc;
				// margin-right: 100upx;
			}
			.txt {
				float: right;
			}
		}
		.right {
			padding: 88upx 0 88upx 35upx;
		}
	}
}
.con {
	width: 710upx;
	margin: 48upx auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.add {
		width: 414upx;
		height: 82upx;
		border: 1upx solid #fff;
		display: flex;
		color: #fff;
		border-radius: 10upx;
		.item {
			width: 82upx;
			height: 82upx;
			line-height: 82upx;
			text-align: center;
		}
	}
	.renew {
		display: flex;
		// margin: 25upx 0 0 56upx;
		.r-img {
			display: inline-block;
			width: 44upx;
			height: 44upx;
			margin-right: 14upx;
			background: url(../../static/images/q-choosing.png) no-repeat;
			background-size: 44upx, 44upx;
		}
		.r-img.choose {
			background: url(../../static/images/default.png) no-repeat;
		}
	}
}
.but {
	width: 710upx;
	height: 100upx;
	margin: 73upx auto 115upx;
	line-height: 100upx;
	background-color: #e7a646;
	font-size: 34upx;
	text-align: center;
	color: #fff;
	border-radius: 10upx;
}
.footer {
	width: 710upx;
	margin: 0 auto 100upx;
}
</style>
