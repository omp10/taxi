const DEFAULT_LOCAL_BACKEND_ORIGIN = 'http://localhost:4000';

const trimTrailingSlash = (value = '') => value.replace(/\/+$/, '');
const isAbsoluteUrl = (value = '') => /^https?:\/\//i.test(value);

const configuredApiBaseUrl = trimTrailingSlash(import.meta.env.VITE_API_BASE_URL || '');
const fallbackApiBaseUrl = import.meta.env.DEV
  ? `${DEFAULT_LOCAL_BACKEND_ORIGIN}/api/v1`
  : '/api/v1';

export const API_BASE_URL = trimTrailingSlash(
  configuredApiBaseUrl || fallbackApiBaseUrl,
);

export const BACKEND_ORIGIN = trimTrailingSlash(
  import.meta.env.VITE_BACKEND_ORIGIN ||
    import.meta.env.VITE_SOCKET_URL ||
    import.meta.env.VITE_ASSET_BASE_URL ||
    (isAbsoluteUrl(API_BASE_URL) ? API_BASE_URL.replace(/\/api(?:\/v1)?$/, '') : '') ||
    (import.meta.env.DEV ? DEFAULT_LOCAL_BACKEND_ORIGIN : ''),
);

export const BACKEND_LABEL = BACKEND_ORIGIN || API_BASE_URL;
