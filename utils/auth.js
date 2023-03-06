import { login } from '@/api/auth'
import { getUserInfo, getMyArticleCount } from '@/api/user';


export const getProvider = () => {
    let provider = null
    uni.getProvider({
        service: 'oauth',
        success: function (res) {
            provider = res.provider
        }
    });
    return provider
}

export const getUser = async () => {
    const { data } = await getUserInfo()
    const count = await getMyArticleCount()
    data.articleCount = count.data
    uni.setStorage({
        key: 'userInfo',
        data: data
    });
}

export const _login = async () => {
    const provider = await getProvider()
    return new Promise((resolve, reject) => {
        uni.login({
            provider: provider,
            success: async (loginRes) => {
                const { code } = loginRes
                login({ code }).then(res => {
                    uni.setStorage({
                        key: 'token',
                        data: res.data,
                        success: () => {
                            getUser()
                            resolve()
                            uni.showToast({
                                title: '登陆成功',
                                duration: 3000
                            });
                        }
                    });
                }).catch(err => {
                    reject(err)
                    uni.showToast({
                        title: '登陆失败',
                        duration: 2000
                    });
                })
            }
        });
    })
}
