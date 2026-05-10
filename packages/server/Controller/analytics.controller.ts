import type { Request, Response } from "express";
import { productRepository } from "../Repositories/product.repository";
import { analyticsService } from "../services/analytics.service";

export const analyticsController = {
   async analyzeProduct(req: Request, res: Response) {
      try {
         const productId = Number(req.params.id);

         if (isNaN(productId)) {
            res.status(400).json({ error: "Invalid product id." });
            return;
         }

         const product = await productRepository.getProduct(productId);

         if (!product) {
            res.status(404).json({ error: "Product not found." });
            return;
         }

         const analytics = await analyticsService.analyzeProduct(productId);

         res.json(analytics);
      } catch (error) {
         console.error(error);
         res.status(500).json({
            error: "Could not generate analytics.",
         });
      }
   },
};
