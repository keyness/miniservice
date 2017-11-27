// page/index/index.js
Page({
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
  }
})