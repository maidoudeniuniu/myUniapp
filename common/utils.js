export const setValue = (key, value) => {
	return uni.setStorageSync(key, value);
}

export const getValue = (key) => {
	return uni.getStorageSync(key);
}

export const removeKey = (key) => {
	return uni.removeStorageSync(key)
}

// 提示
export const showToast = (value, icon) => {
	uni.showToast({
		icon: icon || 'none',
		title: value,
		duration: 1800
	});
}

// 跳转多种模式
export const GoNavTo = (param) => {
	let type = param.type || 'navigateTo'
	let url = param.url || null
	if (!url) {
		return
	}
	//保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面
	if (type == 'navigateTo') {
		uni.navigateTo({
			url: url
		});
	}
	//关闭当前页面，跳转到应用内的某个页面
	if (type == 'redirectTo') {
		uni.redirectTo({
			url: url
		})
	}
	//关闭所有页面，打开到应用内的某个页面。
	if (type == 'reLaunch') {
		uni.reLaunch({
			url: url
		})
	}
	//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
	if (type == 'switchTab') {
		uni.switchTab({
			url: url
		})
	}
}


export default {
	GoNavTo,
	showToast
}