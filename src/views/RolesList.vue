<template>
  <v-container flex>
    <role-selector-panel />
    <role-loading-state />
    <role-accounts-table />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

import RoleAccountsTable from "../components/roles/RoleAccountsTable.vue";
import RoleLoadingState from "../components/roles/RoleLoadingState.vue";
import RoleSelectorPanel from "../components/roles/RoleSelectorPanel.vue";

export default Vue.extend({
    data() {
        return {};
    },
    methods: {},
    components: {
        RoleSelectorPanel,
        RoleAccountsTable,
        RoleLoadingState,
    },
});
</script>
<style scoped lang="scss">
</style>