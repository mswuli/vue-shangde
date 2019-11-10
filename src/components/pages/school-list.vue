<template>
<div>
  <ul class="sce-navbar flex-float page-school-sce-navbar"> 
    <li :class="['navbar-item text-overflow navbar-item-area ', {'active':navActive===1}]" @click="pickClick"><i>{{areaName}}</i><i class="triangle-down"></i></li> 
    <li :class="['navbar-item', {'active':navActive===3}]" @click="swichTerm(1,3)">学费</li>
    <li :class="['navbar-item', {'active':navActive===4}]" @click="swichTerm(4,4)">难度</li>
    <li :class="['navbar-item', {'active':navActive===5}]" @click="swichTerm(5,5)">热度</li>
  </ul>
  <div class = "page-school-list" >  
    <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" @bottom-status-change="handleTopChange" class="loadmore" :bottomDistance="20">  -->
    <div v-for="(item,index) in schoolListComputed" :key="index" class="school-item">
      <img class="bg" v-if="item.poster_h5" v-lazy="item.poster_h5 || '../../../static/image/static/school-bg.png'" alt=""> 
      <div class="item-dec">
        <img src="../../../static/image/seal.png" alt="" class="seal">
        <h2  class="text-overflow">{{item.name}} <span>{{item.name_en}}</span></h2>
          <ul class="flex-center-wrap">
          <li v-for="(labelItem,labelIndex) in item.label" :key="labelIndex" class="gold-tips">{{labelItem}}</li> 
        </ul>
        <div class="dec-start flex-float">
          <div class="flex-center flex1">
            <span class="start-title">学费：</span>
            <span class="m1">¥</span>
            <span class="m2" v-if="item.maxPrice === item.minPrice">{{item.minPrice}}</span>
            <span class="m2" v-else>{{item.minPrice}}-{{item.maxPrice}}</span>
          </div>

          <div class="flex-center">
            <span class="start-title">难度：</span>
            <span class="start"  v-for="(starItem,starIndex) in 5" :key="starItem">
              <img  v-if="item.difficulty>=starIndex+1" src="../../../static/image/strat.png" alt="">
              <img class="border" v-else src="../../../static/image/strat-border.png" alt=""> 
            </span>
          </div> 
        </div>
        <blockquote class="dec-txt text-overflow6" v-html="item.summary"></blockquote>
        <div class="dec-bottom flex-float">
          <div class="text-gray flex-center">
            <img v-if="item.top3" src="../../../static/image/hot.png" alt="">
            <span>浏览人数：{{item.virtual_view_num}} </span>
          </div>
          <router-link :to="{name:'insdetail',params: {id: item.id}}" class="btn-gold"><i>了解更多信息</i><i class="triangle-right"></i></router-link>
        </div>
      </div>
    </div>  
    <p class="loading" v-if="loadShow">Loading....</p>  
  </div>
  <m-bottom-footer v-if="!popupVisible"></m-bottom-footer>
  <m-pick :popupVisible="popupVisible" @close="closePick" :slots="areaList" @change="onValuesChange" position="bottom"></m-pick>  
</div>
</template>
<script>  
import MPick from '@/components/common/base-common/ox-pick'
import MBottomFooter from '@/components/common/base-common/school-bottom'
export default { 
    name: 'webview',
    data() {
      return { 
        pageInfo: {
          name: "schoolList",
          title: "院校列表"
        }, 
        total:0,
        loadShow:true,
        navActive:1,
        areaName:'地区',
        popupVisible:false, 
        areaList:[
          {
            values: [],
            className:'area-pick',
            defaultIndex:2,
            flex:2
          }, 
        ],  
        universityList:[],
        pickNmae:"",
				photoNum: 0, 
        schoolParams:{
          area:'',
          sort:0,
          page:1,
          pageSize:5,
        } 
      };
    },
    components:{ 
      MPick,
      MBottomFooter
    },  
    beforeCreate: function () {
      this.Loading.open('加载中...');
    },
    async created(){ 
      let that = this;  
      await that.getSchoolList(); 
      window.onscroll = that.schoolScrollFun;
      that.$navigation.on('back', (to, from) => {  
        window.onscroll = that.schoolScrollFun;
      })
      that.$navigation.off('back', (to, from) => {  
      }) 
    },
    mounted: async function () {  
      let that =this;
      that.$navigation.on('back', async (to, from) => {
        if(to.route.name ==="schoolList"){  
          let param = {}; 
          param.area = that.schoolParams.area;
          param.sort = that.schoolParams.sort;
          param.page=1;
          if(that.universityList.length>5){
            param.pageSize = ((that.universityList.length/5)+1)*5;
          }  
          that.universityList.length = 0;
          await that.getSchoolList(param);  
          window.onscroll = that.schoolScrollFun ;
          that.$nextTick(function () { 
            window.scrollTo(0,that.scrollTop); 
          })
        } 
      })
		},
    methods:{  
      async getSchoolList(param){ 
        let that = this;
        that.loadShow=true;
        that.Loading.open('加载中...');
        let params = param || that.schoolParams;
        that.bottomStatus = 'loading';
				console.log(params);
        let res = await that.$ajax.get('index.php?r=university/search',params); 
        if(res.data.code === 0){
          let data = res.data; 
          that.areaList[0].values.length = 0;
          that.areaList[0].values.push({name:'全部',id:"all"})
          that.areaList[0].values.push(...data.areaList);
          that.universityList.push(...data.universityList); 
          that.total = data.total; 
        }else{ 
        }  
        that.bottomStatus = '';
        if(that.$refs.loadmore){
          that.$refs.loadmore.onBottomLoaded(); 
        }
        // 关闭loading
        that.loadShow=false;
        setTimeout(() => that.Loading.close(), 0)
      },
      async swichTerm(type,navNum){ 
        let that = this; 
        that.navActive =navNum; 
        if(type===0){ 
          that.schoolParams.area = '';
          //  that.areaName='地区'
        }
        that.schoolParams.page = 1;
        that.schoolParams.sort =type;
        that.universityList.length=0;
        await that.getSchoolList(); 
      },
      pickClick(){
        this.util.scrollStop();
        this.popupVisible = true;  
        this.$nextTick(function () {  
          let popupDom = document.querySelector(".mint-popup-bottom"); 
        })
      },
      closePick(){ 
        this.popupVisible = false  
        this.util.scrollMove();
      },
      async onValuesChange(data) { 
        let that = this;  
        that.navActive =1;
        that.areaName=data.name;
        if(data.id === 'all'){
          that.swichTerm(0,1);
          return false;
        }
        that.schoolParams.area=data.id;
        that.schoolParams.page = 1;
        that.schoolParams.sort =0;
        that.universityList.length=0;
        await that.getSchoolList(); 
      },  
      schoolScrollFun() { 
        let that = this;
        that.scrollTop = document.scrollingElement.scrollTop;  
        if(that.util.getScrollTop() + that.util.getWindowHeight() === that.util.getScrollHeight()){
          if(that.universityList.length>= that.total){
            return false;
          } else{  
            that.schoolParams.page+=1;
            that.loadShow=true;  
            that.getSchoolList(); 
          } 
    　　}
      }
    },
    computed: {
      schoolListComputed: function () {
        let that = this; 
        that.universityList.forEach((val) => {   
          val.maxPrice = Number(val.max_price) && that.util.format(val.max_price).replace('万','w');
          val.minPrice = Number(val.min_price) && that.util.format(val.min_price).replace('万','w'); 
          val.summary = that.util.replaceStr(val.summary);
        })
        return that.universityList
      }
    }, 
}
</script>
