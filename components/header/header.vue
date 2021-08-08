<template>
	<view class="">
		<status-component></status-component>
	</view>
</template>

<script>
	import statusComponent from './status.vue'
	export default {
		name:"headerComponent",
		components:{
			statusComponent
		},
		data () {
			return {
				
			}
		}
	}
</script>

<style>
</style>
