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

      if (!reviews.length) {
         return "No reviews available for summarization.";
      }

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

Analyze the following customer reviews and generate a clear product review summary.

Return the response ONLY in markdown format using the exact structure below.

## Overall Summary
Write 2-3 lines summarizing the overall customer experience.

## What Customers Like
* Point 1
* Point 2
* Point 3

## What Customers Dislike
* Point 1
* Point 2
* Point 3

## Final Verdict
Write one clear recommendation sentence.

Customer Reviews:
${joinedReviews}
`;

      const response = await llmClient.generateText({
         model: "mistral-large-latest",
         prompt,
         temperature: 0.2,
         maxTokens: 700,
      });

      const cleanedResponse = response.trim();

      await reviewRepository.storeReviewSummary(productId, cleanedResponse);

      return cleanedResponse;
   },
};
