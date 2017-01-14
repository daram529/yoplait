// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import '../node_modules/semantic-ui-css/semantic.min.css'
import semantic from 'semantic'
import Vue from 'vue'
import App from './App'
import Vuefire from 'vuefire'
<<<<<<< HEAD
import Firebase from 'firebase'

// var Vue = require('vue');
// var vueFirebaseAuth = require('vueui-firebase-auth');
// Vue.use(vueFirebaseAuth);

=======
// import firebaseAuth from 'vueui-firebase-auth'
>>>>>>> 4c8b4938f35401decdd0beb0a96d745027e89b23

Vue.use(Vuefire)
// Vue.use(firebaseAuth)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
