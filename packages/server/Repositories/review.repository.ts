import dayjs from "dayjs";
import { prismaConnection } from "../lib/prismaConnection";
import type { Review } from "../lib/generated/prisma/client";

export const reviewRepository = {
   async getReviews(
      productId: number,
      options?: { limit?: number; rating?: number }
   ): Promise<Review[]> {
      return prismaConnection.review.findMany({
         where: {
            productId,
            ...(options?.rating ? { rating: options.rating } : {}),
         },
         orderBy: { createdAt: "desc" },
         take: options?.limit,
      });
   },

   async storeReviewSummary(productId: number, summary: string) {
      const now = new Date();
      const expiresAt = dayjs().add(1, "days").toDate();
      const data = {
         content: summary,
         expiresAt,
         generatedAt: now,
         productId,
      };
      return prismaConnection.summary.upsert({
         where: { productId },
         create: data,
         update: data,
      });
   },

   async getReviewSummary(productId: number): Promise<string | null> {
      const summary = await prismaConnection.summary.findFirst({
         where: {
            AND: [{ productId }, { expiresAt: { gt: new Date() } }],
         },
      });
      return summary ? summary.content : null;
   },
};
