import Vue from "vue";
import Router from "vue-router";

import { routes } from "./routes";
import Auth from "./views/Auth.vue";
import List from "./views/List.vue";

Vue.use(Router);

export default new Router({
    routes: [
        { ...routes.auth, component: Auth },
        { ...routes.home, component: List },
    ],
});
