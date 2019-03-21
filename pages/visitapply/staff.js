import { _invitesubmit as _submit, _contactorlist } from '../../common/visit'
import { NAME_REG, TEL_REG } from '../../utils/reg'
const app = getApp()
let now = new Date()
let nowYear = now.getFullYear()
let nowMonth = now.getMonth() + 1
let nowDate = now.getDate()
let nowHour = now.getHours()
let nowMinute = '00' + now.getMinutes()
nowMinute = nowMinute.substr(nowMinute.length - 2)
Component({
  behaviors: [],
  data: {
    name: '',
    tel: '',
    backinfo: '',
    visitorCount: 1,
    submitDisabled: false,
    sidemenuShow: false,
    contactList: [],
    datetimeValue: `${nowYear}-${nowMonth}-${nowDate} ${nowHour}:${nowMinute}`
  },
  methods: {
    nameInput(e) {
      let value = e.detail
      this.data.name = value
    },
    telInput(e) {
      let value = e.detail
      this.data.tel = value
    },
    textInput(e) {
      let value = e.detail.value
      this.data.backinfo = value
    },
    datetimeChange(e) {
      let datetimeValue = e.detail
      this.data.datetimeValue = datetimeValue
      this.setData({
        datetimeValue: this.data.datetimeValue
      })
    },
    openSide() {
      this.setData({
        sidemenuShow: true
      }, () => {
        this.getContactList()
      })
    },
    hideSide() {
      this.setData({
        sidemenuShow: false
      })
    },
    getContactList() {
      app.loading('加载中')
      _contactorlist(app.globalData.member.ID, '', '').then(res => {
        wx.hideLoading()
        let list = []
        list = res.data.Visit_Contacts_list || []
        this.setData({
          contactList: list
        })
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showModal({
          title: '对不起',
          content: '请求失败，请稍后再试',
          showCancel: false
        })
      })
    },
    selectContactor(e) {
      let index = e.currentTarget.dataset.index
      let contactor = this.data.contactList[index]
      this.data.name = contactor.Name
      this.data.tel = contactor.Tel
      this.setData({
        name: this.data.name,
        tel: this.data.tel
      }, () => {
        this.hideSide()
      })
    },
    submit() {
      if (!NAME_REG.test(this.data.name)) {
        app.toast('请填写2-6位中文姓名')
        return
      }
      if (!TEL_REG.test(this.data.tel)) {
        app.toast('请填写正确格式的手机号码')
        return
      }
      if (!this.data.datetimeValue) {
        app.toast('请选择约访时间')
        return
      }
      let MemberID = app.globalData.member.ID
      let Name = this.data.name
      let Tel = this.data.tel
      let VisitTime = this.data.datetimeValue
      let Remark = this.data.backinfo
      let Number = this.data.count
      this.setData({
        submitDisabled: true
      })
      _submit(
        MemberID, Name, Tel, VisitTime, Remark, Number
      ).then(res => {
        this.setData({
          submitDisabled: false
        })
        wx.showModal({
          title: res.data.IsSuccess ? '温馨提示' : '对不起',
          content: res.data.Msg,
          showCancel: false,
          success: r => {
            if (r.confirm && res.data.IsSuccess) {
              wx.navigateTo({
                url: '/pages/visitrecord/staff'
              })
            }
          }
        })
      }).catch(err => {
        this.setData({
          submitDisabled: false
        })
        console.log(err)
        wx.showModal({
          title: '对不起',
          content: '网络错误，请稍后再试',
          showCancel: false
        })
      })
    },
    onLoad(options) {
      this.setData({
        name: options.name || '',
        tel: options.tel || ''
      })
    },
    onReady() { },
    onShow() {
      app.memberReadyCb = () => {
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
  }
})