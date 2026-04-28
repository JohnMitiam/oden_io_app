import { loadConfig } from "../core/utils/configLoader";

const config = await loadConfig();
const BASE_URL = config.APIBaseUrl;
const AUTH_BASE_URL = config.firebase.authDomain;

export const api = {
    BASE_URL: BASE_URL,
    AUTH_BASE_URL: AUTH_BASE_URL,
    AFFILIATE_ENDPOINT: "/api/affiliate",
    CATEGORY_ENDPOINT: "/api/category",
    PRODUCT_ENPOINT: "/api/products",
}
