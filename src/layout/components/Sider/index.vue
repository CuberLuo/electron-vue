<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo" />
    <a-menu
      v-model:selectedKeys="selectedKeys"
      theme="dark"
      mode="inline"
      @click="selectItem"
    >
      <a-sub-menu key="sub1">
        <template #title>
          <span>
            <UserOutlined />
            <span>学生管理</span>
          </span>
        </template>
        <a-menu-item key="/students-manage">学生信息管理</a-menu-item>
        <a-menu-item key="/students-region">学生地区分布</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <span>
            <AppstoreOutlined />
            <span>教师管理</span>
          </span>
        </template>
        <a-menu-item key="/teachers-manage">教师信息管理</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { ref } from 'vue'
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons-vue'
import router from '@/router'
const collapsed = ref(false)
const selectedKeys = ref(['1'])

const selectItem = (item) => {
  router.push(item.key)
}
</script>

<style scoped></style>
