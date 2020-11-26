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
        <div class="wrapper user-center-table">
          <div class="user-center-title">
            我的配资
          </div>
          <!-- <div class="table-search">
            <el-row type="flex" justify='end'>
              <el-col :span="8">
                <el-input size="small" v-model="stockCode" placeholder="请输入代码">
                  <el-button @click="getlist" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-input size="small" v-model="stockSpell" placeholder="请输入简拼">
                  <el-button @click="getlist" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
            </el-row>
          </div> -->
          <el-table
            :data="list.list"
            stripe
            v-loading="loading"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="单号">
                    <span>{{scope.row.orderNumber}}</span>
                  </el-form-item>
                  <el-form-item label="子账户">
                    <span>{{scope.row.subaccountNumber}}</span>
                  </el-form-item>
                  <el-form-item label="总操盘资金">
                    <span>{{ scope.row.totalTradingAmount}}</span>
                  </el-form-item>
                  <el-form-item label="预警线">
                    <span>{{ scope.row.lineWarning}}</span>
                  </el-form-item>
                  <el-form-item label="平仓线">
                    <span>{{scope.row.lineUnwind}}</span>
                  </el-form-item>
                  <el-form-item label="开始时间">
                    <span>{{scope.row.beginTime | timeFormat}}</span>
                  </el-form-item>
                  <el-form-item label="终止时间">
                    <span>{{scope.row.endTime | timeFormat}}</span>
                  </el-form-item>
                  
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="totalTradingAmount"
              label="总操盘资金">
            </el-table-column>
            <el-table-column
              prop="fundsAmount"
              width="80px"
              label="配资资金">
              <template slot-scope="scope">
                <span>{{scope.row.fundsAmount}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="margin"
              width="80px"
              label="保证金">
            </el-table-column>
            <el-table-column
              prop="manageFee"
              width="90px"
              label="配资管理费">
            </el-table-column>
            <el-table-column
              prop="totalTradingAmount"
              label="股票可用金额">
            </el-table-column>
            <el-table-column
              prop="orderTotalPrice"
              width="80px"
              label="股票市值">
            </el-table-column>
            <el-table-column
              prop="allProfitAndLose"
              width="80px"
              label="股票盈亏">
            </el-table-column>
            <el-table-column
              prop="status"
              width="65px"
              label="状态">
              <template slot-scope="scope">
                <p class="bounceIn">
                  <span v-if="scope.row.status==0" class="red">待审核</span>
                  <span v-if="scope.row.status==1" class="green">操盘中</span>
                  <span v-if="scope.row.status==2" class="red">未通过</span>
                  <span v-if="scope.row.status==3" class="red">已到期</span>
                  <span v-if="scope.row.status==4" class="green">已结束</span>
                </p>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              prop="isLock"
              width="60px"
              label="配资">
              <template slot-scope="scope">
                <el-button type="success" plain size="small" @click="withFunding(scope.row)">配资</el-button>
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
  import MenuBox from '@/pages/user/components/menu'
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
        loading: false,
        pageNum: 1,
        pageSize: 15,
        stockCode: '', // 代码
        stockSpell: '', // 简拼
        list: {
          list: []
        }
      }
    },
    watch: {},
    computed: {},
    created () {
      this.timer = setInterval(this.refreshList, 5000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    mounted () {
      this.getlist()
      this.$store.state.userMenu = '2-23'
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
        let opt = {
          userId: 0, 
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        let data = await api.getUserApplyList(opt)
        if (data.status === 0) {
          this.list = data.data
        } else {
          this.$message.error(data.msg)
        }
      },
      async refreshList () {
        if (this.refresh || this.loading) {
          return
        }
        this.refresh = true
        this.changeTextClass = {}
        // 获取表格数据
        let opts = {
          userId: 0, 
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        let data = await api.getUserApplyList(opts)
        this.refresh = false
        if (data.status === 0) {
          data.data.list.forEach((element, i) => {
            this.changeTextClass[i] = ''
            if (data.data.list[i].now_price !== this.list.list[i].now_price) {
              // this.changeTextClass[i] = true // 设置对应的动画过滤
              // this.list.list[i].now_price = data.data.list[i].now_price
              // this.list.list[i].profitAndLose = data.data.list[i].profitAndLose
              // this.list.list[i].allProfitAndLose = data.data.list[i].allProfitAndLose
            }
          })
        } else {
          if (data.success === false) {

          } else {
            this.$message.error(data.msg)
          }
        }
      },
      withFunding (val) {
        this.$router.push({
            path: '/funding?id='+ val.id
        })
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
