const md5 = require('md5');
const moment = require('moment');
const Base64 = require('js-base64').Base64;
const axios = require('axios');

/*
向指定号码发送指定验证码
 */
async function sendCode(phone, code) {
    const ACCOUNT_SID = '8a216da8804ba8a5018053f3643d0207';
    const AUTH_TOKEN = '0f0b674b583440099cef9a34c3ac26df';
    const Rest_URL = 'https://app.cloopen.com:8883';
    const AppID = '8a216da8804ba8a5018053f3682c020e';
    //1. 准备请求url
    /*
     1.使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。
     时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
     2.SigParameter参数需要大写，如不能写成sig=abcdefg而应该写成sig=ABCDEFG
     */
    let sigParameter = '';
    const time = moment().format('YYYYMMDDHHmmss');
    sigParameter = md5(ACCOUNT_SID+AUTH_TOKEN+time);
    const url = Rest_URL+'/2013-12-26/Accounts/'+ACCOUNT_SID+'/SMS/TemplateSMS?sig='+sigParameter;

    console.log('手机号：', phone);
    //2. 准备请求体
    let data = {
        to : phone,
        appId : AppID,
        templateId : '1',
        "datas":[code,"1"]
    }

    //3. 准备请求头
    /*
     1.使用Base64编码（账户Id + 冒号 + 时间戳）其中账户Id根据url的验证级别对应主账户
     2.冒号为英文冒号
     3.时间戳是当前系统时间，格式"yyyyMMddHHmmss"，需与SigParameter中时间戳相同。
     */
    let authorization = ACCOUNT_SID + ':' + time;
    authorization = Base64.encode(authorization);
    const headers = {
        'Accept' :'application/json',
        'Content-Type' :'application/json;charset=utf-8',
        'Content-Length': JSON.stringify(data).length+'',
        'Authorization' : authorization
    }

    //4. 发送请求, 并得到返回的结果, 调用callback
	  // callback(true);
    return await axios({
        method : 'POST',
        url,
        headers,
        data,
    }).then(res => {
      console.log('已发送给云通讯', res.data);
      if(res?.data?.statusCode==='000000'){
        return true;
      }
    }, (error) => {
      console.error(error);
      return false;
    });
}


class ConsultError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }

  static throw(code = 500, message = '') {
    throw new ConsultError(code, message);
  }
}

exports.error = ConsultError;

exports.utils = {
  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  randomCode(length) {//生成指定长度的随机数
    const chars = ['0','1','2','3','4','5','6','7','8','9'];
    let result = ""; //统一改名: alt + shift + R
    for(let i = 0; i < length ; i ++) {
        const index = this.getRandom(0, 10);
        result += chars[index];
    }
    return result;
  },
  sendCode,
};
