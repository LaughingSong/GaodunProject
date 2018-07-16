// pages/detail/detail.js
var config = require('../../utils/config.js');
var util = require('../../utils/util.js');
var xarr = [];
var yarr = [];


import * as echarts from '../../third/ec-canvas/echarts';

const app = getApp();


function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '历年累积服务学员',
      left: 'center',
      textStyle: {
        color: '#ffffff',
        fontSize: 25,
      },
    },
    color: ["#ffffff"],
    legend: {
      data: ['A'],
      top: 35,
      left: 'center',
      z: 100,
    },
    grid: {
      containLabel: true,
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2013-11', '2014-08', '2015-05', '2016-02', '2016-11', '2017-08', '2018-05'],
      axisLabel: {
        interval: 0,
        rotate: '45'
      }
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: [7723, 72315, 151371, 322987, 660661, 1266923, 2372415]
    }]
  };

  chart.setOption(option);
  return chart;
}




Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    leiji: {
      sevStudent: '',
      actNum: '',
      joinNum: '',
      playtime: '',
      questions: '',
      exercises: '',
      aggstudent: {
        x: [],
        y: []
      }
    },
    ec: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      type: options.type
    })

   


  },
  onShow: function () {
    var that = this;
    that.loadAllData(that);
  },

  loadAllData: function(obj){
    var that = this;
    wx.showLoading({
      title: '加载中...'
    });
    

    wx.request({
      url: config.apienv() + 'brain.gaodunwangxiao.com/api/v1/query',
      data: {
        key: 'allstudent'
      },
      success: function(res){
        wx.hideLoading();
        var str = 'leiji.sevStudent';
        obj.setData({
          [str] : res.data[0].num
        });
      }
    });

    wx.request({
      url: config.apienv() + 'brain.gaodunwangxiao.com/api/v1/query',
      data: {
        key: 'activeuser'
      },
      success: function (res) {
        wx.hideLoading();
        var str = 'leiji.actNum';
        obj.setData({
          [str]: res.data[0].num
        });
      }
    });

    wx.request({
      url: config.apienv() + 'brain.gaodunwangxiao.com/api/v1/query',
      data: {
        key: 'alllive'
      },
      success: function (res) {
        wx.hideLoading();
        var str = 'leiji.joinNum';
        obj.setData({
          [str]: res.data[0].num
        });
      }
    });

    wx.request({
      url: config.apienv() + 'brain.gaodunwangxiao.com/api/v1/query',
      data: {
        key: 'allvideoviewercount'
      },
      success: function (res) {
        wx.hideLoading();
        var str = 'leiji.playtime';
        obj.setData({
          [str]: res.data[0].num
        });
      }
    });

    wx.request({
      url: config.apienv() + 'brain.gaodunwangxiao.com/api/v1/query',
      data: {
        key: 'allquestion'
      },
      success: function (res) {
        wx.hideLoading();
        var str = 'leiji.questions';
        obj.setData({
          [str]: res.data[0].num
        });
      }
    });

    wx.request({
      url: config.apienv() + 'tiku.gaodun.com/tk',
      data: {
        controller: 'item',
        act: 'getDoCountToScreen'
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        var str = 'leiji.exercises';
        obj.setData({
          [str]: res.data[0].value
        });
      }
    });


    wx.request({
      url: config.apienv() + 'brain.gaodunwangxiao.com/api/v1/query',
      data: {
        key: 'aggstudent'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        var arr = res.data;
        for(var i=0;i<arr.length;i++){
          xarr.push(arr[i].x);
          yarr.push(arr[i].y);
        }
        console.log(xarr);
        console.log(yarr);



        // var str = 'leiji.questions';
        // obj.setData({
        //   [str]: res.data[0].num
        // });
      }
    });



  }


})






