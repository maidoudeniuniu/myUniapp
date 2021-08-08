<template>
	<view class="warp-layout">
		<view class="home-searchcar">
			<view class="searchicon" :class="{gray:!searchText}">{{searchText?searchText:"请输入目的地，查周边停车场1"}}</view>
		</view>
 		<home-swper></home-swper>
		<grid-component></grid-component>
		<addcar-component></addcar-component>
		<map-component></map-component> 
	</view>
</template>

<script>
	import homeSwper from './components/swper.vue'
	import gridComponent from './components/grid.vue'
	import mapComponent from './components/map.vue'
	import addcarComponent from './components/addcar.vue'
 	export default {
		name:"home",
		components:{
			homeSwper,
			gridComponent,
			mapComponent,
			addcarComponent
		},
		data(){
			return{
				searchText:""
			}
		},
		onShow() {
		 
			
		}
	}
</script>

<style lang="scss" scoped>
	.warp-layout{
		padding: 30rpx;
		background: #f8f8f8;
		.gray{
			color: #999999;
		}
		.home-searchcar{ 
			background: #fff;
			border-radius: 12rpx;
			box-shadow: -2rpx -2rpx 10rpx #ddd;
			height: 80rpx;
			line-height: 80rpx;
			text-indent: 10rpx;
			font-size: 28rpx; 
			padding: 0 20rpx;
			.searchicon{
				padding-left: 40rpx;
				background: url(../../static/search.png) center left no-repeat;
				background-size: 40rpx auto;
			}
		}
		
	}
</style>
