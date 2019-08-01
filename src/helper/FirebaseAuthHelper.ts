// tslint:disable:ordered-imports no-console

import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import { Configuration } from "@/config/Configuration";
import { FirestoreRolesAdapter } from "../adapter/FirestoreRolesAdapter";

export class FirebaseAuthHelper {
    public static initialize(opts: FirebaseAuthHelper.InitializeOptions) {
        firebase.initializeApp(Configuration.get().firebase);
        firebase.auth().onAuthStateChanged(
            (user: FirebaseAuthHelper.User | null) => {
                if (user) {
                    console.log("FirebaseAuthHelper: authenticated");
                    FirebaseAuthHelper.userAuthenticated(user, opts);
                } else {
                    opts.notAuthenticatedCb();
                    console.log("FirebaseAuthHelper: not authenticated");
                }
            },
            (error: firebase.auth.Error) => {
                console.error(`Auth error: ${error.message}`);
                opts.errorCb(error.message);
            },
        );
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
        console.log("FirebaseAuthHelper: Ensure user registered");
        FirebaseAuthHelper.ensureUserRegistered(user)
            .then(() => {
                console.log("Successfully registered user");
                opts.authenticatedCb(user);
            })
            .catch(err => {
                console.error(`Could not register user: ${err}`);
                opts.errorCb(err.message);
            });
    }

    private static async ensureUserRegistered(user: FirebaseAuthHelper.User): Promise<void> {
        console.log("Calling user exists on uid " + user.uid);
        const userExists = await FirestoreRolesAdapter.getInstance().userExists(user.uid);
        if (!userExists) {
            await FirestoreRolesAdapter.getInstance().registerUser(user);
        } else {
            console.log("User already exists");
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
