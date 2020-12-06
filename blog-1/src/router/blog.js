const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
  const method = req.method; // GET POST
  const id = req.query.id;
  // const url = req.url;
  // const path = url.split("?")[0];

  //获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    // 获取 query 中的 anthor ,如果没有则为空字符串
    const author = req.query.author || "";
    // 获取 query 中的 keyword ,如果没有则为空字符串
    const keyword = req.query.keyword || "";
    // 调用 getList 函数
    // const listData = getList(author, keyword);
    // return {
    //   msg: new SuccessModel(listData),
    // };
    const result = getList(author, keyword);
    console.log(result);
    // 返回 promise
    // listData 为从数据库查到的对应的数据
    return result.then((listData) => {
      return new SuccessModel(listData);
    });
  }
  //获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    // const data = getDetail(id);
    // return new SuccessModel(data);
    const result = getDetail(id);
    // 返回 promise
    // listData 为从数据库查到的对应的数据
    return result.then((data) => {
      return new SuccessModel(data);
    });
  }

  //新建一篇博客
  if (method === "POST" && req.path === "/api/blog/new") {
    // const data = newBlog(req.body);
    // return new SuccessModel(data);
    req.body.author = "zhangsan"; //假数据，待开发登录时，在改成真实的数据
    const result = newBlog(req.body);
    return result.then((data) => {
      return new SuccessModel(data);
    });
  }

  //更新一篇博 客
  if (method === "POST" && req.path === "/api/blog/update") {
    const result = updateBlog(id, req.body);
    console.log(result);
    return result.then((val) => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("更新博客失败");
      }
    });
  }
  //删除一篇博客
  if (method === "POST" && req.path === "/api/blog/del") {
    // const result = delBlog(id);
    // if (result) {
    //   return new SuccessModel();
    // } else {
    //   return new ErrorModel("删除博客失败");
    // }
    // id就是要删除博客的id
    const author = "zhangsan"; //假数据，待开发登录时再改成真实数据
    const result = delBlog(id, author);
    return result.then((val) => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("删除博客失败");
      }
    });
  }
};
module.exports = handleBlogRouter;
