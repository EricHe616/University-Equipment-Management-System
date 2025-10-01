<template>
  <view class="container">
    <view class="form-group">
      <text class="label">设备编号</text>
      <input v-model="form.id" placeholder="请输入设备编号" class="input" />
    </view>

    <view class="form-group">
      <text class="label">申请人姓名</text>
      <input v-model="form.applicant" placeholder="请输入申请人姓名" class="input" />
    </view>
	
	<view class="form-group">
	  <text class="label">班级</text>
	  <input v-model="form.class" placeholder="请输入申请人班级" class="input" />
	</view>

    <view class="form-group">
      <text class="label">申请理由</text>
      <textarea v-model="form.reason" placeholder="请输入申请理由" class="textarea"></textarea>
    </view>

    <button type="primary" @click="submitApplication">提交申请</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: '',
        applicant: '',
        reason: '',
		class:'',
      }
    }
  },
  methods: {
    async submitApplication() {
      if (!this.form.id || !this.form.applicant || !this.form.reason || !this.form.class) {
        return uni.showToast({ title: '请填写完整信息', icon: 'none' });
      }
      try {
        const db = uniCloud.database();
        await db.collection('query').add({
          id: this.form.id,
          applicant: this.form.applicant,
		  class:this.form.class,
          reason: this.form.reason,
          createTime: Date.now()
        });
        uni.showToast({ title: '申请提交成功', icon: 'success' });
        // 清空表单
        this.form.id = '';
        this.form.applicant = '';
		this.form.class='';
        this.form.reason = '';
      } catch (error) {
        console.error(error);
        uni.showToast({ title: '提交失败，请重试', icon: 'none' });
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}
.form-group {
  margin-bottom: 20rpx;
}
.label {
  font-weight: bold;
  margin-bottom: 8rpx;
  display: block;
}
.input, .textarea {
  border: 1px solid #ccc;
  border-radius: 6rpx;
  padding: 10rpx;
  width: 100%;
  box-sizing: border-box;
}
.textarea {
  height: 100rpx;
  resize: none;
}
button {
  background-color: #007AFF;
  color: white;
  padding: 15rpx 0;
  border-radius: 8rpx;
  text-align: center;
  font-weight: bold;
}
</style>
