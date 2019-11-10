<template>
  <!-- <mt-button >按钮</mt-button>  -->
  <div>
    <m-headerbar :pageInfo="pageInfo"></m-headerbar>
    <!-- 导航 -->
    <m-navbar :pageIndex="pageIndex"></m-navbar>
    <div class="page-index" @scroll="indexPageScroll"> 
    
      <!-- <mt-loadmore bottomDropText = "加载更多中" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> -->

        <!-- 轮播图 -->
        <m-swiper class="section" v-if="swiperList.length>0" :swiperList="swiperList" type="index"></m-swiper>

        <!-- 了解国际MBA --> 
        <section class="section mba-introduce" v-if="mbainfoList.length>0">
          <h2><span>了解国际MBA</span><p>Understand MBA</p></h2>
          <m-fold-card :foldCardList="mbainfoList"></m-fold-card>
        </section>


        <!-- 报考院校 --> 
        <section class="section college" v-if="areaList.length>0">
          <h2><span>报考院校</span><p>University for examinatio</p></h2>   
          <!-- 头部 Start -->
          <div v-for="(item,index) in areaList" :class="['college-sec',{'college-first':collegeActive===index}]" :key="index">
            <div v-if="areaList.length>1" class="change-sec" @click="nextArea(index,item.id)">  
              <div class="right-box">
                <p class="change-data "></p> 
              </div>
            </div> 
            <img class="area-bg" :src="item.thumb" alt="">
            <!-- 头部 END -->
            <!-- 排序 -->
            <!-- list -->
            <ul class="sce-navbar flex-float">
              <li :class="collegeClass===1?'navbar-item active':'navbar-item'" @click="collegeSearch(index,item.id,1)">价格</li> 
              <li :class="collegeClass===5?'navbar-item active':'navbar-item'" @click="collegeSearch(index,item.id,5)">热度</li>
              <li :class="collegeClass===2?'navbar-item active':'navbar-item'" @click="collegeSearch(index,item.id,2)">排名</li>
            </ul>  
              <m-college-list :collegeList="item.universityList" :swiperNum="swiperNum" ></m-college-list>   
            <div class="flex-float college-mark-box">
              <div class="college-mark">
                <img src="../../../static/image/c-mark-icon1.png" alt="">
                <p>出国游学</p>
              </div>
              <div class="college-mark">
                <img src="../../../static/image/c-mark-icon2.png" alt="">
                <p>课程安排</p>
              </div>
              <div class="college-mark">
                <img src="../../../static/image/c-mark-icon3.png" alt="">
                <p>报考要求</p>
              </div>
              <div class="college-mark">
                <img src="../../../static/image/c-mark-icon4.png" alt="">
                <p>师资团队</p>
              </div>
            </div>
          </div>
  
        </section>

        <!--选讲课&公开课-->
        <span class="top-border"></span>
        <section class="section public-class" v-if="monthShow">
          <h2><span>宣讲课&公开课</span><p>Lecturing & open class</p></h2>
          <div>
            <ul class="sce-navbtn flex-center"> 
              <li 
              v-for="(item,index) in monthNavList" :key="index" 
              :class="monthActive===(item.month)?'navbtn-item active': 'navbtn-item'" @click="checkMonth(item.month)" 
              >
                {{item.dec}} 
              </li>    
            </ul> 
            <m-class-list :publicList = "publicList" v-if="publicList.length>0"></m-class-list> 
          </div>
        </section>
        <!-- 课表 -->
        <section  class="section curriculum">
          <h2><span>课表</span><p>timetable</p></h2>
          <div class="flex-center">
            <router-link :to="{name:'download'}" class="curriculum-left">
              <img class="curriculum-left-bg" src="../../../static/image/curriculum1.png" alt="">
              <div class="absolute-center">
                <img src="../../../static/image/curriculum1-text-c.png" alt="">
                <img src="../../../static/image/curriculum1-text-e.png" alt="">
              </div>
              <div class="absolute-bottom curriculum-more">点击可查看课表</div>
            </router-link>
            <div class="curriculum-right">
              <router-link :to="{name:'download'}" class="right-item">  
                <img class="curriculum-right-bg" src="../../../static/image/curriculum2.png" alt=""> 
                <div class="absolute-center">
                  <img src="../../../static/image/curriculum2-text-c.png" alt="">
                  <img src="../../../static/image/curriculum2-text-e.png" alt="">
                </div>
              </router-link>
              <router-link :to="{name:'download'}" class="right-item"> 
                <img class="curriculum-right-bg" src="../../../static/image/curriculum3.png" alt="">
                
                <div class="absolute-center">
                  <img src="../../../static/image/curriculum3-text-c.png" alt="">
                  <img src="../../../static/image/curriculum3-text-e.png" alt="">
                </div>
              </router-link>
                
            </div>
          </div>
        </section> 

        <!-- 招生简章 --> 
        <section class="section mba-introduce" v-if="recruitList.length>0">
          <h2><span>招生简章</span><p>student recruitment brochure</p></h2>
          <m-fold-card :foldCardList="recruitList"></m-fold-card>
        </section>

        <!-- MBA简报 --> 
        <section class="section mba-biref" v-if="mbaBirefActive">
          <h2><span>MBA简报</span><p>MBA dynamics</p></h2>
          <ul class="sce-navbtn flex-center">
            <li v-if="newNum>0" :class="mbaBirefActive===1?'navbtn-item active':'navbtn-item'" @click="mbaBiref(1)">MBA资讯</li>
            <li v-if="qaNum>0" :class="mbaBirefActive===2?'navbtn-item active': 'navbtn-item'" @click="mbaBiref(2)">报考问答</li>
            <li v-if="utilNum>0" :class="mbaBirefActive===3?'navbtn-item active':'navbtn-item'" @click="mbaBiref(3)">工具类文章</li> 
          </ul>
          <m-biref v-if="birefList.length>0" :birefList="birefList" :type="mbaBirefActive"></m-biref>  
        </section>  
        <p class="loading" v-if="loadShow">Loading....</p> 
      <!-- </mt-loadmore>   -->
    </div> 
    <m-tabbar fixed v-model="selected"> </m-tabbar>
  </div>
</template>

<script> 
  import MNavbar from '@/components/common/navbar'
  import MSwiper from '@/components/common/swiper'
  import MHeaderbar from '@/components/common/header'
  import MFoldCard from '@/components/common/fold-card'
  import MCollegeList from '@/components/common/college-list'
  import MClassList from '@/components/common/class-list'
  import MBiref from '@/components/common/biref' 
  import MTabbar from '@/components/common/tabbar'
  export default {
    name: 'index',
    data() {
      return {
        pageIndex: 1,
        selected: 1,
        pageInfo: {
          name: "index",
          title: ""
        },
        indexScrollTop:0,
        monthActive:'',
        monthNavList: [],
        monthNavListAll:[],
        monthShow:true,
        monthList: [],
        swiperList: [],
        mbainfoList: [],
        recruitList: [],
        areaList: [],
        areaDataIndex: 0,
        areaData: '',
        collegeList: [],
        collegeClass: 1,
        collegeActive:0,
        publicList: [],
        mbaBirefActive:1,
        ListpageNums: 0,
        birefList: [],
        loadShow:false,
        total:0,
        newNum:0,
        qaNum:0,
        utilNum:0, 
        swiperNum: 0,
      }
    },
    components: {
      MNavbar,
      MSwiper,
      MHeaderbar,
      MFoldCard,
      MCollegeList,
      MClassList,
      MBiref,
      MTabbar
    },
    beforeCreate: function () {
      this.Loading.open('加载中...');
    },
    created: function () {   
      // 获取月份。含有跨年获取
      this.getMonth(); 
    },
    mounted: async function () {
      let that = this;
       // 获取首页数据 
      await that.getIndexData(); 
      await that.collegeSwiper();
      // 底部数据获取
      await that.mbaBiref(that.mbaBirefActive)
        // 关闭loading 
      that.$navigation.on('back', (to, from) => {  
        window.onscroll = null;
      });
      that.$navigation.off('back', (to, from) => {  
      }) 
      window.onscroll = that.indexScrollFun;
      setTimeout(() => that.Loading.close(), 0); 
    },
    methods: {
      async getIndexData() { 
				console.log(this.$ajax)
        let that = this;
        let res = await that.$ajax.get('index.php?r=home-page/h5-home');
        let resData = res.data;
        if (resData.code === 0) {
          // 轮播图 list
          that.swiperList.push(...resData.bannerList);
          // mba介绍 list 顺序填入自定义 icon
          that.mbainfoList.push(...resData.mbainfoList);
          that.mbainfoList.forEach((val, index) => {
            val.icon = index + 1;
          })
          // 院校地区
          let areaList= resData.areaList.filter((val)=>{
            return val.universityList.universityList && val.universityList.universityList.length>0
          })
          that.areaList.push(...areaList);
          that.areaData = resData.areaList[that.areaDataIndex];
          // 根据地区id获取对应 地区的大学; tabNum
          // that.collegeSearch(that.areaData.id, 1) 
          
          that.monthList.push(...resData.courseList);
          // 清除数据为空的月份
          that.deleteEmptyMonth(that.monthList);
          //月份默认/切换
          that.checkMonth(that.monthActive);
          // 招生简章
          that.recruitList.push(...resData.recruitList);
          that.recruitList.forEach((val, index) => {
            val.icon = index + 4;
          })
          // 底部三模块列表长度 0 隐藏模块 
          that.newNum = resData.newNum;
          that.qaNum = resData.qaNum;
          that.utilNum = resData.utilNum;
          //默认选中 
          if(that.newNum<=0){ 
            if(that.qaNum<=0){
              if(that.utilNum<=0){ 
                that.mbaBirefActive = false
              }else{ 
                that.mbaBirefActive = 3
              }
            }else{
              that.mbaBirefActive = 2
            }
          };  
        }  
      },
      // 月份计算
      getMonth() {
        let monthNavList = [];
        let month = new Date().getMonth() + 1;
        let year = parseInt(String(new Date().getFullYear()).substring(2, 4));
        if (month <= 4) {
          for (let i = 0; i < 4; i++) {
            if (month - i <= 0) {
              monthNavList[i] = {
                month: month - i + 12,
                dec: `${year-1}年${month-i+12}月`,
              };
            } else {
              monthNavList[i] = `${year}年${month-i}月`;
              monthNavList[i] = {
                month: month - i,
                dec: `${year}年${month-i}月`,
              };
            }
          }
        } else {
          for (let i = 0; i < 4; i++) {
            monthNavList[i] = month - 3 + i + '月'
            monthNavList[i] = month - 3 + i + '月';
            monthNavList[i] = {
              month: month - 3 + i,
              dec: `${month-3+i}月`,
            };
          }
        }
        this.monthNavListAll.push(...monthNavList)
      },
      // 删除空月份
      deleteEmptyMonth(data){
        let that =this;
        let str="";
        let res = data.filter((val)=>{
          return val.course.length
        });
        that.monthList.length=0;
        that.monthList.push(...res); 
        that.monthList.forEach((val,index)=>{ 
          let resMonth = that.monthNavListAll.filter((decVal)=>{ 
            let resDec = decVal.dec.split("年"); 
            return  val.month === resDec[resDec.length-1]
          });  
          that.monthNavList.push(...resMonth); 
        })    
        if(that.monthNavList.length>0){
          that.monthActive = that.monthNavList[0].month;
        }else{
          that.monthShow = false;
        } 
      },
      // 月份筛选数据
      checkMonth(type) {  
        this.monthActive = type;
        let m = this.monthList.filter((val) => {
          return val.month === type+'月'
        })[0];
        if (m) {
          this.publicList.length  = 0;
          this.publicList.push(...m.course);
        }
      },
      /** 
       * @param{number} area  地区id
       *  @param{number} sort 排序方式 1:报名费,2:排名,3:热度
      */
      collegeSearch(index,area, sort) { 
        return new Promise(async (resolve, reject) => {
          let that = this;
          let params = {
            area: area,
            sort: sort,
          }  
          let res = await that.$ajax.get("index.php?r=university/search", params);
          let resData = res.data; 
          if (resData.code === 0) { 
            that.collegeList.length = 0;  
            that.$set(that.areaList[index].universityList, 'universityList', resData.universityList) 
          }
          that.collegeClass = sort || 1;
          resolve();
        })
      },

      // 区域next
      nextArea(index,id) {
        let list = this.areaList,
          that = this; 
          let collegeFirst =  document.querySelector(".college-first");
          let switchNext =  document.querySelector(".switch-next");
          // 动画效果start
          if(switchNext){
            switchNext.classList.remove("switch-next");
          }
          collegeFirst.classList.add("switch-hide"); 
          if(that.areaList.length>=that.collegeActive+2){ 
            collegeFirst.nextSibling.classList.add("switch-next");
          }else{  
            document.querySelector(".college-sec").classList.add("switch-next");
          }
          //college-first
          if(that.areaList.length<=that.collegeActive+1){  
            setTimeout(()=>{that.collegeActive=0;},600)
          }else{  
            setTimeout(()=>{that.collegeActive=index+1;},600)
          }           
          // 动画效果end
          // 重置列表动画  
          that.collegeClass = 1;
          that.repeatSwiperCross()
      },
      indexPageScroll(e){
       this.indexScrollTop = e.currentTarget.scrollTop; 
      },
      // swiper-Cross
      collegeSwiper(length){ 
        let that = this;
        that.swiperNum = 0;
        if(length<1) return false;  
        that.$nextTick(function () { 
          let boxDoms= document.querySelectorAll('.college-box');
          [...boxDoms].forEach((dom)=>{ 
            let listDom= dom.querySelectorAll('.collegelist'); 
            let wrapDom = dom.querySelector('.college-wrap');
            dom.style.transform = "translateX(0px)";
            that.util.swiperCross(that,dom,wrapDom,listDom,1); 
          })
          
        })
      },
      // 重置 swiper
      repeatSwiperCross(){
        let that = this; 
        let collegeWrap= document.querySelectorAll('.college-wrap');
        that.swiperNum=0;
        [...collegeWrap].forEach((val)=>{
          val.style.transform = "translateX(0px)";
        })
      },
      // 首页底部数据
      mbaBiref(type) {
        this.mbaBirefActive = type; 
        this.ListpageNums = 0
        this.birefList.length = 0;
        this.getBottomList();
      },
      // 首页底部数据 mbaBirefActive-->tab
      async getBottomList() { 
        let that = this;
        let params = {
          start: that.ListpageNums,
          count: 5,
        }
        let reqUrl=""; 
        that.loadShow=true;  
        switch (that.mbaBirefActive) {
          case 1:
            reqUrl="index.php?r=article/list";
            break;
         case 2:
            reqUrl="index.php?r=ask-answers/list";
            break;
         case 3:
            reqUrl="index.php?r=article-utils/list";
            break; 
          default:
            reqUrl="index.php?r=article/list";
            break;
        }
        let res = await that.$ajax.get(reqUrl, params);
        let resData = res.data;

        if (resData.code === 0) {
          // List
          switch (that.mbaBirefActive) {
            case 1:
              that.birefList.push(...resData.newsList);
              break;
          case 2:
              that.birefList.push(...resData.List);
              break;
          case 3:
              that.birefList.push(...resData.newsList);
              break; 
            default:
              that.birefList.push(...resData.newsList);
              break;
          } 
          that.total =  resData.number;   
        }
        that.loadShow=false;
      }, 
      //加载更多底部数据
      async loadBottom() {
        let that = this;   
        that.ListpageNums += 5;
        await that.getBottomList();   
      },  

      indexScrollFun() { 
        let that = this;
        that.scrollTop = document.scrollingElement.scrollTop;  
        if(that.util.getScrollTop() + that.util.getWindowHeight() === that.util.getScrollHeight()){
          if(that.birefList.length>= that.total){
            return false;
          } else{ 
            that.loadBottom(); 
          } 
    　　}
      }
    },
    computed: {

    },
  }
</script>
