/**
 * BioLab — User Service API
 * ────────────────────────────────────────────────────────────────────
 * Calls: Gateway :8080 → User Service :8082
 * Controllers: UserProfileController, OrganizationController, UserRoleQueryController
 */
import client from './client';

// ── User Profile ──────────────────────────────────────────────────────────

/** GET /api/users/me — current user profile */
export const getMyProfile = () =>
  client.get('/api/users/me').then((r) => r.data);

/** PUT /api/users/{userId} — update profile */
export const updateProfile = (userId, payload) =>
  client.put(`/api/users/${userId}`, payload).then((r) => r.data);

/** GET /api/users/{userId}/roles */
export const getUserRoles = (userId) =>
  client.get(`/api/users/${userId}/roles`).then((r) => r.data);

/** GET /api/users?keyword=&isActive=&page=&size= (Admin) */
export const listUsers = (params) =>
  client.get('/api/users', { params }).then((r) => r.data);

/** POST /api/users/{userId}/reactivate (Admin) */
export const reactivateUser = (userId) =>
  client.post(`/api/users/${userId}/reactivate`).then((r) => r.data);

/** DELETE /api/users/{userId} (Admin) */
export const deactivateUser = (userId) =>
  client.delete(`/api/users/${userId}`);

// ── Organizations ─────────────────────────────────────────────────────────

/** GET /api/organizations/{id} */
export const getOrganization = (id) =>
  client.get(`/api/organizations/${id}`).then((r) => r.data);

/** GET /api/organizations?keyword=&type=&isActive=&page=&size= */
export const listOrganizations = (params) =>
  client.get('/api/organizations', { params }).then((r) => r.data);

/** POST /api/organizations (Admin) */
export const createOrganization = (payload) =>
  client.post('/api/organizations', payload).then((r) => r.data);

/** PUT /api/organizations/{id} (Admin) */
export const updateOrganization = (id, payload) =>
  client.put(`/api/organizations/${id}`, payload).then((r) => r.data);

/** GET /api/organizations/{id}/members */
export const getOrgMembers = (id) =>
  client.get(`/api/organizations/${id}/members`).then((r) => r.data);

/** POST /api/users/{userId}/organizations */
export const assignUserOrg = (userId, payload) =>
  client.post(`/api/users/${userId}/organizations`, payload).then((r) => r.data);
