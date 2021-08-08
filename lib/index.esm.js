/**
 * 平台类型，类型的定义要和`src/`下对应平台的插件实现目录名保持一致
 */
var PlatForm;
(function (PlatForm) {
    /**
     * 城云自身App
     */
    // eslint-disable-next-line no-unused-vars
    PlatForm["CCI"] = "cci";
    /**
     * 浙政钉
     */
    // eslint-disable-next-line no-unused-vars
    PlatForm["ZZD"] = "zzd";
    /**
     * 微信订阅号
     */
    PlatForm["WX"] = "wx";
    /**
     * 爱青城
     */
    PlatForm["AQC"] = "aqc";
    /**
     *政通青城
     */
    PlatForm["ZTQC"] = "ztqc";
})(PlatForm || (PlatForm = {}));
/**
 * 各个平台的js_jdk
 */
var PlatFormSdkUrl;
(function (PlatFormSdkUrl) {
    // eslint-disable-next-line no-unused-vars
    PlatFormSdkUrl["cci"] = "";
    // eslint-disable-next-line no-unused-vars
    PlatFormSdkUrl["zzd"] = "https://g.alicdn.com/gdt/jsapi/1.9.6/index.js";
    // eslint-disable-next-line no-unused-vars
    PlatFormSdkUrl["wx"] = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js";
    // eslint-disable-next-line no-unused-vars
    PlatFormSdkUrl["aqc"] = "https://parking.smarthohhot.com/parking/dsbridge.js";
    // eslint-disable-next-line no-unused-vars
    PlatFormSdkUrl["ztqc"] = "https://zfappop.iqc-app.com/js/zhengfuqingche-h5.js";
})(PlatFormSdkUrl || (PlatFormSdkUrl = {}));

/*
 * @Author: zhoulf
 * @FilePath: /cm-jsbridge/src/utils.ts
 * @Date: 2021-07-26 15:04:48
 * @LastEditors: 曾利锋[阿牛]
 * @LastEditTime: 2021-08-05 11:56:28
 * @Description:
 */
/**
 * 根据路径导入js
 * @param jsUrl
 */
function loadJs(jsUrl) {
    return new Promise((resolve) => {
        if (jsUrl) {
            // eslint-disable-next-line no-restricted-globals
            let script = document.createElement('script');
            script.type = 'text/javascript';
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        resolve(true);
                    }
                };
            }
            else {
                script.onload = function () {
                    resolve(true);
                };
            }
            script.src = jsUrl;
            // eslint-disable-next-line no-restricted-globals
            document.head.appendChild(script);
        }
        else {
            resolve(true);
        }
    });
}
/**
 * import平台对应插件js的方法
 * @param {String} platform 平台类型
 * @returns {Promise<*>|*}
 */
function importJsSdk(platform) {
    // TODO 这里暂时没有好的处理办法
    // TODO 原先想动态导入，通过`@rollup/plugin-dynamic-import-vars`插件，配合 `import(`./${path}/index`)`，但是目前的插件不支持ts语法
    // TODO 或者用webpack的 `webpackChunkName`来实现，但是目前打包用rollup(rollup不支持这个)，所以考虑后期是否修改
    if (platform === PlatForm.CCI) {
        return Promise.resolve().then(function () { return index$3; });
    }
    else if (platform === PlatForm.ZZD) {
        return Promise.resolve().then(function () { return index$2; });
    }
    else if (platform === PlatForm.WX) {
        return Promise.resolve().then(function () { return index$1; });
    }
    else if (platform === PlatForm.AQC) {
        return Promise.resolve().then(function () { return index; });
    }
    return Promise.resolve(true);
}
/**
 * 判断jssdk是否加载成功
 * @param jssdk
 * @param startTime
 * @param timeout
 * @param resolve
 * @param reject
 */
function promiseJsSdk(jssdk, startTime, timeout, resolve, reject) {
    // eslint-disable-next-line no-restricted-globals
    if (window && window[jssdk]) {
        resolve(true);
    }
    else {
        if (new Date().getTime() - startTime > timeout) {
            reject(new Error(`${jssdk} js bridge timeout!`));
        }
        else {
            setTimeout(() => {
                promiseJsSdk(jssdk, startTime, timeout, resolve, reject);
            }, 20);
        }
    }
}

/*
 * @Descripttion:
 * @version:
 * @Author: 曾利锋[阿牛]
 * @Date: 2021-08-05 09:05:12
 * @LastEditors: 曾利锋[阿牛]
 * @LastEditTime: 2021-08-05 12:00:36
 */
const jsApiPlugin = {
    /**
       * 装载方法
       * @param frameInstance 对应的框架实例子，目前支持Vue
       * @param options 一堆参数
       */
    install: function (frameInstance, options) {
        console.log(11111);
        let pluginPromise;
        let platform = options.platform;
        let timeout = options.pluginInitTimeout || 10000;
        let jsConfigFunc = options.jsConfigFunc;
        // 动态导入平台的jssdk
        let sdkUrl = PlatFormSdkUrl[platform];
        // 导入jssdk，并拿到对应的plugin实例子
        pluginPromise = Promise.all([loadJs(sdkUrl), importJsSdk(platform)]).then(resList => {
            const module = resList[1];
            let { getReady, JsBridge } = module;
            if (!getReady) {
                getReady = Promise.resolve();
            }
            // 初始化
            let option = { timeout, jsConfigFunc };
            return getReady(option).then((isReady) => {
                let jsBridge;
                isReady && (jsBridge = new JsBridge());
                return jsBridge instanceof JsBridge ? jsBridge : undefined;
            });
        });
        //注入到全局实例中
        if (frameInstance) {
            frameInstance.prototype.$jsBridge = pluginPromise;
        }
        return pluginPromise;
    }
};

/**
 * 挂载方法
 * @param type 挂载传递的字段
 * @param options 参数
 * @param isParse 返回结果是否需要JSON.parse解析
 */
function callHandler(type, options = {}, isParse = true) {
    return new Promise((resolve, reject) => {
        // no-restricted-globals
        // @ts-ignore
        // resolve({
        //   type,
        //   options,
        //   longitude: 111111,
        //   latitude: 22222
        // })
        window.WebViewJavascriptBridge.callHandler(type, options, response => {
            const data = isParse ? JSON.parse(response) : response;
            data ? resolve(data) : reject(null);
        });
    });
}
/**
 * CCI jsbridge实现
 */
class CCIJsBridge {
    // 获取定位
    async getLocation() {
        const res = await callHandler("getLocation");
        if (res) {
            return Promise.resolve({
                log: res.longitude,
                lat: res.latitude,
                address: res.address
            });
        }
        else {
            return Promise.reject(null);
        }
    }
    // 关闭页面
    closePage() {
        return callHandler("exit");
        // return Promise.resolve(true)
    }
    // 退出登录
    logout() {
        return callHandler("logout");
        // return Promise.resolve(true)
    }
    // 图片路径转为base64
    async takeWithVirtual(path) {
        if (!path)
            return;
        const res = await callHandler("takeWithVirtual", path, false);
        return Promise.resolve({
            base64Data: res
        });
    }
}
var CCIJsBridge$1 = CCIJsBridge;

/**
 * CCI jsapi初始化
 * @param options 初始化参数
 */
function getCCIJsReady(options) {
    // TODO 这里是示例代码，需要替换成具体的zzd的jsapi判断逻辑
    let startTime = new Date().getTime();
    return new Promise((resolve, reject) => {
        promiseJsSdk('WebViewJavascriptBridge', startTime, options.timeout, resolve, reject);
    });
}

var index$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getReady: getCCIJsReady,
    JsBridge: CCIJsBridge$1
});

/**
 * ZZD jsbridge实现
 */
//获取当前位置
class ZzdJsBridge {
    getLocation() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.getGeolocation({
                targetAccuracy: 100,
                coordinate: 1,
                withReGeocode: false,
                useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
            }).then((res) => {
                let laglot = {
                    lat: res.latitude,
                    log: res.longitude,
                    address: res.address
                };
                resolve(laglot);
            }).catch((err) => {
                //resolve({})
                // err 错误透传
                reject(err);
            });
        });
    }
    /**
   * 导航栏相关
   */
    //显示导航栏
    showTitleBar() {
        let dd = window.dd;
        return dd.showTitleBar();
    }
    //隐藏导航栏
    hideTitleBar() {
        let dd = window.dd;
        return dd.hideTitleBar();
    }
    //设置导航左侧文本（注意仅 iOS 支持）
    setNavLeftText(title) {
        let dd = window.dd;
        return dd.setNavLeftText(title);
    }
    //设置页面标题
    setTitle(title) {
        let dd = window.dd;
        return dd.setTitle({ title });
    }
    //隐藏导航区域右上角区域的按钮 / 文本（H5 生效，小程序不生效）
    hideOptionMenu() {
        let dd = window.dd;
        return dd.hideOptionMenu();
    }
    //设置导航右上角内容
    setOptionMenu(obj) {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.setOptionMenu(obj).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //返回上一级页面
    goBack() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.goBack().then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //打开新页面
    openSchemeUrl(url) {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.openSchemeUrl({ url }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //关闭页面
    closePage() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.closePage().then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //替换页面
    replacePage(url) {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.replacePage({ url }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //旋转屏幕
    rotateView(params) {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.rotateView(params).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //重置旋转屏幕
    resetView() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.resetView().then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //拨打电话
    callPhone(title) {
        let dd = window.dd;
        return dd.callPhone({ title });
    }
    //二维码扫描
    /**
   * type为qrCode(二维码)、barCode(条形码)、all(全部)。 默认all，若有qrCode、barCode扫描不出来，请修改type为all
   */
    scanView(type) {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.scan({ type }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //客户端版本号
    ddVersion() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.version().then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //手机震动
    ddVibrate() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.vibrate().then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //获取设备信息
    getPhoneInfo() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.getPhoneInfo().then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //获取设备的UUID
    getUUID() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.getUUID().then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //获取登录授权码
    getAuthCode(corpId) {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.getUUID({ corpId }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
var ZzdJsBridge$1 = ZzdJsBridge;

/**
 * ZZD jsapi初始化
 * @param options
 */
function getZZDJsReady(options) {
    // TODO 这里是示例代码，需要替换成具体的zzd的jsapi判断逻辑
    let startTime = new Date().getTime();
    return new Promise((resolve, reject) => {
        promiseJsSdk('dd', startTime, options.timeout, resolve, reject);
    });
}
/**
 * zzd js鉴权
 * @param options
 */
function getZZDJsConfig(options) {
    return new Promise((resolve, reject) => {
        getZZDJsReady(options).then(() => {
            const { jsConfigFunc } = options;
            if (jsConfigFunc) {
                jsConfigFunc().then((res) => {
                    // TODO 替换具体的ticket票据和需要鉴权的api列表
                    let options = {
                        ticket: res.ticket,
                        jsApiList: ["alert", "getGeolocation"]
                    };
                    // @ts-ignore
                    return window.dd.authConfig(options);
                });
            }
            else {
                resolve(true);
            }
        }).catch(error => reject(error));
    });
}

var index$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getReady: getZZDJsConfig,
    JsBridge: ZzdJsBridge$1
});

/**
 * ZZD jsbridge实现
 */
//获取当前位置
class WxJsBridge {
    getLocation() {
        return new Promise((resolve, reject) => {
            let wx = window.wx;
            // wx.getLocation({
            //   type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            //   success (res:any){ 
            //     let laglot = {
            //       lat: res.latitude,
            //       log: res.longitude,
            //       address:res.address
            //     }
            //     resolve(laglot)
            //   }
            // });
            wx.getLocation({
                targetAccuracy: 100,
                coordinate: 1,
                withReGeocode: false,
                useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
            }).then((res) => {
                let laglot = {
                    lat: res.latitude,
                    log: res.longitude,
                    address: res.address
                };
                resolve(laglot);
            }).catch((err) => {
                console.log(JSON.stringify(err));
                //resolve({})
                // err 错误透传
                reject(err);
            });
        });
    }
    /**
   * 导航栏相关
   */
    //显示导航栏
    showTitleBar() {
        let dd = window.dd;
        return dd.showTitleBar();
    }
    //隐藏导航栏
    hideTitleBar() {
        let dd = window.dd;
        return dd.hideTitleBar();
    }
    //设置导航左侧文本（注意仅 iOS 支持）
    setNavLeftText(title) {
        let dd = window.dd;
        return dd.setNavLeftText(title);
    }
    //设置页面标题
    setTitle(title) {
        let dd = window.dd;
        return dd.setTitle({ title });
    }
    //隐藏导航区域右上角区域的按钮 / 文本（H5 生效，小程序不生效）
    hideOptionMenu() {
        let dd = window.dd;
        return dd.hideOptionMenu();
    }
    //设置导航右上角内容
    setOptionMenu(obj) {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.setOptionMenu(obj).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //返回上一级页面
    goBack() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.goBack().then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //打开新页面
    openSchemeUrl(url) {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.openSchemeUrl({ url }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //关闭页面
    closePage() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.closePage().then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //替换页面
    replacePage(url) {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.replacePage({ url }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //旋转屏幕
    rotateView(params) {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.rotateView(params).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //重置旋转屏幕
    resetView() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.resetView().then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //拨打电话
    callPhone(title) {
        let dd = window.dd;
        return dd.callPhone({ title });
    }
    //二维码扫描
    /**
   * type为qrCode(二维码)、barCode(条形码)、all(全部)。 默认all，若有qrCode、barCode扫描不出来，请修改type为all
   */
    scanView(type) {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.scan({ type }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //客户端版本号
    ddVersion() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.version().then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //手机震动
    ddVibrate() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.vibrate().then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //获取设备信息
    getPhoneInfo() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.getPhoneInfo().then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //获取设备的UUID
    getUUID() {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.getUUID().then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    //获取登录授权码
    getAuthCode(corpId) {
        return new Promise((resolve, reject) => {
            let dd = window.dd;
            dd.getUUID({ corpId }).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
var WxJsBridge$1 = WxJsBridge;

/**
 * ZZD jsapi初始化
 * @param options
 */
function getWXJsReady(options) {
    // TODO 这里是示例代码，需要替换成具体的zzd的jsapi判断逻辑
    let startTime = new Date().getTime();
    return new Promise((resolve, reject) => {
        promiseJsSdk('wx', startTime, options.timeout, resolve, reject);
    });
}
/**
 * zzd js鉴权
 * @param options
 */
function getWXJsConfig(options) {
    return new Promise((resolve, reject) => {
        getWXJsReady(options).then(() => {
            const { jsConfigFunc } = options;
            if (jsConfigFunc) {
                jsConfigFunc().then((res) => {
                    // TODO 替换具体的ticket票据和需要鉴权的api列表
                    let options = {
                        ticket: res.ticket,
                        jsApiList: ["alert", "getGeolocation"]
                    };
                    // @ts-ignore
                    return window.wx.authConfig(options);
                });
            }
            else {
                resolve(true);
            }
        }).catch(error => reject(error));
    });
}

/*
 * @Descripttion:
 * @version:
 * @Author: 曾利锋[阿牛]
 * @Date: 2021-08-05 09:09:01
 * @LastEditors: 曾利锋[阿牛]
 * @LastEditTime: 2021-08-05 09:21:49
 */

var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getReady: getWXJsConfig,
    JsBridge: WxJsBridge$1
});

/**
 * AQC jsbridge实现
 */
//获取当前位置
class AqcJsBridge {
    setConfigData(data = {}) {
        return {
            app_key: "IQC_TINGCHE_CY",
            version: "1.0.0",
            data: data,
        };
    }
    getLocation(newData) {
        let curData = this.setConfigData(newData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("FunctionApi.getCurrentLocation", curData, function (v) {
                resolve(v);
            });
        });
    }
    getUserInfo(newData) {
        let curData = this.setConfigData(newData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("BusinessApi.getUserInfo", curData, function (v) {
                v?.code == 200 ? resolve(v) : reject(v);
            });
        });
    }
    //onBackClickListener'
    onBackClickListener() {
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.register("onBackClickListener", function (v) {
                v?.code == 200 ? resolve(v) : reject(v);
            });
        });
    }
    //设置页面标题
    setTitle(newData) {
        let curData = this.setConfigData(newData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("UIApi.setTitle", curData, function (v) {
                v?.code == 200 ? resolve(v) : reject(v);
            });
        });
    }
    //返回上一页面
    goBack(newData) {
        let curData = this.setConfigData(newData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("UIApi.goBack", curData, function (v) {
                v?.code == 200 ? resolve(v) : reject(v);
            });
        });
    }
    //关闭子窗口
    closeWebview(newData) {
        let curData = this.setConfigData(newData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("UIApi.closeWebview", curData, function (v) {
                console.log(v);
                v?.code == 200 ? resolve(v) : reject(v);
            });
        });
    }
    //关闭子窗口
    newWebview(newData) {
        let curData = this.setConfigData(newData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("UIApi.newWebview", curData, function (v) {
                console.log(v);
                v?.code == 200 ? resolve(v) : reject(v);
            });
        });
    }
    //打开外部浏览器 
    openInBrowser(newData) {
        let curData = this.setConfigData(newData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("UIApi.openInBrowser", curData, function (v) {
                console.log(v);
                v?.code == 200 ? resolve(v) : reject(v);
            });
        });
    }
    //提示框 
    alert(newData) {
        console.log("提示框");
        let curData = this.setConfigData(newData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("UIApi.alert", curData, function (v) {
                console.log(v);
                v?.code ? resolve(v) : reject(v);
            });
        });
    }
    confirm(newData) {
        let curData = this.setConfigData(newData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("UIApi.confirm", curData, function (v) {
                resolve(JSON.parse(v));
            });
        });
    }
    //拍照/照片选择
    chooseImage(newData) {
        let curData = this.setConfigData(newData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("FunctionApi.chooseImage", curData, function (v) {
                resolve(JSON.parse(v));
            });
        });
    }
    //浏览图片
    imageViewer(newData) {
        let curData = this.setConfigData(newData);
        console.log(curData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("FunctionApi.imageViewer", curData, function (v) {
                resolve(v);
            });
        });
    }
    //分享
    startShare(newData) {
        let curData = this.setConfigData(newData);
        console.log(curData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("FunctionApi.startShare", curData, function (v) {
                resolve(v);
            });
        });
    }
    //扫码
    scan(newData) {
        let curData = this.setConfigData(newData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("FunctionApi.scan", curData, function (v) {
                resolve(v);
            });
        });
    }
    // 微信支付
    doWechatPay(newData) {
        let curData = this.setConfigData(newData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("BusinessApi.doWechatPay", curData, function (v) {
                resolve(v);
            });
        });
    }
    // 人脸识别
    doTencentLiving(newData) {
        let curData = this.setConfigData(newData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("BusinessApi.doTencentLiving", curData, function (v) {
                resolve(v);
            });
        });
    }
    // 银联支付
    doUnionPay(newData) {
        let curData = this.setConfigData(newData);
        return new Promise((resolve, reject) => {
            let dsBridge = window.dsBridge;
            dsBridge.call("BusinessApi.doUnionPay", curData, function (v) {
                resolve(v);
            });
        });
    }
}
var AqcJsBridge$1 = AqcJsBridge;

/**
 * AQC jsapi初始化
 * @param options
 */
function getAQCJsReady(options) {
    // TODO 这里是示例代码，需要替换成具体的zzd的jsapi判断逻辑
    let startTime = new Date().getTime();
    return new Promise((resolve, reject) => {
        promiseJsSdk('bridge', startTime, options.timeout, resolve, reject);
    });
}
/**
 * zzd js鉴权
 * @param options
 */
function getAQCJsConfig(options) {
    return new Promise((resolve, reject) => {
        getAQCJsReady(options).then(() => {
            const { jsConfigFunc } = options;
            if (jsConfigFunc) {
                jsConfigFunc().then((res) => {
                    // TODO 替换具体的ticket票据和需要鉴权的api列表
                    let options = {
                        ticket: res.ticket,
                        jsApiList: ["alert", "getGeolocation"]
                    };
                    // @ts-ignore
                    return window.wx.authConfig(options);
                });
            }
            else {
                resolve(true);
            }
        }).catch(error => reject(error));
    });
}

/*
 * @Descripttion:
 * @version:
 * @Author: 曾利锋[阿牛]
 * @Date: 2021-08-05 09:09:01
 * @LastEditors: 曾利锋[阿牛]
 * @LastEditTime: 2021-08-05 11:39:50
 */

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getReady: getAQCJsConfig,
    JsBridge: AqcJsBridge$1
});

export { PlatForm, jsApiPlugin };
