import Vue from "vue";
import Router from "vue-router";

import Auth from "../views/Auth.vue";
import List from "../views/List.vue";

import { routes } from "./routes";

Vue.use(Router);

export default new Router({
    routes: [{ ...routes.auth, component: Auth }, { ...routes.home, component: List }],
});
