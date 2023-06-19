import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import { appRouter } from '../routers/appRouter.js'
import { createContext } from './trpc.js'

const app = express()

app.use(express.json())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
)

app.use('/', express.static('web-ui-svelte/build'))

const PORT = process.env.PORT || 1470
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))

export default app
