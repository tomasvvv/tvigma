import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';

import { createRouter } from './router';
import { createContext } from './context';
import { layerRouter } from './layers/router';

const appRouter = createRouter().merge('layers', layerRouter);

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

app.get('/', (_req, res) => res.send('Hello!'));

app.listen(PORT, () => console.log(`API is listening to port ${PORT}`));
