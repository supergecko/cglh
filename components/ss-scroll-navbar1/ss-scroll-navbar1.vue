<template>
	<view style="display: flex;align-items: center;">
		<scroll-view class="ss-scroll-navbar" scroll-x :scroll-left="scrollLeft" scroll-with-animation="true">
			<view
			v-for="(item, index) in navArr" 
			:key="item.url" 
			class="nav-item"
			:class="{current: index === tabCurrentIndex}"
			@click="tabChange(index)"
			:id="'item-' + index"
			>
				<text class="title">{{item.title}}</text>
			</view>
		</scroll-view>
		<view style="display: flex;align-items: center;">
			<image src="../../static/png/shadow.png" style="width: 26upx;height: 64upx;"></image>
			<!-- <image src="../../static/png/classification.png" style="width: 32upx;height: 32upx;margin-left:31upx;"></image> -->
		</view>
	</view>
	
</template>

<script>
	export default {
		name: 'ss-scroll-navbar1',
		props: {
			navArr: {
				type: Array,
				default () {
					return [
						{
							title: '最新上架',
							url: 'recent'
						}, {
							title: '全部',
							url: 'all'
						}, {
							title: '文学',
							url: 'literature'
						}, {
							title: '小说',
							url: 'novel'
						}, {
							title: '教育',
							url: 'education'
						}, {
							title: '历史',
							url: 'history'
						}, {
							title: '人文社科',
							url: 'humanity'
						}, {
							title: '经济与管理',
							url: 'economics'
						}, {
							title: '科学与技术',
							url: 'science'
						}, {
							title: '计算机与互联网',
							url: 'internet'
						}, {
							title: '政治与军事',
							url: 'politics'
						}, {
							title: '法律',
							url: 'law'
						}, {
							title: '生活',
							url: 'life'
						}, {
							title: '艺术',
							url: 'art'
						}, {
							title: '漫画与绘本',
							url: 'cartoon'
						}, {
							title: '医学',
							url: 'medicine'
						}, {
							title: '报刊杂志',
							url: 'magazine'
						}, {
							title: '其他',
							url: 'other'
						}
					]
				}
			},
			tabCurrentIndex: {
				type: Number,
				default: 0
			},
			scrollLeftWidth: {
				type: Number,
				default: 0
			}
		},
		data () {
			return {
				scrollLeft: this.scrollLeftWidth,
				widthList: [],
				screenWidth: 0
			}
		},
		methods: {
			/**
			 * 导航栏navbar
			 * 点击事件
			 */
			tabChange (index) {
				this.$emit('navbarTap', index);
				var widthArr = this.widthList;
				var scrollWidth = 0;
				for (var i = 0; i < index + 1; i++) {
					scrollWidth += widthArr[i];
				}
				let currentWidth = widthArr[index];
				// scrollView 居中算法
				// 减去固定宽度位移
				// 减去选中的bar的宽度的一半
				scrollWidth -=  this.screenWidth / 2;
				scrollWidth -= currentWidth / 2;
				this.scrollLeft = scrollWidth;
			},
			calculateItemWidth () {
				var that = this;
				var arr = [];
				let w = 0;
				this.navArr.forEach((item, index) =>{
					let view = uni.createSelectorQuery().in(this).select("#item-" + index);
					view.fields({
						size: true
					}, data => {
						arr.push(data.width);
					}).exec();
				})
				this.widthList = arr;
			},
			calculateWindowWidth () {
				var info = uni.getSystemInfoSync();
				this.screenWidth = info.screenWidth;
			}
		},
		created () {
			var that = this;
			this.calculateWindowWidth();
			setTimeout(function() {
				that.calculateItemWidth();
			}, 1000);
		}
	}
</script>

<style lang="scss">
	.ss-scroll-navbar {
		width: 95%;
		height: 90upx;
		// box-shadow: 0 2upx 8upx rgba(0,0,0,.06);
		background-color: #fff;
		white-space:nowrap;
		
		.nav-item {
			height: 90upx;
			text-align: center;
			padding: 0upx 20upx;
			display: inline-block;
			position: relative;
			font-size: 30upx;
			transform: scale(1.0);
			transition: .3s;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(102,102,102,1);
			.title {
				line-height: 90upx;
			} 
		}
		
		.current{
			font-size:32upx;
			font-family:PingFang SC;
			font-weight:bold;
			color:rgba(23,23,25,1);
			transform: scale(1.1);
		}
	}
</style>
