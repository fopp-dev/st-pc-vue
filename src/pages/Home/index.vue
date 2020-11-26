<template>
  <el-container>
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-container class="main-wrapper">
      <el-main style="padding-top: 60px;">
        <el-carousel class="carousel-box" :interval="5000" arrow="always" @change="cardChange">
          <el-carousel-item v-for="(item,i) in bannerList" :key="item.key">
            <div class="img-box" :style="'background-image:url('+ item.bannerUrl+')'">
              <!-- <img :src="" alt=""> -->
              <div class="top-box" style="z-index: 100000;">
                <p :class="currentIndex === i?'animated fadeInDown':'animated'">{{item.banTitle}}</p>
                <p :class="currentIndex === i?'prompt animated fadeInUp':'prompt'">{{item.banDesc}}</p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="box-container-wrap">
          <div class="box-container">
            <div class="box-wrap">
              <el-row>
                <span class="title">大盘指数</span>
                <a alt="去交易" @click="toTransform" class="pull-right">>></a>
              </el-row>
              <el-row class="market-box" :gutter="20">
                <el-col v-for="(i,index) in market" :key="i.key" v-if="index<=3" :span="6">
                  <div class="box">
                    <p :class="i.increaseRate>0?'red name':i.increaseRate<0?'green name':'name'">
                      {{i.name}}
                    </p>
                    <p :class="i.increaseRate>0?'red price':i.increaseRate<0?'green price':'price'">
                      {{Number(i.nowPrice).toFixed(2)}}
                      <i v-if="i.increaseRate>0" class="iconfont icon-up"></i>
                      <i v-if="i.increaseRate<0" class="iconfont icon-down"></i>
                    </p>
                    <p
                      :class="i.increaseRate>0?'red rate clearfix':i.increaseRate<0?'green rate clearfix':'rate clearfix'"
                      class="rate clearfix">
                      <span class="pull-left">{{Number(i.increase).toFixed(2)}}</span>
                      <span class="pull-right">{{i.increaseRate}}%</span>
                    </p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="table-box">
          <div class="table-title">
            <ul class="clearfix">
              <li class="pull-left"><a class="list" href="javascript:;">股票
              </a></li>
            </ul>
            <div>

            </div>
          </div>
          <table-box></table-box>
        </div>
        <div class="down-box">
          <div class="box">
            <p class="title">官方App下载</p>
            <p class="sub-title">扫码下载移动版 随时随地交易</p>

          </div>
          <div class="img-box">
            <el-row :gutter="20">
              <el-col :span="12">
                <p>安卓设备请扫<i class="animated bounce iconfont icon-shouzhitishi"></i></p>
                <img :src="siteInfo.siteAndroidImg" alt="">
              </el-col>
              <el-col :span="12">
                <p>苹果设备请扫<i class="animated bounce iconfont icon-shouzhitishi"></i></p>
                <img :src="siteInfo.siteIosImg" alt="">
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
  import TableBox from './components/table'
  import * as api from '../../axios/api'

  export default {
    components: {
      HomeHeader,
      TableBox,
      HomeFooter
    },
    props: {},
    data () {
      return {
        bannerList: [],
        market: {}, // 大盘详情
        siteInfo: {}, // 站点信息
        timer: null,
        currentIndex: 0
      }
    },
    watch: {},
    computed: {},
    created () {
      this.timer = setInterval(this.refreshList, 5000)
      this.$store.state.activeIndex = 'home'
      // this.$router.push({
      //     path: '/transaction?code=300750'
      // })
      //this.toTransform()
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    mounted () {
      this.getBanner()
      this.getMarket()
      this.getInfoSite()
    },
    methods: {
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
        // 获取大盘指数
        let result = await api.getInfoSite()
        if (result.status === 0) {
          this.siteInfo = result.data
        } else {
          this.$message.error(result.msg)
        }
      },
      async cardChange (index) {
        this.currentIndex = index
      },
      async toTransform () {
        let opt = {
          pageNum: 1,
          pageSize: 1
        }
        let data = await api.getStock(opt)
        if (data.status === 0) {
          this.$router.push({
            path: '/transaction',
            query: {
              code: data.data.list[0].code
              //,type: 'index'
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .main-wrapper {
    padding-top: 0;
  }

  /deep/ .el-main {
    padding: 60px 0px 0px 0px;
  }

  .carousel-box {
    height: 500px;
    text-align: center;

    /deep/ .el-carousel__container {
      height: 100%;
    }

    .img-box {
      height: 500px;
      // background: url(https://exproductdiag891.blob.core.windows.net/banner/0bb1ef6….jpg) ;
      background-position: center center;
      width: 100%;
      background-repeat: no-repeat;
      background-size: cover;
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }

    .top-box {
      position: absolute;
      top: 34%;
      width: 100%;

      .prompt {
        color: #b6b6b6;
        font-size: 18px;
      }
    }

    p {
      color: #efbb53;
      font-size: 34px;
      margin-bottom: 40px;
    }
  }

  .table-box {
    width: 1200px;
    margin: 0 auto;
  }

  .down-box {
    padding-top: 65px;
    text-align: center;
    padding-bottom: 15px;

    .box {
      margin-bottom: 10px;

      .title {
        font-size: 30px;
        height: 34px;
        line-height: 34px;
      }

      .sub-title {
        font-size: 14px;
        color: #5a657e;
        height: 20px;
        line-height: 20px;
        padding: 10px 0;
      }
    }

    .img-box {
      width: 500px;
      margin: 0 auto;

      p {
        text-align: center;
        padding: 0px 0 10px 0px;
        color: #5a657e;
      }

      img {
        width: 150px;
        height: 150px;
        margin: 0 20px;
      }
    }
  }
</style>
