<template>
  <a-layout-sider v-model:collapsed="collapsed" collapsible>
    <div class="logo" />
    <a-menu
      v-model:selectedKeys="selectedKeys"
      v-model:openKeys="openKeys"
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
        <a-menu-item key="/students-manage">学生信息查询</a-menu-item>
        <a-menu-item key="/students-region">学生地区分布</a-menu-item>
        <a-menu-item key="/students-input-score">学生成绩录入</a-menu-item>
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
      <a-sub-menu key="sub3">
        <template #title>
          <span>
            <DeploymentUnitOutlined />
            <span>班级管理</span>
          </span>
        </template>
        <a-menu-item key="/class-manage">班级课程查询</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="/login">
        <template #icon>
          <ArrowRightOutlined />
        </template>
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { ref, createVNode } from 'vue'
import { message, Modal } from 'ant-design-vue'
import {
  UserOutlined,
  AppstoreOutlined,
  ArrowRightOutlined,
  ExclamationCircleOutlined,
  DeploymentUnitOutlined
} from '@ant-design/icons-vue'
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()
const { path } = route // 当前路由的路径path
const collapsed = ref(false)
const selectedKeys = ref([path]) // 默认选择的菜单项
const openKeys = ref(['sub1']) // 默认展开的子菜单

const selectItem = (item) => {
  if (item.key === '/login') {
    Modal.confirm({
      title: '您确认要登出系统吗?',
      icon: createVNode(ExclamationCircleOutlined),

      onOk() {
        router.push(item.key)
        message.success('登出成功')
      }
    })
  } else {
    router.push(item.key)
  }
}
</script>

<style scoped></style>
