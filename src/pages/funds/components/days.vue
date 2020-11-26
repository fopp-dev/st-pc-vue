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
              <!-- <div class="text-center">
                <i style="font-size: 1.5rem;" class="maincolor-font iconfont icon-jiaoyi"></i>
              </div> -->
              <el-card class="box-card" style="margin-top:0px;">
               
                <div class="text item">
                  <el-tabs>
                    <el-tab-pane label="按天配资" name="first">
                    </el-tab-pane>
                  </el-tabs>
                </div>

                <table style="width: 100%;border-spacing:160px 180px;" class="demo-form-inline auth-box daystable">
                  <tr>
                    <td class="tr-cols1">预警线</td>
                    <td class="tr-cols2">{{Number(Number(form.margin) + (form.margin * fundsSetting.daysWarning)).toFixed(0)}} 元
                      <span class="td-font">（预警线 = 配资资金 + 保证金 X {{fundsSetting.daysWarning}}）</span>
                    </td>
                    <td class="tr-cols3" bgcolor="#fdf6ec">保证金</td>
                    <td bgcolor="#fdf6ec">
                      <el-input type='number' @change="getIntNumber()" class="td-input" v-model="form.margin" placeholder="请输入金额"></el-input>
                      <span class="td-span">（保证金介于 {{fundsSetting.marginMin}} - {{fundsSetting.marginMax}} 元之间）</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="tr-cols1">平仓线</td>
                    <td class="tr-cols2">{{Number(Number(form.margin) + (form.margin * fundsSetting.daysUnwind)).toFixed(0)}} 元
                      <span class="td-font">（平仓线 = 配资资金 + 保证金 X {{fundsSetting.daysUnwind}}）</span>
                    </td>
                    <td class="tr-cols3" bgcolor="#fdf6ec">配资资金</td>
                    <td bgcolor="#fdf6ec">
                      <!-- <el-input type='number' class="td-input" placeholder="请输入金额"></el-input> -->
                      <el-select clearable filterable v-model="selCycleType" placeholder="配置杠杆"  @change="currentSel" style="width:120px;">
                        <el-option v-for="item in fundsTypeList" :key="item.id" :value="item">{{item.lever}}倍</el-option>
                      </el-select>
                      <span class="td-span">（配资资金为{{fundsAmount}}元）</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="tr-cols1">管理费</td>
                    <td class="tr-cols2">{{selManageRate}}% 
                      <span class="td-font">（{{fundsAmount}} X 天利率{{selManageRate}} % X {{selDaysUseVal}} = {{manageFee}} 元 ）</span>
                    </td>
                    <td class="tr-cols3" bgcolor="#fdf6ec">操盘期限</td>
                    <td bgcolor="#fdf6ec">
                      <el-select clearable filterable v-model="selDaysUsePeriod" placeholder="操盘期限"  @change="currentSelDays" style="width:120px;">
                        <el-option v-for="item in (fundsSetting.daysUsePeriod || '').split('|')" :key="item" :value="item">{{item}}天</el-option>
                      </el-select>
                      <span class="td-span">（操盘期限介于 {{selMinDay}} - {{selMaxDay}}  天之间）</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="tr-cols1">自动续期</td>
                    <td class="tr-cols2">
                      <span class="td-font">默认开启到期自动续期，配资管理费先付后用</span>
                    </td>
                    <td class="tr-cols3" bgcolor="#fdf6ec">总操盘资金</td>
                    <td bgcolor="#fdf6ec">
                      <span class="td-span">{{totalTradingAmount}} 元 = {{Number(form.margin).toFixed(0)}}元（保证金）+ {{fundsAmount}} 元（配资资金）</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="tr-cols1">操盘须知</td>
                    <td class="tr-cols2">
                      <span class="td-font">单只股票最大持仓比例为 {{selSingleHoldingRatio*100}}%。</span>
                    </td>
                    <td class="tr-cols3" bgcolor="#fdf6ec">需准备资金</td>
                    <td bgcolor="#fdf6ec">
                      <span class="td-span">{{Number(Number(form.margin) + (fundsAmount * selManageRate * selDaysUseVal / 100)).toFixed(1)}}  元 = {{Number(form.margin).toFixed(0)}} 元（保证金）+ {{Number(fundsAmount * selManageRate * selDaysUseVal / 100).toFixed(1)}} 元 (一次性收取管理费)</span>
                    </td>
                  </tr>

                </table>

                <div class="auth-box" style="padding-bottom:40px;">
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" :loading="isloading" @click="Onsubmit()">立即申请</el-button>
                  </div>
                </div>

                <div class="notice">
                    <div class="notice-hd">
                        注意事项：
                    </div>
                    <div class="notice-bd">
                        <ul>
                            <li>1.保证金：您用于投资股票的资金,起点相当低。</li>
                            <li>2.操盘期限：按天计算，不包含各类法定节假日。</li>
                            <li>3.按天支付管理费（不包含交易印花税、过户费和佣金），无其他任何费用。</li>
                            <li>4.如操盘10天，一次性收取10天管理费</li>
                            <li>5.交易日当天14:50之前的申请于当日生效（当天开始收取账户管理费），交易日当天14：50后的申请于下个交易日生效。</li>
                            <li>6.股市有风险，投资需谨慎。</li>
                        </ul>
                    </div>
                </div>

              </el-card>
              
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  import HomeHeader from '../../../components/HeaderOrder'
  import HomeFooter from '../../../components/Footer'
  import MenuBox from '@/pages/user/components/menu'
  import * as api from '../../../axios/api'

  export default {
    components: {
      HomeHeader,
      HomeFooter,
      MenuBox
    },
    props: {},
    data () {
      return {
        isloading: false,
        form: {
          margin: ''
        },
        selLever: 0,
        selManageRate: 0,
        selCycleType: '',
        selDaysUsePeriod: '',
        selDaysUseVal: '',
        selMinDay: '',
        selMaxDay: '',
        selSingleHoldingRatio: '',
        fundsSetting: {},
        fundsTypeList: [{}]
      }
    },
    watch: {},
    computed: {
      fundsAmount () { //配资金额= 保证金*杠杆倍数
        if (this.form.margin) {
          return Number(this.form.margin * this.selLever).toFixed(0)
        } else {
          return 0
        }
      },
      totalTradingAmount () {//总操盘金额
        if (this.form.margin) {
          return Number(Number(this.form.margin) + (this.form.margin * this.selLever)).toFixed(0)
        } else {
          return 0
        }
      },
      manageFee () {//管理费
        if (this.selDaysUseVal) {
          return (this.fundsAmount * this.selManageRate * this.selDaysUseVal / 100).toFixed(1)
        } else {
          return 0
        }
      }
    },
    created () {
      this.getUserInfo()
      this.getFundsSetting()
      this.getFundsTypeList()
    },
    mounted () {
      this.$store.state.userMenu = '2-22'
    },
    methods: {
      async getUserInfo () {
        // 获取用户信息
        let data = await api.getUserInfo()
        if (data.status === 0) {
          // 判断是否登录
          this.$store.state.userInfo = data.data
        } else {
        }
      },
      async getFundsSetting () {
        // 分仓配资设置信息查询
        let data = await api.getFundsSetting()
        if (data.status === 0) {
          this.fundsSetting = data.data
          this.form.margin = this.fundsSetting.marginMin
          this.selDaysUsePeriod = this.fundsSetting.daysUsePeriod.split('|')[0] + '天'
          this.selDaysUseVal = this.fundsSetting.daysUsePeriod.split('|')[0]
          this.selMinDay = this.fundsSetting.daysUsePeriod.split('|')[0]
          this.selMaxDay = this.fundsSetting.daysUsePeriod.split('|')[this.fundsSetting.daysUsePeriod.split('|').length - 1]
        } else {
        }
      },
      async getFundsTypeList () {
        // 查询配资类型杠杆
        let data = await api.getFundsTypeList({cycleType:1})
        if (data.status === 0) {
          this.fundsTypeList = data.data.list
          this.selLever = this.fundsTypeList[0].lever
          this.selManageRate = this.fundsTypeList[0].manageRate
          this.selCycleType = this.fundsTypeList[0].lever + '倍'
          this.selSingleHoldingRatio = this.fundsTypeList[0].singleHoldingRatio
        } else {
        }
      },
      getIntNumber () {
        if (this.form.margin >= this.fundsSetting.marginMax) {
          this.form.margin = this.fundsSetting.marginMax
        }
        this.form.margin = Math.floor(this.form.margin)
      },
      async Onsubmit () {
        // 融资转指数
        let opt = {
          userId: this.$store.state.userInfo.id,
          userName: this.$store.state.userInfo.realName,
          userPhone: this.$store.state.userInfo.phone,
          fundsType: 1, // 配资类型：1按天、2按周、3按月
          margin: this.form.margin, //保证金
          fundsAmount: this.fundsAmount, //配资金额
          lever: this.selLever, //杠杆
          totalTradingAmount: this.totalTradingAmount, //总操盘金额
          tradersCycle: this.selDaysUseVal, //操盘期限
          manageFee: this.manageFee //管理费
        }
        let data = await api.addFundsApply(opt)
        if (data.status === 0) {
          this.$message.success(data.msg)
        } else {
          this.$message.error(data.msg)
        }
      },
      currentSel(selVal) {
        this.selLever = selVal.lever
        this.selManageRate = selVal.manageRate
        this.selCycleType = selVal.lever + '倍'
        this.selSingleHoldingRatio = selVal.singleHoldingRatio
      },
      currentSelDays(selVal) {
        this.selDaysUsePeriod = selVal + '天'
        this.selDaysUseVal = selVal
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
    padding: 20px;

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

  .box-card {
    .red {
      font-size: 12px;
      margin-left: 10px;
    }
  }

  .td-font {
    font-size: 12px;
    margin-left: 0px;
    color: #606266;
  }

  .td-span {
    font-size: 12px;
    margin-left: 0px;
    color: #b13b51;
  }

  .tr-cols1 {
    width: 60px;
  }
  .tr-cols2 {
    width: 280px;
  }
  .tr-cols3 {
    width: 80px;
    padding-left: 15px;
  }
  .td-input {
    width: 120px;
  }
  .daystable{
    border-spacing:0px 0px;
  }
  table td{ height:70px; border:#CCCCCC 0px solid;}


  .notice {
    padding: 10px 30px 40px;
    color: #bb9767;
  }
  .notice .notice-hd {
    line-height: 50px;
    font-size: 18px;
    border-bottom: 1px dashed #D9D9D9;
    padding: 0 16px;
  }

  .notice .notice-bd li {
    font-size: 12px;
    line-height: 30px;
}
  
</style>
