import Vue from "vue";

import ActionButtonModal from "./ActionButtonModal.vue";
import LoadingIndicator from "./LoadingIndicator.vue";

// components registered here do not need to be imported in the components
Vue.component("loading-indicator", LoadingIndicator);
Vue.component("action-button-modal", ActionButtonModal);
