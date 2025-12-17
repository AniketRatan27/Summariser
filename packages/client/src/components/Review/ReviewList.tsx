import axios from "axios";
import StarRating from "./StarRating";
import { HiSparkles } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import ReviewSkeleton from "./ReviewSkeleton";

type Props = {
   productId: number;
};

export type Review = {
   id: number;
   author: string;
   content: string;
   rating: number;
   createdAt: string;
   productId: number;
};

type GetReviewResponse = {
   summary: string | null;
   reviews: Review[];
};

type summariseResponse = {
   summary: string;
};

const ReviewList = ({ productId }: Props) => {
   const [summary, setSummary] = useState("");
   const [isSummaryLoading, setIsSummaryLoading] = useState(false);
   const [summaryError, setSummaryError] = useState("");

   useEffect(() => {
      setSummary("");
      setSummaryError("");
      setIsSummaryLoading(false);
   }, [productId]);

   const {
      data: reviewData,
      isLoading,
      error,
   } = useQuery<GetReviewResponse>({
      queryKey: ["reviews", productId],
      queryFn: () => fetchReviews(),
   });

   const handleSummarize = async () => {
      try {
         setIsSummaryLoading(true);
         setSummaryError("");

         const { data } = await axios.post<summariseResponse>(
            `/api/products/${productId}/reviews/summarize`
         );

         setSummary(data.summary);
      } catch (error) {
         console.error(error);
         setSummaryError("Could not summarise the reviews.Try again");
      } finally {
         setIsSummaryLoading(false);
      }
   };

   const fetchReviews = async () => {
      const { data } = await axios.get<GetReviewResponse>(
         `/api/products/${productId}/reviews`
      );
      return data;
   };

   if (isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((placeholder) => (
               <ReviewSkeleton key={placeholder} />
            ))}
            {summaryError && <p className="text-red-600">{summaryError}</p>}
         </div>
      );
   }

   if (error) {
      return <p className="text-red-600">could not fetch reviews.Try again</p>;
   }

   if (!reviewData?.reviews.length) {
      return null;
   }

   const currentSummary = reviewData.summary || summary;

   return (
      <div>
         <div className="mb-5">
            {currentSummary ? (
               <p>{currentSummary}</p>
            ) : (
               <div>
                  <Button
                     onClick={handleSummarize}
                     className="cursor-pointer"
                     disabled={isSummaryLoading}
                  >
                     <HiSparkles /> Summarize
                  </Button>
                  <div className="py-3.5">
                     {isSummaryLoading && <ReviewSkeleton />}
                  </div>
               </div>
            )}
         </div>
         <div className="flex flex-col gap-5">
            {reviewData?.reviews.map((review) => (
               <div key={review.id}>
                  <div className="font-semibold">{review.author}</div>
                  <div>
                     <StarRating value={review.rating} />
                  </div>
                  <p className="py-2">{review.content}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ReviewList;
