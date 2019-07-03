import { _homelist, _servicelist } from '../../common/menus'
const entries = [
  {
    icon: '',
    name: '访客预约',
    url: '/pages/visitapply/index'
  },
  {
    icon: '',
    name: '会务预约',
    url: '/pages/visitapply/index'
  },
  {
    icon: '',
    name: '电子放行单',
    url: '/pages/conference/apply'
  },
  {
    icon: '',
    name: '报修投诉',
    url: '/pages/repairuser/submit'
  },
  {
    icon: '',
    name: '积分商城',
    url: '/pages/onlineshops/index'
  }
]
const app = getApp()
Page({
  data: {
    entries: [],
    powerEntries: [],
    avatar: '',
    nickname: '',
    role: ''
  },
  getEntries() {
    let uid = app.globalData.uid || wx.getStorageSync('uid')
    _servicelist(uid).then(res => {
      // 入口菜单
      let entries = res.data.Data.Menu
      let powerEntries = res.data.Data.PowerMenu
      this.setData({
        entries,
        powerEntries
      })
    }).catch(err => {
      console.log(err)
    })
  },
  totalQuery() {},
  onLoad(options) {
    app.memberReadyCb = () => {
    }
    app.fansReadyCb = () => {
      this.totalQuery()
      this.getEntries()
      this.setData({
        avatar: app.globalData.fans.HeadImgUrl,
        nickname: app.globalData.fans.NickName,
        role: app.globalData.member.Type
      })
    }
    app.init()
  },
  onShow() {
    let uid = app.globalData.uid || wx.getStorageSync('uid')
    if (uid) {
      this.getEntries()
    }
  },
  onShareAppMessage() {
    return app.shareInfo
  }
})