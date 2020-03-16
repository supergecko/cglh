<template>
	<view class="wrap" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
		<view class="titleNview-placing"></view>
		<!-- 刷新组件需搭配scroll-view使用，并在pages.json中添加 "disableScroll":true-->
		<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
		<ss-scroll-navbar1 :navArr="navList" :tabCurrentIndex="currentIndex1" @navbarTap="navbarTapHandler1" ref="scrollNavbar1" id="scrollNavbar1"></ss-scroll-navbar1>
		<swiper style="min-height:100%" :current="currentIndex1"  @change="swiperTab">
			<!-- 收藏 -->
			<swiper-item >
				<scroll-view style="height: 100%;" scroll-y="true"  scroll-with-animation scroll-into-view="scrollNavbar1">
					<strategy-collect ref="strategycollect"></strategy-collect>
					<view style="width: 100%;height: var(--status-bar-height);opacity:0;">底部占位盒子</view>
					<view style="width: 100%;height: 150upx;opacity:0;">底部占位盒子</view>
				</scroll-view>
			</swiper-item>
			<!-- 策略广场 -->
			<swiper-item>
				<scroll-view style="height: 100%;" scroll-y="true"  scroll-with-animation scroll-into-view="scrollNavbar1">
					<strategy-index ref="strategyindex"></strategy-index>
					<view style="width: 100%;height: var(--status-bar-height);opacity:0;">底部占位盒子</view>
					<view style="width: 100%;height: 150upx;opacity:0;">底部占位盒子</view>
				</scroll-view>
			</swiper-item>
			<!-- 我的策略 -->
			<swiper-item>
				<scroll-view style="height: 100%;" scroll-y="true"  scroll-with-animation scroll-into-view="scrollNavbar1">
					<strategy-my ref="strategyMy"></strategy-my>
					<view style="width: 100%;height: var(--status-bar-height);opacity:0;">底部占位盒子</view>
					<view style="width: 100%;height: 150upx;opacity:0;">底部占位盒子</view>
				</scroll-view>
			</swiper-item>
			<!-- 我的交易所 -->
			<swiper-item>
				<scroll-view style="height: 100%;" scroll-y="true"  scroll-with-animation scroll-into-view="scrollNavbar1">
					<strategy-exchange ref="strategyExchange"></strategy-exchange>
					<view style="width: 100%;height: var(--status-bar-height);opacity:0;">底部占位盒子</view>
					<view style="width: 100%;height: 150upx;opacity:0;">底部占位盒子</view>
				</scroll-view>
			</swiper-item>
			
			<!-- 收益 -->
			<swiper-item>
				<scroll-view style="height: 100%;" scroll-y="true"  scroll-with-animation scroll-into-view="scrollNavbar1">
					<strategy-earning ref="strategyEarning"></strategy-earning>
					<view style="width: 100%;height: var(--status-bar-height);opacity:0;">底部占位盒子</view>
					<view style="width: 100%;height: 150upx;opacity:0;">底部占位盒子</view>
				</scroll-view>
			</swiper-item>
			
			<!-- 租用记录 -->
			<swiper-item>
				<scroll-view style="height: 100%;" scroll-y="true"  scroll-with-animation scroll-into-view="scrollNavbar1">
					<strategy-rent ref="strategyRent"></strategy-rent>
					<view style="width: 100%;height: var(--status-bar-height);opacity:0;">底部占位盒子</view>
					<view style="width: 100%;height: 150upx;opacity:0;">底部占位盒子</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import ssScrollNavbar1 from '@/components/ss-scroll-navbar1/ss-scroll-navbar1.vue'
	import strategyIndex from '@/components/strategyIndex/strategyIndex.vue'
	import strategyCollect from '@/components/strategyCollect/strategyCollect.vue'
	import strategyMy from '@/components/strategyMy/strategyMy.vue'
	import strategyExchange from '@/components/strategyExchange/strategyExchange.vue'
	import strategyEarning from '@/components/strategyEarning/strategyEarning.vue'
	import strategyRent from '@/components/strategyRent/strategyRent.vue'
	import refresh from '@/components/refresh.vue' //刷新组件
	import { mapState, mapMutations} from 'vuex'
	export default {
		computed: {
		    ...mapState(['hasLogin']),
		},
		components: {		
			ssScrollNavbar1,strategyIndex,strategyCollect,strategyMy,strategyExchange,strategyEarning,strategyRent,refresh
		},
		onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			var fres = setTimeout(() => {
				//刷新要执行的方法
				switch (this.currentIndex1){
					case 0:
						this.$refs.strategycollect._collection_list();
					break;
					case 1:
						this.$refs.strategyindex._Strategy_list();
					break;
					case 2:
						this.$refs.strategyindex._Strategy_list();
					break;
					case 3:
						this.$refs.strategyindex._Strategy_list();
					break;
					case 4:
						this.$refs.strategyindex._Strategy_list();
					break;
					case 5:
						this.$refs.strategyindex._Strategy_list();
					break;
				}
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
		onLoad() {
			
		},
		onReady(){
			if (!this.hasLogin) {
			   uni.reLaunch({
			      url: '../login/login'
			  })
			  return
			}
			this.$refs.strategyindex._Strategy_list()
			this.$refs.strategycollect._collection_list()
			this.$refs.strategyExchange._My_bourse()
		},
		data() {
			return {
				currentIndex1: 1,
				toView:'',//回到顶部id
				navList: [
					{
						title: '收藏'
					}, {
						title: '策略广场'
					}, {
						title: '我的策略'
					}, {
						title: '我的交易所'
					}, {
						title: '收益'
					}, {
						title: '租用记录'
					}
				]
			
			}
		},
		methods:{
			// 刷新touch监听
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e){
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
			isRefresh(){
				setTimeout(() => {
					uni.showToast({
						icon: 'none',
						title: '刷新成功'
					})
					this.$refs.refresh.endAfter() //刷新结束调用
				}, 1000)
			},
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
			// swiper 滑动
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				this.$refs.scrollNavbar1.tabChange(index);
			},
			navbarTapHandler1 (index) {
				this.currentIndex1 = index;
				var obj = this.navList[index];
				// if(index==0){
				// 	this.$refs.strategyindex._Strategy_list();
				// }
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
				height: 100%;
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


