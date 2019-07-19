//登录模块数据管理

import {SAVE_TOKEN} from "../type/login"

import {getCookeies} from "@/utils/cookie.js"

const state={
    token:getCookeies()||""
}

//将mutations里面得方法用别名提取处理

const mutations= {
    SAVE_TOKEN(state,payload){
        state.token=payload.token
    }
}

export default {
    namespaced: true,
    state,
    mutations
}