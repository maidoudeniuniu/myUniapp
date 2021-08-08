<template>
	<view class="home-addcar">
		<view class="home-addcar-icon"></view>
		<view class="flex1">您还未添加车辆</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.home-addcar{
	  background: #FFFFFF;
	  padding: 0 60rpx 0 20rpx;
	  display: flex;
	  flex-direction: row;
	  margin: 20rpx 0;
	  border-radius: 10rpx;
	  box-shadow: 0 4rpx 8rpx 0rpx #ddd;
 	  .home-addcar-icon{
		  background: url(../../../static/add.png) center center no-repeat;
		  background-size: auto 32rpx;
		  width: 50rpx;
		  height: 50rpx;
		  margin: 20rpx 0;
	  }
	  .flex1{
		  flex: 1;
		  height: 90rpx;
		  line-height: 90rpx;
		  background: url(../../../static/carBg.png) bottom right no-repeat;
		  background-size:auto 90rpx;
	  }
	}
</style>
