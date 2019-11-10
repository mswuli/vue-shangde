<template>
  <div class="page-textList"> 
      <router-link :to="{name:'download'}"  v-for="item in listDataComputer" :key="item.id"  class="textList-item">
        <h3> {{item.title}} </h3>
        <p v-if="listType==='interview'" class="text-gray">受访者：{{item.name || "匿名"}}</p>
        <blockquote class="text-overflow2" v-html="item.summary || item.content || '暂无数据'"></blockquote>
        <div class="flex-float">
          <!-- <span class="text-gray">已看</span> -->
          <!-- <span class="text-gray"> 。。。</span> -->
        </div>
      </router-link> 
  </div>
</template>
 
<script>
export default {
  name: 'page-textList',
  props: ['listData', 'listType'],
  data() {
    return {

    };
  },
  created: function () {},
  methods: {

  },
  computed: {
    listDataComputer(){
      this.listData.forEach(val => {   
        let regx1 =/<li><p>/g;
        let regx2 =/<\/p><\/li>/g;
        val.summary = val.summary && val.summary.replace(regx1,"<li>").replace(regx2,"</li>").replace(/\n|\r\n/g,"<br/>"); 
        val.content = val.content && val.content.replace(regx1,"<li>").replace(regx2,"</li>").replace(/\n|\r\n/g,"<br/>"); 
      }); 
    return this.listData
    }
  },

};
</script>
