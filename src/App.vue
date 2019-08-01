<template>
  <v-app id="app">
    <drawer-layout v-if="authenticated">
      <router-view />
    </drawer-layout>
    <v-content v-else>
      <auth-view />
    </v-content>
    <footer-component />
    <notifications-snackbar />
  </v-app>
</template>

<script lang="ts">
// @ts-check

import Vue from "vue";

import DrawerLayout from "./components/layout/DrawerLayout.vue";
import FooterComponent from "./components/layout/Footer.vue";
import NotificationsSnackbar from "./components/misc/NotificationsSnackbar.vue";
import { Store, visualConfig } from "./global";
import { AuthModule } from "./store/modules/auth/AuthModule";
import AuthView from "./views/Auth.vue";

export default Vue.extend({
    props: [],
    data() {
        return {
            text: {
                appTitle: visualConfig.appTitle,
            },
            drawer: null,
        };
    },
    methods: {},
    computed: {
        authenticated(): boolean {
            return Store.of(this).state.auth.state === AuthModule.AuthState.AUTHENTICATED;
        },
    },
    components: {
        AuthView,
        DrawerLayout,
        FooterComponent,
        NotificationsSnackbar,
    },
});
</script>

<style lang="scss" scoped>
#app {
    background: #303030 url("~@/assets/bg.jpg") no-repeat bottom left;
    background-size: 40%;
}
</style>