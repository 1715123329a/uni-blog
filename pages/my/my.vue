<template>
    <view class="container">
        <navbar :toHome="true" title="我的"></navbar>
        <view class="header">
            <view class="share">
                <uni-icons type="gear" size="30" style="margin-right:10rpx;" color="#ffffff"></uni-icons>
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
            </view>
            <uni-row>
                <uni-col :span="8">
                    <view class="item">
                        <view class="item-top">
                            {{ userInfo?.articleCount }}
                        </view>
                        <view class="item-bottom">
                            帖子
                        </view>
                    </view>
                </uni-col>
                <uni-col :span="8">
                    <view class="item">
                        <view class="item-top">
                            0
                        </view>
                        <view class="item-bottom">
                            待定
                        </view>
                    </view>
                </uni-col>
                <uni-col :span="8">
                    <view class="item">
                        <view class="item-top">
                            0
                        </view>
                        <view class="item-bottom">
                            待定
                        </view>
                    </view>
                </uni-col>
            </uni-row>
        </view>
        <view class="submenu flex-e flex-w">
            <view class="submenu-item flex-c" v-for="item in submenu" :key="item.path" @click="toPage(item.path)">
                <uni-icons type="chatboxes" size="24"></uni-icons>
                {{ item.title }}
            </view>
        </view>
        <view class="items">
            <uni-section class="mb-10" title="主标题主标题主标题" v-for="item in 2" :key="item">
                <template v-slot:right>
                    <uni-icons type="forward" size="20"></uni-icons>
                </template>
            </uni-section>
        </view>
        <tools></tools>
        <loginPopup ref="popup"></loginPopup>
    </view>
</template>

<script setup>
import { onShow } from "@dcloudio/uni-app";
import { ref, reactive, onMounted } from 'vue'
import { useUsersStore } from '../../stores/user'
import loginPopup from '../../components/loginPopup.vue'
import tools from '../../components/tools.vue'
import navbar from '@/components/navbar.vue';
import { getToken } from '@/utils';
import { getUser } from '@/utils/auth'
const store = useUsersStore()
const popup = ref()
const userInfo = ref()
const submenu = [
    {
        title: '我的帖子',
        path: '/pages/my/myArticle'
    },
    {
        title: '待定',
        path: '/pages/my/myArticle1'
    },
    {
        title: '待定',
        path: '/pages/my/myArticle2'
    },
    {
        title: '待定',
        path: '/pages/my/myArticle3'
    }]
onShow(() => {
    uni.getStorage({
        key: 'userInfo',
        success: function (res) {
            userInfo.value = res.data
        }
    });
})
onMounted(() => {
    const token = getToken()
    if (!token) {
        popup.value.openPopup()
    } else {
        getUser()
    }
})
const toPage = (path) => {
    uni.navigateTo({
        url: path
    })
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

.submenu {
    width: 100%;
    padding: 20rpx 0;

    .submenu-item {
        width: 300rpx;
        height: 150rpx;
        border: 1px solid #ccc;
        border-radius: 20rpx;
        margin-bottom: 20rpx;
    }
}

.items {
    width: 750rpx;
    padding: 0 10rpx 10rpx;
    box-sizing: border-box;

    .placeholder {
        padding: 10rpx 0;
    }
}
</style>
