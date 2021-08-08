<template>
	<view class="">
		路由页面
		  <u-button @click="getUserInfo">跳转子页面</u-button>	  
	</view>
</template>

<script>
	export default {
		name:"",
		data (){
			return {
				
			}
		},
		onLoad (e){
			console.log(`参数:${JSON.stringify(e)}`)		
		},
		onShow (){
			console.log(`onShow`)		
		},
		onReady (){
			console.log(`onReady`)		
		},
		onHide (){
			console.log(`onHide`)		
		},
		onUnload (){
			console.log(`onUnload`)		
		},
		methods:{
			getUserInfo (){
				this.$CCU.GoNavTo({
					url:"/pages/router/routerab?id=1&name=uniapp"
				})
			}
		}
	}
</script>

<style>
</style>
