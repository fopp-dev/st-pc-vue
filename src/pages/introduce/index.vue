<template>
  <el-container>
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-container class="main-wrapper">
      <el-main>

        <div class="introduce">
          <h2 class="title text-center">COMPANY PROFILE</h2>
          <h2 class="title text-center">公司简介</h2>
          <div class="introduce-body">
            <p>
              {{siteInfo.siteIntro}}
            </p>
            <p>
              {{siteInfo.companyInfo}}
            </p>
            <div class="risk-box">
              <p>风险提示：</p>
              <P>
                {{siteInfo.riskNotice}}
              </P>
            </div>
            <el-row class="text-center">
              <el-col :span="12">
                <img class="cert-img" preview="0" preview-text="资格证书" :src="siteInfo.certImg1" alt="">
              </el-col>
              <el-col :span="12">
                <img class="cert-img" preview="0" preview-text="资格证书" :src="siteInfo.certImg2" alt="">
              </el-col>
            </el-row>
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
  import * as api from '../../axios/api'

  export default {
    components: {
      HomeHeader,
      HomeFooter
    },
    props: {},
    data () {
      return {
        bannerList: [],
        market: {}, // 大盘详情
        siteInfo: {}, // 站点信息
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
      this.getInfoSite()
    },
    methods: {
      async getInfoSite () {
        // 获取大盘指数
        let result = await api.getInfoSite()
        if (result.status === 0) {
          this.siteInfo = result.data
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
    width: 1200px;
    margin: 0 auto;

    .title {
      font-size: 20px;
      line-height: 38px;
    }

    .introduce-body {
      line-height: 28px;
      padding-top: 30px;
      text-indent: 2em;
      font-size: 14px;

      p {
        margin-bottom: 10px;
      }
    }

    .risk-box {
      margin-top: 25px;
    }

    .cert-img {
      margin-top: 30px;
      max-height: 500px;
    }
  }

  .pswp__caption__center {
    text-align: center;
  }
</style>
