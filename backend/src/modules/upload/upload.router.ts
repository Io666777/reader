import { createUploadthing, UploadThingError, type FileRouter } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
  bookUploader: f({ blob: { maxFileSize: '16MB', maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const token = req.headers.get('Authorization')?.split(' ')[1]
      if (!token) throw new UploadThingError('Unauthorized')
      return {}
    })
    .onUploadComplete(async ({ file }) => {
      return { ufsUrl: file.ufsUrl }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
