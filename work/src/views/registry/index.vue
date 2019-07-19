<template>
  <div class="list">
    <h1>请您注册</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名">
        <el-input v-model="ruleForm.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
      >
        <el-input v-model="dynamicValidateForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Registry } from "@/api/index";

//引入加密函数封装

import { jsEncrypt } from "@/utils/jsencrypt.js";

//console.log(jsEncrypt)

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,})$/.test(value)) {
        callback(new Error("密码格式是由数字和字母组成的"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
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
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  created() {
    //console.log(this.token,"---");
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid && this.ruleForm.user) {
          //当这里用户名不为空或者两次密码输入要相等的时候向后端发送注册接口

          //先将用户输入的密码进行加密

          let password = jsEncrypt(this.ruleForm.pass);
          let username = this.ruleForm.user;
          //console.log(password,username)
          //将用户的密码和账号发给服务端
          let data = await Registry({ password, username });
          //console.log("注册返回结果",data)
          if (data.data.code) {
            //注册成功后跳转到登录页面
            this.$router.history.push("/login");
          }
        } else {
          alert("用户或者密码不能为空");
          return false;
        }
      });
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
  h1 {
    width: 100%;
    text-align: center;
    height: 1.5rem;
    line-height: 1.5rem;
  }
}
</style>

