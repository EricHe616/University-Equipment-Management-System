// 云函数 resetUserPassword
'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
  const { userId, newPassword } = event;

  if (!userId || !newPassword) {
    return {
      success: false,
      message: '缺少参数'
    };
  }

  try {


    await db.collection('mydatabase').doc(userId).update({
      password: encryptedPassword,
      updateTime: Date.now()
    });

    return {
      success: true,
      message: '密码重置成功'
    };
  } catch (err) {
    return {
      success: false,
      message: '重置失败：' + err.message
    };
  }
};
