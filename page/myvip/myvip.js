// page/myvip/myvip.js
var md5 = require("../tem/md5.js");

function getEncryptCardId(url){
  var params = url.split("&&")[1];
  var encrypt_card_id = params.split("=")[1].split("&")[0];
  return unescape(encrypt_card_id)
}

function getBiz(url){
  var params = url.split("&&")[1];
  var biz = params.split("=")[2];
  return unescape(biz)
}

function uuide(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form  
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form  
    var r;

    // rfc4122 requires these characters  
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as  
    // per rfc4122, sec. 4.1.5  
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '0'
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
            wx.request({
              url: 'http://172.16.89.207:8082/member/findMember',
              data: {
                uid: uid
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function (res) {
                that.setData({
                  account: res.data.account
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
  getPhoneNumber: function(e) {
    var that = this
    var iv = e.detail.iv
    var encryptedData = e.detail.encryptedData
    var code = this.data.code
    console.log(e.detail.errMsg)
    console.log(iv)
    console.log(encryptedData)
    console.log(code)
    wx.request({
      url: 'http://172.16.89.207:8082/decode/decodePhoneInfo',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: { encryptedData: encryptedData, iv: iv, code: code },
      success: function (data) {

        //4.解密成功后 获取自己服务器返回的结果
        if (data.data.status == 1) {
          var phoneInfo_ = data.data.phoneInfo;
          console.log(phoneInfo_)
          console.log('purePhoneNumber: '+phoneInfo_.purePhoneNumber)
          that.setData({
            phone: phoneInfo_.purePhoneNumber
          })
        } else {
          console.log('解密失败')
        }

      },
      fail: function () {
        console.log('系统错误')
      }
    })
  },
  checkPhone: function(){
    var phone = this.data.phone
    console.log(phone)
    wx.request({
      url: 'http://172.16.89.207:8082/member/checkMember',
      data: {
        phone: phone
      },
      success: function(res){
        console.log(res.data.hasPhone)
      }
    })
  },
  getStorage: function(){
    wx.getStorage({
      key: 'uid',
      success: function(res) {
        var uid = res.data
        wx.request({
          url: 'http://localhost:8082/login/getUid',
          data: {
            uid: uid
          },
          success: function(res){
            console.log('openid: '+res.data.openid)
          }
        })
      },
    })
  },
  getMd: function(){
    var time = new Date().getTime() / 1000
    console.log('time: '+time)
    var sign = md5.SHA('jsapi\_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy\_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg&noncestr=Wm3WZYTPz0wzccnW&timestamp='+time+'&url=http://mp.weixin.qq.com?params=value')
    console.log('sign: '+sign)
  },
  card: function(){
    var that = this
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
        var access_token = res.data
        wx.request({
          url: 'https://api.weixin.qq.com/card/create?access_token=' + access_token,
          method: 'post',
          data: {
            "card": {
              "card_type": "MEMBER_CARD",
              "member_card": {
                "background_pic_url": "https://mmbiz.qlogo.cn/mmbiz/",
                "base_info": {
                  "logo_url": "http://mmbiz.qpic.cn/mmbiz/iaL1LJM1mF9aRKPZ/0",
                  "brand_name": "测试",
                  "code_type": "CODE_TYPE_TEXT",
                  "title": "测试会员卡",
                  "color": "Color010",
                  "notice": "使用时向服务员出示此券",
                  "service_phone": "020-88888888",
                  "description": "不可与其他优惠同享",
                  "custom_app_brand_user_name": "gh_f834ec1f5314@app",
                  "custom_app_brand_pass": "API/cardPage",
                  "date_info": {
                    "type": "DATE_TYPE_PERMANENT"
                  },
                  "sku": {
                    "quantity": 50000000
                  },
                  "get_limit": 3,
                  "use_custom_code": false,
                  "can_give_friend": false,
                  "location_id_list": [
                    123,
                    12321
                  ],
                  "custom_url_name": "立即使用",
                  "custom_url": "http://weixin.qq.com",
                  "custom_url_sub_title": "6个汉字tips",
                  "promotion_url_name": "营销入口1",
                  "promotion_url": "http://www.qq.com",
                  "need_push_on_view": true
                },
                "advanced_info": {
                  "use_condition": {
                    "accept_category": "鞋类",
                    "reject_category": "阿迪达斯",
                    "can_use_with_other_discount": true
                  },
                  "abstract": {
                    "abstract": "测试",
                    "icon_url_list": [
                      "http://mmbiz.qpic.cn/mmbiz/p98FjXy8LacgHxp3sJ3vn97bGLz0ib0Sfz1bjiaoOYA027iasqSG0sjpiby4vce3AtaPu6cIhBHkt6IjlkY9YnDsfw/0"
                    ]
                  },
                  "text_image_list": [
                    {
                      "image_url": "http://mmbiz.qpic.cn/mmbiz/p98FjXy8LacgHxp3sJ3vn97bGLz0ib0Sfz1bjiaoOYA027iasqSG0sjpiby4vce3AtaPu6cIhBHkt6IjlkY9YnDsfw/0",
                      "text": "测试11"
                    },
                    {
                      "image_url": "http://mmbiz.qpic.cn/mmbiz/p98FjXy8LacgHxp3sJ3vn97bGLz0ib0Sfz1bjiaoOYA027iasqSG0sj piby4vce3AtaPu6cIhBHkt6IjlkY9YnDsfw/0",
                      "text": "测试22"
                    }
                  ],
                  "time_limit": [
                    {
                      "type": "MONDAY",
                      "begin_hour": 0,
                      "end_hour": 10,
                      "begin_minute": 10,
                      "end_minute": 59
                    },
                    {
                      "type": "HOLIDAY"
                    }
                  ],
                  "business_service": [
                    "BIZ_SERVICE_FREE_WIFI",
                    "BIZ_SERVICE_WITH_PET",
                    "BIZ_SERVICE_FREE_PARK",
                    "BIZ_SERVICE_DELIVER"
                  ]
                },
                "supply_bonus": true,
                "supply_balance": false,
                "prerogative": "test_prerogative",
                "auto_activate": true,
                "custom_field1": {
                  "name_type": "FIELD_NAME_TYPE_LEVEL",
                  "url": "http://www.qq.com"
                },
                "activate_url": "http://www.qq.com",
                "custom_cell1": {
                  "name": "使用入口2",
                  "tips": "激活后显示",
                  "url": "http://172.16.89.207:8082/member/toActivate"
                },
                "bonus_rule": {
                  "cost_money_unit": 100,
                  "increase_bonus": 1,
                  "max_increase_bonus": 200,
                  "init_increase_bonus": 10,
                  "cost_bonus_unit": 5,
                  "reduce_money": 100,
                  "least_money_to_use_bonus": 1000,
                  "max_reduce_bonus": 50
                },
                "discount": 11,
                "wx_activate": true,
                "wx_activate_after_submit": true,
                "wx_activate_after_submit_url": "http://ecardtest.4006630666.com"
              }
            }
          },
          success: function(res){
            console.log(res)
            that.setData({
              cardId: res.data.card_id
            })
            wx.setStorage({
              key: 'cardId',
              data: res.data.card_id,
            })
          }
        })
      },
    })
    
  },
  getCard: function(){
    var card_id = this.data.cardId
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
        var access_token = res.data
        console.log('access_token: ' + access_token)
        wx.request({
          url: 'https://api.weixin.qq.com/card/get?access_token=' + access_token,
          method: 'post',
          data: {
            "card_id": card_id
          },
          success: function (res) {
            console.log(res)
          }
        })
      },
    })
    
  },
  getacc: function(){
    var that = this
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb008a22cb7274a43&secret=12534a47ffac2dfd750f8e4a39d21669',
      success: function(res){
        var access_token = res.data.access_token
        console.log('access_token: ' + access_token)
        wx.setStorage({
          key: 'access_token',
          data: access_token,
        })
      }
    })
  },
  addCard: function(){
    var account = this.data.account
    var time = parseInt(new Date().getTime() / 1000).toString()
    var nonce_str = uuide(32, 62)
    console.log('uuid: ' + nonce_str)
    var cardId = this.data.cardId
    wx.getStorage({
      key: 'ticket',
      success: function(res) {
        var ticket = res.data
        var arr = new Array()
        arr[0] = account
        arr[1] = time
        arr[2] = nonce_str
        arr[3] = cardId
        arr[4] = ticket
        arr.sort()
        console.log('arr: '+arr)
        var sign = arr[0] + arr[1] + arr[2] + arr[3] + arr[4]
        sign = md5.SHA(sign)
        console.log('sign: '+sign)
        wx.addCard({
          cardList: [
            {
              cardId: cardId,
              cardExt: '{"code":"'+account+'","timestamp":"'+time+'","nonce_str":"'+nonce_str+'","signature":"'+sign+'"}'
            }
          ],
          success: function(res){
            console.log(res)
          }
        })
      },
    })
    
  },
  api_ticket: function(){
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
        var access_token = res.data
        wx.request({
          url: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token+'&type=wx_card',
          success: function(res){
            var ticket = res.data.ticket
            console.log('ticket: ' + ticket)
            wx.setStorage({
              key: 'ticket',
              data: ticket,
            })
          }
        })
      },
    })
    
  },
  uuid: function(){
    var uuid = uuide(32,62)
    console.log(uuid)
  },
  setOpenCard: function(){
    var card_id = this.data.cardId
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
        var access_token = res.data
        wx.request({
          url: 'https://api.weixin.qq.com/card/membercard/activateuserform/set?access_token='+access_token,
          method: 'post',
          data: {
            "card_id": card_id,
            "service_statement": {
              "name": "会员守则",
              "url": "https://www.qq.com"
            },
            "bind_old_card": {
              "name": "老会员绑定",
              "url": "https://www.qq.com"
            },
            "required_form": {
              "can_modify": false,
              "common_field_id_list": [
                "USER_FORM_INFO_FLAG_MOBILE",
                "USER_FORM_INFO_FLAG_SEX"
              ]
            },
            "optional_form": {
              "can_modify":false,
              "common_field_id_list": [
                "USER_FORM_INFO_FLAG_NAME",
                "USER_FORM_INFO_FLAG_BIRTHDAY"
              ]
            }
          },
          success: function(res){
            console.log('设置成功.')
          }
        })
      },
    })
  },
  getOpenCard: function(){
    var that = this
    wx.getStorage({
      key: 'access_token',
      success: function(res) {
        var access_token = res.data
        wx.getStorage({
          key: 'cardId',
          success: function(res) {
            var cardId = res.data
            wx.request({
              url: 'https://api.weixin.qq.com/card/membercard/activate/geturl?access_token=' + access_token,
              method: 'post',
              data: {
                card_id: cardId
              },
              success: function(res){
                console.log(res.data.url)
                that.setData({
                  url: res.data.url
                })
              }
            })
          },
        })
      },
    })
  },
  openCard: function(){
    var url = this.data.url
    var biz = getBiz(url)
    var encrypt_card_id = getEncryptCardId(url)
    console.log('encrypt_card_id: ' + encrypt_card_id)
    console.log('biz: '+biz)
    wx.navigateToMiniProgram({
      appId: 'wxeb490c6f9b154ef9', //固定为此 appid，不可改动
      extraData: {
        encrypt_card_id: encrypt_card_id,
        outer_str: '',
        biz: biz
      }, // 包括 encrypt_card_id, outer_str, biz三个字段，须从 step3 中获得的链接中获取参数
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  }
})