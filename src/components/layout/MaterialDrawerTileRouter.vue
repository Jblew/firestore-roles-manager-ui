<template>
    <v-list-item :to="to" :href="href">
        <v-list-item-action>
            <v-icon>{{ icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
            <v-list-item-title>
                <slot></slot>
            </v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: ["to", "href", "icon"],
});
</script>
