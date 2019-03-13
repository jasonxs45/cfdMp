import { _visitorsubmit as _submit } from '../../common/visit'
const app = getApp()
Page({
  data: {
    cid: null,
    cname: '',
    mid: null,
    backinfo:''
  },
  textInput(e) {
    let value = e.detail.value
    this.data.backinfo = value
  },
  submit(){
    if (!this.data.backinfo.trim()) {
      app.toast('请填写来访事由')
      return
    }
    app.loading('加载中')
    _submit(
      this.data.mid,
      this.data.cid,
      this.data.backinfo
    ).then(res => {
      console.log(res)
      wx.hideLoading()
      wx.showModal({
        title: res.data.IsSuccess?'温馨提示':'对不起',
        content: res.data.Msg,
        showCancel: false,
        success:r => {
          if (r.confirm && res.data.IsSuccess) {
            wx.navigateTo({
              url: `./visitor3?id=${res.data.Data}`
            })
          }
        }
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: '请求错误，请稍后再试',
        showCancel: false
      })
    })
  },
  onLoad (options) {
    this.data.cid = options.id
    this.data.cname = options.cname
    this.setData({
      cname: this.data.cname
    })
    app.memberReadyCb = () => {
      this.data.mid = app.globalData.member.ID
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
  onShareAppMessage () {}
})