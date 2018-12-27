// pages/visitapply/visitor.js
let gongs = [
  '201 武汉矩阵互动科技有限公司',
  '201 武汉矩阵互动科技有限公司',
  '201 武汉矩阵互动科技有限公司',
  '201 武汉矩阵互动科技有限公司',
  '201 武汉矩阵互动科技有限公司',
  '201 武汉矩阵互动科技有限公司',
  '201 武汉矩阵互动科技有限公司',
  '201 武汉矩阵互动科技有限公司',
  '201 武汉矩阵互动科技有限公司'
]
Page({
  data: {
    gongs,
    gongsIndex:0,
    longd: [
      { zx: 2, zd: 19 },
      { zx: 20, zd: 37 },
      { zx: 38, zd: 57 }
    ],
    longc:[],
    longdIndex:0,
    longcIndex: 0,
  },
  longdXz: function(e){
    this.setData({
      longdIndex: e.target.dataset.index,
      longcIndex: 0
    })
    this.longcFor(e.target.dataset.index)
  },
  longcXz: function(e){
    this.setData({
      longcIndex: e.target.dataset.index,
    })
  },
  longcFor: function (index){
    let longd = this.data.longd[index]
    let longc = []
    for (let i = longd.zx; i <= longd.zd; i++) {
      longc.push(i)
    }
    this.setData({
      longc
    })
  },
  gongsXz: function(e){
    this.setData({
      gongsIndex: e.target.dataset.index
    })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.longcFor(this.data.longdIndex)
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