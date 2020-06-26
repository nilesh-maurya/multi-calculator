import Vue from "vue";
import VueRouter from "vue-router";
import Calculator from "../views/Calculator.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/calculator"
  },
  {
    path: "/calculator",
    name: "calculator",
    component: Calculator
  },
  {
    path: "/convert/",
    name: "convert",
    component: () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "convert" */
        "../views/Convert.vue"
      ),
    children: [
      {
        path: "/convert/BMI",
        name: "BMI",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "BMI" */
            "../components/convert/BMI.vue"
          )
      },
      {
        path: "/convert/Angle",
        name: "Angle",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Angle" */
            "../components/convert/Angle.vue"
          )
      },
      {
        path: "/convert/Age",
        name: "Age",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Age" */
            "../components/convert/Age.vue"
          )
      },
      {
        path: "/convert/Date",
        name: "Date",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Date" */
            "../components/convert/Date.vue"
          )
      },
      {
        path: "/convert/Discount",
        name: "Discount",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Discount" */
            "../components/convert/Discount.vue"
          )
      },
      {
        path: "/convert/Percentage",
        name: "Percentage",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Percentage" */
            "../components/convert/Percentage.vue"
          )
      },
      {
        path: "/convert/Length",
        name: "Length",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Length" */
            "../components/convert/Length.vue"
          )
      },
      {
        path: "/convert/Area",
        name: "Area",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Area" */
            "../components/convert/Area.vue"
          )
      },
      {
        path: "/convert/Volume",
        name: "Volume",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Volume" */
            "../components/convert/Volume.vue"
          )
      },
      {
        path: "/convert/Temperature",
        name: "Temperature",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Temperature" */
            "../components/convert/Temperature.vue"
          )
      },
      {
        path: "/convert/Speed",
        name: "Speed",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Speed" */
            "../components/convert/Speed.vue"
          )
      },
      {
        path: "/convert/Time",
        name: "Time",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Time" */
            "../components/convert/Time.vue"
          )
      },
      {
        path: "/convert/Mass",
        name: "Mass",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Mass" */
            "../components/convert/Mass.vue"
          )
      },
      {
        path: "/convert/Pressure",
        name: "Pressure",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Pressure" */
            "../components/convert/Pressure.vue"
          )
      },
      {
        path: "/convert/Energy",
        name: "Energy",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Energy" */
            "../components/convert/Energy.vue"
          )
      },
      {
        path: "/convert/Frequency",
        name: "Frequency",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "Frequency" */
            "../components/convert/Frequency.vue"
          )
      },
      {
        path: "/convert/DigitalStorage",
        name: "DigitalStorage",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "DigitalStorage" */
            "../components/convert/DigitalStorage.vue"
          )
      },
      {
        path: "/convert/NumeralSystem",
        name: "NumeralSystem",
        component: () =>
          import(
            /* webpackPrefetch: true */
            /* webpackChunkName: "NumeralSystem" */
            "../components/convert/NumeralSystem.vue"
          )
      }
    ]
  },
  {
    path: "/history/",
    name: "history",
    component: () =>
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "History" */
        "../views/History.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
