import { apiRequest } from '../../../shared/api/base';
import { authStore } from '../../../shared/store/auth';
import type { AuthResponse } from '../type';

export const register = async (userData: any) => {
    const data = await apiRequest<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    });

    authStore.setToken(data.token);
    authStore.setUser(data.user);

    return data;
};