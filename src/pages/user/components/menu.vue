<template>
  <div class="nav-left">
    <el-menu class="h-nav-menu" :open='openedMenu' :collapse-transition='false' :default-openeds="['2']"
             :default-active="$store.state.userMenu" :unique-opened='true'>

      <el-menu-item class="banner-menu" index="disabled" disabled>
        <i class="iconfont icon-gerenzhongxin"></i>
        个人中心
      </el-menu-item>
      <router-link to="/user" tag="li">
        <el-menu-item index="2-1">账户资产</el-menu-item>
      </router-link>
      <router-link to="/message" tag="li">
        <el-menu-item index="2-13">
          <div class="el-badge item-mark">站内消息<sup class="el-badge__content el-badge__content--undefined is-fixed" style="position:absolute;transform: translateY(-50%) translateX(100%);top: 19px;left: 35px;right: auto;">
            {{unreadCount}}</sup>
          </div>
        </el-menu-item>
      </router-link>

      <el-menu-item class="banner-menu" index="disabled" disabled  v-if="$store.state.productSetting.fundsDisplay">
        <i class="iconfont icon-jiaoyi"></i>
        分仓配资
      </el-menu-item>
      <router-link to="/funds" tag="li" v-if="$store.state.productSetting.fundsDisplay">
        <el-menu-item index="2-21">配资主页</el-menu-item>
      </router-link>
      <router-link to="/days" tag="li" v-if="$store.state.productSetting.fundsDisplay">
        <el-menu-item index="2-22">按天配资</el-menu-item>
      </router-link>
      <router-link to="/applyfund" tag="li" v-if="$store.state.productSetting.fundsDisplay">
        <el-menu-item index="2-23">我的配资</el-menu-item>
      </router-link>
      <router-link to="/fundsholdposition" tag="li" v-if="$store.state.productSetting.fundsDisplay">
        <el-menu-item index="2-24">配资持仓</el-menu-item>
      </router-link>
      <router-link to="/fundssellorder" tag="li" v-if="$store.state.productSetting.fundsDisplay">
        <el-menu-item index="2-25">配资平仓</el-menu-item>
      </router-link>
     
      <el-menu-item class="banner-menu" index="disabled" disabled>
        <i class="iconfont icon-jiaoyi"></i>
        两融交易
      </el-menu-item>
      <router-link to="/holdposition" tag="li">
        <el-menu-item index="2-2">沪深持仓</el-menu-item>
      </router-link>
      <router-link to="/sell" tag="li">
        <el-menu-item index="2-3">沪深平仓</el-menu-item>
      </router-link>
      <router-link v-if="$store.state.productSetting.indexDisplay" to="/indexholdposition" tag="li">
        <el-menu-item index="indexhold">指数持仓</el-menu-item>
      </router-link>
      <router-link v-if="$store.state.productSetting.indexDisplay" to="/indexsell" tag="li">
        <el-menu-item index="indexsell">指数平仓</el-menu-item>
      </router-link>
      <router-link v-if="$store.state.productSetting.futuresDisplay" to="/futuresholdposition" tag="li">
        <el-menu-item index="futureshold">期货持仓</el-menu-item>
      </router-link>
      <router-link v-if="$store.state.productSetting.futuresDisplay" to="/futuressell" tag="li">
        <el-menu-item index="futuressell">期货平仓</el-menu-item>
      </router-link>
       <router-link to="/holdpositiongg" tag="li">
        <el-menu-item index="2-4">港股持仓</el-menu-item>
      </router-link>
      <router-link to="/sellgg" tag="li">
        <el-menu-item index="2-5">港股平仓</el-menu-item>
      </router-link>

      <el-menu-item class="banner-menu" index="disabled" disabled>
        <i class="iconfont icon-renminbigerenzhongxin"></i>
        资产管理
      </el-menu-item>
      <router-link to="/recharge" tag="li">
        <el-menu-item index="2-8">充值</el-menu-item>
      </router-link>
      <router-link to="/withdraw" tag="li">
        <el-menu-item index="2-7">提现</el-menu-item>
      </router-link>
      <router-link v-if="$store.state.productSetting.indexDisplay || $store.state.productSetting.futuresDisplay"
                   to="/changeCash" tag="li">
        <el-menu-item index="change">资产互转</el-menu-item>
      </router-link>
      <router-link
                   to="/changeCashMoney" tag="li">
        <el-menu-item index="changeMoney">资金互转</el-menu-item>
      </router-link>
      <router-link to="/rechargelist" tag="li">
        <el-menu-item index="2-5">充值记录</el-menu-item>
      </router-link>
      <router-link to="/withdrawlist" tag="li">
        <el-menu-item index="2-6">提现记录</el-menu-item>
      </router-link>
      <router-link to="/detaillist" tag="li">
        <el-menu-item index="2-4">资金明细</el-menu-item>
      </router-link>
      <el-menu-item class="banner-menu" index="disabled" disabled>
        <i class="iconfont icon-security"></i> 安全中心
      </el-menu-item>
      <router-link to="/auth" tag="li">
        <el-menu-item index="2-9">实名认证</el-menu-item>
      </router-link>
      <router-link to="/bank" tag="li">
        <el-menu-item index="2-10">银行卡</el-menu-item>
      </router-link>
      <router-link to="/changepwd" tag="li">
        <el-menu-item index="2-11">修改密码</el-menu-item>
      </router-link>
      <router-link to="/changeemail" tag="li">
        <el-menu-item index="2-13">修改邮箱</el-menu-item>
      </router-link>
      <el-menu-item index="2-12">
        <a style="margin-left:-30px;"  href="javascript:;" @click="tradeDialogVisible = true">{{$store.state.siteInfo.tradeAgreeTitle}}</a>
      </el-menu-item>
    </el-menu>
    <el-dialog
      :title="$store.state.siteInfo.tradeAgreeTitle"
      class="agree-dialog"
      :center='true'
      :visible.sync="tradeDialogVisible"
      width="80%">
      <div class="dialog-iframe">
        <div class="content" style="margin:20px;background:#fff;border-radius:5px;margin-top:60px;line-height:200%;">
            <p v-for="item in $store.state.siteInfo.tradeAgreeText.split('。')" :key="item">{{item}}。</p>
        </div>
        <!-- <iframe class="iframe-box" :src="$store.state.siteInfo.tradeAgree" frameborder="0"></iframe> -->
        <div slot="footer" class="text-center dialog-footer clearfix">
          <el-button type="primary" @click="agreeTrade">我已阅读并同意{{$store.state.siteInfo.tradeAgreeTitle}}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as api from '../../../axios/api'

  export default {
    name: 'MenuNav',
    components: {},
    props: {
      // index:{
      //   type:Array
      // }
    },
    data () {
      return {
        contentStyleObj: {
          height: ''
        },
        adminUrl: '',
        index: ['2'],
        unreadCount: 0,
        tradeDialogVisible: false
      }
    },
    watch: {},
    computed: {},
    created () {
      // 零时解决报错
      let data = {
        'indexDisplay': true
      }
      this.$store.state.productSetting = data

      window.addEventListener('resize', this.getHeight)
      this.getHeight()
      if (!this.$store.state.userInfo.adminName) {
        this.$store.state.userInfo.adminName = window.localStorage.getItem('adminName')
      }
      if (!this.$store.state.getProductSetting) {
        this.getProductSetting()
      }
    },
    destroyed () {
      window.removeEventListener('resize', this.getHeight)
    },
    mounted () {
      this.adminUrl = process.env.API_HOST
      if (this.adminUrl === undefined) {
        this.adminUrl = ''
      }
      // this.getInfoSite()
      this.getUnreadCount()
    },
    methods: {
      getHeight () {
        this.contentStyleObj.height = window.innerHeight - 2 + 'px'
      },
      async getInfoSite () {
        // 获取网站信息
        let result = await api.getInfoSite()
        if (result.status === 0) {
          this.$store.state.siteInfo = this.siteInfo
        } else {
          this.$message.error(result.msg)
        }
      },
      openedMenu (index) {
      },
      async getProductSetting () {
        // 获取网站产品设置信息
        let result = await api.getProductSetting()
        if (result.status === 0) {
          this.$store.state.productSetting = result.data
        } else {
          this.$message.error(result.msg)
        }
      },
      async getUnreadCount () {
        // 查询用户未读消息数
        let result = await api.getUnreadCount()
        if (result.status === 0) {
          this.unreadCount = result.data
        } else {
          //this.$message.error(result.msg)
        }
      },
      agreeTrade () {
        // this.agree = true
        this.tradeDialogVisible = false
      }
    }
  }
</script>
<style lang="less" scoped>
  .logo-img {
    padding: 10px 0;
  }

  .nav-left {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 500px;

    .iconfont {
      vertical-align: middle;
      margin-right: 8px;
    }
  }

  .el-menu-item {
    background: #fff;
  }

  .el-menu-item.is-active {
    background: #fff;
  }

  .el-submenu .el-menu {
    display: block !important;
  }

  .h-nav-menu .el-menu-item {
    padding-left: 50px !important;
  }

  .h-nav-menu .el-menu-item.banner-menu {
    padding-left: 20px !important;
  }
</style>
