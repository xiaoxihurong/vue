// 入口文件

import Vue from 'vue'


import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Vuex from 'vuex'
Vue.use(Vuex)


var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
  state: { // this.$store.state.***
    car: car 
    // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
  },
  mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
    addToCar(state, goodsinfo) {

      var flag = false

      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })

      if (!flag) {
        state.car.push(goodsinfo)
      }

      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo) {
 
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormCar(state, id) {
      // 根据Id，从store 中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.splice(i, 1)
          return true;
        }
      })
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      // 把最新的 所有购物车商品的状态保存到 store 中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: { // this.$store.getters.***
    // 相当于 计算属性，也相当于 filters
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state) {
      var o = {}
      state.car.forEach(item => {
        o[item.id] = item.selected
      })
      return o
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0, 
        amount: 0 
      }
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})


import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true;

import VuePreview from 'vue-preview'
Vue.use(VuePreview)


import moment from 'moment'

Vue.filter('dateFormat', function (dataStr, pattern = "MM-DD HH:mm") {
  return moment(dataStr).format(pattern)
})

import './lib/mui/css/mui.min.css'  // 导入 MUI 的样式

import './lib/mui/css/icons-extra.css' // 导入扩展图标样式


import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


import app  from './App.vue'      // 导入 App 根组件
import router from './router.js'

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store
})
