import { reviewRepository } from "../Repositories/review.repository";
import { llmClient } from "../llm/Client";

export const reviewService = {
   async summarizeReviews(productId: number): Promise<string> {
      const existingSummary =
         await reviewRepository.getReviewSummary(productId);
      if (existingSummary) {
         return existingSummary;
      }

      //get last 10 reviews

      const reviews = await reviewRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((r) => r.content).join("\n\n");

      //send the reviews to LLM
      const prompt = `
      Summarize the following customer reviews into a short paragraph
      highlighting key themes, both positive and negative:
      ${joinedReviews}
      `;

      const response = await llmClient.generateText({
         model: "mistral-large-latest",
         prompt,
         temperature: 0.2,
         maxTokens: 500,
      });

      await reviewRepository.storeReviewSummary(productId, response);

      return response;
   },
};
