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
                    注册时间：{{ userInfo?.create_time }}
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, onMounted } from 'vue'
import navbar from '@/components/navbar.vue';
import { getUserDetail } from '@/api/user'
import { formatDate } from '@/utils/index';

const userInfo = ref()
onMounted(() => {
})
const getDetail = async (id) => {
    const { data } = await getUserDetail(id)
    data.create_time = formatDate(data.create_time)
    userInfo.value = data
}
onLoad((options) => {
    getDetail(options.id)
})
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
