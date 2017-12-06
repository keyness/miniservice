// page/resetpwd/resetpwd.js

function formatPhone(phone) {
  phone = phone.toString();
  var str = '';
  for (var i = 0; i < phone.toString().length; i++) {
    if (i == 3 || i == 7) {
      str += ' ';
    }
    str += phone[i];
  }
  return str;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPwd: true,
    show: '../tem/eye_closed.png',
    isConPwd: true,
    showCon: '../tem/eye_closed.png',
    pwdFocus: false,
    pwdConFocus: false,
    account: 13312345678,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var account = this.data.account
    account = formatPhone(account)
    this.setData({
      account: account
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
  showPwd: function(){
    var that = this
    var isPwd = this.data.isPwd
    if(isPwd){
      that.setData({
        isPwd: false,
        show: 'https://wx1.sinaimg.cn/mw690/5b6c511bgy1fm77wk628hj201c01ca9v.jpg',
        pwdFocus: true,
      })
    }else{
      that.setData({
        isPwd: true,
        show: '../tem/eye_closed.png',
        pwdFocus: true,
      })
    }
  },
  showConPwd: function () {
    var that = this
    var isConPwd = this.data.isConPwd
    if (isConPwd) {
      that.setData({
        isConPwd: false,
        showCon: '../tem/eye_open.png',
        pwdConFocus: true,
      })
    } else {
      that.setData({
        isConPwd: true,
        showCon: '../tem/eye_closed.png',
        pwdConFocus: true,
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