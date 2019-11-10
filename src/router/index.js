import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/pages/index'
import waterfalls from '@/components/pages/waterfalls'
 import oldinsdetail from '@/components/pages/insdetail'
import newIinsdetail from '@/components/pages/new-insdetail'
import bulletin from '@/components/pages/bulletin'
import interview from '@/components/pages/interview'
import download from '@/components/pages/download'
import webView from '@/components/pages/webView'
import evaluation from '@/components/pages/evaluation'
import schoolList from '@/components/pages/school-list'
import abroadServer from '@/components/pages/abroad-server'

Vue.use(Router)
/** 
 * deep 页面层级 判断前进后退
*/
export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index, 
      meta: {
        title: '首页',
        share_image:'',
      }
    },

    {
      path: '/oldinsdetail:id',
      name: 'oldinsdetail',
      component: oldinsdetail, 
      meta: {
        title: '详情',
        share_image:'',
      } 
    },
    {
      path: '/insdetail:id',
      name: 'insdetail',
      component: newIinsdetail, 
      meta: {
        title: '详情',
        share_image:'',
      } 
    },

    {
      path: '/waterfalls',
      name: 'waterfalls',
      component: waterfalls, 
      meta: {
        title: '院校风采',
        share_image:'',
      }  
    },

    {
      path: '/bulletin',
      name: 'bulletin',
      component: bulletin,
      meta: { 
        title: '',
        share_image:'',
      }  
    },

    {
      path: '/interview',
      name: 'interview',
      component: interview, 
      meta: {
        title: '访谈列表',
        share_image:'',
      }   
    },

    {
      path: '/download',
      name: 'download',
      component: download, 
      meta: {
        title: 'APP下载',
        share_image:'',
      }  
    },
    {
      path: '/webView:id',
      name: 'webView',
      component: webView, 
      meta: {
        title: 'iframe',
        share_image:'',
      }  
    },
    
    {
      path: '/evaluation',
      name: 'evaluation',
      component: evaluation, 
      meta: {
        title: 'evaluation',
        share_image:'',
      } 
    },
    {
      path: '/school-list',
      name: 'schoolList',
      component: schoolList, 
      meta: {
        title: 'schoolList',
        share_image:'',
      }  
    },
    {
      path: '/abroad-server',
      name: 'abroadServer',
      component: abroadServer, 
      meta: {
        title: 'abroadServer',
        share_image:'',
      }  
    },

// abroad-server
    
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
