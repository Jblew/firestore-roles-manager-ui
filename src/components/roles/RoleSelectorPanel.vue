<template>
    <v-layout>
        <v-flex xs12>
            <v-card class="mb-3 elevation-1">
                <v-card-actions>
                    <span class="px-3">{{ text. selectRole }}:</span>
                    <v-btn
                        v-for="role in availableRoles"
                        :key="role"
                        :color="role === selectedRole ? 'accent' : 'black'"
                        :disabled="!buttonsActive"
                        @click="reloadAccounts(role)"
                    >{{ role | capitalize }}</v-btn>
                </v-card-actions>
            </v-card>
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
            availableRoles: FirestoreRolesAdapter.getInstance().getAvailableRoles(),
            text: {
                selectRole: labels.selectRole,
            },
        };
    },
    computed: {
        selectedRole(): string {
            return RolesModule.stateOf(this).role;
        },
        loading(): boolean {
            return RolesModule.stateOf(this).state.loading;
        },
        buttonsActive(): boolean {
            return true;
        },
    },
    methods: {
        reloadAccounts(role: string) {
            RolesModule.Actions.ReloadAccounts.dispatch(this.$store.dispatch, { role });
        },
    },
    components: {},
});
</script>
<style scoped lang="scss">
</style>