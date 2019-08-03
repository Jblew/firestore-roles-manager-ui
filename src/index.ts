import "firebase/app";
import "firebase/firestore";
import "firebaseui/dist/firebaseui.css";
import Vue from "vue";

import App from "./App.vue";
import "./components/common/common_components";
import "./filters";
import vuetify from "./plugins/vuetify"; // path to vuetify export
import createRouter from "./router/router";
import { routes } from "./router/routes";
import { AuthModule } from "./store/modules/auth/AuthModule";
import { RootStore, Store } from "./store/Store";
import { StoreImpl } from "./store/StoreImpl";

export default () =>
    new Vue({
        router: createRouter(),
        store: StoreImpl.store,
        render: h => h(App),
        computed: {
            authState(): AuthModule.AuthState {
                return Store.of(this).state.auth.state;
            },
        },
        watch: {
            authState(authState, oldAuthState) {
                if (authState === AuthModule.AuthState.AUTHENTICATED) {
                    // already handled in App.vue
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
        ...({ vuetify } as any), // type incompatibility
    });
