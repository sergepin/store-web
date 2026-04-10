/**
 * Extracts the tenant slug from the hostname.
 * e.g., gamer-store.localhost:3000 -> gamer-store
 */
export const getTenantSlug = (): string | null => {
  if (typeof window === 'undefined') return null;

  const hostname = window.location.hostname;
  const parts = hostname.split('.');

  // If we have more than 1 part (e.g., [tenant, localhost] or [tenant, mydomain, com])
  // We assume the first part is the tenant slug.
  // In production it might be tenant.domain.com
  // In dev it might be tenant.localhost
  if (parts.length > 1) {
    return parts[0];
  }

  // Fallback for local development without subdomains
  if (process.env.NODE_ENV === 'development') {
    return 'gamer-store';
  }

  return null;
};
