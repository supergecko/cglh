(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-address-address"],{"337c":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"addressWarp"},[t._l(t.addressList,function(e,n){return i("v-uni-view",{key:n,staticClass:"ItemWarp"},[i("v-uni-scroll-view",{staticClass:"scroll-view_H",attrs:{"scroll-x":"true","scroll-with-animation":"true","scroll-left":"0"},on:{scroll:function(e){arguments[0]=e=t.$handleEvent(e),t.scroll.apply(void 0,arguments)}}},[i("v-uni-view",{staticClass:"addressItem"},[i("v-uni-view",{staticClass:"itemHeader"},[i("v-uni-view",{staticStyle:{"margin-left":"30upx"}},[t._v(t._s(e.currency_title))]),i("v-uni-view",{staticStyle:{"font-size":"26upx","font-weight":"400",color:"rgba(102,102,102,1)","margin-right":"31upx"}},[t._v(t._s(e.create_time))])],1),i("v-uni-view",{staticClass:"addressItemText2"},[t._v(t._s(e.description))]),i("v-uni-view",{staticClass:"addressItemText3"},[t._v(t._s(e.address))])],1),i("v-uni-view",{staticClass:"itemBtnWarp"},[i("v-uni-view",{staticClass:"blueBtn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.toPage("../address/editAddress?bank_id="+e.bank_id)}}},[t._v("编辑")]),i("v-uni-view",{staticClass:"pinkBtn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.deleAddress(e.bank_id)}}},[t._v("删除")])],1)],1)],1)}),i("v-uni-view",{staticStyle:{width:"750upx",height:"184upx"}}),i("v-uni-view",{staticClass:"addressBTn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toPage("../address/addAddress")}}},[t._v("添加提币地址")])],2)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})},4591:function(t,e,i){var n=i("4fed");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("0d3ee102",n,!0,{sourceMap:!1,shadowMode:!1})},"4fed":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".itemBtnWarp[data-v-dd55194a]{display:-webkit-box;display:-webkit-flex;display:flex;position:absolute;top:%?62?%;right:%?-272?%;padding-right:%?30?%;padding-left:%?30?%}.blueBtn[data-v-dd55194a]{width:%?112?%;height:%?112?%;background:#5bb2f6;border-radius:50%;font-size:%?28?%;font-family:PingFang SC;font-weight:400;color:#fff;line-height:%?112?%;text-align:center;margin-right:%?15?%}.pinkBtn[data-v-dd55194a]{width:%?112?%;height:%?112?%;background:#fe9cac;border-radius:50%;font-size:%?28?%;font-family:PingFang SC;font-weight:400;color:#fff;line-height:%?112?%;text-align:center}.ItemWarp[data-v-dd55194a]{width:100%;position:relative;margin-top:%?20?%}.addressBTn[data-v-dd55194a]{width:%?646?%;height:%?96?%;background:#42a2ec;opacity:.94;border-radius:10px;font-size:%?32?%;font-family:PingFang SC;font-weight:400;color:#fff;text-align:center;line-height:%?96?%;position:fixed;bottom:%?44?%}.addressWarp[data-v-dd55194a]{background:#f5f5f5;width:%?750?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;box-sizing:border-box}.addressItem[data-v-dd55194a]{width:%?714?%;height:%?234?%;background:#fff;border-radius:%?14?%;margin:0 auto;\r\n\t/* margin-top: 30upx; */font-size:%?34?%;font-family:PingFang SC;font-weight:700;color:#171719}.itemHeader[data-v-dd55194a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding-top:%?38?%}.addressItemText2[data-v-dd55194a]{font-size:%?26?%;font-family:PingFang SC;font-weight:400;color:#777;margin-left:%?30?%;margin-top:%?36?%}.addressItemText3[data-v-dd55194a]{font-size:%?32?%;font-family:PingFang SC;font-weight:500;color:#171719;margin-left:%?30?%;margin-top:%?10?%;width:%?654?%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",""])},5508:function(t,e,i){"use strict";var n=i("4591"),a=i.n(n);a.a},7934:function(t,e,i){"use strict";i.r(e);var n=i("337c"),a=i("c2d6");for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);i("5508");var o=i("2877"),d=Object(o["a"])(a["default"],n["a"],n["b"],!1,null,"dd55194a",null);e["default"]=d.exports},c2d6:function(t,e,i){"use strict";i.r(e);var n=i("f736"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,function(){return n[t]})}(s);e["default"]=a.a},f736:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{addressList:[],scrollTop:0,old:{scrollTop:0},leftOffset:120}},onShow:function(){this._addressList(),this.leftOffset=0},onLoad:function(){this._addressList()},methods:{deleAddress:function(t){var e=this;uni.showModal({title:"提示",content:"是否确定删除该提币地址?",success:function(i){if(i.confirm){uni.getNetworkType({success:function(t){"none"==t.networkType&&uni.showToast({icon:"none",title:"当前网络不可用"})}}),uni.showLoading({title:"删除中"});var n=uni.getStorageSync("user_mobile"),a=t,s=Date.parse(new Date)/1e3,o=e.$md5("".concat(n,"**").concat(a,"**").concat(s,"**cglhhaofengshui")),d={bank_id:a,timestamp:s,sign:o};e.$ajax.post({url:e.$service.api_lists.deleteAddress,data:d}).then(function(t){1==t.data.code&&uni.showToast({title:"删除成功",duration:2e3}),e._addressList(),uni.hideLoading()}).catch(function(t){uni.hideLoading(),uni.showToast({title:t,duration:2e3})})}else if(i.cancel)return}})},toPage:function(t){uni.navigateTo({url:t})},_addressList:function(){var t=this;uni.getNetworkType({success:function(t){"none"==t.networkType&&uni.showToast({icon:"none",title:"当前网络不可用"})}}),uni.showLoading({title:"加载中"});var e=uni.getStorageSync("user_mobile"),i=Date.parse(new Date)/1e3,n=this.$md5("".concat(e,"**").concat(i,"**cglhhaofengshui")),a={timestamp:i,sign:n};this.$ajax.post({url:this.$service.api_lists.addressList,data:a}).then(function(e){1==e.data.code&&(t.addressList=e.data.data),uni.hideLoading(),console.log(e)}).catch(function(t){uni.hideLoading(),uni.showToast({title:t,duration:2e3})})},scroll:function(t){this.old.scrollTop=t.detail.scrollTop}}};e.default=n}}]);