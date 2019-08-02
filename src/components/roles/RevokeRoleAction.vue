<template>
  <action-button-modal
    v-model="dialog"
    icon="delete"
    :title="text.revokeRole"
    :questionText="questionText"
    :buttonsEnabled="buttonsEnabled"
    :loading="loading"
    :error="error"
    :cancelLabel="text.cancel"
    :acceptLabel="text.revoke"
    :tooltip="text.revokeRole"
    @accept="revokeRole()"
  />
</template>

<script lang="ts">
import Vue from "vue";

import { labels, showNotification } from "../../global";
import { FirestoreRolesHelper } from "../../helper/FirestoreRolesHelper";
import { RolesModule } from "../../store/modules/roles/RolesModule";

export default Vue.extend({
    props: {
        uid: String,
        displayName: String,
        email: String,
        role: String,
    },
    data() {
        return {
            dialog: false,
            text: {
                revokeRole: labels.revokeRole,
                revoke: labels.revoke,
                cancel: labels.cancel,
            },
            buttonsEnabled: true,
            loading: false,
            error: "",
        };
    },
    computed: {
        questionText() {
            return labels.revokeRoleTemplate
                .replace("$role", this.role)
                .replace("$displayName", this.displayName)
                .replace("$email", this.email)
                .replace("$uid", this.uid);
        },
    },
    methods: {
        revokeRole(): void {
            const self: any = this;
            self.loading = true;
            self.error = "";
            self.buttonsEnabled = false;
            FirestoreRolesHelper.revokeRole(self.uid, self.role, (error?: string) => {
                self.loading = false;
                self.error = error || "";
                self.buttonsEnabled = true;

                if (!error) {
                    RolesModule.Actions.ReloadAccounts.dispatch(this.$store.dispatch, { role: self.role });
                    self.dialog = false;
                    showNotification(this, {
                        message: labels.successfullyGrantedRole,
                        timeoutMs: 5000,
                        params: { color: "success" },
                    });
                }
            });
        },
    },
    components: {},
});
</script>
<style scoped lang="scss">
</style>