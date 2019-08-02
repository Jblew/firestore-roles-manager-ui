<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title v-if="loading">{{ text.loading }}...</v-toolbar-title>
            <v-toolbar-title v-else>{{ text.logInPanelTitle }}...</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div id="firebaseui-auth-container"></div>
            <div v-if="loading" class="text-center px-5 py-5">
              <v-progress-circular :size="70" :width="7" color="accent" indeterminate></v-progress-circular>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import { getConfig, labels, Store } from "../global";
import { FirebaseAuthHelper } from "../helper/FirebaseAuthHelper";
import { routes } from "../router/routes";
import { AuthModule } from "../store/modules/auth/AuthModule";

export default Vue.extend({
    data() {
        return {
            text: {
                logInPanelTitle: labels.logInPanelTitle,
                loading: labels.loading,
            },
        };
    },
    mounted() {
        FirebaseAuthHelper.startFirebaseAuthUI(
            "#firebaseui-auth-container",
            routes.home.path,
            getConfig().authProviders,
        );
    },
    computed: {
        loading(): boolean {
            return Store.of(this).state.auth.state === AuthModule.AuthState.LOADING;
        },
    },
});
</script>