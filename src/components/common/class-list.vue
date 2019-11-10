<template> 
  <div v-show="publicData.length" class="class-list"> 
    <router-link :to="{name:'download'}"  v-for="(item,index) in publicData" :key="item.id" v-if="index===0" class="list-top">
      <img class="list-top-bg" :src="item.poster_img" alt="">
      <div class="bottom-text">
        <h3 class="text-overflow">{{item.title}}</h3>
        <p class="text-overflow2">{{item.detail}}</p>
      </div>
    </router-link>
    <router-link :to="{name:'download'}" v-for="(item,index) in publicData" :key="item.id" v-if="index>0" class="list-item flex-float-top">
      <img class="list-item-img" :src="item.poster_img" alt="">
      <div class="flex1">
        <div class="flex-center">
          <h3 class="flex1 text-overflow">{{item.title}}</h3>
          <!-- <span v-if="item.present_price <= 0">限免试听</span> -->
          <span>限免试听</span>
        </div>
        <p class="text-overflow2">{{item.detail}}</p>
      </div>
    </router-link>
      
  
   

  </div>
</template>

<script>
export default {
  name:"",
  props:["publicList"],
  data(){
    return{
      publicData : this.publicList,
      showStatusPub:true
    }
  },
  created:function(){ 
    
  },
  mounted:function(){
     
  },
  methods:{
    
  },
  computed:{

  },
}
</script>

<style>

</style>

