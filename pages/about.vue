<template>
  <div class="about">
    <section>
      <div class="aboutus">{{ $t('about.title') }}</div>
      <div class="line"></div>
      <div class="describe">{{ $t('about.description') }}</div>
    </section>

    <div class="content-wrapper">
      <div class="menu">
        <div 
          v-for="(item, index) in menuItems" 
          :key="index"
          :class="['menu-item', { active: currentIndex === index }]"
          @click="currentIndex = index"
        >
          {{ $t(`about.${item.key}.title`) }}
        </div>
      </div>
      <div class="content">
        <div class="text-content">{{ $t(`about.${menuItems[currentIndex].key}.content`) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentIndex = ref(0)
const menuItems = ref([
  { key: 'mission' },
  { key: 'goal' },
  { key: 'intro' }
])
</script>

<style scoped>
.about section {
  padding: 1.55rem 3.42rem;
  background: url('/assets/about-bg.png') center center no-repeat;
  background-size: cover;
}

.aboutus {
  font-size: 0.6rem;
  color: #22334D;
  font-weight: 500;
  font-family: 'PingFangSC-Medium';
}

.line {
  height: 1px;
  width: 2.3rem;
  background: rgba(10,34,89,1);
  margin: 0.15rem 0 0.3rem;
}

.describe {
  font-size: 0.24rem;
  color: #0A2259;
  font-weight: 400;
}

.content-wrapper {
  padding: 0.45rem 3.42rem;
  display: flex;
  gap: 1rem;
  background: #fff;
}

.menu {
  width: 2.4rem;
  flex-shrink: 0;
}

.menu-item {
  padding: 0.27rem 0.72rem;
  margin-bottom: 0.2rem;
  cursor: pointer;
  font-size: 0.24rem;
  color: #0A2259;
  transition: all 0.3s ease;
  border-radius: 4px;
  background: #F8FBFE;
}

.menu-item.active {
  background: #DEEBFF;
}

.content {
  flex: 1;
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.text-content {
  flex: 1;
  font-size: 0.24rem;
  line-height: 1.8;
  color: #0A2259;
  white-space: pre-line;
}

.image-content {
  flex: 1;
  border-radius: 0.2rem;
  overflow: hidden;
}

.image-content img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.image-content img:hover {
  transform: scale(1.05);
}

@media screen and (max-width: 750px) {
  .about section {
    padding: 1rem;
  }

  .content-wrapper {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .menu {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;
  }

  .menu-item {
    flex: 1;
    text-align: center;
    margin-bottom: 0;
  }

  .content {
    flex-direction: column;
    gap: 1rem;
  }

  .text-content {
    order: 2;
  }

  .image-content {
    order: 1;
  }
}
</style>
