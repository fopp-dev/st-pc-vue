<template>
  <div class="wrapper">
    <el-table
      :data="list.list"
      style="width: 100%">
      <el-table-column
        prop="orderSn"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="payChannel"
        label="支付渠道">
        <template slot-scope="scope">
          <span v-if="scope.row.payChannel === 0">支付宝</span>
          <span v-if="scope.row.payChannel === 1">对公转账</span>
          <span v-else>{{scope.row.payChannel}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="payAmt"
        label="金额">
      </el-table-column>
      <el-table-column
        prop="orderStatus"
        label="状态">
        <template slot-scope="scope">
                <span :class="scope.row.orderStatus === 1?'green':scope.row.orderStatus === 2?'red':'red'">
                    <!-- 1 => 成功 2 失败 3取消 4 等待 -->
                    <i v-if="scope.row.orderStatus === 1" class="iconfont icon-tongguo4 animated bounceIn"></i>
                    <i v-if="scope.row.orderStatus==0" class="iconfont icon-dengdai animated bounceInDown"></i>
                    <i v-if="scope.row.orderStatus === 2" class="iconfont icon-failure animated bounceInDown"></i>
                    <i v-if="scope.row.orderStatus === 3"
                       class="iconfont icon-iconfontweitongguo animated bounceInDown"></i>
                    {{scope.row.orderStatus === 1?'充值成功':scope.row.orderStatus === 2?'充值失败':scope.row.orderStatus === 3?'取消充值':'审核中'}}
                </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="addTime"
        label="时间">
        <template slot-scope="scope">
          <b v-if="scope.row.addTime">{{scope.row.addTime | timeFormat}}</b>
          <b v-else></b>
        </template>
      </el-table-column>
    </el-table>
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
</template>

<script>
  import * as api from '../../../../axios/api'

  export default {
    components: {},
    props: {},
    data () {
      return {
        pageNum: 1,
        pageSize: 15,
        list: {
          list: []
        }
      }
    },
    watch: {},
    computed: {},
    created () {},
    mounted () {
      this.getlist()
    },
    methods: {
      handleSizeChange (size) {
        this.pageSize = size
        this.getlist()
      },
      handleCurrentChange (page) {
        this.pageNum = page
        this.getlist()
      },
      async getlist () {
        // 获取资金明细
        let opts = {
          pageNum: this.pageNum,
          pageSize: 10
        }
        let data = await api.withdrawList(opts)
        if (data.status === 0) {
          // data.data.list.forEach(element => {
          //     this.list.push(element)
          // });
          this.list = data.data
          // this.total = data.data.total
        } else {
          this.$message.error(data.msg)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .el-pager li {
    background: #fff;
  }
</style>
