import axios from 'axios';
import { getTenantSlug } from './tenant';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Global API Client configured with Multi-tenancy headers.
 */
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Add an interceptor to inject the x-tenant-slug header into every request.
 * This is crucial for our multi-tenant backend.
 */
apiClient.interceptors.request.use((config) => {
  const tenant = getTenantSlug();
  
  if (tenant) {
    config.headers['x-tenant-slug'] = tenant;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * Handle common error scenarios (401, 403, 404, 500)
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // We could add global error handling here (e.g., redirect to login on 401)
    if (error.response?.status === 404) {
      console.error('Resource not found:', error.config.url);
    }
    return Promise.reject(error);
  }
);
