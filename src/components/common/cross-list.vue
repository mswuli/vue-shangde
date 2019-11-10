<template>
  <div class="item-con show">
		<div v-for="(item,index) in crossList" :key="index" class="teacher-item">
			<img :src="item.poster" alt="">
			<div class="flex1 teacher-dec">
					<h3>{{item.name}}</h3>
					<p v-html="item.summary"></p>
			</div>
		</div>    
	</div>
  
</template>

<script> 
  export default {
  name: 'crossList',
  props: ['crossList'],

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
