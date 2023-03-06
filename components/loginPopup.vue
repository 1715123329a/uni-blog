<template>
    <view class="popup-container">
        <uni-popup ref="popup" :before-close="true" :mask-click="false">
            <view class="popup-content">
                <view class="title">
                    请先登录
                </view>
                <button class="btn w-button" @click="login" type='primary'>登陆</button>
            </view>
        </uni-popup>
    </view> 
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useUsersStore } from '../stores/user'
import { _login } from '../utils/auth'

const store = useUsersStore()
const popup = ref()
const openPopup = () => {
    popup.value.open('center')
}
const closePopup = () => {
    popup.value.close()
}
defineExpose({
    openPopup,
    closePopup
})
const login = async () => {
    await _login()
    closePopup()
}

</script>

<style lang="scss" scoped>
.popup-container {
    .popup-content {
        width: 500rpx;
        height: 400rpx;
        border-radius: 20rpx;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .title {
            font-size: 16px;
            margin-bottom: 30rpx;
        }

        .btn {
            width: 200rpx;
        }
    }
}
</style>
