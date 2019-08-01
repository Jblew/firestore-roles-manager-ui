import "@mdi/font/css/materialdesignicons.css";
import "firebase/app";
import "firebase/firestore";
import "firebaseui/dist/firebaseui.css";
import "typeface-roboto"; // offline version of roboto font
import Vue from "vue";

import App from "./App.vue";
import "./filters";
import vuetify from "./plugins/vuetify"; // path to vuetify export
import router from "./router/router";
import { routes } from "./router/routes";
import { AuthModule } from "./store/modules/auth/AuthModule";
import { RootStore, Store } from "./store/Store";
import { StoreImpl } from "./store/StoreImpl";

Vue.config.productionTip = false;

const vuetifyOpt: any = { vuetify };
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
    ...vuetifyOpt,
}).$mount("#app");
