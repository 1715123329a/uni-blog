<template>
    <view class="container flex-c" @click="isShow">
        <!-- <navbar title="首页"></navbar> -->
        <view class="text" :style="{ color: textColor, fontSize: fontsizeArr[fontsize - 1] + 'px' }">
            {{ text }}
        </view>
        <view class="seting-box" :style="{ height: inpHeight + 'px' }" @click.stop="">
            <view class="seting-top flex-e">
                <view class="top-box flex-a-c">
                    <view class="input" hover-class="none" hover-stop-propagation="false">
                        <uni-easyinput trim="all" v-model="value" placeholder="请输入内容">
                        </uni-easyinput>
                    </view>
                    <button class="w-button" type="primary" @click="confirm">发送</button>
                </view>
                <uni-icons type="gear-filled" size="24" @click="setting"></uni-icons>
                <uni-icons type="closeempty" size="24" @click="close"></uni-icons>
            </view>
            <view class="seting-bottom flex-e" @click.stop="">
                <view class="bottom-box flex-e">
                    <view class="color" :style="{ backgroundColor: item }" v-for="item in colors" :key="item"
                        @click="changeColor(item)">
                    </view>
                </view>
                <view class="size flex-e">
                    <text class="size-text" @click="subtract">-</text>
                    <text class="size-text">{{ fontsize }}</text>
                    <text class="size-text" @click="add">+</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const text = ref('文字文字文字')
const value = ref()
const textColor = ref('#ffffff')
const inpHeight = ref(130)
const isClose = ref(false)
const fontsize = ref(4)
const colors = ref(['#ffffff', 'yellow', 'red', 'blue', 'green', '#9ec3cb', '#8e44ad', '#2c3e50'])
const fontsizeArr = ref([40, 50, 70, 80, 100, 130])

const isShow = () => {
    inpHeight.value = 65
}
const confirm = () => {
    text.value = value.value
}
const close = () => {
    isClose.value = true
    inpHeight.value = 0
}
const setting = () => {
    inpHeight.value = 130
}
const changeColor = (color) => {
    textColor.value = color
}
const subtract = () => {
    fontsize.value -= 1
    if (fontsize.value < 1) {
        fontsize.value = 1
    }
}
const add = () => {
    fontsize.value += 1
    if (fontsize.value - 1 >= fontsizeArr.value.length) {
        fontsize.value = fontsizeArr.value.length
    }
}
</script>

<style lang="scss" scoped>
.container {
    width: 750rpx;
    height: 100vh;
    background-color: #000;
    position: relative;
    overflow: hidden;

    .text {
        margin: 0 auto;
        text-align: center;
        transform: rotate(90deg);
        position: absolute;
        bottom: -300rpx;
        white-space: nowrap;
        animation-name: identifier;
        animation-duration: 5s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
    }

    .seting-box {
        width: 750rpx;
        // height: 100rpx;
        background-color: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        transition: .5s linear;
        overflow: hidden;

        .seting-top {
            width: 750rpx;
            height: 65px;

            .top-box {
                width: 520rpx;

                .w-button {
                    width: 130rpx;
                    font-size: 26rpx;
                }

                .input {
                    width: 360rpx;
                }
            }
        }

        .seting-bottom {
            width: 750rpx;
            height: 65px;

            .bottom-box {
                padding: 0 10rpx;

                .color {
                    width: 40rpx;
                    height: 40rpx;
                    border: 1px solid #ccc;
                    margin-right: 4rpx;
                }
            }

            .size {
                width: 100rpx;
                font-size: 28rpx;

                .size-text {
                    margin: 0 10rpx;
                    font-size: 40rpx;
                }
            }
        }

    }

    @keyframes identifier {
        100% {
            bottom: 120vh
        }
    }
}
</style>
