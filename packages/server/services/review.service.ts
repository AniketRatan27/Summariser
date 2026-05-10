import { reviewRepository } from "../Repositories/review.repository";
import { llmClient } from "../llm/Client";

export const reviewService = {
   async summarizeReviews(productId: number): Promise<string> {
      const existingSummary =
         await reviewRepository.getReviewSummary(productId);

      if (existingSummary) {
         return existingSummary;
      }

      const reviews = await reviewRepository.getReviews(productId, {
         limit: 15,
      });

      const joinedReviews = reviews
         .map(
            (r) => `
Rating: ${r.rating}/5
Review: ${r.content}
`
         )
         .join("\n");

      const prompt = `
You are an AI product review analyst.

Analyze the following customer reviews and return the response in this exact format:

Overall Summary:
Write 2-3 lines summarizing the product experience.

What Customers Like:
* Point 1
* Point 2
* Point 3

What Customers Dislike:
* Point 1
* Point 2
* Point 3

Final Verdict:
Write one clear recommendation sentence.

Reviews:
${joinedReviews}
`;

      const response = await llmClient.generateText({
         model: "mistral-large-latest",
         prompt,
         temperature: 0.2,
         maxTokens: 700,
      });

      await reviewRepository.storeReviewSummary(productId, response);

      return response;
   },
};
