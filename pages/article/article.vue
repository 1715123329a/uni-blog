<template>
    <view class="container">
        <navbar title="发帖" :goback="true"></navbar>
        <view class="article">
            <textarea @blur="bindTextAreaBlur" v-model="formData.text" maxlength="200" class="textarea" auto-height
                placeholder="请输入您的内容" />
            <view class="uploadimg">
                <view class="example-body">
                    <uni-file-picker ref="uploadImg" limit="6" disable-preview :auto-upload="false" title="最多选择9张图片">
                    </uni-file-picker>
                </view>
            </view>
            <uni-section title="#标签" sub-title="" type="line">
                <uni-data-checkbox mode="tag" selectedColor="#4c6a88" v-model="formData.tag" :localdata="tags">
                </uni-data-checkbox>
            </uni-section>
        </view>
        <view class="confirm">
            <button class="confirm-btn" type="primary" @click="confirm">发表</button>
        </view>
    </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useUsersStore } from '@/stores/user'
import navbar from '@/components/navbar.vue';
import { getTags, addArticle } from '@/api/article';

const store = useUsersStore()

const uploadImg = ref()
const tag = ref()
const tags = ref([])
const formData = ref({
    text: '',
    tag: '',
})

const _getTags = async () => {
    const { data } = await getTags()
    tags.value = data.map(item => {
        return {
            text: '#' + item.title,
            value: item._id
        }
    })
}
_getTags()

const confirm = async () => {
    console.log(formData.value);
    if (!formData.value.text) {
        return uni.showToast({
            title: '请输入内容',
            icon: 'none',
            duration: 2000
        });
    }
    if (!formData.value.tag) {
        return uni.showToast({
            title: '请选择标签',
            icon: 'none',
            duration: 2000
        });
    }
    await addArticle(formData.value)
    uni.showToast({
        title: '发布成功',
        duration: 2000
    });
    setTimeout(() => {
        uni.switchTab({
            url: '/pages/index/index'
        });
    }, 1000);
}
onMounted(() => {
})

</script>

<style lang="scss" scoped>
.container {
    width: 750rpx;

    .article {
        width: 750rpx;
        padding: 20rpx;
        box-sizing: border-box;

        .textarea {
            width: 100%;
            min-height: 300rpx;
        }
    }

    .uploadimg {
        margin-bottom: 20rpx;
    }

    .confirm {
        width: 100%;
        position: fixed;
        bottom: 0;

        .confirm-btn {
            background-color: $theme-color;
            border-radius: 0;
        }
    }
}
</style>
