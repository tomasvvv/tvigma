import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';

import { createRouter } from './router';
import { createContext } from './context';
import { layerRouter } from './layers/router';
import { shapesRouter } from './shapes/router';

const appRouter = createRouter()
  .merge('layers.', layerRouter)
  .merge('shapes.', shapesRouter);

const PORT = 8080;
const app = express();

app.use(cors());

app.use(
  '/api',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.get('/', (_req, res) => res.send('Backend is running!'));
app.listen(PORT, () => console.log(`API is listening to port ${PORT}`));

// Only export we need in frontend to get the types.
export type AppRouter = typeof appRouter;
