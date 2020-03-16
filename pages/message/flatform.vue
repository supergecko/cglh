<template>
	<view class="text">
		<view class="line"></view>
		<view class="content">
			<view class="new" @click="toPath('../message/anno-detail')">
				<text class="n-con">巴比特城市学院高级进修：锻造区块链思维，构建知识图谱</text>
			</view>
			<view class="new" @click="toPath('../message/anno-detail')">
				<text class="n-con">巴比特城市学院高级进修：锻造区块链思维，构建知识图谱</text>
			</view>
			<view class="new" @click="toPath('../message/anno-detail')">
				<text class="n-con">巴比特城市学院高级进修：锻造区块链思维，构建知识图谱</text>
			</view>
			<view class="new" @click="toPath('../message/anno-detail')">
				<text class="n-con">巴比特城市学院高级进修：锻造区块链思维，构建知识图谱</text>
			</view>
			<view class="new" @click="toPath('../message/anno-detail')">
				<text class="n-con">巴比特城市学院高级进修：锻造区块链思维，构建知识图谱</text>
			</view>
			<view class="new" @click="toPath('../message/anno-detail')">
				<text class="n-con">巴比特城市学院高级进修：锻造区块链思维，构建知识图谱</text>
			</view>
			<view class="new no" @click="toPath('../message/anno-detail')">
				<text class="n-con">巴比特城市学院高级进修：锻造区块链思维，构建知识图谱</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{}
		},
		methods:{
			toPath(Url) {
				uni.navigateTo({
					url:Url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {background-color: #F8F8F8;}
	.line{
		width: 100%;
		height: 1upx;
		background-color: #E6E8ED;
	}
	.content{
		box-sizing: border-box;
		width: 100%;
		padding-left: 30upx;
		background-color: #fff;
		.new{
			padding: 30upx 20upx 30upx 0;
			border-bottom: 2upx solid #E6E8ED;
			.n-con{
				line-height: 22upx;
				font-size: 32upx;
				color: #171719;
			}
		}	
		.new.no{
			border: none;
		}
	}
</style>
