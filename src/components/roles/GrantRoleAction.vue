<template>
  <action-button-modal
    v-model="dialog"
    icon="add"
    :title="text.grantRole"
    :questionText="questionText"
    :buttonsEnabled="buttonsEnabled"
    :loading="loading"
    :error="error"
    :cancelLabel="text.cancel"
    :acceptLabel="text.grant"
    :tooltip="text.grantRole"
    @accept="grantRole()"
  >
    <v-text-field :label="text.uid" v-model="uid" :disabled="!buttonsEnabled"></v-text-field>
  </action-button-modal>
</template>

<script lang="ts">
import Vue from "vue";

import { labels, showNotification } from "../../global";
import { FirestoreRolesHelper } from "../../helper/FirestoreRolesHelper";
import { RolesModule } from "../../store/modules/roles/RolesModule";

export default Vue.extend({
    props: {
        role: String,
    },
    data() {
        return {
            dialog: false,
            text: {
                grantRole: labels.grantRole,
                grant: labels.grant,
                cancel: labels.cancel,
                uid: labels.uid,
            },
            buttonsEnabled: true,
            loading: false,
            error: "",
            uid: "",
        };
    },
    computed: {
        questionText() {
            return labels.grantRoleTemplate.replace("$role", this.role).replace("$uid", this.uid);
        },
    },
    methods: {
        grantRole(): void {
            const self: any = this;
            self.loading = true;
            self.error = "";
            self.buttonsEnabled = false;
            FirestoreRolesHelper.grantRole(self.uid, self.role, (error?: string) => {
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