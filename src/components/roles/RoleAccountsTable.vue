<template>
  <v-layout>Table...</v-layout>
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