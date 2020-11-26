<template>
  <div>
    <div class="table">
      <el-table
        stripe
        v-loading="loading"
        :data="list.list"
        @row-click='toTransaction'
        style="width: 100%">
        <el-table-column
          prop="name"
          width="200px"
          label="名称">
          <template slot-scope="scope">
            <div class="tab-name">
              <p>{{scope.row.name}}</p>
              <span class="code">
                {{scope.row.code}}
            </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="nowPrice"
          width="130px"
          align='right'
          label="现价">
          <template slot-scope="scope">
            <div class="price">
              <div :class="scope.row.hcrate<0?'green':scope.row.hcrate==0?'':'red'">
                {{Number(scope.row.nowPrice).toFixed(2)}}
                <i v-if="scope.row.hcrate>0" class="iconfont icon-up"></i>
                <i v-if="scope.row.hcrate<0" class="iconfont icon-down"></i>
              </div>
            </div>
            <!-- <div v-if="scope.row.now_price" :class="changeTextClass[scope.$index] === true?'heartBeat  tab-number':' tab-number'">
              <p :class="scope.row.now_price - scope.row.buyOrderPrice < 0?'green bounceIn':scope.row.now_price - scope.row.buyOrderPrice > 0?'bounceIn red':'bounceIn'">
                {{scope.row.now_price === 0?'-':scope.row.now_price}}
              </p>
            </div> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="hcrate"
          align='right'
          label="涨跌幅">
          <template slot-scope="scope">
            <div class="price">
              <div :class="scope.row.hcrate<0?'green':scope.row.hcrate==0?'':'red'">
                {{Number(scope.row.hcrate).toFixed(2)}}%
                <!-- <i v-if="scope.row.hcrate>0" class="iconfont icon-up"></i>
                <i v-if="scope.row.hcrate<0" class="iconfont icon-down"></i> -->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="today_max"
          align='right'
          label="最高">
          <!-- <template slot-scope="scope">
              <div :class="scope.row.hcrate<0?'green':scope.row.hcrate==0?'':'red'">{{scope.row.today_max}}</div>
          </template> -->
        </el-table-column>
        <el-table-column
          prop="today_min"
          align='right'
          label="最低">
          <!-- <template slot-scope="scope">
              <div :class="scope.row.hcrate<0?'green':scope.row.hcrate==0?'':'red'">{{scope.row.today_min}}</div>
          </template> -->
        </el-table-column>
        <el-table-column
          class="tab-name"
          align='center'
          label="走势图"
          width="370px"
        >
          <template slot-scope="scope">
            <chart-box :code="scope.row.code"></chart-box>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-box text-center">
        <!-- <a class="more-btn" href="javascript:;">
          加载更多
          <i class="iconfont icon-xiasanjiao"></i>
        </a> -->
        <el-pagination
          class="pull-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="list.pageNum"
          :page-sizes="[10, 20, 30, 40,50]"
          :page-size="list.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="list.total">
        </el-pagination>
      </div>

    </div>
  </div>

</template>

<script>
  // import * as api from '../../../axios/api'
  import ChartBox from './chart'

  export default {
    components: {
      ChartBox
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
      }
    },
    data () {
      return {
        loading: false,
        refresh: false // 刷新中
      }
    },
    watch: {},
    computed: {},
    mounted () {
    },
    methods: {
      handleSizeChange (size) {
        this.handleOptions({ pageSize: size })
        this.getData()
      },
      handleCurrentChange (page) {
        this.handleOptions({ pageNum: page })
        this.getData()
      },
      toTransaction (row, column, event) {
        // 去交易界面
        this.$router.push({
          path: '/transaction',
          query: {
            code: row.code
          }
        })
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

    /*/deep/ th.el-table_1_column_1 {*/
      /*padding-left: 50px;*/
    /*}*/

    /deep/ .el-table th>.cell {
      padding-left: 60px;
    }
  }
</style>
