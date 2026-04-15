import { Hono } from "hono";
import { addBook } from "./CRUD/addBook"
import { deleteBook } from "./CRUD/deleteBook"
import { getAll } from "./CRUD/getAll"

import * as serch from "../serch/serch.controller"
import { getBookById } from "./CRUD/getBookById";

const bookRoute = new Hono();
bookRoute.get('/', getAll);
bookRoute.post('/add', addBook);
bookRoute.get('/search', serch.searchExternal)
bookRoute.get('/:id',getBookById)
bookRoute.delete('/:id', deleteBook);


export default bookRoute;