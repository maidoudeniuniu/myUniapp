<template>
	<view class="gridItemBox">
		<view v-for="(item,index) in grid" :key="index" class="gridItem">
			<view class="riderIcon" :class="item.class"></view>
			<view class="gridNmae">{{item.name}}</view>
		</view> 
	</view>
</template>

<script>
	export default{
		data(){
			return {
				grid:[
					{   
						class:"chepai",
						name:"车牌缴费"
					},
					{
						class:"chefei",
						name:"车费补缴"
					},
					{
						class:"powei",
						name:"泊位提醒"
					},
					{
						class:"tingche",
						name:"停车记录"
					},
					{
						class:"wugan",
						name:"无感停车"
					},
					{
						class:"yijian",
						name:"一键哪车"
					},
					{
						class:"gongxiang",
						name:"共享停车"
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped="">
	.gridItemBox{
		display: flex;
		flex-wrap: wrap;
		background: #FFFFFF;
		.gridItem{
			width: 25%; 
			text-align: center;
			margin-bottom: 20rpx;
			.riderIcon{
				width: 132rpx;
				height: 132rpx;
				background: #ddd;
				border-radius: 132rpx;
				margin: 0 auto;
				// background: url(../../../static/home/parking.png) center center no-repeat;
				// background-size: 132rpx auto;
			}
			.chepai{
				background: url(../../../static/parking.png) center center no-repeat;
				background-size: 132rpx auto;
			}
			.chefei{
				background: url(../../../static/makeup.png) center center no-repeat;
				background-size: 132rpx auto;
			}
			.powei{
				background: url(../../../static/remind.png) center center no-repeat;
				background-size: 132rpx auto;
			}
			.tingche{
				background: url(../../../static/time.png) center center no-repeat;
				background-size: 132rpx auto;
			}
			.wugan{
				background: url(../../../static/unconscious2.jpg) center center no-repeat;
				background-size: 132rpx auto;
			}
			.yijian{
				background: url(../../../static/unconscious.png) center center no-repeat;
				background-size: 132rpx auto;
			}
			.gongxiang{
				background: url(../../../static/share.png) center center no-repeat;
				background-size: 132rpx auto;
			}
			.gridNmae{
				//margin-top: 10rpx;
			}
		}
	}
	
</style>
