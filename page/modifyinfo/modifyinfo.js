// page/modifyinfo/modifyinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    date: '1978-01-01',
    array: ['男','女'],
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
                that.setData({
                  realName: res.data.realName,
                  date: res.data.birthday
                })
                var sex = res.data.sex
                if(sex === '男'){
                  that.setData({
                    index: 0
                  })
                }else{
                  that.setData({
                    index: 1
                  })
                }
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
  formSubmit: function(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var realname = e.detail.value.realname
    var sex = e.detail.value.sex
    var birthday = e.detail.value.birthday
    var uid = this.data.uid
    wx.request({
      url: 'http://localhost:8082/member/updateMember',
      data: {
        realname: realname,
        sex: parseInt(sex)+1,
        birthday: birthday,
        uid: uid
      },
      success: function(){
        console.log('update success!')
        wx.navigateTo({
          url: '../user/user',
        })
      }
    })
  },
  changeDate: function(e){
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})