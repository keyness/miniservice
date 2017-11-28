// page/cardchange/cardchange.js
function countdown(that) {
  var second = that.data.second
  if (second == -1) {
    that.setData({
      getMsg: '获取验证码',
      second: 60,
      isRightPhone: true,
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1,
      getMsg: second+'s后再次获取',
      isRightPhone: false,
    });
    countdown(that);
  }
    , 1000)
}  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    hasInfo: false,
    isRightPhone: false,
    getMsg: '获取验证码',
    second: 60,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  getPhone: function(e){
    var that = this
    var phone = e.detail.value
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    console.log(phone)
    if(phone.length == 11){
      if(myreg.test(phone)){
        that.setData({
          isRightPhone: true
        })
      }else{
        that.setData({
          isRightPhone: false
        })
      }
    }else{
      that.setData({
        isRightPhone: false
      })
    }
  },
  inputCode: function(e){
    var that = this
    var code = e.detail.value
    console.log(code)
    if(code.length != 0){
      that.setData({
        hasInfo: true
      })
    }else{
      that.setData({
        hasInfo: false
      })
    }
  },
  getCode: function(){
    wx.showToast({
      title: '发送验证码成功',
    })
    countdown(this)
  }
})