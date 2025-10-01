<template>
  <view class="container">
	<view class="header">
		<swiper class="swiper" indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image src="https://tse2.mm.bing.net/th/id/OIP.E3VzVhMnrU6E_3ZuT2RaPQHaFV?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="https://tse2.mm.bing.net/th/id/OIP.0m5rrYIMKJH4jvsRtSW4jAHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="https://tse2.mm.bing.net/th/id/OIP.ja-SY-bWu3eTaoCHmQJcFwHaCe?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" mode=""></image>
				</view>
			</swiper-item>
		</swiper>	
	</view>
    <view class="form">
      <input v-model="username" placeholder="请输入账号" class="input" />
      <input v-model="password" type="password" placeholder="请输入密码" class="input" />
      <button @click="login" class="btn">登录</button>
      <text @click="goToRegister" class="register-link">没有账号？去注册</text>
    </view>
	<Footer />
  </view>  
</template>


<script>
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Footer
  },
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        uni.showToast({ title: '请填写账号和密码', icon: 'none' });
        return;
      }
    
      uniCloud.callFunction({
        name: 'login',
        data: {
          username: this.username,
          password: this.password
        },
        success: (res) => {
          const result = res.result;
          if (result.success) {
            uni.setStorageSync('userInfo', result.userInfo);
            uni.showToast({ title: result.message, icon: 'success' });
    
            if (result.userInfo.role === 'admin') {
              uni.navigateTo({ url: '/pages/admin/admin' });
            } 
			if (result.userInfo.role === 'teacher') {
              uni.navigateTo({ url: '/pages/teacher/teacher' });
            } 
			if (result.userInfo.role === 'student') {
              uni.navigateTo({ url: '/pages/student/student' });
            }
          } else {
            uni.showToast({ title: result.message, icon: 'none' });
          }
        },
        fail: (err) => {
          console.error('云函数调用失败', err);
          uni.showToast({ title: '网络异常', icon: 'none' });
        }
      });
    },
	goToRegister(){
		uni.navigateTo({
			url:'/pages/register/register'
		});
	}

  }
};
</script>

<style lang="stylus">
.container
  display flex
  flex-direction column
  align-items center
  background #f0f0f0

.header
  width 100%
  height 200px
  margin-bottom 20px

.swiper
  width 100%
  height 100%

.swiper-item
  width 100%
  height 100%

.swiper-item image
  width 100%
  height 100%
  border-radius 8px

.form
  width 80%
  padding 20px
  background white
  border-radius 10px
  box-shadow 0 2px 10px rgba(0, 0, 0, 0.1)

.input
  width 100%
  padding 10px
  margin 10px 0
  border 1px solid #ccc
  border-radius 5px

.btn
  width 100%
  padding 10px
  background-color #007AFF
  color white
  border none
  border-radius 5px
  margin-top 8px

.register-link
  display block
  margin-top 15px
  color #007AFF
  text-align center
</style>
