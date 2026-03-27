import { loadConfig } from "../core/utils/configLoader";

const config = await loadConfig();
const BASE_URL = config.APIBaseUrl;
const AUTH_BASE_URL = "";

export const api = {
    BASE_URL: BASE_URL,
    AUTH_BASE_URL: AUTH_BASE_URL,

    CATEGORY_ENDPOINT: "/api/category",
}
