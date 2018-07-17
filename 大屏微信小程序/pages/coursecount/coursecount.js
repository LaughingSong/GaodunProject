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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.loadData(that);


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
          arr[i].value5 = parseInt(util.toPercent(arr[i].value2 / allNum));
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
              value: that.data.mission.value5,
              name: that.data.mission.value1
            }, {
              value: that.data.EP.value5,
              name: that.data.EP.value1
            }, {
              value: that.data.Glive.value5,
              name: that.data.Glive.value1
            }, {
              value: that.data.other.value5,
              name: that.data.other.value1
            }]
          },
          legend: {
            data: [that.data.mission.value1, that.data.EP.value1, that.data.Glive.value1, that.data.other.value1]
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
    color: ["#0096AA", "#83CCD2", "#FCE5E8","#D7E7A3"],
    series: [{
      label: {
        normal: {
          fontSize: 14,
          position: 'outside',
        } 
      },
      name: '课程类型分布',
      type: 'pie',
      center: ['50%','50%'],
      radius: [0,90],
      smooth: true,
      clockWise: true,
      data: [{
        value: 0,
        name: ''
      }, {
        value: 0,
        name: ''
      }, {
        value: 0,
        name: ''
      }, {
        value: 0,
        name: ''
      }],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0,2,2,0.3)',
          label: {
            show: true,
            formatter: "{d}%",
            textStyle: {
              // color: '#000',
              fontSize: '17',
              fontFamily: '微软雅黑',
              fontWeight: 'bold'
            }
          }
        },
        normal: {
          label: {
            show: true
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 10
          }
        }
      }
    }],
    legend: {
      selectedMode: false,
      orient: 'horizontal',
      x: 'center',
      data: ['','','','']
    }
  };

  chart.setOption(option);
  return chart;
}





