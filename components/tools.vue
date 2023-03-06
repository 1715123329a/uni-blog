<template>
    <view class="container">
        <view class="tool">
            <view class="tool-title">
                <uni-icons type="bars" size="24"></uni-icons>
                <text>小工具</text>
            </view>
            <uni-row>
                <uni-col :span="4" v-for="(item, i) in tools" :key="i">
                    <view class="item" @click="toPage(item.path)">
                        <view class="item-top">
                            <image class="item-top-img"
                                src="https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132">
                            </image>
                        </view>
                        <view class="item-bottom">
                            {{ item.title }}
                        </view>
                    </view>
                </uni-col>
            </uni-row>
        </view>
    </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
const tools = ref([
    {
        path: '/pages/barrage/barrage',
        title: '手持弹幕'
    },
    {
        path: '/pages/barrage/barrage',
        title: '111'
    },
    {
        path: '/pages/barrage/barrage',
        title: '222'
    }
])
const toPage = (path) => {
    uni.navigateTo({ url: path })
}
</script>

<style lang="scss" scoped>
.tool {
    height: 80rpx;
    padding: 10rpx;

    .tool-title {
        display: flex;
        align-items: center;
        padding: 20rpx;
    }

    .item {
        text-align: center;
        margin-bottom: 20rpx;

        .item-bottom {
            font-size: 24rpx;
        }

        .item-top-img {
            width: 80rpx;
            height: 80rpx;
        }
    }
}
</style>