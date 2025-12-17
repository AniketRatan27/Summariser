import type { Request, Response } from "express";
import { reviewService } from "../services/review.service";
import { productRepository } from "../Repositories/product.repository";
import { reviewRepository } from "../Repositories/review.repository";
import { error } from "node:console";

export const reviewController = {
   async getReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         res.status(404).json({
            error: "Invalid productId. Please provide a valid numeric productId.",
         });
         return;
      }

      const product = await productRepository.getProduct(productId);
      if (!product) {
         res.status(400).json({ error: "invalid product!" });
         return;
      }

      const reviews = await reviewService.getReviews(productId);
      res.json(reviews);
   },

   async summarizeReview(req: Request, res: Response) {
      const productId = Number(req.params.id);
      if (isNaN(productId)) {
         res.status(404).json({
            error: "Invalid productId. Please provide a valid numeric productId.",
         });
         return;
      }

      const review = await reviewRepository.getReviews(productId, 1);
      if (!review.length) {
         res.status(400).json({ error: "There are no reviews to summarize!" });
         return;
      }

      const summary = await reviewService.summarizeReviews(productId);
      res.json({ summary });
   },
};
