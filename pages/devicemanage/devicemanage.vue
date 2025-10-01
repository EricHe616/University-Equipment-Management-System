<template>
  <view class="container">
    <view class="form-item">
      <text>设备编号（ID）</text>
      <input v-model="id" placeholder="请输入设备ID" />
    </view>

    <view class="form-item">
      <text>设备状态</text>
      <picker :range="statusOptions" @change="onStatusChange">
        <view class="picker">{{ status.label || '请选择状态' }}</view>
      </picker>
    </view>

    <view class="form-item" v-if="status.code === 'running'">
      <input v-model="status.detail.user" placeholder="使用人" />
      <input v-model="status.detail.purpose" placeholder="用途" />
    </view>

    <view class="form-item" v-if="status.code === 'repairing'">
      <input v-model="status.detail.repairMan" placeholder="维修人" />
      <input v-model="status.detail.description" placeholder="故障描述" />
      <input v-model="status.detail.endTime" placeholder="预计完成时间" />
    </view>
	
	<view class="form-item" v-if="status.code === 'cleaning'">
	  <input v-model="status.detail.cleanMan" placeholder="清洁责任人" />
	  <input v-model="status.detail.cleanTime" placeholder="完成时限" />
	</view>

	<view class="form-item" v-if="status.code === 'banning'">
	  <input v-model="status.detail.banReason" placeholder="封存原因" />
	</view>


    <button type="primary" @click="submitStatus">提交状态</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      statusOptions: ['运行中', '维修中','待清洁','封存'],
      statusMap: {
        '运行中': { code: 'running', color: 'green' },
        '维修中': { code: 'repairing', color: 'red' },
		'待清洁': { code: 'cleaning', color:'yellow'},
		'封存': { code: 'banning', color:'gray'},
      },
      status: {
        code: '',
        label: '',
        color: '',
        detail: {}
      }
    };
  },
  methods: {
    onStatusChange(e) {
      const label = this.statusOptions[e.detail.value];
      const { code, color } = this.statusMap[label];
      this.status = {
        code,
        label,
        color,
        detail: {}
      };
    },
    async submitStatus() {
      if (!this.id) {
        uni.showToast({ title: '请填写设备ID', icon: 'none' });
        return;
      }

      const res = await uniCloud.callFunction({
        name: 'updateDeviceStatus',
        data: {
          id: this.id,
          status: this.status
        }
      });

      if (res.result.success) {
        uni.showToast({ title: '状态已提交', icon: 'success' });
      } else {
        uni.showToast({ title: res.result.message || '提交失败', icon: 'none' });
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding: 30rpx;
}
.form-item {
  margin-bottom: 20rpx;
}
.picker {
  padding: 10rpx;
  background: #efefef;
  border-radius: 8rpx;
}
</style>
