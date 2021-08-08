<template>
	<view class="">
		login
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            title: 'Hello'
	        }
	    },
	    onLoad() {
	        // 获取页面路由
	        // uni-app官方推荐方式，适用所有端
	        console.log(getCurrentPages()[getCurrentPages().length-1].route)
	    },
	    onShow() {
	        // 获取路由页面参数
	        console.log(this.$routeParams)
	        console.log(getCurrentPages()[getCurrentPages().length-1].$routeParams)
	        // 获取路由动作过程参数
	        console.log(this.$passedParams)
	        console.log(getCurrentPages()[getCurrentPages().length-1].$passedParams)
	    },
	    onUnload() {
	       
	    },
	    methods: {
	        //....
	    }
	}
</script>

<style>
</style>
