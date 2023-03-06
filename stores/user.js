import { defineStore } from 'pinia'


// 第一个参数是应用程序中 store 的唯一 id
export const useUsersStore = defineStore('users', {
    // 其它配置项
    state: () => {
        return {
            userInfo: '',
            roles: [],
            token: 'kkk'
        };
    },
    // getters: {
    //     getAddAge: (state) => {
    //         return (num: number) => state.age + num;
    //     },
    //     getNameAndAge(): string {
    //         return this.name + this.getAddAge; // 调用其它getter
    //     },
    // },
    actions: {
        setUserInfo(data) {
            this.userInfo = data;
        },
    },
})