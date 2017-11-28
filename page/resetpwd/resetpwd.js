// page/resetpwd/resetpwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPwd: true,
    show: '../tem/eye_closed.png',
    isConPwd: true,
    showCon: '../tem/eye_closed.png',
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
  showPwd: function(){
    var that = this
    var isPwd = this.data.isPwd
    console.log(isPwd)
    if(isPwd){
      that.setData({
        isPwd: false,
        show: '../tem/eye_open.png'
      })
    }else{
      that.setData({
        isPwd: true,
        show: '../tem/eye_closed.png'
      })
    }
  },
  showConPwd: function () {
    var that = this
    var isConPwd = this.data.isConPwd
    console.log(isConPwd)
    if (isConPwd) {
      that.setData({
        isConPwd: false,
        showCon: '../tem/eye_open.png'
      })
    } else {
      that.setData({
        isConPwd: true,
        showCon: '../tem/eye_closed.png'
      })
    }
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var pwd = e.detail.value.pwd
    var confirmPwd = e.detail.value.confirmPwd
    if(pwd.length != 6 || confirmPwd.length != 6){
      wx.showModal({
        title: '错误',
        content: '密码必须为6位',
        showCancel: false,
      })
    }else{
      if (!(pwd === confirmPwd)) {
        wx.showModal({
          title: '错误',
          content: '两次密码输入不一致',
          showCancel: false,
        })
      } else {
        console.log('修改成功')
      }
    }
  }
})