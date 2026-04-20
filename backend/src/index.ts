import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import{ cors } from 'hono/cors'
import bookRoute from './resourses/route'
import { trimTrailingSlash } from "hono/trailing-slash";

const app = new Hono()

app.use('*', cors())
app.use('*', trimTrailingSlash())
app.route('/api/books', bookRoute)


app.get('/', (c) => {
  return c.text('Hello Honods!')
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
