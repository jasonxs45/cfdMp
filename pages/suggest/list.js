import { _userlist as _list } from '../../common/suggest'
import { formatDate } from '../../utils/util'
const app = getApp()
Page({
  data: {
    list: [],
    pageIndexe: 1,
    pageSize: 6,
    finished: false,
    totalCount: null
  },
  totalQuery() {
    app.loading('加载中')
    _list(app.globalData.member.ID, this.data.pageIndex, this.data.pageSize)
      .then(res => {
        wx.stopPullDownRefresh()
        wx.hideLoading()
        let list = res.data.Suggest_Apply_list.map(item => {
          item.AddTime = formatDate(new Date(item.AddTime), 'yyyy-MM-dd hh:mm')
          return item
        })
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
      app.globalData.member.ID,
      this.data.pageIndex,
      this.data.pageSize
    ).then(res => {
      this.data.list = this.data.list.concat(res.data.Suggest_Apply_list)
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
    this.data.list = []
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
  onShareAppMessage() { }
})