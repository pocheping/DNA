<template>
  <div v-if="isLanguageLoaded">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <div v-else class="loading-overlay">
    <div class="loading-spinner"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLanguageLoaded = ref(false)
const { setLocale } = useI18n()

onMounted(async () => {
  // 从 localStorage 获取保存的语言设置
  const savedLocale = localStorage.getItem('userLocale')
  if (savedLocale) {
    await setLocale(savedLocale)
  }
  isLanguageLoaded.value = true
})
</script>

<style>
body {
  margin:0;
}
/* 添加根元素字体大小设置 */
:root {
  font-size: calc(100vw * 100 / 1920);
}

@media screen and (min-width: 1920px) {
  :root {
    font-size: 100px;
  }
}

@media screen and (max-width: 750px) {
  :root {
    font-size: 50px;
  }
}

/* 添加 Element Plus 相关样式 */
.demo-tabs {
  margin: 20px 0;
}
.el-tabs,.el-tabs__header {
  margin: 0;
}
.el-tabs__nav-wrap:after {
  display: none;
}
.el-dropdown {
  float:right;
}
.el-dropdown-link {
  cursor: pointer;
  color: #3D3D3D;
  display: flex;
  align-items: center;
}
.el-tabs__item.is-active, .el-tabs__item:hover {
  color: #0A2259;
  font-weight: 500;
}
.el-tabs__active-bar {
  background-color:#495AF5;
}
.el-tabs__item {
  font-size: 0.18rem;
  font-weight: 400;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
