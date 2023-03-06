<template>
    <view class="_navbar" :style="{ height: `${trStyle.height + trStyle.top + bottomEx}px` }">
        <view class="_navbar_container" :style="{ height: `${trStyle.height}px`, top: `${trStyle.top}px` }">
            <uni-icons type="home-filled" color="#ffffff" v-show="toHome" @click="goHome" size="26"></uni-icons>
            <uni-icons type="back" color="#ffffff" v-show="goback" @click="goBack" size="26"></uni-icons>
            <view :style="{ height: `${trStyle.height}px`, lineHeight: `${trStyle.height}px` }" class="title">
                {{ title }}</view>
        </view>
    </view>
    <view :style="{ padding: ` 0 0 ${trStyle.height + trStyle.top + bottomEx}px 0` }">

    </view>
</template>


<script setup>
const trStyle = uni.getMenuButtonBoundingClientRect()
const bottomEx = 10
defineProps({
    toHome: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        default: ''
    },
    goback: {
        type: Boolean,
        default: false,
    }
})
const goHome = () => {
    uni.switchTab({
        url: '/pages/index/index'
    });
}
const goBack = () => {
    uni.navigateBack()
}
</script>

<style lang="scss" scoped>
._navbar {
    width: 750rpx;
    position: fixed;
    z-index: 10000;
    transition: all 0.2s linear;
    background: $theme-color;

    ._navbar_container {
        width: 750rpx;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;

        .img {
            width: 50rpx;
            height: 50rpx;
            margin-left: 20rpx;
        }

        .title {
            height: 100%;
            font-size: 30rpx;
            color: #fff;
            margin-left: 10rpx;
        }
    }

}
</style>