import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/database'
import Buefy from 'buefy'

import 'buefy/dist/buefy.css'

Vue.use(Buefy)

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAQdSYLsTQH-5Wec1itlSs3ZDfmSG-T4ZE",
  authDomain: "ayaks-c796d.firebaseapp.com",
  databaseURL: "https://ayaks-c796d.firebaseio.com",
  projectId: "ayaks-c796d",
  storageBucket: "ayaks-c796d.appspot.com",
  messagingSenderId: "188803134455",
  appId: "1:188803134455:web:f72857d19e7188877bf4f2"
};


export const db = firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
