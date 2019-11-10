<template> 
   <div class="swiper">
      <mt-swipe ref="swipe" v-if="type==='index'" :show-indicators="false" :auto="3000"  @change="swiperChange">
         <mt-swipe-item class="bg-bottom-text"  v-for="(item,index) in swipers" :key="item.name" v-if="index<=4"> 
            <img class="swipe-bg" :src="item.image" alt="" @click="pathTo(item.url)" >
            <!-- <div class="swipe-text">
              <h3 class="text-overflow2" v-if="item.title !=''"> {{ item.title }}</h3>
              <p v-if="item.summary !=''" class="text-overflow" v-html="item.summary">  </p>
            </div> -->
          </mt-swipe-item> 
      </mt-swipe>  
      <mt-swipe ref="swipe" v-else-if="type==='detail'" :show-indicators="false" :auto="3000"  @change="swiperChange">
         <mt-swipe-item class="bg-bottom-text"  v-for="(item,index) in swipers" :key="item.name" v-if="index<=4"> 
            <img v-if="item.type === '1'" class="swipe-bg" :src="item.url" alt="">
            <div v-else class="swiper-video">
                <img class="swipe-bg" :src="item.thumb" alt="" >
                <img class="absolute-center play" @click="play(item.url)" src="../../../static/image/play.png" alt="">
            </div> 
          </mt-swipe-item> 
      </mt-swipe> 
  </div>
</template>

<script> 
  import evenBus from '../../assets/js/even-bus'
  export default {
    name: 'swiper',
    props: ['swiperList','type'],
    data() {
      return {
        swipers: this.swiperList
      }
    },
    methods: {
      pathTo(url) { 
        if (url) { 
          if(!url.includes("://")){ url = "//"+url}
          window.location.href = url;
        } else {
          this.$router.push({
            name: 'download'
          })
        }
      },
      play(url){  
        evenBus.$emit('sendUrl', url)
      },
      swiperChange(index){ 
        this.$emit('swiperChange', index)
      }
    },
    computed: {

    },
  }
</script>
 
