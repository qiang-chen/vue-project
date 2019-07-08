import Vue from 'vue'
import Router from 'vue-router'

// import Main from "@/views/main/"
// import Login from "@/views/login/"

Vue.use(Router)



export default new Router({
  routes: [
    {
      path:'/main',
      name:"Main",
      component:()=>import("@/views/main/")
      //component:Main
    }
    ,{
      path:"/login",
      name:"Login",
      component:()=>import("@/views/login/")
      //component:Login
    }
  ]
})
