'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { id, fileName, fileID } = event;

  if (!id || !fileID) {
    return { success: false, message: '参数缺失' };
  }

  try {
    // 查询是否存在该设备
    const record = await db.collection('device').where({ id }).get();
    if (record.data.length === 0) {
      return { success: false, message: '设备不存在' };
    }

    // 更新该设备的 fileName 和 fileID
    await db.collection('device').where({ id }).update({
      fileName,
      fileID,
      updateTime: Date.now()
    });

    return { success: true };
  } catch (err) {
    return { success: false, message: err.message };
  }
};
