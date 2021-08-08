# UNIAPP 基础

### 1.UNIAPP 配置

- ​       pagesURl:https://uniapp.dcloud.io/collocation/pages

- 设置导航栏

  ```
  "style": {
      "navigationBarTitleText": "首页",
      "navigationBarBackgroundColor":"#ff3300",
      "navigationBarTextStyle":"#ffffff"   
  }
  ```

  ##### 自定义导航

  ```
  "navigationStyle": "custom"
  ```

  ##### tarBar设置底部 tab 的表现

  ```
  "tabBar": {
      "color": "#7A7E83",
      "selectedColor": "#3cc51f",
      "borderStyle": "black",
      "backgroundColor": "#ffffff",
      "list": [{
          "pagePath": "pages/component/index",
          "iconPath": "static/image/icon_component.png",
          "selectedIconPath": "static/image/icon_component_HL.png",
          "text": "组件"
      }, {
          "pagePath": "pages/API/index",
          "iconPath": "static/image/icon_API.png",
          "selectedIconPath": "static/image/icon_API_HL.png",
          "text": "接口"
      }]
  }
  ```

- 扩展节点package.json

  https://uniapp.dcloud.io/collocation/package

  ```
   "uni-app": {
        "scripts": {
            "h5-aqc": { 
            "title":"爱青城",
    		   "BROWSER":"Chrome",
                "env": { 
                    "UNI_PLATFORM": "h5" 
                },
                "define": { 
                    "H5-AQC": true 
                }
            },
    		  "h5-zt": {
    		  "title":"政通",
    		  "BROWSER":"Chrome",
    		      "env": { 
    		          "UNI_PLATFORM": "h5" 
    		      },
    		      "define": { 
    		          "H5-ZT": true 
    		      }
    		  }
        }	  
    }
  ```

  

## 2.路由配置

https://uniapp.dcloud.io/api/router?id=navigateto

```
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
```

# 3.字体单位

1. 若设计稿宽度为 750px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 `uni-app` 里面的宽度应该设为：`750 * 100 / 750`，结果为：100rpx。
2. 若设计稿宽度为 640px，元素 A 在设计稿上的宽度为 100px，那么元素 A 在 `uni-app` 里面的宽度应该设为：`750 * 100 / 640`，结果为：117rpx。
3. 若设计稿宽度为 375px，元素 B 在设计稿上的宽度为 200px，那么元素 B 在 `uni-app` 里面的宽度应该设为：`750 * 200 / 375`，结果为：400rpx。

  https://uniapp.dcloud.io/frame?id=%e5%b0%ba%e5%af%b8%e5%8d%95%e4%bd%8d



# 4.生命周期

https://uniapp.dcloud.io/collocation/frame/lifecycle?id=%e5%ba%94%e7%94%a8%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f



