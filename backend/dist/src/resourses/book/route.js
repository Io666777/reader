import { Hono } from "hono";
import * as controller from "./controller.js";
const bookRoute = new Hono();
bookRoute.get('/', controller.getBooks);
