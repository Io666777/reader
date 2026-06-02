import { apiRequest } from './base'

export const createUserApi = (getToken: () => Promise<string | null>) => ({
  getMe: () =>
    apiRequest<{ email: string; emailNotifications: boolean }>('/user/me', getToken),

  updateMe: (data: { emailNotifications: boolean }) =>
    apiRequest<{ email: string; emailNotifications: boolean }>('/user/me', getToken, {
      method: 'PATCH',
      body: data,
    }),
})
