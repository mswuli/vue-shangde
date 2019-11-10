<template>
  <div class="page-navbar flex-float"> 
    <router-link :class=" pageIndex===1?'active navbar-item':'navbar-item' " to="/">首页</router-link> 
    <router-link :class=" pageIndex===2?'active navbar-item':'navbar-item' " to="/school-list">报考院校</router-link> 
    <router-link :class=" pageIndex===3?'active navbar-item':'navbar-item' " to="/abroad-server">留服认证</router-link> 
    <router-link :class=" pageIndex===4?'active navbar-item':'navbar-item' " to="/download">专业分类</router-link> 
  </div>
</template>
 
<script>
export default {
  name: 'page-navbar', 
  props: ['pageIndex'],
  data() {
    return {};
  },
  created:function(){ 
  },
  methods:{

  },
  computed:{

  },

};
</script>
