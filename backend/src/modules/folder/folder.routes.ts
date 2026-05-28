// src/modules/folder/folder.routes.ts
import { Hono } from 'hono';
import { getUserFolders, createFolder, updateFolder, deleteFolder } from './folder.controller';

const folderRouter = new Hono();

// Эти пути будут дополнять базовый урл
folderRouter.get('/', getUserFolders);
folderRouter.post('/', createFolder);
folderRouter.post('/:id', updateFolder)
folderRouter.post('/:id', deleteFolder)


export default folderRouter;