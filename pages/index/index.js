import request from "../../utils/request"

// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerLists: [],// 轮播图数据
        recommendLists: [],// 推荐歌单数据
        topLists: [],// 排行榜数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        // 获取轮播图数据
        let bannerListsData = await request('/banner', { type: 2 })
        this.setData({
            bannerLists: bannerListsData.banners
        })

        // 获取推荐歌单数据
        let recommendListsData = await request('/personalized', { limit: 10 })
        this.setData({
            recommendLists: recommendListsData.result
        })

        // 获取排行榜数据
        /**
         * 1. 根据idx的值获得对应的数据 
         * 2. idx的值取值范围是0-20,我们需要0-4
         * 3. 需要发送5次请求
         */
        let index = 0;
        let resultArr = [];
        while (index < 5) {
            let topListData = await request('/top/list', { idx: index++ })
            // splice(会修改原数组,可以对指定数组进行增删改) slice(不会修改原数组)
            let topListItem = { name: topListData.playlist.name, tracks: topListData.playlist.tracks.slice(0, 3) }
            resultArr.push(topListItem)
            // 不需要等待5次请求全部结束才更新,但是渲染次数会多一些
            this.setData({
                topLists: resultArr
            })
        }
        // 更新topLists,放在这里会有白屏效果,体验差
        // this.setData({
        //     topLists: resultArr
        // })
    },

    // 跳转到recommendSong页面的回调
    toRecommendSong(){
        wx.navigateTo({
            url: '/songPackage/pages/recommendSong/recommendSong',
        });
    },
    // 跳转到Other页面的回调
    toOther(){
        wx.navigateTo({
            url: '/otherPackage/pages/other/other',
        });
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

    }
})