// page/shop/shop.js
var QQMapWX = require("../tem/qqmap-wx-jssdk.min.js");

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
    var qqmapsdk = new QQMapWX({
      key: 'VW6BZ-2MWW6-L2BS6-MGLSB-BWKG2-B3BXU'
    });
    qqmapsdk.search({
      keyword: '加油站',
      page_size: 20,
      success: function (res) {
        console.log(res);
        that.setData({
          address: res.data
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
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
  bindmap: function (e) {
    var location = e.target.dataset.key;
    console.log(location)
    console.log(location.lat)
    console.log(location.lng)
    // wx.navigateTo({
    //   url: '../mapdetail/mapdetail?lat='+location.lat+"&lng="+location.lng,
    // })
    wx.openLocation({
      latitude: location.lat,
      longitude: location.lng,
    })
  }
})