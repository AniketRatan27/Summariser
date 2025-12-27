import express from "express";
import type { Response, Request } from "express";
import { reviewController } from "./Controller/review.controller";
import { productRepository } from "./Repositories/product.repository";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
   res.send("Hello World! ");
});

router.get("/api/products", async (req, res) => {
   const productIds = await productRepository.getProductIds();
   res.json(productIds);
});
router.get("/api/products/:id/reviews", reviewController.getReviews);
router.post(
   "/api/products/:id/reviews/summarize",
   reviewController.summarizeReview
);

export default router;
