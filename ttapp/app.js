//app.js
import http from './utils/api.js';
App({
  onLaunch: function () {
    let userInfo = tt.getStorageSync('userInfo');

    if (!userInfo) {
      tt.login({
        success: res => {
          http.post(`openid`, {
            code: res.code
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