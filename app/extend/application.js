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
    const result = ""; //统一改名: alt + shift + R
    for(const i = 0; i < length ; i ++) {
        const index = this.getRandom(0, 10);
        result += chars[index];
    }
    return result;
  },
};
