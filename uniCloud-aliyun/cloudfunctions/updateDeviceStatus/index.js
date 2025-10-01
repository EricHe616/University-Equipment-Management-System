'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { id, status } = event;

  if (!id || !status) {
    return { success: false, message: '缺少 id 或 status 参数' };
  }

  try {
    const res = await db.collection('device').where({ id }).update({
      status: status
    });

    if (res.updated === 0) {
      return { success: false, message: '未找到该设备' };
    }

    return { success: true, message: '设备状态更新成功' };
  } catch (err) {
    return { success: false, message: '数据库更新失败', error: err };
  }
};
