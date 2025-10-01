// 云函数：getUsers/index.js
'use strict';
const db = uniCloud.database();
const collection = db.collection('mydatabase'); // 你的用户集合名

exports.main = async (event, context) => {
  try {
    const res = await collection.get();
    return {
      success: true,
      data: res.data
    };
  } catch (e) {
    return {
      success: false,
      message: '获取用户失败',
      error: e
    };
  }
};
