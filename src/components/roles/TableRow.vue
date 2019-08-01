<template>
  <tr :class="requesting ? 'grey': ''">
    <td class="text-xs">
      <v-progress-circular :size="12" :width="1" indeterminate v-if="loading" />
      <span v-if="error" class="red--text mx-2">{{ error }}</span>
      {{ displayName }}
      <v-chip v-if="requesting" color="accent" class="mx-2" label small>{{ text.request }}</v-chip>
    </td>
    <td class="text-xs">{{ email }}</td>
    <td class="text-xs">{{ uid }}</td>
    <td class="text-xs">...</td>
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