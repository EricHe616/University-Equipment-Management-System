'use strict'
const db = uniCloud.database()

exports.main = async (event, context) => {
  const { userId, status } = event

  // 参数校验
  if (!userId || !status) {
    return {
      success: false,
      message: '缺少 userId 或 status 参数'
    }
  }

  try {
    await db.collection('users').doc(userId).update({
      status: status,
      updateTime: Date.now()
    })

    return {
      success: true,
      message: '用户状态更新成功'
    }
  } catch (err) {
    return {
      success: false,
      message: '更新失败：' + err.message
    }
  }
}
