const limit = 5
Page({
  data: {
    limit,
    imgArr: [
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png',
      '../../images/logo.png'
    ],
    submitDisabled: false
  },
  chooseImg() {
    wx.chooseImage({
      count: limit - this.data.imgArr.length,
      success: r => {
        let imgArr = this.data.imgArr.concat(r.tempFilePaths);
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
  onLoad(options) {
    console.log(options)
  },
  onReady() { },
  onShow() { },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() { }
})