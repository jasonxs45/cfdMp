Component({
  data: {
    currentIndex: 0,
    tabs: [
      {
        num: 123,
        text: '待受理',
        target: 'unhandleList'
      },
      {
        num: 34,
        text: '已完成',
        target: 'handleList'
      },
      {
        num: 34,
        text: '已审核',
        target: 'finishList'
      }
    ],
    lists: {
      unhandleList: [1,2,3],
      handleList: [1, 2, 3, 4, 5],
      finishList: [1, 2, 3, 4]
    },
    assign: false,
    ranyuan: ['夏松1','夏松4','夏松3','夏松2'],
    ranyuanIndex:0
  },
  methods: {
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
    assignF(e) {
      console.log(e.currentTarget.dataset.id)
      this.setData({
        assign: true
      })
    },
    cancel() {
      this.setData({
        assign: false
      })
    },
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        assign: false
      })
      wx.navigateTo({
        url: '/pages/repairreception/details'
      })
    },
    onLoad(options) { },
    onReady() { },
    onShow() { },
    onHide() { },
    onUnload() { },
    onPullDownRefresh() { },
    onReachBottom() { },
    onShareAppMessage() { }
  }
})