<template>
	<view class="content">
		<!-- <web-view  src="../../hybrid/html/index.html"></web-view> -->
		<web-view  :src="hybridSrc"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				KName:'',
				hybridSrc:'../../hybrid/html/index.html'
			}
		},
		onLoad(option) {
			this.KName = option.KName
			this.hybridSrc = `${this.hybridSrc}?KName=${this.KName}/USDT`
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
