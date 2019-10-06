<template>
    <div>
        <profile-component />

        <v-list dense>
            <v-divider class="divider"></v-divider>
            <br />

            <material-drawer-tile-router
                :to="urls.rolesList"
                icon="fa-shield-alt"
            >{{ text.rolesList | capitalize }}</material-drawer-tile-router>

            <br />
            <v-divider v-if="configuredMenuLinks.length > 0" class="divider"></v-divider>
            <br />

            <material-drawer-tile-router
                v-for="link in configuredMenuLinks"
                :key="link.text"
                :href="link.href"
                :icon="link.icon"
                :target="link.target"
            >{{ link.text }}</material-drawer-tile-router>
        </v-list>
    </div>
</template>

<script lang="ts">
import { Configuration } from "@/config/Configuration";
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
    computed: {
        configuredMenuLinks(): Configuration.MenuLink[] {
            return Configuration.get().menuLinks || [];
        },
    },
    components: {
        MaterialDrawerTileRouter,
        ProfileComponent,
    },
});
</script>

<style lang="scss" scoped>
.divider {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
</style>