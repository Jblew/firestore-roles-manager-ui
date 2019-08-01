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
        <template v-slot:items="props">
          <td class="text-xs">{{ props.item.loading }}</td>
          <td class="text-xs">{{ props.item.error }}</td>
          <td class="text-xs">{{ props.item.displayName }}</td>
          <td class="text-xs">{{ props.item.email }}</td>
          <td class="text-xs">{{ props.item.uid }}</td>
          <td class="text-xs">{{ props.item.requesting }}</td>
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

export default Vue.extend({
    data() {
        return {
            itemsPerPage: 20,
            text: {
                selectRole: labels.selectRole,
            },
            headers: [
                {
                    text: labels.loading,
                    value: RolesModule.AccountLoaderRow.KEYS.loading,
                },
                {
                    text: labels.error,
                    value: RolesModule.AccountLoaderRow.KEYS.error,
                },
                { text: labels.name, value: RolesModule.AccountLoaderRow.KEYS.displayName },
                { text: labels.email, value: RolesModule.AccountLoaderRow.KEYS.email },
                { text: labels.uid, value: RolesModule.AccountLoaderRow.KEYS.uid },
                { text: labels.actions, value: RolesModule.AccountLoaderRow.KEYS.requesting },
            ],
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
    components: {},
});
</script>
<style scoped lang="scss">
</style>