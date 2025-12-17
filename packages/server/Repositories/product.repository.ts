import { PrismaClient } from "../generated/prisma";
import { adapter } from "./review.repository";

const prisma = new PrismaClient({ adapter: adapter });

export const productRepository = {
   getProduct(productId: number) {
      return prisma.product.findUnique({
         where: { id: productId },
      });
   },
};
