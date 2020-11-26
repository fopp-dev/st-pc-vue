<template>
  <el-container>
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-container class="main-wrapper">
      <el-main>
        <div class="introduce">
          <!-- <h2 class="title text-center">COMPANY PROFILE</h2>
          <h2 class="title text-center">软件下载</h2> -->
          <div class="introduce-body">
            <div class="box-1">
              <el-row>
                <el-col :span="12">
                  <div class="img-box">
                    <h2 onclick="window.location.href = 'http://media.hongkongjiayu.com/Jiayu_PC.zip'" style="margin-bottom:20px;cursor: pointer;">官方PC下载</h2>
                    <h2>官方App下载</h2>
                    <p class="sub-title">扫码下载移动版 随时随地交易</p>
                    <el-row>
                      <el-col :span="12">
                        <el-col :span="12">
                          <div class="type">安卓设备请扫<i class="animated bounce iconfont icon-shouzhitishi"></i></div>
                          <!-- <div ref="qrCodeDiv"></div> -->
                          <img class="eq-code" :src="siteInfo.siteAndroidImg" alt="">
                        </el-col>
                        <el-col :span="12">
                          <div class="type">苹果设备请扫<i class="animated bounce iconfont icon-shouzhitishi"></i></div>
                          <img class="eq-code" :src="siteInfo.siteIosImg" alt="">
                        </el-col>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="12">

                </el-col>
              </el-row>
            </div>
            <div class="box-2">
              <el-row>
                <h2 class="text-center">类型多样 安全省心</h2>
                <div class="img-box"></div>
                <el-col class="text-center" :span="6">
                  <div class="icon-box">
                    <p class="p1">行情分发 极速稳定</p>
                    <p class="p2"></p>
                  </div>
                </el-col>
                <el-col class="text-center" :span="6">
                  <div class="icon-box">
                    <p class="p1">客户至上 优享服务</p>
                    <p class="p2"></p>
                  </div>
                </el-col>
                <el-col class="text-center" :span="6">
                  <div class="icon-box">
                    <p class="p1">极速开户 超高配额</p>
                    <p class="p2"></p>
                  </div>
                </el-col>
                <el-col class="text-center" :span="6">
                  <div class="icon-box">
                    <p class="p1">买涨买跌 资产增值</p>
                    <p class="p2"></p>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="box-3">
              <el-row class="box-3">
                <el-col :span="12">
                  <img src="../../assets/image/safe.80738d0.png" alt="">
                </el-col>
                <el-col :span="12">
                  <h2>严谨合规</h2>
                  <p>从投资者根本利益出发，公平对待所有人，并致力于为投资者提供实现投资成功的最佳机会</p>
                </el-col>
              </el-row>
            </div>
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
  // 引入qrcode
  import QRCode from 'qrcode'

  export default {
    components: {
      HomeHeader,
      HomeFooter,
      QRCode
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
      // this.qrcode()
      this.timer = setInterval(this.refreshList, 5000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    mounted () {
      this.getBanner()
      this.getMarket()
      this.getInfoSite()
      this.$store.state.activeIndex = 'down'
    },
    methods: {
      qrcode () {
        let qrcode = new QRCode(this.$refs.qrCodeDiv, {
          width: 186,
          height: 186,
          text: process.env.API_HOST + '/down'
        })
        console.log(qrcode)
      },
      refreshList () {
        // 刷新 大盘指数
        this.getMarket()
      },
      async getBanner () {
        // 获取显示的banner
        let result = await api.getBannerByPlat({ platType: 'pc' })
        if (result.status === 0) {
          this.bannerList = result.data
        } else {
          this.$message.error(result.msg)
        }
      },
      async getMarket () {
        // 获取大盘指数
        let result = await api.getMarket()
        if (result.status === 0) {
          this.market = result.data.market
        } else {
          this.$message.error(result.msg)
        }
      },
      async getInfoSite () {
        // 获取设置信息
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
    min-height: 400px;
    background: #fff;

    .title {
      font-size: 20px;
      line-height: 38px;
    }

    .introduce-body {
      line-height: 28px;
      font-size: 14px;
      // width: 900px;
      // margin: 0 auto;
    }
  }

  .img-box {
    margin-top: 200px;

    h2 {
      font-size: 24px;
      color: #333;
      font-weight: 700;
      font-size: 32px;
    }

    .sub-title {
      font-size: 22px;
      color: #9E9E9E;
      margin-top: 20px;
      margin-bottom: 30px;
    }

    .eq-code {
      width: 150px;
      height: 150px;
    }

    .type {
      display: inline-block;
      color: #9E9E9E;
      margin-bottom: 8px;
    }
  }

  .box-1 {
    height: 620px;
    background: url('../../assets/image/banner-down.601b345.jpg') center no-repeat;
    background-size: cover;

    .el-row {
      width: 1000px;
      margin: 0 auto;
    }
  }

  .box-2 {
    padding-bottom: 60px;

    .img-box {
      background: url('../../assets/image/product-news3.dbf6e66.png') no-repeat;
      height: 95px;
      background-size: cover;
      background-position-x: left;
      background-position-y: top;
      margin-top: 0;
    }

    h2 {
      font-size: 30px;
      color: #333;
      padding: 60px 0;
    }

    .el-row {
      width: 1000px;
      margin: 0 auto;
    }

    .icon-box {
      .p1 {
        color: #333;
        font-size: 20px;
      }

      .p2 {
        color: #8e8e8e;
        font-size: 16px;
        margin-top: 10px;
      }
    }
  }

  .box-3 {
    height: 348px;
    background: #f9f9f9;

    .el-row {
      width: 1000px;
      margin: 0 auto;

      h2 {
        color: #333;
        font-size: 32px;
        margin-top: 100px;
        margin-bottom: 20px;
      }

      p {
        color: #666;
      }

      img {
        width: 50%;
        margin-top: 50px;
      }
    }
  }
</style>
