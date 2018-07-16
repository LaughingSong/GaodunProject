// pages/coursecount/coursecount.js
var config = require('../../utils/config.js');
var util = require('../../utils/util.js');
import * as echarts from '../../third/ec-canvas/echarts';

var allNum = 0;
var chart = null;




Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    mission: null,
    EP: null,
    Glive: null,
    other: null,
    arr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
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
    var that = this;
    that.loadData(that);


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

  loadData: function(obj){
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })

    wx.request({
      url: config.apienv() + 'brain.gaodunwangxiao.com/api/v1/query',
      data: {
        key: 'coursecount'
      },
      success: function (res) {
        wx.hideLoading();
        obj.setData({
          arr: res.data
        });

        var arr = that.data.arr;
        for (var i in arr) {
          arr[i].value3 = util.numFormat(arr[i].value2);
          allNum += arr[i].value2;
        }
        console.log(arr);
        console.log(allNum);

        for (var i in arr) {
          arr[i].value4 = util.toPercent(arr[i].value2/allNum);
        }
        
        obj.setData({
          mission: arr[0],
          EP: arr[1],
          Glive: arr[2],
          other: arr[3]
        });

        chart.setOption({
          series: {
            data: [{
              value: 20,
              name: '任务制'
            }, {
              value: 10,
              name: 'EP智能'
            }, {
              value: 66,
              name: 'Glive'
            }, {
              value: 4,
              name: '其他'
            }]
          }
        });





      }
    });

  }


})


/***初始化配置echart图表***/
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: '#ffffff',
    color: ["#abcdef","#cccccc","#000000","#445522"],
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%','50%'],
      radius: [0, '70%'],
      smooth: true,
      data: [{
        value: 10,
        name: '任务制网课'
      }, {
        value: 30,
        name: 'EP智能网课'
      }, {
        value: 25,
        name: 'Glive私播课'
      }, {
        value: 35,
        name: '其他'
      }],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0,2,2,0.3)'
        }
      }
    }]
  };

  chart.setOption(option);
  return chart;
}



/***页面初始化时加载数据***/
function loadData(obj){
  




}





