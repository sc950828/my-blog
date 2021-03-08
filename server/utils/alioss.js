const OSS = require("ali-oss");
const fs = require("fs");
const { getSetting } = require("./setting");

// ali-oss文档
// https://help.aliyun.com/product/31815.html?spm=a2c4g.11186623.6.540.4ece5338oXgmb4

let ossClient = null;
const basePath = "blog/";

const initOss = async () => {
  const accessKeyId = await getSetting("accessKeyId");
  const accessKeySecret = await getSetting("accessKeySecret");

  ossClient = new OSS({
    bucket: "xiaosu72",
    region: "oss-cn-shanghai",
    // 密钥防止泄露 从数据库加载
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
    secure: true // 启用https
  });
};

initOss();

// 上传图片
const uploadImg =  ({ fileName, file }) => {
  return new Promise( (resolve, reject) => {
    const imgPath = "images/";
    const path = basePath + imgPath + fileName;
    const stream = fs.createReadStream(file.path);
    ossClient.put(path, stream).then(res => {
      resolve(res);
    }).catch(e => {
      reject(e);
    });
  });
};

const progress = (p, _checkpoint) => {
  console.log(p); // Object的上传进度。
  console.log(_checkpoint); // 分片上传的断点信息。
};

// 分片上传
const uploadFile = async ({ fileName, file }) => {
  try {
    const filePath = "files/";
    const path = basePath + filePath + fileName;
    const result = await ossClient.multipartUpload(path, file.path, {
      progress,
      // meta是用户自定义的元数据，通过head接口可以获取到Object的meta数据。
      meta: {
        year: 2021,
        people: 'randy',
      },
    });
    // const head = await client.head(path);
    // console.log(head);
    return Promise.resolve(result);
  } catch (e) {
    return Promise.reject(e);
  }
};

const del = async (fileName) => {
  try {
    let result = await ossClient.delete(fileName);
    return Promise.resolve(result);
  } catch (e) {
    return Promise.reject(e);
  }
};

module.exports = {
  uploadImg,
  uploadFile,
  del
};
