import { Hono } from "hono";
import { addBook } from "./book/addBook"
import { deleteBook } from "./book/deleteBook"
import { getAll } from "./book/getAll"

import * as serch from "./serch/serch.controller"
import { getBookById } from "./book/getBookById";

const bookRoute = new Hono();
bookRoute.get('/', getAll);
bookRoute.post('/add', addBook);
bookRoute.get('/search', serch.searchExternal)
bookRoute.get('/:id',getBookById)
bookRoute.delete('/:id', deleteBook);


export default bookRoute;