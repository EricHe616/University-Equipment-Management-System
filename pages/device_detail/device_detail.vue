<template>
  <view class="device-list">
    <view class="device-card">
      <!-- 图片 -->
      <image
        class="device-image"
        :src="device.fileUrl"
        mode="aspectFill"
        v-if="isImage(device.fileUrl)"
      />

      <!-- 文字信息 -->
      <view class="device-info">
        <text>名称：{{ device.name }}</text>
        <text>型号：{{ device.model }}</text>
        <text>类型：{{ device.type }}</text>
        <text>位置：{{ device.location }}</text>
        <text>购置日期：{{ device.purchaseDate }}</text>
        <text>状态：{{ device.status.label }}</text>
        <text v-if="device.status.detail?.banReason">封存原因：{{ device.status.detail.banReason }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    device: Object
  },
  methods: {
    isImage(url) {
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    }
  }
}
</script>

<style scoped>
.device-list {
  padding: 20rpx;
}
.device-card {
  background: #fff;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.device-image {
  width: 100%;
  height: 200rpx;
  border-radius: 10rpx 10rpx 0 0;
}
.device-info {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}
</style>
