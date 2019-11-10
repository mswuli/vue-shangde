<template>
  <div class="page-insdetail">
      <m-headerbar :pageInfo="pageInfo"></m-headerbar>
      <section class="section insd-sectop"> 
        <div class="bg-bottom-text insd-top"> 
            <img class="swipe-bg" :src="unInfo.back_image" alt="">
            <div class="swipe-text">
              <h3 class="text-overflow2" v-if="unInfo.name!=''"> {{unInfo.name}}</h3>
              <p class="text-overflow" v-if="unInfo.summary!=''" v-html="unInfo.summary">  </p>
            </div>
          </div> 

          <div class="flex-center insd-profess-nums">
              <div class="insd-profess-item">
                <h3><span>{{unInfo.majorNum}}</span>门</h3>
                <p>专业数量</p>
              </div>
              <div class="insd-profess-item">  
              <h3 class="text-overflow" v-if="unInfo.max_price !== unInfo.min_price">{{unInfo.min_price}}-{{unInfo.max_price}}</h3>
              <h3 class="text-overflow" v-else>{{unInfo.min_price}}</h3> 
                <p>价格区间</p>
              </div>
          </div>
      </section>

      <!-- 学院简介 -->
      <section class="section insd-intro">
        <h2>
          <span>学院简介</span>
          <p>College introduction</p>
        </h2>

        <blockquote v-html="unInfo.summary" class="text"> </blockquote>
      </section>
      <!-- 报考详情 -->
      <span class="top-border" v-if="examList.length>0"></span>
      <section class="section apply-intro" v-if="examList.length>0">
        <h2><span>报考详解</span><p>EXAMINATION DETAIL</p></h2>

        <m-fold-card :foldCardList="examList"></m-fold-card> 
        
      </section>
      <!-- 专业课程 -->
      <span class="top-border" v-if="majorList.length>0"></span>
      <section class="section major-info" v-if="majorList.length>0">
        <h2><span>专业课程</span><p>Professional courses</p></h2>  
          <div class="wrap">
            <ul class="major-wrap">
              <li v-for="(item,index) in majorList" :class="index===0?'major-list active':'major-list'" :key="index"  >
                <div >
                  <div class="major-top flex-center">
                    <img :src="item.poster" alt="">
                    <div>
                      <h3 class="text-overflow">{{item.name}}</h3>
                      <p class="text-overflow">{{item.subtitle}}</p>
                      <span>{{item.years}}</span>
                    </div>
                  </div>
                  <ul class="course-list" >
                      <li v-for="(courseItem,index) in item.course_list" :key="index" v-if=" index<=3" class="text-overflow"> {{courseItem}}</li> 
                      <div class="view-more" @click="getAllMajorClass(item.id)"> 查看完整课表</div>
                  </ul> 
                </div>
              </li>  
            </ul>
            <ul v-show="majorList.length>1" class="major-swipei-tips">
              <li v-for="(item,index) in majorList" :key="item.id" :class="index===swiperNum ?'active':'' " ></li>
            </ul>
          </div>
      </section>
        <!-- 助你了解院校 -->
        <span class="top-border"></span>
       <section class="section insd-help">
        <h2><span>助你了解院校</span><p>about the college</p></h2>

         <div class="flex-float">
            <div class="help-left"> 
              <div class="help-item" @click="navGoToDetail('waterfalls',{id:unInfo.id},unInfo.photoNum)">
                <img src="../../../static/image/insd-help1.png" alt="">
                <div class="absolute-center">
                  <h4>院校图景</h4>
                  <p>共<span>{{unInfo.photoNum}}</span>张</p>
                </div>
              </div>
              
              <div class="help-item" @click="navGoToDetail('interview',{id:unInfo.id},unInfo.interviewNum)">
                  <img src="../../../static/image/insd-help2.png" alt="">
                  <h4 class="absolute-center">学员访谈</h4> 
              </div>
            </div>
            <div class="help-right"> 
              <div class="help-item" @click="getFamous">
                  <img src="../../../static/image/insd-help3.png" alt="">
                  <h4 class="absolute-center">名人同学</h4> 
              </div> 
              <div class="help-item" @click="navGoToDetail('bulletin',{id:unInfo.id},unInfo.noticeNum)">
                  <img src="../../../static/image/insd-help4.png" alt="">
                  <div class="absolute-center">
                    <h4>院校公告</h4>
                    <p>共<span>{{unInfo.noticeNum}}</span>条</p> 
                  </div>
              </div>
            </div>
         </div>
        
      </section>
      
      <!-- 评论 -->
      <span class="top-border"></span>
      <section class="section insd-comment">
        <div class="flex-float"> 
          <h2 class="flex1"><span>评论</span><p>comment</p></h2>
          <div class="comment-btn" @click="commentEvent">我要评论</div>
        </div>
        <m-comment-list v-if="commentList.length>0" :commentList="commentList"></m-comment-list>
        <p v-else class="none-text">暂无数据</p>
      </section> 
      <m-login></m-login>
      <!-- 名人弹窗 -->
      <m-dialogs :dialogData = dialogData :dialogInfo = dialogInfo></m-dialogs>
      <m-footer-bar></m-footer-bar> 
  </div>
  
</template>

<script>
  import MHeaderbar from '@/components/common/header'
  import MFoldCard from '@/components/common/fold-card'
  import MCommentList from '@/components/common/comment-list'
  import MLogin from '@/components/common/login'
  import MFooterBar from '@/components/common/footer'
  import MDialogs from '@/components/common/dialog'
  export default {
    name: "insdetail",
    data() {
      return {
        chollegeId: "",
        pageInfo: {
          name: "insdetail",
          title: "院校详情"
        },
        unInfo: "",
        examList: [],
        loginInfo: "",
        majorList: [],
        commentList: [],
        swiperNum: 0,
        famousList: [],
        dialogData: [],
        dialogInfo: {},
      }
    },
    components: {
      MHeaderbar,
      MFoldCard,
      MCommentList,
      MLogin,
      MFooterBar,
      MDialogs
    },
    beforeCreate: function () {
      this.Loading.open('加载中...');
    },
    created: function () {
      this.chollegeId = this.$route.params.id; 
      // 请求详情数据
      this.getPageData();
    },
    mounted: function () {},
    methods: {
      async getPageData() {
        let that = this;
        let params = {
          id: that.chollegeId
        }
        const res = await that.$ajax.get("index.php?r=university/h5-info", params);
        let resData = res.data;
        if (resData.code === 0) {
          resData = resData.universityInfo
          that.unInfo = resData;
          // 头部数据处理
          that.unInfo.summary = that.unInfo.summary.replace(/\n|\r\n/g,"<br/>");
          that.unInfo.max_price =  Number(that.unInfo.max_price) && that.util.format(that.unInfo.max_price).replace('万','w');
          that.unInfo.min_price =  Number(that.unInfo.min_price) && that.util.format(that.unInfo.min_price).replace('万','w');
          
          // 报考详解list  及自定义ICON 
          if (resData.examList.length > 0) {
            that.examList.push(...resData.examList);
            that.examList.forEach((val, index) => {
              val.icon = index + 1;
            })
          }
          // 课程list  清除空课表
          resData.majorList.forEach((val) => {
            let majorFlist = val.course_list.filter((cVal) => {
              return cVal.trim() != ""
            });
            val.course_list = majorFlist;
          })
          let majorFlist = resData.majorList.filter((val) => {
            return val.course_list.length>0
          });
          // 课表轮播图
          that.majorList.push(...majorFlist);
          if(that.majorList.length>0){ 
            //课程滑动效果
            that.$nextTick(function () {
              let wrapDom = document.querySelector('.wrap');
              let boxDom= document.querySelector('.major-wrap')
              let listDom= document.querySelectorAll('.major-list')
              that.util.swiperCross(that,wrapDom,boxDom,listDom);
            })
          }
          // 评论
          that.commentList.push(...resData.commentList);
         // that.util.wxChatShare(that,resData.share_image);
        } 
        // 关闭loading
        setTimeout(() => that.Loading.close(), 0)
      },

      commentEvent() {
        let that = this;
        that.loginInfo = that.util.getItem("fe-mbaUser")
        if (that.loginInfo) {
          // 弹出评论 /前期间跳到下载页
          that.$router.push({
            name: 'download'
          })
        } else {
          that.$store.dispatch('swichLogin')
          that.util.scrollStop();
        }
      },
      //上传评论
      async commentUpdata() {
        let that = this;
        let params = {
          aid: that.chollegeId,
          content: "",
          userId: that.loginInfo.userId
        }
        const res = await that.$ajax.post("index.php?r=university/comment", params);
        let resData = res.data;
        if (resData.code === 0) {
          that.Toast(resData.msg)
        }
      },
    //获取名人 列表
      async getFamous() {
        let that = this;
        let params = {
          aid: that.chollegeId,
          start: 0,
          count: 1000
        }
        const res = await that.$ajax.get("index.php?r=university-celebrity/list", params);
        let resData = res.data;
        that.dialogData.length = 0;
        that.dialogInfo.type = 1;
        that.dialogInfo.title = "优秀校友";
        that.dialogData.push(...resData.List);
        if (that.dialogData.length > 0) {
          this.$store.dispatch('switchDialog')
        } else {
          that.Toast("暂无数据")
        }
        that.util.scrollStop();
      },

      routerBack() {
        this.$router.back(-1)
      },
      getAllMajorClass(id) { 
        let classList = this.majorList.filter((val) => val.id === id)[0].course_list;
        this.dialogData.length = 0;
        this.dialogInfo.type = 2;
        this.dialogInfo.title = "课表";
        this.dialogData.push(...classList);
        this.$store.dispatch('switchDialog');
        this.util.scrollStop();

      }, 
      // 了解院校跳转
      navGoToDetail(name,data,length){
        if(length<=0){
          this.Toast("暂无内容")
          return false
        }   
        this.$router.push({path: name, query: data});
      }, 

    }
  }
</script> 
