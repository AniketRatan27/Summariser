import { reviewRepository } from "../Repositories/review.repository";
import { analyticsRepository } from "../Repositories/analytics.repository";
import { llmClient } from "../llm/Client";

type AIAnalysisResponse = {
   reviews: {
      reviewId: number;
      sentiment: "positive" | "neutral" | "negative";
      keywords: string;
   }[];
   pros: string;
   cons: string;
   recommendation: string;
};

export const analyticsService = {
   async analyzeProduct(productId: number) {
      const existingInsight =
         await analyticsRepository.getProductInsight(productId);
      const existingAnalysis =
         await analyticsRepository.getReviewAnalysis(productId);

      if (existingInsight && existingAnalysis.length > 0) {
         return this.buildResponse(existingAnalysis, existingInsight);
      }

      const reviews = await reviewRepository.getReviews(productId);

      const prompt = `
Analyze these product reviews.

Return ONLY valid JSON.
No markdown. No explanation.

Format:
{
  "reviews": [
    {
      "reviewId": 1,
      "sentiment": "positive",
      "keywords": "battery, comfort, sound"
    }
  ],
  "pros": "short bullet-style pros",
  "cons": "short bullet-style cons",
  "recommendation": "final buying recommendation"
}

Reviews:
${reviews
   .map(
      (r) =>
         `Review ID: ${r.id}
Rating: ${r.rating}
Content: ${r.content}`
   )
   .join("\n\n")}
`;

      const aiText = await llmClient.generateText({
         prompt,
         temperature: 0.2,
         maxTokens: 1500,
      });

      const cleanedJson = aiText
         .replace(/```json/g, "")
         .replace(/```/g, "")
         .trim();

      const parsed = JSON.parse(cleanedJson) as AIAnalysisResponse;

      for (const item of parsed.reviews) {
         await analyticsRepository.storeReviewAnalysis(
            item.reviewId,
            item.sentiment,
            item.keywords
         );
      }

      const pros = Array.isArray(parsed.pros)
         ? parsed.pros.map((p) => `• ${p}`).join("\n")
         : parsed.pros;

      const cons = Array.isArray(parsed.cons)
         ? parsed.cons.map((c) => `• ${c}`).join("\n")
         : parsed.cons;

      const insight = await analyticsRepository.storeProductInsight(
         productId,
         pros,
         cons,
         parsed.recommendation
      );

      const analysis = await analyticsRepository.getReviewAnalysis(productId);

      return this.buildResponse(analysis, insight);
   },

   buildResponse(analysis: any[], insight: any) {
      const positive = analysis.filter(
         (x) => x.sentiment === "positive"
      ).length;
      const neutral = analysis.filter((x) => x.sentiment === "neutral").length;
      const negative = analysis.filter(
         (x) => x.sentiment === "negative"
      ).length;

      return {
         sentiment: {
            positive,
            neutral,
            negative,
            total: analysis.length,
         },
         insight: {
            pros: insight.pros,
            cons: insight.cons,
            recommendation: insight.recommendation,
         },
      };
   },
};
