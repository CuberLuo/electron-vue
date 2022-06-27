<template>
  <a-layout style="min-height: 100vh">
    <Sider />
    <a-layout>
      <Content />
      <a-layout-footer style="text-align: center">
        罗俊涛 ©2022 数据库课程设计
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import Sider from './components/Sider'
import Content from './components/Content'
</script>

<style scoped></style>
