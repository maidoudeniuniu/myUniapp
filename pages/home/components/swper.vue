<template>
	<view class="home-swper"> 
		<view class="uni-padding-wrap">
				<view class="page-section">
					<view class="page-section-spacing">
						<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
							<swiper-item>
								<view class="swiper-item uni-bg-red">
									<image src="../../../static/img.jpeg" mode="widthFix" style="height: 300rpx;width: 100%;" ></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-green">
									<image src="../../../static/img.jpeg" mode="widthFix" style="height: 300rpx;width: 100%;" ></image>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item uni-bg-blue">
									<image src="../../../static/img.jpeg" mode="widthFix" style="height: 300rpx;width: 100%;" ></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	export default{
		name:"homeSwper",
		data(){
			return{
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-swper{
		background: #FFFFFF; 
		.swiper{
			height: 300rpx;
			overflow: hidden;
		}
		.uni-padding-wrap{
			margin-top: 20rpx;
		}
	}
	
</style>
