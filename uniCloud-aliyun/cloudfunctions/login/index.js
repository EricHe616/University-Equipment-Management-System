'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const{username,password}=event
	const collection =db.collection('mydatabase')
	try{
		const userRes = await db.collection('mydatabase')
		.where({username})
		.get()
		if(userRes.data.length===0){
			return{success:false,message:'账号不存在'}
		}
		const user=userRes.data[0]
		
		if (user.password!==password){
			return {success:false,message:'密码错误'}
		}
		
		return { 
		      success: true, 
		      message: '登录成功',
		      userInfo: {
		        username: user.username,
		        role: user.role, // 用户角色（admin或user）
		        // 其他需要的用户信息
		      }
		    }
		    
		  } catch (e) {
		    console.error('登录失败', e)
		    return { success: false, message: '登录失败，请重试' }
		  }
};
