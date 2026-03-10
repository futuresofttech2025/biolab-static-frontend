/**
 * BioLab — Auth Service API
 * ───────────────────────────────────────────────────────────────────
 * All calls map to: Gateway :8080 → Auth Service :8081 → sec_schema
 *
 * Endpoint contract matches:
 *   - AuthController.java  (/api/auth/*)
 *   - UserCrudController.java (/api/auth/users/*)
 *   - RoleController.java (/api/auth/roles)
 *   - SessionController.java (/api/auth/users/{id}/sessions)
 */
import client from './client';

const AUTH = '/api/auth';

// ── Registration & Login ──────────────────────────────────────────────────

/**
 * POST /api/auth/register
 * Body: { email, password, firstName, lastName, phone?, role }
 * Returns: RegisterResponse { id, email, firstName, lastName, isEmailVerified, createdAt }
 */
export const register = (payload) =>
  client.post(`${AUTH}/register`, payload).then((r) => r.data);

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: AuthResponse { accessToken, refreshToken, expiresIn, mfaRequired, mfaToken, tokenFamily, tokenGeneration }
 */
export const login = (email, password) =>
  client.post(`${AUTH}/login`, { email, password }).then((r) => r.data);

/**
 * POST /api/auth/mfa/verify
 * Body: { mfaToken, code }
 * Returns: AuthResponse (full tokens on success)
 */
export const verifyMfa = (mfaToken, code) =>
  client.post(`${AUTH}/mfa/verify`, { mfaToken, code }).then((r) => r.data);

/**
 * POST /api/auth/refresh-token
 * Body: { refreshToken }
 * Returns: AuthResponse (new access + refresh token pair — rotation)
 */
export const refreshToken = (rt) =>
  client.post(`${AUTH}/refresh-token`, { refreshToken: rt }).then((r) => r.data);

/**
 * POST /api/auth/logout
 * Header: Authorization: Bearer <accessToken>
 * Body: { refreshToken }
 */
export const logout = (rt) =>
  client.post(`${AUTH}/logout`, { refreshToken: rt });

/**
 * GET /api/auth/validate-token
 * Header: Authorization: Bearer <accessToken>
 * Returns: TokenValidationResponse { valid, userId, email, roles, orgId }
 */
export const validateToken = () =>
  client.get(`${AUTH}/validate-token`).then((r) => r.data);

// ── Password Management ───────────────────────────────────────────────────

/**
 * POST /api/auth/forgot-password
 * Body: { email }
 * Returns: MessageResponse
 */
export const forgotPassword = (email) =>
  client.post(`${AUTH}/forgot-password`, { email }).then((r) => r.data);

/**
 * POST /api/auth/reset-password
 * Body: { token, newPassword }
 * Returns: MessageResponse
 */
export const resetPassword = (token, newPassword) =>
  client.post(`${AUTH}/reset-password`, { token, newPassword }).then((r) => r.data);

/**
 * POST /api/auth/change-password
 * Header: X-User-Id (set by gateway from JWT)
 * Body: { currentPassword, newPassword }
 * Returns: MessageResponse
 */
export const changePassword = (currentPassword, newPassword) =>
  client.post(`${AUTH}/change-password`, { currentPassword, newPassword }).then((r) => r.data);

// ── Session Management ────────────────────────────────────────────────────

/**
 * GET /api/auth/users/{userId}/sessions
 * Returns: List<UserSessionResponse>
 */
export const getSessions = (userId) =>
  client.get(`${AUTH}/users/${userId}/sessions`).then((r) => r.data);

/**
 * DELETE /api/auth/users/{userId}/sessions/{sessionId}
 */
export const revokeSession = (userId, sessionId) =>
  client.delete(`${AUTH}/users/${userId}/sessions/${sessionId}`);

// ── Admin: User CRUD ──────────────────────────────────────────────────────

/**
 * POST /api/auth/users  (Admin only)
 * Body: { email, password, firstName, lastName, phone }
 */
export const adminCreateUser = (payload) =>
  client.post(`${AUTH}/users`, payload).then((r) => r.data);

/**
 * GET /api/auth/users?search=&isActive=&page=&size=
 */
export const adminListUsers = (params) =>
  client.get(`${AUTH}/users`, { params }).then((r) => r.data);

/**
 * DELETE /api/auth/users/{userId}
 */
export const adminDeleteUser = (userId) =>
  client.delete(`${AUTH}/users/${userId}`);

// ── Admin: Roles & Permissions ────────────────────────────────────────────

/** GET /api/auth/roles */
export const getRoles = () =>
  client.get(`${AUTH}/roles`).then((r) => r.data);

/** POST /api/auth/users/{userId}/roles  Body: { roleId } */
export const assignRole = (userId, roleId) =>
  client.post(`${AUTH}/users/${userId}/roles`, { roleId }).then((r) => r.data);

/** DELETE /api/auth/users/{userId}/roles/{roleId} */
export const revokeRole = (userId, roleId) =>
  client.delete(`${AUTH}/users/${userId}/roles/${roleId}`);

// ── Consent (GDPR) ────────────────────────────────────────────────────────

/** POST /api/auth/users/{userId}/consent  Body: { consentType, version } */
export const grantConsent = (userId, consentType, version) =>
  client.post(`${AUTH}/users/${userId}/consent`, { consentType, version });

/** GET /api/auth/users/{userId}/consent */
export const getConsents = (userId) =>
  client.get(`${AUTH}/users/${userId}/consent`).then((r) => r.data);
