import { Hono } from 'hono';
import { getUserBooks, createBook, updateBook, deleteBook } from './book.controller';

const bookRouter = new Hono();

bookRouter.get('/', getUserBooks);
bookRouter.post('/', createBook);
bookRouter.put('/:id', updateBook);
bookRouter.delete('/:id', deleteBook);

export default bookRouter;