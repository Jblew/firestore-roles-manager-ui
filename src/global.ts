import { Configuration } from "./config/Configuration";

export { labels } from "./labels";
export { s } from "./store/store";
export { visualConfig } from "./config/visual-config";
export const config = Configuration.load();
