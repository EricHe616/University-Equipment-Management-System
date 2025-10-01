'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
  // 修正拼写错误: puchaseDate -> purchaseDate
  const { id, name, model, purchaseDate, location, type, fileUrl } = event;
  
  // 验证必填字段
  if (!id || !name || !model || !purchaseDate || !location || !type) {
    return {
      success: false,
      message: '必填字段缺失'
    };
  }
  
  try {
    // 添加设备记录到数据库
    await db.collection('device').add({
      id,
      name,
      model,
      purchaseDate,
      location,
      type,
      fileUrl,
      createTime: Date.now()
    });
    
    return {
      success: true,
      message: '设备信息添加成功'
    };
    
  } catch (err) {
    console.error('数据库写入失败', err);
    return {
      success: false,
      message: '数据库写入失败: ' + err.message
    };
  }
};