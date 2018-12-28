import { _detail, _submit } from '../../common/shop'
import { formatDate } from '../../utils/util'
const WxParse = require('../../libs/wxParse/wxParse.js')
const app = getApp()
Page({
  data: {
    id: null,
    detail: {},
    tickets: []
  },
  getDetail() {
    app.loading('加载中')
    _detail(this.data.id).then(res => {
      wx.hideLoading()
      let detail = res.data.Merchants_Main
      detail.Label = detail.Label.split(',')
      let content = detail.Content
      WxParse.wxParse('content', 'html', content, this, 0)
      let tickets = res.data.Merchants_Ticket_list.map(item => {
        item.UseStart = formatDate(new Date(item.UseStart), 'yyyy-MM-dd')
        item.UseEnd = formatDate(new Date(item.UseEnd), 'yyyy-MM-dd')
        item.disabled = item.count <=0 ? true : false
        return item
      })
      this.setData({
        detail,
        tickets
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
  openMap () {
    wx.openLocation({
      name: this.data.detail.Name,
      address: this.data.detail.Address,
      latitude: Number(this.data.detail.Point_y),
      longitude: Number(this.data.detail.Point_x)
    })
  },
  call (e) {
    let phoneNumber = e.currentTarget.dataset.tel
    wx.makePhoneCall({
      phoneNumber
    })
  },
  submit(e) {
    let id = e.currentTarget.dataset.id
    app.loading('提交中')
    _submit(app.globalData.member.ID, id).then(r => {
      wx.hideLoading()
      wx.showModal({
        title: r.data.IsSuccess ? '恭喜您' : '对不起',
        content: r.data.Msg,
        showCancel: false,
        success: res => {
          if (res.confirm && r.data.IsSuccess) {
            this.getDetail()
          }
        }
      })
    }).catch(e => {
      console.log(e)
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(e) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  onLoad(options) {
    this.data.id = options.id
    app.memberReadyCb = () => {
      this.getDetail()
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
  onShareAppMessage() { }
})