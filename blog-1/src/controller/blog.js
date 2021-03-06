const getList = (author, keyword) => {
  // 先返回假数据(格式是正确的)
  return [
    {
      id: 1,
      title: "标题A",
      content: "内容A",
      createTime: 1607088865456,
      author: "zhangsan",
    },
    {
      id: 2,
      title: "标题B",
      content: "内容B",
      createTime: 1607088917715,
      author: "lisi",
    },
  ];
};
const getDetail = (id) => {
  //先返回假数据
  return {
    id: 1,
    title: "标题A",
    content: "内容A",
    createTime: 1546610491112,
    author: "zhangsan",
  };
};

const newBlog = (blogData = {}) => {
  // blogData = {}  如果blogData没有值的话，默认为空
  // blogData 是一个博客对象，包含 title content 属性
  console.log("newBlog blogData...", blogData);
  return {
    id: 3, // 表示新建博客，插入到数据表里面的 id
  };
};
const updateBlog = (id, blogData = {}) => {
  // id就是要更新博客的id
  // blogData 是一个博客对象，包含title content 属性
  console.log('update blog',id, blogData)
  return true;
};

const delBlog = (id) => {
  // id 就是要删除博客的 id
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
