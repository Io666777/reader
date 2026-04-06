import { Hono } from "hono";
import { addBook } from "./CRUD/addBook"
import { deleteBook } from "./CRUD/deleteBook"
import { getAll } from "./CRUD/getAll"

import * as serch from "../serch/serch.controller"

const bookRoute = new Hono();
bookRoute.get('/', getAll);
bookRoute.post('/add', addBook);
bookRoute.delete('/:id', deleteBook);


bookRoute.get('/search', serch.searchExternal)
export default bookRoute;