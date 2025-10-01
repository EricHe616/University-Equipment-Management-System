<template>
  <view class="container">
    <view class="form">
      <input v-model="username" placeholder="请输入账号" class="input" />
      <input v-model="password" type="password" placeholder="请输入密码" class="input" />
      
      <!-- 添加 :value 绑定 -->
      <picker 
        @change="onRoleChange" 
        :range="roleLabels" 
        :value="selectedRoleIndex" 
        class="picker"
      >
        <view class="picker-text">{{ roleLabels[selectedRoleIndex] }}</view>
      </picker>
      
      <button @click="register" class="btn">注册</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      roles: ['student', 'teacher', 'admin'], // 实际传给后端的值
      roleLabels: ['学生', '教师', '管理员'],   // 显示给用户看的中文
      selectedRoleIndex: 0
    }
  },
  computed: {
    selectedRole() {
      return this.roles[this.selectedRoleIndex]
    }
  },
  methods: {
    // 添加缺失的角色变更处理方法
    onRoleChange(e) {
      this.selectedRoleIndex = e.detail.value;
    },
    
    register() {
      if (!this.username || !this.password) {
        uni.showToast({ title: '请填写账号和密码', icon: 'none' })
        return
      }
  
      uniCloud.callFunction({
        name: 'register',
        data: {
          username: this.username,
          password: this.password,
          role: this.selectedRole
        },
        success: (res) => {
          if (res.result.success) {
            uni.showToast({ title: res.result.message, icon: 'success' })
            setTimeout(() => {
              uni.navigateTo({ url: '/pages/index/index' })
            }, 1000)
          } else {
            uni.showToast({ title: res.result.message, icon: 'none' })
          }
        },
        fail: (err) => {
          console.error('注册失败', err)
          uni.showToast({ title: '网络错误', icon: 'none' })
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.container
  display flex
  justify-content center
  align-items center
  height 100vh
  background #f0f0f0

.form
  width 80%
  padding 20px
  background white
  border-radius 10px
  box-shadow 0 2px 10px rgba(0, 0, 0, 0.1)

.input
  width 100%
  padding 10px
  margin 10px 0
  border 1px solid #ccc
  border-radius 5px

.picker
  width 100%
  margin 10px 0
  padding 10px
  background #efefef
  border-radius 5px
  /* 确保可点击 */
  position relative
  z-index 1

.picker-text
  color #333

.btn
  width 100%
  padding 10px
  background-color #007AFF
  color white
  border none
  border-radius 5px
  margin-top 10px
</style>