<template>
    <view class="content-city">
        <img class="pic" src="../static/images/bg2.png" alt="">
        <view class="music">
            <view class="music-name">
                <view class="name">
                    {{ musicData.name || '暂无音乐' }}
                </view>
                <view>
                    {{ musicData.auther || '...' }}
                </view>
            </view>
            <view class="music-btn">
                <img @click="play" v-if="!isPlay" src="../static/images/gl-play.png" alt="" srcset="">
                <img @click="stop" v-else src="../static/images/stop.png" alt="" srcset="">
            </view>
        </view>
        <view class="progress-bar">
            <view class="progress-inside" :style="{ width: progress + '%' }">
            </view>
        </view>
        <view class="change-music" @click="changeMusic">换一首</view>
    </view>
</template>

<script>
// import { getMusic } from '../api/api'


export default {
    data() {
        return {
            musicData: {},
            isPlay: false,
            innerAudioContext: uni.createInnerAudioContext(),
            progress: 1
        }
    },
    created() {
        // this.getMusic()
    },
    methods: {
        changeMusic() {
            this.innerAudioContext.stop()
            this.getMusic()
        },
        getMusic() {
            let that = this
            that.isPlay = true
            that.innerAudioContext.autoplay = true;
            let params = { type: 'json', sort: '热歌榜' }
            getMusic(params).then(res => {
                console.log(res);
                if (res.success) {
                    that.musicData = res.info
                    that.innerAudioContext.src = res.info.mp3url;
                    that.innerAudioContext.onPlay(() => {
                        console.log('开始播放');
                    });
                    that.innerAudioContext.onTimeUpdate(() => {
                        //播放时间
                        let time = that.innerAudioContext.currentTime.toFixed(0)
                        // let min = Math.floor(time / 60)
                        // let second = time % 60
                        // let tims = (min >= 10 ? min : '0' + min) + ':' + (second >= 10 ? second : '0' + second)
                        //计算进度
                        let progress = ((time / that.innerAudioContext.duration).toFixed(2)) * 100
                        that.progress = progress
                    })
                    that.innerAudioContext.onEnded(() => {
                        console.log('自然结束');
                        setTimeout(() => {
                            that.getMusic()
                        }, 5000)
                    });
                    that.innerAudioContext.onError((err) => {
                        console.log(err);
                        setTimeout(() => {
                            that.getMusic()
                        }, 5000)
                    });
                } else {
                    console.log(res.message);
                }
            })
        },
        stop() {
            this.innerAudioContext.pause()
            this.isPlay = false
        },
        play() {
            this.innerAudioContext.play()
            this.isPlay = true
        }
    }
}
</script>

<style lang="scss" scoped>
.content-city {
    width: 100%;
    height: 100%;
    position: relative;

    .pic {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .change-music {
        font-size: 24rpx;
        position: absolute;
        top: 10rpx;
        right: 20rpx;
        color: rgb(51, 190, 178);
    }

    .music {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        color: #ffffff;

        .music-name {
            view {
                font-size: 28rpx;
            }

            .name {
                font-size: 32rpx;
            }
        }

        .music-btn {
            img {
                width: 80rpx;
                height: 80rpx;
            }
        }
    }
}

.progress-bar {
    width: 200rpx;
    height: 10rpx;
    position: absolute;
    bottom: 40rpx;
    left: 400rpx;
    margin-left: -50%;
    background-color: #cccccc;

    .progress-inside {
        width: 50%;
        height: 10rpx;
        background-color: #E79D9F;
    }
}
</style>