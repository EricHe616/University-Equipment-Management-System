// cloudfunctions/updateQueryStatus/index.js
const db = uniCloud.database()

exports.main = async (event, context) => {
  const { _id, status, reason = '' } = event

  if (!_id || !status) {
    return {
      success: false,
      error: '缺少必要参数'
    }
  }

  try {
    const updateData = {
      status,
      updateTime: Date.now()
    }

    if (status === 'rejected') {
      updateData.reason = reason
    }

    await db.collection('query').doc(_id).update(updateData)

    return {
      success: true,
      message: '更新成功'
    }
  } catch (e) {
    return {
      success: false,
      error: e.message
    }
  }
}
