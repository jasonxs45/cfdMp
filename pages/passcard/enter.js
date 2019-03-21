// pages/passcard/enter.js
Page({
  data: {
    role: 1
  },
  onLoad (options) {
    app.memberReadyCb = () => {
    }
    app.fansReadyCb = () => {
    }
    app.init()
  },
  onReady () {},
  onShow () {},
  onHide () {},
  onUnload () {},
  onPullDownRefresh () {},
  onReachBottom () {},
  onShareAppMessage () {}
})