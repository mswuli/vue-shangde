
<template>
  <div> 
    <header v-if="navInfo.name==='index'" class="headerbar" fixed title="">
      <!-- <div  > 
        <img src="../../../static/image/back.png" alt="">
      </div>
      <div icon="more"  >
        <h1>每个成功者都有一个开始</h1>
        <p>Every successful person has a beginning.</p>
      </div> -->
      <img class="headebar-bg" src="../../../static/image/header.png" alt="">
    </header>

    <!-- 其他页面 -->
    <header v-else class="headerbar headerbar-div flex-float" > 
      <div @click="routerBack" class="back" >
        <img src="../../../static/image/back.png" alt="">
      </div> 
        <h1 class="flex1"> {{navInfo.title}} </h1>
      <div @click="share"  class="share" > 
        <img src="../../../static/image/share.png" alt="">
      </div>
    </header>
  </div>
 
</template>
<script>
  export default {
    name: 'headerbar',
    props: ["pageInfo"],
    data() {
      return {
        navInfo: '',
        fromWx:false,
      };
    },
    created: function () {
      this.navInfo = this.pageInfo;
      this.fromWx = this.util.fromWx
    },
    methods: {
      routerBack: function () { 
        let wxShare = this.util.getUrlParam("from");  
        if(wxShare!== undefined && wxShare!== null && this.$router.history.current.name === this.util.sharePage){  
          let urlString = location.href.replace("from=","shareOverTime=");
          urlString = urlString.split('#')[0]
          location.href = urlString;
        }else{
         this.$router.back(-1)
        }
      },
      share: function () {
        this.share()
      }, 
    },
    computed: {

    },

  };
</script> 