<template>

  <!-- <div :class="['dialog-bg',{'bg-show':dialogStatus.dialogStatus}]">  -->
    <div :class="['dialog-box',{'dialog-hide':!dialogStatus.dialogStatus}]">
      <div class="bg"></div>
      <div class="flex-float dialog-top">
        <h3>{{dialogInfo.title}}</h3>
        <img @click="closeFamous" src="../../../static/image/close-gray.png" alt="">
      </div>
      <div v-if="dialogInfo.type === 1">
        <ul v-if="dialogData.length>0" class="dialog-list">
          <li v-for="(item,index) in dialogData" :key="index" class="flex-center">
            <img :src="item.head_img" alt="">
            <div class="flex1">
              <h4>{{item.name}}</h4>
              <p class="text-gray">{{item.summary}}</p>
            </div>
          </li>
        </ul>
        <p v-else class="none-text"> 暂无数据</p> 
      </div>

      <div v-else-if="dialogInfo.type === 2">
        <ul v-if="dialogData.length>0" class="dialog-list">
          <li v-for="item in dialogData" :key="item.id" class="flex-center">
            <p class="text-item">{{item}}</p>
          </li>
        </ul>
        <p v-else class="none-text"> 暂无数据</p> 
      </div>
    </div>


   
  <!-- </div> -->
</template>
<script>
export default {
  name: 'famous', 
  props: ['dialogData','dialogInfo'],
  data() {
    return {
      dialogStatus : this.$store.state.dialog, 
    };
  },
  created:function(){ 
  },
  methods:{ 
    closeFamous(e){
      this.$store.dispatch('switchDialog');
      this.util.scrollMove();
      e.stopPropagation();
    }
  },
  computed:{

  },

};
</script>
