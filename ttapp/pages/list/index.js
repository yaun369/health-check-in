// pages/list/index.js
import http from '../../utils/api.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailsArr: []
  },

  bindReturn() {
    tt.navigateBack({ delta: 1 });
  },

  creatGroup() {
    tt.showToast({
      title: '正在开发中',
      icon: 'none'
    });
  },

  getDetails() {
    let userInfo = tt.getStorageSync('userInfo');
    http.get(`details?query={"where":{"openid":"${userInfo.openid}"}}`).then(res => {
      let detailsArr = res.data.data;
      detailsArr.map(ele => {
        ele.bodyTemp = Number(ele.bodyTemp);
        ele.icon = ele.bodyTemp >= 37.3 ? 'netral' : 'happy';
      });
      this.setData({
        detailsArr
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let modelInfo = tt.getSystemInfoSync();
    let menuInfo = tt.getMenuButtonBoundingClientRect();
    let top = menuInfo.top;
    let left = modelInfo.windowWidth - menuInfo.right;
    this.setData({
      header_style: `margin:${top}px ${left}px;height:${menuInfo.height}px`
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getDetails();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '全民健康打卡',
      path: `/pages/index/index`,
      imageUrl: '../../images/index.png'
    };
  }
});