import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home"
import Page2 from "../views/Record"
import Table from "../views/Table.vue"


Vue.use(VueRouter)

  const routes = [
    {
      name : "Home",
      path : "/",
      component : Home
    },
    {
      name : "Record",
      path : "/record",
      component : Page2
    },
    {
      name : "Table",
      path : "/table",
      component : Table
    },
    {
      name : "Graph",
      path : "/graph",
      component : () => import("@/views/Graph")
    }
      
]

const router = new VueRouter({
  routes
})

export default router
