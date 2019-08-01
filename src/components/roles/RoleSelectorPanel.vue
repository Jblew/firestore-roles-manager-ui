<template>
  <div>
    <v-card class="mb-3 elevation-1">
      <v-card-actions>
        <span class="px-3">Select roles:</span>
        <v-btn v-for="role in availableRoles" :key="role">{{ role | capitalize }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { FirestoreRolesAdapter } from "../../adapter/FirestoreRolesAdapter";

export default Vue.extend({
    data() {
        return {
            availableRoles: FirestoreRolesAdapter.getInstance().getAvailableRoles(),
        };
    },
    methods: {},
    components: {},
});
</script>
<style scoped lang="scss">
</style>