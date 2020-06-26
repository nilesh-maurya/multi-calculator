import Vue from "vue";
import VueRouter from "vue-router";
import Calculator from "../views/Calculator.vue";
import BMI from "../components/convert/BMI.vue";
import Angle from "../components/convert/Angle.vue";
import Age from "../components/convert/Age.vue";
import Date from "../components/convert/Date.vue";
import Discount from "../components/convert/Discount.vue";
import Percentage from "../components/convert/Percentage.vue";
import SplitBill from "../components/convert/SplitBill.vue";
import Length from "../components/convert/Length.vue";
import Area from "../components/convert/Area.vue";
import Volume from "../components/convert/Volume.vue";
import Temperature from "../components/convert/Temperature.vue";
import Speed from "../components/convert/Speed.vue";
import Time from "../components/convert/Time.vue";
import Mass from "../components/convert/Mass.vue";
import Pressure from "../components/convert/Pressure.vue";
import Energy from "../components/convert/Energy.vue";
import Frequency from "../components/convert/Frequency.vue";
import DigitalStorage from "../components/convert/DigitalStorage.vue";
import NumeralSystem from "../components/convert/NumeralSystem.vue";

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
        component: BMI
      },
      {
        path: "/convert/Angle",
        name: "Angle",
        component: Angle
      },
      {
        path: "/convert/Age",
        name: "Age",
        component: Age
      },
      {
        path: "/convert/Date",
        name: "Date",
        component: Date
      },
      {
        path: "/convert/Discount",
        name: "Discount",
        component: Discount
      },
      {
        path: "/convert/Percentage",
        name: "Percentage",
        component: Percentage
      },
      {
        path: "/convert/SplitBill",
        name: "SplitBill",
        component: SplitBill
      },
      {
        path: "/convert/Length",
        name: "Length",
        component: Length
      },
      {
        path: "/convert/Area",
        name: "Area",
        component: Area
      },
      {
        path: "/convert/Volume",
        name: "Volume",
        component: Volume
      },
      {
        path: "/convert/Temperature",
        name: "Temperature",
        component: Temperature
      },
      {
        path: "/convert/Speed",
        name: "Speed",
        component: Speed
      },
      {
        path: "/convert/Time",
        name: "Time",
        component: Time
      },
      {
        path: "/convert/Mass",
        name: "Mass",
        component: Mass
      },
      {
        path: "/convert/Pressure",
        name: "Pressure",
        component: Pressure
      },
      {
        path: "/convert/Energy",
        name: "Energy",
        component: Energy
      },
      {
        path: "/convert/Frequency",
        name: "Frequency",
        component: Frequency
      },
      {
        path: "/convert/DigitalStorage",
        name: "DigitalStorage",
        component: DigitalStorage
      },
      {
        path: "/convert/NumeralSystem",
        name: "NumeralSystem",
        component: NumeralSystem
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
