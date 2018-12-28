const entries = [
  [
    { label: '申访记录', icon: './visit.png', url: '/pages/visitrecord/visitor' },
    { label: '我的放行单', icon: './release.png', url: '' },
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
  },
  onReady() {
  },
  onShow() {
    app.memberReadyCb = () => {
      let str = 'entries[0][0]'
      this.setData({
        avatar: app.globalData.fans.HeadImgUrl,
        nickname: app.globalData.fans.NickName,
        role: app.globalData.member.Type,
        [str]: {
          label: app.globalData.member.Type === '租户' ? '邀访记录' : '申访记录',
          icon: './visit.png',
          url: `/pages/visitrecord/${app.globalData.member.Type === '租户' ? 'staff' : 'visitor'}`
        }
      })
      this.totalQuery()
    }
    app.fansReadyCb = () => {
      app.checkMember()
    }
    app.init()
  },
  onHide() { },
  onUnload() { },
  onPullDownRefresh() { },
  onReachBottom() { },
  onShareAppMessage() { }
})