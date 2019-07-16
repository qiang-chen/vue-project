// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import store from "./store/index"

//引入语言切换
import VueI18n from 'vue-i18n'

//简体中午语言
import zhCN from '@/i18n/zh-CN.js'
//英语
import enUS from '@/i18n/en-US.js'
//繁体字
import zhTW from '@/i18n/zh-TW.js'

//将vue-i18n挂载到全局
Vue.use(VueI18n)

Vue.use(ElementUI);

//配置语言项
const messages = {
  'en-US': {...enUS},
  'zh-CN': {...zhCN},
  'zh-TW': {...zhTW}
}

//设置语言项  如果本地有从本地提取  本地没有显示默认简体中午
//存到本地的原因是防止页面刷新导致语言不能显示
let currentLocale = localStorage.getItem('language_type') || 'zh-CN';

const i18n = new VueI18n({
  locale: currentLocale, // 设置地区
  messages, // 设置地区信息
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
