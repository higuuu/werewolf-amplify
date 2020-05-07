import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(IconsPlugin)
Vue.use(BootstrapVue)
Vue.config.productionTip = false;

import Amplify, * as AmplifyModules from "aws-amplify";
// @ts-ignore
import { AmplifyPlugin } from "aws-amplify-vue"
import AwsExports from "./aws-exports"
Vue.use(AmplifyPlugin, AmplifyModules)
Amplify.configure(AwsExports)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
