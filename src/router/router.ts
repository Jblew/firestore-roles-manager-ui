import Vue from "vue";
import Router from "vue-router";

import { Configuration } from "../config/Configuration";
import RolesList from "../views/RolesList.vue";

import { routes } from "./routes";

Vue.use(Router);

export default () => {
    return new Router({
        base: Configuration.get().basePath,
        routes: [{ ...routes.home, component: RolesList }],
    });
};
