import { apiClient } from './client';
import type { paths } from './schema';

/**
 * Type helpers to extract response and request types from the generated schema.
 */
export type ApiPaths = paths;

/**
 * Utility to extract response types safely even if not perfectly documented in backend yet.
 */
type ExtractResponse<T> = T extends { responses: { 200: { content: { "application/json": infer R } } } } ? R : any;
type ExtractPostResponse<T> = T extends { responses: { 201: { content: { "application/json": infer R } } } } ? R : any;
type ExtractRequestBody<T> = T extends { requestBody: { content: { "application/json": infer R } } } ? R : any;
type ExtractQuery<T> = T extends { parameters: { query?: infer Q } } ? Q : any;

/**
 * The internal SDK that mirrors the backend architecture.
 * This centralizes all API calls and provides full typing.
 */
export const api = {
  products: {
    /**
     * Get a list of products with optional filtering.
     */
    list: async (params?: ExtractQuery<ApiPaths['/products']['get']> & { minPrice?: number; maxPrice?: number; brand?: string; attributes?: string; sortBy?: string; sortOrder?: string }) => {
      const response = await apiClient.get<ExtractResponse<ApiPaths['/products']['get']>>('/products', { params });
      return response.data;
    },
    /**
     * Get details for a single product by its id.
     */
    get: async (id: string | number) => {
      const response = await apiClient.get<ExtractResponse<ApiPaths['/products/{id}']['get']>>(`/products/${id}`);
      return response.data;
    },
    /**
     * Get details for a single product by its slug.
     */
    getBySlug: async (slug: string) => {
      const response = await apiClient.get<ExtractResponse<ApiPaths['/products/slug/{slug}']['get']>>(`/products/slug/${slug}`);
      return response.data;
    },
    /**
     * Search products by query.
     */
    search: async (q: string, params?: ExtractQuery<ApiPaths['/products/search']['get']> & { minPrice?: number; maxPrice?: number; brand?: string; attributes?: string; sortBy?: string; sortOrder?: string }) => {
      const response = await apiClient.get<ExtractResponse<ApiPaths['/products/search']['get']>>('/products/search', { 
        params: { ...params, q } 
      });
      return response.data;
    }
  },
  
  categories: {
    /**
     * Get all categories.
     */
    list: async () => {
      const response = await apiClient.get<ExtractResponse<ApiPaths['/category']['get']>>('/category');
      return response.data;
    },
    /**
     * Get products in a specific category by its slug.
     */
    getBySlug: async (slug: string, params?: ExtractQuery<ApiPaths['/category/{slug}']['get']> & { minPrice?: number; maxPrice?: number; brand?: string; sortBy?: string; sortOrder?: string }) => {
      const response = await apiClient.get<ExtractResponse<ApiPaths['/category/{slug}']['get']>>(`/category/${slug}`, { params });
      return response.data;
    },
  },

  auth: {
    /**
     * Login a user and return a JWT.
     */
    login: async (data: ExtractRequestBody<ApiPaths['/auth/login']['post']>) => {
      const response = await apiClient.post<ExtractPostResponse<ApiPaths['/auth/login']['post']>>('/auth/login', data);
      return response.data;
    },
    /**
     * Register a new user.
     */
    register: async (data: ExtractRequestBody<ApiPaths['/auth/register']['post']>) => {
      const response = await apiClient.post<ExtractPostResponse<ApiPaths['/auth/register']['post']>>('/auth/register', data);
      return response.data;
    },
  },
};
