import { _list } from '../../common/survey'
const app = getApp()
Page({
  data: {
    list: [],
    pageIndex: 1,
    pageSize: 5,
    finished: false,
    totalCount: null
  },
  totalQuery() {
    app.loading('加载中')
    _list(this.data.pageIndex, this.data.pageSize)
      .then(res => {
        wx.stopPullDownRefresh()
        wx.hideLoading()
        let list = res.data.Research_Research_list
        let finished = false
        let totalCount = res.data.total_count
        finished = list.length >= totalCount
        this.setData({
          list,
          totalCount,
          finished
        })
      }).catch(err => {
        wx.stopPullDownRefresh()
        wx.hideLoading()
        wx.showModal({
          title: '对不起',
          content: JSON.stringify(err) || '网络错误，请稍后再试',
          showCancel: false
        })
      })
  },
  concatList() {
    _list(
      this.data.pageIndex,
      this.data.pageSize
    ).then(res => {
      this.data.list = this.data.list.concat(res.data.Research_Research_list)
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
  onLoad(options) {
    app.memberReadyCb = () => {
      this.totalQuery()
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
  onShareAppMessage() {
    return app.shareInfo
  }
})