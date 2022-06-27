<template>
  <div class="bg" :style="bgStyle">
    <div class="myBox">
      <h1>高校成绩管理系统</h1>
      <a-form
        :model="formState"
        name="normal_login"
        class="login-form"
        @finish="onFinish"
      >
        <a-form-item
          label="管理员账号"
          name="username"
          :rules="[{ required: true, message: '请输入账号!' }]"
        >
          <a-input v-model:value="formState.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="管理员密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password v-model:value="formState.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="disabled"
            type="primary"
            html-type="submit"
            class="login-form-button"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { HttpRequest } from '@/utils/httpRequest'
import backgroundImg from '@/assets/bg.jpg'
import router from '@/router'
const http = new HttpRequest()

const bgStyle = {
  background: 'url(' + backgroundImg + ')',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  width: '100%',
  height: '100%',
  position: 'fixed'
}

const formState = reactive({
  username: '',
  password: ''
})
const onFinish = (values) => {
  http
    .post('/login', values)
    .then((data) => {
      if (data.code === 10000) {
        message.success('登录成功')
        router.push('/layout')
      } else if (data.code === 10010) {
        message.error('用户名不存在')
      } else if (data.code === 10020) {
        message.error('密码错误')
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const disabled = computed(() => {
  return !(formState.username && formState.password)
})
</script>

<style scoped>
* {
  user-select: none;
  /* 用户不能选中文本，整体性更强 */
}

.myBox {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  width: 600px;
  height: 360px;
  background-color: #ffffff25;
  border-radius: 30px;
  /* 为背景添加高斯模糊滤镜 */
  backdrop-filter: blur(3px);
  /* 设置阴影效果 */
  box-shadow: 2px 2px 2px #00000051;
}

.login-form {
  max-width: 300px;
  margin: 0 auto;
  margin-top: 40px;
}

.myBox h1 {
  color: #42526c;
  padding-top: 50px;
}

.login-form-button {
  width: 100%;
}
</style>
