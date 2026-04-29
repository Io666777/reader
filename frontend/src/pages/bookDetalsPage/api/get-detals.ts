import { apiRequest } from "../../../shared/api/base";
import type { Detals } from "../types";

export const getDetals = (id: string) =>
    apiRequest<Detals>(`/books/${id}`);