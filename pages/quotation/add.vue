<template>
	<view class="wrap">
		<uSearch :dictArr="tobj" searchKey="aaa" @selectIndexValue="getVal"></uSearch>
	</view>
</template>

<script>
	import uSearch from '@/components/userzero-search/userzero-search.vue'
	export default {
		components:{
			uSearch
		},
		data() {
			return {
				tobj: [{'aaa': 'x2ooo'},{'aaa': 'xo4o5o','xxd':'你好232'},{'aaa': 'x1o2o3o','xxd':'你好682'},{'aaa': 'xo23o98o','xxd':'你好431'}]
			}
		},
		methods: {
			test(){
				for( let i of arr){
				    console.log(i)
				}
			},
			toPage(URL){
				uni.reLaunch({
					url:URL
				})
			},
			getVal(val){
				console.log(val)
			},
			getInputVal(){
				var val = this.$refs.usearch.getSearchInputValue();
				console.log(val)
			}
			
		},
		onLoad(option) {
			
		},
	}
</script>

<style lang="scss" scoped>
	.wrap{
		width: 100%;
		background-color: #f8f8f8;
		overflow-x: hidden;
		.header{
			display: flex;
			width: 100%;
			padding: 20upx 0 20upx 30upx;
			background-image: linear-gradient(#42A2EC,#61B2F1);
			.item{
				box-sizing: border-box;
				width: 600upx;
				height: 68upx;
				padding-left: 40upx;
				line-height: 78upx;
				background-color: #fff;
				border-radius: 34upx;
			}
			.uni-input-placeholder{
				font-size:30upx;
			}
		}
		.con{
			width: 100%;
			background-color: #fff;
			.item{
				width: 100%;
				height: 110upx;
				line-height: 110upx;
				border-bottom: 1upx solid #E6E8ED;
				margin-left: 32upx;
				.item1{
					font-size: 34upx;
					color: #171719;
				}
				.item2{
					font-size: 34upx;
					color: #888;
				}
				.img{
					float: right;
					margin-right: 60upx;
					margin-top: 26upx;
				}
			}
		}
		.item.no{
			border: none;
		}
	}
</style>
