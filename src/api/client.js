/**
 * BioLab — Axios HTTP Client
 * ────────────────────────────────────────────────────────────────────
 * Central Axios instance for all API calls through the Gateway (:8080).
 *
 * Security features:
 *  - Attaches Bearer token on every request
 *  - Intercepts 401 → attempts silent refresh-token rotation
 *  - If refresh fails → clears auth and redirects to /login
 *  - Passes X-Request-ID for distributed tracing
 */
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const client = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Token helpers (in-memory primary, localStorage fallback for refresh) ──
let _accessToken = null;

export const tokenStore = {
  getAccess:  ()     => _accessToken,
  setAccess:  (t)    => { _accessToken = t; },
  clearAccess:()     => { _accessToken = null; },

  getRefresh:  ()    => localStorage.getItem('biolab_rt'),
  setRefresh:  (t)   => localStorage.setItem('biolab_rt', t),
  clearRefresh:()    => localStorage.removeItem('biolab_rt'),

  getUser:     ()    => { try { return JSON.parse(localStorage.getItem('biolab_user')); } catch { return null; } },
  setUser:     (u)   => localStorage.setItem('biolab_user', JSON.stringify(u)),
  clearUser:   ()    => localStorage.removeItem('biolab_user'),

  clear: () => {
    _accessToken = null;
    localStorage.removeItem('biolab_rt');
    localStorage.removeItem('biolab_user');
  },
};

// ── Request interceptor: attach Bearer token ──────────────────────────────
client.interceptors.request.use(
  (config) => {
    const token = tokenStore.getAccess();
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    // Distributed tracing
    config.headers['X-Request-ID'] = crypto.randomUUID();
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: silent token refresh on 401 ────────────────────
let _refreshing = false;
let _waitQueue = [];

const processQueue = (error, token = null) => {
  _waitQueue.forEach((p) => error ? p.reject(error) : p.resolve(token));
  _waitQueue = [];
};

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Only retry once on 401 and only for authenticated requests
    if (error.response?.status === 401 && !original._retry) {
      const refreshToken = tokenStore.getRefresh();

      if (!refreshToken) {
        tokenStore.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (_refreshing) {
        // Queue this request until refresh completes
        return new Promise((resolve, reject) => {
          _waitQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers['Authorization'] = `Bearer ${token}`;
          return client(original);
        });
      }

      original._retry = true;
      _refreshing = true;

      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/auth/refresh-token`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const newAccess = data.accessToken;
        const newRefresh = data.refreshToken;

        tokenStore.setAccess(newAccess);
        if (newRefresh) tokenStore.setRefresh(newRefresh); // rotation

        processQueue(null, newAccess);
        original.headers['Authorization'] = `Bearer ${newAccess}`;
        return client(original);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenStore.clear();
        window.location.href = '/login?session=expired';
        return Promise.reject(refreshError);
      } finally {
        _refreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default client;
