/**
 * BioLab — Auth Context
 * ─────────────────────────────────────────────────────────────────────────
 * Central auth state: login, logout, JWT management, role-based routing.
 *
 * Security model:
 *  - accessToken:  in-memory only (_never_ persisted) → safe from XSS persistence
 *  - refreshToken: localStorage → enables page reload recovery (accepted trade-off;
 *                  use httpOnly cookies in production with BFF pattern)
 *  - User profile: localStorage for UX continuity on reload
 *
 * Usage:
 *   const { user, login, logout, isAuthenticated, hasRole } = useAuth();
 */
import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { tokenStore } from '../api/client';
import * as authApi from '../api/authApi';
import { getMyProfile } from '../api/userApi';

const AuthContext = createContext(null);

/** Map role string → dashboard path */
const ROLE_DASHBOARD = {
  ADMIN:       '/admin/dashboard',
  SUPER_ADMIN: '/admin/dashboard',
  SUPPLIER:    '/supplier/dashboard',
  BUYER:       '/buyer/dashboard',
};

const getPrimaryRole = (roles = []) => {
  const priority = ['ADMIN', 'SUPER_ADMIN', 'SUPPLIER', 'BUYER'];
  return priority.find((r) => roles.includes(r)) || roles[0] || 'BUYER';
};

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // ── State ────────────────────────────────────────────────────────────────
  const [user,    setUser]    = useState(() => tokenStore.getUser()); // { id, email, firstName, lastName, roles, orgId }
  const [loading, setLoading] = useState(true);  // initial bootstrap
  const [mfaState, setMfaState] = useState(null); // { mfaToken } when MFA required

  const refreshTimer = useRef(null);

  // ── Derived ──────────────────────────────────────────────────────────────
  const isAuthenticated = !!user && !!tokenStore.getAccess();

  // ── Schedule silent token refresh ────────────────────────────────────────
  const scheduleRefresh = useCallback((expiresInSeconds) => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    // Refresh 60s before expiry (access token is 900s = 15min)
    const delay = Math.max((expiresInSeconds - 60) * 1000, 5000);
    refreshTimer.current = setTimeout(async () => {
      const rt = tokenStore.getRefresh();
      if (!rt) return;
      try {
        const data = await authApi.refreshToken(rt);
        tokenStore.setAccess(data.accessToken);
        if (data.refreshToken) tokenStore.setRefresh(data.refreshToken);
        scheduleRefresh(data.expiresIn || 900);
      } catch {
        await logout();
      }
    }, delay);
  }, []); // eslint-disable-line

  // ── Bootstrap: restore session on page load ───────────────────────────────
  useEffect(() => {
    const bootstrap = async () => {
      const rt = tokenStore.getRefresh();
      if (!rt) { setLoading(false); return; }

      try {
        // Silent refresh to get fresh access token
        const data = await authApi.refreshToken(rt);
        tokenStore.setAccess(data.accessToken);
        if (data.refreshToken) tokenStore.setRefresh(data.refreshToken);

        // Fetch fresh profile
        const profile = await getMyProfile();
        const enriched = { ...profile, roles: profile.roles || [] };
        setUser(enriched);
        tokenStore.setUser(enriched);

        scheduleRefresh(data.expiresIn || 900);
      } catch {
        tokenStore.clear();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
    return () => { if (refreshTimer.current) clearTimeout(refreshTimer.current); };
  }, []); // eslint-disable-line

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    const data = await authApi.login(email, password);

    // MFA required — store temp token, redirect to MFA page
    if (data.mfaRequired) {
      setMfaState({ mfaToken: data.mfaToken });
      navigate('/mfa-verify');
      return { mfaRequired: true };
    }

    // Full auth — store tokens
    tokenStore.setAccess(data.accessToken);
    tokenStore.setRefresh(data.refreshToken);

    // Fetch profile
    const profile = await getMyProfile();
    const enriched = {
      ...profile,
      roles: profile.roles || [],
      tokenFamily:     data.tokenFamily,
      tokenGeneration: data.tokenGeneration,
    };
    setUser(enriched);
    tokenStore.setUser(enriched);

    scheduleRefresh(data.expiresIn || 900);

    const role = getPrimaryRole(enriched.roles);
    navigate(ROLE_DASHBOARD[role] || '/buyer/dashboard');

    return { mfaRequired: false, role };
  }, [navigate, scheduleRefresh]);

  // ── MFA Verify ────────────────────────────────────────────────────────────
  const completeMfa = useCallback(async (code) => {
    if (!mfaState?.mfaToken) throw new Error('No MFA session active');

    const data = await authApi.verifyMfa(mfaState.mfaToken, code);

    tokenStore.setAccess(data.accessToken);
    tokenStore.setRefresh(data.refreshToken);

    const profile = await getMyProfile();
    const enriched = { ...profile, roles: profile.roles || [] };
    setUser(enriched);
    tokenStore.setUser(enriched);
    setMfaState(null);

    scheduleRefresh(data.expiresIn || 900);

    const role = getPrimaryRole(enriched.roles);
    navigate(ROLE_DASHBOARD[role] || '/buyer/dashboard');
  }, [mfaState, navigate, scheduleRefresh]);

  // ── Register ──────────────────────────────────────────────────────────────
  const register = useCallback(async (payload) => {
    const data = await authApi.register(payload);
    // Auto-login after registration
    await login(payload.email, payload.password);
    return data;
  }, [login]);

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    const rt = tokenStore.getRefresh();
    try {
      await authApi.logout(rt);
    } catch { /* best-effort */ }
    tokenStore.clear();
    setUser(null);
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    navigate('/login');
  }, [navigate]);

  // ── Role helpers ──────────────────────────────────────────────────────────
  const hasRole = useCallback((role) =>
    user?.roles?.includes(role), [user]);

  const hasAnyRole = useCallback((...roles) =>
    roles.some((r) => user?.roles?.includes(r)), [user]);

  const primaryRole = user ? getPrimaryRole(user.roles) : null;

  // ── Provide ───────────────────────────────────────────────────────────────
  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated,
      primaryRole,
      mfaState,
      login,
      completeMfa,
      register,
      logout,
      hasRole,
      hasAnyRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};

export { ROLE_DASHBOARD, getPrimaryRole };
