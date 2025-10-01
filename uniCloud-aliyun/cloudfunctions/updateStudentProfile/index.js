'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { username, profile } = event;

  if (!username || !profile) {
    return { success: false, message: '参数不完整' };
  }

  try {
    const res = await db.collection('mydatabase').where({ username }).update({
      myname: profile.myname,
      className: profile.className,
      studentId: profile.studentId
    });

    if (res.updated > 0) {
      return { success: true };
    } else {
      return { success: false, message: '未找到用户或数据未更新' };
    }
  } catch (err) {
    console.error(err);
    return { success: false, message: '服务器错误' };
  }
};
