import Vue from "vue";

import Vuex from "vuex";

Vue.use(Vuex)

import Logger from "vuex/dist/logger"


import login from "./modules/login"

const store=new Vuex.Store({
    strict:false,//这是什么东东
    modules: {
        login
    },
    plugins:[Logger()]
});

//将仓库挂载到全局 用来在其他不属于vue的模块访问

window.$store=store;

export default store;