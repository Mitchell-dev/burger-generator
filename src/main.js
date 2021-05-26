import Vue from "vue";
import App from "./App.vue";

import "modaal";
import "prismjs";
import "prismjs/components/prism-scss";
import "@/assets/css/prism.css";
import "@/assets/scss/style.scss";


Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
