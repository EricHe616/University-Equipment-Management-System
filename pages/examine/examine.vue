<template>
  <view class="container">
    <view v-if="loading">加载中...</view>
    <view v-else>
      <view 
        v-for="item in queryList" 
        :key="item._id" 
        class="query-item" 
        :style="{ borderColor: getStatusColor(item.status) }"
      >
        <text>申请人：{{ item.apply || '未知' }}</text>                           
        <text>设备名称：{{ item.device || '未知' }}</text>

        
        <!-- 状态展示 -->
        <view class="status" :style="{ color: getStatusColor(item.status) }">
          状态：{{ getStatusLabel(item.status) }}
          <text v-if="item.status === 'rejected'">（原因：{{ item.reason || '无' }}）</text>
        </view>
        
        <!-- 审核按钮，只显示未审核状态 -->
        <view v-if="item.status === 'pending'" class="btn-group">
          <button @click="approve(item)">通过</button>
          <button @click="reject(item)">拒绝</button>
        </view>

        <!-- 拒绝时填写原因 -->
        <view v-if="item.status === 'rejecting'">
          <input v-model="item.tempReason" placeholder="请输入拒绝原因" />
          <button @click="submitReject(item)">提交拒绝</button>
          <button @click="cancelReject(item)">取消</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      queryList: [],  // 云数据库查询数据
      loading: true
    };
  },
  methods: {
    async fetchQueryList() {
      this.loading = true;
      try {
        // 调用云函数
        const res = await uniCloud.callFunction({
          name: 'getQueryList',
          data: {}
        });
        
        if (res.result.success) {
          // 给每条数据添加临时字段控制拒绝输入框
          this.queryList = res.result.data.map(item => ({
            ...item,
            tempReason: '',
            status: item.status || 'pending'  // 默认未审核
          }));
        } else {
          throw new Error(res.result.error || '查询失败');
        }
      } catch (e) {
        console.error('查询失败:', e);
        uni.showToast({ title: '加载失败', icon: 'none' });
      }
      this.loading = false;
    },
    getStatusLabel(status) {
      if (status === 'pending') return '未审核';
      if (status === 'approved') return '已审核';
      if (status === 'rejected') return '未通过';
      if (status === 'rejecting') return '拒绝中';
      return '未知';
    },
    getStatusColor(status) {
      if (status === 'pending') return 'red';
      if (status === 'approved') return 'green';
      if (status === 'rejected') return 'gray';
      if (status === 'rejecting') return 'orange';
      return 'black';
    },
    // 通过审核
    async approve(item) {
      try {
        await uniCloud.callFunction({
          name: 'updateQueryStatus',
          data: {
            _id: item._id,
            status: 'approved'
          }
        });

        item.status = 'approved';
        uni.showToast({ title: '审核通过', icon: 'success' });
      } catch (e) {
        uni.showToast({ title: '操作失败', icon: 'none' });
      }
    },
    // 点击拒绝，进入填写原因阶段
    reject(item) {
      this.queryList = this.queryList.map(i => {
        if (i._id === item._id) {
          i.status = 'rejecting';
          i.tempReason = '';
        }
        return i;
      });
    },
    // 提交拒绝原因
    async submitReject(item) {
      if (!item.tempReason.trim()) {
        return uni.showToast({ title: '请填写拒绝原因', icon: 'none' });
      }
      try {
        await uniCloud.database().collection('query').doc(item._id).update({
          status: 'rejected',
          reason: item.tempReason,
        });
        item.status = 'rejected';
        uni.showToast({ title: '已拒绝', icon: 'success' });
      } catch (e) {
        uni.showToast({ title: '操作失败', icon: 'none' });
      }
    },
    cancelReject(item) {
      // 取消拒绝编辑，恢复未审核状态
      item.status = 'pending';
    },
    formatDate(ts) {
      if (!ts) return '';
      const date = new Date(ts);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
  },
  onLoad() {
    this.fetchQueryList();
  }
};
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.query-item {
  border: 2rpx solid;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  padding: 15rpx;
}

.status {
  margin-top: 10rpx;
  font-weight: bold;
}

.btn-group {
  margin-top: 10rpx;
}

.btn-group button {
  margin-right: 15rpx;
  background-color: #007AFF;
  color: white;
  padding: 8rpx 15rpx;
  border-radius: 6rpx;
}
</style>
