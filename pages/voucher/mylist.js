import { _mylist as _list } from '../../common/shop'
import { formatDate } from '../../utils/util'
import { _getQr } from '../../common/getQr'
const app = getApp()
Page({
  data: {
    lists: [
      [], [], []
    ],
    tabMenus: [
      {
        name: '未使用'
      },
      {
        name: '已使用'
      },
      {
        name: '已失效'
      }
    ],
    currentIndex: 0,
    pageIndexes: [1, 1, 1],
    pageSize: 6,
    states: ['unused', 'used', 'outtime'],
    finished: [false, false, false],
    totalCount: [null, null, null],
    qrShow: false,
    qrImg: '',
    qrItem: null
  },
  tabChange(e) {
    let currentIndex = parseInt(e.detail)
    this.setData({
      currentIndex
    })
  },
  swiperChange(e) {
    let currentIndex = parseInt(e.detail.current)
    this.setData({
      currentIndex
    })
  },
  totalQuery() {
    app.loading('加载中')
    let arr = []
    for (let i = 0; i < this.data.tabMenus.length; i++) {
      let rel = Promise.resolve(_list(this.data.states[i], app.globalData.member.ID, this.data.pageIndexes[i], this.data.pageSize))
      arr.push(rel)
    }
    Promise.all(arr).then(res => {
      wx.hideLoading()
      wx.stopPullDownRefresh()
      let lists = res.map((item, index) => {
        let list = item.data.Merchants_Exchange_list.map(ele => {
          ele.UseStart = formatDate(new Date(ele.UseStart), 'yyyy-MM-dd')
          ele.UseEnd = formatDate(new Date(ele.UseEnd), 'yyyy-MM-dd')
          return ele
        })
        let disabled = this.data.states[index] === 'unused' ? false : true
        return {
          list,
          disabled
        }
      })
      let finished = []
      let totalCount = res.map((item, index) => {
        finished.push(lists[index].list.length >= item.data.total_count)
        return item.data.total_count
      })
      this.setData({
        lists,
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
    let currentIndex = this.data.currentIndex
    let currentPageIndex = this.data.pageIndexes[this.data.currentIndex]
    console.log(currentPageIndex)
    _list(
      this.data.states[currentIndex],
      app.globalData.member.ID,
      this.data.pageIndexes[currentIndex],
      this.data.pageSize
    ).then(res => {
      let list = res.data.Merchants_Exchange_list.map(ele => {
        ele.UseStart = formatDate(new Date(ele.UseStart), 'yyyy-MM-dd')
        ele.UseEnd = formatDate(new Date(ele.UseEnd), 'yyyy-MM-dd')
        return ele
      })
      this.data.lists[currentIndex].list = this.data.lists[currentIndex].list.concat(list)
      let str = `lists[${currentIndex}].list`
      this.setData({
        [str]: this.data.lists[currentIndex].list
      })
    }).catch(err => {
      wx.showModal({
        title: '对不起',
        content: JSON.stringify(err) || '网络错误，请稍后再试',
        showCancel: false
      })
    })
  },
  showQr (e) {
    let index = e.currentTarget.dataset.index
    let item = this.data.lists[this.data.currentIndex].list[index]
    this.setData({
      qrShow: true,
      qrImg: _getQr(item.TicketCodeContent),
      qrItem: item
    })
  },
  hideQr(e) {
    this.setData({
      qrShow: false,
      qrImg: ''
    })
  },
  onReachLower() {
    let currentIndex = this.data.currentIndex
    if (this.data.finished[currentIndex]) {
      return
    }
    let currentList = this.data.lists[currentIndex].list
    let currentTotalCount = this.data.totalCount[currentIndex]
    if (currentList.length >= currentTotalCount) {
      this.data.finished[currentIndex] = true
      this.setData({
        finished: this.data.finished
      })
    } else {
      this.data.pageIndexes[currentIndex] += 1
      this.concatList()
    }
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
    this.data.finished = [false, false, false]
    this.data.pageIndexes = [1, 1, 1]
    this.data.totalCount = [null, null, null]
    this.setData({
      finished: this.data.finished,
      lists: this.data.lists
    })
    this.totalQuery()
  },
  onShareAppMessage() {
    return app.shareInfo
  }
})