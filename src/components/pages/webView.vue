<template>
  <div class = "webView">
    <!-- <m-headerbar :pageInfo="pageInfo"></m-headerbar> -->
    <iframe  :src="webLink" frameborder="0"></iframe>
  </div>
</template>
<script>
import MHeaderbar from '@/components/common/header'
export default { 
    name: 'webview',
    data() {
      return {
        webLink:'',
        pageInfo: {
          name: "webview",
          title: "资讯详情"
        },
        id:'',
        loginInfo:'',
      };
    },
    components:{
      MHeaderbar
    },  
    created(){
			//this.util.wxChatShare(this);
      this.loginInfo = this.util.getItem("fe-mbaUser");
      this.id = this.$route.params.id;
      this.webLink = `https://smallprogram.sunlands.com/education-app/news/index.html?id=${this.id}
        &sessionKey=${this.loginInfo.sessionKey}
        &userId=${this.loginInfo.userId}
        &stuId=${this.loginInfo.stuId}`;
    }
}
</script>
