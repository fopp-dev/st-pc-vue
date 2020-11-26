<template>
  <div>

    <div class="header-nav">
      <div class="header-nav-wrap clearfix">
        <a @click="toTransform" class="nav-left pull-left">
          <!-- <img src="../assets/image/logo-mini.png" alt=""> -->
          <img :src="siteInfo.siteLogoSm" alt="">
        </a>
        <div class="nav-menu pull-left">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item :class="activeIndex === 'home'?'is-active':''" index="home">首页</el-menu-item>
            <el-menu-item index="stock">股票</el-menu-item>
            <el-menu-item index="transaction">交易大厅</el-menu-item>
            <el-menu-item index="product">产品介绍</el-menu-item>
            <el-menu-item index="down">软件下载</el-menu-item>
            <el-menu-item index="introduce">公司简介</el-menu-item>
            <el-menu-item index="notice">企业公告</el-menu-item>
          </el-menu>
        </div>
        <div class="user pull-right main-col">
          <!-- <el-button size="mini" class="test" type="primary" @click="onlineService">在线客服</el-button> -->
          <el-button v-if="!this.$store.state.haslogin" size="mini" class="test" type="primary" @click="toLogin">登 录</el-button>
          <el-button v-if="!this.$store.state.haslogin" size="mini" class="test" type="primary" @click="toRegister">注 册</el-button>
          <el-dropdown v-if="this.$store.state.haslogin" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="iconfont icon-yonghu"></i>{{$store.state.userInfo.realName}}<i
            class="el-icon-arrow-down el-icon--setting"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="!this.$store.state.haslogin" command="c">登录</el-dropdown-item>
              <!-- <el-dropdown-item v-if="this.$store.state.haslogin" command="d">用户中心</el-dropdown-item> -->
              <!-- <el-dropdown-item v-if="this.$store.state.haslogin" command="a">重置密码</el-dropdown-item> -->
              <el-dropdown-item v-if="this.$store.state.haslogin" command="b">注销</el-dropdown-item>
            </el-dropdown-menu>

          </el-dropdown>
          <a v-if="this.$store.state.haslogin" @click="toUserCenter" class="user-center">
            个人中心
          </a>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import * as api from '../axios/api'

  export default {
    components: {},
    props: {},
    data () {
      return {
        activeIndex: this.$store.state.activeIndex, // 当前选中
        navShow: {
          order: false,
          artical: false
        },
        outMoneyOrder: 0, // 出金待审核金额
        timer: null,
        siteInfo: {}
      }
    },
    watch: {
      haslogin (newVal, oldVal) {
        if (newVal !== oldVal && newVal) {
          this.getUserInfo()
        }
      }
    },
    computed: {
      haslogin () {
        return this.$store.state.haslogin
      }
    },
    created () {
      // this.timer = setInterval(this.refreshOutMoneyOrderNum, 1000*60)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    methods: {
      async getInfoSite () {
        // 获取网站信息
        let result = await api.getInfoSite()
        if (result.status === 0) {
          this.siteInfo = result.data
          this.$store.state.siteInfo = this.siteInfo
        } else {
          this.$message.error(result.msg)
        }
      },
      async getUserInfo () {
        // 获取用户信息
        let data = await api.getUserInfo()
        if (data.status === 0) {
          // 判断是否登录
          this.$store.state.haslogin = true
          this.$store.state.userInfo = data.data
          console.log(data.data)
        } else {
          this.$store.state.haslogin = false
          // this.$message.error(data.msg)
        }
      },
      toUserCenter () {
        // 进入个人中心
        this.$router.push('/user')
      },
      toLogin () {
        // 进入登录
        this.$router.push('/loginEmail')
      },
      onlineService () {
        // 进入在线客服
        window.open(this.siteInfo.onlineService, '_blank');
      },
      toRegister () {
        // 进入个人中心
        this.$router.push('/registerEmail')
      },
      async handleCommand (val) {
        if (val === 'a') {
          // 修改密码
        } else if (val === 'c') {
          this.$store.state.loginIsShow = true
        } else if (val === 'd') {
          this.$router.push('/user')
        } else {
          // 退出登录
          this.clearCookie()
          let data = await api.logout()
          if (data.status === 0) {
            // 退出登录清除本地存储 清除用户数据
            window.localStorage.clear()
            this.$store.state.haslogin = false
            this.$message.success('您已退出登录')
            this.$store.state.userInfo = {}
            this.$router.push('/loginEmail')
          } else {
            this.$message.error(data.msg)
          }
        }
      },
      handleSelect (key, keyPath) {
        if (key === 'transaction') {
          this.toTransform()
        } else {
          this.$router.push(key)
        }
        this.$store.state.activeIndex = key
      },
      async toTransform () {
        let opt = {
          pageNum: 1,
          pageSize: 1
        }
        this.loading = true
        let data = await api.getStock(opt)
        if (data.status === 0) {
          this.$router.push({
            path: '/transaction',
            query: {
              code: data.data.list[0].code
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      }
    },
    mounted () {
      this.getInfoSite()
      //  if(this.$store.state.haslogin){
      this.getUserInfo()

      //  }
    }
  }
</script>
<style lang="less" scoped>
  .el-header {
    width: 100%;
    height: 56px;
    padding-right: 0;
    min-width: 1200px;
  }

  .nav-left {
    line-height: 60px;
    margin-right: 24px;

    img {
      max-width: 180px;
      max-height: 50px;
      vertical-align: middle;
    }
  }

  .nav-menu {
    .el-menu {
      background: none;
      border-bottom: none;

      .el-menu-item {
        font-size: 16px;
        color: #fff;

        &:hover {
          color: #d0d0d0;
          background: none;
        }

        &:focus {
          color: #d0d0d0;
          background: none;
        }

        &.is-active {
          color: #efbb53;
          border-color: #efbb53;
        }

        &.on {
          color: #efbb53;
        }
      }

    }
  }

  .test:hover {
    background: rgb(156,4,0) !important;
  }

  .user {
    padding: 20px 0;
    color: #ccc;

    .icon-yonghu {
      font-size: 18px;
      margin-right: 6px;
    }

    .user-center {
      margin-right: 20px;
      margin-left: 20px;
      background: none;
      color: #ddd;
      cursor: pointer;
      margin-left: 10px;
    }
  }
</style>
