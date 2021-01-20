import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css';
import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';
import VueRouter from 'vue-router';
import VCalendar from 'v-calendar';

Vue.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
               // ...other defaults
});


Vue.config.productionTip = false

const socketHost = window.location.protocol + '//' + window.location.hostname + ':5031';
Vue.use(new VueSocketIO({
  debug: true,
  connection: socketio.connect(socketHost)
}));

const routers = new VueRouter({
  mode: 'history',
  routes: routers
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

export default new Vue ({
  icons: {
    iconfont: 'mdi'
  }
})

