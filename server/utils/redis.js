const redis = require("redis");
// docker 部署
let url = "localhost";
let port = 6379;
if(process.env.NODE_ENV === "production") {
  url = "172.19.196.91";
}
const redisClient = redis.createClient(port, url);

// 让redis能异步
const { promisify } = require("util");

const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);
// 设置过期时间
const expireAsync = promisify(redisClient.expire).bind(redisClient);
// 查看还有多久过期
const TTLAsync = promisify(redisClient.TTL).bind(redisClient);

module.exports = {
  getAsync,
  setAsync,
  delAsync,
  expireAsync,
  TTLAsync,
};
