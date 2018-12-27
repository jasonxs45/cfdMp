import { _questions, _submit, _answered, _answers } from '../../common/survey'
const app = getApp()
const computedBehavior = require('miniprogram-computed')
Component({
  behaviors: [computedBehavior],
  data: {
    id: null,
    detail: null,
    questions: [],
    answers: [],
    currentIndex:0,
    typeDesc: {
      radio: '单选',
      checkbox: '多选',
      textarea: '填空'
    },
    answered: null,
    myanswer: []
  },
  computed: {
    currentType () {
      let type = ''
      if (this.data.questions.length > 0) {
        type = this.data.questions[this.data.currentIndex].type
      }
      return type
    },
    currentOptions () {
      let options = ''
      if (this.data.questions.length > 0) {
        options = this.data.questions[this.data.currentIndex].Options
      }
      return options
    },
    percent () {
      return 100 * (this.data.currentIndex + 1) / this.data.questions.length
    },
    title () {
      let title = ''
      if (this.data.questions.length > 0) {
        title = this.data.questions[this.data.currentIndex].Question
      } 
      return title
    }
  },
  methods: {
    radioChange(e) {
      let value = e.detail.value
      let options = this.data.questions[this.data.currentIndex].Options
      options = options.map(item => {
        item.checked = false
        if (item.value === value) {
          item.checked = true
        }
        return item
      })
      let str = `questions[${this.data.currentIndex}].Options`
      this.setData({
        [str]: options
      })
      let id = this.data.questions[this.data.currentIndex].ID
      this.data.answers.splice(this.data.currentIndex, 1, {
        id,
        value
      })
    },
    checkboxChange(e) {
      let value = e.detail.value
      let options = this.data.questions[this.data.currentIndex].Options
      options = options.map(item => {
        item.checked = false
        if (value.includes(item.value)) {
          item.checked = true
        }
        return item
      })
      let str = `questions[${this.data.currentIndex}].Options`
      this.setData({
        [str]: options
      })
      let id = this.data.questions[this.data.currentIndex].ID
      this.data.answers.splice(this.data.currentIndex, 1, {
        id,
        value: value.join('|')
      })
    },
    textareaInput (e) {
      let value = e.detail.value
      let str = `questions[${this.data.currentIndex}].Options`
      this.setData({
        [str]: value
      })
      let id = this.data.questions[this.data.currentIndex].ID
      this.data.answers.splice(this.data.currentIndex, 1, {
        id,
        value
      })
    },
    previous(e) {
      if (this.data.currentIndex <= 0) {
        this.data.currentIndex = 0
      } else {
        this.data.currentIndex -= 1
      }
      this.setData({
        currentIndex: this.data.currentIndex
      })
    },
    next(e) {
      if (!this.data.answers[this.data.currentIndex]) {
        app.toast(`请对第${this.data.currentIndex + 1}题作答！`)
        return
      }
      if (this.data.currentIndex >= this.data.questions.length - 1) {
        this.data.currentIndex = this.data.questions.length - 1
      } else {
        this.data.currentIndex += 1
      }
      this.setData({
        currentIndex: this.data.currentIndex
      })
    },
    list() {
      _questions(this.data.id).then(res => {
        wx.hideLoading()
        this.setData({
          answered: false,
          detail: res.data.Research_Research,
          questions: res.data.Research_Question_list.map(item => {
            item.type = item.Type === '单选'
              ? 'radio'
              : item.Type === '多选'
                ? 'checkbox'
                : 'textarea'
            item.Options = item.Options
                           ? item.Options.split('|').map(item => {
                             item = {
                               value: item,
                               checked: false
                             }
                             return item
                           })
                           : ''
            return item
          })
        })
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showModal({
          title: '对不起',
          content: '请求失败，轻稍后再试！',
          showCancel: false
        })
      })
    },
    getAnswer () {
      let MemberID = app.globalData.member.ID || wx.getStorageSync('member').ID
      _answers(MemberID, this.data.id).then(res => {
        wx.hideLoading()
        console.log(res)
        this.setData({
          answered: true,
          detail: res.data.Research_Research,
          myanswer: res.data.Research_Question_list.map(item => {
            item.Result = item.Result
              ? item.Result.split('|').join('，')
              : item.Result
            return item
          })
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
    answered () {
      let MemberID = app.globalData.member.ID || wx.getStorageSync('member').ID
      return _answered(MemberID, this.data.id)
    },
    submit () {
      let currentVlaue = this.data.currentOptions
      if (!currentVlaue.trim()) {
        app.toast('请完成当前问题！')
        return
      }
      let MemberID = app.globalData.member.ID || wx.getStorageSync('member').ID
      app.loading('加载中')
      _submit(MemberID, this.data.id, JSON.stringify(this.data.answers)).then(res => {
        wx.hideLoading()
        wx.showModal({
          title: res.data.IsSuccess?'温馨提示':'对不起',
          content: res.data.Msg,
          showCancel: false,
          success: r => {
            if (r.confirm) {
              if (res.data.IsSuccess) {
                wx.navigateBack()
              }
            }
          }
        })
      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        wx.showModal({
          title: '对不起',
          content: '请求失败，轻稍后再试！',
          showCancel: false
        })
      })  
    },
    onLoad(options) {
      this.data.id = options.id
      app.memberReadyCb = () => {
        app.loading('加载中')
        this.answered().then(res => {
          if (res.data.Research_Answer_count > 0) {
            this.getAnswer()
          } else {
            this.list()
          }
        }).catch(err => {
          console.log(err)
        })
      }
      app.fansReadyCb = () => {
        app.checkMember()
      }
      app.init()
    },
    onReady() { },
    onShow() { },
    onHide() { },
    onUnload() { },
    onPullDownRefresh() { },
    onReachBottom() { },
    onShareAppMessage() { }
  }
})