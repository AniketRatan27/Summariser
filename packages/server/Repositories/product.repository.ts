import { prismaConnection } from "../lib/prismaConnection";

export const productRepository = {
   getProducts() {
      return prismaConnection.product.findMany({
         select: {
            id: true,
            name: true,
            description: true,
            price: true,
         },
         orderBy: {
            id: "asc",
         },
      });
   },

   getProduct(productId: number) {
      return prismaConnection.product.findUnique({
         where: {
            id: productId,
         },
      });
   },

   getProductIds() {
      return prismaConnection.product.findMany({
         select: {
            id: true,
         },
      });
   },
};
