<template>
  <div>启动页面</div>
  <button @click="getUser">获取所有用户信息</button>
  <button @click="handleLogin">登录</button>
</template>

<script setup>
const getUser = async () => {
  const response = await fetch('http://localhost:3000', {
    method: 'GET'
  })
  const data = await response.json()

  console.log(data)
}

const handleLogin = async () => {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'user3',
      password: '*ZJUT&123'
    })
  })

  const data = await response.json()

  console.log(data)
}
</script>

<style scoped></style>
