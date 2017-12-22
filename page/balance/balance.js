// page/balance/balance.js
Page({
  data: {
    pageBoardColor: "lightgrey",
    pageColor: "black",
    amount: ["500","800","1000"],
    currentType: -1,
  },
  onLoad: function (options) {
    var that = this
    wx.checkSession({
      success: function () {
        wx.getStorage({
          key: 'uid',
          success: function (res) {
            var uid = res.data
            wx.request({
              url: 'http://localhost:8082/member/findMember',
              data: {
                uid: uid
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                that.setData({
                  currBal: res.data.currBal
                })
              }
            })
          },
        })
      }
    })
  },
  goBalDetail: function(){
    wx.navigateTo({
      url: '../baldetail/baldetail',
    })
  },
  money1: function(e){
    var index = e.currentTarget.dataset.index
    this.data.currentType = index
    this.data.chargeAmt = this.data.amount[index]
    this.setData({
      currentType: index,
      chargeAmt: this.data.amount[index],
      inputMoney: this.data.amount[index]
    })
    this.onShow();
  },
  toPay: function(e){
    var currType = this.data.currentType
    var amt = e.currentTarget.dataset.amt
    console.log(amt)
  },
  bindKeyInput: function (e) {
    var input = e.detail.value
    if (input > 1000) {
      this.setData({
        chargeAmt: 1000,
        inputMoney: 1000
      })
      return
    }
    this.setData({
      inputMoney: e.detail.value
    })
  },
})