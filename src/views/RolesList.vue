<template>
  <div>
    <role-selector-panel />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import RoleSelectorPanel from "../components/roles/RoleSelectorPanel.vue";

export default Vue.extend({
    data() {
        return {};
    },
    methods: {},
    components: {
        RoleSelectorPanel,
    },
});
</script>
<style scoped lang="scss">
</style>