import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInfo: {
    phone: ''
  },
  bankInfo: {}, // 银行卡信息
  siteInfo: {}, // 站点基本信息发
  loginIsShow: false,
  haslogin: false, // 是否登录
  hide: false, // 数字隐藏显示
  userMenu: '2-1',
  productSetting: null
}

export default new Vuex.Store({
  state
})
