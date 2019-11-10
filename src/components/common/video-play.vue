<template> 
    <div  v-if="videoPlayStatus.videoPlayShow"  class="video-wrap">
      <span class="close" @click="closeVideo">×</span>
      <video controls autoplay="autoplay"  class="absolute-center" >
        <source v-if="videoType === 'mp4'" :src="videoUrl" type="video/mp4" />
        <source v-else-if="videoType === 'flv'" :src="videoUrl" type="video/mp4" />
        <source v-else-if="videoType === 'ogg'" :src="videoUrl" type="video/ogg" />
        <!-- <source :src="videoUrl" type="video/flv"> -->
      </video>
    </div>  
</template>

<script>      
  import evenBus from '../../assets/js/even-bus'
  export default {
    name: 'videoPlay',  
    data() {
      return {
        videoPlayStatus: this.$store.state.videoPlay,
        videoUrl:'',
        videoType:'mp4',
      }
    }, 
    created: function () {
      let that =this;
       evenBus.$on('sendUrl', data => {
          this.videoUrl = data;
          let urlSplit=data.split(".");
          this.videoType = urlSplit[urlSplit.length-1] || 'mp4';
          console.log(this.videoUrl)
          that.$store.dispatch('switchVideoPlayShow'); 
        })
    },
    mounted: function () {
       
    },
    methods: {
      closeVideo(){ 
        let that =this;
        that.$store.dispatch('switchVideoPlayShow'); 
        that.videoUrl = ""; 
      }
    },
    computed: {

    },
  } 
</script> 