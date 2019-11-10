<template>
  <footer class="insd-footer flex-center">
    <div @click="advisory" class="footer-left">我要咨询</div>
    <div class="footer-right" @click="applyEvent">立即申请</div>
  </footer>
</template>
 
<script> 
export default {
  name: 'page-navbar',
  props: ['pageIndex'],
  data() {
    return {
      loginInfo: ''
    };
  },
  created: function () {},
  methods: {
    applyEvent() {
      let that = this; 
      that.loginInfo = that.util.getItem("fe-mbaUser")
      if (that.loginInfo) {
        // 弹出申请
        that.$router.push({
            name: 'download'
          }) 
      } else {
        that.$store.dispatch('swichLogin');
        that.util.scrollStop();
      }
    },
    advisory() {
      this.MsgBox.confirm("请拨打(010) 5285 9623联系客服", "咨询客服").then(action => {
        window.location.href = "tel:(010) 5285 9623";
      }).catch((err) => {
        console.log('联系客服取消');
      });
    },
  },
  computed: {

  },

};
</script>
