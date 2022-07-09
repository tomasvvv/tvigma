import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = (
  _opts?: trpcExpress.CreateExpressContextOptions
) => ({});

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
