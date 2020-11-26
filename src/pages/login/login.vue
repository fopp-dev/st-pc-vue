<template>
  <div class="wrapper">
    <div class="header">
      <!-- <a href="/homes" class="nav-left pull-left">
          <img :src="siteInfo.siteLogo" alt="">
      </a> -->
      <home-header></home-header>
    </div>
    <div class="loginbg-box">
      <!-- <img class="login-img" src="../../assets/image/login.jpeg" alt=""> -->
    </div>
    <div class="login-box">
      <div class="form-box top-box">
        <p class="animated fadeInDown">专线直连 机构版交易</p>
        <p class="prompt animated fadeInUp">为投资者量身定做机构版投资软件</p>
      </div>
      <div class="form-box">
        <h2>登录</h2>
        <el-form :hide-required-asterisk='true' :model="form" ref="ruleForm" :rules="rule" class="demo-form-inline">
          <el-form-item label="" prop="phone">
            <el-input maxlength="11" max="11" type='text' v-model="form.phone" placeholder="请输入手机号码">
              <i slot="prepend" class="iconfont icon-shouji1"></i>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="pwd">
            <el-input type='password' v-model="form.pwd" placeholder="请输入密码">
              <i slot="prepend" class="iconfont icon-lr_password"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="text-right clearfix">
          <div class="pull-left"><a @click="toForget">忘记密码？</a></div>
          <div class="pull-right">还没有账号？<a @click="toRegister">立即注册</a></div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button class="box-btn" type="primary" :loading="islogin" @click="checkPhone('ruleForm')">登 录</el-button>
        </div>
      </div>
    </div>
    <div>

    </div>
    <home-footer :siteInfo="siteInfo"></home-footer>
  </div>
</template>

<script>
  import * as api from '../../axios/api'
  import HomeFooter from '../../components/Footer'
  import HomeHeader from '../../components/HeaderOrder'

  export default {
    components: {
      HomeFooter,
      HomeHeader
    },
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
      // let validatePass2 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入密码'))
      //   } else {
      //     let value = psd.replace(/\s*/g, '')
      //     let myreg = '/^[a-zA-Z0-9!@#$%^&*.]{6,12}$/' // 手机号码验证
      //     if (!myreg.test(value)) {
      //       callback(new Error('请输入正确的手机号码'))
      //     }
      //     callback()
      //   }
      // }
      return {
        islogin: false,
        siteInfo: {},
        form: {
          phone: '',
          pwd: ''
        },
        rule: {
          phone: [
            { required: true, validator: validatePass, message: '请输入手机号码', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {},
    computed: {},
    created () {},
    mounted () {
      this.getInfoSite()
    },
    methods: {
      async getInfoSite () {
        // 获取网站信息
        let result = await api.getInfoSite()
        if (result.status === 0) {
          this.siteInfo = result.data
          this.$store.state.siteInfo = this.siteInfo
        } else {
          this.$message.error(result.msg)
        }
      },
      async checkPhone (val) {
        // 先验证是否已经注册
        let data = await api.checkPhone({ phoneNum: this.form.phone })
        if (data.status === 0) {
          // 如果用户已存在返回 0
          this.submit(val)
        } else {
          this.$message.success('用户还未注册,请先注册')
          this.$router.push('/register')
        }
      },
      submit (formName) {
        // 提交
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let opts = {
              phone: this.form.phone,
              userPwd: this.form.pwd
            }
            this.islogin = true
            let data = await api.login(opts)
            if (data.status === 0) {
              this.$store.state.userInfo.phone = this.phone
              // window.localStorage.setItem('phone',this.form.phone)
              // setLocalstorage('phone',this.form.phone)
              this.$store.state.haslogin = true
              this.$message.success(data.msg)
              // this.$router.push('/home')
              this.toTransform()
            } else {
              this.$message.error(data.msg)
            }
            this.islogin = false
          } else {
            return false
          }
        })
      },
      async toTransform () {
        let opt = {
          pageNum: 1,
          pageSize: 1
        }
        this.loading = true
        let data = await api.getStock(opt)
        if (data.status === 0) {
          this.$router.push({
            path: '/transaction',
            query: {
              code: data.data.list[0].code
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      },
      toRegister () {
        // 去注册
        this.$store.state.loginIsShow = false
          this.$router.push('/register')
      },
      toForget () {
        this.$router.push('/forget')
      }
    }
  }
</script>
<style lang="less" scoped>
  .header {
    height: 60px;
    // background: #fff;
    img {
      height: 58px;
      line-height: 58px;
    }
  }

  .el-form-item {
    margin-bottom: 40px;
  }

  .login-box {
    width: 80%;
    margin: 0 auto;
    height: 540px;
    position: relative;

    .form-box {
      width: 320px;
      height: 480px;
      text-align: center;
      position: absolute;
      right: 0;
      top: 32px;
      // background: #fff;
      color: #fff;
      background: rgba(3, 3, 3, 0.6);
      z-index: 2;
      padding: 0 40px;
      border-radius: 4px;

      h2 {
        height: 30px;
        line-height: 30px;
        text-align: left;
        font-size: 26px;
        padding-top: 30px;
      }

      .el-form {
        padding-top: 50px;

      }
    }

    .dialog-footer {
      margin-top: 20px;
    }

    .text-right {
      margin: 50px 0 25px;
    }

    /deep/ .el-input__inner {
      height: 40px;
      line-height: 40px;
      text-indent: 30px;
    }

    .login-box .iconfont {
      font-size: 28px;
    }

    /deep/ .el-form-item__error {
      padding-top: 12px;
    }
  }

  .header {
    padding: 0 20px;
  }

  .login-box .top-box {
    position: absolute;
    top: 34%;
    width: 50%;
    height: 150px;
    left: 0;
    right: auto;
    background: none;

    .prompt {
      color: #b6b6b6;
      font-size: 18px;
    }

    p {
      color: #efbb53;
      font-size: 34px;
      margin-bottom: 40px;
    }
  }
</style>
