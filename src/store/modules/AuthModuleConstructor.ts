import * as firebase from "firebase/app";
import {
    Configuration as RolesAuthConfiguration,
    RolesAuthModule,
    RolesAuthModuleImpl,
} from "firestore-roles-vuex-module";
import { Module as VuexModule } from "vuex";

import { Configuration } from "../../config/Configuration";

export namespace AuthModuleConstructor {
    export function constructAuthModule(
        authCallbacks: RolesAuthConfiguration.AuthCallbacks,
        firebaseAuth: firebase.auth.Auth,
        firestore: firebase.firestore.Firestore,
    ): VuexModule<RolesAuthModule.State, any> {
        const config: RolesAuthConfiguration = {
            roles: Configuration.get().roles,
            callbacks: authCallbacks,
        };
        return RolesAuthModuleImpl.constructModule(config, firebaseAuth, firestore);
    }
}
