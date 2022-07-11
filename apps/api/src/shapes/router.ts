import { z } from 'zod';
import { prisma } from '../prisma';
import { createRouter } from '../router';

export const shapesRouter = createRouter()
  .query('getAll', {
    input: z.object({
      layerId: z.number(),
    }),
    resolve: ({ input }) =>
      prisma.shape.findMany({
        where: {
          layerId: input.layerId,
        },
      }),
  })
  .query('getById', {
    input: z.number(),
    resolve: ({ input }) =>
      prisma.shape.findFirst({
        where: {
          id: input,
        },
      }),
  })
  .mutation('create', {
    input: z.object({
      layerId: z.number(),
      shape: z.enum(['rect']),
      x: z.number(),
      y: z.number(),
      scaleX: z.number(),
      scaleY: z.number(),
    }),
    resolve: async ({ input: { layerId, x, y, scaleX, scaleY, shape } }) => {
      const result = await prisma.shape.create({
        data: {
          layerId,
          x,
          y,
          scaleX,
          scaleY,
          shape,
        },
      });
      return result.id;
    },
  });
