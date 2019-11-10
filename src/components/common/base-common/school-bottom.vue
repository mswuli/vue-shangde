<template> 
  <div class="school-bottom flex-float">
    <router-link :to="{name:'download'}" class="nav-item">
      <img src="../../../../static/image/school-icon1.png" alt="">
      <span>报考测评</span>
    </router-link>
    <div class="nav-item" @click="greatbear">
      <img src="../../../../static/image/school-icon2.png" alt="">
      <span>在线咨询</span>
    </div>
    <div class="nav-item" @click="call">
      <img src="../../../../static/image/school-icon3.png" alt="">
      <span>电话咨询</span>
    </div>
  </div> 
</template>
<script>
export default {
  name: 'schoolBottom', 
  props: [],
  data() {
    return { 
    };
  },
  created:function(){ 

  },
  
  mounted: function () {  
  
  },
  methods:{  
     
  },
  computed:{

  },  

};
</script>
