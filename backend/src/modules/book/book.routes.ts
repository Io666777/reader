import { Hono } from 'hono';
import { getUserBooks, createBook, updateBook, deleteBook } from './book.controller';

const folderRouter = new Hono();

folderRouter.get('/', getUserBooks);
folderRouter.post('/', createBook);
folderRouter.post('/:id', updateBook)
folderRouter.post('/:id', deleteBook)


export default folderRouter;