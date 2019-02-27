import { _floorlist, _companylist } from '../../common/visit'
const app = getApp()
Page({
  data: {
    floors: [],
    companies: [],
    companyIndex: null,
    floorIndex: null
  },
  totalQuery () {
    app.loading('加载中')
    _floorlist().then(res => {
      wx.hideLoading()
      this.setData({
        floors: res.data.Office_Room_distinct_ext
      })
    }).catch(err => {
      console.log(err)
      wx.hideLoading()
      wx.showModal({
        title: '对不起',
        content: '请求失败，请稍后再试！',
        showCancel: false
      })
    })
  },
  longcXz (e){
    let floorIndex = e.currentTarget.dataset.index
    this.setData({
      floorIndex
    }, () => {
      let floor = this.data.floors[floorIndex]
      _companylist(floor).then(res => {
        wx.hideLoading()
        this.setData({
          companies: res.data.Office_Company_list
        })
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showModal({
          title: '对不起',
          content: '请求失败，请稍后再试！',
          showCancel: false
        })
      })
    })
  },
  gongsXz (e){
    this.setData({
      companyIndex: e.target.dataset.index
    })
  },
  goNext () {
    if (this.data.floorIndex === null) {
      app.toast('请选择楼层')
      return
    }
    if (this.data.companyIndex === null) {
      app.toast('请选择公司')
      return
    }
    let id = this.data.companies[this.data.companyIndex].ID
    wx.navigateTo({
      url: `./visitor2?id=${id}`
    })
  },
  onLoad  (options) {
    // this.longcFor(this.data.longdIndex)
    this.totalQuery()
  },
  onReady  () {},
  onShow  () {},
  onHide  () {},
  onUnload  () {},
  onPullDownRefresh  () {},
  onReachBottom  () {},
  onShareAppMessage  () {}
})