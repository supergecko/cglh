(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-message-acti-detail"],{"362c":function(n,t,e){"use strict";var a=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("v-uni-view",{staticClass:"content"},[e("v-uni-view",{staticClass:"annous"},[e("v-uni-text",{staticClass:"title"},[n._v(n._s(n.newInfo.post_title))]),e("br"),e("v-uni-text",{staticClass:"detail"},[n._v(n._s(n.newInfo.published_time))])],1),e("section",{staticClass:"c-content",domProps:{innerHTML:n._s(n.newInfo.post_content)}})],1)},o=[];e.d(t,"a",function(){return a}),e.d(t,"b",function(){return o})},"87ac":function(n,t,e){"use strict";e.r(t);var a=e("362c"),o=e("e8b3");for(var i in o)"default"!==i&&function(n){e.d(t,n,function(){return o[n]})}(i);e("9833");var c=e("2877"),s=Object(c["a"])(o["default"],a["a"],a["b"],!1,null,"20edbf64",null);t["default"]=s.exports},9833:function(n,t,e){"use strict";var a=e("f0ba"),o=e.n(a);o.a},"9df9":function(n,t,e){t=n.exports=e("2350")(!1),t.push([n.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-20edbf64]{background-color:#fff!important}.c-content[data-v-20edbf64]{padding-left:%?32?%;padding-right:%?32?%}.content[data-v-20edbf64]{background-color:#fff;padding:0 0 %?70?% 0}.content .annous[data-v-20edbf64]{padding:%?40?% %?29?% 0;border-top:%?1?% solid #e6e8ed}.content .annous .title[data-v-20edbf64]{font-size:%?38?%;color:#171719}.content .annous .detail[data-v-20edbf64]{font-size:%?25?%;color:#888}.content .notice[data-v-20edbf64]{padding:0 %?30?%;color:#151414;font-size:%?32?%}.content .notice .n-con .n-named[data-v-20edbf64]{line-height:%?100?%}.content .notice .n-con .n-img[data-v-20edbf64]{width:%?690?%;height:%?351?%;margin:%?43?% 0 %?60?%;background-color:#eee}body.?%PAGE?%[data-v-20edbf64]{background-color:#fff!important}',""])},e8b3:function(n,t,e){"use strict";e.r(t);var a=e("e9bb"),o=e.n(a);for(var i in a)"default"!==i&&function(n){e.d(t,n,function(){return a[n]})}(i);t["default"]=o.a},e9bb:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{newInfo:{}}},onLoad:function(n){this._Articles_detail(n.newId)},methods:{toPath:function(n){uni.navigateTo({url:n})},_Articles_detail:function(n){var t=this;uni.getNetworkType({success:function(n){"none"==n.networkType&&uni.showToast({icon:"none",title:"当前网络不可用"})}}),uni.showLoading({title:"加载中"});var e=uni.getStorageSync("user_mobile"),a=n,o=Date.parse(new Date)/1e3,i=this.$md5("".concat(e,"**").concat(a,"**").concat(o,"**cglhhaofengshui")),c={id:a,timestamp:o,sign:i};this.$ajax.post({url:this.$service.api_lists.Articles_detail,data:c}).then(function(n){1==n.data.code&&(t.newInfo=n.data.data),uni.hideLoading()}).catch(function(n){uni.hideLoading(),uni.showToast({title:n,duration:2e3})})}}};t.default=a},f0ba:function(n,t,e){var a=e("9df9");"string"===typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);var o=e("4f06").default;o("525be1ef",a,!0,{sourceMap:!1,shadowMode:!1})}}]);