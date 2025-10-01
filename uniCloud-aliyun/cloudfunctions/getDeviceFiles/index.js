exports.main = async (event, context) => {
  const db = uniCloud.database();
  try {
    const data = await db.collection('devices').get();
    return { data: data.data };
  } catch (e) {
    return { data: [], error: e.message };
  }
};
