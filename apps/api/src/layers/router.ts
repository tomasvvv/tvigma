import { z } from 'zod';
import { prisma } from '../prisma';
import { createRouter } from '../router';

export const layerRouter = createRouter()
  .query('getAll', {
    resolve: () => prisma.layer.findMany(),
  })
  .query('getById', {
    input: z.number(),
    resolve: ({ input }) =>
      prisma.layer.findFirst({
        where: {
          id: input,
        },
      }),
  })
  .mutation('create', {
    input: z.object({ name: z.string().min(1).max(56) }),
    resolve: async ({ input: { name } }) => {
      const result = await prisma.layer.create({ data: { name } });
      return result.id;
    },
  });
