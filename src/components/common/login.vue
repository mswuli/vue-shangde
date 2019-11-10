<template>
  <div class="login-box" v-show="loginStatus.loginShow">
    <div class="register-wrap" v-if="!loginStatus.loginWrap">
      <h3>一键注册</h3> 
      <div class="tel-box"> 
        <p :class="centerClass">+86</p>
       <input type="tel" placeholder="请输入正确的手机号"  :class="phoneError?'error':''" v-model="phoneNumber"> 
      </div>
      <div class="register-code flex-center">
        <input class="flex1" type="text" placeholder="请输入手机验证码" :class="codeError?'error':''"  v-model="code">
        <p class="code-img" v-if="codeShow" @click="sendCod">发送验证码</p>
        <p class="code-img" v-else >{{codeNum}}s</p>
      </div>
      <input type="password" placeholder="请输入6-12位账号密码" :class="passwordError?'error':''" v-model="password">
      <input type="password" placeholder="请再次输入6-12位账号密码" :class="passwordCError?'error':''" v-model="passwordCopy">
      <button class="login-btn" @click="register">立即注册</button>
      <div class="flex-float-reverse"> 
      <p class="login-tips"  @click="toRegister"><span>已有账号？</span>马上登录</p>
      </div>
      <p class="login-close"  @click="close"> X</p>
    </div>

    <div class="login-wrap" v-else>
      <h3>登录</h3> 
      <div class="tel-box">
        <p :class="centerClass">+86</p>
        <input type="tel" placeholder="请输入正确的手机号" :class="phoneError?'error':''" v-model="phoneNumber">  
      </div>
      <input v-if="!isMsgCodeLogin" type="password" placeholder="请输入6-12位账号密码" :class="passwordError?'error':''" v-model="password">
      
      <div v-else class="register-code flex-center">
        <input class="flex1" type="text" placeholder="请输入手机验证码" :class="codeError?'error':''"  v-model="code">
        <p class="code-img" v-if="codeShow" @click="sendCod">发送验证码</p>
        <p class="code-img" v-else >{{codeNum}}</p>
      </div>
      <button class="login-btn" @click="login">立即登录</button>

      <div class="flex-float-reverse"> 
        <p class="login-tips"  @click="toRegister">立即注册</p>
        <p class="login-tips"  @click="toMsgCode">{{swichText}}</p>
      </div>
      <p class="login-close"  @click="close"> X</p>
        
    </div> 
  </div>
</template>

<script> 
  export default {
    name: 'login',
    props: [""],
    data() {
      return {
        loginStatus: this.$store.state.login,
        codeUrl: "",
        codeNum: '60',
        codeShow: true,
        timmeIn: "",
        phoneNumber: "",
        password: "",
        passwordCopy: "",
        code: "",
        phoneError: false,
        passwordError: false,
        passwordCError: false,
        codeError: false,
        centerClass:'',
        swichText:'用短信验证码登录',
        isMsgCodeLogin:false,
      };
    },
    created() {
      this.util.ios12();
    },
    mounted: function () {
     if(!this.util.isAndroid){
        this.centerClass="ios"
     }
    },
    methods: {
      async sendCod() {
        let that = this,
         phoneReg = new RegExp("^[1][3,4,5,6,7,8,9][0-9]{9}$"),
         codeType = that.isMsgCodeLogin?12:11,
         params = {
          tel: that.phoneNumber,
          type:codeType
        }; 
        that.phoneError = !phoneReg.test(that.phoneNumber); 
        that.phoneNumber = this.phoneError ? "" : that.phoneNumber;
        if (that.phoneError) {
          return false;
        }
        let res = await that.$ajax.post("index.php?r=tools/sms", params);
				console.log(res);
        let resData = res.data;
        if (resData.code === 0) {
          that.Toast(resData.msg);
          that.setTime();
        }

      },
      //  倒计时
      setTime() {
        let that = this;
        that.codeNum = 60;
        that.codeShow = false;
        that.timmeIn = setInterval(() => {
          that.codeNum -= 1;
          if (that.codeNum <= 0) { //计时完毕
            clearInterval(that.timmeIn);
            that.codeShow = true;
          }
        }, 1000)
      },
      toRegister() {
        clearInterval(this.timmeIn);
        this.codeShow=true;
        this.$store.dispatch('swichLoginWrap')
      },
      toMsgCode(){
        this.isMsgCodeLogin =!this.isMsgCodeLogin;
        this.swichText =this.isMsgCodeLogin ?'用账号密码登录': '用短信验证码登录';
      },
      close() {
        this.$store.dispatch('swichLogin'); 
        this.phoneNumber="";
        this.code="";
        this.password="";
        this.passwordCopy="";  
        this.phoneError= false;
        this.passwordError= false;
        this.passwordCError= false;
        this.codeError= false;
        this.codeNum= '60';
        this.codeShow= true;
        this.util.scrollMove();
      },
      async register() {
        let that = this;
        let reStatus = that.regular("regular");

        if (!reStatus) return false;
        let params = {
          type: "pwd",
          tel: that.phoneNumber,
          pwd: that.password,
          authCode: that.code,
        }
        const res = await that.$ajax.post("index.php?r=user/regist", params);
        let resData = res.data;
        if (resData.code === 0) {
          if(that.GLOBAL.SETING_ENV === "prod") {
            MtaH5.clickStat("regist") 
          } 
          that.login();
        }else{
          that.Toast(resData.msg)
        }
      },
      async login() { 
        let that = this; 
        let reStatus = this.regular("login"); 
        if (!reStatus) return false;
        this.Loading.open('登录中...');
        let params={};
        if(that.isMsgCodeLogin){ 
          params = {
            type: "sms",
            tel: that.phoneNumber,
            authCode: that.code,
          }
        }else{ 
          params = {
            type: "pwd",
            tel: that.phoneNumber,
            pwd: that.password,
          }
        } 
        const res = await that.$ajax.post("index.php?r=login/login", params);
        let resData = res.data; 
        setTimeout(() => that.Loading.close(), 0)
        if (resData.code === 0) {
          let nowData = new Date().getTime();
          resData.data.time = nowData; 
          that.util.setItem("fe-mbaUser", resData.data);
          that.$store.dispatch('swichLogin');
          that.util.scrollMove(); 
          if(that.GLOBAL.SETING_ENV === "prod") {
            MtaH5.clickStat("login")
          }  
          that.Toast("登录成功");
        }else{
          that.Toast(resData.msg)
        }

      },
      regular(type) {
        let phoneReg = new RegExp("^[1][3,4,5,6,7,8,9][0-9]{9}$");
        let passReg = new RegExp("^[0-9]{6,12}$");
        this.phoneNumber = this.phoneNumber.trim();
        this.password = this.password.trim();
        this.passwordCopy = this.passwordCopy.trim();
        this.code = this.code.trim()
        this.phoneError = !phoneReg.test(this.phoneNumber);
        this.passwordError = !passReg.test(this.password);
        this.phoneNumber = this.phoneError ? "" : this.phoneNumber;
        this.password = this.passwordError ? "" : this.password;
        this.codeError = this.code.trim() === "" ? true : false;
        this.passwordCError=false;
        if (type === "regular") {
          // 验证重复代码 
          if (this.passwordError) {
            this.passwordCError = this.passwordError;
            return false;
          }
          if (this.passwordCopy !== this.password) {
            this.passwordCopy = "";
            this.passwordCError = true;
          }
          if (this.phoneError || this.passwordError || this.passwordCError || this.codeError) {
            return false
          }
        } else { 
          if(this.isMsgCodeLogin){
            if (this.phoneError ||  this.codeError) {
              return false
            } 
          }else{
            if (this.phoneError || this.passwordError) {
              return false
            }
          }
          
        }

        return true;



      }
    },
    computed: {

    },
    beforeDestroy() {
      clearTimeout(this.timmeIn);
    }

  };
</script> 
