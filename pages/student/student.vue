<template>
  <view class="container">
    <view class="title">学生页面</view>

    <view class="card" @click="goToProfile">完善个人信息</view>
    <view class="card" @click="goToQuery">进入查询页面</view>
    <view class="card" @click="goToApplication">递交申请</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: ''
    };
  },
  onLoad() {
    const userInfo = uni.getStorageSync('userInfo');
    if (userInfo && userInfo.username) {
      this.username = userInfo.username;
    } else {
      uni.showToast({ title: '未登录', icon: 'none' });
    }
  },
  methods: {
    // 跳转个人信息填写页面
    goToProfile() {
      uni.navigateTo({ url: '/pages/xinxi/xinxi' });
    },

    // 查询页面（直接进）
    goToQuery() {
      uni.navigateTo({ url: '/pages/deviceinfo/deviceinfo' });
    },

    // 递交申请（需要校验信息）
    async goToApplication() {
      if (!this.username) {
        console.log('username 为空');
        return;
      }
    
      const res = await uniCloud.database().collection('mydatabase')
        .where({ username: this.username })
        .get();
    
      console.log('查询结果', res.result.data);
    
      if (res.result.data.length === 0) {
        uni.showToast({ title: '请先完善信息', icon: 'none' });
        return;
      }
    
      const user = res.result.data[0];
      console.log('用户数据', user);
    
      if (!user.className || !user.studentId || !user.myname) {
        uni.showToast({ title: '请先完善个人信息', icon: 'none' });
        return;
      }
    
      uni.navigateTo({ url: '/pages/query/query' });
    }

  }
};
</script>


<style scoped>
.container {
  padding: 40rpx;
}
.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 40rpx;
  text-align: center;
}
.card {
  padding: 30rpx;
  margin-bottom: 20rpx;
  background-color: #f7f7f7;
  border-radius: 16rpx;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  font-size: 30rpx;
}
</style>
