// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad(options) {
    //options 可以接收路由跳转传递过来的参数
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    console.log(options,9999);
    //如果当前页面由wx.navigateTo打开，则该页面可以通过this.getOpenerEventChannel()方法获取eventChannel对象,可以通过eventChannel对象和打开该页面的页面进行通讯
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('changeLogsData',(data)=> {
      console.log(data,5555);
      this.setData({
        logs: [data.data]
      })
    })
  }
})
