
<script>
// import { getToken } from '@/utils';
// import { getUserInfo } from './api/user';
export default {
	onLaunch: function () {
		// const token = getToken()
		// if (token) {
		// 	getUserInfo().then(res => {
		// 		console.log(res);
		// 	})
		// }
		console.log('App Launch')
	},
	onShow: function () {
		// console.log('App Show')
	},
	onHide: function () {
		// console.log('App Hide')
	}
}
</script>

<style lang="scss">
/*每个页面公共css */
// @import '@/uni_modules/uni-scss/index.scss';
@import './static/common.scss';

/* #ifndef APP-NVUE */
// @import '@/static/customicons.css';

// 设置整个项目的背景色
page {
	background-color: #ffffff;
}

/* #endif */
.example-info {
	font-size: 14px;
	color: #333;
	padding: 10px;
}
</style>
