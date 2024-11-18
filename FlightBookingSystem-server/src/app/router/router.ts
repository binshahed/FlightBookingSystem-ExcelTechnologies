import { Application, Request, Response } from 'express';

import { authRoutes } from '../modules/auth/auth.routes';
import { flightRouter } from '../modules/flight/flight.routes';

const modulesRouters = [
  {
    path: '/api',
    route: authRoutes,
  },
  {
    path: '/api/flights',
    route: flightRouter,
  },
];

export const routes = (app: Application) => {
  // root route
  app.get('/', (req: Request, res: Response) => {
    res.send('Flight booking system');
  });

  // all routes
  modulesRouters.forEach((router) => app.use(router.path, router.route));

  // not found route
  app.route('*').all((req: Request, res: Response) => {
    res.send({
      success: false,
      statusCode: 404,
      message: 'Not Found',
    });
  });
};
