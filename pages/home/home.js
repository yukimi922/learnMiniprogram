// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: app.globalData.statusBarHeight,
    topButton: null,
    navBarImg: "../../images/navbar-1.jpeg",
    title: "首页",
    positionName: {
      latitude: "", //经度
      longitude: "", //纬度
      speed: "",
      accuracy: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let appData = app.globalData;
    this.setData({
      topButton: appData.topButton
    })

    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          positionName: {
            latitude: res.latitude,
            longitude: res.longitude,
            speed: res.speed,
            accuracy: res.accuracy
          }
        })
      }
    })
  },
  viewMap(){
    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        wx.openLocation({
          latitude: Number(res.latitude),
          longitude: Number(res.longitude),
        })
      }
    })
  },
  chooseMapViewTap: function () {
    var that = this
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res, "location")
        that.setData({
          hasLocation: true,
          location: {
            longitude: Number(res.longitude),
            latitude: Number(res.latitude),
            address: res.address,
            name: res.name
          },
          detail_info: res.address,
          wd: res.latitude,
          jd: res.longitude
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  toLogs(){
    wx.navigateTo({
      url: '/pages/logs/logs?name=mixue&age=18',
      success: function(res){
        //回调包含eventChannel对象，通过emit给跳转的页面发送数据
        res.eventChannel.emit('changeLogsData',{data: 'hello logs'})
      }
    })
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