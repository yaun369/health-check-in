//app.js
import http from './utils/api.js';
App({
  onLaunch: function () {
    let userInfo = tt.getStorageSync('userInfo');

    if (!userInfo) {
      tt.login({
        success: res => {
          console.log(res)
          http.post(`openid`, {
            code: res.code,
            anonymous_code:res.anonymousCode,
            client: 'tt'
          }).then(res => {
            if (res.data.success) {
              tt.setStorageSync('userInfo', res.data.user);
            }
          });
        }
      });
    }
  }
});