import { prismaConnection } from "../lib/prismaConnection";

export const analyticsRepository = {
   async getReviewAnalysis(productId: number) {
      return prismaConnection.reviewAnalysis.findMany({
         where: {
            review: {
               productId,
            },
         },
      });
   },

   async storeReviewAnalysis(
      reviewId: number,
      sentiment: string,
      keywords: string
   ) {
      return prismaConnection.reviewAnalysis.upsert({
         where: { reviewId },
         create: {
            reviewId,
            sentiment,
            keywords,
         },
         update: {
            sentiment,
            keywords,
         },
      });
   },

   async getProductInsight(productId: number) {
      return prismaConnection.productInsight.findUnique({
         where: { productId },
      });
   },

   async storeProductInsight(
      productId: number,
      pros: string,
      cons: string,
      recommendation: string
   ) {
      return prismaConnection.productInsight.upsert({
         where: { productId },
         create: {
            productId,
            pros,
            cons,
            recommendation,
         },
         update: {
            pros,
            cons,
            recommendation,
         },
      });
   },
};
