<template>
  <div class="con-box">
    <div class="header-top">
      <div class="account-all">
        <p class="title">
          账户总资产 
          <span>( 可用本金 + A股本金 + 港股本金 )
            <!-- <i v-if="$store.state.productSetting.indexDisplay">+ 指数账户</i> 
            <i v-if="$store.state.productSetting.futuresDisplay">+ 期货账户</i> -->
          </span>
        </p>
        <div class="benjin">
          <p class="title">可用本金</p>
          <p class="number">{{$store.state.userInfo.userCapital}}</p>
        </div>
        <div class="pull-right">
          <el-button type="primary" @click="toRechange()">充值</el-button>
          <el-button type="success" @click="toWithdraw()">提现</el-button>
        </div>

        <p class="number">
          ¥
          <!-- <span v-if="$store.state.userInfo.accountType === 1">{{(Number($store.state.userInfo.userAmt) + Number($store.state.userInfo.userIndexAmt) + Number($store.state.userInfo.enableFuturesAmt)).toFixed(2)}}</span> -->
          <!-- <span v-if="$store.state.productSetting.indexDisplay && !$store.state.productSetting.futuresDisplay">{{(Number($store.state.userInfo.userHmtMulRate) + Number($store.state.userInfo.userAmt) + Number($store.state.userInfo.userIndexAmt)).toFixed(2)}}</span>
          <span v-else-if="!$store.state.productSetting.indexDisplay && $store.state.productSetting.futuresDisplay">{{(Number($store.state.userInfo.userHmtMulRate) + Number($store.state.userInfo.userAmt) + Number($store.state.userInfo.enableFuturesAmt)).toFixed(2)}}</span>
          <span v-else-if="!$store.state.productSetting.indexDisplay && !$store.state.productSetting.futuresDisplay">{{(Number($store.state.userInfo.userHmtMulRate) + Number($store.state.userInfo.userAmt)).toFixed(2)}}</span>
          <span v-else>{{(Number($store.state.userInfo.userHmtMulRate) + Number($store.state.userInfo.userAmt) + Number($store.state.userInfo.userIndexAmt) + Number($store.state.userInfo.userFuturesAmt)).toFixed(2)}}</span> -->
          <span>{{Number($store.state.userInfo.totalCapital).toFixed(2)}}</span>
        </p>
      </div>
      <el-row class="box-account" :gutter="20">
        <el-row>
          <el-col class="progress-box" :span="24">
            <el-progress :text-inside="true" :stroke-width="10"
                         :percentage="$store.state.userInfo.userAmt/($store.state.userInfo.userAmt+$store.state.userInfo.userIndexAmt) * 100 > 100?100:$store.state.userInfo.userAmt/($store.state.userInfo.userAmt+$store.state.userInfo.userIndexAmt) * 100 > 100?$store.state.userInfo.userAmt/($store.state.userInfo.userAmt+$store.state.userInfo.userIndexAmt) * 100 > 100?100:$store.state.userInfo.userAmt/($store.state.userInfo.userAmt+$store.state.userInfo.userIndexAmt) * 100:100"></el-progress>
          </el-col>
        </el-row>
        <el-collapse v-model="accountActiveNames">
          <el-collapse-item title="沪深账户" name="1">
            <el-col :span="24">
              <el-row class="Assets-box" :gutter="20">
                <el-col :span="6">
                  <div class="box box1">
                    <i class="color3 iconfont icon-zijin1"></i>
                    <p class="title">沪深总资金</p>
                    <p :class="refresh?'number heartBeat':'number'">
                      {{$store.state.hide?'****':$store.state.userInfo.userAmt}}</p>

                  </div>
                </el-col>

                <el-col :span="6">
                  <div class="box box1">
                    <i class="color3 iconfont icon-zijin1"></i>
                    <p class="title">A股本金</p>
                    <p>
                      <span class="number">{{$store.state.hide?'****':$store.state.userInfo.userStockACapital}}</span>
                    </p>
                  </div>
                </el-col>

                <el-col :span="6">
                  <div class="box box1">
                    <i class="color1 iconfont icon-dongjiezijin"></i>
                    <p class="title">沪深冻结保证金</p>
                    <p>
                      <span class="number">{{$store.state.hide?'****':$store.state.userInfo.allFreezAmt}}</span>
                    </p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="box box1">
                    <i class="color2 iconfont icon-keyongzijin"></i>
                    <p class="title">沪深可用资金</p>
                    <p class="number">{{$store.state.hide?'****':$store.state.userInfo.enableAmt}}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="box box1">
                    <i class="color4 iconfont icon-yingkuixuanzhong"></i>
                    <p class="title">沪深持仓总盈亏</p>
                    <p :class="refresh?'heartBeat':''">
                    <span
                      :class="$store.state.userInfo.allProfitAndLose>0?'red number':$store.state.userInfo.allProfitAndLose<0?'green number':'number'">
                        {{$store.state.hide?'****':$store.state.userInfo.allProfitAndLose}}
                    </span>
                    </p>
                  </div>
                </el-col>
              </el-row>
              <div class="force-line text-center">
                <p>
                  您的沪深账户强制平仓线为
                   <!-- 账户可用资金 -->
                   <span class="number">{{($store.state.userInfo.userStockACapital * settingInfo.forceStopPercent).toFixed(2)}} </span>
                  <el-tooltip class="item" effect="dark"
                              :content="'强制平仓线 = A股本金* '+ settingInfo.forceStopPercent  +'；持仓总盈亏达到此线，将会强制平仓'"
                              placement="bottom-end">
                    <i class="iconfont icon-xiangqing"></i>
                  </el-tooltip>
                  <!-- <span class="number">{{(($store.state.userInfo.enableAmt + $store.state.userInfo.allFreezAmt) * settingInfo.forceStopPercent).toFixed(2)}} </span>
                  <el-tooltip class="item" effect="dark"
                              :content="'强制平仓线 = (账户可用资金+冻结保证金) * '+ settingInfo.forceStopPercent  +'；持仓总盈亏达到此线，将会强制平仓'"
                              placement="bottom-end">
                    <i class="iconfont icon-xiangqing"></i>
                  </el-tooltip> -->
                </p>
              </div>
            </el-col>
          </el-collapse-item>
          <el-collapse-item v-show="$store.state.productSetting.indexDisplay" title="指数账户" name="2">
            <el-col :span="24">
              <el-row class="Assets-box" :gutter="20">
                <el-col :span="6">
                  <div class="box box1">
                    <i class="color3 iconfont icon-zijin1"></i>
                    <p class="title">指数总资金</p>
                    <p :class="refresh?'number heartBeat':'number'">
                      {{$store.state.hide?'****':$store.state.userInfo.userIndexAmt}}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="box box1">
                    <i class="color1 iconfont icon-dongjiezijin"></i>
                    <p class="title">指数冻结保证金</p>
                    <p>
                      <span class="number">{{$store.state.hide?'****':$store.state.userInfo.allIndexFreezAmt}}</span>
                    </p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="box box1">
                    <i class="color2 iconfont icon-keyongzijin"></i>
                    <p class="title">指数可用资金</p>
                    <p class="number">{{$store.state.hide?'****':$store.state.userInfo.enableIndexAmt}}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="box box1">
                    <i class="color4 iconfont icon-yingkuixuanzhong"></i>
                    <p class="title">指数持仓总盈亏</p>
                    <p :class="refresh?'heartBeat':''">
                    <span
                      :class="$store.state.userInfo.allIndexProfitAndLose>0?'red number':$store.state.userInfo.allIndexProfitAndLose<0?'green number':'number'">
                        {{$store.state.hide?'****':$store.state.userInfo.allIndexProfitAndLose}}
                    </span>
                    </p>
                  </div>
                </el-col>
              </el-row>
              <div class="force-line text-center">
                <p>
                  您的指数账户强制平仓线为
                  <!--  账户可用资金  -->
                  <span class="number">{{(($store.state.userInfo.allIndexFreezAmt + $store.state.userInfo.enableIndexAmt) * indexSettingInfo.forceSellPercent).toFixed(2)}} </span>
                  <el-tooltip class="item" effect="dark"
                              :content="'强制平仓线 = (账户可用资金+冻结保证金) * '+ indexSettingInfo.forceSellPercent +'；持仓总盈亏达到此线，将会强制平仓'"
                              placement="bottom-end">
                    <i class="iconfont icon-xiangqing"></i>
                  </el-tooltip>
                </p>
              </div>
            </el-col>
          </el-collapse-item>
          <el-collapse-item v-if="$store.state.productSetting.futuresDisplay" title="期货账户" name="3">
            <el-col :span="24">
              <el-row class="Assets-box" :gutter="20">
                <el-col :span="6">
                  <div class="box box1">
                    <i class="color3 iconfont icon-zijin1"></i>
                    <p class="title">期货总资金</p>
                    <p :class="refresh?'number heartBeat':'number'">
                      {{$store.state.hide?'****':$store.state.userInfo.userFuturesAmt}}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="box box1">
                    <i class="color1 iconfont icon-dongjiezijin"></i>
                    <p class="title">期货冻结保证金</p>
                    <p>
                      <span class="number">{{$store.state.hide?'****':$store.state.userInfo.allFuturesFreezAmt}}</span>
                    </p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="box box1">
                    <i class="color2 iconfont icon-keyongzijin"></i>
                    <p class="title">期货可用资金</p>
                    <p class="number">{{$store.state.hide?'****':$store.state.userInfo.enableFuturesAmt}}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="box box1">
                    <i class="color4 iconfont icon-yingkuixuanzhong"></i>
                    <p class="title">期货持仓总盈亏</p>
                    <p :class="refresh?'heartBeat':''">
                    <span
                      :class="$store.state.userInfo.allFuturesProfitAndLose>0?'red number':$store.state.userInfo.allFuturesProfitAndLose<0?'green number':'number'">
                        {{$store.state.hide?'****':$store.state.userInfo.allFuturesProfitAndLose}}
                    </span>
                    </p>
                  </div>
                </el-col>
              </el-row>
              <div class="force-line text-center">
                <p>
                  您的期货账户强制平仓线为
                  <!--  账户可用资金  -->
                  <span class="number">{{(($store.state.userInfo.allFuturesFreezAmt + $store.state.userInfo.enableFuturesAmt) * futuresSettingInfo.forceSellPercent).toFixed(2)}} </span>
                  <el-tooltip class="item" effect="dark"
                              :content="'强制平仓线 = (账户可用资金+冻结保证金) * '+ futuresSettingInfo.forceSellPercent +'；持仓总盈亏达到此线，将会强制平仓'"
                              placement="bottom-end">
                    <i class="iconfont icon-xiangqing"></i>
                  </el-tooltip>
                </p>
              </div>
            </el-col>
          </el-collapse-item>
          <el-collapse-item title="港股账户" name="4">
            <el-col :span="24">
              <el-row class="Assets-box" :gutter="20">
                <el-col :span="6">
                  <div class="box box1">
                    <i class="color3 iconfont icon-zijin1"></i>
                    <p class="title">港股总资金</p>
                    <p :class="refresh?'number heartBeat':'number'">
                      {{$store.state.hide?'****':$store.state.userInfo.userHmt}}</p>
                  </div>
                </el-col>

                <el-col :span="6">
                  <div class="box box1">
                    <i class="color3 iconfont icon-zijin1"></i>
                    <p class="title">港股本金</p>
                    <p>
                      <span class="number">{{$store.state.hide?'****':$store.state.userInfo.userStockHKCapital}}</span>
                    </p>
                  </div>
                </el-col>

                <el-col :span="6">
                  <div class="box box1">
                    <i class="color1 iconfont icon-dongjiezijin"></i>
                    <p class="title">港股冻结保证金</p>
                    <p>
                      <span class="number">{{$store.state.hide?'****':$store.state.userInfo.allFreezhmt}}</span>
                    </p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="box box1">
                    <i class="color2 iconfont icon-keyongzijin"></i>
                    <p class="title">港股可用资金</p>
                    <p class="number">{{$store.state.hide?'****':$store.state.userInfo.enableHmt}}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="box box1">
                    <i class="color4 iconfont icon-yingkuixuanzhong"></i>
                    <p class="title">港股持仓总盈亏</p>
                    <p :class="refresh?'heartBeat':''">
                    <span
                      :class="$store.state.userInfo.allGgProfitAndLose>0?'red number':$store.state.userInfo.allGgProfitAndLose<0?'green number':'number'">
                        {{$store.state.hide?'****':$store.state.userInfo.allGgProfitAndLose}}
                    </span>
                    </p>
                  </div>
                </el-col>
              </el-row>
              <div class="force-line text-center">
                <p>
                  您的港股账户强制平仓线为
                   <!-- 账户可用资金 -->
                    <span class="number">{{($store.state.userInfo.userStockHKCapital  * settingInfo.forceStopPercent).toFixed(2)}} </span>
                  <el-tooltip class="item" effect="dark"
                              :content="'强制平仓线 = 港股本金* '+ settingInfo.forceStopPercent  +'；持仓总盈亏达到此线，将会强制平仓'"
                              placement="bottom-end">
                    <i class="iconfont icon-xiangqing"></i>
                  </el-tooltip>
                  <!-- <span class="number">{{(($store.state.userInfo.enableHmt + $store.state.userInfo.allFreezhmt) * settingInfo.forceStopPercent).toFixed(2)}} </span>
                  <el-tooltip class="item" effect="dark"
                              :content="'强制平仓线 = (账户可用资金+冻结保证金) * '+ settingInfo.forceStopPercent  +'；持仓总盈亏达到此线，将会强制平仓'"
                              placement="bottom-end">
                    <i class="iconfont icon-xiangqing"></i>
                  </el-tooltip> -->
                </p>
              </div>
            </el-col>
          </el-collapse-item>
        </el-collapse>
      </el-row>
      <el-row v-if="false">
        <el-col :span="12">
          <div class="box-btn text-center">
            <el-button type="primary" @click="toRechange()">充值</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="box-btn text-center">
            <el-button type="success" @click="toWithdraw()">提现</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-tabs v-model="activeName">
      <el-tab-pane label="账户信息" name="first">
        <div class="user-info">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>账号信息</span>
            </div>
            <div class="text item">
              <el-row>
                <el-col class="text-center" :span="10">

                  <div v-if="$store.state.userInfo.isActive === 3" style="margin-top: 54px;">
                    <i style="font-size:130px;color:red" class="iconfont icon-weirenzheng"></i>
                  </div>

                  <img v-else-if="$store.state.userInfo.isActive === 2" width="150px"
                       src="../../../assets/image/thingsOk.png" alt="">
                  <div v-else style="margin-top:46px;margin-bottom:20px;">
                    <i style="font-size:90px;color:#ff5722" class="iconfont icon-renzhengzhong"></i>
                  </div>
                </el-col>
                <el-col :span="14">
                  <el-row>
                    <el-col>
                      <span class="name">状态：</span>
                      <span class="info">
                          <i v-if="$store.state.userInfo.isActive === 2" class="iconfont icon-gou green"></i>
                          <i v-if="$store.state.userInfo.isActive === 3" class="iconfont icon-failure"></i>
                          <i v-if="$store.state.userInfo.isActive === 0" class="iconfont icon-dengdai"></i>
                        </span>
                      <span v-if="$store.state.userInfo.isActive === 1" class="info">
                            <i class="iconfont icon-dengdai"></i> 审核中
                        </span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <span class="name">邮箱：</span>
                      <span class="info">{{$store.state.userInfo.email}}</span>
                    </el-col>
                    <el-col>
                      <span class="name">用户ID：</span>
                      <span class="info">{{$store.state.userInfo.id}}</span>
                    </el-col>
                  </el-row>
                  <div v-if="$store.state.userInfo.isActive === 0">
                    <el-col>
                      <el-button class="btn-statue" type="primary" plain @click="toAuth">去实名认证</el-button>
                    </el-col>
                  </div>
                  <div v-if="$store.state.userInfo.isActive === 1">
                    <el-col>
                      <span class="btn-statue"></span>
                    </el-col>
                  </div>
                  <div v-if="$store.state.userInfo.isActive === 2">
                    <el-row>
                      <el-col>
                        <span class="name">真实姓名：</span>
                        <span class="info">{{$store.state.userInfo.realName}}</span>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <span class="name">身份证：</span>
                        <span class="info"
                              v-if="$store.state.userInfo.isActive === 2">{{$store.state.userInfo.idCard}}</span>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-if="$store.state.userInfo.isActive === 3">

                    <el-row>
                      <el-col>
                        <span class="name">失败原因</span>
                        <span class="info">{{$store.state.userInfo.authMsg}}</span>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-button class="btn-statue" type="primary" plain @click="toAuth">去重新认证</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
          <el-card class="box-card" style="margin-top:20px;">
            <div slot="header" class="clearfix">
              <span>银行卡信息</span>
            </div>
            <div class="text item">
              <el-row>
                <el-col class="text-center" :span="10">
                  <img width="150px" src="../../../assets/image/bank.png" alt="">
                </el-col>
                <el-col :span="14">
                  <el-row v-if="!hasBankNo">
                      <span>
                        <el-button class="btn-statue" type="primary" plain @click="toAddCard">去添加</el-button>
                      </span>
                  </el-row>
                  <div v-if="hasBankNo">
                    <el-row>
                      <span class="name">银行名称：</span>
                      <span class="info">{{$store.state.bankInfo.bankName}}</span>
                    </el-row>
                    <el-row>
                      <span class="name">支行地址：</span>
                      <span class="info">{{$store.state.bankInfo.bankAddress}}</span>
                    </el-row>
                    <el-row>
                      <span class="name">银行卡号：</span>
                      <span class="info">{{$store.state.bankInfo.bankNo}}</span>
                    </el-row>
                  </div>
                </el-col>
              </el-row>

            </div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>

</template>

<script>
  import * as api from '../../../axios/api'
  import ChartBox from './chart'
  import DetailTable from './table/detail'
  // import DetailTable from './table/detail'

  export default {
    components: {
      ChartBox,
      DetailTable
    },
    props: {
      list: {
        type: Object,
        default () {
          return {
            list: []
          }
        }
      },
      getData: {
        type: Function,
        default: function () {}
      },
      handleOptions: {
        type: Function,
        default: function () {}
      },
      refresh: {
        type: Boolean,
        default: function () {}
      }
    },
    data () {
      return {
        loading: false,
        activeName: 'first',
        hasAuth: false, // 认证
        hasBankNo: false, // 银行卡
        settingInfo: {}, // 设置信息
        indexSettingInfo: {},
        futuresSettingInfo: {},
        bankInfo: {},
        accountActiveNames: ['1','4']
      }
    },
    watch: {},
    computed: {
      progressNnum () {
        if (this.$store.state.userInfo.userAmt !== 0) {
          return (this.$store.state.userInfo.enableAmt / this.$store.state.userInfo.userAmt) * 100
        } else {
          return 0
        }
      }
    },
    created () {
      this.getCardDetail()
      this.getSettingInfo()
      this.getIndexSetting()
      this.getFuturesSetting()
      if (this.$store.state.userInfo.isActive === 2) {
        this.hasAuth = true
      }
      if (this.$store.state.bankInfo.bankNo) {
        this.hasBankNo = true
      }
    },
    methods: {
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
      async getIndexSetting () {
        // 网站设置信息 指数
        let data = await api.getIndexSetting()
        if (data.status === 0) {
          this.indexSettingInfo = data.data
        } else {
          this.$message.error(data.msg)
        }
      },
      async getFuturesSetting () {
        // 网站设置信息 期货
        let data = await api.getFuturesSetting()
        if (data.status === 0) {
          this.futuresSettingInfo = data.data
        } else {
          this.$message.error(data.msg)
        }
      },
      handleSizeChange (size) {
        this.handleOptions({ pageSize: size })
        this.getData()
      },
      handleCurrentChange (page) {
        this.handleOptions({ pageNum: page })
        this.getData()
      },
      toAuth () {
        // 去认证
        this.$router.push('/auth')
      },
      toAddCard () {
        // 去添加
        this.$router.push('/bank')
      },
      async getCardDetail () {
        // 获取银行卡信息
        let data = await api.getBankCard()
        if (data.status === 0) {
          this.$store.state.bankInfo = data.data
          // this.bankInfo = data.data
          this.hasBankNo = true
        } else {
          // this.$message.error(data.msg)
        }
      },
      toRechange () {
        // 充值
        this.$router.push('/recharge')
      },
      toWithdraw () {
        // 提现
        this.$router.push('/withdraw')
      }
    }
  }
</script>
<style lang="less" scoped>
  .table {
    min-height: 500px;

    .code {
      color: #6d718b;
      font-size: 12px;
    }

    .more-btn {
      text-align: center;
      color: #8f92a3;
    }

    /deep/ th.el-table_1_column_1 {
      padding-left: 50px;
    }
  }

  .con-box {
    // color: #fff;
    padding: 0 20px;

    .box-account {
      padding: 20px 10px 0;

      .name {
        font-size: 16px;
      }

      .account {
        font-size: 46px;
        font-weight: 400;
      }

      .el-col {
        padding: 10px;
      }

      .box {
        padding: 10px;
        padding-left: 50px;
        border-bottom: 1px solid rgba(230, 230, 230, 0.6);

        .title {
          font-size: 16px;
          color: #333;
          margin-bottom: 10px;
        }
      }

      .box1 {
        border-bottom: none;
      }

      .box-btn {
        padding: 12px;
      }

      .number {
        font-size: 18px;
      }
    }
  }

  .user-info {
    padding: 20px 0;

    .el-row {
      margin-bottom: 15px;
      line-height: 30px;
      height: 30px;
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

    .btn-statue {
      margin-left: 100px;
      margin-bottom: 20px;
    }
  }

  .progress-box {
    position: relative;
    margin-bottom: 20px;

    .item {
      position: absolute;
      width: 46%;
      height: 30px;
      top: 38%;
      left: 27%;
      background: #fff;
    }

    .progress-title {
      font-size: 16px;
      padding: 0 12px;
      margin-top: 10px;
    }

    /deep/ .el-progress {
      .el-progress-bar__outer {
        background-color: #FF9800;
      }

      .el-progress-bar__inner {
        background-color: #FF5722;
      }

      .el-progress-bar__innerText {
        color: #FF5722;
        font-size: 0;
      }
    }
  }

  .el-tabs {
    margin-top: 30px;
  }

  .force-line {
    // margin-top: 30px;
    // background-color: #fdf6ec;
    color: #e6a23c;

    p {
      padding: 8px 16px;
    }

    .number {
      font-size: 18px;
    }
  }

  .box-btn {
    margin-top: 20px;

    .el-button {
      padding-left: 50px;
      padding-right: 50px;
    }
  }

  .Assets-box {
    // border: 1px solid #f1f1f1;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    padding: 10px 0;
    margin: 0 !important;

    .box {
      position: relative;

      .iconfont {
        position: absolute;
        left: 10px;
        font-size: 30px;
        top: 17px;

        &.color1 {
          color: #2f97fc;
        }

        &.color2 {
          color: #17b780;
        }

        &.color3 {
          color: #ff7602;
        }

        &.color3 {
          color: #fd4256;
        }

        &.color4 {
          color: #fda822;
        }
      }
    }
  }

  .account-all {
    margin-top: 20px;
    position: relative;
    .benjin {
      position: absolute;
      left: 50%;
      top: 0;
    }
    .title {
      font-size: 16px;
      line-height: 30px;

      span {
        font-size: 12px;
        color: #777;
      }
    }

    .number {
      font-size: 22px;
      margin-top: 4px;
      text-shadow: 1px 2px 2px rgba(24, 24, 24, 0.3);
    }
  }
</style>
