<template>
  <div class="login-dialog">
    <el-dialog
      title="用户登录"
      :center='true'
      :visible.sync="$store.state.loginIsShow"
      width="40%">
      <div class="login-box dialog-box">
        <!-- <h2 class="logo-img">
             <img :src="$store.state.siteInfo.siteLogoSm" alt="">
        </h2> -->
        <el-form :hide-required-asterisk='true' :model="form" ref="ruleForm" :rules="rule" class="demo-form-inline">
          <el-form-item label="" prop="email">
            <el-input type='text' v-model="form.email" placeholder="请输入邮箱">
              <i slot="prepend" class="iconfont icon-shouji"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="userPwd">
            <el-input type='' v-model="form.userPwd" placeholder="请输入密码">
              <i slot="prepend" class="iconfont icon-mima"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <div>
          还没有账号？<a @click="toRegister">立即注册</a>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" :loading="islogin" @click="submit('ruleForm')">登 录</el-button>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  import * as api from '../axios/api'
  import { setLocalstorage } from '../utils/localstorage'

  export default {
    components: {},
    props: {},
    data () {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else {
          // let myreg = /^[1][3,4,5,7,8][0-9]{9}$/  //手机号码验证
          let myreg = /^[0-9]{11}$/ // 手机号码验证
          if (!myreg.test(value)) {
            callback(new Error('请输入正确的手机号码'))
          }
          callback()
        }
      }
      let validatePassEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        let myreg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; // 邮箱验证
        if (!myreg.test(value)) {
          callback(new Error("请输入正确的邮箱"));
        }
        callback();
      }
    }
      // let validatePass2 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入密码'))
      //   } else {
      //     let value = psd.replace('/s*/g', '')
      //     let myreg = '/^[a-zA-Z0-9!@#$%^&*.]{6,12}$/' // 手机号码验证
      //     if (!myreg.test(value)) {
      //       callback(new Error('请输入正确的手机号码'))
      //     }
      //     callback()
      //   }
      // }
      return {
        dialogVisible: false,
        islogin: false,
        form: {
          email: '',
          userPwd: ''
        },
        rule: {
          email: [
            { required: true, validator: validatePassEmail, message: '请输入邮箱', trigger: 'blur' }
          ],
          userPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {},
    computed: {},
    created () {},
    mounted () {},
    methods: {
      submit (formName) {
        // 提交
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let opts = {
              email: this.form.email,
              userPwd: this.form.userPwd
            }
            this.islogin = true
            let data = await api.loginEmail(opts)
            if (data.status === 0) {
              this.$store.state.userInfo.phone = this.phone
              // window.localStorage.setItem('phone',this.form.phone)
              setLocalstorage('phone', this.form.phone)
              this.$store.state.loginIsShow = false
              this.$store.state.haslogin = true
              this.$message.success(data.msg)
            } else {
              this.$message.error(data.msg)
            }
            this.islogin = false
          } else {
            return false
          }
        })
      },
      toRegister () {
        // 去注册
        this.$store.state.loginIsShow = false
        this.$router.push('/registerEmail')
      }
    }
  }
</script>
<style lang="less" scoped>
  .login-box {
    padding: 0px 40px;
  }

  .logo-img {
    text-align: center;
    margin-bottom: 20px;

    img {
      width: 100px;
      height: 100px;
    }
  }

  .dialog-footer {
    display: block;
    padding-bottom: 20px;

    .el-button {
      width: 100%;
      margin-top: 30px;
    }
  }

  .login-dialog /deep/ .el-dialog {
    .login-box {
      height: 240px;
    }
  }
</style>
