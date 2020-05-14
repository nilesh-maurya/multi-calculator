import Vue from "vue";
import App from "./App.vue";
import VueDompurifyHTML from "vue-dompurify-html";

import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(VueDompurifyHTML);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
