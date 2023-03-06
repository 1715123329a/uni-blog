<template>
	<view class="container">
		<navbar title="首页"></navbar>
		<uni-fab ref="fab" :pattern="pattern" :content="content" horizontal="right" vertical="bottom"
			@trigger="trigger" />
		<articleCard :list="articleList"></articleCard>
	</view>
</template>

<script setup>
import { onLoad, onPullDownRefresh, onReachBottom } from "@dcloudio/uni-app";
import { ref, reactive, onMounted } from 'vue'
import { useUsersStore } from '@/stores/user'
import navbar from '@/components/navbar.vue';
import articleCard from '@/components/articleCard.vue';
import { formatTime } from '@/utils/index';
import { getArticle, getArticleCount } from '@/api/article';

const store = useUsersStore()
const articleList = ref([])
const articleCount = ref()
const isloading = ref(false)
// 悬浮按钮属性配置
const pattern = {
	color: '#7A7E83',
	backgroundColor: '#fff',
	selectedColor: '#007AFF',
	buttonColor: '#4c6a88',
	iconColor: '#fff'
}
const content = [{
	iconPath: '/static/images/inv.png',
	text: '发帖',
	active: false
}]

const page = ref(1)
const pageSize = ref(10)

onLoad(() => {
	wx.showShareMenu({
		withShareTicket: true,
		//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
		menus: ["shareAppMessage", "shareTimeline"]
	})
	console.log('11111111111111111111');
	refresh()
})

// 下拉刷新
onPullDownRefresh(() => {
	refresh()
	uni.stopPullDownRefresh();
})

// 上拉加载
onReachBottom(() => {
	if (isloading.value) return
	isloading.value = true
	if (page.value * pageSize.value >= articleCount.value) {
		return uni.showToast({
			title: '没有更多了',
			icon: 'error',
			duration: 2000
		});
	}
	// 让页码自增+1
	page.value++
	_getArticle()
	isloading.value = false
})

// 刷新数据
const refresh = () => {
	isloading.value = false
	articleList.value = []
	page.value = 1
	_getArticle()
}

// 获取列表
const _getArticle = async () => {
	let params = {
		page: page.value,
		pageSize: pageSize.value
	}
	const { data } = await getArticle(params)
	const countData = await getArticleCount()
	articleCount.value = countData.data
	articleList.value = [...articleList.value, ...data]
	console.log(articleList.value);
}

// 悬浮按钮点击事件
const trigger = (e) => {
	if (e.index === 0) {
		uni.navigateTo({
			url: '/pages/article/article'
		});
	}
}
</script>

<style lang="scss" scoped>
.container {
	&:deep(.uni-fab__content--other-platform) {
		box-shadow: none;
	}
}
</style>
