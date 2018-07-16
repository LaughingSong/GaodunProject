var config = require('./config.js');
var openId = null;
var sign = null;
Date.prototype.format = function (time) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(time)) {
    time = time.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(time)) {
      time = time.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return time;
};
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//获取对象个数
const objectSize = function (o) {
  var count = 0;
  for (var i in o) {
    count++;
  }
  return count;
}

//获取openId
const getOpenIdSign = function (callback) {
  var url = config.apienv() + 'lachesis.gaodun.com/api/miniProgram/getopenid'
  wx.login({
    success: res => {
      if (!wx.getStorageSync('wxopenId')) {
        wx.request({
          url: url,
          data: {
            code: res.code,
            miniName: "openzhibo"
          },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/json'
          },
          success: function (res2) {
            console.log(res2.data.data.session_key)
            if (res2.data.status == 0) {
              callback && callback(encodeURIComponent(res2.data.data.openId), encodeURIComponent(res2.data.data.sign))
              wx.setStorageSync('wxopenId', encodeURIComponent(res2.data.data.openId));
              wx.setStorageSync('wxsign', encodeURIComponent(res2.data.data.sign));

            }

            // callback && callback(encodeURIComponent(res2.data.data.openId), encodeURIComponent(res2.data.data.sign))
          },
          complete: function (res2) {

          }
        })
      } else {
        callback && callback(wx.getStorageSync('wxopenId'), wx.getStorageSync('wxsign'))
      }

    }
  })
}
//时间格式化
const timeFormat = function (timeStr, time) {
  return (new Date(timeStr * 1000)).format(time);
}

//超过千位的数字，进行格式化，加逗号
const numFormat = function (num){
  var numString = num.toString();
  var numLength = num.toString().length;
  if(numLength <= 3){
    return numString;
  }
  var r = numLength % 3;
  return r > 0 ? numString.slice(0, r) + ',' + numString.slice(r, numLength).match(/\d{3}/g).join(',') : numString.slice(r, numLength).match(/\d{3}/g).join(",");
}

const toPercent = function (num) {
    var str = Number(num * 100).toFixed(0);
    str += "%";
    return str;
}


module.exports = {
  formatTime: formatTime,
  objectSize: objectSize,
  getOpenIdSign: getOpenIdSign,
  timeFormat: timeFormat,
  numFormat: numFormat,
  toPercent: toPercent
}
