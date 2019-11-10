<template> 
	 <div class="page-bulletin">  
    <mt-loadmore   bottomDropText = "加载更多中" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" >
      <m-headerbar :pageInfo="pageInfo"></m-headerbar>
      <m-text-list :listData = "bullettinList" :listType="listType"></m-text-list>  
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
    name: 'bulletin',
    data() {
      return {
        chollegeId: "",
        listType: "bulletin",
        pageInfo: {
          name: "interview",
          title: "院校公告"
        },
        bullettinList: [],
        allLoaded: false,
        ListpageNums: 0,
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
      //this.util.wxChatShare(this);
      this.chollegeId = this.$route.query.id
    },
    mounted: function () {
      this.getBulletinList();
    },
    methods: {

      loadBottom() {
        this.ListpageNums += 10;
        this.getBulletinList();
      },
      async getBulletinList() {
        let that = this;
        //r=notice/university-list&start=0&count=10&aid=38
        const params = {
          start: that.ListpageNums,
          count: 10,
          aid: that.chollegeId
        }
        const res = await that.$ajax.get('index.php?r=notice/university-list', params);
        let resData = res.data;
        if (resData.code === 0) {
          that.bullettinList.push(...resData.data); 
          if (that.bullettinList.length >= resData.number) {
            that.allLoaded = true;
          }
        } 
        that.$refs.loadmore.onBottomLoaded();
        setTimeout(() => this.Loading.close(), 0)
      },
    },
    computed: {

    },

  };
</script>
