<template>
  <a-layout-content class="layoutContent">
    <div :style="{ padding: '24px', minHeight: '640px' }">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </a-layout-content>
</template>

<script setup></script>

<style scoped>
.layoutContent {
  margin-top: 16px;
  margin-bottom: 0;
  margin-left: 16px;
  margin-right: 16px;
  background-color: #fff;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.4s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
