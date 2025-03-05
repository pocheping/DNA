<template>
  <div class="container">
    <section class="top">
      <h1 class="title">{{ $t('home.title') }}</h1>
      <p class="subtitle">{{ $t('home.subtitle') }}</p>
    </section>

    <!-- 轮播图部分 -->
    <div class="carousel-section">
      <div class="carousel">
        <div class="carousel-btn prev" @click="prevSlide">
          <img src="/assets/l1.png" >
        </div>
        <div class="carousel-container"
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd"
        >
          <div 
            class="carousel-wrapper"
            :style="{ 
              transform: `translateX(${currentTranslate}%)`,
              transition: isDragging ? 'none' : 'transform 0.5s ease-in-out'
            }"
          >
            <div 
              v-for="(slide, index) in displaySlides" 
              :key="index"
              class="carousel-item"
            >
              <div class="img-box"><img :src="slide.image"></div>        
              <div class="slide-content">
                <button class="download-btn" @click="downloadCurrentImage(slide.image)">{{ $t('home.download') }}</button>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-btn next" @click="nextSlide">
          <img src="/assets/r1.png" >
        </div>
      </div>
      <div class="carousel-dots">
        <span 
          v-for="(_, index) in slides" 
          :key="index"
          class="dot"
          :class="{ active: normalizedCurrentSlide === index }"
          @click="setSlide(index)"
        ></span>
      </div>
    </div>

    <!-- 视频教程部分 -->
    <div class="video-section" id="video">
      <h2 class="section-title">{{ $t('home.video.title') }}</h2>
      <div class="video-grid">
        <div 
          v-for="(thumb, index) in videoThumbs" 
          :key="index" 
          class="video-item"
        >
          <video :src="thumb" controls/>
        </div>
      </div>
    </div>

    <!-- 合作伙伴部分 -->
    <div class="partner-section">
      <h2 class="section-title">{{ $t('home.partner.title') }}</h2>
      <div class="partner-card">
        <div class="partner-content">
          <div>
            <h3>{{ $t('home.partner.heading1') }}</h3>
            <h3>{{ $t('home.partner.heading2') }}</h3>
            <p>{{ $t('home.partner.description') }}</p>
          </div>
          <div>
            <button class="register-btn" @click="openRegisterModal">{{ $t('home.partner.button') }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加注册弹窗 -->
    <div 
      class="modal-overlay" 
      v-if="showRegisterModal"
      @click="closeModal"
    >
      <div 
        class="modal-content"
        @click.stop
      >
        <button class="modal-close" @click="closeModal">&times;</button>
        <iframe 
          :src="registerUrl"
          frameborder="0"
          class="register-iframe"
        ></iframe>
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  margin: 0 auto;
  background: url('/assets/head-bg.png') center top no-repeat;
  background-size: contain;
}

.top {
  text-align: center;
  padding: 40px 60px 20px;
}

.title {
  font-size: 0.6rem;
  color: #333;
  margin-bottom: 10px;
  font-family: 'PingFangSC-Medium';
}

.subtitle {
  color: #22334D;
  font-size:0.32rem;
  font-weight: 400;
}

.carousel-section {
  margin: 0 0.6rem;
  padding: 1rem 1.5rem;
  background: #FFFFFF;
  box-shadow: 0px -2px 10px 5px rgba(0,98,245,0.1);
  border-radius: 0.2rem;
}

.carousel {
  position: relative;
  margin-bottom: 0.2rem;
  height: 500px;
}

.carousel-container {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  touch-action: pan-y pinch-zoom;
}

.carousel-wrapper {
  position: absolute;
  display: flex;
  height: 100%;
  width: 300%;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  flex: 0 0 11.111%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
}

.carousel-item .img-box {
  position: relative;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
}

.carousel-item .img-box::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #999;
  border-radius: 5px;
  pointer-events: none;
  z-index: 1;
}

.carousel-item img {
  width: 100%;
  height: auto;
  min-height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}

.slide-content {
  position: absolute;
  bottom: 0;
  left: 10px;
  right: 10px;
  padding: 20px;
  /* background: rgba(0, 0, 0, 0.5); */
  color: white;
  text-align: center;
}

.slide-content h3 {
  font-size: 24px;
  margin-bottom: 10px;
}

.slide-content p {
  font-size: 16px;
  margin-bottom: 20px;
}

.download-btn {
  position: relative;
  bottom: auto;
  left: auto;
  transform: none;
  margin-top: 10px;
  display: inline-block;
  background: #4169E1;
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.2rem;
}

.carousel-dots {
  text-align: center;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background: #ccc;
  border-radius: 50%;
  cursor: pointer;
}

.dot.active {
  background: #4169E1;
}

.video-section {
  margin-bottom: 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  margin-bottom: 0.65rem;
  margin-top: 1.4rem;
  font-size: 0.6rem;
  color: #22334D;
  font-weight: 400;
  font-family: 'PingFangSC-Medium';
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.video-item {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  height: 308px;
}

.video-item:hover::before,
.video-item:hover::after {
  opacity: 1;
}

.video-item video {
  height: 100%;
  width: 100%;
  transition: transform 0.3s ease;
}

.video-item:hover video {
  transform: scale(1.05);
}

.partner-section {
  margin-bottom: 60px;
}

.partner-card {
  background: url('/assets/bottom-bg.png') center center no-repeat;
  background-size: cover;
  text-align: center;
  padding: 1.4rem 0;
}

.partner-content {
  background: rgba(255,255,255,0.50);
  border-radius: 0.08rem;
  max-width: 11.2rem;
  padding: 0.4rem;
  margin: 0 auto;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.partner-content h3 {
  font-size: 1rem;
  margin: 0;
  color: #333;
}

.partner-content p {
  color: #22334D;
  font-weight: 400;
  margin-bottom: 0.2rem;
  font-size: 0.4rem;
}

.register-btn {
  background: #4169E1;
  color: white;
  border: none;
  padding: 0.1rem 0.6rem;
  border-radius: 0.08rem;
  font-size: 0.4rem;
  cursor: pointer;
  margin-right: 1rem;
}

.register-btn:hover {
  background: #3157d5;
}

/* 添加一些动画效果 */
.download-btn,
.register-btn {
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.download-btn:hover,
.register-btn:hover {
  transform: scale(1.05);
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  color: white;
  border: none;
  padding: 15px;
  cursor: pointer;
  border-radius: 4px;
}
.carousel-btn img {
  width:0.5rem;
  height:0.5rem;
}

.carousel-btn.prev {
  left: -1rem;
}

.carousel-btn.next {
  right: -1rem;
}

/* 添加响应式设计 */
@media (max-width: 768px) {
  .carousel-container {
    height: 100%;
  }

  .slide-content {
    padding: 0.2rem;
  }

  .video-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .carousel-container {
    height: 100%;
  }

  .slide-content {
    padding: 0.15rem;
  }
}

/* 添加位置类 */
.carousel-item.pos-0,
.carousel-item.pos-1,
.carousel-item.pos-2 {
  display: none;
}

/* 添加弹窗相关样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  width: 80%;
  max-width: 800px;
  height: 80vh;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

.modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: white;
  color: #333;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.register-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* 添加移动端适配 */
@media screen and (max-width: 750px) {
  .partner-section {
    padding: 0 0.3rem;
  }

  .partner-card {
    padding: 0.7rem 0;
  }

  .partner-content {
    flex-direction: column;
    text-align: center;
    padding: 0.3rem;
  }

  .partner-content > div:first-child {
    margin-bottom: 0.4rem;
  }

  .partner-content h3 {
    font-size: 0.6rem;
    white-space: nowrap;
  }

  .partner-content p {
    font-size: 0.24rem;
    margin-top: 0.2rem;
    margin-bottom: 0;
  }

  .register-btn {
    font-size: 0.24rem;
    padding: 0.15rem 0.4rem;
    margin-right: 0;
  }
}

/* 添加平板适配 */
@media screen and (min-width: 751px) and (max-width: 1200px) {
  .partner-section {
    padding: 0 0.4rem;
  }

  .partner-card {
    padding: 1rem 0;
  }

  .partner-content {
    padding: 0.3rem;
  }

  .partner-content h3 {
    font-size: 0.8rem;
    font-family: 'PingFangSC-Medium';
  }

  .partner-content p {
    font-size: 0.3rem;
  }

  .register-btn {
    font-size: 0.3rem;
    padding: 0.12rem 0.5rem;
    margin-right: 0.5rem;
  }
}

/* 添加移动端适配 */
@media screen and (max-width: 750px) {
  .carousel-wrapper {
    width: 100%;
  }

  .carousel-item {
    flex: 0 0 100%;
    padding: 0;
  }

  .carousel {
    height: 8rem;
    margin-bottom: 0.3rem;
  }

  .carousel-section {
    margin: 0 0.3rem;
    padding: 0.5rem;
    border-radius: 0.1rem;
  }

  .carousel-btn.prev {
    left: 0.2rem;
  }

  .carousel-btn.next {
    right: 0.2rem;
  }
}

/* 添加平板适配 */
@media screen and (min-width: 751px) and (max-width: 1200px) {
  .carousel-section {
    margin: 0 0.4rem;
    padding: 0.8rem 1rem;
  }

  .carousel {
    height: 400px;
  }

  .carousel-item {
    padding: 0 0.2rem;
  }

  .carousel-btn {
    padding: 0.15rem;
    font-size: 0.3rem;
  }

  .carousel-btn.prev {
    left: -0.5rem;
  }

  .carousel-btn.next {
    right: -0.5rem;
  }

  .download-btn {
    padding: 0.12rem 0.4rem;
    font-size: 0.28rem;
  }
}

/* 添加触摸相关样式 */
.carousel-container {
  touch-action: pan-y pinch-zoom;
}

@media screen and (max-width: 750px) {
  .carousel-container {
    touch-action: none; /* 在移动端禁用默认触摸行为 */
  }
}

.el-icon--right {
  margin-left: 5px;
}
</style>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ElTabs, ElTabPane, ElDropdown, ElDropdownMenu, ElIcon } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'  // 导入具体的图标

// 数据定义
const currentSlide = ref(0)
const activeKey = ref('1')
const slides = ref([
  { image: '/assets/plan1.png' },
  { image: '/assets/plan2.png' },
  { image: '/assets/plan3.png' },
  { image: '/assets/plan4.jpg' },
  { image: '/assets/plan5.jpg' }
])
const autoPlayInterval = ref(null)
const videoThumbs = ref([
  '/assets/1.mp4',
  '/assets/2.mp4',
])
const showRegisterModal = ref(false)
const registerUrl = ref('https://forms.office.com/r/bMSY4pr2B1')
const touchStartX = ref(0)
const touchEndX = ref(0)
const isDragging = ref(false)
const currentTranslate = ref(0)
const startTranslate = ref(0)

// 计算属性
const displaySlides = computed(() => {
  return [...slides.value, ...slides.value.slice(0, 3)]
})

const slideWidth = computed(() => {
  return window.innerWidth <= 750 ? 100 : 11.111
})

const normalizedCurrentSlide = computed(() => {
  return currentSlide.value >= slides.value.length 
    ? currentSlide.value - slides.value.length 
    : currentSlide.value
})

// 方法定义
const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    const wrapper = document.querySelector('.carousel-wrapper')
    wrapper.style.transition = 'none'
    currentSlide.value = slides.value.length
    wrapper.offsetHeight
    wrapper.style.transition = 'transform 0.5s ease-in-out'
    currentSlide.value--
  }
  currentTranslate.value = -currentSlide.value * slideWidth.value
}

const nextSlide = () => {
  if (currentSlide.value < slides.value.length) {
    currentSlide.value++
  } else {
    const wrapper = document.querySelector('.carousel-wrapper')
    wrapper.style.transition = 'none'
    currentSlide.value = 0
    wrapper.offsetHeight
    wrapper.style.transition = 'transform 0.5s ease-in-out'
  }
  currentTranslate.value = -currentSlide.value * slideWidth.value
}

const setSlide = (index) => {
  stopAutoPlay()
  currentSlide.value = index
  currentTranslate.value = -currentSlide.value * slideWidth.value
  startAutoPlay()
}

const startAutoPlay = () => {
  autoPlayInterval.value = setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
  }
}

const downloadCurrentImage = async (currentImage) => {
  try {
    // const normalizedIndex = currentSlide.value >= slides.value.length 
    //   ? currentSlide.value - slides.value.length 
    //   : currentSlide.value
    // const currentImage = slides.value[normalizedIndex].image
    const link = document.createElement('a')
    link.href = currentImage
    const filename = currentImage.split('/').pop()
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('下载失败:', error)
  }
}

const openRegisterModal = () => {
  showRegisterModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  showRegisterModal.value = false
  document.body.style.overflow = 'auto'
}

const touchStart = (event) => {
  isDragging.value = true
  touchStartX.value = event.touches[0].clientX
  startTranslate.value = -currentSlide.value * slideWidth.value
  currentTranslate.value = startTranslate.value
  stopAutoPlay()
}

const touchMove = (event) => {
  if (!isDragging.value) return

  const currentX = event.touches[0].clientX
  const diff = currentX - touchStartX.value
  const movePercent = window.innerWidth <= 750 
    ? (diff / window.innerWidth) * 100
    : (diff / (window.innerWidth / 3)) * 100

  currentTranslate.value = Math.max(
    -slides.value.length * slideWidth.value,
    Math.min(0, startTranslate.value + movePercent)
  )
}

const touchEnd = () => {
  isDragging.value = false
  const movePercent = currentTranslate.value - startTranslate.value
  
  if (Math.abs(movePercent) > 10) {
    if (movePercent > 0) {
      prevSlide()
    } else {
      nextSlide()
    }
  } else {
    currentTranslate.value = startTranslate.value
  }

  startAutoPlay()
}

// 生命周期钩子
onMounted(() => {
  startAutoPlay()
})

onBeforeUnmount(() => {
  stopAutoPlay()
})
</script>
