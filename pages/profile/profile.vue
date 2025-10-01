<template>
  <view class="container">
    <view class="user-card" v-for="(user, index) in users" :key="user._id">
      <view class="user-info">
        <text>账号：{{ user.username }}</text>
        <text>角色：{{ user.role }}</text>
        <text>状态：{{ user.status === 'active' ? '正常' : '已冻结' }}</text>
      </view>
      <view class="actions">
        <button size="mini" type="warn" @click="toggleStatus(user, index)">
          {{ user.status === 'active' ? '冻结账户' : '解冻账户' }}
        </button>
        <button size="mini" @click="resetPassword(user._id)">重置密码</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      users: []
    }
  },
  onLoad() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      const res = await uniCloud.callFunction({
        name: 'getUsers' // 云函数，返回所有用户信息
      })
      this.users = res.result.data
    },
    async toggleStatus(user, index) {
      const newStatus = user.status === 'active' ? 'frozen' : 'active'
      await uniCloud.callFunction({
        name: 'updateUserStatus',
        data: { userId: user._id, status: newStatus }
      })
      this.users[index].status = newStatus
      uni.showToast({ title: '操作成功', icon: 'success' })
    },
    async resetPassword(userId) {
      await uniCloud.callFunction({
        name: 'resetUserPassword',
        data: { userId, newPassword: '123456' }
      })
      uni.showToast({ title: '密码已重置为 123456', icon: 'success' })
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}
.user-card {
  background: #fff;
  padding: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.user-info text {
  display: block;
  margin-bottom: 10rpx;
}
.actions {
  display: flex;
  justify-content: space-between;
}
</style>
