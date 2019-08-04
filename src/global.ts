import { CombinedVueInstance } from "vue/types/vue";
import { NotificationsModule } from "vuex-notifications-module";

import { Configuration } from "./config/Configuration";

export { labels } from "./labels";
export { Store } from "./store/Store";
export { visualConfig } from "./config/visual-config";

export function getConfig(): Configuration {
    return Configuration.get();
}

export function showNotification(
    vue: CombinedVueInstance<any, any, any, any, any>,
    notification: NotificationsModule.Notification,
) {
    NotificationsModule.Actions.ShowNotification.dispatch(vue.$store.dispatch, notification);
}
