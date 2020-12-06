const env = process.env.NODE_ENV; // 环境参数

// 配置
let MYSQL_CONF;

// 通过 npm run dev 会使用下面这个配置
if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "woai008",
    port: "3306",
    database: "myblog",
  };
}

// 通过 npm run production 会使用下面这个配置
if (env === "production") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "woai008",
    port: "3306",
    database: "myblog",
  };
}

// 通过 node .\bin\www.js 启动服务会使用下面这个数据库配置
MYSQL_CONF = {
  host: "localhost",
  user: "root",
  password: "woai008",
  port: "3306",
  database: "myblog",
};

module.exports = {
  MYSQL_CONF,
};