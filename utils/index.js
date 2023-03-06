export const getToken = () => {
    let token
    try {
        const value = uni.getStorageSync('token');
        if (value) {
            token = value
        }
    } catch (e) {
        // error
    }
    return token
}

export const getStorageUser = () => {
    let user
    try {
        const value = uni.getStorageSync('userInfo');
        if (value) {
            user = value
        }
    } catch (e) {
        // error
    }
    return user
}

// new Date 转成 Y M D H M 
export const formatTime = (date) => {
    if (typeof date == 'number') {
        date = new Date(parseInt(date.toString()))
    }
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

// new Date 转成 Y M D
export const formatDate = (date) => {
    if (typeof date == 'number') {
        date = new Date(parseInt(date.toString()))
    }
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return [year, month, day].map(formatNumber).join('-')
}
export const formatNumber = (n) => {
    n = n.toString()
    return n[1] ? n : '0' + n
}