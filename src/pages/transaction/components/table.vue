<template>
  <div>
    <el-tabs style="margin-top:0px;" v-model="activeName" class="black-style">
      <el-tab-pane
        v-if="$store.state.productSetting.indexDisplay"
        label="指数"
        name="three"
      >
        <div class="table transaction-table">
          <!-- <div class="table-search">
            <el-row type="flex" justify='end'>
              <el-col :span="24">
                <el-input size="mini" clearable v-model="form.stock" placeholder="请输入股票代码和股票">
                  <el-button size="mini" @click="getList" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
            </el-row>
          </div> -->
          <el-table
            stripe
            v-loading="loading"
            :data="list.list"
            @row-click="toTransaction2"
            height="800"
            style="width: 100%"
          >
            <el-table-column prop="indexName" label="名称">
              <template slot-scope="scope">
                <div class="tab-name">
                  <p>{{ scope.row.indexName }}</p>
                  <span class="code">
                    <i
                      v-if="scope.row.transState === 1"
                      class="iconfont icon-jiaoyi1 red"
                    ></i>
                    <i
                      v-if="scope.row.transState === 0"
                      class="iconfont icon-jinzhi"
                    ></i>
                    {{ scope.row.indexCode }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="nowPrice" align="right" label="最新">
              <template slot-scope="scope">
                <div class="price">
                  <div
                    :class="
                      scope.row.floatRate < 0
                        ? 'green'
                        : scope.row.floatRate == 0
                        ? ''
                        : 'red'
                    "
                  >
                    <span v-if="scope.row.currentPoint === 0">-</span>
                    <span v-else>{{
                      Number(scope.row.currentPoint).toFixed(2)
                    }}</span>
                    <i
                      v-if="scope.row.floatRate > 0"
                      class="iconfont icon-up"
                    ></i>
                    <i
                      v-if="scope.row.floatRate < 0"
                      class="iconfont icon-down"
                    ></i>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="floatRate" align="right" label="涨跌幅">
              <template slot-scope="scope">
                <div class="price">
                  <div
                    :class="
                      scope.row.floatRate < 0
                        ? 'green'
                        : scope.row.floatRate == 0
                        ? ''
                        : 'red'
                    "
                  >
                    <span v-if="scope.row.floatRate === 0">-</span>
                    <span v-else
                      >{{ Number(scope.row.floatRate).toFixed(2) }}%</span
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="page-box text-center">
              <a @click="toStock" class="more-btn" href="javascript:;">
                加载更多
                <i class="iconfont icon-xiasanjiao"></i>
              </a>
          </div> -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="股票" name="first">
        <div class="table transaction-table">
          <div class="table-search">
            <el-row type="flex" justify="end">
              <el-col :span="24">
                <el-input
                  size="mini"
                  clearable
                  v-model="form.stock"
                  placeholder="请输入股票代码和股票"
                >
                  <el-button
                    size="mini"
                    @click="getList"
                    slot="append"
                    icon="el-icon-search"
                  ></el-button>
                </el-input>
              </el-col>
            </el-row>
          </div>
          <el-table
            stripe
            v-loading="loading"
            :data="list.list"
            @row-click="toTransaction"
            height="725"
            style="width: 100%"
          >
            <el-table-column prop="name" label="名称">
              <template slot-scope="scope">
                <div class="tab-name">
                  <p>{{ scope.row.name }}</p>
                  <span class="code">
                    <i
                      v-if="scope.row.stock_plate === '科创'"
                      class="iconfont kechuang-stock"
                      >科创</i
                    >
                    <i
                      v-else-if="scope.row.stock_type === 'sh'"
                      class="iconfont hu-stock"
                      >沪</i
                    >
                    <i
                      v-else-if="scope.row.stock_type === 'sz'"
                      class="iconfont shen-stock"
                      >深</i
                    >
                    {{ scope.row.code }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="nowPrice" align="right" label="现价">
              <template slot-scope="scope">
                <div class="price">
                  <div
                    :class="
                      scope.row.hcrate < 0
                        ? 'green'
                        : scope.row.hcrate == 0
                        ? ''
                        : 'red'
                    "
                  >
                    <span v-if="scope.row.nowPrice === 0">-</span>
                    <span v-else>
                      {{ Number(scope.row.nowPrice).toFixed(2) }}
                      <i
                        v-if="scope.row.hcrate > 0"
                        class="iconfont icon-up"
                      ></i>
                      <i
                        v-if="scope.row.hcrate < 0"
                        class="iconfont icon-down"
                      ></i>
                    </span>
                  </div>
                </div>
                <!-- <div v-if="scope.row.now_price" :class="changeTextClass[scope.$index] === true?'heartBeat  tab-number':' tab-number'">
                  <p :class="scope.row.now_price - scope.row.buyOrderPrice < 0?'green bounceIn':scope.row.now_price - scope.row.buyOrderPrice > 0?'bounceIn red':'bounceIn'">
                    {{scope.row.now_price === 0?'-':scope.row.now_price}}
                  </p>
                </div> -->
              </template>
            </el-table-column>
            <el-table-column prop="hcrate" align="right" label="涨跌幅">
              <template slot-scope="scope">
                <div class="price">
                  <div
                    :class="
                      scope.row.hcrate < 0
                        ? 'green'
                        : scope.row.hcrate == 0
                        ? ''
                        : 'red'
                    "
                  >
                    <span v-if="scope.row.nowPrice === 0">-</span>
                    <span v-else
                      >{{ Number(scope.row.hcrate).toFixed(2) }}%</span
                    >
                    <!-- <i v-if="scope.row.hcrate>0" class="iconfont icon-up"></i>
                    <i v-if="scope.row.hcrate<0" class="iconfont icon-down"></i> -->
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="page-box text-center">
            <a @click="toStock" class="more-btn" href="javascript:;">
              加载更多
              <i class="iconfont icon-xiasanjiao"></i>
            </a>
            <!-- <el-pagination
            class="pull-right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="list.pageNum"
                :page-sizes="[10, 20, 30, 40,50]"
                :page-size="list.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="list.total">
              </el-pagination> -->
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="港股" name="six">
        <div class="table transaction-table">
          <div class="table-search">
            <el-row type="flex" justify="end">
              <el-col :span="24">
                <el-input
                  size="mini"
                  clearable
                  v-model="form.stock"
                  placeholder="请输入股票代码和股票"
                >
                  <el-button
                    size="mini"
                    @click="getList"
                    slot="append"
                    icon="el-icon-search"
                  ></el-button>
                </el-input>
              </el-col>
            </el-row>
          </div>
          <el-table
            stripe
            v-loading="loading"
            :data="list.list"
            @row-click="toTransactionGg"
            height="725"
            style="width: 100%"
          >
            <el-table-column prop="name" label="名称">
              <template slot-scope="scope">
                <div class="tab-name">
                  <p>{{ scope.row.name }}</p>
                  <span class="code">
                    <i
                      v-if="scope.row.stock_plate === '科创'"
                      class="iconfont kechuang-stock"
                      >科创</i
                    >
                    <i
                      v-else-if="scope.row.stock_type === 'sh'"
                      class="iconfont hu-stock"
                      >沪</i
                    >
                    <i
                      v-else-if="scope.row.stock_type === 'sz'"
                      class="iconfont shen-stock"
                      >深</i
                    >
                    <i
                      v-else-if="scope.row.stock_type === 'HK'"
                      class="iconfont gang-stock"
                      >港</i
                    >
                    {{ scope.row.code }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="nowPrice" align="right" label="现价">
              <template slot-scope="scope">
                <div class="price">
                  <div
                    :class="
                      scope.row.hcrate < 0
                        ? 'green'
                        : scope.row.hcrate == 0
                        ? ''
                        : 'red'
                    "
                  >
                    <span v-if="scope.row.nowPrice === 0">-</span>
                    <span v-else>
                      {{ Number(scope.row.nowPrice).toFixed(2) }}
                      <i
                        v-if="scope.row.hcrate > 0"
                        class="iconfont icon-up"
                      ></i>
                      <i
                        v-if="scope.row.hcrate < 0"
                        class="iconfont icon-down"
                      ></i>
                    </span>
                  </div>
                </div>
                <!-- <div v-if="scope.row.now_price" :class="changeTextClass[scope.$index] === true?'heartBeat  tab-number':' tab-number'">
                  <p :class="scope.row.now_price - scope.row.buyOrderPrice < 0?'green bounceIn':scope.row.now_price - scope.row.buyOrderPrice > 0?'bounceIn red':'bounceIn'">
                    {{scope.row.now_price === 0?'-':scope.row.now_price}}
                  </p>
                </div> -->
              </template>
            </el-table-column>
            <el-table-column prop="hcrate" align="right" label="涨跌幅">
              <template slot-scope="scope">
                <div class="price">
                  <div
                    :class="
                      scope.row.hcrate < 0
                        ? 'green'
                        : scope.row.hcrate == 0
                        ? ''
                        : 'red'
                    "
                  >
                    <span v-if="scope.row.nowPrice === 0">-</span>
                    <span v-else
                      >{{ Number(scope.row.hcrate).toFixed(2) }}%</span
                    >
                    <!-- <i v-if="scope.row.hcrate>0" class="iconfont icon-up"></i>
                    <i v-if="scope.row.hcrate<0" class="iconfont icon-down"></i> -->
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="page-box text-center">
            <a @click="toStock" class="more-btn" href="javascript:;">
              加载更多
              <i class="iconfont icon-xiasanjiao"></i>
            </a>
            <!-- <el-pagination
            class="pull-right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="list.pageNum"
                :page-sizes="[10, 20, 30, 40,50]"
                :page-size="list.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="list.total">
              </el-pagination> -->
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-if="$store.state.productSetting.kcStockDisplay"
        label="科创"
        name="four"
      >
        <div class="table transaction-table">
          <!-- <div class="table-search">
            <el-row type="flex" justify='end'>
              <el-col :span="24">
                <el-input size="mini" clearable v-model="form.stock" placeholder="请输入股票代码和股票">
                  <el-button size="mini" @click="getList" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
            </el-row>
          </div> -->
          <el-table
            stripe
            v-loading="loading"
            :data="list.list"
            @row-click="toTransaction"
            height="725"
            style="width: 100%"
          >
            <el-table-column prop="name" label="名称">
              <template slot-scope="scope">
                <div class="tab-name">
                  <p>{{ scope.row.name }}</p>
                  <span class="code">
                    <i
                      v-if="scope.row.stock_plate === '科创'"
                      class="iconfont kechuang-stock"
                      >科创</i
                    >
                    {{ scope.row.code }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="nowPrice" align="right" label="现价">
              <template slot-scope="scope">
                <div class="price">
                  <div
                    :class="
                      scope.row.hcrate < 0
                        ? 'green'
                        : scope.row.hcrate == 0
                        ? ''
                        : 'red'
                    "
                  >
                    <span v-if="scope.row.nowPrice === 0">-</span>
                    <span v-else>
                      {{ Number(scope.row.nowPrice).toFixed(2) }}
                      <i
                        v-if="scope.row.hcrate > 0"
                        class="iconfont icon-up"
                      ></i>
                      <i
                        v-if="scope.row.hcrate < 0"
                        class="iconfont icon-down"
                      ></i>
                    </span>
                  </div>
                </div>
                <!-- <div v-if="scope.row.now_price" :class="changeTextClass[scope.$index] === true?'heartBeat  tab-number':' tab-number'">
                  <p :class="scope.row.now_price - scope.row.buyOrderPrice < 0?'green bounceIn':scope.row.now_price - scope.row.buyOrderPrice > 0?'bounceIn red':'bounceIn'">
                    {{scope.row.now_price === 0?'-':scope.row.now_price}}
                  </p>
                </div> -->
              </template>
            </el-table-column>
            <el-table-column prop="hcrate" align="right" label="涨跌幅">
              <template slot-scope="scope">
                <div class="price">
                  <div
                    :class="
                      scope.row.hcrate < 0
                        ? 'green'
                        : scope.row.hcrate == 0
                        ? ''
                        : 'red'
                    "
                  >
                    <span v-if="scope.row.nowPrice === 0">-</span>
                    <span v-else
                      >{{ Number(scope.row.hcrate).toFixed(2) }}%</span
                    >
                    <!-- <i v-if="scope.row.hcrate>0" class="iconfont icon-up"></i>
                    <i v-if="scope.row.hcrate<0" class="iconfont icon-down"></i> -->
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="page-box text-center">
            <a @click="toStock" class="more-btn" href="javascript:;">
              加载更多
              <i class="iconfont icon-xiasanjiao"></i>
            </a>
            <!-- <el-pagination
            class="pull-right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="list.pageNum"
                :page-sizes="[10, 20, 30, 40,50]"
                :page-size="list.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="list.total">
              </el-pagination> -->
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane
        v-if="$store.state.haslogin"
        :label="$store.state.haslogin ? '自选' : ''"
        name="second"
      >
        <div v-show="$store.state.haslogin" class="table transaction-table">
          <div class="table-search">
            <el-row type="flex" justify="end">
              <el-col :span="24">
                <el-input
                  size="mini"
                  clearable
                  v-model="form2.stockMy"
                  placeholder="请输入股票代码和股票"
                >
                  <el-button
                    size="mini"
                    @click="getList"
                    slot="append"
                    icon="el-icon-search"
                  ></el-button>
                </el-input>
              </el-col>
            </el-row>
          </div>
          <el-table
            stripe
            v-loading="loading"
            :data="list.list"
            @row-click="toTransaction"
            height="725"
            style="width: 100%"
          >
            <!-- <el-table-column
              prop="name"
              width="26px"
              v-if="$store.state.haslogin">
              <template slot-scope="scope">
                <a v-if="isOptionOpt" href="javascript:;" @click="deteleOptions"><i  class="iconfont icon-wujiaoxing"></i></a>
                <a v-if="!isOptionOpt" href="javascript:;" @click="addOptions"><i  class="iconfont icon-wujiaoxing2"></i></a>
              </template>
            </el-table-column> -->
            <el-table-column prop="stockName" label="名称">
              <template slot-scope="scope">
                <div class="tab-name">
                  <p>{{ scope.row.stockName }}</p>
                  <span class="code">
                    <i
                      v-if="scope.row.stock_plate === '科创'"
                      class="iconfont kechuang-stock"
                      >科创</i
                    >
                    <i
                      v-else-if="scope.row.stock_type === 'sh'"
                      class="iconfont hu-stock"
                      >沪</i
                    >
                    <i
                      v-else-if="scope.row.stock_type === 'sz'"
                      class="iconfont shen-stock"
                      >深</i
                    >
                    {{ scope.row.stockCode }}
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="nowPrice" align="right" label="现价">
              <template slot-scope="scope">
                <div class="price">
                  <div
                    :class="
                      scope.row.hcrate < 0
                        ? 'green'
                        : scope.row.hcrate == 0
                        ? ''
                        : 'red'
                    "
                  >
                    <span v-if="scope.row.nowPrice === 0">-</span>
                    <span v-else>{{
                      Number(scope.row.nowPrice).toFixed(2)
                    }}</span>
                    <i v-if="scope.row.hcrate > 0" class="iconfont icon-up"></i>
                    <i
                      v-if="scope.row.hcrate < 0"
                      class="iconfont icon-down"
                    ></i>
                  </div>
                </div>
                <!-- <div v-if="scope.row.now_price" :class="changeTextClass[scope.$index] === true?'heartBeat  tab-number':' tab-number'">
                  <p :class="scope.row.now_price - scope.row.buyOrderPrice < 0?'green bounceIn':scope.row.now_price - scope.row.buyOrderPrice > 0?'bounceIn red':'bounceIn'">
                    {{scope.row.now_price === 0?'-':scope.row.now_price}}
                  </p>
                </div> -->
              </template>
            </el-table-column>
            <el-table-column prop="hcrate" align="right" label="涨跌幅">
              <template slot-scope="scope">
                <div class="price">
                  <div
                    :class="
                      scope.row.hcrate < 0
                        ? 'green'
                        : scope.row.hcrate == 0
                        ? ''
                        : 'red'
                    "
                  >
                    <span v-if="scope.row.nowPrice === 0">-</span>
                    <span v-else
                      >{{ Number(scope.row.hcrate).toFixed(2) }}%</span
                    >
                    <!-- <i v-if="scope.row.hcrate>0" class="iconfont icon-up"></i>
                    <i v-if="scope.row.hcrate<0" class="iconfont icon-down"></i> -->
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="page-box text-center">
            <a @click="toStock" class="more-btn" href="javascript:;">
              加载更多
              <i class="iconfont icon-xiasanjiao"></i>
            </a>
            <!-- <el-pagination
            class="pull-right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="list.pageNum"
                :page-sizes="[10, 20, 30, 40,50]"
                :page-size="list.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="list.total">
              </el-pagination> -->
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        v-if="$store.state.productSetting.futuresDisplay"
        label="期货"
        name="five"
      >
        <div class="table transaction-table">
          <el-table
            stripe
            v-loading="loading"
            :data="list.list"
            @row-click="toTransaction5"
            height="800"
            style="width: 100%"
          >
            <el-table-column prop="futuresName" label="名称">
              <template slot-scope="scope">
                <div class="tab-name">
                  <p>{{ scope.row.futuresName }}</p>
                  <span class="qihuo-stock">{{ scope.row.futuresCode }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="nowPrice" align="right" label="最新">
              <template slot-scope="scope">
                <div class="price">
                  <div
                    :class="
                      scope.row.floatRate < 0
                        ? 'green'
                        : scope.row.floatRate == 0
                        ? ''
                        : 'red'
                    "
                  >
                    <span v-if="scope.row.nowPrice === 0">-</span>
                    <span v-else
                      >{{ Number(scope.row.nowPrice).toFixed(2) }}
                    </span>
                    <!-- {{scope.row.coinCode}} -->
                    <!-- <p class="code">{{(scope.row.nowPrice * scope.row.coinRate).toFixed(2)}} CNY</p> -->
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="page-box text-center">
              <a @click="toStock" class="more-btn" href="javascript:;">
                加载更多
                <i class="iconfont icon-xiasanjiao"></i>
              </a>
          </div> -->
        </div>
      </el-tab-pane>
    </el-tabs>
    <BuyIndex
      :handleOptions2="handleOptions2"
      :indexInfo="indexInfo"
      ref="buyDialog"
    />
    <BuyFutures
      :handleOptions3="handleOptions3"
      :futuresInfo="futuresInfo"
      ref="futuresDialog"
    />
  </div>
</template>

<script>
import * as api from "../../../axios/api";
import ChartBox from "./chart";
import BuyIndex from "./indexbuy-dialog";
import BuyFutures from "./futuresbuy-dialog";

export default {
  components: {
    ChartBox,
    BuyIndex,
    BuyFutures
  },
  props: {
    code: {
      type: String
    },
    handleOptions2: {
      type: Function,
      default: function() {}
    },
    handleOptions3: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      loading: false,
      form: {
        stock: "",
        stockMy: "",
        pageNum: 1,
        pageSize: 13
      },
      form2: {
        stockMy: "",
        pageNum: 1,
        pageSize: 13
      },
      list: {
        list: []
      },
      timer: null,
      refresh: false, // 刷新中
      changeTextClass: {}, // 表格中的数据变化
      isOptionOpt: false, // 是否添加自选
      activeName: "first",
      total: 0, // 总数
      indexInfo: {},
      futuresInfo: {} // 期货信息
    };
  },
  watch: {
    activeName(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.form.pageNum = 1;
        this.getList();
      }
    }
  },
  computed: {},
  created() {
    this.timer = setInterval(this.refreshList, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  mounted() {
    this.getList();
    if (this.$store.state.haslogin) {
      this.getOpation();
    }
    if (this.$route.query.type === "index") {
      this.activeName = "three";
    }
  },
  methods: {
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.getList();
    },
    async refreshList() {
      // 正在刷新或者正在加载的时候不进行刷新
      if (this.refresh || this.loading) {
        return;
      }

      this.refresh = true;
      this.changeTextClass = {};
      // 获取表格数据
      // let opt = {
      //     keyWords:this.activeName === 'first'?this.form.stock:this.form2.stockMy,
      //     pageNum:1,
      //     pageSize:this.form.pageSize * this.form.pageNum
      // }
      let opt = null;
      if (this.activeName === "first" || this.activeName === "six") {
        // 普通A股
        opt = {
          keyWords: this.form.stock,
          pageNum: 1,
          pageSize: this.form.pageSize * this.form.pageNum
        };
      } else if (this.activeName === "four") {
        // 科创
        opt = {
          stockPlate: "科创",
          keyWords: this.form.stock,
          pageNum: 1,
          pageSize: this.form.pageSize * this.form.pageNum
        };
      } else if (this.activeName === "three" || this.activeName === "five") {
        // 指数 期货
      } else {
        // 自选
        opt = {
          keyWords: this.form2.stockMy,
          pageNum: this.form2.pageNum,
          pageSize: this.form2.pageSize * this.form2.pageNum
        };
      }
      let data = null;
      if (this.activeName === "first" || this.activeName === "four") {
        data = await api.getStock(opt);
      } else if (this.activeName === "three") {
        // data = await api.getListMarket(opt);
      } else if (this.activeName === "five") {
        // 期货
        // data = await api.getFutures(opt);
      } else if (this.activeName === "six") {
        // 港股
        data = await api.getStockGg(opt);
      } else {
        data = await api.getMyList(opt);
      }
      this.refresh = false;
      if (data.status === 0) {
        if (this.activeName === "three" || this.activeName === "five") {
          this.list.list = data.data;
          return;
        }
        if (data.data.list.length === this.list.list.length) {
          data.data.list.forEach((element, i) => {
            this.changeTextClass[i] = "";
            if (data.data.list[i].nowPrice !== this.list.list[i].nowPrice) {
              this.changeTextClass[i] = true; // 设置对应的动画过滤
              this.list.list[i].nowPrice = data.data.list[i].nowPrice; // 现价
              this.list.list[i].hcrate = data.data.list[i].hcrate; // 涨跌幅
            }
          });
        } else {
          this.list = data.data;
        }
      } else {
        this.$message.error(data.msg);
      }
    },
    onSubmit() {
      // 查询表格
      // 正在刷新或者正在加载的时候 延迟
      if (this.refresh || this.loading) {
      } else {
        this.getList();
      }
    },
    async getList() {
      // 获取表格数据
      // let opt = {
      //     keyWords:this.activeName === 'first'?this.form.stock:this.form2.stockMy,
      //     pageNum:this.form.pageNum,
      //     pageSize:this.form.pageSize
      // }
      if (this.activeName === "three") {
        // 指数
        this.getMarketList();
        return;
      }
      if (this.activeName === "five") {
        // 期货
        this.getFutures();
        return;
      }
      let opt = null;
      if (this.activeName === "first" || this.activeName === "six") {
        // 普通A股
        opt = {
          keyWords: this.form.stock,
          pageNum: this.form.pageNum,
          pageSize: this.form.pageSize
        };
      } else if (this.activeName === "four") {
        // 科创板
        opt = {
          stockPlate: "科创",
          keyWords: this.form.stock,
          pageNum: this.form.pageNum,
          pageSize: this.form.pageSize
        };
      } else {
        // 自选
        opt = {
          keyWords: this.form2.stockMy,
          pageNum: this.form2.pageNum,
          pageSize: this.form2.pageSize
        };
      }
      this.loading = true;
      let data = null;
      if (this.activeName === "first" || this.activeName === "four") {
        data = await api.getStock(opt);
      } else if (this.activeName === "six") {
        data = await api.getStockGg(opt);
      } else {
        data = await api.getMyList(opt);
      }
      if (data.status === 0) {
        // data.data.list.forEach(element => {
        //     this.list.push(element)
        // });
        this.list = data.data;
        this.total = data.data.total;
      } else {
        this.$message.error(data.msg);
      }
      this.loading = false;
    },
    toTransaction(row, column, event) {
      let code =
        this.activeName === "first" || this.activeName === "four"
          ? row.code
          : row.stockCode;
      if (row.stockCode != undefined && row.stockGid.indexOf("hf_") != -1) {
        code = row.stockGid;
      } else if (
        row.stockCode !== undefined &&
        row.stockCode.substring(0, 3) == "000"
      ) {
        code = row.stockGid;
      }
      // 股票交易
      this.$router.push({
        path: "/transaction",
        query: {
          code: code
        }
      });
    },
    toTransactionGg(row, column, event) {
      // 港股交易
      this.$router.push({
        path: "/transaction",
        query: {
          code: row.code
        }
      });
    },
    // 期货2.0
    toTransaction5(row, column, event) {
      // 股票交易
      this.$router.push({
        path: "/transaction",
        query: {
          code: row.futuresGid,
          futuresInfo: row
        }
      });
    },
    async getMarketList() {
      // 获取指数列表
      this.loading = true;
      let result = await api.getListMarket();
      if (result.status === 0) {
        this.list.list = result.data;
      } else {
        this.$message.error(result.msg);
      }
      this.loading = false;
    },
    async getFutures() {
      // 获取期货列表
      this.loading = true;
      let result = await api.getFutures();
      if (result.status === 0) {
        this.list.list = result.data;
      } else {
        this.$message.error(result.msg);
      }
      this.loading = false;
    },
    toTransaction2(row, column, event) {
      // 指数交易
      if (this.$store.state.haslogin) {
        if (row.transState === 1) {
          // this.indexInfo = row
          // this.$refs.buyDialog.DialogVisible = true
          this.$router.push({
            path: "/transaction",
            query: {
              code: row.indexGid
            }
          });
        } else {
          this.$message.error("该指数暂不能交易!");
        }
      } else {
        this.$store.state.loginIsShow = true;
      }
    },
    toTransaction3(row) {
      // 期货交易 先判断是否登录
      if (this.$store.state.haslogin) {
        if (row.transState === 1) {
          this.futuresInfo = row;
          this.$refs.futuresDialog.DialogVisible = true;
        } else {
          this.$message.error("该期货暂不能交易!");
        }
      } else {
        this.$store.state.loginIsShow = true;
      }
    },
    async toStock() {
      // this.$router.push('/stock')
      // 查看更多
      if (this.form.pageNum * this.form.pageSize < this.total) {
        this.form.pageNum++;
        this.loading = true;
        let opt = null;
        if (this.activeName === "first" || this.activeName === "six") {
          opt = {
            keyWords: this.form.stock,
            pageNum: 1,
            pageSize: this.form.pageSize * this.form.pageNum
          };
        } else if (this.activeName === "four") {
          opt = {
            stockPlate: "科创",
            keyWords: this.form.stock,
            pageNum: 1,
            pageSize: this.form.pageSize * this.form.pageNum
          };
        } else {
          // 自选
          opt = {
            keyWords: this.form2.stockMy,
            pageNum: this.form2.pageNum,
            pageSize: this.form2.pageSize * this.form2.pageNum
          };
        }
        // let opt = {
        //     keyWords:this.activeName === 'first'?this.form.stock:this.form2.stockMy,
        //     pageNum:1,
        //     pageSize:this.form.pageSize * this.form.pageNum
        // }
        let data = null;
        if (this.activeName === "first" || this.activeName === "four") {
          data = await api.getStock(opt);
        } else if (this.activeName === "six") {
          data = await api.getStockGg(opt);
        } else {
          data = await api.getMyList(opt);
        }
        if (data.status === 0) {
          // data.data.list.forEach(element => {
          //     this.list.push(element)
          // });
          this.list = data.data;
        } else {
          this.$message.error(data.msg);
        }
        this.loading = false;
      } else {
        this.$message.error("已加载全部");
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
    async addOptions() {
      let data = await api.addOption({ code: this.$route.query.code,type:this.activeName === "six"?'hk':'' });
      if (data.status === 0) {
        this.$message.success("添加自选成功");
        this.isOptionOpt = true;
      } else {
        this.$message.error(data.msg);
      }
    },
    async deteleOptions() {
      let data = await api.delOption({ code: this.$route.query.code });
      if (data.status === 0) {
        this.$message.success("删除自选股成功");
        this.isOptionOpt = false;
      } else {
        this.$message.error(data.msg);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.table {
  .code {
    color: #6d718b;
    font-size: 12px;
    line-height: 16px;
  }

  .more-btn {
    text-align: center;
    color: #8f92a3;
  }

  .el-table .cell {
    line-height: 18px;
  }

  .page-box {
    // background: #171f2e;
    padding-top: 0px;
  }

  .price {
    font-size: 12px;
  }
}

.el-table /deep/ .cell {
  padding: 0 8px;
}

.black-style.el-tabs .el-tab-pane {
  padding: 0;
}

.el-tabs /deep/ .el-tabs__item {
  color: #8b97b0;
  height: 25px;
  line-height: 25px;
  font-size: 12px;
}

.transaction-table /deep/ th.is-leaf {
  // background: #1a2231;
  padding: 0px 0;
}
</style>
