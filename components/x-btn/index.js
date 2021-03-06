Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    size: {
      type: String,
      value: 'default'
    },
    type: {
      type: String,
      value: 'default'
    },
    plain: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false,
      observer(newVal) {
        if (this.properties.imgBg) {
          if (newVal === true) {
          } else {
            this.data.classes.splice(this.data.classes.findIndex(item => item === 'disabled'), 1)
          }
          this.setData({
            classes: this.data.classes
          })
        }
      }
    },
    loading: {
      type: Boolean,
      value: false
    },
    formType: String,
    openType: String,
    hoverClass: {
      type: String,
      value: 'button-hover'
    },
    hoverStopPropagation: {
      type: Boolean,
      value: false
    },
    hoverStartTime: {
      type: Number,
      value: 20
    },
    hoverStayTime: {
      type: Number,
      value: 70
    },
    lang: {
      type: String,
      value: 'en'
    },
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: {
      type: Boolean,
      value: false
    },
    appParameter: String
  },
  data: {
    classes: ['x-btn']
  },
  methods: {
    getUserInfo(e) {
      this.triggerEvent('getuserinfo', e.detail)
    },
    contact() { },
    getPhoneNumber() { },
    error() { },
    openSetting() { }
  },
  attached() {
    this.data.classes.push(this.properties.type)
    if (this.properties.disabled) {
      this.data.classes.push('disabled')
    }
    if (this.properties.loading) {
      this.data.classes.push('loading')
    }
    this.setData({
      classes: this.data.classes
    })
  }
})
