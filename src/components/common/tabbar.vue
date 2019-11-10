<template>
  <div class="page-tabbar flex-float"> 
    <div :class="barActive===1?'tab-item ':'tab-item'" @click="checkBar(1)">
      <img src="../../../static/image/bar-icon1.png" alt="">
      <img src="../../../static/image/bar-active-icon1.png" alt="">
      <p>立即申请</p>
    </div>
    
    <div :class="barActive===2?'tab-item active':'tab-item'" @click="checkBar(2)">
      <img src="../../../static/image/bar-icon2.png" alt="">
      <img src="../../../static/image/bar-active-icon2.png" alt=""> 
      <p>一键分享</p>
    </div>
    
    <div :class="barActive===3?'tab-item active':'tab-item'" @click="greatbear">
      <img src="../../../static/image/bar-icon3.png" alt="">
      <img src="../../../static/image/bar-active-icon3.png" alt=""> 
      <p>在线咨询</p>
    </div>
    
    <router-link :to="{name:'download'}" :class="barActive===4?'tab-item active':'tab-item'" @click="checkBar(4)">
      <img src="../../../static/image/bar-icon4.png" alt="">
      <img src="../../../static/image/bar-active-icon4.png" alt=""> 
      <p>MBA移动App</p>
    </router-link>
  </div>
</template>
 
<script>
  export default {
    name: 'page-navbar',
    props: ['pageIndex'],
    data() {
      return {
        barActive: '',
        loginInfo:'',
      };
    },
    created: function () {},
    methods: {
      checkBar(num) {
        this.barActive = num;
        if(num === 1){
          this.loginInfo = this.util.getItem("fe-mbaUser")
          if (this.loginInfo) {
            // 弹出申请
            this.$router.push({ name: 'download'})
          } else {
            this.$store.dispatch('swichLogin');
            this.util.scrollStop();
          }
        }else if (num === 3) {
          this.MsgBox.confirm("请拨打(010) 5285 9623联系客服", "咨询客服").then(action => {
            window.location.href = "tel:(010) 5285 9623";
          }).catch((err) => {
            console.log('联系客服取消');
          });
        } else if (num === 2) {
          this.share()
        }
      },

    },
    computed: {

    },

  };
</script>
