<template>
	<view class="warp-content">
	  <u-button @click="getUserInfo">getUserInfo</u-button>
	  <u-button @click="uploadImg">上传图片</u-button>
	  <u-button @click="setTitle">设置标题</u-button>
	  <u-button @click="closeView">关闭窗口</u-button> 
	  <u-button @click="newWebview">新窗口</u-button> 
	  <u-button @click="confirm">确认框</u-button>
	  <u-button @click="chooseImage">照片</u-button>
	  <u-button @click="getLocation">定位</u-button> 
	  <u-button @click="startShare">分享</u-button> 
	  <u-button @click="scan">扫码</u-button> 
	  <u-button @click="doWechatPay">支付</u-button>  
	  <u-button @click="doTencentLiving">人脸识别</u-button>  
	  <u-button @click="doUnionPay">银联支付</u-button>  
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
			        this.$jsBridge.then(plugin => plugin.getUserInfo().then(res => {
			          console.info('lat',res)
			         })).catch(err=>{console.info('err',err)})
			    },
			    uploadImg () {
			          
			    },
			    setTitle () { 
			        this.$jsBridge.then(plugin => plugin.setTitle({title:"阿牛测试"}).then(res => {
			          console.info('lat',res)
			         })).catch(err=>{console.info('err',err)})
			    },
			    closeView () {
			        this.$jsBridge.then(plugin => plugin.closeWebview().then(res => {
			          console.info('lat',res)
			         })).catch(err=>{console.info('err',err)})
			    },
			    newWebview () {
			        this.$jsBridge.then(plugin => plugin.newWebview({
			          url:"http://www.baidu.com"
			        }).then(res => {
			          console.info('lat',res)
			         })).catch(err=>{console.info('err',err)})
			    },
			
			    Toast() {
			        this.$jsBridge.then(plugin => plugin.Toast({
			          url:"http://www.baidu.com"
			        }).then(res => {
			          console.info('lat',res)
			         })).catch(err=>{console.info('err',err)})
			    },
			
			    confirm () {
			      let slef =  this;
			      let data = {
			        title:"是否要关闭窗口",
			        content:"111", 
			      }
			      this.$jsBridge.then(plugin => plugin.confirm(data).then(res => {
			         console.log(res)
			         if(res?.data?.clickItem==0){
			          console.log(22222)
			        }
			      })).catch(err=>{console.info('err',err)})
			    },
			
			    chooseImage() { 
			      let slef = this;
			      this.$jsBridge.then(plugin => plugin.chooseImage().then(res => {
			         console.log(res)
			         slef.img = "data:image/jpg;base64," + res.data.imageBase64
			      })).catch(err=>{console.info('err',err)})
			    },
			    
			    imageViewer () {
			      let slef = this;
			      this.$jsBridge.then(plugin => plugin.imageViewer({
			        url:JSON.stringify(["https://parking.smarthohhot.com/parking/img/makeup.ec3acaa7.png","https://parking.smarthohhot.com/parking/img/makeup.ec3acaa7.png"])
			      }).then(res => {
			          console.log(res)
			      })).catch(err=>{console.info('err',err)})
			    },
			    
			    getLocation () {
			      let slef = this;
			      this.$jsBridge.then(plugin => plugin.getLocation().then(res => {
			          console.log(res)
			      })).catch(err=>{console.info('err',err)})
			    },
			    
			    //分享
			    startShare(){
			      let slef = this;
			      this.$jsBridge.then(plugin => plugin.startShare({
			        title:"1111",
			        content:"2222"
			      }).then(res => {
			          console.log(res)
			      })).catch(err=>{console.info('err',err)})
			    },
			 
			    scan(){
			        let slef = this;
			        this.$jsBridge.then(plugin => plugin.scan({
			          title:"1111",
			          content:"2222"
			        }).then(res => {
			            console.log(res)
			        })).catch(err=>{console.info('err',err)}) 
			    },
			
			    doWechatPay(){
			        let slef = this;
			        this.$jsBridge.then(plugin => plugin.doWechatPay({
			          referer:"http://www.qq.com",
			          payUrl:"http://www.qq.com"
			        }).then(res => {
			            history.pushState({},null,"#/home")
			        })).catch(err=>{console.info('err',err)})  
			    },
			    
			    doTencentLiving () {
			      let slef = this;
			        this.$jsBridge.then(plugin => plugin.doTencentLiving({
			          actualName:"曾利锋",
			          cardId:"332528198711302231"
			        }).then(res => {
			             console.log(res)
			        })).catch(err=>{console.info('err',err)})  
			    },
			    
			    doUnionPay(){
			      let slef = this;
			        this.$jsBridge.then(plugin => plugin.doUnionPay().then(res => {
			             console.log(res)
			        })).catch(err=>{console.info('err',err)})
			    } 
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
