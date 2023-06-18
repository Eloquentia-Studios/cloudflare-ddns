import express from 'express'
import apiRouter from '../routers/apiRouter.js'
import authenticationRouter from '../routers/authenticationRouter.js'

const app = express()

app.use(express.json())
app.use('/api/authentication', authenticationRouter)
app.use('/api', apiRouter)
app.use('/', express.static('web-ui-svelte/build'))

const PORT = process.env.PORT || 1470
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))

export default app
