<template>
  <view class="container">
    <view class="form-item">
      <text>设备编号 *</text>
      <input v-model="device.id" placeholder="请输入设备编号" />
    </view>

    <view class="form-item">
      <text>设备名称 *</text>
      <input v-model="device.name" placeholder="请输入设备名称" />
    </view>

    <view class="form-item">
      <text>型号 *</text>
      <input v-model="device.model" placeholder="请输入设备型号" />
    </view>

    <view class="form-item">
      <text>购置日期 *</text>
      <picker mode="date" @change="onDateChange" :value="device.purchaseDate">
        <view class="picker-view">{{ device.purchaseDate || '选择日期' }}</view>
      </picker>
    </view>

    <view class="form-item">
      <text>存放位置 *</text>
      <picker :range="locationOptions" @change="onLocationChange" :value="locationIndex">
        <view class="picker-view">{{ device.location || '选择位置' }}</view>
      </picker>
    </view>

    <view class="form-item">
      <text>设备类型 *</text>
      <picker :range="typeOptions" @change="onTypeChange" :value="typeIndex">
        <view class="picker-view">{{ device.type || '选择类型' }}</view>
      </picker>
    </view>

    <view class="form-item">
      <text>上传电子档案（图片/PDF）</text>
      <button @click="goToUp">选择文件</button>
      <text v-if="device.fileName">{{ device.fileName }}</text>
    </view>

    <view class="form-item">
      <button type="primary" @click="submit">提交</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      device: {
        id: '',
        name: '',
        model: '',
        purchaseDate: '',
        location: '',
        type: '',
        filePath: '',
        fileName: ''
      },
      locationOptions: ['实验室A', '实验室B', '办公室', '仓库'],
      typeOptions: ['教学', '科研', '办公'],
      locationIndex: -1, // 添加位置索引
      typeIndex: -1      // 添加类型索引
    }
  },
  methods: {
    // 添加日期选择处理
    onDateChange(e) {
      this.device.purchaseDate = e.detail.value;
    },
    
    // 添加位置选择处理
    onLocationChange(e) {
      const index = e.detail.value;
      this.locationIndex = index;
      this.device.location = this.locationOptions[index];
    },
    
    // 添加类型选择处理
    onTypeChange(e) {
      const index = e.detail.value;
      this.typeIndex = index;
      this.device.type = this.typeOptions[index];
    },
    

    goToUp(){
		uni.navigateTo({
			url:'/pages/shangchuan/shangchuan'
		})
	},    
    
    // 提交表单
    async submit() {
      // 验证必填字段
      if (!this.device.id || !this.device.name || !this.device.model || 
          !this.device.purchaseDate || !this.device.location || !this.device.type) {
        uni.showToast({ title: '请填写所有必填字段', icon: 'none' });
        return;
      }
      
      try {
        // 提交到云函数
        const res = await uniCloud.callFunction({
          name: 'addDevice',
          data: this.device
        });
        
        if (res.result && res.result.success) {
          uni.showToast({ title: '设备添加成功', icon: 'success' });
          // 清空表单
          this.device = {
            id: '',
            name: '',
            model: '',
            purchaseDate: '',
            location: '',
            type: '',
            filePath: '',
            fileName: ''
          };
          this.locationIndex = -1;
          this.typeIndex = -1;
        } else {
          uni.showToast({ title: res.result.message || '添加失败', icon: 'none' });
        }
      } catch (err) {
        console.error('提交失败', err);
        uni.showToast({ title: '提交失败: ' + err.message, icon: 'none' });
      }
    }
  }
}
</script>

<style>
.container {
  padding: 20rpx;
}
.form-item {
  margin-bottom: 30rpx;
  padding: 15rpx;
  border-bottom: 1rpx solid #eee;
}
.picker-view {
  padding: 20rpx;
  background: #f5f5f5;
  border-radius: 10rpx;
  margin-top: 10rpx;
}
</style>