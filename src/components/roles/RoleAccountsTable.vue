<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-data-table
        v-if="rows.length > 0"
        :headers="headers"
        :items="rows"
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

export default Vue.extend({
    data() {
        return {
            itemsPerPage: 20,
            text: {
                selectRole: labels.selectRole,
                request: labels.request,
                actions: labels.actions,
            },
            headers: [{ text: labels.name }, { text: labels.email }, { text: labels.uid }, { text: labels.actions }],
        };
    },
    computed: {
        loading(): boolean {
            return RolesModule.stateOf(this).state.loading;
        },
        rows(): RolesModule.AccountLoaderRow[] {
            return RolesModule.stateOf(this).data.accounts;
        },
    },
    methods: {},
    components: {
      TableRow,
    },
});
</script>
<style scoped lang="scss">
</style>