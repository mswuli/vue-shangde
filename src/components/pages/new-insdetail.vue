<template> 
  <div class="page-new-insdetail" v-show="pageShow">  
    <!-- <transition name="slide-top"> 
      <m-navbar v-show="navShow" ></m-navbar> 
    </transition> -->
    <!-- 轮播图 -->
    <div class="section section-swiper"  v-if="presenceList.length>0" >
      <m-swiper  v-if="swiperReset" :swiperList="swiperList" v-on:swiperChange="swiperChange" type='detail'></m-swiper>   
      <div class=" flex-center-end swiperNav"> 
          <div v-for="(item,index) in presenceList" :key="index" :class="{'active':index===categoryActive}" @click="changeCategory(index,item.catId)"> {{item.catName}}</div> 
          <div @click="navGoToDetail('waterfalls',{id:unInfo.id},unInfo.photoNum)">全部</div>
          <div>{{swiperIndex}}/{{swiperList.length}}</div>
      </div>
    </div>

    <!-- 详情卡片 -->
    <div :class="['section','section-dec',{'negative':swiperList.length>0}]"> 
      <div class="flex-float dec-top">
        <div class="dec-top-left flex1">
          <div class="flex-float">
            <div class="flex-center dec-title flex1">
              <img  :src="unInfo.share_image" alt="">
              <p class="flex1">
                <b>{{unInfo.name}}</b>
                <span class="text-gray2">{{unInfo.name_en}}</span>
              </p>
            </div> 
            
            <div class="dec-top-right">
              <b>{{minPrice}}</b>
              <p class="text-gray2">最低价格</p>
            </div>

          </div>
          <div class="flex-center-wrap tips" >
            <span v-for="(item , index) in unInfo.label" :key="index">{{item}}</span> 
          </div>
        </div>
      </div>
      
      <div class="blockquote-box">
        <div class="dec-blockquote"> 
          <blockquote class="blockquote-dom" v-html="unInfo.summary || '暂无数据'"></blockquote> 
        </div>
        <span v-if="slideMore" class="slide-more" @click="slideInfo">
          <img  src="../../../static/image/arrow-down.png" :class="arrowUrl" alt="">  
        </span> 
      </div>
      
      <!--热点滚动 -->
      <div v-if="hotQuestion.length>0" class="scroll-container" @click="greatbear"> 
        <ul :class=" {anim:animate==true}">
          <li v-for='(item,index) in hotQuestion' v-if="index<=1" :key="index" class="flex-float scroll-item" >
            <div class="flex-center">
              <img  :src="item.avatar || 'https://wxapp-1254383113.file.myqcloud.com/69314799197936.jpg'" alt="">
              <p>{{item.content}}</p>
            </div>
            <p><span>{{unInfo.consultant_num}}人</span>正在咨询</p>
          </li>
        </ul>  
      </div>
    </div>

    <!-- 院校特色 -->
    <div class="section section-feature" v-if="features.length>0 || majorPic || teacherList.length>0 ||dialogData.length>0 ">
      <h2><span>院校特色</span><p>School characteristics</p></h2>
      <!-- 核心亮点 -->
      <div class="fold-card" v-if="features.length>0"> 
        <div  class="fold-item" v-for="(item,index) in features" :key="index"> 
          <div class="item-tit flex-float-top">
            <div class="fold-top flex-center">
              <img  class="img-left icon1" src="../../../static/image/fold-detail-1.png" alt="">
              <h3 class="flex1">{{item.name}}</h3>
            </div>  
          </div>
          <blockquote v-html="item.summary || '暂无数据'" class="fold-item-con show"></blockquote> 
          <img  v-if="item.poster" class="item-poster" :src="item.poster" alt="" :preview="item.id">
        </div>
      </div>
      <!-- 可申请专业 -->
      <div class="fold-card" v-if="majorPic"> 
        <div  class="fold-item"> 
          <div class="item-tit flex-float-top">
            <div class="fold-top flex-center">
              <img  class="img-left icon1" :src="majorPic" alt="">
              <h3 class="flex1">可申请专业</h3>
            </div>  
          </div> 
        </div>
      </div>
      <!-- 师资团队 -->
      <div class="fold-card" v-if="teacherList.length>0"> 
        <div  class="fold-item"> 
          <div class="item-tit flex-float-top">
            <div class="fold-top flex-center">
              <img  class="img-left icon1 icon-teacher" src="../../../static/image/fold-detail-3.png" alt="">
              <h3 class="flex1">师资团队</h3>
            </div>  
          </div> 
          <m-cross-list :crossList="teacherList"></m-cross-list>
        </div>
      </div> 
      <!-- 优秀校友 -->
      <div class="fold-card" v-if="dialogData.length>0"> 
        <div  class="fold-item"> 
          <div class="item-tit flex-float-top">
            <div class="fold-top flex-center">
              <img  class="img-left icon1" src="../../../static/image/fold-detail-4.png" alt="">
              <h3 class="flex1">优秀校友</h3>
            </div>  
          </div> 
          <m-famous-list :famousList="dialogData" :swiperNum="swiperNum" type="top"></m-famous-list>
          <div  @click="dialogFamous">
            <m-famous-list :famousList="dialogData" :swiperNum="swiperNum" type="bottom"></m-famous-list>
          </div>
          
        </div>
      </div>
      
    </div>
    <!-- 综合指数 -->
    <div class="section section-fraction" v-if="indexes.length>0">
      <h2><span>综合指数</span><p>composite index</p></h2>
      <div class="fraction-chart"> 
        <button v-if="!isMiniProgram" @click="toPage">查看你的入学资格 ></button>
        <div id="fiveMap"></div>
      </div> 
      <ul class="sce-navbar flex-float">
        <li v-for="(item,index) in indexes" :key="index" :class="['navbar-item',  {'active':index===charNavActive}]" @click="swichCharCon(index)">{{item.name}}</li>  
      </ul> 
      <div class="fraction-tabbox">
        <div  v-for="(item,index) in indexes" :key="index" > 
          <transition name="fade">
            <!--  v-if="index===charNavActive" -->
            <div v-if="index===charNavActive" class="fraction-tab-con" v-html="item.summary || '暂无数据'"></div>  
          </transition>   
          <div v-if="index===charNavActive"  class="bg-hide"  v-html="item.summary || '暂无数据'"> </div> 
        
         </div>
      </div>
      
    </div>


    <!-- 认证与合作 -->
    <div class="section section-cooperation" v-if="cooperTabList.length>0">
        <h2><span>认证与合作</span><p>Authentication & cooperation</p></h2>
        <!-- 优化成大的循环 -->
        <div class="cooperation-wrap">
          <ul class="sce-navbar flex-center">
              <li v-for="(item,index) in  cooperTabList" :key="index" :class="['navbar-item',  {'active':item.type===cooperNavActive}]" @click="swichCooperCon(item.type)" >
                <p>{{item.name}}</p>
              </li>  
            </ul> 
            <div v-if="cooperNavActive === 1 && certification && certification.length>0 " class="cooper-tab"> 
              <div v-for="(item,index) in certification" :key="index" class="cooperation-tab-con1">
                <div class="flex-center cooperation-item">
                  <img v-if="item.logo" :src="item.logo" alt="">
                  <blockquote class="flex1">{{item.intro || '暂无数据'}}</blockquote>
                </div>
              </div>  

            </div> 
            <div v-if="cooperNavActive === 2 && partnerSchool && partnerSchool.length>0 " class="cooper-tab flex-center-wrap "> 
              <div  v-for="(item,index) in partnerSchool" :key="index"  class="cooperation-tab-con2">
                <img  :src="item.logo" alt="">
                <p class="text-overflow">{{item.name}}</p>
              </div> 

            </div>  
            <div v-if="cooperNavActive === 3 && partnerStrategic && partnerStrategic.length>0" class="cooper-tab">
              <div  v-for="(item,index) in partnerStrategic" :key="index"  class="cooperation-tab-con3">
                <blockquote  v-html="item.name" >asdasdasdasd</blockquote>
                <div class="flex-center con3-item" v-if="item.logo && item.intro">
                  <div class="item-img flex1" v-if="item.logo">
                    <img  :src="item.logo" alt=""> 
                  </div>
                  <blockquote v-if="item.intro" v-html="item.intro"></blockquote>
                </div>
              </div>
            </div> 


          
        </div>
    </div>  
    <!-- 名人弹窗 -->
    <m-dialogs :dialogData = dialogData :dialogInfo = dialogInfo></m-dialogs>
    <m-new-footer :isMiniProgram="isMiniProgram" :wxApplyID="wxApplyID"></m-new-footer>
  </div>


	
</template>

<script>     
  import MSwiper from '@/components/common/swiper'
  import MDialogs from '@/components/common/dialog'
  import MNewFooter from '@/components/common/new-footer'
  import MNavbar from '@/components/common/navbar'
  import MCrossList from '@/components/common/cross-list'
  import MFamousList from '@/components/common/famous-list' 
  export default {
    name: 'newInsdetail',
    data() {
      return {
        pageShow:false,
        swiperReset:true,
        unInfo:"",
        swiperList:[],  
        animate:false,
        videoUrl:"", 
        swiperNum: 0,   
        swiperIndex:1,
        presenceList:[],
        dialogInfo:{},
        dialogData:[],
        slideMore:false,
        slide:false,
        decHeight:0,
        arrowUrl:"arrow-down",
        navShow:false,
        charNavActive:0, 
        cooperTabList:[],
        cooperNavActive:1,
        certification:[],
        partnerSchool:[],
        partnerStrategic:[],
        teacherList:[],
        indexes:[],
        majorPic:'',
        timeInterval:'',
        hotQuestion:[],
        features:[],
        // 风采
        categoryList:[],
        categoryActive:0,
        isMiniProgram:false,
        wxApplyID:''
      }
    },
    components: {
      MSwiper,
      MDialogs,
      MNewFooter,
      MNavbar,
      MCrossList,
      MFamousList
    },
    beforeCreate: function () {
      this.Loading.open('加载中...');  
    },
    created: function () {  
      let that =this;
      that.chollegeId = that.$route.params.id; 
      that.util.isWeChatApplet().then((res)=>{
        that.isMiniProgram=res;
      });
      that.wxApplyID = that.util.getUrlParam("wxApplyID");  
    },
    mounted: function () {
      let that = this;
      this.getPageData().then(()=>{ 
      // 获取高度  
        that.pageShow=true;
        that.$nextTick(function () {   
          // 热点滚动
          if(that.hotQuestion.length>1){
            that.timeInterval = setInterval(that.scroll,2500)
          }
          let height1 = document.querySelector('.blockquote-dom').clientHeight;
          that.decHeight= document.querySelector('.dec-blockquote').clientHeight;  
          if(height1>that.decHeight+5){
            that.slideMore =true;
          }  
          setTimeout(() => {that.Loading.close();}, 0);
        }) 
        // 画图
        if(that.indexes.length>0){ 
          that.drawRadar();
        };
        window.addEventListener('scroll',this.winScroll); 
      });     
    },
    methods: {
      scroll(){
        this.animate = true
        setTimeout(() => {
          this.hotQuestion.push(this.hotQuestion[0]);
          this.hotQuestion.shift();
          this.animate= false;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
        },1300)
      },
      getPageData() {
        return new Promise(async (resolve,reject)=>{
          let that = this;
          let params = {
            id: that.chollegeId
          }
          const res = await that.$ajax.get("index.php?r=university/h5-info", params);
          let resData = res.data;
          if (resData.code === 0) { 
            resData = resData.universityInfo
            that.unInfo = resData; 
            that.presenceList = resData.presenceList;
            if( that.presenceList.length>0){ 
             that.changeCategory(0,that.presenceList[0].catId)
            }
            // 价格
            // hot_question 去空
             that.hotQuestion =  resData.hot_questions.filter((val)=>{
               return val.content.trim()!==''; 
             }) 
             that.features.push(...resData.features)
            // teacherList
           that.teacherList = resData.teacherList; 
            // bottom-tab1
            that.certification =resData.certification.filter((val)=>{
              return val.type === 1 && val.carts.length>0;
            })[0];
            // bottom-tab2
            that.partnerSchool =resData.certification.filter((val)=>{
              return val.type === 2 && val.carts.length>0;
            })[0];
            // bottom-tab3
            that.partnerStrategic = resData.certification.filter((val)=>{
              return val.type === 3 && val.carts.length>0;
            })[0];   
            if(that.certification && that.certification.carts.length>0){
              that.certification = that.certification.carts.filter((val)=>{
                return val.intro && val.logo
              })  
              if(that.certification.length<=0) return false;
              that.cooperTabList.push({name:"荣誉证书",type:1})
            }
            if(that.partnerSchool && that.partnerSchool.carts.length>0){
                that.partnerSchool = that.partnerSchool.carts;
                that.cooperTabList.push({name:"合作院校",type:2})
            }
            if(that.partnerStrategic && that.partnerStrategic.carts.length>0){
                that.partnerStrategic = that.partnerStrategic.carts;
                that.cooperTabList.push({name:"战略合作机构",type:3})
            }
            
            that.cooperNavActive = that.cooperTabList[0] && that.cooperTabList[0].type; 
            // 名人同学
            that.dialogData.length = 0;
            that.getFamous().then((data)=>{
              if(data.length>0){ 
              that.dialogData.push(...data); 
              } 
              that.$nextTick(function () { 
                if(that.dialogData.length>1){ 
                  let wrapDom = document.querySelector('.alumna-box');
                  let boxDom= document.querySelector('.alumna-wrap')
                  let listDom= document.querySelectorAll('.alumna-item')
                  that.util.swiperCross(that,wrapDom,boxDom,listDom,4);
                }
              })
            });
            // 可申请专业图片
            that.majorPic = resData.majorPic
            // 指数 
            resData.indexes.forEach((val)=>{
              val.summary = that.util.replaceStr(val.summary)
            })
            that.indexes.push(...resData.indexes); 
          } 
          that.$route.meta.share_image = resData.share_image
          that.util.wxChatShare(that,resData.share_image);
          resolve();
        }) 
      }, 
      //获取名人 列表
      getFamous() {
        return new Promise(async(resolve,reject)=>{
          let that = this;
          let params = {
            aid: that.chollegeId,
            start: 0,
            count: 1000
          }
          const res = await that.$ajax.get("index.php?r=university-celebrity/list", params); 
          let resData = res.data;
           if (resData.code === 0) { 
           
            resolve(resData.List) 
           }
        }) 
      },
      dialogFamous(){
        let that = this;
        that.dialogInfo.type = 1;
        that.dialogInfo.title = "优秀校友"; 
        if (that.dialogData.length > 0) {
          this.$store.dispatch('switchDialog')
        } else {
          that.Toast("暂无数据")
        }
        that.util.scrollStop();
      },
      // chart
      drawRadar(){
         let that = this,
         mapDom = document.querySelector('#fiveMap'),
         indicatorObj=[],
         numData = [];
        that.indexes.forEach((val,index)=>{ 
          if(index>4) return false;
          let obj={max: 5,color: '#BE9F64'};
          obj.text = val.name;
          indicatorObj.push(obj);
          numData.push(Number(val.star));
        })
        that.util.drawFiveStart(mapDom,indicatorObj,numData)
      },
      toPage(){
        this.$router.push({
          name: 'download'
        }) 
      },
      // chart 底部切换
      swichCharCon(index){ 
        this.charNavActive = index;
      },
      swichCooperCon(index){  
        this.cooperNavActive = index;
      },
      // 展开
      slideInfo(){ 
        this.slide = !this.slide;
        if(this.slide){ 
          let domHeight = document.querySelector('.blockquote-dom').clientHeight; 
          document.querySelector('.dec-blockquote').style.maxHeight=domHeight+'px';
          this.arrowUrl="arrow-up"
        }else{
          document.querySelector('.dec-blockquote').style.maxHeight = this.decHeight+'px';
          this.arrowUrl="arrow-down"
        }
      },
      //swiperChange
      swiperChange(index){
        this.swiperIndex = index+1;
      },
      // 获取风采图片及视频
      // async getCategory(){
      //   let that = this;
      //   let params = {
      //     aid: that.chollegeId
      //   }
      //   const res = await that.$ajax.get("index.php?r=university-photo/category-list", params);
      //   let resData = res.data;
      //   if (resData.code === 0) {
      //     let cateList = resData.categoryList, 
      //     categoryObj = {};
      //    // that.categoryList = resData.categoryList; 
      //     // 获取所有图片
      //     if(cateList.length<=0) {setTimeout(() => that.Loading.close(), 0);return false;}
      //     cateList.forEach(async (val,index)=>{
      //       let res = await that.getCategoryPhoto(val.id); 
      //       if(res.length<1) return false;
      //       categoryObj.name = val.name;
      //       categoryObj.id = val.id;
      //       categoryObj.list = res; 
      //       that.categoryList.push(categoryObj);  
      //       if(index+1>=cateList.length){  
      //         setTimeout(() => that.Loading.close(), 0);
      //         if(that.categoryList.length>0){ 
      //           that.changeCategory(0,that.categoryList[0].id)
      //         }
      //       }
      //     }) 
      //   }
      // },
      // // 风采图片
      // async getCategoryPhoto(id){ 
      //  let that = this;
      //  //that.categoryActive = index;
      //   let params = {
      //     aid: that.chollegeId,
      //     start:0,
      //     count:1000,
      //     cid:id,
      //     type:0
      //   }
      //   const res = await that.$ajax.get("index.php?r=university-photo/list", params);
      //   let resData = res.data;
      //   if (resData.code === 0) {  
      //     return resData.photoList
      //   }
      // },
      changeCategory(index,id){ 
        let that =this;
        that.swiperReset = false;
        that.swiperList.length = 0; 
        that.swiperIndex = 1;
        that.categoryActive = index; 
        let res = that.presenceList.filter((val)=>{
          return val.catId === id
        })[0]; 
        that.swiperList.push(...(res.photos||[])); 
        that.$nextTick(() => {
          that.swiperReset=true;
        })
        
      },
       // 风采跳转
      navGoToDetail(name,data,length){
        if(length<=0){
          this.Toast("暂无内容")
          return false
        }   
        this.$router.push({path: name, query: data});
      }, 
      winScroll(e){  
        var decDom = document.querySelector('.section-dec');
        if(!decDom) return false;  
        let decDomTop = decDom.offsetTop-(document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTo); 
        if(decDomTop<-20){
          this.navShow=true;
        }else{
          this.navShow=false; 
        }
      }
    },
    computed: { 
      minPrice(){   
        return this.util.format(this.unInfo.min_price).replace("万",'w')
      }
    },
    beforeDestroy() { 
      window.clearInterval(this.timeInterval);
      window.removeEventListener('scroll',this.winScroll);
    },
    destroyed() { 
      window.clearInterval(this.timeInterval);
      window.removeEventListener('scroll',this.winScroll);
    }
  } 
</script>  