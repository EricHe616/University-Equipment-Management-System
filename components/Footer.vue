<!-- components/Footer.vue -->
<template>
  <view class="footer">
    <text v-for="(word, index) in words" :key="index">{{ word }}</text>
  </view>
</template>

<script>
export default {
  data() {
    return {
      words: ['勤奋', '严谨', '求实', '创新']
    }
  }
}
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f9f9f9;
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #666;
  font-size: 14px;
  z-index: 999;
  border-top: 1px solid #ddd;
}
</style>
