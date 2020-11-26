<template>
  <div class="wrapper buy-table">
    <div class="table transaction-table">
      <el-table stripe :data="list" style="width: 100%">
        <el-table-column prop="name"> </el-table-column>
        <el-table-column prop="price" label="价格">
          <template slot-scope="scope">
            <div class="price">
              <div
                :class="
                  detail.hcrate < 0
                    ? 'green price'
                    : detail.hcrate > 0
                    ? 'red price'
                    : 'price'
                "
              >
                <span v-if="scope.row.price === 0">-</span>
                <span v-else>{{ Number(scope.row.price).toFixed(2) }}</span>
                <!-- <i v-if="hcrate>0" class="iconfont icon-up"></i>
                <i v-if="hcrate<0" class="iconfont icon-down"></i> -->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="volumes" label="成交量"> </el-table-column>
      </el-table>
      <div class="text-center nowprice-box">
        现价
        <span
          :class="
            detail.hcrate < 0
              ? 'green price'
              : detail.hcrate > 0
              ? 'red price'
              : 'price'
          "
          >{{ detail.nowPrice }}</span
        >
      </div>
      <el-table stripe :data="listbuy" class="buy-table" style="width: 100%">
        <el-table-column prop="name"> </el-table-column>
        <el-table-column prop="price" label="价格">
          <template slot-scope="scope">
            <div class="price">
              <div
                :class="
                  detail.hcrate < 0
                    ? 'green price'
                    : detail.hcrate > 0
                    ? 'red price'
                    : 'price'
                "
              >
                <span v-if="scope.row.price === 0">-</span>
                <span v-else>{{ Number(scope.row.price).toFixed(2) }}</span>
                <!-- <i v-if="hcrate>0" class="iconfont icon-up"></i>
                <i v-if="hcrate<0" class="iconfont icon-down"></i> -->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="volumes" label="成交量"> </el-table-column>
      </el-table>
    </div>
    <el-tabs v-model="activeName" class="black-style">
      <el-tab-pane label="两融交易" name="first">
        <!-- 买 -->
        <div class="buy-box">
          <el-form
            ref="ruleForm"
            :hide-required-asterisk="true"
            size="mini"
            :model="form"
            :rules="rule"
            label-width="60px"
          >
            <div class="buy-item">
              <span class="buy-name">{{ detail.name }}</span
              ><span class="buy-code">{{ detail.code }}</span>
            </div>
            <el-row class="buy-item">
              <el-col :span="12">
                现价：<span
                  :class="
                    detail.hcrate < 0
                      ? 'green price'
                      : detail.hcrate > 0
                      ? 'red price'
                      : 'price'
                  "
                  >{{ detail.nowPrice }}</span
                >
              </el-col>
              <el-col :span="12">
                涨跌幅：<span
                  :class="
                    detail.hcrate < 0
                      ? 'green price'
                      : detail.hcrate > 0
                      ? 'red price'
                      : 'price'
                  "
                  >{{ Number(detail.hcrate).toFixed(3) }}%</span
                >
              </el-col>
            </el-row>
            <div>
              <el-form-item
                label="手数"
                prop="buyNum"
                style="margin-bottom:10px;"
              >
                <el-input
                  placeholder="手数"
                  v-model="form.buyNum"
                  class="input-with-select"
                >
                  <el-select
                    v-model="form.buyNum"
                    title="点击选择手数"
                    slot="prepend"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="i in buyNumList"
                      :key="i.value"
                      :label="i.label"
                      :value="i.value"
                    ></el-option>
                  </el-select>
                  <el-button slot="append">手</el-button>
                </el-input>
              </el-form-item>
              <!-- <el-form-item label="杠杆" prop="buyNum" style="margin-bottom:10px;">
                <el-input placeholder="杠杆" v-model="form.lever" :readonly="true" class="input-with-select">
                  <el-select v-model="form.lever" title="点击选择杠杆" slot="prepend" placeholder="请选择">
                    <el-option v-for="i in siteLeverList" :key="i.value" :label="i.label" :value="i.value"></el-option>
                  </el-select>
                  <el-button slot="append">倍</el-button>
                </el-input>
              </el-form-item> -->
              <p class="prompt clearfix">
                <span class="pull-left"
                  >最小购买{{ Number(settingInfo.buyMinNum) / 100 }}手</span
                >
                <span class="pull-right"
                  >最大可购买{{ Number(settingInfo.buyMaxNum) / 100 }}手</span
                >
              </p>
              <el-form-item label="方向" prop="buyType">
                <el-radio-group v-model="form.buyType">
                  <el-radio label="买涨" value="0"></el-radio>
                  <el-radio label="买跌" value="1"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-row class="buy-item" v-if="!isqihuo">
                <el-col :span="8"> {{ form.buyNum * 100 }}股 </el-col>
                <el-col class="text-right" :span="16">
                  市值：{{ price }}元
                </el-col>
              </el-row>
              <el-row class="buy-item" v-if="isgupiao">
                <el-col :span="12">
                  保证金：<span class="price">{{
                    form.lever ? (price / form.lever).toFixed(2) : 0
                  }}</span>
                </el-col>
                <!-- <el-col :span="12">
                  <span class="prompt pull-right"
                    >最小购买{{ settingInfo.buyMinAmt }}元</span
                  >
                </el-col> -->
              </el-row>
              <el-row class="buy-item" v-if="isgupiao">
                <el-col :span="24">
                  总手续费：<span class="price">{{
                    poundage ? poundage : 0
                  }}</span>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="
                      '总手续费 = 买入手续费（' +
                        settingInfo.buyFee * 100 +
                        '%）+ 印花税（' +
                        settingInfo.dutyFee * 100 +
                        '%） + 点差费（' +
                        (settingSpreadRate.spreadRate * 100).toFixed(2) +
                        '%）'
                    "
                    placement="bottom-end"
                  >
                    <i class="iconfont icon-xiangqing"></i>
                  </el-tooltip>
                </el-col>
              </el-row>
              <el-row class="buy-item" v-if="!isqihuo">
                <el-col :span="12">
                  需要支付：<span class="price">{{ total ? total : 0 }}</span>
                </el-col>
                <el-col :span="12">
                  <span class="prompt pull-right"
                    >可用资金:{{
                      $route.query.code.length === 5
                        ? $store.state.userInfo.enableHmt
                        : $store.state.userInfo.enableAmt
                    }}元</span
                  >
                </el-col>
              </el-row>
              <el-row class="buy-item" v-if="isqihuo">
                <el-col :span="24">
                  需要支付：<span class="price"
                    >{{ total ? total : 0 }} {{ futuresInfo.coinCode }}</span
                  >
                  ≈ <span class="price">{{ cnyTotal ? cnyTotal : 0 }} CNY</span>
                </el-col>
              </el-row>
              <p class="prompt clearfix" v-if="isqihuo">
                <span class="pull-right"
                  >可用资金:{{
                    $route.query.code.length === 5
                      ? $store.state.userInfo.enableHmt
                      : $store.state.userInfo.enableAmt
                  }}元</span
                >
              </p>

              <!-- <el-row class="buy-item text-center" style="font-size:12px;">
                <el-checkbox
                  class="check-box"
                  v-model="agree"
                  name="type"
                ></el-checkbox>
                我同意<a href="javascript:;" @click="tradeDialogVisible = true"
                  >《{{ siteInfo.tradeAgreeTitle }}》</a
                >
              </el-row> -->
            </div>
          </el-form>
          <div>
            <el-button
              :loading="loadingBtn"
              class="buy-button"
              type="primary"
              @click="onSubmit('ruleForm')"
              >下单
            </el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="分仓交易"
        name="two"
        v-if="$store.state.productSetting.fundsDisplay"
      >
        <!-- 买 -->
        <div class="buy-box">
          <el-form
            ref="fundsForm"
            :hide-required-asterisk="true"
            size="mini"
            :model="form"
            :rules="ruleFunds"
            label-width="60px"
          >
            <div class="buy-item">
              <span class="buy-name">{{ detail.name }}</span
              ><span class="buy-code">{{ detail.code }}</span>
            </div>
            <el-row class="buy-item">
              <el-col :span="12">
                现价：<span
                  :class="
                    detail.hcrate < 0
                      ? 'green price'
                      : detail.hcrate > 0
                      ? 'red price'
                      : 'price'
                  "
                  >{{ detail.nowPrice }}</span
                >
              </el-col>
              <el-col :span="12">
                涨跌幅：<span
                  :class="
                    detail.hcrate < 0
                      ? 'green price'
                      : detail.hcrate > 0
                      ? 'red price'
                      : 'price'
                  "
                  >{{ Number(detail.hcrate).toFixed(3) }}%</span
                >
              </el-col>
            </el-row>
            <div>
              <el-form-item
                label="账户"
                prop="subaccountNumber"
                style="margin-bottom:10px;"
              >
                <el-input
                  placeholder="子账户"
                  v-model="form.subaccountNumber"
                  readonly="readonly"
                  class="input-with-select"
                >
                  <el-select
                    v-model="form.subaccountNumber"
                    title="点击选择子账户"
                    slot="prepend"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="i in subaccountList"
                      :key="i.subaccountNumber"
                      :label="i.subaccountNumber"
                      :value="i.subaccountNumber"
                    ></el-option>
                  </el-select>
                  <el-button slot="append">子</el-button>
                </el-input>
              </el-form-item>
              <el-form-item
                label="手数"
                prop="buyNum"
                style="margin-bottom:10px;"
              >
                <el-input
                  placeholder="手数"
                  v-model="form.buyNum"
                  class="input-with-select"
                >
                  <el-select
                    v-model="form.buyNum"
                    title="点击选择手数"
                    slot="prepend"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="i in buyNumList"
                      :key="i.value"
                      :label="i.label"
                      :value="i.value"
                    ></el-option>
                  </el-select>
                  <el-button slot="append">手</el-button>
                </el-input>
              </el-form-item>
              <!-- <el-form-item label="杠杆" prop="buyNum" style="margin-bottom:10px;">
                <el-input placeholder="杠杆" v-model="form.lever" :readonly="true" class="input-with-select">
                  <el-select v-model="form.lever" title="点击选择杠杆" slot="prepend" placeholder="请选择">
                    <el-option v-for="i in siteLeverList" :key="i.value" :label="i.label" :value="i.value"></el-option>
                  </el-select>
                  <el-button slot="append">倍</el-button>
                </el-input>
              </el-form-item> -->
              <p class="prompt clearfix">
                <span class="pull-left"
                  >最小购买{{ Number(settingInfo.buyMinNum) / 100 }}手</span
                >
                <span class="pull-right"
                  >最大可购买{{ Number(settingInfo.buyMaxNum) / 100 }}手</span
                >
              </p>
              <el-form-item label="方向" prop="buyType">
                <el-radio-group v-model="form.buyType">
                  <el-radio label="买涨" value="0"></el-radio>
                  <el-radio label="买跌" value="1"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-row class="buy-item" v-if="!isqihuo">
                <el-col :span="8"> {{ form.buyNum * 100 }}股 </el-col>
                <el-col class="text-right" :span="16">
                  市值：{{ price }}元
                </el-col>
              </el-row>
              <el-row class="buy-item" v-if="isgupiao">
                <el-col :span="12">
                  保证金：<span class="price">{{
                    form.lever ? (price / form.lever).toFixed(2) : 0
                  }}</span>
                </el-col>
                <el-col :span="12">
                  <span class="prompt pull-right"
                    >最小购买{{ settingInfo.buyMinAmt }}元</span
                  >
                </el-col>
              </el-row>
              <el-row class="buy-item" v-if="isgupiao">
                <el-col :span="24">
                  总手续费：<span class="price">{{
                    poundage ? poundage : 0
                  }}</span>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="
                      '总手续费 = 买入手续费（' +
                        (settingInfo.buyFee * 100).toFixed(2) +
                        '%）+ 印花税（' +
                        (settingInfo.dutyFee * 100).toFixed(2) +
                        '%） + 点差费（' +
                        (settingSpreadRate.spreadRate * 100).toFixed(2) +
                        '%）'
                    "
                    placement="bottom-end"
                  >
                    <i class="iconfont icon-xiangqing"></i>
                  </el-tooltip>
                </el-col>
              </el-row>
              <el-row class="buy-item" v-if="!isqihuo">
                <el-col :span="12">
                  需要支付：<span class="price">{{ total ? total : 0 }}</span>
                </el-col>
                <el-col :span="12">
                  <span class="prompt pull-right"
                    >可用资金:{{
                      $route.query.code.length === 5
                        ? $store.state.userInfo.enableHmt
                        : $store.state.userInfo.enableAmt
                    }}元</span
                  >
                </el-col>
              </el-row>
              <el-row class="buy-item" v-if="isqihuo">
                <el-col :span="24">
                  需要支付：<span class="price"
                    >{{ total ? total : 0 }} {{ futuresInfo.coinCode }}</span
                  >
                  ≈ <span class="price">{{ cnyTotal ? cnyTotal : 0 }} CNY</span>
                </el-col>
              </el-row>
              <p class="prompt clearfix" v-if="isqihuo">
                <span class="pull-right"
                  >可用资金:{{
                    $route.query.code.length === 5
                      ? $store.state.userInfo.enableHmt
                      : $store.state.userInfo.enableAmt
                  }}元</span
                >
              </p>

              <el-row class="buy-item text-center" style="font-size:12px;">
                <el-checkbox
                  class="check-box"
                  v-model="agree"
                  name="type"
                ></el-checkbox>
                我同意<a href="javascript:;" @click="tradeDialogVisible = true"
                  >《{{ siteInfo.tradeAgreeTitle }}》</a
                >
              </el-row>
            </div>
          </el-form>
          <div>
            <el-button
              :loading="loadingBtn"
              class="buy-button"
              type="primary"
              @click="onFundsSubmit('fundsForm')"
              >下单
            </el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :title="siteInfo.tradeAgreeTitle"
      class="agree-dialog"
      :center="true"
      :visible.sync="tradeDialogVisible"
      width="80%"
    >
      <div class="dialog-iframe">
        <div
          class="content"
          style="margin:20px;background:#fff;border-radius:5px;margin-top:60px;line-height:200%;"
        >
          <p v-for="item in tradeAgreeText.split('。')" :key="item">
            {{ item }}。
          </p>
        </div>
        <!-- <iframe class="iframe-box" :src="$store.state.siteInfo.tradeAgree" frameborder="0"></iframe> -->
        <div slot="footer" class="text-center dialog-footer clearfix">
          <el-button type="primary" @click="agreeTrade"
            >我已阅读并同意{{ siteInfo.tradeAgreeTitle }}</el-button
          >
        </div>
      </div>
    </el-dialog>
    <BuyFutures
      :handleOptions3="handleOptions3"
      :futuresInfo="futuresInfo"
      ref="futuresDialog"
    />
  </div>
</template>

<script>
import * as api from "../../../axios/api";
import BuyFutures from "./futuresbuy-dialog";

export default {
  components: {
    BuyFutures
  },
  props: {
    // settingInfo:{
    //     type:Object,
    //     default(){
    //        return {
    //             buyMinAmt:'',
    //             buyMinNum:'',
    //             buyMaxNum:'',
    //        }
    //     }
    // },
    handleOptions2: {
      type: Function,
      default: function() {}
    },
    handleOptions3: {
      type: Function,
      default: function() {}
    },
    handleOptions5: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      tradeDialogVisible: false, //
      loading: false,
      detail: "", // 当前股票的详情
      activeName: "first",
      tradeAgreeText: "",
      list: [
        { name: "卖五", price: "", volumes: "" },
        { name: "卖四", price: "", volumes: "" },
        { name: "卖三", price: "", volumes: "" },
        { name: "卖二", price: "", volumes: "" },
        { name: "卖一", price: "", volumes: "" }
      ],
      listbuy: [
        { name: "买一", price: "", volumes: "" },
        { name: "买二", price: "", volumes: "" },
        { name: "买三", price: "", volumes: "" },
        { name: "买四", price: "", volumes: "" },
        { name: "买五", price: "", volumes: "" }
      ],
      buyNumList: [{ label: "50手", value: 50 }],
      siteLeverList: [],
      form: {
        buyNum: "",
        buyType: "",
        lever: "",
        subaccountNumber: ""
      },
      rule: {
        buyNum: [
          { required: true, message: "请输入或选择买入手数", trigger: "blur" }
        ],
        buyType: [
          { required: true, message: "请选择买卖方向", trigger: "blur" }
        ]
      },
      ruleFunds: {
        subaccountNumber: [
          { required: true, message: "请选择子账户", trigger: "blur" }
        ],
        buyNum: [
          { required: true, message: "请输入或选择买入手数", trigger: "blur" }
        ],
        buyType: [
          { required: true, message: "请选择买卖方向", trigger: "blur" }
        ]
      },

      settingInfo: {}, // 设置信息
      agree: true, // 协议
      buyNumber: 0, // 下单次数
      loadingBtn: false,
      futuresInfo: {}, // 期货信息
      settingSpreadRate: { spreadRate: 0 },
      isqihuo: false,
      isgupiao: false,
      exchangeNumber: "",
      subaccountList: {}
    };
  },
  watch: {
    change(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getSettingInfo();
        this.getDetail(); // 分时数据
      }
      if (!newVal) {
        clearInterval(this.timer);
      }
    }
  },
  computed: {
    poundage() {
      //手续费= 买入手续费+印花税+点差费
      if (this.form.buyNum) {
        let payfee = (this.detail.nowPrice * this.form.buyNum * 100).toFixed(2);
        return (
          payfee * this.settingInfo.buyFee +
          payfee * this.settingInfo.dutyFee +
          payfee * this.settingSpreadRate.spreadRate
        ).toFixed(2);
        //+ (payfee * this.settingInfo.dutyFee).toFixed(2) + (payfee * this.settingSpreadRate.spreadRate).toFixed(2)
      } else {
        return 0;
      }
    },
    total() {
      if (this.form.buyNum) {
        if (this.$route.query.code.indexOf("hf_") != -1) {
          return this.form.lever
            ? (
                (this.detail.depositAmt * this.form.buyNum) /
                this.form.lever
              ).toFixed(2)
            : 0;
        } else if (
          this.$route.query.code.indexOf("sh") != -1 ||
          this.$route.query.code.indexOf("sz") != -1
        ) {
          return this.form.lever
            ? (
                (this.detail.depositAmt * this.form.buyNum) /
                this.form.lever
              ).toFixed(2)
            : 0;
        } else {
          if (
            this.settingSpreadRate == undefined ||
            this.settingSpreadRate.spreadRate == undefined
          ) {
            this.settingSpreadRate.spreadRate = 0;
          }
          let payfee = this.form.lever
            ? (this.detail.nowPrice * this.form.buyNum * 100) / this.form.lever
            : 0; //  this.form.lever
          return (
            payfee +
            payfee * this.settingInfo.buyFee +
            payfee * this.settingInfo.dutyFee +
            payfee * this.settingSpreadRate.spreadRate
          ).toFixed(2);
        }
      } else {
        return 0;
      }
      // 需支付总价 = 现价 * 股（1手 = 100股）/ 杠杆倍数
    },
    cnyTotal() {
      // 价钱 * 汇率 转为 人民币
      return (this.total * this.exchangeNumber).toFixed(2);
    },
    price() {
      if (this.form.buyNum) {
        return (this.detail.nowPrice * this.form.buyNum * 100).toFixed(2);
      } else {
        return 0;
      }
      // 市值价 = 现价 * 股（1手 = 100股）
    },
    change() {
      return this.$route.query.code;
    }
  },
  created() {
    this.timer = setInterval(this.getDetail, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  mounted() {
    this.getDetail();
    this.getSettingInfo();
    this.getInfoSite();
    this.getUserSubaccount();
  },
  methods: {
    async queryExchange() {
      // 基币汇率
      let data = await api.queryExchange({
        coinCode: this.futuresInfo.coinCode
      });
      if (data.status === 0) {
        // 成功
        this.exchangeNumber = data.data;
      } else {
        Toast(data.msg);
      }
    },
    async getDetail() {
      let data;
      if (this.$route.query.code.indexOf("hf_") != -1) {
        this.isqihuo = true;
        this.isgupiao = false;
      } else if (
        this.$route.query.code.indexOf("sh") != -1 ||
        this.$route.query.code.indexOf("sz") != -1
      ) {
        this.isqihuo = false;
        this.isgupiao = false;
      } else {
        this.isgupiao = true;
        this.isqihuo = false;
      }
      if (this.$route.query.futuresInfo != undefined) {
        this.futuresInfo = this.$route.query.futuresInfo;
        this.queryExchange(); // 获取当前基币汇率
      }
      let opts = {
        code: this.$route.query.code
      };
      if (this.$route.query.code.length === 5) {
        data = await api.getSingleStockGg(opts);
      } else {
        data = await api.getSingleStock(opts);
      }

      if (data && data.status === 0) {
        this.detail = data.data;
        // 卖
        const list = this.list;
        list[0].price = data.data.sell5;
        list[1].price = data.data.sell4;
        list[2].price = data.data.sell3;
        list[3].price = data.data.sell2;
        list[4].price = data.data.sell1;
        list[0].volumes = data.data.sell5_num;
        list[1].volumes = data.data.sell4_num;
        list[2].volumes = data.data.sell3_num;
        list[3].volumes = data.data.sell2_num;
        list[4].volumes = data.data.sell1_num;
        this.list = [...list];
        // 买
        const listbuy = this.listbuy;
        listbuy[0].price = data.data.buy1;
        listbuy[1].price = data.data.buy2;
        listbuy[2].price = data.data.buy3;
        listbuy[3].price = data.data.buy4;
        listbuy[4].price = data.data.buy5;
        listbuy[0].volumes = data.data.buy1_num;
        listbuy[1].volumes = data.data.buy2_num;
        listbuy[2].volumes = data.data.buy3_num;
        listbuy[3].volumes = data.data.buy4_num;
        listbuy[4].volumes = data.data.buy5_num;
        this.listbuy = [...listbuy];
        if (
          this.$route.query.code.indexOf("hf_") == -1 &&
          this.$route.query.code.indexOf("sh") == -1 &&
          this.$route.query.code.indexOf("sz") == -1
        ) {
          this.findSpreadRateOne();
        }
      } else {
        this.$message.error(data.msg);
      }
    },
    async getInfoSite() {
      // 获取网站信息
      let result = await api.getInfoSite();
      if (result.status === 0) {
        this.siteInfo = result.data;
        this.tradeAgreeText = this.siteInfo.tradeAgreeText;
      } else {
        this.$message.error(result.msg);
      }
    },
    async getUserSubaccount() {
      // 用户操盘中子账户
      let result = await api.getUserSubaccount();
      if (result.status === 0) {
        if (result.data.list.length > 0) {
          this.subaccountList = result.data.list;
          if (
            this.$route.query.sub != undefined &&
            this.$route.query.sub != ""
          ) {
            this.form.subaccountNumber = this.$route.query.sub;
          } else {
            this.form.subaccountNumber = this.subaccountList[0].subaccountNumber;
          }
        }
      } else {
        this.$message.error(result.msg);
      }
    },
    async findSpreadRateOne() {
      // 查询点差费率
      let opts = {
        applies: this.detail.hcrate, // 涨跌幅
        turnover: this.total, //成交额
        unitprice: this.detail.nowPrice, //股票单价
        code: this.$route.query.code
      };
      let data = await api.findSpreadRateOne(opts);
      if (data.status === 0) {
        // 成功
        if (data.data != undefined) {
          this.settingSpreadRate = data.data;
        }
        console.log(this.settingSpreadRate);
      } else {
        this.$message.error(data.msg);
      }
    },
    async getSettingInfo() {
      let data;
      // 网站设置信息
      if (this.$route.query.code.length === 5) {
        data = await api.getSettingHk();
      } else {
        data = await api.getSetting();
      }
      if (data.status === 0) {
        // 成功
        this.settingInfo = data.data;
        // 杠杆倍数，如果登录并且有代理先走代理设置杠杆
        if (
          this.$store.state.userInfo !== undefined &&
          this.$store.state.userInfo !== null &&
          this.$store.state.userInfo.phone !== "" &&
          this.$store.state.userInfo.siteLever !== null
        ) {
          this.form.lever = this.$store.state.userInfo.siteLever.split("/")[0];
          this.siteLeverList = [];
          for (
            let i = 0;
            i < this.$store.state.userInfo.siteLever.split("/").length;
            i++
          ) {
            let val = this.$store.state.userInfo.siteLever.split("/")[i];
            let item = { label: val + "倍", value: val };
            this.siteLeverList.push(item);
          }
        } else {
          this.form.lever = data.data.siteLever.split("/")[0];
          this.siteLeverList = [];
          for (let i = 0; i < data.data.siteLever.split("/").length; i++) {
            let val = data.data.siteLever.split("/")[i];
            let item = { label: val + "倍", value: val };
            this.siteLeverList.push(item);
          }
        }

        this.buyNumList = [];
        for (let i = 0; i < 10; i++) {
          if (i === 0 || i % 2 === 1) {
            let val = data.data.buyMinNum * i + data.data.buyMinNum;
            let item = { label: val / 100 + "手", value: val / 100 };
            this.buyNumList.push(item);
          }
        }
      } else {
        this.$message.error(data.msg);
      }
    },
    onSubmit(formName) {
      // 先判断是否登录
      if (!this.$store.state.haslogin) {
        this.$store.state.loginIsShow = true;
        this.$message.error("请先登录");
        return;
      }
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (!this.agree) {
            this.$message.error("阅读并同意注册协议才能下单");
            return;
          }
          this.loadingBtn = true;
          if (this.$route.query.code.indexOf("hf_") != -1) {
            //期货买入
            let opts = {
              FuturesId: this.detail.id,
              buyNum: this.form.buyNum ? this.form.buyNum : 0,
              buyType: this.form.buyType === "买涨" ? 0 : 1,
              lever: this.form.lever ? this.form.lever : 0
            };
            let data = await api.buyFutures(opts);
            if (data.status === 0) {
              this.buyNumber++;
              // this.handleOptions3(this.buyNumber)
              this.$message.success(data.data);
              this.getUserInfo(); // 刷新
            } else {
              this.$message.error(data.msg);
            }
          } else if (
            this.$route.query.code.indexOf("sh") != -1 ||
            this.$route.query.code.indexOf("sz") != -1
          ) {
            //指数买入
            let opts = {
              indexId: this.detail.id,
              buyNum: this.form.buyNum ? this.form.buyNum : 0,
              buyType: this.form.buyType === "买涨" ? 0 : 1,
              lever: this.form.lever ? this.form.lever : 0
            };
            this.loadingBtn = true;
            let data = await api.indexBuy(opts);
            if (data.status === 0) {
              this.buyNumber++;
              // this.handleOptions2(this.buyNumber)
              this.$message.success(data.data);
              this.getUserInfo(); // 刷新
            } else {
              this.$message.error(data.msg);
            }
          } else if (this.$route.query.code.length === 5) {
            // 港股买入
            let opts = {
              stockId: this.detail.id,
              buyNum: this.form.buyNum ? this.form.buyNum * 100 : 0,
              buyType: this.form.buyType === "买涨" ? 0 : 1,
              lever: this.form.lever
            };
            let data = await api.buyGg(opts);
            if (data.status === 0) {
              this.buyNumber++;
              this.handleOptions5(this.buyNumber);
              this.getUserInfo();
              this.$message.success(data.data);
            } else {
              this.$message.error(data.msg);
            }
          } else {
            // 股票买入
            let opts = {
              stockId: this.detail.id,
              buyNum: this.form.buyNum ? this.form.buyNum * 100 : 0,
              buyType: this.form.buyType === "买涨" ? 0 : 1,
              lever: this.form.lever
            };
            let data = await api.buy(opts);
            if (data.status === 0) {
              this.buyNumber++;
              this.handleOptions2(this.buyNumber);
              this.getUserInfo();
              this.$message.success(data.data);
            } else {
              this.$message.error(data.msg);
            }
          }

          this.loadingBtn = false;
        }
      });
    },
    onFundsSubmit(formName) {
      // 先判断是否登录
      if (!this.$store.state.haslogin) {
        this.$store.state.loginIsShow = true;
        this.$message.error("请先登录");
        return;
      }
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (!this.agree) {
            this.$message.error("阅读并同意注册协议才能下单");
            return;
          }
          this.loadingBtn = true;

          // 股票买入
          let opts = {
            stockId: this.detail.id,
            buyNum: this.form.buyNum ? this.form.buyNum * 100 : 0,
            buyType: this.form.buyType === "买涨" ? 0 : 1,
            lever: this.form.lever,
            subaccountNumber: this.form.subaccountNumber
          };
          let data = await api.buyFunds(opts);
          if (data.status === 0) {
            this.buyNumber++;
            this.handleOptions2(this.buyNumber);
            this.getUserInfo();
            this.$message.success(data.data);
          } else {
            this.$message.error(data.msg);
          }

          this.loadingBtn = false;
        }
      });
    },
    async getUserInfo() {
      // 获取用户信息
      let data = await api.getUserInfo();
      if (data.status === 0) {
        this.$store.state.userInfo = data.data;
      } else {
        this.$message.error(data.msg);
      }
    },
    async getOpation() {
      // 获取是不是已添加自选
      let opts = {
        code: this.$route.query.code
      };
      let data = await api.isOption(opts);
      if (data.status === 0) {
        // 0 --> 未添加
        this.isOptionOpt = false;
      } else {
        this.isOptionOpt = true;
      }
    },
    agreeTrade() {
      // 同意注册协议协议
      this.agree = true;
      this.tradeDialogVisible = false;
    },
    toTransaction3(row, column, event) {
      row.nowPrice = this.detail.nowPrice;
      // 期货交易 先判断是否登录
      if (this.$store.state.haslogin) {
        if (+row.transState === 1) {
          this.futuresInfo = row;
          this.$refs.futuresDialog.DialogVisible = true;
        } else {
          this.$message.error("该期货暂不能交易!");
        }
      } else {
        this.$store.state.loginIsShow = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.nowprice-box {
  height: 40px;
  line-height: 38px;
  color: #8b97b0;

  .price {
    font-size: 16px;
  }
}

.transaction-table .buy-table {
  /deep/ th.is-leaf {
    display: none;
  }
}

.buy-box {
  .buy-item {
    margin-bottom: 10px;

    .price {
      font-size: 16px;
    }
  }

  .prompt {
    font-size: 12px;
    color: #606266;
    margin-bottom: 10px;
  }

  .buy-name {
    font-size: 16px;
    color: #efbb53;
  }

  .buy-code {
    color: #4c5770;
    font-size: 12px;
    margin-left: 10px;
  }

  .buy-button {
    width: 100%;
  }

  .check-box {
    margin-right: 10px;
  }

  /deep/ .el-form-item__label {
    color: #8b97b0;
    text-align: left;
  }

  // 涨
  /deep/ .el-radio__input.is-checked + .el-radio__label {
    color: #c11815;
  }

  /deep/ .el-radio__input.is-checked .el-radio__inner {
    border-color: #c11815;
    background: #c11815;
  }

  /deep/ .el-radio {
    color: #8b97b0;
  }
}

.dialog-iframe {
  .iframe-box {
    width: 100%;
    height: 460px;
  }

  .dialog-footer {
    //  height: 300px;
    margin-top: 20px;
  }
}
</style>
