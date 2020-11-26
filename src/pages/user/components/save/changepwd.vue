<template>
  <el-container class="user-center">
    <el-header class="user-header">
      <home-header></home-header>
    </el-header>
    <el-container class="main-wrapper">
      <el-aside width="200px">
        <menu-box></menu-box>
      </el-aside>
      <el-main>
        <div class="wrapper">
          <div class="box page-part transaction">
            <div class="box-contain clearfix">
              <div class="user-center-title">
                修改密码
              </div>
              <div class="text-center prompt-box">
                <i style="font-size: 1.5rem;margin-left: 100px;" class="maincolor-font iconfont icon-xiugaimima-"></i>
              </div>
              <div class="auth-box">
                <el-form :hide-required-asterisk='true' :model="form" label-width="100px" ref="ruleForm" :rules="rule"
                         class="demo-form-inline">
                  <el-form-item label="旧密码" prop="oldPwd">
                    <el-input type='password' v-model="form.oldPwd" placeholder="请输入旧密码">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="新密码" prop="newPsd">
                    <el-input type='password' v-model="form.newPsd" placeholder="请输入新密码">
                    </el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" :loading="isloading" @click="submit('ruleForm')">修改</el-button>
                </div>
              </div>

            </div>
          </div>

        </div>
        <!-- <home-footer :siteInfo="siteInfo"></home-footer> -->
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  import HomeHeader from '../../../../components/HeaderOrder'
  import HomeFooter from '../../../../components/Footer'
  import MenuBox from '../menu'
  import * as api from '../../../../axios/api'

  export default {
    components: {
      HomeHeader,
      HomeFooter,
      MenuBox
    },
    props: {},
    data () {
      // let validatePass = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请输入银行卡号'))
      //   } else {
      //     let myreg = /^([1-9]{1})(\d{14,18})$/ // 卡号校验
      //     if (!myreg.test(value)) {
      //       callback(new Error('请输入正确的银行卡号'))
      //     }
      //     callback()
      //   }
      // }
      return {
        hasAuth: false,
        isloading: false,
        form: {
          oldPwd: '',
          newPsd: ''
        },
        rule: {
          newPsd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码最少为6位数', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {},
    computed: {},
    created () {
    },
    mounted () {
      this.$store.state.userMenu = '2-11'
    },
    methods: {
      submit (formName) {
        // 提交
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            // 修改密码
            let opts = {
              oldPwd: this.form.oldPwd,
              newPwd: this.form.newPsd
            }
            let data = await api.changePassword(opts)
            if (data.status === 0) {
              this.$message.success(data.msg)
            } else {
              this.$message.error(data.msg)
            }
          } else {
            return false
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .code {
    font-size: 12px;
    color: #999;
  }

  .auth-box {
    margin-top: 20px;

    .el-row {
      margin-bottom: 10px;
    }
  }

  .authed-box {
    .el-row {
      padding-top: 40px;
      width: 400px;
      margin: 0 auto;
    }
  }

  .wrapper {
    padding: 40px 100px 80px 0;
    margin-top: 150px;

    .demo-form-inline {
      width: 400px;
      margin: 20px auto;
    }

    .auth-box {
      .dialog-footer {
        width: 400px;
        margin: 0 auto;

        .el-button {
          margin-left: 100px;
          width: 300px;
        }
      }
    }

    .prompt-box {
      padding-bottom: 20px;
      color: #f44336;

      p {
        line-height: 24px;
      }
    }

    .rule-box {
      margin-top: 30px;
      line-height: 26px;
      margin-left: 120px;
    }
  }
</style>
