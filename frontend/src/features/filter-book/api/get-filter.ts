import { apiRequest } from "../../../shared/api/base";
import type { Filter } from "../type";

export const getFilter = () =>
  apiRequest <Filter>('/books/filters')
