<template> 
  <div v-if="type==='top'" class="alumna-box">
    <div :class="['alumna-wrap',{ 'wrap-full': famousList.length<=1 }]"> 
      <div v-for="(item,index) in famousList" :key="index" :class="[index===swiperNum ?'alumna-item active':'alumna-item' , { 'full': famousList.length<=1 }]">
        <div class="flex-center alumna-top">
          <img :src="item.head_img" alt=""> 
          <p>{{item.name}}</p>
        </div>
        <blockquote class="alumna-dec" v-html="item.summary"></blockquote>
      </div> 
    </div>
  </div>
  <div v-else class="alumna-more flex-float">
    <div class="alumna-avatar flex-float">
      <img  v-for="(item,index) in famousList" v-if="index<5" :key="index" :src="item.head_img" alt=""> 
    </div>
    <p>查看全部{{famousList.length}}名优秀校友 ></p>
  </div>
  
</template>

<script> 
  export default {
  name: 'famousList',
  props: ['famousList','swiperNum','type'],

  data() {
    return { 
    };
  },
  created: function () {},
  mounted: function () {},
  methods: { 
    
  },
  computed: { 
  }, 
}; 
</script>
