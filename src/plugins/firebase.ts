import * as firebase from "firebase/app";

import { Configuration } from "../config/Configuration";

export function initFirebase() {
    firebase.initializeApp(Configuration.get().firebase);
}
