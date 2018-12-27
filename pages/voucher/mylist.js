// pages/visitapply/list.js
Page({
  data: {
    list: [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3],
    tabs: [
      {
        num: 123,
        text: '未使用'
      },
      {
        num: 34,
        text: '已使用'
      },
      {
        num: 34,
        text: '已失效'
      }
    ],
    currentIndex: 0,
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
  upper(e) {
    console.log("顶部")
  },
  lower(e) {
    console.log("底部")
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
  }
})