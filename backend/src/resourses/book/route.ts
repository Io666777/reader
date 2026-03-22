import { Hono } from "hono";
import * as controller from "./controller"

const bookRoute = new Hono();

bookRoute.get('/', controller.getBooks);
bookRoute.delete('/:id', controller.deleteBook)



export default bookRoute;