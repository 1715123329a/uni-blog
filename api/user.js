import request from '../utils/request'

export const getUserInfo = () => {
    return request({
        url: '/user'
    })
}

export const getMyArticle = (data) => {
    return request({
        url: '/article/myArticle',
        data
    })
}
export const getMyArticleCount = () => {
    return request({
        url: '/article/myArticle/count'
    })
}
export const getUserDetail = (id) => {
    return request({
        url: '/user/detail',
        data: {
            id
        }
    })
}
//1