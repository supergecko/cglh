(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-message-anno-detail"],{"24f1":function(n,t,a){"use strict";a.r(t);var e=a("8f4e"),o=a("832a");for(var i in o)"default"!==i&&function(n){a.d(t,n,function(){return o[n]})}(i);a("7c68");var c=a("2877"),s=Object(c["a"])(o["default"],e["a"],e["b"],!1,null,"6504abac",null);t["default"]=s.exports},"484d":function(n,t,a){t=n.exports=a("2350")(!1),t.push([n.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-6504abac]{background-color:#fff}.content[data-v-6504abac]{height:%?1280?%;background-color:#fff}.content .annous[data-v-6504abac]{padding:0 %?29?% %?30?%;border-bottom:%?1?% solid #e6e8ed}.content .annous .title[data-v-6504abac]{font-size:%?38?%;color:#171719;font-weight:bolder}.content .annous .detail[data-v-6504abac]{font-size:%?25?%;color:#888}.content .notice[data-v-6504abac]{padding:%?40?% %?30?%}.content .notice .n-con[data-v-6504abac]{font-size:%?32?%;color:#171719}.content .notice .n-con .n-info[data-v-6504abac]{line-height:%?100?%}.content .notice .n-con .n-info1[data-v-6504abac]{line-height:%?55?%}.content .notice .n-con .n-named[data-v-6504abac]{font-size:%?34?%}.content .notice .n-con .n-time[data-v-6504abac]{margin-top:%?88?%;display:block;float:right}body.?%PAGE?%[data-v-6504abac]{background-color:#fff}',""])},"6c5a":function(n,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{newInfo:{}}},onLoad:function(n){this._Articles_detail(n.newId)},methods:{toPath:function(n){uni.navigateTo({url:n})},_Articles_detail:function(n){var t=this;uni.getNetworkType({success:function(n){"none"==n.networkType&&uni.showToast({icon:"none",title:"当前网络不可用"})}}),uni.showLoading({title:"加载中"});var a=uni.getStorageSync("user_mobile"),e=n,o=Date.parse(new Date)/1e3,i=this.$md5("".concat(a,"**").concat(e,"**").concat(o,"**cglhhaofengshui")),c={id:e,timestamp:o,sign:i};this.$ajax.post({url:this.$service.api_lists.Articles_detail,data:c}).then(function(n){1==n.data.code&&(t.newInfo=n.data.data),uni.hideLoading()}).catch(function(n){uni.hideLoading(),uni.showToast({title:n,duration:2e3})})}}};t.default=e},"7c68":function(n,t,a){"use strict";var e=a("c5f0"),o=a.n(e);o.a},"832a":function(n,t,a){"use strict";a.r(t);var e=a("6c5a"),o=a.n(e);for(var i in e)"default"!==i&&function(n){a.d(t,n,function(){return e[n]})}(i);t["default"]=o.a},"8f4e":function(n,t,a){"use strict";var e=function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("v-uni-view",{staticClass:"content"},[a("v-uni-view",{staticClass:"annous"},[a("v-uni-text",{staticClass:"title"},[n._v(n._s(n.newInfo.post_title))]),a("br"),a("v-uni-text",{staticClass:"detail"},[n._v(n._s(n.newInfo.published_time)+" 来源领鹿谷资讯")])],1),a("section",{staticClass:"c-content",domProps:{innerHTML:n._s(n.newInfo.post_content)}})],1)},o=[];a.d(t,"a",function(){return e}),a.d(t,"b",function(){return o})},c5f0:function(n,t,a){var e=a("484d");"string"===typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);var o=a("4f06").default;o("7e457c3a",e,!0,{sourceMap:!1,shadowMode:!1})}}]);