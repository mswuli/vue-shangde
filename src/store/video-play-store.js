export default {
  state: {
    videoPlayShow: false,
  },
  mutations: {
    switchVideoPlayShow(state) {
      state.videoPlayShow = state.videoPlayShow ? false : true;
    }, 
    closeVideoPlay(state) {
      state.videoPlayShow = false
    }
  },
  actions: {
    switchVideoPlayShow(context) {
      context.commit('switchVideoPlayShow')
    },
    
    closeVideoPlay(context) {
      context.commit('closeVideoPlay')
    }


    
  }
}
