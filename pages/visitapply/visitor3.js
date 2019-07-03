import { _visitinfo, _scan } from '../../common/visit'
const app = getApp()
Page({
  data: {
    id: null,
    info: null
  },
  getInfo () {
    let mid = app.globalData.member.ID || wx.getStorageSync('member').ID
    app.loading('加载中')
    _visitinfo(this.data.id, mid).then(res => {
      wx.hideLoading()
      this.setData({
        info: res.data.Visit_Apply
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: '请求失败，请稍后再试',
        showCancel: false
      })
    })
  },
  openScan() {
    wx.scanCode({
      onlyFromCamera: true,
      success: res => {
        let code = res.result
        app.loading('处理中')
        _scan(code).then(res => {
          wx.hideLoading()
          if (res.data.IsSuccess) {
            wx.showModal({
              title: '温馨提示',
              content: res.data.Msg,
              showCancel: false
            })
          } else {
            wx.showModal({
              title: '对不起',
              content: res.data.Msg,
              showCancel: false
            })
          }
        }).catch(err => {
          console.log(err)
          wx.hideLoading()
          wx.showModal({
            title: '对不起',
            content: '请求失败，请稍后再试',
            showCancel: false
          })
        })
      }
    })
  },
  onLoad (options) {
    this.data.id = options.id
    app.memberReadyCb = () => {
      this.getInfo()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
  },
  onReady () {},
  onShow () {
    app.init()
  },
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage() {
    return app.shareInfo
  }
})