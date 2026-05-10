import type { Request, Response } from "express";
import { reviewService } from "../services/review.service";
import { productRepository } from "../Repositories/product.repository";
import { reviewRepository } from "../Repositories/review.repository";

export const reviewController = {
   async getReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);
      const rating = req.query.rating ? Number(req.query.rating) : undefined;

      if (isNaN(productId)) {
         res.status(404).json({
            error: "Invalid productId. Please provide a valid numeric productId.",
         });
         return;
      }

      if (rating !== undefined && (isNaN(rating) || rating < 1 || rating > 5)) {
         res.status(400).json({
            error: "Invalid rating. Rating must be between 1 and 5.",
         });
         return;
      }

      const product = await productRepository.getProduct(productId);

      if (!product) {
         res.status(400).json({ error: "invalid product!" });
         return;
      }

      const reviews = await reviewRepository.getReviews(productId, { rating });
      const summary = await reviewRepository.getReviewSummary(productId);

      res.json({
         product,
         summary,
         reviews,
      });
   },

   async summarizeReview(req: Request, res: Response) {
      const productId = Number(req.params.id);
      if (isNaN(productId)) {
         res.status(404).json({
            error: "Invalid productId. Please provide a valid numeric productId.",
         });
         return;
      }

      const review = await reviewRepository.getReviews(productId, { limit: 1 });
      if (!review.length) {
         res.status(400).json({ error: "There are no reviews to summarize!" });
         return;
      }

      const summary = await reviewService.summarizeReviews(productId);
      res.json({ summary });
   },
};
