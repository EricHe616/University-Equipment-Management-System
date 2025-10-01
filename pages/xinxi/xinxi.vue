<template>
  <view class="container">
    <view class="form-item">
      <text>姓名</text>
      <input v-model="myname" placeholder="请输入姓名" class="input" />
    </view>
    <view class="form-item">
      <text>班级</text>
      <input v-model="className" placeholder="请输入班级" class="input" />
    </view>
    <view class="form-item">
      <text>学号</text>
      <input v-model="studentId" placeholder="请输入学号" class="input" />
    </view>

    <button type="primary" @click="submitProfile">提交信息</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      myname: '',
      className: '',
      studentId: '',
      username: '' // 当前登录用户
    };
  },
  onLoad() {
    // 假设登录时保存了 username 到本地缓存
    const userInfo = uni.getStorageSync('userInfo');
    if (userInfo) this.username = userInfo.username;
  },
  methods: {
    async submitProfile() {
      if (!this.myname || !this.className || !this.studentId) {
        return uni.showToast({ title: '请填写完整信息', icon: 'none' });
      }

      const res = await uniCloud.callFunction({
        name: 'updateStudentProfile', // 云函数名
        data: {
          username: this.username,
          profile: {
            myname: this.myname,
            className: this.className,
            studentId: this.studentId
          }
        }
      });

      if (res.result.success) {
        uni.showToast({ title: '上传成功', icon: 'success' });
      } else {
        uni.showToast({ title: '上传失败', icon: 'none' });
      }
    }
  }
};
</script>