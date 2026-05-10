import express from "express";
import type { Response, Request } from "express";
import { reviewController } from "./Controller/review.controller";
import { productRepository } from "./Repositories/product.repository";
import { analyticsController } from "./Controller/analytics.controller";
import { ChatController } from "./Controller/chat.controller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
   res.send("Hello World! ");
});

router.post("/api/chat", ChatController.sendMessage);

router.get("/api/products", async (req, res) => {
   const productIds = await productRepository.getProducts();
   res.json(productIds);
});
router.get("/api/products/:id/reviews", reviewController.getReviews);

router.post(
   "/api/products/:id/reviews/summarize",
   reviewController.summarizeReview
);

router.post("/api/products/:id/analyze", analyticsController.analyzeProduct);

export default router;
