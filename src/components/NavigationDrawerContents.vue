<template>
  <div>
    <profile-component />
    <p>&nbsp;</p>

    <v-list dense>
      <v-divider></v-divider>

      <material-drawer-tile-router
        :to="urls.rolesList"
        icon="list"
      >{{ text.rolesList | capitalize }}</material-drawer-tile-router>
    </v-list>
  </div>
</template>

<script lang="ts">
// @ts-check

import Vue from "vue";

import { labels } from "../global";
import { routes } from "../router/routes";

export default Vue.extend({
    props: [],
    data() {
        return {
            text: {
                rolesList: labels.rolesList,
            },
            urls: {
                rolesList: routes.home.path,
            },
        };
    },
    methods: {},
    computed: {},
    components: {},
});
</script>

<style lang="scss" scoped>
</style>