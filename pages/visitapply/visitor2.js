// pages/visitapply/visitor2.js
Page({
  data: {
    name:'',
    tel:'',
    idCard:'',
    backinfo:'',
    changy: [
      { name: '夏松1', tel: '15999999999', idCard: '123456789777777777' },
      { name: '夏松2', tel: '15999999999', idCard: '123456789777777777' },
      { name: '夏松3', tel: '15999999999', idCard: '123456789777777777' },
      { name: '夏松4', tel: '15999999999', idCard: '123456789777777777' },
      { name: '夏松5', tel: '15999999999', idCard: '123456789777777777' },
      { name: '夏松6', tel: '15999999999', idCard: '123456789777777777' }
    ],
    changyIndex:0
  },
  nameInput(e) {
    let value = e.detail
    this.data.name = value
  },
  telInput(e) {
    let value = e.detail
    this.data.tel = value
  },
  codeInput(e) {
    let value = e.detail
    this.data.code = value
  },
  textInput(e) {
    let value = e.detail.value
    this.data.backinfo = value
  },
  changyXz: function(e){
    this.setData({
      changyIndex: e.target.dataset.index
    })
  },
  submit: function(){
    wx.showModal({
      title: '申请成功',
      content: '恭喜您已申请成功，点击确定按钮\r\n将跳转至开锁界面',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.navigateTo({
            url: './visitor3'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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