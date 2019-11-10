<template> 
  <mt-popup
    v-model="popupVisible"
    :closeOnClickModal="false" 
    :position="position">
    <ul class="pop-box"> 
      <div class="flex-float">
        <div class="pick-btn-cancel" @click="pickFun(0)">取消</div>
        <div class="pick-btn-sure" @click="pickFun(1)">确定</div>
      </div>
      <mt-picker :slots="slots" value-key="name" @change="valChange" > 
      </mt-picker>

    </ul>
  </mt-popup>
</template>
<script>
export default {
  name: 'famous', 
  props: ['popupVisible','slots',"position"],
  data() {
    return { 
      pickData:'',
    };
  },
  created:function(){ 

  },
  
  mounted: function () {  
  
  },
  methods:{  
    pickFun(type){
      if(type === 0){
        this.$emit('close'); 
      }else{
        // 执行数据筛选  
        this.$emit('change',this.pickData); 
        this.$emit('close'); 
      }
    }, 
    valChange(picker, values) {  
      this.pickData = values && values[0];
    },
  },
  computed:{

  },  

};
</script>
