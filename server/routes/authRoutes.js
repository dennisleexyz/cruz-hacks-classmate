import { Router } from 'express';

import { isAuthenticatedController } from '../controllers/authController'

const app = Router();

app.get('/isAuthenticated', isAuthenticatedController);

export default app;
