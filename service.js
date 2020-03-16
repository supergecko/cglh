// 管理账号信息
// const api_baseurl = 'https://api.llquant.com/api/';//线上弃用
const api_baseurl = 'http://api.haofengshui.wang/api/';//测试
// const api_baseurl = 'http://api.qklni.com/api/';//线上
const app_config = {
	"device_type" : 'mobile'
}
const api_lists = {
	"sendmobilecode":'user/verification_code/send',//发送手机验证码
	"check_verification_code":'user/public/check_verification_code', // 校验验证码
	"login":'user/public/login',//登录
	"loginOut":'user/public/logout', // 退出登录
	"register":'user/public/register',//注册
	"passwordModify":'user/public/passwordReset',//重置密码(忘记密码)
	"resetPassWord":'user/security/passwordModify', // 修改登录密码
	"currency":'user/address/currency', // 币种列表
	"addCoinAddress":'user/address/add', // 添加提币地址
	"addressList":'user/address/index' ,// 提币地址列表接口
	"safetyIndex":'user/security/index' ,// 安全中心首页接口
	"uploadIDCard":'user/security/submit_authentication',// 上传身份证信息
	"appIndexInfo":'home/index/index' ,// 首页基本信息接口
	"mainCoin":'home/market/mainCoin',//首页实时汇率接口
	"Increaselist":'home/market/index' ,// 首页涨幅榜接口
	"deleteAddress":'user/address/delete' ,// 删除钱包地址
	"modifyAddress":'user/address/modify' ,// 编辑钱包地址
	"securityPasswordSet":'user/security/securityPasswordSet' ,//设置资金密码
	"securityPasswordModify":'user/security/securityPasswordModify' ,//修改资金密码
	"securityPasswordAuth":'user/security/securityPasswordAuth', // 设置资金密码时效性
	"assetsIndex":'user/funds/assets' ,// 资产首页接口
	"recharge":'user/funds/recharge' ,// 充币提交审核接口
	"drawing":'user/funds/drawing' ,// 提现申请接口
	"transfer_assets":'user/funds/transfer_assets' ,// 资金划转（转账）接口
	"myManagement":'home/index/financing' ,// 余币宝/量化基金
	"financingDetail":'home/index/financing_detail' ,// 余币宝/量化基金 产品详情接口
	"presale":'user/financing/presale' ,// 认购信息加载
	"buyPresale":'user/financing/buy' ,// 进行认购
	"getGoogleAuth":'user/security/getGoogleAuth' ,// 获取谷歌验证码接口
	"checkGoogleAuth":'user/security/checkGoogleAuth' ,// 校验谷歌验证码
	"closeGoogleAuth":'user/security/closeGoogleAuth' ,// 关闭谷歌验证码
	"trading":'home/market/trading' ,// 行情页首页接口
	"custom_add" :'home/market/custom_add' ,// 行情添加自选
	"custom_delete": 'home/market/custom_delete' ,// 行情自选删除
	"recharge_withdawing_log":'user/funds_log/recharge_withdrawing_log' ,// 充提记录
	

	"Strategy_buy":'user/strategy/strategy_buy' ,// 策略认购
	'Strategy_find':'user/strategy/strategy_find' ,// 点击交易所返回最新有效策略
	"Lease":'user/strategy/lease',//租赁记录
	"Trading":'home/market/search_trading' ,// 行情关键词搜索
	"Articles_by_category":'portal/articles/articles_by_category' ,// 新闻接口
	"Invitation":'user/public/myPopularize' ,// 邀请返佣
	"myFinancing":'user/financing/myFinancing' ,// 我的理财
	'Articles_detail':'portal/articles/Articles_detail' ,// 新闻详情接口
	'Sys_info':'user/public/sys_info' ,// 系统消息接口
	'Sys_detail':'user/public/sys_detail' ,// 系统消息详情
	"checkSecurityPasswordAuth":'user/security/checkSecurityPasswordAuth' ,// 校验资金密码时效性
	"securityPasswordAuthAgain":'user/security/securityPasswordAuthAgain' ,//检验资金密码
	"feedback":'user/profile/feedback' ,//问题反馈
	"commonProblem":'user/page/detail/id/7.html' ,//常见问题
	"manageRecord":'user/financing/financing_record' ,// 理财记录
	
	"Strategy_list":'user/strategy/strategy_list' ,//策略列表
	"Do_collection":'user/strategy/do_collection',//策略收藏/取消
	"collection_list":'user/strategy/collection_list' ,//收藏列表
	"Strategy_detail":'user/strategy/strategy_detail' ,//策略详情
	"Bourse_by_self":'user/strategy/bourse_by_self' ,//购买时候我的交易所列表
	"Bourse":'user/strategy/bourse' ,//交易所列表
	"Bourse_add":'user/strategy/bourse_add', // 添加交易所
	"My_bourse":'user/strategy/my_bourse',//我的交易所
	"Bourse_info":'user/strategy/bourse_edit' ,//我的交易所详情
	"Bourse_edit":'user/strategy/bourse_save' ,//修改交易所账户
	"Bourse_api_check":'user/strategy/bourse_api_check' //交易所api验证
	
	
}
const user_token = 'user-token';
const access_token = 'access-token';

const getUsers = function () {
    let ret = '';
    ret = uni.getStorageSync(user-token);
    if (!ret) {
        ret = '[]';
    }
    return JSON.parse(ret);
}

const addUser = function (userInfo) {
    let users = getUsers();
    users.push({
        account: userInfo.account,
        password: userInfo.password
    });
    uni.setStorageSync(user-token, JSON.stringify(users));
}


export default {
    getUsers,
    addUser,
	api_baseurl,
	app_config,
	api_lists
}
