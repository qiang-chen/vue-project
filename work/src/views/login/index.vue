<template>
  <div class="list">
    <div class="select">
      <el-select v-model="value" placeholder="请选择" @change="handleChangeLanguage(value)">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <!-- 第一个login是模块名 第二个login是变量名 -->
    <h1>{{$t("login.login")}}</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('login.usernamePlaceholder')">
        <el-input v-model="ruleForm.user" aria-placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item :label="$t('login.passwordPlaceholder')" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{$t("login.submit")}}</el-button>
        <el-button @click="resetForm('ruleForm')">{{$t("login.reset")}}</el-button>
      </el-form-item>
    </el-form>
    <div class="skip">
      <el-button @click="$router.history.push('/registry')">{{$t("login.register")}}</el-button>
    </div>
  </div>
</template>
<script>
import { Login } from "@/api/index";

//引入加密函数封装

import { jsEncrypt } from "@/utils/jsencrypt.js";

//引入第三方包cookie处理器

//import Cookies from "js-cookie"

import { setCookeies } from "@/utils/cookie";

//引入辅助函数
import { mapState, mapMutations } from "vuex";
//console.log(setCookeies)
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("login.passwordPlaceholder")));
      } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,})$/.test(value)) {
        callback(new Error("密码格式不对"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        user: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ trigger: "blur" }]
      },
      options: [
        {
          value: "zh-CN",
          label: "中文"
        },
        {
          value: "en-US",
          label: "英文"
        },
        {
          value: "zh-TW",
          label: "繁体字"
        }
      ],
      //如果本地有就取本地的值  没有模式显示中文语言
      value: localStorage.getItem("language_type") || "zh-CN"
    };
  },
  created() {
    //console.log(this.token,"---");
  },
  computed: {
    ...mapState({
      token: state => state.login.token
    })
  },
  methods: {
    ...mapMutations({
      saveToken: "login/SAVE_TOKEN"
    }),
    handleChangeLanguage(value) {
      //下拉框的语言切换
      console.log(value);
      localStorage.setItem("language_type", value);
      window.location.reload();
    },
    successOpen() {
      return new Promise((resolve, reject) => {
        this.$message({
          message: "恭喜你，这是一条成功消息",
          type: "success",
          duration: 1000,
          onClose: () => {
            resolve();
          }
        });
      });
    },
    async submitForm(formName) {
      let opj = {};
      opj.user = this.ruleForm.user;
      opj.pwd = jsEncrypt(this.ruleForm.pass);
      //console.log(opj)
      //成功的时候执行
      let data = await Login(opj);
      data = data.data;
      console.log(data, "登录返回结果");

      if (data.code) {
        //将接受到的token存到cookie中去 用来判断用户是否一登录
        //Cookies.set('token', data.token, { expires: 1/24 });
        //调用封装好的方法
        //console.log(setCookeies)
        //显示一个弹框
        await this.successOpen();
        setCookeies(data.token);
        //将token存到仓库中去
        this.saveToken({ token: data.token });
        //console.log(this.$router.history)
        this.$router.history.push("/main/home");
      } else {
        this.$message.error(data.msg);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  height: 100%;
  padding: 0.2rem 0.1rem;
  padding-right: 0.4rem;
  box-sizing: border-box;
  .select {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    text-align: right;
  }
  
  h1 {
    width: 100%;
    height: 1.5rem;
    text-align: center;
    line-height: 1.5rem;
  }
  .skip {
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    margin-top: 0.2rem;
  }
}
</style>

