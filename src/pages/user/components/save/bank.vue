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
            <div v-if="hasAuth" class="box-contain clearfix">
              <div class="text-center" style="margin-bottom:20px;">
                <i style="color:red;font-size: 1.5rem;" class="iconfont icon-tongguo1"></i>
              </div>
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>银行卡信息</span>
                </div>
                <div class="text item">
                  <el-row>
                    <el-col>
                      <span class="name">银行名称：</span>
                      <span class="info">{{$store.state.bankInfo.bankName}}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <span class="name">支行地址：</span>
                      <span class="info">{{$store.state.bankInfo.bankAddress}}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <span class="name">银行卡号：</span>
                      <span class="info">{{$store.state.bankInfo.bankNo}}</span>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
              <div v-if="false" class="auth-box authed-box">
                <el-row>
                  <el-col>
                    银行名称：{{$store.state.bankInfo.bankName}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    支行地址：{{$store.state.bankInfo.bankAddress}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    银行卡号：{{$store.state.bankInfo.bankNo}}
                  </el-col>
                </el-row>
              </div>

            </div>
            <div v-if="!hasAuth" class="box-contain clearfix">
              <div class="text-center prompt-box">
                <i style="color:red;font-size: 1.5rem;" class="iconfont icon-icon-test"></i>
                <!-- <p>* 请填写真实有效的验证信息，虚假认证可能会导致账户被冻结，由虚假认证产生的一切后果由用户负责！</p> -->
                <p>真实姓名必须和出金银行卡户名一致</p>
              </div>

              <div class="auth-box">
                <el-form :hide-required-asterisk='true' :model="form" label-width="100px" ref="ruleForm" :rules="rule"
                         class="demo-form-inline">
                  <el-form-item label="银行名称" prop="bankName">
                    <el-input type='text' v-model="form.bankName" placeholder="请输入银行名称">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="支行地址" prop="bankAddress">
                    <el-input type='text' v-model="form.bankAddress" placeholder="请输入支行地址">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="银行卡号" prop="bankNo">
                    <el-input type='text' v-model="form.bankNo" placeholder="请输入银行卡号">
                    </el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" :loading="isloading" @click="submit('ruleForm')">认证</el-button>
                </div>
              </div>

            </div>
            <div class="rule-box">
              <div class="title">提示：</div>
              <ul>
                <li>1、新用户注册后必须通过添加银行卡。</li>
                <li>2、用户只能添加一张本人银行卡。</li>
                <li>3、真实姓名必须和出金银行卡户名一致。</li>
              </ul>
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
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入银行卡号'))
        } else {
          let myreg = /^([1-9]{1})(\d{14,18})$/ // 卡号校验
          if (!myreg.test(value)) {
            callback(new Error('请输入正确的银行卡号'))
          }
          callback()
        }
      }
      return {
        hasAuth: false,
        isloading: false,
        form: {
          bankName: '',
          bankAddress: '',
          bankNo: ''
        },
        rule: {
          bankName: [
            { required: true, message: '请输入银行名称', trigger: 'blur' }
          ],
          bankNo: [
            { required: true, validator: validatePass, message: '请输入银行卡号', trigger: 'blur' }
          ],
          bankAddress: [
            { required: true, message: '请输入支行地址', trigger: 'blur' }
          ]
        }
      }
    },
    watch: {},
    computed: {},
    created () {
      if (this.$store.state.bankInfo.bankNo) {
        this.form.bankName = this.$store.state.bankInfo.bankName
        this.form.bankNo = this.$store.state.bankInfo.bankNo
        this.form.bankAddress = this.$store.state.bankInfo.bankAddress
        this.hasAuth = true
      } else {
        this.getCardDetail()
      }
    },
    mounted () {
      this.$store.state.userMenu = '2-10'
    },
    methods: {
      async getCardDetail () {
        // 获取银行卡信息
        let data = await api.getBankCard()
        if (data.status === 0) {
          this.$store.state.bankInfo = data.data
          this.form.bankName = this.$store.state.bankInfo.bankName
          this.form.bankNo = this.$store.state.bankInfo.bankNo
          this.form.bankAddress = this.$store.state.bankInfo.bankAddress
          this.hasAuth = true
        } else {
          // this.$message.error(data.msg)
        }
      },
      submit (formName) {
        // 提交
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let opts = {
              bankName: this.form.bankName,
              bankNo: this.form.bankNo,
              bankAddress: this.form.bankAddress
            }
            this.isloading = true
            if (this.$route.query.type === 'edit') {
              let data = await api.updateBankCard(opts)
              if (data.status === 0) {
                this.$message.success('修改成功!')
                this.isloading = false
                this.getCardDetail()
              } else {
                this.$message.error(data.msg)
              }
            } else {
              let data = await api.addBankCard(opts)
              if (data.status === 0) {
                this.$message.success('添加成功!')
                this.hasAuth = true
                this.getCardDetail()
                this.isloading = false
              } else {
                this.$message.error(data.msg)
              }
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

  .box-card {
    position: relative;

    .el-row {
      line-height: 30px;
    }

    .auth-box {
      position: absolute;
      top: 0px;
      right: 20%;
    }

    .name {
      width: 96px;
      text-align: right;
      display: inline-block;
      color: #6e6e6e;
    }

    .info {
      font-size: 16px;
    }
  }

  .wrapper {
    padding: 40px 100px;

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
