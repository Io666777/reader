import { apiRequest } from '../../../shared/api/base';
import { authStore } from '../../../shared/store/auth';
import type { AuthResponse } from '../type';

export const authApi = {
    async login(c: any){
        const data = await apiRequest<AuthResponse>('/auth/login',{
            method: 'POST',
            body: JSON.stringify(c)
        })

        authStore.setToken(data.token)
        authStore.setUser(data.user)

        return data
    }
}