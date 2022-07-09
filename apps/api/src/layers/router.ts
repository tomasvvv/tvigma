import { prisma } from '../prisma';
import { createRouter } from '../router';

export const layerRouter = createRouter().query('', {
  resolve: () => prisma.layer.findMany(),
});
