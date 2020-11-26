<template>
  <div>
    <div class="table transaction-table">
      <el-table
        stripe
        v-loading="loading"
        :data="list.list"
        height="250"
        style="width: 100%">
        <el-table-column
          width="180px"
          prop="indexName"
          label="指数名">
          <template slot-scope="scope">
            <p class="name">
              <span>{{scope.row.indexName}}/{{scope.row.indexCode}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="profitAndLose"
          label="浮动盈亏">
          <template slot-scope="scope">
            <p class="bounceIn">
              <span :class="scope.row.profitAndLose<0?'green':'red'">{{scope.row.profitAndLose}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="allProfitAndLose"
          label="总盈亏">
          <template slot-scope="scope">
            <p class="bounceIn">
              <span :class="scope.row.allProfitAndLose<0?'green':'red'">{{scope.row.allProfitAndLose}}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="buyOrderPrice"
          label="买入点数">
        </el-table-column>
        <el-table-column
          prop="sellOrderPrice"
          label="卖出点数">
        </el-table-column>
        <el-table-column
          width="110px"
          prop="orderNum"
          label="数量">
        </el-table-column>
        <el-table-column
          prop="orderDirection"
          label="方向">
          <template slot-scope="scope">
            <p>
              {{scope.row.orderDirection}}
              <i v-if="scope.row.orderDirection === '买涨'" class="red iconfont icon-up"></i>
              <i v-if="scope.row.orderDirection  === '买跌'" class="green iconfont icon-down"></i>
            </p>
          </template>
        </el-table-column>
        <!-- <el-table-column
         width="120px"
         prop="orderTotalPrice"
         label="保证金">
       </el-table-column> -->
      </el-table>
      <!-- <div class="page-box">
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
      </div> -->

    </div>
  </div>

</template>

<script>
  import * as api from '../../../axios/api'

  export default {
    components: {},
    props: {
      hasChangeSell: {
        type: Number,
        default: function () {
          return 0
        }
      }
    },
    data () {
      return {
        loading: false,
        pageNum: 1,
        pageSize: 10,
        currentNum: 0,
        list: {
          list: []
        },
        detail: null // 详情数据
      }
    },
    watch: {
      haslogin (newval, oldVal) {
        if (newval !== oldVal) {
          this.getList()
        }
      },
      hasChangeSell (newval, oldVal) {
        if (newval) {
          this.list = []
          this.getList()
        }
      },
      deep: true
    },
    computed: {
      haslogin () {
        return this.$store.state.haslogin
      }
    },
    created () {},
    mounted () {
      if (this.$store.state.haslogin) {
        this.getList()
      }
    },
    methods: {
      handleSizeChange (val) {
        this.form.pageSize = val
        this.getList()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.form.pageNum = val
        console.log(`当前页: ${val}`)
        this.getList()
      },
      onSubmit () {
        // 查询表格
        this.getList()
      },
      async getList () {
        // 获取表格数据
        let opts = {
          state: 1,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.loading = true
        let data = await api.getIndexOrderList(opts)
        this.loading = false
        if (data.status === 0) {
          this.list = data.data
        } else {
          this.$message.error(data.msg)
        }
      }
    }
  }
</script>
