<template>
  <view class="container">
	<view class="header">
	    <text @click="goToDevice">设备信息</text>
	    <text @click="goToStatus">设备状态</text>
	    <text @click="goToQuery">数据查询</text>
	    <text @click="goToProfile">个人信息</text>
	</view>
	
  </view>
</template>

<script>
export default {
  methods: {
    goToDevice() {
      uni.navigateTo({
        url: '/pages/device/device'
      })
    },
    goToStatus() {
      uni.navigateTo({
        url: '/pages/devicemanage/devicemanage'
      })
    },
    goToQuery() {
      uni.navigateTo({
        url: '/pages/examine/examine'
      })
    },
    goToProfile() {
      uni.navigateTo({
        url: '/pages/profile/profile'
      })
    }
  }
}
</script>

<style lang="stylus">
.container
  padding 20px
  background #f9f9f9
  min-height 100vh
  box-sizing border-box

.header
  display flex
  flex-wrap wrap
  justify-content space-between
  align-items center
  margin-bottom 20px

.search
  flex 1
  margin-right 10px

.search input
  width 100%
  padding 10px
  font-size 14px
  border 1px solid #ccc
  border-radius 5px
  background-color #fff

.placeholder
  color #aaa

button
  padding 10px 16px
  font-size 14px
  background-color #007AFF
  color #fff
  border none
  border-radius 5px

// 导航栏样式
.header:nth-child(2)
  display flex
  justify-content space-around
  background #fff
  padding 12px 0
  border-radius 8px
  box-shadow 0 2px 10px rgba(0,0,0,0.05)

.header:nth-child(2) text
  font-size 16px
  color #007AFF
  font-weight bold
  padding 8px 12px
  border-radius 6px
  transition background 0.3s
  &:active
    background #e6f0ff

</style>
