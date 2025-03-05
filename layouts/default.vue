<template>
  <div>
    <header class="header">
      <div style="display: flex;">
        <div class="logo"><img src="/assets/logo.png"></div>
        <el-tabs v-model="activeKey" @tab-click="routeTo" class="demo-tabs">
          <el-tab-pane :label="$t('nav.home')" name="1"></el-tab-pane>
          <el-tab-pane :label="$t('nav.about')" name="2"></el-tab-pane>
        </el-tabs>
      </div>

      <el-dropdown @command="handleLanguageChange">
        <span class="el-dropdown-link">
          <span class="language">{{ currentLanguage === 'en' ? 'English' : '中文' }}</span>
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="en" v-if="currentLanguage === 'zh'">
              <div style="padding:10px;cursor: pointer;">English</div>
            </el-dropdown-item>
            <el-dropdown-item command="zh" v-else>
              <div style="padding:10px;cursor: pointer;">中文</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </header>

    <!-- 页面内容插槽 -->
    <slot />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { ElTabs, ElTabPane, ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const { locale, setLocale } = useI18n()

// 根据当前路由设置初始值
const activeKey = ref(route.path.includes('about') ? '2' : '1')
const currentLanguage = computed(() => locale.value)

// 只保留语言变化的监听，移除初始化代码
watch(
  () => locale.value,
  (newLocale) => {
    localStorage.setItem('userLocale', newLocale)
  }
)

// 监听路由变化
watch(
  () => route.path,
  (path) => {
    activeKey.value = path.includes('about') ? '2' : '1'
  }
)

const routeTo = (v) => {
  if (activeKey.value === '1') {
    router.push('/')
  } else {
    router.push('/about')
  }
}

const handleLanguageChange = async (lang) => {
  console.log(lang)
  await setLocale(lang)
}
</script>

<style>
/* Element Plus 相关样式 */
.demo-tabs {
  margin: 20px 0;
}
.el-tabs,.el-tabs__header {
  margin: 0;
}
.el-tabs__nav-wrap:after {
  display: none;
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
  font-family: 'PingFangSC-Medium';
}
.el-tabs__active-bar {
  background-color:#495AF5;
}
.el-tabs__item {
  font-size: 0.18rem;
  font-weight: 400;
}
</style>

<style scoped>
.header {
  text-align: center;
  padding: 0.2rem 0.6rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
}

.logo {
  font-size: 0.4rem;
  text-align: left;
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.logo img {
  width: 1.1rem;
  height: 0.6rem;
  margin-right:20px;
}

.language {
  display: inline-block;
  background: #22334D;
  color:#fff;
  padding:5px;
  border-radius: 5px;
}

.el-icon--right {
  margin-left: 5px;
}

@media (max-width: 480px) {
  .logo {
    margin-right: 0.2rem;
  }
}
</style> 
