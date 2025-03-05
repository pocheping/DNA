<template>
	<div class="pdf-viewer-wrap">
		<ClientOnly>
			<div id="pdfjs-container" class="page-container">
				<div id="pdfViewer" class="pdfViewer"></div>
			</div>
		</ClientOnly>
	</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

definePageMeta({
  layout: 'empty'
})

let pdfjsLib, pdfjsViewer, pdfjsSandbox
let currentPdfViewer = null

// 计算缩放比例
const calculateScale = (containerWidth, pageWidth) => {
  const minWidth = 800 // PDF 的最小宽度
  if (containerWidth < minWidth) {
    return containerWidth / minWidth
  }
  return 1
}

// 更新缩放
const updateScale = () => {
  if (!currentPdfViewer) return
  
  const container = document.getElementById('pdfjs-container')
  if (!container) return

  const containerWidth = container.clientWidth
  const currentPage = currentPdfViewer.getPageView(0)
  if (!currentPage) return

  const scale = calculateScale(containerWidth, currentPage.width)
  currentPdfViewer.currentScale = scale
}

// 在客户端初始化 PDF 查看器
const initPdfViewer = async () => {
	if (process.client) {
		// 动态导入所需模块
		await import('pdfjs-dist/legacy/web/pdf_viewer.css')
		pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.js')
		pdfjsViewer = await import('pdfjs-dist/legacy/web/pdf_viewer')
		await import('pdfjs-dist/legacy/build/pdf.worker.entry')
		pdfjsSandbox = await import('pdfjs-dist/legacy/build/pdf.sandbox.js')

		const SANDBOX_BUNDLE_SRC = pdfjsSandbox

		pdfjsLib.GlobalWorkerOptions.workerSrc = window.pdfjsWorker

		const CMAP_URL = '/pdfjs-dist/cmaps/'
		const CMAP_PACKED = true
		const STANDARD_FONT_DATA_URL = '/pdfjs-dist/standard_fonts/'

		window.pdfjsLib = pdfjsLib
		window.pdfjsViewer = pdfjsViewer

		const pdfEventBus = new pdfjsViewer.EventBus()

		const pdfScriptingManager = new pdfjsViewer.PDFScriptingManager({
			eventBus: pdfEventBus,
			sandboxBundleSrc: SANDBOX_BUNDLE_SRC,
		})

		const pdfLinkService = new pdfjsViewer.PDFLinkService({
			eventBus: pdfEventBus,
		})

		const container = document.getElementById('pdfjs-container')
		if (!container) return

		try {
			const pdfDocument = await pdfjsLib.getDocument({
				url: '/assets/text.pdf',
				cMapUrl: CMAP_URL,
				cMapPacked: CMAP_PACKED,
				standardFontDataUrl: STANDARD_FONT_DATA_URL,
			}).promise

			const pdfViewer = new pdfjsViewer.PDFViewer({
				container,
				eventBus: pdfEventBus,
				annotationMode: 0,
				annotationEditorMode: 0,
				scriptingManager: pdfScriptingManager,
				linkService: pdfLinkService,
			})

			currentPdfViewer = pdfViewer // 保存引用以供后续使用

			pdfScriptingManager.setDocument(pdfDocument)
			pdfScriptingManager.setViewer(pdfViewer)
			pdfLinkService.setDocument(pdfDocument)
			pdfLinkService.setViewer(pdfViewer)

			pdfViewer.setDocument(pdfDocument)

			pdfEventBus.on('pagesinit', () => {
				if (pdfViewer) {
					console.log('PDF initialized')
					updateScale() // 初始化时设置缩放
					
					// 监听窗口大小变化
					window.addEventListener('resize', updateScale)
				}
			})
		} catch (error) {
			console.error('Error loading PDF:', error)
		}
	}
}

onMounted(() => {
	initPdfViewer()
	
	// 组件卸载时移除事件监听
	return () => {
		window.removeEventListener('resize', updateScale)
	}
})
</script>

<style scoped>
.pdf-viewer-wrap {
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: hidden;
}

#pdfjs-container {
	position: absolute;
	width: 100%;
	height: 100%;
	overflow: auto;
	-webkit-overflow-scrolling: touch;
}

/* 隐藏滚动条但保持功能 */
#pdfjs-container::-webkit-scrollbar {
	width: 0;
	height: 0;
}

/* 确保 PDF 内容居中显示 */
:deep(.pdfViewer) {
	display: flex;
	flex-direction: column;
	align-items: center;
}

:deep(.page) {
	margin: 8px auto !important;
}
</style>
