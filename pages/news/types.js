import { _types } from '../../common/news'
import { formatDate } from '../../utils/util'
const app = getApp()
Page({
  data: {
    id: '',
    list: [],
    pageIndex: 1,
    pageSize: 6,
    finished: false,
    totalCount: 0
  },
  totalQuery() {
    app.loading('加载中')
    Promise.all([
      _types()
    ]).then(res => {
      console.log(res)
      wx.hideLoading()
      wx.stopPullDownRefresh()
      // 列表
      let list = res[0].data.News_Type_list.map(item => {
        item.AddTime = formatDate(new Date(item.AddTime), 'yyyy-MM-dd hh: mm')
        return item
      })
      let finished = false
      let totalCount = res[0].data.total_count
      finished = list.length >= totalCount
      this.setData({
        list,
        totalCount,
        finished
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.stopPullDownRefresh()
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  concatList() {
    _types().then(res => {
      console.log(res)
      let list = res.data.News_News_list.map(item => {
        item.AddTime = formatDate(new Date(item.AddTime), 'yyyy-MM-dd hh: mm')
        return item
      })
      this.data.list = this.data.list.concat(list)
      this.setData({
        list: this.data.list
      })
    }).catch(err => {
      console.log(err)
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  onLoad(options) {
    this.data.id = options.id
    app.memberReadyCb = () => {
    }
    app.fansReadyCb = () => {
      this.totalQuery()
    }
    app.init()
  },
  onReachBottom() {
    if (this.data.list.length >= this.data.totalCount) {
      this.setData({
        finished: true
      })
    } else {
      this.data.pageIndex += 1
      this.concatList()
    }
  },
  onPullDownRefresh() {
    this.setData({
      pageIndexes: 1,
      finished: false,
      totalCount: 0
    })
    this.totalQuery()
  },
  onShareAppMessage() {
    return app.shareInfo
  }
})