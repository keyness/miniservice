// page/map/map.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 15,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var lat = options.lat
    var lng = options.lng
    var title = options.title
    var tel = options.tel
    var distance = options.distance
    var address = options.address
    this.setData({
      latitude: lat,
      longitude: lng,
      title: title,
      tel: tel,
      distance: distance,
      address: address,
      markers: [{
        iconPath: "../tem/3.png",
        id: 0,
        latitude: lat,
        longitude: lng,
        width: 35,
        height: 35,
      }],
      
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
  toCall: function(e){
    var tel = e.target.dataset.tel
    tel = tel.split(';')[0]
    wx.makePhoneCall({
      phoneNumber: tel,
    })
  },
  toMap: function(e){
    var lat = Number(e.target.dataset.lat)
    var lng = Number(e.target.dataset.lng)
    var title = e.target.dataset.title
    var address = e.target.dataset.address
    wx.openLocation({
      latitude: lat,
      longitude: lng,
      name: title,
      address: address,
    })
  },
  clickMarker: function(){
    this.setData({
      scale: 18,
    })
  }
})