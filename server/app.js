import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import rootRoutes from './routes/rootRoutes'
import apiRoutes from './routes/apiRoutes'

const app = express()

app.use(helmet())
app.use(morgan('tiny'))

app.use('/', rootRoutes)
app.use('/api', apiRoutes)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))
