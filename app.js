const openIdUrl = require('./config').openIdUrl

App({
  onLaunch: function () {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://172.16.89.207:8082/login/login',
            method: 'get',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              code: res.code
            },
            success: function(res){
              console.log("uid: "+res.data.uid)
              wx.setStorage({
                key: 'uid',
                data: res.data.uid,
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  onShow: function (data) {
    //console.log('App Show')
    console.log('data: '+data)
    var id = data.referrerInfo.appId
    console.log('appShow id: '+id)
    var data1 = data.referrerInfo.extraData
    console.log('appShow data1: '+data1)
    console.log('activate_ticket: ' + data1.activate_ticket)
    console.log('card_id: ' + data1.card_id)
    console.log('code: '+data1.code)
  },
  onHide: function () {
    //console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: null
  },
  // lazy loading openid
  getUserOpenId: function (callback) {
    var self = this

    if (self.globalData.openid) {
      callback(null, self.globalData.openid)
    } else {
      wx.login({
        success: function (data) {
          wx.request({
            url: openIdUrl,
            data: {
              code: data.code
            },
            success: function (res) {
              console.log('拉取openid成功', res)
              self.globalData.openid = res.data.openid
              callback(null, self.globalData.openid)
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
              callback(res)
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
          callback(err)
        }
      })
    }
  }
})
