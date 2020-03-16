<template>
	<view class="cashierBg">
		<view class="contentHead">
			<view class="contentHeadLine">
				<view class="contentHeadLeft">策略名称:</view>
				<view class="contentHeadRight">神经网格</view>
			</view>
			<view class="contentHeadLine">
				<view class="contentHeadLeft">策略名称:</view>
				<view class="contentHeadRight">一个月(试用)套餐</view>
			</view>
			<view class="contentHeadLine">
				<view class="contentHeadLeft">价格:</view>
				<view class="contentHeadRight">233USDT</view>
			</view>
		</view>
		<view class="contentWarp">
			<view class="middleOne">
				<view style="display: flex;align-items: center;">
					<view class="contentHeadLeft">钱包地址:</view>
					<view class="contentHeadRight">(ERC-20)</view>
				</view>
				<view class="copyMoney">复制钱包地址</view>
			</view>

			<view class="addressInput">0x5399eb964b35bd447f6f4da52ae92b4b6ccd06ea</view>

			<view class="serverPhoto"><image src="../../static/images/cashier/money.png" style="width: 220upx;height: 220upx;"></image></view>

			<view class="copyText">点击收款二维码进行下载</view>

			<view class="checkBtn">确定支付</view>
			<!--客服-->
			<uni-popup ref="customerService" :custom="true">
				<view class="uni-share" style="width:440upx;height: 493upx;">
					<image src="../../static/images/server/server.png" style="width: 274upx;height: 274upx;"></image>
					<view class="customerServiceText">
						咨询火星量化客服
						<br />
						请点击下载二维码图片
					</view>
				</view>
				<view style="display: flex;justify-content: center;padding-top: 66upx;" @click="cancel('customerService')">
					<image src="../../static/img/delea.png" style="width: 72upx;height: 72upx;"></image>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import uniPopup from '../../components/uni-popup/uni-popup.vue';
export default {
	onNavigationBarButtonTap: function(e) {
		this.$refs.customerService.open();
	},
	data() {
		return {};
	},
	methods: {
		// 通用关闭弹框
		cancel(type) {
			this.$refs[type].close();
		}
	},
	components: { uniPopup }
};
</script>

<style scoped>
.cashierBg {
	width: 100%;
	background: rgba(242, 242, 242, 1);
}
.contentHead {
	width: 706upx;
	height: 271upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 6upx;
	margin: 0 auto;
	margin-top: 20upx;
	display: flex;
	flex-direction: column;
}
.contentHeadLine {
	display: flex;
	margin-left: 30upx;
	margin-top: 40upx;
}
.contentHeadLeft {
	font-size: 32upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(119, 119, 119, 1);
	min-width: 133upx;
}
.contentHeadRight {
	font-size: 32upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(23, 23, 25, 1);
	margin-left: 41upx;
}
.contentWarp {
	width: 706upx;
	height: 787upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 6upx;
	margin: 0 auto;
	margin-top: 24upx;
}
.middleOne {
	display: flex;
	align-items: center;
	padding-top: 51upx;
	padding-left: 30upx;
	padding-right: 30upx;
	justify-content: space-between;
}
.copyMoney {
	font-size: 32upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(66, 162, 236, 1);
}
.addressInput {
	width: 606upx;
	height: 92upx;
	background: rgba(242, 242, 242, 1);
	border: 2upx solid rgba(189, 189, 189, 1);
	margin: 0 auto;
	margin-top: 40upx;
	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(23, 23, 25, 1);
	line-height: 92upx;
	padding-left: 20upx;
	padding-right: 20upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.serverPhoto {
	width: 220upx;
	height: 220upx;
	border: 2upx solid rgba(51, 51, 51, 1);
	margin: 0 auto;
	margin-top: 82upx;
}
.copyText {
	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(62, 120, 253, 1);
	text-align: center;
	margin-top: 20upx;
}
.checkBtn {
	width: 646upx;
	height: 96upx;
	background: rgba(66, 162, 236, 1);
	opacity: 0.94;
	border-radius: 10upx;
	font-size: 34upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(245, 245, 245, 1);
	text-align: center;
	line-height: 96upx;
	margin: 0 auto;
	margin-top: 56upx;
}
/* 客服 */
.uni-share {
	width: 440upx;
	height: 493upx;
	background: rgba(255, 255, 255, 1);
	border-radius: 24upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
}
.customerServiceText {
	font-size: 30upx;
	font-family: PingFang SC;
	font-weight: 400;
	color: rgba(23, 23, 25, 1);
	text-align: center;
	margin-top: -60upx;
}
</style>
