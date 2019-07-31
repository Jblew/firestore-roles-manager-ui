// tslint:disable:ordered-imports

import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import { Configuration } from "@/config/Configuration";
import { FirestoreRolesHelper } from "./FirestoreRolesHelper";

export class FirebaseAuthHelper {
    public static initialize(opts: FirebaseAuthHelper.InitializeOptions) {
        firebase.initializeApp(Configuration.get().firebase);
        firebase.auth().onAuthStateChanged((user: FirebaseAuthHelper.User | null) => {
            if (user) {
                FirebaseAuthHelper.userAuthenticated(user, opts);
            } else {
                opts.notAuthenticatedCb();
            }
        });
    }

    public static async signOut() {
        await firebase.auth().signOut();
    }

    public static doAuth(): firebase.auth.Auth {
        return firebase.auth();
    }

    public static startFirebaseAuthUI(id: string, signInSuccessfulUrl: string, signInProviders: string[]) {
        const uiConfig = {
            signInSuccessUrl: signInSuccessfulUrl,
            signInOptions: signInProviders,
        };
        FirebaseAuthHelper.UI_INSTANCE =
            FirebaseAuthHelper.UI_INSTANCE || new firebaseui.auth.AuthUI(FirebaseAuthHelper.doAuth());
        FirebaseAuthHelper.UI_INSTANCE.start(id, uiConfig);
    }

    private static UI_INSTANCE: firebaseui.auth.AuthUI | undefined = undefined;

    private static userAuthenticated(user: FirebaseAuthHelper.User, opts: FirebaseAuthHelper.InitializeOptions) {
        FirebaseAuthHelper.ensureUserRegistered(user)
            .then(() => opts.authenticatedCb(user))
            .catch(err => opts.errorCb(err.message));
    }

    private static async ensureUserRegistered(user: FirebaseAuthHelper.User) {
        const userExists = await FirestoreRolesHelper.roles().userExists(user.uid);
        if (!userExists) {
            await FirestoreRolesHelper.roles().registerUser(user);
        }
    }
}

export namespace FirebaseAuthHelper {
    export interface InitializeOptions {
        authenticatedCb: (user: FirebaseAuthHelper.User) => void;
        errorCb: (msg: string) => void;
        notAuthenticatedCb: () => void;
    }

    export type User = firebase.User;
}
