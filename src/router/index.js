
import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue"
import Stocks from "../pages/Stocks.vue"
import Customers from "../pages/Customers.vue"
const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
   
  },
  {
    path: "/stocks",
    component: Stocks,
    name: "Stocks",
   
  },
  {
    path: "/Customers",
    component: Customers,
    name: "Customers",
   
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;