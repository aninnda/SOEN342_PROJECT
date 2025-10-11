import wretch from "wretch";

// can be configured later if we want to deploy
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = wretch().url(API_URL);

export default api;
