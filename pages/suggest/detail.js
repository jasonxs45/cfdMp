import { _userdetail as _detail } from '../../common/suggest'
import { formatDate } from '../../utils/util'
const app = getApp()
Page({
  data: {
    id: null,
    detail: null
  },
  getDetail() {
    app.loading('加载中')
    _detail(this.data.id, app.globalData.member.ID).then(res => {
      wx.hideLoading()
      let detail = res.data.Suggest_Apply
      detail.AddTime = formatDate(new Date(detail.AddTime), 'yyyy/MM/dd hh:mm')
      detail.ReplyTime = detail.ReplyTime ? formatDate(new Date(detail.ReplyTime), 'yyyy/MM/dd hh:mm') : null
      detail.Img = detail.Img?detail.Img.split(','):[]
      this.setData({
        detail
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  onLoad(options) {
    this.data.id = options.id
  },
  onReady () {},
  onShow () {
    app.memberReadyCb = () => {
      this.getDetail()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
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