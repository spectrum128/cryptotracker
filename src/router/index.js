import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CryptoList from '@/components/CryptoList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CryptoList',
      component: CryptoList
    }
  ]
})
