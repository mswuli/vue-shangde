<template>
  <div id="app">  
    <navigation>
      <router-view> 
      </router-view>  
    </navigation>
    <m-weixin></m-weixin>
    <m-login></m-login>  
    <img v-if='goHomeStatus'  class="go-home" src="static/image/go-home.png" @click="goHome" alt="">
    <m-video-play></m-video-play>
  </div>
</template>

<script>
import MWeixin from '@/components/common/weixin' 
import MLogin from '@/components/common/login'
import MVideoPlay from '@/components/common/video-play'
export default {
  name: 'App',
  data(){
    return{
      loginInfo:{},
      goHomeStatus:false,
    }
  },
  components:{
    MWeixin,
    MLogin,
    MVideoPlay
  },
  created(){
    // 超时清除 session  
    let that = this; 
    that.loginInfo = that.util.getItem("fe-mbaUser"); 
    that.util.sharePage = that.$router.history.current.name;
    let nowData = new Date().getTime();
    let timeOut = 86400000*30; 
    if( that.loginInfo &&  that.loginInfo.time){ 
      if(that.loginInfo.time+timeOut<=nowData){
        localStorage.removeItem("fe-mbaUser"); 
      }
    };  
    // 进入页面判断
    let wxShare = that.util.getUrlParam("from");  
    if(wxShare && that.util.sharePage!=='index'){
      that.goHomeStatus=true;
    }
    let currentPage = that.$router.history.current.name;
    console.log(currentPage)
    if(currentPage === "insdetail"){
      document.querySelector("title").textContent = "院校详情"  
    }else if(currentPage === "waterfalls"){
      document.querySelector("title").textContent = "院校风采"  
    }else if(currentPage === "schoolList"){
      document.querySelector("title").textContent = "院校列表"  
    }else if(currentPage === "abroadServer"){
      document.querySelector("title").textContent = "留服认证"  
    }else{
      document.querySelector("title").textContent = "尚德国际"   
    } 
    that.util.wxChatShare(that);
    that.$router.beforeEach((to, from, next) => {  
      if(to.name === "insdetail"){
        document.querySelector("title").textContent = "院校详情"  
      }else if(to.name === "waterfalls"){
        document.querySelector("title").textContent = "院校风采"  
      }else if(to.name === "schoolList"){
        document.querySelector("title").textContent = "院校列表"  
      }else if(to.name === "abroadServer"){
        document.querySelector("title").textContent = "留服认证"  
      }else{
        document.querySelector("title").textContent = "尚德国际"   
      }    
      if(that.GLOBAL.SETING_ENV === "prod") {
        MtaH5.pgv();
        MtaH5.clickStat('pv',{'page': to.path})  
      } 
      let historyName = that.$router.history.current.name; 
      if(historyName === "schoolList" || historyName==="insdetail"){
        window.onscroll = null;  
      } 
      //判断分享的页面显示goHomeStatus 
      let wxShare = that.util.getUrlParam("from");   
      if(that.util.sharePage!=='index' && wxShare!== undefined && wxShare!== null && to.name === that.util.sharePage){  
        that.goHomeStatus=true;
      }else{
        that.goHomeStatus=false;
      }
      // 更新微信分享参数  
      that.util.wxChatShare(that,to);
      //  所有的弹窗关闭    
      that.util.scrollMove("index");
      that.$store.dispatch('closeDialog');
      that.$store.dispatch('closeLogin');
      that.$store.dispatch('closeWeixin');
      that.$store.dispatch('closeVideoPlay');
      //后退 
      next();
    });
    // navigation
  
  },
  mounted(){
    try {
      if(this.GLOBAL.SETING_ENV === "prod") {
        MtaH5.pgv(); 
      }
    } catch (e) { }
  },
  methods:{
    goHome(){
       let urlString = location.href.replace("from=","shareOverTime=");
        urlString = urlString.split('#')[0]
        location.href = urlString;
    },
    
  }
}
</script>

 
