import "firebaseui/dist/firebaseui.css";
import "material-design-icons-iconfont/dist/material-design-icons.css"; // Ensure you are using css-loader
import "typeface-roboto"; // offline version of roboto font
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import App from "./App.vue";
import "./components/common/common_components";
import "./filters";
import router from "./router/router";
import { routes } from "./router/routes";
import { AuthModule } from "./store/modules/auth/AuthModule";
import { RootStore, Store } from "./store/Store";
import { StoreImpl } from "./store/StoreImpl";

Vue.config.productionTip = false;

// Vuetify
Vue.use(Vuetify);

new Vue({
    router,
    store: StoreImpl.store,
    render: h => h(App),
    computed: {
        authState(): AuthModule.AuthState {
            return Store.of(this).state.auth.state;
        },
    },
    watch: {
        authState(authState, oldAuthState) {
            if (authState === AuthModule.AuthState.NOTAUTHENTICATED) {
                this.$router.push(routes.auth.path);
            } else if (authState === AuthModule.AuthState.AUTHENTICATED) {
                // this.$store.dispatch(ListModule.Actions.updateQueryFilterAndReloadList, {});
            }
        },
    },
    created() {
        this.$store.dispatch(RootStore.Actions.initialize);
    },
    mounted() {
        //
    },
    methods: {},
}).$mount("#app");
