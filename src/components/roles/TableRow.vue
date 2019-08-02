<template>
  <tr :class="requesting ? 'grey': ''">
    <td class="text-xs">
      <v-progress-circular v-if="loading" :size="12" :width="1" indeterminate class="mr-2" />
      <i v-if="error" class="red--text mr-2">{{ error }}</i>
      {{ displayName }}
      <v-chip v-if="requesting" color="black" class="mx-2" label small>{{ text.request }}</v-chip>
    </td>
    <td class="text-xs">{{ email }}</td>
    <td class="text-xs uid-field">{{ uid }}</td>
    <td class="text-xs actions-field">
      <span v-if="requesting">
        <accept-request-action :uid="uid" :displayName="displayName" :email="email" :role="role" />
        <reject-request-action :uid="uid" :displayName="displayName" :email="email" :role="role" />&nbsp;
      </span>
      <span v-else>
        <revoke-role-action :uid="uid" :displayName="displayName" :email="email" :role="role" />
      </span>
    </td>
  </tr>
</template>

<script lang="ts">
import { AccountRecord } from "firestore-roles";
import Vue from "vue";

import { labels, showNotification } from "../../global";
import { RolesModule } from "../../store/modules/roles/RolesModule";

import AcceptRequestAction from "./AcceptRequestAction.vue";
import RejectRequestAction from "./RejectRequestAction.vue";
import RevokeRoleAction from "./RevokeRoleAction.vue";

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
            return this.account ? this.account.displayName || "(unknown)" : "(not loaded)";
        },
        email(): string {
            return this.account ? this.account.email || "(unknown)" : "(not loaded)";
        },
        role(): string {
            return RolesModule.stateOf(this).data.loadedForRole;
        },
    },
    methods: {},
    components: {
        AcceptRequestAction,
        RejectRequestAction,
        RevokeRoleAction,
    },
});
</script>
<style scoped lang="scss">
.uid-field {
    max-width: 150px;
    overflow-x: scroll;
}

.actions-field {
    text-align: right;
}
</style>