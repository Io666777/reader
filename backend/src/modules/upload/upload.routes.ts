import { createRouteHandler } from 'uploadthing/server'
import { ourFileRouter } from './upload.router'

export const makeUploadHandler = () => {
  const token = process.env.UPLOADTHING_TOKEN
  if (!token) {
    console.error('[uploadthing] UPLOADTHING_TOKEN is not set in .env')
  }

  return createRouteHandler({
    router: ourFileRouter,
    config: { token, logLevel: 'Error' },
  })
}
