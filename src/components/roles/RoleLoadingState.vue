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
            availableRoles: FirestoreRolesAdapter.getInstance().getAvailableRoles(),
            text: {
                selectRole: labels.selectRole,
                couldNotLoadAccounts: labels.couldNotLoadAccounts,
            },
        };
    },
    computed: {
        selectedRole(): string {
            return RolesModule.stateOf(this).role;
        },
        loading(): boolean {
            return RolesModule.stateOf(this).state.loading;
        },
        error(): string {
            return RolesModule.stateOf(this).state.error;
        },
        buttonsActive(): boolean {
            return !this.loading;
        },
    },
    methods: {
        reloadAccounts(role: string) {
            RolesModule.Actions.ReloadAccounts.dispatch(this.$store.dispatch, { role });
        },
    },
    components: {},
});
</script>
<style scoped lang="scss">
</style>