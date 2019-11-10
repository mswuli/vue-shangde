<template>
  <div class="comment" >  
      <div v-for="(item,index) in commentListComputed" :key="index" class="commen-item"> 
        <div  class="flex-center">
            <img :src="item.avatar" alt="">
            <div  class="flex1">
              <h4>{{item.name}}</h4>
              <p>{{item.created_at}}</p>
            </div>
        </div>
        <blockquote v-html="item.content" class="text"> 
        </blockquote>
      </div>
  </div>
</template>

<script> 
  export default {
    name: 'comment', 
    props: ['commentList'],

    data() {
      return { 
      };
    },
    created: function () { 
    },
    mounted: function(){
      
    },
    methods: { 
      
    },
    computed: {
      commentListComputed(){
        this.commentList.forEach(val => {
          val.content = val.content && val.content.replace(/\n|\r\n/g,"<br/>")
        });
        return this.commentList;
      }
    },

  };

</script>
