const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

function randomName() {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}-${Math.random()
    .toString(16)
    .substr(2, 5)}`;
}

// 二进制流已经验证了格式
// 这里的url是上传至服务器后保存在服务器目录下的二进制流的路径
async function imgToBase64(url) {
  try{
    const data = await fs.promises.readFile(url, 'binary')
    return Buffer.from(data, 'binary').toString('base64');
  }catch(e){
    console.error(e);
    ctx.app.error.throw(500, '服务端图片转base64格式发生异常！');
  }
}


class UploadController extends Controller {
  async uploadAvatar () {
    const { ctx } = this;
    if (!ctx.request.files || ctx.request.files.length === 0) {
      ctx.app.error.throw(406, '服务端无法找到上传的文件数据');
    }
    if (ctx.request.files.length > 1) {
      ctx.app.error.throw(406, '服务端目前仅支持单个文件上传');
    }
    
    console.log(ctx.request);
    console.log('UploadController', ctx.request.files);
    // 处理上传逻辑
    const file = ctx.request.files[0];
    const name = randomName();
    const ext = path.extname(file.filename);
    const basename = name + ext;
    const dest = path.join(__dirname, '../public/upload', basename);
    // const url = ctx.app.config.static.prefix + 'upload/' + basename;//TODO: 这是最初的逻辑, 放在了根目录下的static, 但是我这没有那些图片啊
    // const url = `/app/public/upload/${basename}`;
    await fs.promises.rename(file.filepath, dest);
    let url = await imgToBase64(dest);
    url = `data:image/png;base64,${url}`;
    const userId = ctx.params.id;
    console.log('userId', userId);
    await ctx.service.upload.postAvatar(userId, url);
    ctx.body = url;
  }

  async index() {
    const { ctx } = this;
    if (!ctx.request.files || ctx.request.files.length === 0) {
      ctx.app.error.throw(406, '服务端无法找到上传的文件数据');
    }
    if (ctx.request.files.length > 1) {
      ctx.app.error.throw(406, '服务端目前仅支持单个文件上传');
    }
    

    // 处理上传逻辑
    const file = ctx.request.files[0];
    const name = randomName();
    const ext = path.extname(file.filename);
    const basename = name + ext;
    const dest = path.join(__dirname, '../public/upload', basename);
    const url = ctx.app.config.static.prefix + 'upload/' + basename;
    await fs.promises.rename(file.filepath, dest);
    ctx.body = url;
  }

  async addUploadImageURL(){
    this.ctx.body = await this.ctx.service.upload.add(this.ctx.request.body);
  }

  async findAllImageURL(){
    this.ctx.body = await this.ctx.service.upload.findAll();
  }

  async removeImage(){
    this.ctx.body = await this.ctx.service.upload.delImage(this.ctx.params.id);
  }
}

module.exports = UploadController;
