// 导入统一执行 sql 的函数的文件
const { exec } = require("../db/mysql");

const login = (username, password) => {
  // if (username == "zhangsan" && passsword == "123") {
  //   return true;
  // }
  // return false;
  const sql = `select username,realname from users where username='${username}' and password='${password}'`;
  console.log(sql)
  return exec(sql).then((rows) => {
    return rows[0] || {};
  });
};

module.exports = {
  login,
};
