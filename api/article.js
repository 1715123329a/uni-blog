import request from '../utils/request'

export const getTags = () => {
    return request({
        url: '/tag/list'
    })
}

export const addArticle = (data) => {
    return request({
        url: '/article/add',
        method: 'post',
        data
    })
}

export const getArticle = (data) => {
    return request({
        url: '/article/list',
        data
    })
}
export const getArticleCount = () => {
    return request({
        url: '/article/list/count'
    })
}

export const getArticleDetail = (id) => {
    return request({
        url: '/article?id=' + id
    })
}

export const delArticle = (id) => {
    return request({
        url: '/article?id=' + id,
        method: 'delete',
    })
}

export const sendComment = (data) => {
    return request({
        url: '/article/comment/add',
        method: 'post',
        data
    })
}

export const getComment = (id) => {
    return request({
        url: '/article/comment',
        data: {
            id
        }
    })
}