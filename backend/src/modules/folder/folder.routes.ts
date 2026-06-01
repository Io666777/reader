import { Hono } from 'hono';
import { getUserFolders, createFolder, updateFolder, deleteFolder } from './folder.controller';

const folderRouter = new Hono();

folderRouter.get('/', getUserFolders);
folderRouter.post('/', createFolder);
folderRouter.put('/:id', updateFolder);
folderRouter.delete('/:id', deleteFolder);

export default folderRouter;