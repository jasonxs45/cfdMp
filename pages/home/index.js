import { fetch } from '../../common/api'
import { _homelist } from '../../common/menus'
import { _list as _bannerlist } from '../../common/banner'
import { _list as _actlist } from '../../common/activity'
import { _homeshoplist } from '../../common/shop'
const entries = []
const app = getApp()
Page({
  data: {
    banners: [],
    actList: [],
    shopList: [],
    entries: [],
    power: null
  },
  getList() {
    let member = app.globalData.member || wx.getStorageSync('member')
    this.data.power = member && member.Type === '租户' ? 2 : 1
    _homelist(this.data.power).then(res => {
      // 入口菜单
      let entries = res.data.Home_Menu_list
      this.setData({
        entries
      })
    }).catch(err => {
      console.log(err)
    })
  },
  totalQuery() {
    // app.loading('加载中')
    Promise.all([
      _bannerlist('首页banner'),
      _actlist('unover', 1, 3),
      _homeshoplist()
    ]).then(res => {
      console.log(res)
      wx.hideLoading()
      // banner
      let banners = res[0].data.AD_Config_list
      // 活动列表
      let actList = res[1].data.Activity_Activity_list
      // 商家列表
      let shopList = res[2].data.Merchants_Main_list.map(item => {
        item.Label = item.Label.split(',')
        return item
      })
      this.setData({
        banners,
        actList,
        shopList
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  onLoad() {
    app.memberReadyCb = () => {
    }
    app.fansReadyCb = () => {
      this.totalQuery()
    }
    app.init()
  },
  onShow() {
    let uid = app.globalData.uid || wx.getStorageSync('uid')
    if (uid) this.getList()
  }
})