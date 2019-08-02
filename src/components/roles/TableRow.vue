<template>
  <tr :class="requesting ? 'grey': ''">
    <td class="text-xs">
      <v-progress-circular v-if="loading" :size="12" :width="1" indeterminate class="mr-2" />
      <i v-if="error" class="red--text mr-2">{{ error }}</i>
      {{ displayName }}
      <v-chip v-if="requesting" color="black" class="mx-2" label small>{{ text.request }}</v-chip>
    </td>
    <td class="text-xs">{{ email }}</td>
    <td class="text-xs">{{ uid }}</td>
    <td class="text-xs">
      <span v-if="requesting">
        <v-btn small class="mx-1">
          <v-icon small>check</v-icon>
        </v-btn>
        <v-btn small class="mx-1">
          <v-icon small>close</v-icon>
        </v-btn>
      </span>
      <span v-else>
        <v-btn small class="mx-1">
          <v-icon small>delete</v-icon>
        </v-btn>
      </span>
      <v-btn small class="mx-1">
        <v-icon small>build</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from "vue";

import { FirestoreRolesAdapter } from "../../adapter/FirestoreRolesAdapter";
import { labels } from "../../global";
import { RolesModule } from "../../store/modules/roles/RolesModule";
import { AccountRecord } from "firestore-roles";

export default Vue.extend({
    props: {
        uid: String,
        requesting: Boolean,
    },
    data() {
        return {
            text: {
                request: labels.request,
            },
        };
    },
    computed: {
        cached(): RolesModule.AccountCacheRecord {
            return RolesModule.stateOf(this).accountCache[this.uid];
        },
        account(): AccountRecord | undefined {
            return this.cached ? this.cached.account : undefined;
        },
        loading(): boolean {
            return this.cached && !!this.cached.loading;
        },
        error(): string {
            return this.cached ? this.cached.error || "" : "";
        },
        displayName(): string {
            return this.account ? this.account.displayName || "" : "";
        },
        email(): string {
            return this.account ? this.account.email || "" : "";
        },
    },
    methods: {},
    components: {},
});
</script>
<style scoped lang="scss">
</style>