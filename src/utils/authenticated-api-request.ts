import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { ApiRequest, apiRequest } from './api-request';

export async function authenticatedApiRequest<T>(
  url: string,
  options?: RequestInit,
): Promise<ApiRequest<T>> {
  const jwtToken = await getLoginSessionForApi();

  if (!jwtToken) {
    return {
      success: false,
      errors: ['Usuário não autenticado.'],
      status: 401,
    };
  }

  const headers = {
    ...options?.headers,
    Authorization: `Bearer ${jwtToken}`,
  };

  return apiRequest<T>(url, {
    ...options,
    headers,
  });
}
