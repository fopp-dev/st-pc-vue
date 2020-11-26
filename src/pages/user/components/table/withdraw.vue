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
          <div class="user-center-title">
            提现记录
          </div>
          <el-table
            :data="list.list"
            style="width: 100%">
            <el-table-column
              prop="withAmt"
              label="提现金额">
            </el-table-column>
            <el-table-column
              prop="withFee"
              label="手续费">
            </el-table-column>
            <el-table-column
              width="100"
              prop="withStatus"
              label="状态">
              <template slot-scope="scope">
                        <span :class="scope.row.withStatus === 1?'green':scope.row.withStatus === 2?'red':'red'">
                            <!-- 1 => 成功 2 失败 3取消 4 等待 -->
                            <i v-if="scope.row.withStatus === 1" class="iconfont icon-tongguo4 animated bounceIn"></i>
                            <i v-if="scope.row.withStatus==0" class="iconfont icon-dengdai animated bounceInDown"></i>
                            <i v-if="scope.row.withStatus === 2"
                               class="iconfont icon-failure animated bounceInDown"></i>
                            <i v-if="scope.row.withStatus === 3"
                               class="iconfont icon-iconfontweitongguo animated bounceInDown"></i>
                            {{scope.row.withStatus === 1?'提现成功':scope.row.withStatus === 2?'提现失败':scope.row.withStatus === 3?'取消提现':'审核中'}}
                        </span>
              </template>
            </el-table-column>
            <el-table-column
              width="170px"
              prop="withMsg"
              label="备注">
            </el-table-column>
            <el-table-column
              prop="addTime"
              width="170px"
              label="提现银行卡">
              <template slot-scope="scope">
                {{scope.row.bankName}}-{{scope.row.bankAddress}}
              </template>
            </el-table-column>
            <el-table-column
              width="170px"
              prop="bankNo"
              label="提现卡号">
            </el-table-column>
            <el-table-column
              prop="applyTime"
              width="170px"
              label="时间">
              <template slot-scope="scope">
                <b v-if="scope.row.applyTime">{{scope.row.applyTime | timeFormat}}</b>
                <b v-else></b>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              prop="isLock"
              width="100px"
              label="取消">
              <template slot-scope="scope">
                <el-button v-if="scope.row.withStatus != 3" type="danger" plain size="small"
                           @click="toOption(scope.row)">取消提现
                </el-button>
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
      this.$store.state.userMenu = '2-6'
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
        // 获取 提现记录
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
      },
      async toOption (val) {
        // 取消提现
        let opt = {
          withId: val.id
        }
        let data = await api.canceloutMoney(opt)
        if (data.status === 0) {
          // this.list = {}
          this.getlist()
          this.$message.success(data.msg)
        } else {
          this.$message.success(data.msg)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .code {
    font-size: 12px;
    color: #999;
  }

  .main-wrapper {
    .wrapper {
      padding: 20px;

      .table-search {
        margin-bottom: 15px;
      }
    }
  }
</style>
