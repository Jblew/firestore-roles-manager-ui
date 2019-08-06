<template>
  <v-layout wrap class="py-5">
    <v-flex v-if="loading" xs12 text-center class="my-2">
      <loading-indicator />
    </v-flex>
    <v-flex v-if="error.length > 0" xs12 text-center class="my-2">
      <v-alert type="error">{{ text.couldNotLoadAccounts }}. {{ error }}</v-alert>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";

import { FirestoreRolesAdapter } from "../../adapter/FirestoreRolesAdapter";
import { labels } from "../../global";
import { RolesModule } from "../../store/modules/roles/RolesModule";

export default Vue.extend({
    data() {
        return {
            text: {
                couldNotLoadAccounts: labels.couldNotLoadAccounts,
            },
        };
    },
    computed: {
        loading(): boolean {
            return RolesModule.stateOf(this).state.loading;
        },
        error(): string {
            return RolesModule.stateOf(this).state.error;
        },
    },
});
</script>
<style scoped lang="scss">
</style>