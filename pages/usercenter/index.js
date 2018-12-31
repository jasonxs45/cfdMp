import { _updateInfo } from '../../common/usercenter'
const entries = [
  [
    { label: '申访记录', icon: './visit.png', url: '/pages/visitrecord/visitor' },
    { label: '我的放行单', icon: './release.png', url: '/pages/passcard/list?role=1' },
    { label: '我的活动', icon: './activities.png', url: '/pages/myactivities/list' },
    { label: '我的卡券', icon: './card.png', url: '/pages/voucher/mylist' },
    { label: '我的报修', icon: './repair.png', url: '/pages/repairuser/list' },
    { label: '服务建议', icon: './advise.png', url: '/pages/news/detail?id=2' },
    { label: '关于我们', icon: './about.png', url: '/pages/news/detail?id=3' }
  ]
]
const app = getApp()
Page({
  data: {
    avatar: '',
    nickname: '',
    role: '',
    entries
  },
  totalQuery() {
    // app.loading('加载中')
  },
  onLoad(options) {
    app.memberReadyCb = () => {
      this.setData({
        avatar: app.globalData.fans.HeadImgUrl,
        nickname: app.globalData.fans.NickName,
        role: app.globalData.member.Type
      })
      this.totalQuery()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onReady() {
  },
  onShow() {
    _updateInfo(app.globalData.uid).then(result => {
      if (result.data.IsSuccess) {
        // 判断是否有粉丝信息，有就直接获取，没有就跳转授权页面
        if (result.data.Data.Fans) {
          wx.setStorageSync('fans', result.data.Data.Fans)
          app.globalData.fans = result.data.Data.Fans
          wx.setStorageSync('member', result.data.Data.Member)
          app.globalData.member = result.data.Data.Member
          this.setData({
            avatar: app.globalData.fans.HeadImgUrl,
            nickname: app.globalData.fans.NickName,
            role: app.globalData.member.Type
          })
        } else {
          wx.redirectTo({
            url: '/pages/login/index'
          })
        }
      } else {
        console.log(result)
        wx.showModal({
          title: '对不起',
          content: '网络问题，请稍后再试！',
          showCancel: false
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() { }
})