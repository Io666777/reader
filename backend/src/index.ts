import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import{ cors } from 'hono/cors'
import { trimTrailingSlash } from "hono/trailing-slash";
import { clerkMiddleware } from '@clerk/hono';
import bookRoute from './modules/book/book.routes';
import folderRouter from "./modules/folder/folder.routes";
import eventRouter from "./modules/event/event.routes";
import { makeUploadHandler } from './modules/upload/upload.routes';
import { clerkAuthMiddleware } from "./middleware/auth";

type Variables = {
  jwtPayload: { id: string }
}

const app = new Hono<{ Variables: Variables }>()
const port = Number(process.env.PORT) || 16000;

app.use('*', cors())
app.use('*', trimTrailingSlash())

app.use('*', clerkMiddleware());

const uploadHandler = makeUploadHandler()
app.all('/api/uploadthing', async (c) => {
  try {
    return await uploadHandler(c.req.raw)
  } catch (err) {
    console.error('[uploadthing] handler error:', err)
    return c.json({ error: 'Upload failed' }, 500)
  }
})

app.use('/api/books/*', clerkAuthMiddleware());
app.route('/api/books', bookRoute);

app.use('/api/folders/*', clerkAuthMiddleware())
app.route('/api/folders', folderRouter)

app.use('/api/events/*', clerkAuthMiddleware())
app.route('/api/events', eventRouter)

app.get('/', (c) => {
  return c.text('Hello Honods!')
})

serve({
  fetch: app.fetch,
  port: port
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
