import { Hono } from 'hono';
import { getUserBooks, getBook, createBook, updateBook, deleteBook } from './book.controller';

const bookRouter = new Hono();

bookRouter.get('/', getUserBooks);
bookRouter.get('/:id', getBook);
bookRouter.post('/', createBook);
bookRouter.put('/:id', updateBook);
bookRouter.delete('/:id', deleteBook);

export default bookRouter;