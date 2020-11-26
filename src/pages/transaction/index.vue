<template>
  <el-container>
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-container class="main-wrapper">
      <el-main class="transform-main">
        <el-row :gutter="10">
          <el-col :span="5">
            <!--  ==> 监听融资下单 -->
            <table-box
              :hasGetNewOrder="hasGetNewOrder2"
              :handleOptions2="handleOptionsindex2"
              :handleOptions3="handleOptions3"
              :handleOptions4="handleOptions4"
            ></table-box>
          </el-col>
          <el-col :span="14">
            <chart-box :detail="detail" :code="code"></chart-box>
            <!-- 持仓单子 -->

            <div class="tab-box">
              <el-tabs v-model="activeName" class="black-style">
                <el-tab-pane label="融资持仓" name="first">
                  <!-- 我的持仓 -->
                  <hold-position
                    :haslogin="haslogin"
                    :hasGetNewOrder="hasGetNewOrder"
                    :handleOptions="handleOptions"
                  ></hold-position>
                </el-tab-pane>
                <el-tab-pane label="融资平仓" name="second">
                  <sell-box
                    :hasChangeSell="hasChangeSell"
                    :handleOptions="handleOptions"
                  ></sell-box>
                </el-tab-pane>
                <el-tab-pane
                  label="指数持仓"
                  v-if="$store.state.productSetting.indexDisplay"
                  name="three"
                >
                  <!-- 我的持仓 指数 -->
                  <index-hold-position
                    :haslogin="haslogin"
                    :hasGetNewOrder="hasGetNewOrder2"
                    :handleOptions="handleOptionsindex"
                  ></index-hold-position>
                </el-tab-pane>
                <el-tab-pane
                  label="指数平仓"
                  v-if="$store.state.productSetting.indexDisplay"
                  name="fours"
                >
                  <index-sell-box
                    :hasChangeSell="hasChangeSell2"
                    :handleOptions="handleOptionsindex"
                  ></index-sell-box>
                </el-tab-pane>
                <el-tab-pane
                  label="期货持仓"
                  v-if="$store.state.productSetting.futuresDisplay"
                  name="five"
                >
                  <!-- 我的持仓 期货 -->
                  <futures-hold-position
                    :haslogin="haslogin"
                    :hasGetNewOrder="hasChangeSell3"
                    :handleOptions="handleOptionsFutures"
                  ></futures-hold-position>
                </el-tab-pane>
                <el-tab-pane
                  label="期货平仓"
                  v-if="$store.state.productSetting.futuresDisplay"
                  name="six"
                >
                  <futures-sell-box
                    :hasChangeSell="hasChangeSell3"
                    :handleOptions="handleOptionsFutures"
                  ></futures-sell-box>
                </el-tab-pane>

                <el-tab-pane
                  label="配资持仓"
                  name="seven"
                  v-if="$store.state.productSetting.fundsDisplay"
                >
                  <!-- 配资持仓 -->
                  <funds-hold-position
                    :haslogin="haslogin"
                    :hasGetNewOrder="hasChangeSell4"
                    :handleOptions="handleOptionsFunds"
                  ></funds-hold-position>
                </el-tab-pane>
                <el-tab-pane
                  label="配资平仓"
                  name="eight"
                  v-if="$store.state.productSetting.fundsDisplay"
                >
                  <funds-sell-box
                    :hasChangeSell="hasChangeSell4"
                    :handleOptions="handleOptionsFunds"
                  ></funds-sell-box>
                </el-tab-pane>
                <el-tab-pane label="港股持仓" name="nine">
                  <!-- 我的持仓 -->
                  <hold-position-gg
                    :haslogin="haslogin"
                    :hasGetNewOrder="hasGetNewOrder5"
                    :handleOptions="handleOptionsGg"
                  ></hold-position-gg>
                </el-tab-pane>
                <el-tab-pane label="港股平仓" name="ten">
                  <sell-box-gg
                    :hasChangeSell="hasChangeSell5"
                    :handleOptions="handleOptionsGg"
                  ></sell-box-gg>
                </el-tab-pane>
              </el-tabs>
              <div v-if="false" class="account-state">
                <span
                  :class="
                    $store.state.userInfo.allProfitAndLose > 0
                      ? 'red'
                      : $store.state.userInfo.allProfitAndLose < 0
                      ? 'green'
                      : ''
                  "
                >
                  持仓总盈亏：{{ $store.state.userInfo.allProfitAndLose }}
                </span>
                <span style="color:#409EFF;"
                  >冻结保证金：{{ $store.state.userInfo.allFreezAmt }}</span
                >
                <span style="color:#d06e45;"
                  >强制平仓线：{{
                    (
                      $store.state.userInfo.enableAmt +
                      $store.state.userInfo.allFreezAmt *
                        settingInfo.forceStopPercent
                    ).toFixed(2)
                  }}</span
                >
              </div>
              <div v-show="!$store.state.haslogin" class="empty text-center">
                <div class="btn-wrap">
                  <el-button
                    class="btn-box"
                    type="primary"
                    style="background-color: rgba(0,0,0,0)!important;"
                    @click="toLogin"
                    >登录</el-button
                  >
                  <span>或者</span>
                  <el-button
                    class="btn-box"
                    type="primary"
                    style="background-color: rgba(0,0,0,0)!important;"
                    @click="toRegister"
                    >注册</el-button
                  >
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="5">
            <buy-box
              :hasGetNewOrder="hasGetNewOrder"
              :handleOptions2="handleOptions2"
              :handleOptions5="handleOptions5"
              :settingInfo="settingInfo"
              :code="code"
            ></buy-box>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeHeader from "@/components/HeaderOrder";
import ChartBox from "./components/chart";
import TableBox from "./components/table";
import HoldPosition from "./components/holdposition";
import HoldPositionGg from "./components/holdpositiongg";
import IndexHoldPosition from "./components/indexholdposition";
import FuturesHoldPosition from "./components/futuresholdposition";
import FundsHoldPosition from "./components/fundsholdposition";
import SellBox from "./components/sell";
import SellBoxGg from "./components/sellGg";
import IndexSellBox from "./components/indexsell";
import FuturesSellBox from "./components/futuressell";
import FundsSellBox from "./components/fundssell";
import BuyBox from "./components/buy";
import * as api from "@/axios/api";
// import { setLocalstorage, getLocalstorage } from '@/utils/localstorage'

export default {
  components: {
    HomeHeader,
    ChartBox,
    TableBox,
    HoldPosition,
    HoldPositionGg,
    BuyBox,
    IndexHoldPosition,
    IndexSellBox,
    SellBox,
    SellBoxGg,
    FuturesHoldPosition,
    FundsHoldPosition,
    FuturesSellBox,
    FundsSellBox
  },
  props: {},
  data() {
    return {
      code: "",
      activeName: "first",
      haslogin: false,
      detail: {},
      hasChangeSell: 0, // 是否平仓 (融资) 平仓之后数字一直加
      hasChangeSell2: 0, // 是否平仓 (指数) 平仓之后数字一直加
      hasChangeSell3: 0, // 是否平仓 (期货) 平仓之后数字一直加
      hasChangeSell4: 0, // 是否平仓 (配资) 平仓之后数字一直加
      hasChangeSell5: 0, // 是否平仓 (港股) 平仓之后数字一直加
      hasGetNewOrder: 0, // 是否下单(融资)  下单数字++ 使用true/false 第二次为true的时候 页面监听不到
      hasGetNewOrder2: 0, // 是否下单(指数)
      hasGetNewOrder3: 0, // 是否下单(期货)
      hasGetNewOrder4: 0, // 是否下单(配资)
      hasGetNewOrder5: 0, // 是否下单(港股)
      settingInfo: {}
    };
  },
  watch: {
    change(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getDetail(); // 分时数据
      }
    }
  },
  computed: {
    change() {
      return this.$route.query.code;
    }
  },
  beforeRouteEnter(to, from, next) {
    // 现在想不做判断，进入之前一律刷新一次
    if (!to.query.code) {
      let query = to.query;
      query.code = "300498";
      next({
        path: to.path,
        query: query
      });
    }
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // 现在想不做判断，进入之前一律刷新一次
    if (!to.query.code) {
      let query = to.query;
      query.code = "300498";
      next({
        path: to.path,
        query: query
      });
    }
    next();
  },
  beforeCreate() {},
  created() {
    // 暂时排错
    // let data = {
    //   'indexDisplay': true
    // }
    // this.$store.state.productSetting = data

    this.code = this.$route.query.code;
    // if(!this.code){
    //   this.getList()
    // }
    // 判断是否 登录
    //  window.localStorage.getItem('phone')
    // getLocalstorage('phone',1000 * 60 * 60)
    this.getUserInfo();

    // if(getLocalstorage('phone',1000 * 60 * 60)){
    //   // 判断是否登录
    //   this.haslogin = true
    //   this.$store.state.haslogin = true
    //   this.getUserInfo()
    // }
    this.$store.state.activeIndex = "transaction";
    this.getSettingInfo();
    if (!this.$store.state.productSetting) {
      this.getProductSetting();
    }
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    // @tab-click="handleClick"
    // handleClick(val){
    //   let name = window.localStorage.getItem('phone')
    //   if(name){
    //     this.activeName = val
    //   }
    // },
    handleOptions(opts) {
      // 监听平仓状态 融资
      this.hasChangeSell = opts;
      if (this.hasChangeSell) {
        this.activeName = "second";
      }
    },
    handleOptionsGg(opts) {
      // 监听平仓状态 港股
      this.hasChangeSell5 = opts;
      if (this.hasChangeSell5) {
        this.activeName = "ten";
      }
    },
    handleOptionsindex(opts) {
      // 监听平仓状态 指数
      this.hasChangeSell2 = opts;
      if (this.hasChangeSell2) {
        this.activeName = "fours";
      }
    },
    handleOptionsFutures(opts) {
      // 监听平仓状态 期货
      this.hasChangeSell3 = opts;
      if (this.hasChangeSell3) {
        this.activeName = "six";
      }
    },
    handleOptionsFunds(opts) {
      // 监听平仓状态 配资
      this.hasChangeSell4 = opts;
      if (this.hasChangeSell4) {
        this.activeName = "eight";
      }
    },
    handleOptions2(opts) {
      // 监听指数下单状态
      this.hasGetNewOrder = opts;
      if (this.hasGetNewOrder) {
        this.activeName = "first";
      }
    },
    handleOptions3(opts) {
      // 监听期货下单状态
      this.hasGetNewOrder3 = opts;
      if (this.hasGetNewOrder3) {
        this.activeName = "five";
      }
    },
    handleOptions4(opts) {
      // 监听配资下单状态
      this.hasGetNewOrder4 = opts;
      if (this.hasGetNewOrder4) {
        this.activeName = "seven";
      }
    },
    handleOptions5(opts) {
      // 监听配资下单状态
      this.hasGetNewOrder5 = opts;
      if (this.hasGetNewOrder5) {
        this.activeName = "nine";
      }
    },
    handleOptionsindex2(opts) {
      // 监听下单状态
      this.hasGetNewOrder2 = opts;
      if (this.hasGetNewOrder2) {
        this.activeName = "three";
      }
    },
    async getDetail() {
      let data;
      let opts = {
        code: this.$route.query.code
      };
      this.loading = true;
      if (this.$route.query.code.length === 5) {
        data = await api.getSingleStockGg(opts);
      } else {
        data = await api.getSingleStock(opts);
      }
      this.loading = false;
      if (data && data.status === 0) {
        this.detail = data.data;
      } else {
        this.$message.error(data.msg);
      }
    },
    toRegister() {
      // 注册
      this.$router.push("/registerEmail");
    },
    toLogin() {
      // 登录
      this.$store.state.loginIsShow = true;
    },
    async getList() {
      // 获取表格数据
      let opt = {
        pageNum: 1,
        pageSize: 1
      };
      let data = await api.getStock(opt);
      if (data.status === 0) {
        // data.data.list.forEach(element => {
        //     this.list.push(element)
        // });
        this.list = data.data.list[0];
        this.$router.push({
          path: "/transaction",
          query: {
            code: data.data.list[0].code
          }
        });
        // window.location.reload()
      } else {
        this.$message.error(data.msg);
      }
    },
    async getSettingInfo() {
      // 网站设置信息
      let data = await api.getSetting();
      if (data.status === 0) {
        // 成功
        this.settingInfo = data.data;
        // 杠杆倍数
        // this.form.lever = data.data.siteLever
      } else {
        this.$message.error(data.msg);
      }
    },
    async getProductSetting() {
      // 获取网站产品设置信息
      let result = await api.getProductSetting();
      if (result.status === 0) {
        this.$store.state.productSetting = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },
    async getUserInfo() {
      // 获取用户信息
      let data = await api.getUserInfo();
      if (data.status === 0) {
        // 判断是否登录
        this.haslogin = true;
        this.$store.state.haslogin = true;
        this.$store.state.userInfo = data.data;
      } else {
        this.haslogin = false;
        this.$store.state.haslogin = false;
        // this.$message.error(data.msg)
      }
    }
  }
};
</script>
<style lang="less" scoped>
.transform-main {
  min-width: 1200px;
  padding: 10px;
}

.tab-box /deep/ .el-tabs .el-tab-pane {
  padding: 0;
  // min-height: 300px;
}

.el-table td {
  padding: 5px 0;
}

.tab-box {
  position: relative;

  .empty {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 10;
  }

  .btn-wrap {
    padding-top: 120px;
    color: #fff;

    span {
      padding: 0 20px;
    }
  }

  .btn-box {
    background: none;
    border-color: #c11815;
    color: #c11815;
    font-weight: 600;
    font-size: 16px;
  }
}

.account-state {
  color: #ddd;
  position: absolute;
  top: 0;
  right: 0;
  line-height: 36px;

  span {
    margin-right: 20px;
  }
}
</style>
