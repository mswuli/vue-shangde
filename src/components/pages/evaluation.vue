<template>
  <div class = "page-evaluation">
    <img src="../../../static/image/evaluation-bg.png" class="evaluation-bg" alt="">
    <form class="evaluation-form">
      <div class="form-item"> 
        <h2>您目前的学历是：</h2>
        <ul class="form-item-list"> 
          <li>
            <input type="radio" name="radio" >
            <label class="copy-label"></label>
            <div class="label-dec">
                <span>111</span>
            </div>
          </li> 
          <li> 
            <input type="radio" name="radio" >
            <label class="copy-label"></label>
            <div class="label-dec">
                <span>111</span>
            </div>
          </li> 
        </ul>
      </div>

      <div class="form-item"> 
        <h2>您目前的学历是：</h2>
        <ul class="form-item-list"> 
          <li>
            <input type="checkbox" >
            <label class="copy-label"></label>
            <div class="label-dec">
                <span>111</span>
            </div>
          </li> 
          <li> 
            <input type="checkbox" >
            <label class="copy-label"></label>
            <div class="label-dec">
                <span>111</span>
            </div>
          </li> 
        </ul>
      </div> 
    </form>
  </div>
</template>
<script> 
export default { 
    name: 'webview',
    data() {
      return {
        webLink:'',
        pageInfo: {
          name: "evaluation",
          title: "评测报告"
        },
        id:'',
        loginInfo:'',
      };
    },
    components:{ 
    },  
    created(){ 
    }
}
</script>
