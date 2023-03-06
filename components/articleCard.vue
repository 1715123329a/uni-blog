<template>
    <view class="article">
        <view class="item" v-for="item in list" :key="item._id" @click="onClick(item._id)">
            <uni-card :title="item.user.nick_name" :sub-title="'#' + item.tag?.title" :thumbnail="item.user.avatar_url">
                <view class="click-item" @click.stop="toDetail(item?.user._id)">

                </view>
                <text class="item-text " :class="{ 'inherit': inherit }">{{ item.text }}</text>
                <view class="info flex-b">
                    <view class="info-left">
                        {{ formatTime(item?.create_time) }}
                    </view>
                    <view class="info-right flex-c">
                        <view class="info-item flex-a-c" v-if="isComment">
                            <uni-icons type="chatboxes" size="18" color="#999999"></uni-icons> {{ item?.comments }}
                        </view>
                        <view class="info-item flex-a-c">
                            <uni-icons type="eye" size="18" color="#999999"></uni-icons>0
                        </view>
                    </view>
                </view>
            </uni-card>
        </view>
    </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { formatTime } from '@/utils/index';

const props = defineProps({
    list: {
        type: Array,
        default: [{
            create_time: 1669102030636,
            tag: { title: "测试标签2" },
            text: "这是测试的这是测试的这是测试的这是测试的这是测试的这是测试的",
            user: {
                avatar_url: "https://picx.zhimg.com/80/v2-5f12399c3654cf582d50d2695edab8a2_720w.webp?source=1940ef5c",
                nick_name: "匿名用户",
            },
            _id: "637c79ce506b1ca130a10519"
        }],
    },
    isComment: {
        type: Boolean,
        default: true
    },
    isClick: {
        type: Boolean,
        default: true
    },
    inherit: {
        type: Boolean,
        default: false
    }

})
const onClick = (id) => {
    if (props.isClick) {
        uni.navigateTo({
            url: '/pages/article/articleDetail?id=' + id
        });
    }
}
const toDetail = (id) => {
    uni.navigateTo({
        url: '/pages/userDetail/userDetail?id=' + id
    });
}
</script>

<style scoped lang="scss">
.article {
    width: 750rpx;

    .item {
        .item-text {
            overflow: hidden;
            text-overflow: ellipsis;
            /* 超出部分省略号 */
            word-break: break-all;
            /* break-all(允许在单词内换行。) */
            display: -webkit-box;
            /** 对象作为伸缩盒子模型显示 **/
            -webkit-box-orient: vertical;
            /** 设置或检索伸缩盒对象的子元素的排列方式 **/
            -webkit-line-clamp: 3;
            /** 显示的行数 **/
        }

        .inherit {
            overflow: hidden;
            text-overflow: ellipsis;
            /* 超出部分省略号 */
            word-break: break-all;
            /* break-all(允许在单词内换行。) */
            display: -webkit-box;
            /** 对象作为伸缩盒子模型显示 **/
            -webkit-box-orient: vertical;
            /** 设置或检索伸缩盒对象的子元素的排列方式 **/
            -webkit-line-clamp: inherit;
            /** 显示的行数 **/
        }
    }


    .info {
        margin-top: 20rpx;
        color: $text-color-grey;

        .info-left {}

        .info-item {
            margin-right: 20rpx;
        }
    }

    .click-item {
        width: 50%;
        height: 100rpx;
        position: absolute;
        top: 0;
        left: 0;
        visibility: 0;
    }
}
</style>