<template>
  <div :style="{ display: 'inline-block' }">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn small class="mx-1 mb-1" @click.stop="$emit('input', true)" v-on="on">
          <v-icon small>{{ icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
    <v-dialog :value="value" persistent width="500">
      <v-card>
        <v-card-title>{{ title }}</v-card-title>

        <v-card-text v-if="hasContentSlot">
          <slot></slot>
        </v-card-text>

        <v-card-text>{{ questionText }}</v-card-text>

        <v-divider v-if="loading || error"></v-divider>

        <v-card-text text-center v-if="loading">
          <v-flex text-center>
            <loading-indicator />
          </v-flex>
        </v-card-text>
        <v-card-text text-center v-if="error">
          <v-alert type="error">{{ error }}</v-alert>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click.stop.prevent="$emit('input', false)"
            :disabled="!buttonsEnabled"
          >{{ cancelLabel }}</v-btn>
          <v-btn
            color="green"
            text
            @click.stop.prevent="$emit('accept')"
            :disabled="!buttonsEnabled"
          >{{ acceptLabel }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        icon: String,
        title: String,
        questionText: String,
        buttonsEnabled: Boolean,
        loading: Boolean,
        error: String,
        value: Boolean,
        acceptLabel: String,
        cancelLabel: String,
        tooltip: String,
    },
    data() {
        return {};
    },
    computed: {
        hasContentSlot() {
            return !!this.$slots.default;
        },
    },
});
</script>
<style scoped lang="scss">
</style>