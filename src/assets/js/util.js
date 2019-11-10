import wx from 'weixin-js-sdk';
const ua = navigator.userAgent.toLowerCase();
const isWeixin = ua.indexOf('micromessenger') != -1;
const isAndroid = ua.indexOf('android') != -1; 
//  按需引入雷达图插件
const echarts = require('echarts/lib/echarts')
require("echarts/lib/chart/radar");
let scrollTop=0;
const util = {
  isWeixin: isWeixin,
  isAndroid: isAndroid,
  scrollTop:scrollTop,
  sharePage:'',
  getItem: function (name) {
    let val = localStorage.getItem(name);
    try {
      val = JSON.parse(val)
    } catch (error) {}
    return val
  },

  setItem: function (name, data) {
    if (data.constructor === Object || Array.isArray(data)) {
      let val = JSON.stringify(data)
      localStorage.setItem(name, val);
    } else {
      localStorage.setItem(name, data);
    }
  },
  //数量转换
  format(value, symbol) { 
    if (value<=0){return '0';}
    // 取整
    if (value<10000){return String(value).split(".")[0];}
    let obj = {
      symbol: symbol || "",
      int: undefined, //整数位
      dec: undefined, //小数位
      targ: "", //正负
      times: ['', '万', '亿', '万亿', '亿亿']
    }
    value = String(value);
    let reg = /^-?\d+\.?\d?$/; 
    if (!reg.test(value)) {
      return '0';
    }

    if (value[0] == "-") {
      obj.targ = "-";
      value = value.substring(1, value.length)
    }

    let times = 0;
    value = Number(value);
    while (value > 10000) {
      value = value / 10000;
      times++;
    } 
    let arr = String(value).split(".")
    obj.int = arr[0];
    obj.dec = arr[1]?arr[1] && arr[1].substring(0,2):'0';   
    return  obj.symbol + obj.targ + obj.int + "." + obj.dec + obj.times[times];
  },
 
    /**
   * 获取页面连接参数
   * @param {string} name 链接参数名字
   * @return {string || null} 返回 参数内容
   */
  getUrlParam: function (name) { 
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");  
    let urlParam =  window.location.search ||  window.location.hash;
    urlParam = urlParam.split("?")[1];
    let r = urlParam.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  /**
   * @param toObj //路由切换的to 路由 toObj.meta.share_image  动态分享图片
   * @param toObj.fullPath // 页面返回到缓存页面要拼接分享的路径
   * 
   */
  wxChatShare: function ($vue,toObj) { 
    let url='';
    let imgUrl ="https://wxapp-1254383113.file.myqcloud.com/69314799197936.jpg";  
     if(toObj && toObj.constructor  === Object){  
      imgUrl = toObj.meta.share_image || "https://wxapp-1254383113.file.myqcloud.com/69314799197936.jpg"; 
      url = location.href.split('#')[0]+'#'+toObj.fullPath; 
     }else{
      imgUrl = toObj || "https://wxapp-1254383113.file.myqcloud.com/69314799197936.jpg";
      url =  window.location.href
     }

    if (window.entryUrl === '' || window.entryUrl === undefined) {
      window.entryUrl = location.href.split('#')[0]
    }
    let verifiUrl = $vue.util.isAndroid ? location.href.split('#')[0] : window.entryUrl ;
  
    let param = {
      title: "想要不出国读全球TOP50名校MBA吗？",
      desc: "点击链接查看院校详细介绍",
      link: url,
      imgUrl: imgUrl,
      localUrl: verifiUrl
    }; 
    $vue.wx.wxChat($vue, param);
  },

  scrollStop(){ 
    util.scrollTop = document.scrollingElement.scrollTop;
    document.body.classList.add("modal-open");
    document.body.style.top = -util.scrollTop + 'px'; 
  },
  /***取消滑动限制***/
  scrollMove(type){  
    document.body.classList.remove("modal-open"); 
    if(type === "index"){
      return false;
    }else{
      document.scrollingElement.scrollTop = util.scrollTop; 
    }
            
  }, 
  swiperCross($vue,wrapDom,boxDom,listDom,num){
    num=num||2;
    const that = $vue;
    let listWidth = listDom[0].offsetWidth;
    let leftW = listDom[0].offsetLeft;
    // 设置盒子的宽度
    boxDom.style.width = 100 * listDom.length + '%';

    // 初始化手指坐标点
    let startPoint = 0; 
    // 滑动距离
    let disX = 0;
    //手指按下 
     
    if(wrapDom.getAttribute("touch")) return false;
    wrapDom.setAttribute("touch",true)
    wrapDom.addEventListener("touchstart", function (e) {
      startPoint = e.changedTouches[0].pageX; 
      disX=0;
    });
    //手指滑动
    wrapDom.addEventListener("touchmove", function (e) {
      let currPoint = e.changedTouches[0].pageX;
      disX = currPoint - startPoint;

    });
    //当手指抬起的时候，判断图片滚动离左右的距离
    wrapDom.addEventListener("touchend", function (e) { 
      if (disX < -60) {
        //向右滑动1
        if (that.swiperNum + 1 >= listDom.length) return false
        that.swiperNum += 1; 
      } else if (disX > 60) {
        //向左滑动
        if (that.swiperNum <= 0) return false
        that.swiperNum -= 1  
      }else{
        return false
      }

      listDom.forEach((val) => {

        val.classList.remove("active")
      }) 
      listDom[that.swiperNum].classList.add("active") 
      if(that.swiperNum === 0){ 
       boxDom.style.transform = "translateX(0px)";
      }else{ 
        boxDom.style.transform = "translateX(" + -((that.swiperNum * listWidth) - num * leftW) + "px)";
      }
    })
  }, 
  replaceStr(str){
    return str.replace(/\n|\r\n/g,"<br/>") 
  },
  drawFiveStart(dom,fontData,numData){  
    let eChart = echarts.init(dom);  
    eChart.setOption({ 
      radar: [
        {
          indicator: fontData,
          center: ['50%', '50%'],
          radius: 76,
           splitArea: {
              areaStyle: {
                color: ['#343940']
              }
          },
          
        }, 
      ],
      series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            itemStyle: {
              normal: {
                color : "#BE9F64",
                areaStyle: 
                { 
                  color: '#BE9F64',
                  opacity:0.3,
                }
              }
            },
            data: [
              {
                value: numData,
                name: ''
              }
            ]
        },
        
      ]
  });

  },
  /********************
 * 滚动条在Y轴上的滚动距离 
 *******************/
  getScrollTop(){
    let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if(document.body){
    bodyScrollTop = document.body.scrollTop;
    }
    if(document.documentElement){
    documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
  },
  // 文档的总高度
  getScrollHeight(){
    let scrollHeight = 0,height1=0,height2=0;
    if(document.body){
    height1 = document.body.scrollHeight;
    }
    if(document.documentElement){
    height2 = document.documentElement.scrollHeight;
    }
    scrollHeight = (height1 - height2 > 0) ? height1 : height2 ;
    return scrollHeight;
  },
  // 浏览器视口的高度
  getWindowHeight(){
    let windowHeight = 0;
    if(document.compatMode == "CSS1Compat"){
      windowHeight = document.documentElement.clientHeight;
    }else{
      windowHeight = document.body.clientHeight;
    }
    return windowHeight;
  },
  isWeChatApplet(){
    const ua = window.navigator.userAgent.toLowerCase();
    return new Promise((resolve) => {
      if (ua.indexOf('micromessenger') == -1) {//不在微信或者小程序中
        resolve(false);
      } else {
        wx.miniProgram.getEnv((res) => {
          if (res.miniprogram) {//在小程序中
            resolve(true);
          } else {//在微信中
            resolve(false);
          }
        });
      }
    }); 
  },
  goWxPath(url){
    wx.miniProgram.navigateTo({url: url});
  },
  // 兼融ios12 键盘谈起后
  ios12() {
    let myFunction
    let isWXAndIos = this.isWeiXinAndIos()
    if (isWXAndIos) { // 既是微信浏览器 又是ios============（因为查到只有在微信环境下，ios手机上才会出现input失去焦点的时候页面被顶起）
      document.body.addEventListener('focusin', () => { // 软键盘弹起事件
        clearTimeout(myFunction)
      })
      document.body.addEventListener('focusout', () => { // 软键盘关闭事件
        clearTimeout(myFunction)
        myFunction = setTimeout(function() {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'})// 重点  =======当键盘收起的时候让页面回到原始位置
        }, 200)
      })
    }
  },
 isWeiXinAndIos() {
    // window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    let ua = '' + window.navigator.userAgent.toLowerCase()
    // 通过正则表达式匹配ua中是否含有MicroMessenger字符串且是IOS系统
    let isWeixin = /MicroMessenger/i.test(ua) // 是在微信浏览器
    let isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua) // 是IOS系统
    return isWeixin && isIos
  }
}; 
export function isJson(obj){
  let isJson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;   
  return isJson;
}; 







export default util
