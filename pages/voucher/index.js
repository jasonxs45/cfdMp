import { _list as _banner } from '../../common/banner'
import { _shoplist as _list } from '../../common/shop'
const app = getApp()
Page({
  data: {
    banners: [],
    list: [],
    pageIndex: 1,
    pageSize: 6,
    finished: false,
    totalCount: 0
  },
  totalQuery () {
    app.loading('加载中')
    Promise.all([
      _banner('商户banner'),
      _list(this.data.pageIndex, this.data.pageSize)
    ]).then(res => {
      wx.stopPullDownRefresh()
      wx.hideLoading()
      this.setData({
        banners: res[0].data.AD_Config_list,
        list: res[1].data.Merchants_Main_list.map(item => {
          item.Label = item.Label.split(',')
          return item
        }),
        totalCount: res[1].data.total_count
      })
    }).catch(err =>{
      wx.stopPullDownRefresh()
      console.log(err)
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: '请求失败，请稍后再试！',
        showCancel: false
      })
    })
  },
  concatList() {
    _list(
      this.data.pageIndex,
      this.data.pageSize
    ).then(res => {
      let list = res.data.Merchants_Main_list.map(item => {
        item.Label = item.Label.split(',')
        return item
      })
      this.data.list = this.data.list.concat(list)
      this.setData({
        list: this.data.list
      })
    }).catch(err => {
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  onLoad (options) {
    app.memberReadyCb = () => {
    }
    app.fansReadyCb = () => {
      this.totalQuery()
    }
    app.init()
  },
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onPullDownRefresh() {
    this.data.finished = false
    this.data.pageIndex = 1
    this.data.totalCount = null
    this.setData({
      finished: this.data.finished,
      list: this.data.list
    })
    this.totalQuery()
  },
  onReachBottom() {
    if (this.data.finished) {
      return
    }
    let currentList = this.data.list
    let currentTotalCount = this.data.totalCount
    if (currentList.length >= currentTotalCount) {
      this.data.finished = true
      this.setData({
        finished: this.data.finished
      })
    } else {
      this.data.pageIndex += 1
      this.concatList()
    }
  },
  onShareAppMessage () {}
})