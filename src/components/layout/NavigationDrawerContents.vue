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
import Vue from "vue";

import { labels } from "../../global";
import { routes } from "../../router/routes";

import MaterialDrawerTileRouter from "./MaterialDrawerTileRouter.vue";
import ProfileComponent from "./ProfileComponent.vue";

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
    components: {
        MaterialDrawerTileRouter,
        ProfileComponent,
    },
});
</script>

<style lang="scss" scoped>
</style>