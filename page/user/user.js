// page/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.checkSession({
      success: function(){
        wx.getStorage({
          key: 'uid',
          success: function(res) {
            var uid = res.data
            wx.request({
              url: 'http://172.16.89.207:8082/member/findMember',
              data: {
                uid: uid
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function(res){
                that.setData({
                  account: res.data.account,
                  realName: res.data.realName,
                  sex: res.data.sex,
                  birthday: res.data.birthday,
                  level: res.data.level,
                  currBal: res.data.currBal,
                  score: res.data.score,
                  activate: res.data.activate
                })
              }
            })
          },
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  modifyinfo: function(){
    wx.navigateTo({
      url: '../modifyinfo/modifyinfo',
    })
  },
  toactivate: function(){
    wx.navigateTo({
      url: '../activate/activate',
    })
  },
  tocharge: function(){
    wx.navigateTo({
      url: '../balance/balance',
    })
  },
  tocoupon: function(){
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  },
  toscore: function(){
    wx.navigateTo({
      url: '../score/score',
    })
  },
  totrans: function(){
    wx.navigateTo({
      url: '../trans/trans',
    })
  },
  resetpwd: function(){
    wx.navigateTo({
      url: '../resetpwd/resetpwd',
    })
  },
  callgm: function(){
    wx.makePhoneCall({
      phoneNumber: '12345678',
    })
  },
  cardchange: function(){
    wx.navigateTo({
      url: '../cardchange/cardchange',
    })
  },
  myvip: function(){
    wx.navigateTo({
      url: '../myvip/myvip',
    })
  }
})