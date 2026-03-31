import { Hono } from "hono";
import * as controller from "./crud.controller"
import * as serch from "../serch/serch.controller"

const bookRoute = new Hono();
bookRoute.get('/', controller.getAll);
bookRoute.get('/add', controller.addBook);
bookRoute.delete('/:id', controller.deleteBook)


bookRoute.get('/search', serch.searchExternal)
export default bookRoute;