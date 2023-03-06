import { BASE_URL } from '../config'
import { getToken } from '../utils/index'
import { _login } from './auth'

function request({ ...config }) {
    uni.showLoading({
        title: '加载中...'
    });
    const token = getToken()
    const promise = new Promise((resolve, reject) => {
        uni.request({
            url: config.base_url ? config.base_url : BASE_URL + config.url,
            data: config.data,
            method: config.method || 'get',
            header: {
                'Authorization': token ? `Bearer ${token}` : null
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    resolve(res.data)
                } else {
                    if (res.statusCode === 401) {
                        // 登录无效  需要重新登陆
                        console.log('登录无效  需要重新登陆');
                        _login()
                    }
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 3000
                    });
                    reject(res.data)
                }
            },
            fail: (err) => {
                uni.showToast({
                    title: '网络错误',
                    icon: 'error',
                    duration: 3000
                });
                reject(err)
            },
            complete: () => {
                uni.hideLoading()
            }
        });
    })
    return promise
}


export default request