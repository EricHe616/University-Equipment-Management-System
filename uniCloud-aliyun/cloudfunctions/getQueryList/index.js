// cloudfunctions/getQueryList/index.js
const db = uniCloud.database()

exports.main = async (event, context) => {
  console.log('云函数被调用:', event)
  try {
    const res = await db.collection('query').get()
    console.log('查询结果:', res)
    return {
      success: true,
      data: res.data
    }
  } catch (e) {
    console.error('数据库查询错误:', e)
    return {
      success: false,
      error: e.message,
      stack: e.stack
    }
  }
}