import { Router } from 'express'

import { getClassesController } from '../controllers/apiController'

const app = Router()

app.get('/classes', getClassesController)

export default app
