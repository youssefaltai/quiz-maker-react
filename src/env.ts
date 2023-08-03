var env = "dev";
export const API_URL = env === "dev" ? import.meta.env.VITE_API_URL_DEV : import.meta.env.VITE_API_URL_PROD;
