import Vue from "vue";
import Router from "vue-router";

import RolesList from "../views/RolesList.vue";

import { routes } from "./routes";

Vue.use(Router);

export default new Router({
    routes: [{ ...routes.home, component: RolesList }],
});
