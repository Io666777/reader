import { Hono } from "hono";
import { addBook } from "./book/addBook";
import { deleteBook } from "./book/deleteBook";
import { getAll } from "./book/getAll";

import * as serch from "./serch/serchExternal";
import { getBookById } from "./book/getBookById";
import { getAvailableFilters } from "./serch/getAvailableFilters";
import { getGlobalGenres } from "./serch/getGlobalGenres"; 

const bookRoute = new Hono();
bookRoute.get('/filter', getAvailableFilters);

bookRoute.get('/', getAll);
bookRoute.post('/:id', addBook);
bookRoute.get('/:id', getBookById);
bookRoute.delete('/:id', deleteBook);


bookRoute.get('/search', serch.searchExternal);
bookRoute.get('/genres/all', getGlobalGenres);

export default bookRoute;