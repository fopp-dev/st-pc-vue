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
        <div class="con-box">
          <div class="header-top">
            <div class="text item">
                  <el-tabs>
                    <el-tab-pane label="配资详情" name="first">
                    </el-tab-pane>
                  </el-tabs>
                </div>

                <table style="width: 100%;border-spacing:160px 180px;" class="demo-form-inline auth-box daystable">
                  <tr>
                    <td class="tr-cols1">单号</td>
                    <td class="tr-cols2">
                      <span class="td-font">{{accountinfo.orderNumber}}</span>
                    </td>
                    <td class="tr-cols3">状态</td>
                    <td>
                      <span v-if="accountinfo.status==0" class="red td-span">待审核</span>
                      <span v-if="accountinfo.status==1" class="green td-span">操盘中</span>
                      <span v-if="accountinfo.status==2" class="green td-span">未通过</span>
                      <span v-if="accountinfo.status==3" class="green td-span">已逾期</span>
                      <span v-if="accountinfo.status==4" class="green td-span">已结束</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="tr-cols1">操盘开始时间</td>
                    <td class="tr-cols2">
                      <span class="td-font">{{accountinfo.beginTime | timeFormat}}</span>
                    </td>
                    <td class="tr-cols3">操盘结束时间</td>
                    <td>
                      <span class="td-span">{{accountinfo.endTime | timeFormat}}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="tr-cols1">总操盘资金</td>
                    <td class="tr-cols2">
                      <span class="td-font">{{accountinfo.totalTradingAmount}}元</span>
                    </td>
                    <td class="tr-cols3">预警线</td>
                    <td>
                      <span class="td-span">{{accountinfo.lineWarning}}元</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="tr-cols1">配资资金</td>
                    <td class="tr-cols2">
                      <span class="td-font">{{accountinfo.fundsAmount}}元</span>
                    </td>
                    <td class="tr-cols3">平仓线</td>
                    <td>
                      <span class="td-span">{{accountinfo.lineUnwind}}元</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="tr-cols1">保证金</td>
                    <td class="tr-cols2">
                      <span class="td-font">{{accountinfo.margin}}元</span>
                    </td>
                    <td class="tr-cols3">子账户</td>
                    <td>
                      <span class="td-span">{{accountinfo.subaccountNumber}}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="tr-cols1">配资管理费</td>
                    <td class="tr-cols2">
                      <span class="td-font">{{accountinfo.manageFee}}元</span>
                    </td>
                    <td class="tr-cols3"></td>
                    <td>
                      <span class="td-span"></span>
                    </td>
                  </tr>
                  <tr bgcolor="#fdf6ec" style="height:60px;text-align:right;">
                    <td style="padding-right:40px;"  colspan="4">
                      <div slot="footer" class="dialog-footer" v-if="accountinfo.status != 4 && accountinfo.status != 2">
                        <el-button type="primary" @click="look(accountinfo.subaccountNumber)">查看实盘交易</el-button>
                        <span class="spanpadding" @click="expandDialogVisible = true">扩大配资</span>
                        <span class="spanpadding" @click="marginDialogVisible = true">追加保证金</span>
                        <span class="spanpadding" @click="delayDialogVisible = true">申请延期</span>
                        <span class="spanpadding" @click="endDialogVisible = true">终止操盘</span>
                        <span class="spanpadding" @click="contract()">查看合同</span>
                      </div>
                    </td>
                    
                  </tr>
                </table>

                <div class="auth-box" style="padding-bottom:40px;">
                  
                </div>

          </div>

          <el-tabs v-model="activeName" @tab-click="handleClick" v-if="accountinfo.status != 4 && accountinfo.status != 2">
            <el-tab-pane label="扩大配资记录" name="first">
              <div class="user-info">
                <el-table
                  :data="list.list"
                  style="width: 100%">
                  <el-table-column
                    prop="id"
                    label="编号">
                  </el-table-column>
                  <el-table-column
                    prop="appendMargin"
                    label="申请保证金">
                  </el-table-column>
                  <el-table-column
                    prop="appendServiceFee"
                    label="申请手续费">
                  </el-table-column>
                  <el-table-column
                    prop="totalTradingAmount"
                    label="操盘资金(元)">
                  </el-table-column>
                  <el-table-column
                    prop="addTime"
                    width="180px"
                    label="申请时间">
                    <template slot-scope="scope">{{scope.row.addTime | timeFormat}}</template>
                  </el-table-column>
                  <el-table-column
                    prop="appendCycle"
                    label="使用期限">
                    <template slot-scope="scope">
                      <span>{{scope.row.tradersCycle}}天</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="申请状态">
                    <template slot-scope="scope">
                      <p class="bounceIn">
                        <span v-if="scope.row.status==0" class="red">审核中</span>
                        <span v-if="scope.row.status==1" class="green">已通过</span>
                        <span v-if="scope.row.status==2" class="red">未通过</span>
                      </p>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="追加保证金记录" name="two">
              <div class="user-info">
                <el-table
                  :data="list.list"
                  style="width: 100%">
                  <el-table-column
                    prop="id"
                    label="编号">
                  </el-table-column>
                  <el-table-column
                    prop="appendMargin"
                    label="追加保证金">
                  </el-table-column>
                  <el-table-column
                    prop="addTime"
                    label="提交日期">
                    <template slot-scope="scope">{{scope.row.addTime | timeFormat}}</template>
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="申请状态">
                    <template slot-scope="scope">
                      <p class="bounceIn">
                        <span v-if="scope.row.status==0" class="red">审核中</span>
                        <span v-if="scope.row.status==1" class="green">已通过</span>
                        <span v-if="scope.row.status==2" class="red">未通过</span>
                      </p>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="申请延期记录" name="three">
              <div class="user-info">
                <el-table
                  :data="list.list"
                  style="width: 100%">
                  <el-table-column
                    prop="id"
                    label="编号">
                  </el-table-column>
                  <el-table-column
                    prop="appendCycle"
                    label="延期期限">
                    <template slot-scope="scope">
                      <span>{{scope.row.appendCycle}}天</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="appendServiceFee"
                    label="延期手续费">
                  </el-table-column>
                  <el-table-column
                    prop="addTime"
                    label="提交日期">
                    <template slot-scope="scope">{{scope.row.addTime | timeFormat}}</template>
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="申请状态">
                    <template slot-scope="scope">
                      <p class="bounceIn">
                        <span v-if="scope.row.status==0" class="red">审核中</span>
                        <span v-if="scope.row.status==1" class="green">已通过</span>
                        <span v-if="scope.row.status==2" class="red">未通过</span>
                      </p>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>

        </div>

        <!-- 扩大配资弹框 -->
        <el-dialog
          title="扩大配资"
          class="agree-dialog"
          :center='true'
          :visible.sync="expandDialogVisible"
          width="35%">
          <div class="dialog-iframe">
            <div class="content finance-operate-page" style="margin:20px;background:#fff;border-radius:5px;margin-top:60px;line-height:200%;">
                <div class="info">
                    1. 扩大配资的时间段： 09:00:00 -14:45:00；<br>
                    2. 扩大配资产生的手续费，需要一次性付清；
                </div>
                <div class="account">
                    <span class="label">当前账户余额</span>
                    <span class="con">{{userInfo.enableAmt}} 元</span>
                </div>
                <div class="account">
                    <span class="label">配资管理费</span>
                    <span class="con"><span id="fee">{{manageFee}}</span> 元</span>
                </div>
                <div class="account">
                    <span class="label">扩大金额</span>
                    <span class="con">
                      <el-input type='number' class="td-input" v-model="appendMargin" placeholder="请输入金额"></el-input>元
                    </span>
                </div>
            </div>
            <div slot="footer" class="text-center dialog-footer clearfix">
              <el-button type="error" @click="expandDialogVisible = false">取消扩大</el-button>
              <el-button type="primary" @click="expandApply()">确认扩大</el-button>
            </div>
          </div>
        </el-dialog>

        <!-- 追加保证金弹框 -->
        <el-dialog
          title="追加保证金"
          class="agree-dialog"
          :center='true'
          :visible.sync="marginDialogVisible"
          width="35%">
          <div class="dialog-iframe">
            <div class="content finance-operate-page" style="margin:20px;background:#fff;border-radius:5px;margin-top:60px;line-height:200%;">
                <div class="info">
                    1. 当配资人该条配资的持仓出现亏损，并低于配资预警线时，系统才会允许操作追加保证金；<br>
                    2. 追加的保证金金额设有最低下限，当低于预警线时禁止配资人开仓操作；，当高于预警线时，系统自动解除禁止开仓限制，允许正常开仓； <br>
                    3. 追加的保证金金额不设上限； <br>
                    4. 追加保证金没有放大资金的效果，如需放大配资，请申请扩大配资。
                </div>
                <div class="account">
                    <span class="label">当前账户余额</span>
                    <span class="con">{{userInfo.enableAmt}} 元</span>
                </div>
                <div class="account">
                    <span class="label">追加金额</span>
                    <span class="con">
                      <el-input type='number' class="td-input" v-model="appendMargin" placeholder="请输入金额"></el-input>元
                    </span>
                </div>
            </div>
            <div slot="footer" class="text-center dialog-footer clearfix">
              <el-button type="error" @click="marginDialogVisible = false">取消追加</el-button>
              <el-button type="primary" @click="marginApply()">确认追加</el-button>
            </div>
          </div>
        </el-dialog>

        <!-- 申请延期弹框 -->
        <el-dialog
          title="申请延期"
          class="agree-dialog"
          :center='true'
          :visible.sync="delayDialogVisible"
          width="35%">
          <div class="dialog-iframe">
            <div class="content finance-operate-page" style="margin:20px;background:#fff;border-radius:5px;margin-top:60px;line-height:200%;">
                <div class="info">
                    1. 申请续期产生的手续费，需要一次性付清；<br>
                    2. 续期需要先把之前欠下的利息还上，再根据当前平台设置的利率重新计算，收取费用的公式和申请配资时的一样。
                </div>
                <div class="account">
                    <span class="label">当前账户余额</span>
                    <span class="con">{{userInfo.enableAmt}} 元</span>
                </div>
                <div class="account">
                    <span class="label">配资管理费</span>
                    <span class="con"><span id="fee">{{manageFee}}</span> 元</span>
                </div>
                <div class="account">
                    <span class="label">续期时间</span>
                    <span class="con">
                      <el-select clearable filterable v-model="selDaysUsePeriod" placeholder="续期时间"  @change="currentSelDays" style="width:120px;">
                        <el-option v-for="item in (fundsSetting.daysUsePeriod || '').split('|')" :key="item" :value="item">{{item}}天</el-option>
                      </el-select>
                    </span>
                </div>
            </div>
            <div slot="footer" class="text-center dialog-footer clearfix">
              <el-button type="error" @click="delayDialogVisible = false">取消延期</el-button>
              <el-button type="primary" @click="delayApply()">确认延期</el-button>
            </div>
          </div>
        </el-dialog>

        <!-- 终止操盘弹框 -->
        <el-dialog
          title="终止操盘"
          class="agree-dialog"
          :center='true'
          :visible.sync="endDialogVisible"
          width="35%">
          <div class="dialog-iframe">
            <div class="content finance-operate-page" style="margin:20px;background:#fff;border-radius:5px;margin-top:60px;line-height:200%;">
              <div class="info">
                  您确定要申请终止操盘吗？ <br> <br>

                  1. 按天/按周操盘，不返回已扣除的手续费；<br>
                  2. 免息操盘，不扣除任何费用； <br>
                  3. 按月操盘将会扣除剩余未扣除利息的 20% 作为罚金； <br>
                  4. 请确保您的交易账户已经全部清仓，否则我们将有权把您的持仓进行平仓处理（不保证平仓价格）。
              </div>
                
            </div>
            <div slot="footer" class="text-center dialog-footer clearfix">
              <el-button type="error" @click="endDialogVisible = false">取消终止</el-button>
              <el-button type="primary" @click="endApply()">确认终止</el-button>
            </div>
          </div>
        </el-dialog>
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
        settingInfo: {}, // 设置信息
        indexSettingInfo: {},
        futuresSettingInfo: {},
        userInfo: {},
        accountActiveNames: ['1'],
        pageNum: 1,
        pageSize: 8,
        accountinfo: {},
        delayDialogVisible: false,
        expandDialogVisible: false,
        marginDialogVisible: false,
        endDialogVisible: false,
        fundsSetting: {},
        selDaysUsePeriod: '',
        selDaysUseVal: '',
        manageFee: 0,
        rateInfo: {},
        appendMargin: ''
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
      this.getUserInfo()
      this.getSubaccountInfo()
      this.getFundsSetting()
      this.getlist(1)
    },
    mounted () {
      this.$store.state.userMenu = '2-23'
    },
    methods: {
      contract() {
        // let routeData = this.$router.push('/contract')
        let routeData = this.$router.resolve({ path: '/contract', query: {} });
        window.open(routeData.href, '_blank');
      },
      handleClick(tab, event) {
        // console.log(tab, event);
        if(tab.name == 'two'){
        	this.getlist(2);
        } else if(tab.name == 'three'){
        	this.getlist(3);
        } else {
        	this.getlist(1);
        }
      },
      async getUserInfo () {
        // 获取用户信息
        let data = await api.getUserInfo()
        if (data.status === 0) {
          // 判断是否登录
          this.$store.state.userInfo = data.data
          this.userInfo = data.data
        } else {
        }
      },
      async getSubaccountInfo () {
        let data = await api.getSubaccountInfo({id: this.$route.query.id})
        if (data.status === 0) {
          // 成功
          this.accountinfo = data.data
        } else {
          this.$message.error(data.msg)
        }
      },
      look (val) {
        this.$router.push('/transaction?sub='+ val)
      },
      handleSizeChange (size) {
        this.handleOptions({ pageSize: size })
        this.getData()
      },
      handleCurrentChange (page) {
        this.handleOptions({ pageNum: page })
        this.getData()
      },
      async delayApply() {
        if(this.selDaysUsePeriod == ''){
          this.$message.error('请选择追加周期')
          return
        }
        let opt = {
          id: 0,
          appendCycle: this.selDaysUseVal,
          applyId: this.$route.query.id,
          fundsType: 1,
          appendType: 3,
          appendServiceFee: this.manageFee
        }
        let data = await api.appendApply(opt)
        if (data.status === 0) {
          this.$message.success(data.msg)
          this.delayDialogVisible = false
          this.selDaysUsePeriod = ''
          this.getlist(3)
        } else {
          this.$message.error(data.msg)
        }
      },
      async expandApply() {
        if(this.appendMargin == ''){
          this.$message.error('请填写扩大金额')
          return
        }
        let opt = {
          id: 0,
          applyId: this.$route.query.id,
          fundsType: 1,
          appendType: 1,
          appendMargin: this.appendMargin
        }
        let data = await api.appendApply(opt)
        if (data.status === 0) {
          this.$message.success(data.msg)
          this.expandDialogVisible = false
          this.appendMargin = ''
          this.getlist(1)
        } else {
          this.$message.error(data.msg)
        }
      },
      async marginApply() {
        if(this.appendMargin == ''){
          this.$message.error('请填写追加金额')
          return
        }
        let opt = {
          id: 0,
          applyId: this.$route.query.id,
          fundsType: 1,
          appendType: 2,
          appendMargin: this.appendMargin
        }
        let data = await api.appendApply(opt)
        if (data.status === 0) {
          this.$message.success(data.msg)
          this.marginDialogVisible = false
          this.appendMargin = ''
          this.getlist(2)
        } else {
          this.$message.error(data.msg)
        }
      },
      async endApply() {
        let opt = {
          id: 0,
          applyId: this.$route.query.id,
          fundsType: 1,
          appendType: 4,
          appendServiceFee: 0
        }
        let data = await api.appendApply(opt)
        if (data.status === 0) {
          this.$message.success(data.msg)
          this.endDialogVisible = false
        } else {
          this.$message.error(data.msg)
        }
      },
      async getlist (appendType) {
        // 获取持仓列表
        let opt = {
          userId: this.$store.state.userInfo.id, 
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          appendType: appendType
        }
        let data = await api.getAppendList(opt)
        if (data.status === 0) {
          this.list = data.data
        } else {
          this.$message.error(data.msg)
        }
      },
      async getFundsSetting () {
        // 分仓配资设置信息查询
        let data = await api.getFundsSetting()
        if (data.status === 0) {
          this.fundsSetting = data.data
        } else {
        }
      },
      async getLeverRateInfo (cycleType, lever) {
        let data = await api.getLeverRateInfo({cycleType: cycleType, lever: lever})
        if (data.status === 0) {
          // 成功
          this.rateInfo = data.data
          // 管理费= 配资金额 * 杠杆费率 * 天数
          this.manageFee = Number(this.accountinfo.fundsAmount * this.rateInfo.manageRate / 100 * this.selDaysUseVal).toFixed(1)
        } else {
          this.$message.error(data.msg)
        }
      },
      currentSelDays(selVal) {
        this.selDaysUsePeriod = selVal + '天'
        this.selDaysUseVal = selVal
        this.getLeverRateInfo(1, this.accountinfo.lever)
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
    width: 130px;
  }
  .tr-cols2 {
    width: 280px;
  }
  .tr-cols3 {
    width: 130px;
    padding-left: 15px;
  }
  .td-input {
    width: 120px;
  }
  .daystable{
    border-spacing:0px 0px;
  }
  table td{ height:50px; border:#CCCCCC 0px solid;}
  .spanpadding{
    padding:10px;cursor:pointer;
  }

  //弹框样式
  .finance-operate-page .info {
    color: #ff465a;
    font-size: 14px;
    line-height: 25px;
    margin-bottom: 10px;
}

  .finance-operate-page .fee, .finance-operate-page .operate, .finance-operate-page .account {
    border-bottom: 1px dotted #D9D9D9;
    background-color: #F9F9F9;
    padding: 10px;
    line-height: 30px;
}

  .finance-operate-page .account .label {
    float: left;
    width: 180px;
    text-align: left;
}
  .finance-operate-page .fee .con, .finance-operate-page .operate .con, .finance-operate-page .account .con {
    display: block;
    text-align: right;
}
  .con {
    display: block;
    text-align: right;
}

</style>
