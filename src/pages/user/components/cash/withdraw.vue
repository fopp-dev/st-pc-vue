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
                用户提现
              </div>
              <div class="text-center">
                <i style="color:green;font-size: 1.5rem;" class="iconfont icon-tixian1"></i>
              </div>
              <div class="auth-box">
                <el-form label-width="100px" v-model="form" ref="ruleForm" :rules="rule" class="demo-form-inline">
                  <el-form-item label="提现金额" prop="number">
                    <el-input type='text' v-model="form.number" placeholder="请输入提现金额">
                    </el-input>
                  </el-form-item>
                </el-form>
                <p class="enable">当前账户可用余额 <span>{{$store.state.userInfo.userCapital}}</span> <a @click="selectAll"
                                                                                               href="javascript:;">全部提现</a>
                </p>
                <div slot="footer" class="dialog-footer">
                  <el-button type="success" :loading="isloading" @click="Onsubmit('ruleForm')">提现</el-button>
                </div>
              </div>
            </div>
            <div class="rule-box">
              <div class="attention" style="margin-bottom:10px;">
                <p>注意: 提现默认提取可用本金,如需提取A股账户中与港股账户中的金额请先转入可用本金再提取 。</p>
              </div>
              <div class="title">提示：</div>
              <div class="attention">
                <p>1、当前有持仓订单不能划转资金到可用本金 。</p>
                <p>2、出金请先在官网绑定账户本人名下银行卡 。</p>
                <p>3、出金时间工作日 0 : 00 到 16 : 00 之间。</p>
                <p>4、每笔出金扣除 0 元手续费。</p>
                <p>5、每笔提现金额最小 1000 元。</p>
                <p>6、出金时段内提交出金后当日即可审核，出金到账时间受银行间清算时间影响，各家银行到账时间不同，最迟工作日72小时到</p>
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
          number: ''
        },
        rule: {
          number: [
            { required: true, message: '请输入提现金额', trigger: 'blur' }
          ]
        },
        settingInfo: {
          withTimeBegin: '',
          withTimeEnd: '',
          withFeeSingle: '',
          withFeePercent: '',
          withMinAmt: ''
        }
      }
    },
    watch: {},
    computed: {},
    created () {
      this.getSettingInfo()
      if (!this.$store.state.bankInfo.bankInfo) {
        this.getCardDetail()
      }
      if (!this.$store.state.userInfo.idCard) {
        this.getUserInfo()
      }
    },
    mounted () {
      this.$store.state.userMenu = '2-7'
    },
    methods: {
      selectAll () {
        this.form.number = this.$store.state.userInfo.userCapital
      },
      async getCardDetail () {
        // 获取银行卡信息
        let data = await api.getBankCard()
        if (data.status === 0) {
          this.$store.state.bankInfo = data.data
        } else {
          this.$message.error('您还未绑定银行卡，请先绑定银行卡')
          this.$router.push('/bank')
          // this.$message.error(data.msg)
        }
      },
      async getUserInfo () {
        // 获取用户信息
        let data = await api.getUserInfo()
        if (data.status === 0) {
          // 判断是否登录
          this.$store.state.userInfo = data.data
        } else {

        }
      },
      async getSettingInfo () {
        // 网站设置信息
        let data = await api.getSetting()
        if (data.status === 0) {
          // 成功
          this.settingInfo = data.data
        } else {
          this.$message.error(data.msg)
        }
      },
      async Onsubmit (formName) {
        // 提交
        //   this.$refs[formName].validate(async(valid) => {
        //     if (valid) {
        if (!this.$store.state.userInfo.idCard) {
          this.$message.error('请先实名认证')
          this.$router.push('/auth')
        } else if (!this.$store.state.bankInfo.bankNo) {
          this.$message.error('请先绑定银行卡')
          this.$router.push('/bank')
        } else {
          if (!this.form.number) {
            this.$message.error('请输入提现金额')
            this.$router.push('/bank')
            return
          }
          let opts = {
            amt: this.form.number
          }
          this.isloading = true
          let data = await api.outMoney(opts)
          if (data.status === 0) {
            // 成功
            this.$message.success('申请成功，请等待审核!')
            this.$router.push('/withdrawlist')
          } else {
            this.$message.error(data.msg ? data.msg : '提现失败,请重新提现或者联系客服')
          }
          this.isloading = false
        }
        //     } else {
        //         return false;
        //     }
        // })
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

    .enable {
      margin-bottom: 20px;
      margin-left: -50px;
      color: #666;
      text-align: center;

      span {
        font-weight: 600;
        font-size: 16px;
      }

      a {
        margin-left: 20px;
      }
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
      margin-left: 70px;
    }
  }
</style>
