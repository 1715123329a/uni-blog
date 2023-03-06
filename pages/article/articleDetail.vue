<template>
	<view class="container">
		<navbar title="详情" :goback="true"></navbar>
		<articleCard :list="article" :isComment="false" :isClick="false" :inherit="true"></articleCard>
		<view class="confirm flex-j-e" v-if="isDel">
			<button class="confirm-btn" type="warn" @click="del">删除</button>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog cancelText="关闭" confirmText="确定" title="提示" content="确定删除？" @confirm="delsubmit">
			</uni-popup-dialog>
		</uni-popup>
		<uni-section title="评论" titleFontSize="16" type="line">
			<view class="comment">
				<view class="comment-item flex" v-for="item in commentList" :key="item._id">
					<view class="comment-item-l">
						<image class="avatar" v-if="!item.user"
							src="https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132">
						</image>
						<image class="avatar" v-else :src="item?.user.avatar_url">
						</image>
					</view>
					<view class="comment-item-r">
						<view class="name">
							{{ item?.user.nick_name }}
						</view>
						<view class="createtime">
							{{ formatTime(item?.create_time) }}
						</view>
						<view class="content">
							{{ item?.content }}
						</view>
					</view>
				</view>
			</view>
		</uni-section>
		<view class="send flex-e">
			<view class="send-box flex-e">
				<view class="input" hover-class="none" hover-stop-propagation="false">
					<uni-easyinput trim="all" v-model="commentVal" placeholder="评论一下吧~">
					</uni-easyinput>
				</view>
				<!-- <button class="w-button" type="primary" @click="send">发送</button> -->
				<uni-icons type="paperplane-filled" size="28" color="#4c6a88" @click="send"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, onMounted, computed } from 'vue'
import navbar from '@/components/navbar.vue';
import { formatTime, getStorageUser } from '@/utils/index';
import articleCard from '@/components/articleCard.vue';
import { getArticleDetail, delArticle, sendComment, getComment } from '@/api/article';
import { getUser } from '@/utils/auth'

const article = ref([])
const commentList = ref([])
const id = ref()
const alertDialog = ref()
const commentVal = ref('')
onLoad((options) => {
	id.value = options.id
	getDetail(id.value)
})
onMounted(() => {
})
const isDel = computed(() => {
	const user = getStorageUser()
	return user._id === article.value[0]?.user?._id
})

// 获取详情
const getDetail = async (id) => {
	const { data } = await getArticleDetail(id)
	article.value = [data]
	_getComment()
}

const _getComment = async () => {
	const comment = await getComment(id.value)
	commentList.value = comment.data
}

const del = () => {
	alertDialog.value.open()
}

// 确定删除
const delsubmit = () => {
	delArticle(id.value).then(res => {
		uni.showToast({
			title: '删除成功',
			icon: 'none',
			duration: 2000
		});
		getUser()
		uni.navigateBack()
	})
}

// 发表评论
const send = async () => {
	if (commentVal.value === '') {
		return uni.showToast({
			title: '请输入内容',
			icon: 'none',
			duration: 2000
		});
	}
	const params = {
		article_id: id.value,
		content: commentVal.value
	}
	await sendComment(params)
	_getComment()
	return uni.showToast({
		title: '评论成功',
		icon: 'none',
		duration: 2000
	});
}
</script>

<style lang="scss" scoped>
.container {
	padding-bottom: 100rpx;

}

.confirm {
	width: 100%;

	.confirm-btn {
		width: 130rpx;
		margin: 0 20rpx;
	}

}

.send {
	width: 750rpx;
	position: fixed;
	bottom: 1px;
	background-color: #fff;

	.send-box {
		width: 100%;

		.w-button {
			width: 130rpx;
			font-size: 26rpx;
		}

		.input {
			width: 75%;
		}
	}
}

.comment {
	width: 750rpx;

	.comment-item {
		width: 100%;
		margin-bottom: 30rpx;
		border-bottom: 1px solid #f0f0f0;
		padding: 0 20rpx 10rpx;

		.comment-item-l {
			width: 80rpx;
			padding-top: 20rpx;

			.avatar {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
			}

		}

		.comment-item-r {
			width: 520rpx;

			.name {
				font-size: 14px;
				margin-bottom: 10rpx;
			}

			.createtime {
				font-size: 12px;
				color: $text-color-grey;
				margin-bottom: 20rpx;
			}

			.content {
				word-break: break-all;
				/* break-all(允许在单词内换行。) */
				display: -webkit-box;
			}
		}
	}
}
</style>
