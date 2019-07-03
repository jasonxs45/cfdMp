import { _submit } from '../../common/suggest'
const app = getApp()
const limit = 5
Page({
  data: {
    categories: ['投诉', '建议', '表扬'],
    categoryIndex: null,
    limit,
    imgArr: [],
    desc: '',
    submitDisabled: false
  },
  cateChange (e) {
    this.setData({
      categoryIndex: e.detail
    })
  },
  getTypelist() {
  },
  submit() {
    if (this.data.categoryIndex === null) {
      app.toast('请选择类别！')
      return
    }
    if (!this.data.desc.trim()) {
      app.toast('请填写问题描述')
      return
    }
    let type = this.data.categories[this.data.categoryIndex]
    let img = this.data.imgArr.join(',')
    this.setData({
      submitDisabled: true
    })
    _submit(type, app.globalData.member.ID, this.data.desc, img).then(res => {
      this.setData({
        submitDisabled: false
      })
      wx.showModal({
        title: res.data.IsSuccess ? '提示' : '对不起',
        content: res.data.Msg,
        showCancel: false,
        success: r => {
          if (r.confirm) {
            if (res.data.IsSuccess) {
              wx.redirectTo({
                url: './list'
              })
            }
          }
        }
      })
    }).catch(err => {
      this.setData({
        submitDisabled: false
      })
      console.log(err)
      wx.showModal({
        title: '对不起',
        content: '网络错误，请稍后再试！',
        showCancel: false
      })
    })
  },
  categorySelect(e) {
    let value = e.detail.value
    this.setData({
      categoryIndex: value
    })
  },
  textHandler(e) {
    this.data.desc = e.detail.value
  },
  uploadOverHandler(e) {
    this.setData({
      imgArr: this.data.imgArr.concat(e.detail.group)
    })
  },
  delHandler(e) {
    this.setData({
      imgArr: e.detail.group
    })
  },
  onLoad(options) {
    app.memberReadyCb = () => {
      this.getTypelist()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onReady() { },
  onShow() { },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() {
    return app.shareInfo
  }
})