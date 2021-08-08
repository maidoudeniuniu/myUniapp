<template>
	<view class="warp-content">
	  <u-button @click="getUserInfo">跳转</u-button>	  
	  <u-button @click="getRouter">路由设置</u-button>	  
	</view>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		
		methods:{ 
			 getUserInfo () {  
				this.$CCU.GoNavTo({
					url:"/pages/aqcjsapi/index?id=1&name=uniapp"
				})
			},
			getRouter () {
				this.$CCU.GoNavTo({
					url:"/pages/router/router?id=1&name=uniapp"
				})
			},
			
		}
	}
</script>

<style lang="scss">
	.warp-content{
		padding: 0 20rpx;
		button{
			margin-bottom: 10rpx;
		}
	}
</style>
