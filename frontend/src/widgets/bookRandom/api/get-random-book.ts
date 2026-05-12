import { apiRequest } from "../../../shared/api/base";
import type { Detals } from "../../../pages/bookDetalsPage/types";


export const getRandom = () =>
    apiRequest<{ book: Detals | null, metadata: any }>('/books/random/unique');
    