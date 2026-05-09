import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import{ cors } from 'hono/cors'
import { trimTrailingSlash } from "hono/trailing-slash";

import bookRoute from './resourses/route'
import authRoute from './resourses/authRoute'
import { authenticate } from "./utils/middleware";

type Variables = {
  jwtPayload: { id: string }
}

const app = new Hono<{ Variables: Variables }>()
const port = Number(process.env.PORT) || 16000;

app.use('*', cors())
app.use('*', trimTrailingSlash())

app.route('/api/auth', authRoute)
app.use('/api/books/*', authenticate)
app.route('/api/books', bookRoute)


app.get('/', (c) => {
  return c.text('Hello Honods!')
})

serve({
  fetch: app.fetch,
  port: port
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
