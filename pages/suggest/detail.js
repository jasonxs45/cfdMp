const limit = 5
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
    },
    limit,
    imgArr: [
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png'
    ]
  },
  chooseImg() {
    wx.chooseImage({
      count: limit - this.data.imgArr.length,
      success: r => {
        let imgArr = this.data.imgArr.concat(r.tempFilePaths);
        console.log(imgArr)
        this.setData({
          imgArr: imgArr
        })
      },
      fail: e => { }
    })
  },
  delImg(e) {
    let index = e.currentTarget.dataset.index
    this.data.imgArr.splice(index, 1)
    this.setData({
      imgArr: this.data.imgArr
    })
  },
  previewImg(e) {
    let index = e.currentTarget.dataset.index
    wx.previewImage({
      current: this.data.imgArr[index],
      urls: this.data.imgArr
    })
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