import { Hono } from "hono";
import * as controller from "./crud.controller"

const bookRoute = new Hono();
bookRoute.get('/', controller.getAll);
bookRoute.get('/add', controller.addBook);
bookRoute.delete('/:id', controller.deleteBook)



export default bookRoute;