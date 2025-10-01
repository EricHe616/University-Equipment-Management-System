<template>
  <view>
    <slot />
    <view class="global-footer">
      <text v-for="(w, i) in words" :key="i">{{ w }}</text>
    </view>
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

<style>
.global-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  color: #666;
  font-size: 14px;
  z-index: 1000;
}
</style>
