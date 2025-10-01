<template>
  <view class="container">
    <view class="form-group">
      <text class="label">设备编号</text>
      <input v-model="device.id" placeholder="请输入设备编号" class="input" />
    </view>

    <view class="form-group">
      <text class="label">上传图片</text>
      <view class="upload-btn" @click="uploadFile">选择图片</view>

    </view>

    <!-- 预览上传图片 -->
    <view v-if="tempFileURL" class="preview-box">
      <image 
        v-if="tempFileURL" 
        :src="tempFileURL || ''" 
        mode="aspectFit" 
        class="preview-img" 
      />

    </view>

    <button type="primary" @click="submitToDB">提交至数据库</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      device: {
        id: '',
        fileName: '',
        fileID: ''
      },
      tempFileURL: ''
    };
  },
  methods: {
    async uploadFile() {
      try {
        const res = await uni.chooseImage({ count: 1});
        const file = res.tempFiles?.[0];
        if (!file) throw new Error('未选择文件');
        
        const path = file.tempFilePath || file.path;
        if (!path) throw new Error('路径无效');
        
        const fileName = (path.split('/').pop() || 'upload.jpg').replace(/\s+/g, '_');

        const cloudPath = 'device_uploads/' + Date.now() + '_' + fileName.replace(/\s+/g, '_');
    
        const uploadRes = await uniCloud.uploadFile({
          filePath: path,
          cloudPath
        });
    
        if (uploadRes.fileID) {
          this.device.fileName = fileName;
          this.device.fileID = uploadRes.fileID;
    
          const urlRes = await uniCloud.getTempFileURL({
            fileList: [uploadRes.fileID]
          });
    
          this.tempFileURL = urlRes.fileList[0].tempFileURL;
          console.log('上传成功，预览地址：', this.tempFileURL);
    
          uni.showToast({ title: '上传成功', icon: 'success' });
        } else {
          throw new Error('上传失败');
        }
      } catch (e) {
        console.error(e);
        uni.showToast({ title: '上传失败', icon: 'none' });
      }
    },


    previewImage() {
      uni.previewImage({
        urls: [this.tempFileURL]
      });
    },
    async submitToDB() {
      if (!this.device.id || !this.device.fileID) {
        return uni.showToast({ title: '请填写设备编号并上传图片', icon: 'none' });
      }

      try {
        const res = await uniCloud.callFunction({
          name: 'addDeviceFile',
          data: this.device
        });

        if (res.result.success) {
          uni.showToast({ title: '提交成功', icon: 'success' });
          this.device = { id: '', fileName: '', fileID: '' };
          this.tempFileURL = '';
        } else {
          uni.showToast({ title: '提交失败', icon: 'none' });
        }
      } catch (e) {
        console.error(e);
        uni.showToast({ title: '数据库异常', icon: 'none' });
      }
    }
  }
};
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
  margin-bottom: 10rpx;
}
.upload-btn {
  background-color: #007AFF;
  color: #fff;
  padding: 10rpx 20rpx;
  border-radius: 8rpx;
  text-align: center;
  margin-top: 10rpx;
}

.input {
  border: 1px solid #ccc;
  padding: 10rpx;
  border-radius: 8rpx;
}
.preview-box {
  margin: 20rpx 0;
}
.preview-img {
  width: 100%;
  height: 300rpx;
  border-radius: 10rpx;
  border: 1px solid #ccc;
}
</style>
