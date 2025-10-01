<template>
  <view class="container">
    <button @click="goToDeviceInfo" class="btn gradient-btn">设备信息页面</button>
    <button @click="goToAudit" class="btn gradient-btn">审核页面</button>
  </view>
</template>

<script>
export default {
  methods: {
    goToDeviceInfo() {
      uni.navigateTo({
        url: '/pages/deviceinfo/deviceinfo'
      });
    },
    goToAudit() {
      uni.navigateTo({
        url: '/pages/examine/examine'
      });
    }
  }
}
</script>

<style scoped>
.container {
  padding: 50rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f4f8;
}

.btn {
  width: 80%;
  padding: 18rpx 0;
  margin: 15rpx 0;
  border-radius: 40rpx;
  font-size: 30rpx;
  font-weight: 600;
  color: white;
  text-align: center;
  box-shadow: 0 6rpx 12rpx rgba(0, 122, 255, 0.3);
  transition: transform 0.15s ease-in-out;
}

.btn:active {
  transform: scale(0.95);
}

.gradient-btn {
  background-image: linear-gradient(45deg, #4facfe, #00f2fe);
}
</style>
