<template>
  <v-layout wrap>
    <v-flex v-if="!role" xs12 text-center class="my-2">
      <i>{{ text.pleaseSelectRole }}</i>
    </v-flex>
    <v-flex v-if="!loading && !error && role" xs12 class="my-2">
      <grant-role-action :role="role" />
    </v-flex>
    <v-flex xs12>
      <v-data-table
        v-if="rows.length > 0"
        :headers="headers"
        :items="rows"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        class="elevation-1"
      >
        <template v-slot:item="props">
          <table-row :uid="props.item.uid" :requesting="props.item.requesting" />
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";

import { FirestoreRolesAdapter } from "../../adapter/FirestoreRolesAdapter";
import { labels } from "../../global";
import { RolesModule } from "../../store/modules/roles/RolesModule";

import TableRow from "./TableRow.vue";
import GrantRoleAction from "./GrantRoleAction.vue";

export default Vue.extend({
    data() {
        return {
            itemsPerPage: 20,
            page: 1,
            text: {
                selectRole: labels.selectRole,
                request: labels.request,
                actions: labels.actions,
                pleaseSelectRole: labels.pleaseSelectRole,
            },
            headers: [{ text: labels.name }, { text: labels.email }, { text: labels.uid }, { text: labels.actions }],
        };
    },
    computed: {
        role(): string {
            return RolesModule.stateOf(this).data.loadedForRole;
        },
        loading(): boolean {
            return RolesModule.stateOf(this).state.loading;
        },
        error(): string {
            return RolesModule.stateOf(this).state.error;
        },
        rows(): RolesModule.AccountLoaderRow[] {
            return RolesModule.stateOf(this).data.accounts;
        },
    },
    methods: {},
    components: {
        TableRow,
        GrantRoleAction,
    },
});
</script>
<style scoped lang="scss">
</style>