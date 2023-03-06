<template>
    <view class="container">
        <navbar :goback="true"></navbar>
        <view class="header">
            <view class="share">
                <uni-icons type="redo-filled" size="30" color="#ffffff"></uni-icons>
            </view>
            <view class="info flex-c">
                <image class="avatar" v-if="userInfo" :src="userInfo.avatar_url">
                </image>
                <image class="avatar" v-else
                    src="https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132">
                </image>
                <view class="name" v-if="userInfo">
                    {{ userInfo.nick_name }}
                </view>
                <view class="name" v-else>
                    ......
                </view>
                <view class="time">
                    注册时间：{{ formatDate(userInfo?.create_time) }}
                </view>
            </view>
        </view>
        <articleCard :list="articleList"></articleCard>

    </view>
</template>

<script setup>
import { onLoad, onShow, onReachBottom } from "@dcloudio/uni-app";
import { ref, onMounted } from 'vue'
import navbar from '@/components/navbar.vue';
import { getMyArticle, getMyArticleCount } from '@/api/user'
import { formatTime, formatDate } from '@/utils/index';
import articleCard from '@/components/articleCard.vue';


const userInfo = ref()
const articleList = ref([])
const articleCount = ref()
const isloading = ref(false)
const page = ref(1)
const pageSize = ref(10)


onShow(() => {
    articleList.value = []
    page.value = 1
    getDetail()
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
    getDetail()
    isloading.value = false
})

const getDetail = async () => {
    try {
        const params = {
            page: page.value,
            pageSize: pageSize.value
        }
        const value = uni.getStorageSync('userInfo');
        if (value) {
            userInfo.value = value
        }
        const list = await getMyArticle(params)
        const count = await getMyArticleCount()
        articleList.value = articleList.value.concat(list.data)
        articleCount.value = count.data
    } catch (e) {
        console.log(e);
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 750rpx;
}

.header {
    width: 750rpx;
    padding: 20rpx 0;
    border-bottom: 1px solid #ccc;
    color: $text-color-inverse;
    background-color: $theme-color;
    position: relative;

    .share {
        position: absolute;
        top: 10rpx;
        right: 20rpx;
    }

    .info {
        width: 300rpx;
        margin: 0 auto;
        padding: 20rpx;
        flex-direction: column;


        .avatar {
            width: 150rpx;
            height: 150rpx;
            border-radius: 50%;
            margin-bottom: 20rpx;
        }

        .name {
            font-size: 16px;
        }

        .time {
            font-size: 24rpx;
            margin-top: 10rpx;
            color: #999;
        }
    }

    .item {
        width: 100%;
        text-align: center;
        margin-top: 20rpx;

        .item-top {
            margin-bottom: 10rpx;
        }

        .item-bottom {
            font-size: 32rpx;
        }
    }
}
</style>
