<template>
  <div class="fold-card"> 
    <div v-for="(item,index) in foldList" :key="item.id"  class="fold-item"> 
      <div class="item-tit flex-float-top">
        <div class="fold-top flex flex-center-top">
          <img :class="'img-left  icon'+item.icon" :src="'./static/image/fold-'+item.icon+'.png'" alt="">
          <h3 class="flex1">{{item.title || item.name}}</h3>
        </div> 
        <img @click="transCard(index,$event)" :class="['img-right',index===0?'arrow-up':'arrow-down']" src="../../../static/image/arrow-down.png"  alt="" >
      </div>
      <div :class="['blockquote-box',{'hide':index!==0}]"> 
        <blockquote class="fold-item-con" :data-num="index" >
            <!-- {{item.content}} -->
            <div  v-html="item.content || item.summary"></div>
            <img v-if="item.poster" :src="item.poster" />
        </blockquote> 
      </div>
    </div>
  </div>
</template>
 
<script>
  export default {
    name: 'fold-card',
    props: ['foldCardList'],
    data() {
      return {
        arrowUrlDown: "./static/image/arrow-down.png", 
        arrowUrlUp: "./static/image/arrow-up.png",
        // foldList:this.foldCardList
      };
    },
    created: function () {
       
    },
    mounted:function(){
    // 获取高度
    let that =this; 
    },
    methods: {
      transCard: function (index, event) {
        let target = event.currentTarget,
          conDom = target.parentNode.nextElementSibling,
          imgSrc = target.getAttribute("class"); 
          let domHeight = conDom.querySelector(".fold-item-con").clientHeight;
        
        if (imgSrc.includes("arrow-down")) {  
          conDom.style.height=domHeight+'px';
          target.setAttribute("class",'img-right arrow-up')
         // conDom.style.display = "block";
        } else {
          if(index===0){ 
            conDom.style.height=domHeight+'px';
            setTimeout(()=>{ 
              conDom.style.height='0px'  
            },0)
          }else{
          conDom.style.height='0px'  
          }
          target.setAttribute("class",'img-right arrow-down')
         // conDom.style.display = "none";
        } 
      },
    },
    computed: { 
      foldList(){
         this.foldCardList.forEach(val => {
           if(val.summary) {val.summary = val.summary.replace(/\n|\r\n/g,"<br/>");}
           if(val.content) {val.content = val.content.replace(/\n|\r\n/g,"<br/>");} 
        });
        return  this.foldCardList
      }
    }, 
  };
</script>
