import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const usertokenlocal = uni.getStorageSync('user_token')
const userinfolocal = uni.getStorageSync('userinfo')
const walletdatalocal = uni.getStorageSync('wallet_data')
const maindatalocal = uni.getStorageSync('main_data')
const userMobile = uni.getStorageSync('user_mobile')

const WarehouseNuber = uni.getStorageSync('WarehouseNuber')
const strategyTitle = uni.getStorageSync('strategyTitle')
const strategyCose = uni.getStorageSync('strategyCose')
const RentalTime = uni.getStorageSync('RentalTime')
const exchangeText = uni.getStorageSync('exchangeText')
const exchangeIcon = uni.getStorageSync('exchangeIcon')

const store = new Vuex.Store({
    state: {
		usertoken:'',
        hasLogin: usertokenlocal ? true : false,
		userinfo: userinfolocal ? userinfolocal : {}, // 用户的个人信息
		walletarr: walletdatalocal ? walletdatalocal : {},
		mainarr: maindatalocal ? maindatalocal : {},
		
		WarehouseNuber: WarehouseNuber ? WarehouseNuber : '',  // 仓位
		strategyTitle:strategyTitle ? strategyTitle : '',  // 策略标题
		strategyCose:strategyCose ? strategyCose : '', // 策略费用
		RentalTime:strategyCose ? strategyCose : '', // 租用时间
		
		strategy_id:'',//策略ID
		bourse_id:'',//交易所ID
		WarehouseNuber2: '',  // 仓位
		strategyTitle2:'',  // 策略标题
		strategyCose2:'', // 策略费用
		exchangeText:'',//交易所名字
		exchangeIcon:'',//交易所icon
    },
    mutations: {
        login(state, usertoken) {
            state.usertoken = usertoken || '';
            state.hasLogin = true;
        },
        logout(state) {
			uni.clearStorageSync();
            state.hasLogin = false;
        },
		exchangeText2(state, userinfo) {
			state.exchangeText = userinfo;
		},
		exchangeIcon2(state, userinfo) {
			state.exchangeIcon = userinfo;
		},
		WarehouseNuber2(state, userinfo) {
			state.WarehouseNuber2 = userinfo;
		},
		strategyTitle2(state, userinfo) {
			state.strategyTitle2 = userinfo;
		},
		strategyCose2(state, userinfo) {
			state.strategyCose2 = userinfo;
		},
		strategyId(state, userinfo) {
			state.strategy_id = userinfo;
		},
		bourseId(state, userinfo) {
			state.bourse_id = userinfo;
		},
		clearList(state){
			state.WarehouseNuber2 = '';
			state.strategyTitle2 = '';
			state.strategyCose2 = '';
			state.strategy_id = '';
			state.bourse_id = '';
		},
		
		userinfoarr(state, userinfo) {
			state.userinfo = userinfo;
		},
		walletarr(state, array) {//钱包数组
			state.walletarr = array;
		},
		mainarr(state, array) {
			state.mainarr = array;
		}
    }
})

export default store
