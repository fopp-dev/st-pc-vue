<template>
  <el-container>
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-container class="main-wrapper">
      <el-main>

        <div class="introduce">
          <h2 class="title text-center">PRODUCT DESCRIPTION</h2>
          <h2 class="title text-center">产品说明</h2>
          <div class="introduce-body">
            <div class="panel-body contact-tool clearfix" style="width:900px;margin:0 auto;">
              <div class="pull-left">
                <!-- <img src="${s.base}/home/assert/contactus.jpg"  alt="" width="251" border="0" height="120"> -->
              </div>
              <div class="contact-tool-right pull-right">
                <p>
                  我们最大的资产是我们的员工，{{siteInfo.siteName}}只聘用那些富有经验的专业人员，他们已经在金融服务业展示了他们一流的客户服务技巧和领带能力。提供专业的客户服务。我们的销售和营运代表将以专业的中文对客户的任何询问进行解答。</p>
              </div>
            </div>
            <div class="container-right panel-box clearfix">
              <div class="panel-title">
                <h5>开户须知</h5>
              </div>
              <div class="panel-body">
                <el-row>
                  <el-col :span="8"></el-col>
                  <el-col :span="16"></el-col>
                </el-row>
                <p>1、开设真实账户（注册会员）之前一定要认真阅读和查看本公司的《交易规则》和《风险揭示与告知》。</p>
                <p>2、客户具备的开户条件：年满十八周岁、具有完全民事行为能力的公民。客户须以真实的、合法的身份开户并保证资金来源的合法性。</p>
                <p>3、客户自备用于相互转账的银行卡（开通网上银行），客户应妥善保管好银行密码及交易密码，并定期更换密码，不得向任何人泄露密码。</p>
                <p>4、自行注册，并遵循《一人一个账号规则》。</p>
                <p>5、正式账户充值成功后即可开始交易。</p>
              </div>
            </div>
            <div class="panel-box">
              <div class="panel-title">
                操盘须知
              </div>
              <div class="panel-body bug-info">
                <p>
                  1、申请资金后，依照市场规则，随时买进卖出;
                </p>
                <p>
                  2、账户审核通过后，当天即可交易;
                </p>
                <p>
                  3、当资金接近亏损强平预警线时，需尽快补足保证金；如未及时补仓，可能会触发交易保护机制;
                </p>
                <p>
                  4、当操盘资金低于平仓线下时，我们有权将您的账户实行止损操作;
                </p>
              </div>
            </div>
            <!-- 表格：显示风控参数 -->
            <div class="table-box table" style="width:900px; margin:50px auto;">
              <div class="table-title">
                <h5 class="list text-center" style="border-bottom:none">沪深股市</h5>
              </div>
              <div class="el-table el-table--striped">
                <table class="table  table-bordered el-table__body" style="width:100%">
                  <tbody>
                  <tr class="el-table__row">
                    <td width="150" align="right">标的名称：</td>
                    <td>上海、深圳股市融资融券板块</td>
                  </tr>
                  <tr class="el-table__row el-table__row--striped">
                    <td align="right">市场交易时间：</td>
                    <td>
                      <p>第一节：9:30-11:30</p>
                      <p>第二节：13:00-15:00</p>
                      <p>（北京时间）</p>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td align="right">最小交易单位：</td>
                    <td>1手 ，每1手=100股</td>
                  </tr>
                  <tr class="el-table__row el-table__row--striped">
                    <td align="right">最大交易单位：</td>
                    <td>100000.00手 ，每1手=100股</td>
                  </tr>
                  <tr class="el-table__row">
                    <td align="right">交易方式：</td>
                    <td>采用融资、融券方式，买涨买跌交易</td>
                  </tr>
                  <!-- <tr class="el-table__row el-table__row--striped">
                    <td align="right">交易额度：</td>
                    <td>采用融资、融券方式，买涨买跌方式买进卖出</td>
                  </tr> -->
                  <!-- <tr class="el-table__row">
                    <td align="right">最小购买金额：</td>
                    <td>{{sitesetInfo.buyMinAmt}} 元</td>
                  </tr> -->
                  <tr class="el-table__row el-table__row--striped">
                    <td align="right">手续费：</td>
                    <td>买入及卖出时收取，依交易总价 * {{sitesetInfo.buyFee}} 收取</td>
                  </tr>
                  <tr class="el-table__row">
                    <td align="right">印花税：</td>
                    <td>买入时收取，依交易总价 * {{sitesetInfo.dutyFee}} 收取</td>
                  </tr>
                  <tr class="el-table__row el-table__row--striped">
                    <td align="right">利息：</td>
                    <td>利息：	月息0.9%，每次划入交易账户时收取</td>
                  </tr>
                  <tr class="el-table__row">
                    <td align="right">出金规则：</td>
                    <td>当前有持仓无法出金，最小出金金额为 {{sitesetInfo.withMinAmt}} 元</td>
                  </tr>
                  <tr class="el-table__row el-table__row--striped">
                    <td align="right">出金时间：</td>
                    <td>出金时间为 {{sitesetInfo.withTimeBegin}} :00 和 {{sitesetInfo.withTimeEnd}} : 00 之间</td>
                  </tr>
                  <tr class="el-table__row">
                    <td align="right">时差：</td>
                    <td>夏令：0小时；冬令：0小时</td>
                  </tr>
                  <tr class="el-table__row el-table__row--striped">
                    <td align="right">数据来源：</td>
                    <td>中国上海证券交易所及深训证券交易所</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

             <!-- 表格：显示风控参数 -->
            <div class="table-box table" style="width:900px; margin:50px auto;">
              <div class="table-title">
                <h5 class="list text-center" style="border-bottom:none">港股股市</h5>
              </div>
              <div class="el-table el-table--striped">
                <table class="table  table-bordered el-table__body" style="width:100%">
                  <tbody>
                  <tr class="el-table__row">
                    <td width="150" align="right">标的名称：</td>
                    <td>香港股市融资融券板块</td>
                  </tr>
                  <tr class="el-table__row el-table__row--striped">
                    <td align="right">市场交易时间：</td>
                    <td>
                      <p>第一节：9:30-12:00</p>
                      <p>第二节：13:00-16:00</p>
                      <p>（北京时间）</p>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td align="right">最小交易单位：</td>
                    <td>1手 ，每1手=100股</td>
                  </tr>
                  <tr class="el-table__row el-table__row--striped">
                    <td align="right">最大交易单位：</td>
                    <td>100000.00手 ，每1手=100股</td>
                  </tr>
                  <tr class="el-table__row">
                    <td align="right">交易方式：</td>
                    <td>采用融资、融券方式，买涨买跌交易，当日买入，当日平仓，专区当日波段振幅差价。</td>
                  </tr>
                  <!-- <tr class="el-table__row el-table__row--striped">
                    <td align="right">交易额度：</td>
                    <td>采用融资、融券方式，买涨买跌方式买进卖出</td>
                  </tr> -->
                  <!-- <tr class="el-table__row">
                    <td align="right">最小购买金额：</td>
                    <td>{{sitesetInfo.buyMinAmt}} 元</td>
                  </tr> -->
                  <tr class="el-table__row el-table__row--striped">
                    <td align="right">手续费：</td>
                    <td>买入及卖出时收取，依交易总价 * 0.002 收取</td>
                  </tr>
                  <tr class="el-table__row">
                    <td align="right">印花税：</td>
                    <td>买入时收取，依交易总价 * 0.001 收取</td>
                  </tr>
                  <tr class="el-table__row el-table__row--striped">
                    <td align="right">利息：</td>
                    <td>利息：	月息0.9%，每次划入交易账户时收取</td>
                  </tr>
                  <tr class="el-table__row">
                    <td align="right">出金规则：</td>
                    <td>当前有持仓无法出金，最小出金金额为 {{sitesetInfo.withMinAmt}} 元</td>
                  </tr>
                  <tr class="el-table__row el-table__row--striped">
                    <td align="right">出金时间：</td>
                    <td>出金时间为 {{sitesetInfo.withTimeBegin}} :00 和 {{sitesetInfo.withTimeEnd}} : 00 之间</td>
                  </tr>
                  <tr class="el-table__row">
                    <td align="right">时差：</td>
                    <td>夏令：0小时；冬令：0小时</td>
                  </tr>
                  <tr class="el-table__row el-table__row--striped">
                    <td align="right">数据来源：</td>
                    <td>中国香港交易所</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card> -->

          </div>
        </div>
        <home-footer :siteInfo="siteInfo"></home-footer>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import HomeHeader from '../../components/HeaderOrder'
  import HomeFooter from '../../components/Footer'
  // import TableBox from './components/table'
  import * as api from '../../axios/api'

  export default {
    components: {
      HomeHeader,
      HomeFooter
    },
    props: {},
    data () {
      return {
        siteInfo: {}, // 站点信息
        sitesetInfo: {
          transAmBegin: '',
          transAmEnd: '',
          transPmBegin: '',
          transPmEnd: '',
          buyminnum: '',
          buymaxnum: '',
          buyminamt: '',
          buyfee: '',
          dutyfee: '',
          stayfee: '',
          staymaxday: '',
          begintime: '',
          endtime: '',
          withminamt: ''
        }, // 设置信息
        timer: null
      }
    },
    watch: {},
    computed: {},
    created () {
      // this.timer = setInterval(this.refreshList, 5000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    mounted () {
      this.getSettingSite()
      this.getInfoSite()
      this.$store.state.activeIndex = 'product'
    },
    methods: {
      async getInfoSite () {
        // 获取站点详情
        let result = await api.getInfoSite()
        if (result.status === 0) {
          this.siteInfo = result.data
        } else {
          this.$message.error(result.msg)
        }
      },
      async getSettingSite () {
        // 获取站点设置信息
        let result = await api.getSetting()
        if (result.status === 0) {
          this.sitesetInfo = result.data
        } else {
          this.$message.error(result.msg)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .introduce {
    padding: 20px;
    min-height: 400px;

    .title {
      font-size: 20px;
      line-height: 38px;
    }

    .introduce-body {
      line-height: 28px;
      padding-top: 30px;
      text-indent: 2em;
      font-size: 14px;
    }
  }

  .table-box {
    .table-title {
      padding: 0;
      color: #cbd3ff;
      width: 894px;
    }
  }

  .panel-box {
    margin: 0 auto;
    margin-top: 35px;
    width: 900px;
    box-shadow: 0.8px 0.6px 15px rgba(0, 0, 0, 0.1);

    .panel-title {
      padding: 6px 0;
      // background: #24252c;
    }

    .panel-body {
      padding: 15px 0;
      // background: #1f2026;
    }
  }
</style>
