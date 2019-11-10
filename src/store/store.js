import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import loginStore from './login-store.js'; //登录 
import dialogStore from './dialog-store.js'; //详情页通用列表弹窗 
import weixinStore from './weixin-store.js'; //微信分享引导弹窗
import videoPlayStore from './video-play-store.js'; //video 播放弹窗

export default new vuex.Store({
  modules: {
    dialog: dialogStore,
    login: loginStore,
    weixin: weixinStore,
    videoPlay: videoPlayStore
  }
})
