import { Action as VuexAction, ActionTree } from "vuex";

import { Mutations } from "./Mutations";
import { NotificationsModule as Me } from "./NotificationsModule";

type ActionFn = VuexAction<Me.State, Me.State>;

const showNotification: ActionFn = ({ commit, state }, payload: Me.Notification) => {
    Me.Notification.validate(payload);

    const commitedNotification: Me.CommitedNotification = {
        message: payload.message,
        timestampGoneMs: Date.now() + payload.timeoutMs,
        params: payload.params || {},
    };

    const newNotifications = [...state.notifications, commitedNotification];
    commit(Mutations.setNotifications, newNotifications);
};

export const actions: ActionTree<Me.State, Me.State> = {
    [Me.Actions.showNotification]: showNotification,
};
