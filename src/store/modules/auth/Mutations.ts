import { AuthModule as Me } from "./AuthModule";

export class Mutations {
    public static setUser = Me.localName("setUser");
    public static resetUser = Me.localName("resetUser");
    public static setState = Me.localName("setState");
}
