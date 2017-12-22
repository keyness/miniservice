// page/index/index.js
Page({
  onLoad: function (options) {
    var that = this
    wx.checkSession({
      success: function () {
        wx.getStorage({
          key: 'uid',
          success: function (res) {
            var uid = res.data
            wx.request({
              url: 'http://172.16.89.207:8082/member/findMember',
              data: {
                uid: uid
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                that.setData({
                  level: res.data.level,
                  currBal: res.data.currBal,
                  score: res.data.score
                })
              }
            })
          },
        })
      }
    })
  },
  goScore: function () {
    wx.navigateTo({ url: "../score/score" });
  },
  bindUser:function(){
    wx.navigateTo({ url: "../user/user" });
  },
  goBalance: function(){
    wx.navigateTo({
      url: '../balance/balance',
    })
  },
  goCoupon: function(){
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  },
  checkRule: function(){
    wx.navigateTo({
      url: '../checkrule/checkrule',
    })
  },
  toShop: function(){
    wx.navigateTo({
      url: '../shop/shop',
    })
  }
})