(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/assets/transfer"],{4706:function(t,n,e){},5602:function(t,n,e){"use strict";(function(t){e("590a"),e("921b");o(e("66fd"));var n=o(e("8990"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},"6bd4":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){return e.e("components/uni-popup/uni-popup").then(e.bind(null,"f7ac"))},a={components:{uniPopup:o},data:function(){return{coinName:"BTC",coinArry:[],asset:{},memoFlag:!1,withdraw:{to_mobile:"",number:"",currency_id:"",memo:""},quantum:0}},onLoad:function(t){this._currency()},methods:{toPath:function(n){t.navigateTo({url:n})},checkWithdraw:function(){""!==this.withdraw.to_mobile?""!==this.withdraw.number?t.navigateTo({url:"../assets/transverify2?currency_id=".concat(this.withdraw.currency_id,"&to_mobile=").concat(this.withdraw.to_mobile,"&number=").concat(this.withdraw.number,"&memo=").concat(this.withdraw.memo)}):t.showToast({icon:"none",title:"请输入到账数量"}):t.showToast({icon:"none",title:"请输入对方手机号码"})},checkPopup:function(t){this.$refs.popup.close(),this.coinName=t.title,this.asset=t.asset,this.withdraw.currency_id=t.asset.currency_id},closePopup:function(){this.$refs.popup.close()},openPopup:function(){this.$refs.popup.open()},_currency:function(){var n=this;t.getNetworkType({success:function(n){"none"==n.networkType&&t.showToast({icon:"none",title:"当前网络不可用"})}}),t.showLoading({title:"加载中"});var e=t.getStorageSync("user_mobile"),o=Date.parse(new Date)/1e3,a=this.$md5("".concat(e,"**").concat(o,"**cglhhaofengshui")),i={timestamp:o,sign:a};this.$ajax.post({url:this.$service.api_lists.assetsIndex,data:i}).then(function(e){1==e.data.code&&(n.coinArry=e.data.data.asset,n.asset=e.data.data.asset[0].asset,n.withdraw.currency_id=e.data.data.asset[0].asset.currency_id),t.hideLoading()}).catch(function(n){t.hideLoading(),t.showToast({title:n,duration:2e3})})}}};n.default=a}).call(this,e("6e42")["default"])},"72c5":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return a})},"87f0":function(t,n,e){"use strict";var o=e("4706"),a=e.n(o);a.a},8990:function(t,n,e){"use strict";e.r(n);var o=e("72c5"),a=e("c8fb");for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);e("87f0");var c=e("2877"),s=Object(c["a"])(a["default"],o["a"],o["b"],!1,null,"c7b3b308",null);n["default"]=s.exports},c8fb:function(t,n,e){"use strict";e.r(n);var o=e("6bd4"),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);n["default"]=a.a}},[["5602","common/runtime","common/vendor"]]]);