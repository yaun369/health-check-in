//app.js
import http from './utils/api.js'
App({
    onLaunch: function() {
        let userInfo = wx.getStorageSync('userInfo');
        if (!userInfo) {
            wx.login({
                success: res => {
                    http.post(`openid`, {
                        code: res.code,
                        client: 'wx'
                    }).then(res => {
                        if (res.data.success) {
                            wx.setStorageSync('userInfo', res.data.user);
                        }
                    })
                }
            })
        }
    }
})