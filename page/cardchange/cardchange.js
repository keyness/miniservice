// page/cardchange/cardchange.js
var md5 = require("../tem/md5.js");

function formatPhone(phone){
  phone = phone.toString();
  var str = '';
  for(var i = 0; i < phone.toString().length; i++){
    if( i == 3 || i == 7 ){
      str += ' ';
    }
    str += phone[i];
  }
  return str;
}

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
    msgCode: 0,
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
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var code = e.detail.value.code
    var msgCode = this.data.msgCode
    if (!(code === msgCode)) {
      wx.showModal({
        title: '错误',
        content: '验证码错误,请重新输入',
        showCancel: false
      })
    } else {
      console.log('验证成功.')
    }
  },
  getPhone: function(e){
    var that = this
    var phone = e.detail.value
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if(phone.length == 11){
      if(myreg.test(phone)){
        that.setData({
          isRightPhone: true,
          phone: phone
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
  getCode: function(e){
    console.log('获取验证码成功')
    wx.showToast({
      title: '发送验证码成功',
      duration: 2000,
    })
    countdown(this)
    var that = this
    var phone = e.target.dataset.phone

    var time = new Date().getTime() / 1000
    var nonce = '123456'
    var appSecret = '8ce1e2b42144'
    var sign = appSecret + nonce + time
    var checkSum = md5.SHA(sign)
    wx.request({
      url: 'https://api.netease.im/sms/sendcode.action',
      data: {
        mobile: phone,
        codeLen: 6,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        'AppKey': '733d804e88cdd6240a1b3249708cd576',
        'Nonce': '123456',
        'CurTime': time,
        'CheckSum': checkSum,
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(res.data)
        that.setData({
          msgCode: res.data.obj
        })
      },
      fail: function (res) {
        console.log(res.data)
      },
    })
  }
})