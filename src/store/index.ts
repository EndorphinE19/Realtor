import Vue from 'vue'
import Vuex from 'vuex'
import realtor from './modules/realtor'
import subdivision from './modules/subdivision'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    realtor,
    subdivision
  }
})
