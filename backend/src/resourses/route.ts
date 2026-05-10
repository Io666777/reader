import { Hono } from "hono";
import { addBook } from "./book/addBook";
import { deleteBook } from "./book/deleteBook";
import { getAll } from "./book/getAll";

import * as serch from "./serch/filter/serchExternal";
import { getBookById } from "./book/getBookById";
import { getAvailableFilters } from "./serch/filter/getAvailableFilters";
import { getGlobalGenres } from "./serch/filter/getGlobalGenres"; 
import { getRandom } from "./serch/random/getRandom";
import { getRandomBooks } from "./serch/random/getRandomBooks";
import { getCoutBooks } from "./book/getCountBooks";


const bookRoute = new Hono();
bookRoute.get('/genres/all', getGlobalGenres);
bookRoute.get('/search', serch.searchExternal);
bookRoute.get('/filter', getAvailableFilters);
bookRoute.get('/random/unique', getRandom)
bookRoute.get('/random', getRandomBooks)
bookRoute.get('/me', getCoutBooks)

bookRoute.get('/', getAll);
bookRoute.post('/:id', addBook);
bookRoute.get('/:id', getBookById);
bookRoute.delete('/:id', deleteBook);



export default bookRoute;