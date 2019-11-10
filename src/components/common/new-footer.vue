<template>
  <footer v-if="footerShow" class="new-footer flex-float">
    <div @click="share" class="footer-left">  
        <img src="../../../static/image/fold-detail-share.png" alt="">
        <p>分享</p> 
    </div>
    <div v-if="!isMiniProgram" class="footer-right flex-center" >
      <div class="btn-black" @click="applyPayEvent" >支付申请费</div>
      <div class="btn-gold" @click="applyEvent">立即申请</div>
    </div>
    <div v-else class="footer-right flex-center" >
      <div class="btn-black" @click="goWxPage" >支付申请费</div>
      <div class="btn-gold" @click="goWxPage('apply')">立即申请</div>
    </div>
  </footer>
</template>
 
<script> 
import wx from 'weixin-js-sdk';
export default {
  name: 'page-navbar',
  props: ['pageIndex','wxApplyID'],
  data() {
    return {
      loginInfo: '',
      isMiniProgram:true,
      footerShow:false,
    };
  },
  created: function () {
    let that =this;
    that.util.isWeChatApplet().then((res)=>{
      that.isMiniProgram=res;
      that.footerShow=true;
    }) 
  },
  methods: {
    applyEvent() {
      let that = this; 
      that.loginInfo = that.util.getItem("fe-mbaUser")
      if (that.loginInfo) {
        // 弹出申请
        that.$router.push({
            name: 'download'
          }) 
      } else {
        that.$store.dispatch('swichLogin');
        that.util.scrollStop();
      }
    },
    applyPayEvent(){
      let that = this; 
      that.loginInfo = that.util.getItem("fe-mbaUser")
      if (that.loginInfo) {
        // 跳转支付页面
        if(that.GLOBAL.SETING_ENV === "prod") {
          MtaH5.clickStat("payclick")
        }  
        window.location=`https://global.sunlands.com/frontend/web/pay/index.html?&sessionKey=${that.loginInfo.sessionKey}&userId=${that.loginInfo.userId}&tel=${that.loginInfo.fullTel}&returnUrl=https://global.sunlands.com/frontend/web/pay/return.html 
          `;
      } else {
        that.$store.dispatch('swichLogin');
        that.util.scrollStop();
      }
    },
    goWxPage(type){
      if(type==="apply"){
        console.log(this.wxApplyID)
        if(this.wxApplyID){
          this.util.goWxPath(`/pages/famous-school/school/apply-school?id=${this.wxApplyID}`) 
        }else{
          this.util.goWxPath(`/pages/famous-school/school/apply-school`)  
        }
      }else{
        this.util.goWxPath('/pages/famous-school/index/application-fee')  
      }
    }
     
  },
  computed: {

  },

};
</script>
