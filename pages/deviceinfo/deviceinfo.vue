<template>
  <view class="container">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <input v-model="keyword" placeholder="请输入设备关键词" class="search-input" />
      <button @click="searchDevice" class="search-btn">搜索</button>
    </view>

    <!-- 滑块选择设备类型 -->
    <scroll-view class="type-scroll" scroll-x="true">
      <view 
        class="type-item" 
        :class="{ active: currentType === item }" 
        v-for="(item, index) in typeList" 
        :key="index"
        @click="selectType(item)"
      >
        {{ item }}
      </view>
    </scroll-view>

    <!-- 设备信息展示 -->
    <view class="device-grid">
      <view
        class="device-card"
        v-for="(device, index) in filteredDevices"
        :key="device.id"
		:style="{ backgroundColor: device.status?.color || '#ffffff' }"
		@click="viewDetail(device)"
      >
        <image
          class="device-img"
          :src="device.fileID || defaultImage"
          mode="aspectFill"
        />
        <view class="device-text">
          <text class="device-name">{{ device.name }}</text>
        </view>
      </view>
    </view>

  </view>
</template>



<script>
export default {
  data() {
    return {
      keyword: '',
      currentType: '科研',
      typeList: ['科研', '教学', '办公'],
      deviceList: [],
      defaultImage: '/static/images/R.jpg' // 放一个默认图路径（本地或CDN）
    };
  },
  computed: {
    filteredDevices() {
      const kw = this.keyword || '';
      return this.deviceList.filter(item =>
        item.type === this.currentType &&
        ((item.name || '').includes(kw) || (item.id || '').includes(kw))
      );
    }
  },
  onLoad() {
    this.getDeviceList();
  },
  methods: {
	viewDetail(device) {
	  if (!device || !device.id) {
	    uni.showToast({ title: '设备信息异常', icon: 'none' });
	    return;
	  }
	  uni.navigateTo({
	    url: `/pages/deviceDetail/deviceDetail?id=${device.id}`
	  });
	},
    // 切换类型
    selectType(type) {
      this.currentType = type;
    },
    // 搜索设备
    searchDevice() {
      // 只是触发 computed 的 filteredDevices 重新计算
    },
    // 从云数据库获取设备
    async getDeviceList() {
      const res = await uniCloud.database().collection('device').get();
      this.deviceList = res.result.data || [];
    }
  },

};
</script>


<style lang="stylus">
.container
  padding 20rpx

.search-bar
  display flex
  margin-bottom 20rpx

.search-input
  flex 1
  border 1px solid #ccc
  border-radius 6rpx
  padding 10rpx

.search-btn
  margin-left 10rpx

.type-scroll
  display flex
  flex-direction row
  white-space nowrap
  margin-bottom 20rpx

.type-item
  padding 10rpx 20rpx
  margin-right 10rpx
  background #eee
  border-radius 20rpx
  color #333

.type-item.active
  background #007AFF
  color white

.device-grid
  display flex
  flex-wrap wrap
  justify-content space-between

.device-card
  width 48%
  margin-bottom 20rpx
  border-radius 12rpx
  overflow hidden
  box-shadow 0 4rpx 8rpx rgba(0, 0, 0, 0.1)

.device-img
  width 100%
  height 200rpx
  object-fit cover
  background #f0f0f0

.device-text
  padding 10rpx
  text-align center

.device-name
  font-weight bold
  font-size 28rpx

</style>
