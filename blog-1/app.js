// 导入 blog 路由文件
const handleBlogRouter = require("./src/router/blog");
// 导入 user 路由文件
const handleUserRouter = require("./src/router/user");
// 引入querystring
const querystring = require("querystring");

// 用于处理 post data
const getPostData = (req) => {
  const promise = new Promise((resolve, rejects) => {
    // 如果当前的请求方法不是 POST,则返回空
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    // 如果当前的请求头的 content-type 不为 application/json,则返回空
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    // 接收前端请求的数据
    req.on("data", (chunk) => {
      // 将传进来的数据转换为字符串
      postData += chunk.toString();
    });
    req.on("end", () => {
      // 如果 postData 为空，则返回空
      if (!postData) {
        resolve({});
        return;
      }
      // 如果 postData 存在，则返回这个JSON格式的对象
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  //设置返回格式JSON
  res.setHeader("Content-type", "application/json");

  // 获取path
  const url = req.url;
  req.path = url.split("?")[0];

  //解析query
  req.query = querystring.parse(url.split("?")[1]);
  // 处理 post data
  getPostData(req).then((postData) => {
    // 把 postData 的数据放到 req.body 中
    req.body = postData;

    //处理blog 路由
    // const blogData = handleBlogRouter(req, res);

    // if (blogData) {
    //   // 把 JSON 类型的数据先转换为字符串，再响应给前端
    //   res.end(JSON.stringify(blogData));
    //   // 最后需要返回
    //   return;
    // }
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      // blogData 为SuccessModule对象返回的结果
      blogResult.then((blogData) => {
        // console.log("blogData:", blogData);
        // 把 JSON 类型的数据先转换为字符串，再响应给前端
        res.end(JSON.stringify(blogData));
      });
      // 最后需要返回
      return;
    }

    //处理user路由
    // const userData = handleUserRouter(req, res);
    // if (userData) {
    //   res.end(JSON.stringify(userData));
    // }
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then((userData) => {
        res.end(JSON.stringify(userData));
      });
      return;
    }

    //未命中路由，返回404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  });
};

module.exports = serverHandle;
