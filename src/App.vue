<template>
  <v-app id="inspire app">
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <navigation-drawer-contents />
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left color="#00885B" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ text.appTitle }}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-start>
          <v-flex>
            <router-view v-if="authenticated" />
            <auth-view v-else />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <footer-component />
  </v-app>
</template>

<script lang="ts">
// @ts-check

import Vue from "vue";

import FooterComponent from "./components/Footer.vue";
import NavigationDrawerContents from "./components/NavigationDrawerContents.vue";
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
        FooterComponent,
        NavigationDrawerContents,
    },
});
</script>

<style lang="scss" scoped>
</style>