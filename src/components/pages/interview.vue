<template> 
	 <div class="page-interview" >  
    <mt-loadmore bottomDropText = "加载更多中" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" >
      <m-headerbar :pageInfo="pageInfo"></m-headerbar>
      <m-text-list :listData = "interviewList"  :listType="listType"></m-text-list>  
    </mt-loadmore>

    <m-footerbar></m-footerbar>
    <m-login></m-login>
	</div>
</template>
 
<script>
  import MHeaderbar from '@/components/common/header'
  import MTextList from '@/components/common/text-list'
  import MFooterbar from '@/components/common/footer'
  import MLogin from '@/components/common/login'
  export default {
    name: 'interview',
    data() {
      return {
        chollegeId: "",
        listType: "interview",
        pageInfo: {
          name: "interview",
          title: "学员访谈"
        },
        interviewList: [],
        allLoaded: false,
        ListpageNums: 0
      };
    },
    components: {
      MHeaderbar,
      MTextList,
      MFooterbar,
      MLogin
    },
    created: function () {
      this.Loading.open('加载中...');
     // this.util.wxChatShare(this);
      this.chollegeId = this.$route.query.id
    },
    mounted: function () {
      this.getInterviewList();
    },
    methods: { 
      loadBottom() {
        this.ListpageNums += 10;
        this.$refs.loadmore.onBottomLoaded();
        this.getInterviewList();
      },
      async getInterviewList() {
        let that = this;
        const params = {
          start: that.ListpageNums,
          count: 10,
          aid: that.chollegeId
        }
        const res = await that.$ajax.get('index.php?r=university-interview/list', params);
        let resData = res.data;
        if (resData.code === 0) {
          that.interviewList.push(...resData.interviewList);
          if (that.interviewList.length >= resData.totalNum) {
            that.allLoaded = true;
          }
        } 
        setTimeout(() => this.Loading.close(), 0)
      },
    },
    computed: {

    },

  };
</script>
