/*
	封装uni-app请求
*/
import $store from "../store";
import service from "../service.js";
let user_token = uni.getStorageSync("user_token") || '';

function request(params, method) {
	
	return new Promise(function(resolve, reject) {
		if (!service.api_baseurl || !service.app_config) {
			console.log('service.js 中参数配置不全');
			reject('service.js 中参数配置不全');
			return
		}

		// 添加必要参数 根据具体业务定
		uni.request({
			url: service.api_baseurl + params.url,
			data: params.data,
			method: method,
			header:{
				"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
				"XX-Token":uni.getStorageSync("user_token"),
				"XX-Device-Type":service.app_config.device_type
			},
			success(res) {
				if(res.statusCode == 200){
					if(res.data.code == 10001){
						uni.removeStorageSync('user_token');
						uni.reLaunch({
						    url: '../login/login'
						});
					}
					if(res.data.code == 0){
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						});
					}
					// 成功回调
					resolve(res)
				} else {
					console.log(res)
				}
			},
			fail(err) {
				uni.showToast({
					title: err,
					icon: "none"
				})
				// 失败回调
			},
			complete() {
				// 无论成功或失败 只要请求完成的 回调
				
			}
		})
	})
};
export default {
	async get(params) {
		return await request(params, "GET")
	},
	async post(params) {
		return await request(params, "POST")
	},

}
