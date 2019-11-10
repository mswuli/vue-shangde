<template>

  <div class="college-box">   
    <div class="college-wrap"> 
      <div  
        v-for="(item,index) in tabListComputed" :key="item.id"  
        :class="[index===swiperNum ?'collegelist active':'collegelist', {'full':tabListComputed.length<=1}]"
        @click="navGoToDetail('insdetail',{id:item.id})"
        >
        <img class="seal" src="../../../static/image/seal.png" alt="">
        <div class="flex-center">
          <img class="collegelist-bg" :src="item.thumb" alt="">
          <div class="flex1">
            <h3>{{item.name || 暂无数据}}</h3>
            <div class="collegelist-tips">
              <span v-for="(label,index) in item.label" v-if="index<3" :key="index"> {{label || 暂无数据}}</span> 
            </div>
            <div class="college-info-line flex-center">
              <span>学费 :</span>
              <i class="currency">¥</i>
              <p class="" v-if="item.maxPrice !== item.minPrice">{{item.minPrice}}-{{item.maxPrice}}</p>
              <p class="" v-else>{{item.maxPrice}}</p>
            </div>
            <div class="college-info-line flex-center">
              <span>难度 :</span>
              <p class="start"  v-for="(starItem,starIndex) in 5" :key="starItem"> 
                <img  v-if="item.difficulty>=starIndex+1" src="../../../static/image/strat.png" alt="">
                <img class="border" v-else src="../../../static/image/strat-border.png" alt="">
                <!-- <i  v-if="item.difficulty>=starIndex+1">★</i>
                <i  v-else>☆</i>  -->
              </p>
            </div>
            <!-- <div class="apply-nums flex1 flex-float-bottom">
              <div class="nums-list">
                <p class="" v-if="item.maxPrice !== item.minPrice">￥{{item.minPrice}}-{{item.maxPrice}}</p>
                <p class="" v-else>￥{{item.maxPrice}}</p>
                <span>价格区间</span>
              </div> 
              <div class="nums-list">
                <span class="start"  v-for="(starItem,starIndex) in 5" :key="starItem">
                  <i  v-if="item.difficulty>=starIndex+1">★</i>
                  <i  v-else>☆</i> 
                </span>
                <span class="span-block">MBA录取难度</span>
              </div> 
            </div> -->
          </div>
        </div>  
        <div class="college-dec text-overflow3" v-html="item.summary || 暂无数据"> 
        </div>
 
      </div>  
      
    </div> 

  </div>
</template>

<script>
  export default {
    name: 'collegelist',
    props: ['collegeList','swiperNum'],
    data() {
      return { 
        showStatusCol: true,
        arrowUrl: "./static/image/duble-arrow-down.png", 
        collegeTop:0
      };
    },
    created: function () { 
    },
    mounted: function () { 
      this.collegeTop = document.querySelector(".college").offsetTop
    },
    methods: {
      loadMore: function () { 
        if (this.arrowUrl.includes("duble-arrow-down")) {
          this.arrowUrl = "./static/image/duble-arrow-up.png"
          this.tabList = this.collegeList;
        } else {
          this.arrowUrl = "./static/image/duble-arrow-down.png"
          this.tabList = [this.collegeList[0]]; 
          document.body.scrollTop=this.collegeTop;
        }
      },
      navGoToDetail(name,data){  
        if(this.GLOBAL.SETING_ENV.includes("prod")){
          MtaH5.clickStat('collegelist',{'id':data.id}) 
        }
        this.$router.push({name: name, params: data}); 
      }
    },
    computed: {
      tabListComputed: function () {
        let that = this; 
        that.collegeList.universityList.forEach((val) => {   
          val.maxPrice = Number(val.max_price) && that.util.format(val.max_price).replace('万','w');
          val.minPrice = Number(val.min_price) && that.util.format(val.min_price).replace('万','w');
          val.registrations = val.registrations>=0?val.registrations:0;
          val.applyNum  = Number(val.registrations) && that.util.format(val.registrations).replace('万','w');
          val.summary = that.util.replaceStr(val.summary);
        })
        return that.collegeList.universityList
      }
    },
    watch: { 
    },

  };
</script>

