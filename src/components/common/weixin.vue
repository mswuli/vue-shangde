<template>

  <div class="weixin-box" v-show="weixinStatus.weixinStatus" @click="swichWeixin">  
    <img class="wx-share-icon1" src="../../../static/image/wx-share-icon1.png" alt="">
    <img class="wx-share-icon2" src="../../../static/image/wx-share-icon2.png" alt="">
    <img class="wx-share-icon3" src="../../../static/image/wx-share-icon3.png" alt="">
  </div>
</template>

<script> 
  export default {
    name: 'weixin',
    props: [""],
    data() {
      return {
        weixinStatus: this.$store.state.weixin,
      };
    },
    created() {},
    mounted: function () {

    },
    methods: {
      swichWeixin() {
        this.share()
      }
    },
    computed: {

    },

  };
</script> 
