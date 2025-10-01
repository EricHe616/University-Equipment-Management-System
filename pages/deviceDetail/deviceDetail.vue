<template>
  <view class="detail-container" v-if="device">
    <image class="detail-image" :src="device.fileID" mode="aspectFit" />
    <view class="detail-info">
      <text>设备名称：{{ device.name }}</text>
      <text>型号：{{ device.model }}</text>
      <text>位置：{{ device.location }}</text>
      <text>类型：{{ device.type }}</text>
      <text>状态：{{ device.status?.label || '未知' }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      device: null
    };
  },
  onLoad(options) {
    const id = options.id;
    this.loadDevice(id);
  },
  methods: {
    async loadDevice(id) {
      const res = await uniCloud.database()
        .collection('device')
        .where({ id })
        .get();

      if (res.result.data.length > 0) {
        this.device = res.result.data[0];
      }
    }
  }
};
</script>

<style scoped>
.detail-container {
  padding: 20rpx;
}
.detail-image {
  width: 100%;
  height: 300rpx;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}
.detail-info text {
  display: block;
  margin: 10rpx 0;
  font-size: 28rpx;
}
</style>
