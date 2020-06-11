import Vue from "vue";
import VueRouter from "vue-router";
import Calculator from "../views/Calculator.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "calculator",
    component: Calculator
  },
  {
    path: "/convert/",
    name: "convert",
    component: () =>
      import(
        /* webpackPrefetch: true */
        "../views/Convert.vue"
      )
  },
  {
    path: "/history/",
    name: "history",
    component: () =>
      import(
        /* webpackPrefetch: true */
        "../views/History.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
