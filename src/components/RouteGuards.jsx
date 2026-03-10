/**
 * BioLab — Route Guards
 * ─────────────────────────────────────────────────────────────────────
 * ProtectedRoute  — requires authentication
 * RoleRoute       — requires specific role(s)
 * PublicOnlyRoute — redirects authenticated users away (login/register)
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, ROLE_DASHBOARD, getPrimaryRole } from '../context/AuthContext';

/** Spinner while auth bootstraps */
function AuthLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-teal-500/30 border-t-teal-500 animate-spin" />
        <p className="text-sm font-semibold text-slate-400">Verifying session…</p>
      </div>
    </div>
  );
}

/**
 * Requires an active JWT session.
 * Unauthenticated → /login?from=<current path>
 */
export function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <AuthLoader />;
  if (!isAuthenticated) {
    return <Navigate to={`/login?from=${encodeURIComponent(location.pathname)}`} replace />;
  }
  return <Outlet />;
}

/**
 * Requires authentication + one of the given roles.
 * Usage: <RoleRoute roles={['ADMIN','SUPER_ADMIN']} />
 */
export function RoleRoute({ roles = [] }) {
  const { isAuthenticated, loading, hasAnyRole, user } = useAuth();
  const location = useLocation();

  if (loading) return <AuthLoader />;
  if (!isAuthenticated) {
    return <Navigate to={`/login?from=${encodeURIComponent(location.pathname)}`} replace />;
  }
  if (roles.length > 0 && !hasAnyRole(...roles)) {
    const primary = getPrimaryRole(user?.roles || []);
    return <Navigate to={ROLE_DASHBOARD[primary] || '/'} replace />;
  }
  return <Outlet />;
}

/**
 * Public-only routes (login, register).
 * Authenticated users are redirected to their dashboard.
 */
export function PublicOnlyRoute() {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <AuthLoader />;
  if (isAuthenticated) {
    const primary = getPrimaryRole(user?.roles || []);
    return <Navigate to={ROLE_DASHBOARD[primary] || '/'} replace />;
  }
  return <Outlet />;
}
