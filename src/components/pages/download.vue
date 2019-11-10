<template>
  <!-- <mt-button >按钮</mt-button>  -->
  <div class="page-download">    
     <img src="../../../static/image/download.png" alt="">
     <div class="down-btn" @click="goDownLoad"></div>
  </div>


	
</template>

<script>     
  export default {
    name: 'download',
    data() {
      return {}
    },
    components: {},
    created: function () {
      //this.util.wxChatShare(this);
    },
    mounted: function () {},
    methods: {
      // 方法  
      goDownLoad() {
        if (this.util.isAndroid) {
          this.openApp("https://www.pgyer.com/mURT")
        } else {
          this.openApp("https://itunes.apple.com/cn/app/id1435875496?mt=8")
        }
      },
      openApp(src) {
        window.location = src;
      }
    },
    computed: {

    },
  } 
</script> 