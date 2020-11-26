import { post, get } from './index'
// import APIUrl from './api.url'

// var img_url = APIUrl.util.image // 这个就是图片上传的api url

// 登录
export function login (options) {
  return post('/api/user/login.do', options)
}
// 邮箱登录
export function loginEmail (options) {
  return post('/api/user/emailLogin.do', options)
}

// 注册
export function register (options) {
  return post('/api/user/reg.do', options)
}

// 邮箱注册
export function registerEmail (options) {
  return post('/api/user/emailReg.do', options)
}

// 注销登录
export function logout (options) {
  return post('/api/user/logout.do', options)
}

// 验证是否注册
export function checkPhone (options) {
  return post('/api/user/checkPhone.do', options)
}

// 更改密码 -- 忘记密码
export function forgetPas (options) {
  return get('/api/user/updatePwd.do', options)
}

// 更改密码 -- 忘记密码
export function forgetPasEmail (options) {
  return get('/api/user/changeEmailPWD.do', options)
}

// 修改密码
export function changePassword (options) {
  return get('/user/updatePwd.do', options)
}

// 获取验证码  -- 注册
export function getCode (options) {
  return get('/api/sms/sendRegSms.do', options)
}

// 获取验证码邮箱  -- 忘记密码
export function getCodeEmail (options) {
  return get('/api/user/sendEmailCode.do', options)
}

// 获取验证码  -- 忘记密码
export function sendForgetSms (options) {
  return get('/api/sms/sendRegSms.do', options)
}

// 获取图片验证码   -- 查看验证码
export function getCode2 (options) {
  return get('/code/getCode.do', options)
}

// 验证图片验证码 -- 验证
export function checkCode (options) {
  return get('/code/checkCode.do', options)
}

// ***首页****
// 获取大盘指数
export function getMarket (options) {
  return get('/api/stock/getMarket.do', options)
}

// 股票列表数据
export function getStock (options) {
  return get('/api/stock/getStock.do', options)
}

// 港股列表数据
export function getStockGg (options) {
  return get('/api/stockGg/getStock.do', options)
}

// 获取期货列表
export function getFutures (options) {
  return get('/api/futures/queryList.do', options)
}

// 获取首页显示的期货列表
export function getHomeFutures (options) {
  return get('/api/futures/queryHome.do', options)
}

// 查询期货产品的交易状态
export function queryTrans (options) {
  return get('/api/futures/queryTrans.do', options)
}

// 查询基币的汇率，对外暴露
export function queryExchange (options) {
  return get('/api/futures/queryExchange.do', options)
}

// 查询单个期货产品的行情（行情源的数据）
export function querySingleMarket (options) {
  return get('/api/futures/querySingleMarket.do', options)
}

// 期货下单
export function buyFutures (options) {
  return post('/user/buyFutures.do', options)
}

// 期货平仓
export function sellFutures (options) {
  return post('/user/sellFutures.do', options)
}

// 获取我的持仓单 - 期货
export function getFuturesOrderList (options) {
  return post('/user/futures/position/list.do', options)
}

// 获取期货网站设置信息
export function getFuturesSetting (options) {
  return post('/api/admin/getFuturesSetting.do', options)
}

// 查询列表页显示的指数
export function getListMarket (options) {
  return get('/api/index/queryListIndex.do', options)
}

// 单只股票行情数据
export function getSingleStock (options) {
  return post('/api/stock/getSingleStock.do', options)
}

// 港股单只股票行情数据
export function getSingleStockGg (options) {
  return post('api/stock/getGGSingleStock.do', options)
}

// 添加自选
export function addOption (options) {
  return post('/user/addOption.do', options)
}

// 删除自选
export function delOption (options) {
  return post('/user/delOption.do', options)
}

// 下单
export function buy (options) {
  return post('/user/buy.do', options)
}

// 港股下单
export function buyGg (options) {
  return post('/user/ggBuy.do', options)
}

// 用户平仓
export function sell (options) {
  return post('/user/sell.do', options)
}

// 港股用户平仓
export function sellGg (options) {
  return post('/user/ggSell.do', options)
}

// ***用户中心***/
// 用户详情
export function getUserInfo (options) {
  return post('/user/getUserInfo.do', options)
}

// 添加银行卡
export function addBankCard (options) {
  return post('/user/bank/add.do', options)
}

// 修改银行卡
export function updateBankCard (options) {
  return post('/user/bank/update.do', options)
}

// 获取银行卡信息
export function getBankCard (options) {
  return post('/user/bank/getBankInfo.do', options)
}

// 获取我的持仓单
export function getOrderList (options) {
  return post('/user/position/list.do', options)
}

// 获取我的港股持仓单
export function getOrderListGg (options) {
  return post('/user/ggPosition/list.do', options)
}

// 获取我的自选列表
export function getMyList (options) {
  return post('/user/option/list.do', options)
}

// 实名认证
export function userAuth (options) {
  return post('/user/auth.do', options)
}

// 资金明细
export function cashDetail (options) {
  return post('/user/cash/list.do', options)
}

// 提现记录
export function rechargeList (options) {
  return post('/user/recharge/list.do', options)
}

// 充值记录
export function withdrawList (options) {
  return post('/user/withdraw/list.do', options)
}

// 充值
export function inMoney (options) {
  return post('/user/recharge/inMoney.do', options)
}

// 提现
export function outMoney (options) {
  return post('/user/withdraw/outMoney.do', options)
}

// 取消提现
export function canceloutMoney (options) {
  return post('/user/withdraw/cancel.do', options)
}

// k线图
export function getMinK (options) {
  return post('/api/stock/getMinK.do', options)
}

// k线图
export function getMinKEcharts (options) {
  return post('/api/stock/getMinK_Echarts.do', options)
}

// 港股其他k线图
export function getMinKEchartsGg (options) {
  return post('/api/stock/getGGMinK_Echarts.do', options)
}

// 是否已添加自选
export function isOption (options) {
  return post('/user/isOption.do', options)
}

// 获取网站设置信息
export function getSetting (options) {
  return post('/api/admin/getSetting.do', options)
}
// 获取网站港股设置信息
export function getSettingHk (options) {
  return post('/api/admin/getHksSetting.do', options)
}

// 获取首页banner
export function getBannerByPlat (options) {
  return post('/api/site/getBannerByPlat.do', options)
}

// 获取支付渠道
export function getPayInfo (options) {
  return post('/api/site/getPayInfo.do', options)
}

// 获取单个渠道信息
export function getPayInfoDetail (options) {
  return post('/api/site/getPayInfoById.do', options)
}

// 获取网站设置信息
export function getInfoSite (options) {
  return post('/api/site/getInfo.do', options)
}

// 查询点差费率
export function findSpreadRateOne (options) {
  return post('/api/user/findSpreadRateOne.do', options)
}

// k线图 分时
export function getMinuteLine (options) {
  return post('/api/realTime/findStock.do', options, true)
}

// 港股k线图 分时
export function getMinuteLineGg (options) {
  return post('/api/stock/findGGStock.do', options, true)
}

// 公告列表
export function getArtList (options) {
  return post('/api/art/list.do', options)
}

// 公告详情
export function getArtDetail (options) {
  return post('/api/art/detail.do', options)
}

export function payLInk (url, options) {
  return post(url, options)
}

export function getjuhe1 (options) {
  return post('/user/pay/juhe1.do', options)
}

//H5支付
export function getjuheH5 (options) {
  return post('/user/pay/juheh5.do', options)
}

// 指数
// 获取指数网站设置信息
export function getIndexSetting (options) {
  return post('/api/admin/getIndexSetting.do', options)
}

// 获取我的持仓单 - 指数
export function getIndexOrderList (options) {
  return post('/user/index/position/list.do', options)
}

// 指数下单
export function indexBuy (options) {
  return post('/user/buyIndex.do', options)
}

// 指数平仓
export function sellIndex (options) {
  return post('/user/sellIndex.do', options)
}

// 用户资金户转
export function AmtChange (options) {
  return post('/user/transAmt.do', options)
}

// 本金港股互转
export function capitalTransHmtChange (options) {
  return post('/user/capitalTransHmt.do', options)
}

// 本金转港股约等于资金
export function capitalToHmtChange (options) {
  return post('/user/capitalToHmt.do', options)
}

// 港股转本金约等于资金
export function hmtToCapitalChange (options) {
  return post('/user/hmtToCapital.do', options)
}

// 本金A股互转
export function capitalTransAmtChange (options) {
  return post(' /user/capitalTransAmt.do ', options)
}

// 单只指数行情数据
export function getSingleIndex (options) {
  return post('/api/index/querySingleIndex.do', options)
}

// 获取产品配置信息
export function getProductSetting (options) {
  return post('/api/admin/getProductSetting.do', options)
}

// ==================最新，2020年7月9日23:12:11=========================
// 股票日线图
export function getDayK (options) {
  return post('/api/stock/getDayK.do', options)
}

// 期货日线图
export function getFuturesDayK (options) {
  return post('/api/stock/getFuturesDayK.do', options)
}

// 指数日线图
export function getIndexDayK (options) {
  return post('/api/stock/getIndexDayK.do', options)
}

// 期货分钟-k线图
export function getFuturesMinKEcharts (options) {
  return post('/api/stock/getFuturesMinK_Echarts.do', options)
}

// 指数分时-k线图
export function getIndexMinKEcharts (options) {
  return post('/api/stock/getIndexMinK_Echarts.do', options)
}

// 站内消息
export function getMessagelist (options) {
  return post('/user/cash/getMessagelist.do', options)
}

// 用户站内消息状态变已读
export function updateMessageStatus (options) {
  return post('/user/cash/updateMessageStatus.do', options)
}

// 查询用户未读消息数
export function getUnreadCount (options) {
  return post('/user/cash/getUnreadCount.do', options)
}


//============================分仓配资-相关，2020年7月23日19:14:55=========================================
// 分仓配资设置信息查询
export function getFundsSetting (options) {
  return post('/user/funds/getFundsSetting.do', options)
}

// 查询配资类型杠杆
export function getFundsTypeList (options) {
  return post('/user/funds/getFundsTypeList.do', options)
}

// 配资申请-添加
export function addFundsApply (options) {
  return post('/user/funds/addFundsApply.do', options)
}

// 配资申请-用户配资列表
export function getUserApplyList (options) {
  return post('/user/funds/getUserApplyList.do', options)
}

// 配资申请-用户操盘中子账户
export function getUserSubaccount (options) {
  return post('/user/funds/getUserSubaccount.do', options)
}

// 分仓交易-入仓
export function buyFunds (options) {
  return post('/user/funds/buyFunds.do', options)
}

// 分仓交易-获取我的配资持仓单
export function getFundsOrderList (options) {
  return post('/user/funds/fundsList.do', options)
}

// 分仓交易-配资平仓
export function sellFunds (options) {
  return post('/user/funds/sellFunds.do', options)
}

// 分仓交易-查询子账户详情
export function getSubaccountInfo (options) {
  return post('/user/funds/getSubaccountInfo.do', options)
}

// 配资杠杆-查询杠杆费率
export function getLeverRateInfo (options) {
  return post('/user/funds/getLeverRateInfo.do', options)
}

// 配资追加申请-保存
export function appendApply (options) {
  return post('/user/funds/appendApply.do', options)
}

// 配资追加申请-查询用户追加列表
export function getAppendList (options) {
  return post('/user/funds/getAppendList.do', options)
}

// 更换邮箱
export function updateEmail (options) {
  return post('/api/user/updateEmail.do', options)
}

export function updateLoginEmail(options){
  return post('/user/updateLoginEmail.do', options)
}