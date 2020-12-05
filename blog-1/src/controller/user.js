const login = (username, passsword) => {
  if (username == "zhangsan" && passsword == "123") {
    return true;
  }
  return false;
};

module.exports = {
  login,
};
