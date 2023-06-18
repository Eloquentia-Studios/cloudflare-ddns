import { t } from '../services/trpc.js'

const authenticationRouter = t.router({
  greeting: t.procedure.query(() => {
    return 'Hello World!'
  })
})

export default authenticationRouter
