// 导入数据文件
const { login } = require("../controller/user");
// 导入数据模型
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  // 登录
  if (req.method == "POST" && req.path == "/api/user/login") {
    const { username, password } = req.body;
    const result = login(username, password);
    console.log(result)
    return result.then((data) => {
      if (data.username) {
        return new SuccessModel();
      } else {
        return new ErrorModel("登录失败");
      }
    });
  }
};

module.exports = handleUserRouter;
