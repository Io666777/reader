import "dotenv/config";
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import{ cors } from 'hono/cors'
import { trimTrailingSlash } from "hono/trailing-slash";

type Variables = {
  jwtPayload: { id: string }
}

const app = new Hono<{ Variables: Variables }>()
const port = Number(process.env.PORT) || 16000;

app.use('*', cors())
app.use('*', trimTrailingSlash())

app.get('/', (c) => {
  return c.text('Hello Honods!')
})

serve({
  fetch: app.fetch,
  port: port
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
