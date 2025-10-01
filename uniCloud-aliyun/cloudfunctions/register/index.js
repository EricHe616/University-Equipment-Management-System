'use strict';
const db=uniCloud.database()
exports.main = async (event, context) => {
	const{username,password,role}=event
	const collection = db.collection('mydatabase')
	
	try {
	    // 判断账号是否已存在
	    const res = await collection.where({ username }).get()
	    if (res.data.length > 0) {
	      return {
	        success: false,
	        message: '账号已存在'
	      }
	    }
	    await collection.add({
	      username,
	      password,
	      role,  // 'admin' 或 'user'
	      createdAt: Date.now()
	    })
	
	    return {
	      success: true,
	      message: '注册成功，请登录'
	    }
	
	  } catch (e) {
	    console.error('注册失败', e)
	    return { success: false, message: '注册失败，请重试' }
	  }
	}	
