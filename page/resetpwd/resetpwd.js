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
    account: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.checkSession({
      success: function () {
        wx.getStorage({
          key: 'uid',
          success: function (res) {
            var uid = res.data
            that.setData({
              uid: uid
            })
            wx.request({
              url: 'http://localhost:8082/member/findMember',
              data: {
                uid: uid
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                var account = res.data.account
                console.log('account: ' + account)
                account = formatPhone(account)
                that.setData({
                  account: account
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
  showPwd: function(){
    var that = this
    var isPwd = this.data.isPwd
    if(isPwd){
      that.setData({
        isPwd: false,
        show: '../tem/eye_open.png',
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
    var uid = this.data.uid
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
      } 
    }
    wx.request({
      url: 'http://localhost:8082/member/resetPassword',
      data: {
        uid: uid,
        newPassword: pwd
      },
      success: function(res){
        if(res.data.status){
          console.log("修改成功")
          wx.navigateTo({
            url: '../user/user',
          })
        }else{
          console.log("修改失败")
        }
      }
    })
  }
})