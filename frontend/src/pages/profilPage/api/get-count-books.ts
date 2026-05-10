import { apiRequest } from '../../../shared/api/base';
import type { ProfileData } from '../types'; 

export const getProfileStats = () => apiRequest<ProfileData>('/books/me');