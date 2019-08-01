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
          <tr :class="props.item.requesting ? 'grey': ''">
            <td class="text-xs">
              <v-progress-circular :size="12" :width="1" indeterminate v-if="props.item.loading" />
              <span v-if="props.item.error.length > 0" class="red--text mx-2">{{ props.item.error }}</span>
              {{ props.item.displayName }}
              <v-chip
                v-if="props.item.requesting"
                color="accent"
                class="mx-2"
                label
                small
              >{{ text.request }}</v-chip>
            </td>
            <td class="text-xs">{{ props.item.email }}</td>
            <td class="text-xs">{{ props.item.uid }}</td>
            <td class="text-xs">...</td>
          </tr>
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
                request: labels.request,
                actions: labels.actions,
            },
            headers: [
                {
                    text: labels.name,
                },
                {
                    text: labels.email,
                    value: RolesModule.AccountLoaderRow.KEYS.error,
                },
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