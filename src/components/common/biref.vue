<template>
  <div class="biref">  
    <div class="biref-item" v-for="item in birefListComputed" :key="item.id" @click="toDetail(item.id,type)">
        <h3 class="text-overflow">{{item.title}}</h3>
        <div class="flex-float">
          <p class="time">发布时间：<span> {{item.created_at || item.date}}</span></p> 
          <!-- <p class="views-num"><span>{{item.viewNum || 0}}</span>人浏览</p> -->
        </div>
    </div> 
  </div>
</template>

<script> 
  export default {
  name: 'biref',
  props: ['birefList', "type"],

  data() {
    return {
      list: [],
      allLoaded: false,
      loginInfo: this.util.getItem("fe-mbaUser"),
    };
  },
  created: function () {},
  mounted: function () {},
  methods: {
    async toDetail(id, type) {
      let that = this;
      that.loginInfo = that.util.getItem("fe-mbaUser");
      if (type === 1) { 
        if (that.loginInfo) { 
         that.$router.push({name:'webView',params:{id:id}})
        } else {
          that.$store.dispatch('swichLogin');
          that.util.scrollStop();
        }


      } else {
        that.$router.push({
          name: 'download' 
        })
      }
    }
  },
  computed: {
    birefListComputed() {
      let that = this;
      that.birefList.forEach((val) => {
        val.viewNum = that.util.format(val.viewNum);
      })
      return that.birefList
    }
  }, 
}; 
</script>
