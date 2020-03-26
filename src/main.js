import Vue from "vue";
import App from "./App.vue";
import VueDompurifyHTML from "vue-dompurify-html";

import router from "./router";

Vue.config.productionTip = false;

Vue.use(VueDompurifyHTML);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
