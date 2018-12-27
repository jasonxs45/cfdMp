// pages/suggest/suggest.js
Page({
  data: {
    currentIndex: 0,
    tabs: [
      {
        num: 123,
        text: '未处理',
        target: 'unhandleList'
      },
      {
        num: 34,
        text: '已处理',
        target: 'handledList'
      }
    ],
    lists: {
      unhandleList: [1, 2, 3],
      handledList: [1, 2, 3, 4, 5]
    }
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
  previewImg(e) {
    let index = e.currentTarget.dataset.index
    // wx.previewImage({
    //   current: this.data.imgArr[index],
    //   urls: this.data.imgArr
    // })
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