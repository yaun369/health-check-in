import http from '../../utils/api.js';
import util from '../../utils/util.js'
// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        total: 0,
        disabled: true,
        genderList: ["男", "女"],
        regionList: [],
        statusList: ["正常", "居家健康观察", "集中隔离", "医学观察", "在院治疗"],
        symptomList: ["自觉正常", "发热37.3℃以下", "发热37.3℃含以上", "干咳", "乏力", "如有其他症状"],
        familyList: ["正常", "存在疑似病例", "存在确证病例"],
        communityList: ["正常", "存在疑似病例", "存在确证病例"]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        let modelInfo = wx.getSystemInfoSync();
        let menuInfo = wx.getMenuButtonBoundingClientRect();
        let top = menuInfo.top;
        let left = modelInfo.windowWidth - menuInfo.right;
        this.setData({
            header_style: `margin-top:${top}px;height:${menuInfo.height}px`
        })
    },

    bindPickerGender(e) {
        this.setData({
            gender: this.data.genderList[Number(e.detail.value)]
        })
    },

    bindPickerRegion(e) {
        this.setData({
            regionList: e.detail.value,
            region: `${e.detail.value[0]}${e.detail.value[1]}${e.detail.value[2]}`
        })
    },

    radioStatusChange(e) {
        // console.log(e.detail.value)
    },

    checkedSymptom(e) {
        // console.log(e.detail.value)
    },

    bindPickerFamily(e) {
        this.setData({
            family: this.data.familyList[Number(e.detail.value)]
        })
    },

    bindPickerCommunity(e) {
        this.setData({
            community: this.data.communityList[Number(e.detail.value)]
        })
    },

    checkedTerms(e) {
        this.setData({
            disabled: !e.detail.value.length
        })
    },

    formSubmit: function(e) {
        let {
            name,
            gender,
            phone,
            jobNum,
            region,
            bodyTemp,
            status,
            other,
            symptom,
            family,
            community,
            otherInfo
        } = e.detail.value;
        const verify = [{
            value: name,
            text: "请输入姓名"
        }, {
            value: gender,
            text: "请选择性别"
        }, {
            value: phone,
            text: "请输入手机号"
        }, {
            value: region.length,
            text: "请选择所在地"
        }, {
            value: bodyTemp,
            text: "请输入体温"
        }, {
            value: status,
            text: "请选择状态"
        }, {
            value: symptom.length,
            text: "请选择症状"
        }, {
            value: family,
            text: "请选择家属情况"
        }, {
            value: community,
            text: "请选择社区情况"
        }]
        let isValue = verify.findIndex(ele => !ele.value);
        if (isValue != -1) {
            wx.showToast({
                title: verify[isValue].text,
                icon: 'none'
            })
        } else {
            this.putUsers(e.detail.value);
        }
    },

    putUsers(data) {
        let userInfo = wx.getStorageSync("userInfo");
        http.put(`users/${userInfo._id}`, data).then(res => {
            wx.setStorageSync('userInfo', res.data);

            http.post(`details`, Object.assign(data, {
                openid: res.data.openid,
                time: util.formatTime(new Date())
            })).then(ress => {
                if (ress.data.code == 0) {
                    wx.showToast({
                        title: ress.data.msg,
                        icon: 'none'
                    })
                }
            })
        })
    },

    creatGroup() {
        wx.showToast({
            title: '正在开发中',
            icon: 'none'
        })
    },

    toDetails() {
        wx.navigateTo({
            url: `/pages/list/index`
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let userInfo = wx.getStorageSync("userInfo");
        let {
            gender
        } = userInfo;
        if (userInfo) {
            http.get(`details?query={"where":{"openid":"${userInfo.openid}"}}`).then(res => {
                this.setData({
                    userInfo,
                    gender,
                    total: res.data.total
                })
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            title: '全民健康打卡',
            path: `/pages/index/index`,
            imageUrl: '../../images/index.png'
        }
    }
})