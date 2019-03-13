import {
  _visitapplylist as _applylist,
  _visitreceivedlist as _receivedlist,
  _scan
} from '../../common/visit'
import { formatDate } from '../../utils/util'
import behaviors from './behaviors'
const computedBehavior = require('miniprogram-computed')
const app = getApp()
Component({
  data: {
    tabs: ['发出的申请', '收到的邀访'],
    lists: [[], []],
    pageIndexes: [1, 1],
    pageSize: 5,
    finished: [false, false],
    totalCount: [0, 0]
  },
  behaviors: [behaviors, computedBehavior],
  methods: {
    totalQuery() {
      app.loading('加载中')
      Promise.all([
        _applylist(app.globalData.member.ID, this.data.pageIndexes[0], this.data.pageSize),
        _receivedlist(app.globalData.member.Tel, this.data.pageIndexes[1], this.data.pageSize)
      ]).then(res => {
        wx.hideLoading()
        let lists = res.map(item => {
          item = item.data.Visit_Apply_list.map(ele => {
            ele.AddTime = formatDate(
              new Date(ele.AddTime),
              'yyyy/MM/dd hh:mm'
            )
            let today = new Date().getDate()
            ele.showBtn = new Date(ele.VisitTime).getDate() === today
            return ele
          })
          return item
        })
        let finished = []
        let totalCount = res.map((item, index) => {
          finished.push(lists[index].length >= item.data.total_count)
          return item.data.total_count
        })
        this.setData({
          lists,
          totalCount,
          finished
        })
        wx.stopPullDownRefresh()
      }).catch(err => {
        wx.stopPullDownRefresh()
        console.log(err)
        wx.hideLoading()
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
      let promise = null
      if (currentIndex === 0) {
        promise = Promise.resolve(_applylist(app.globalData.member.ID, this.data.pageIndexes[0], this.data.pageSize))
      }
      if (currentIndex === 1) {
        promise = Promise.resolve(_receivedlist(app.globalData.member.Tel, this.data.pageIndexes[1], this.data.pageSize))
      }
      promise.then(res => {
        let list = res.data.Visit_Apply_list.map(ele => {
          ele.AddTime = formatDate(
            new Date(ele.AddTime),
            'yyyy/MM/dd hh:mm'
          )
          let today = new Date().getDate()
          ele.showBtn = new Date(ele.VisitTime).getDate() === today
          return ele
        })
        this.data.lists[currentIndex] = this.data.lists[currentIndex].concat(list)
        let str = `lists[${currentIndex}]`
        this.setData({
          [str]: this.data.lists[currentIndex]
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
    again(e) {
      let card = e.currentTarget.dataset.card
      let { CompanyID, CompanyName } = card
      wx.navigateTo({
        url: `/pages/visitapply/visitor2?id=${CompanyID}&cname=${CompanyName}`
      })
    },
    onReachLower() {
      let currentIndex = this.data.currentIndex
      if (this.data.finished[currentIndex]) {
        return
      }
      let currentList = this.data.lists[currentIndex]
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
      if (!!options.current) {
        this.setData({
          currentIndex: options.current
        })
      }
      app.memberReadyCb = () => {
        this.totalQuery()
      }
      app.fansReadyCb = () => {
        app.checkMember()
      }
      app.init()
    },
    onReady() { },
    onShow() {},
    onHide() { },
    onUnload() { },
    onPullDownRefresh() {
      this.setData({
        pageIndexes: [1, 1],
        finished: [false, false],
        totalCount: [0, 0]
      })
      this.totalQuery()
    },
    onReachBottom() { },
    onShareAppMessage() { }
  }
})