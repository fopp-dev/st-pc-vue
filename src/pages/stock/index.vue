<template>
  <el-container>
    <el-header>
      <home-header></home-header>
    </el-header>
    <el-container class="main-wrapper">
      <el-main>
        <div class="table-box">
          <div class="table-search">
            <el-row type="flex" justify='end'>
              <el-col :span="8">
                <el-input v-model="form.stock" placeholder="请输入股票代码和股票">
                  <el-button @click="getList" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
            </el-row>
          </div>
          <div class="table-title">
            <ul class="clearfix">
              <li class="pull-left">
                <a class="list" href="javascript:;">股票详情
                </a></li>
            </ul>
            <div>

            </div>
          </div>
          <table-box :list='list' :getData='getList' :handleOptions="handleOptions"></table-box>
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
        timer: null,
        form: {
          stock: '',
          pageNum: 1,
          pageSize: 15
        },
        list: {
          list: []
        },
        loading: false,
        refresh: false, // 刷新中
        changeTextClass: {}, // 表格中的数据变化
        siteInfo: {}
      }
    },
    watch: {},
    computed: {},
    created () {
      this.timer = setInterval(this.refreshList, 60000)
      this.$store.state.activeIndex = 'stock'
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    mounted () {
      this.getList()
      this.getInfoSite()
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
      async getList () {
        // 获取表格数据
        let opt = {
          keyWords: this.form.stock,
          pageNum: this.form.pageNum,
          pageSize: 15
        }
        this.loading = true
        let data = await api.getStock(opt)
        if (data.status === 0) {
          // data.data.list.forEach(element => {
          //     this.list.push(element)
          // });
          this.list = data.data
        } else {
          this.$message.error(data.msg)
        }
        this.loading = false
      },
      async refreshList () {
        if (this.refresh || this.loading) {
          return
        }
        this.refresh = true
        this.changeTextClass = {}
        // 获取表格数据
        let opt = {
          keyWords: this.form.stock,
          pageNum: this.form.pageNum,
          pageSize: 15
        }
        let data = await api.getStock(opt)
        this.refresh = false
        if (data.status === 0) {
          data.data.list.forEach((element, i) => {
            this.changeTextClass[i] = ''
            if (data.data.list[i].nowPrice !== this.list.list[i].nowPrice) {
              this.changeTextClass[i] = true // 设置对应的动画过滤
              this.list.list[i].nowPrice = data.data.list[i].nowPrice // 现价
              this.list.list[i].hcrate = data.data.list[i].hcrate // 涨跌幅
              this.list.list[i].today_max = data.data.list[i].today_max // 最高
              this.list.list[i].today_min = data.data.list[i].today_min // 最低
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      },
      handleOptions (opts) {
        this.form = { ...this.form, ...opts }
      }
    }
  }
</script>
<style lang="less" scoped>
  .table-box {
    padding-top: 65px;
    padding-bottom: 100px;
    width: 1200px;
    margin: 0 auto;
  }

  .table-search {
    padding: 20px 0
  }
</style>
