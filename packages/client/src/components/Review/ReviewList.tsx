import axios from "axios";
import StarRating from "./StarRating";
import { HiSparkles } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import ReviewSkeleton from "./ReviewSkeleton";
import AnalyticsPanel from "../Analytics/AnalyticsPanel";
import ReactMarkdown from "react-markdown";

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

type Product = {
   id: number;
   name: string;
   description: string | null;
   price: number;
};

type GetReviewResponse = {
   product: Product;
   summary: string | null;
   reviews: Review[];
};

type SummariseResponse = {
   summary: string;
};

const ReviewList = ({ productId }: Props) => {
   const [summary, setSummary] = useState("");
   const [isSummaryLoading, setIsSummaryLoading] = useState(false);
   const [summaryError, setSummaryError] = useState("");
   const [selectedRating, setSelectedRating] = useState<number | undefined>();
   const [page, setPage] = useState(1);

   const pageSize = 5;

   useEffect(() => {
      setSummary("");
      setSummaryError("");
      setIsSummaryLoading(false);
      setSelectedRating(undefined);
      setPage(1);
   }, [productId]);

   useEffect(() => {
      setPage(1);
   }, [selectedRating]);

   const fetchReviews = async (): Promise<GetReviewResponse> => {
      const url = selectedRating
         ? `/api/products/${productId}/reviews?rating=${selectedRating}`
         : `/api/products/${productId}/reviews`;

      const { data } = await axios.get<GetReviewResponse>(url);
      return data;
   };

   const {
      data: reviewData,
      isLoading,
      error,
   } = useQuery<GetReviewResponse>({
      queryKey: ["reviews", productId, selectedRating],
      queryFn: fetchReviews,
   });

   const handleSummarize = async () => {
      try {
         setIsSummaryLoading(true);
         setSummaryError("");

         const { data } = await axios.post<SummariseResponse>(
            `/api/products/${productId}/reviews/summarize`
         );

         setSummary(data.summary);
      } catch (error) {
         console.error(error);
         setSummaryError("Could not summarize the reviews. Try again.");
      } finally {
         setIsSummaryLoading(false);
      }
   };

   if (isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((placeholder) => (
               <ReviewSkeleton key={placeholder} />
            ))}
         </div>
      );
   }

   if (error) {
      return (
         <p className="text-red-600">Could not fetch reviews. Try again.</p>
      );
   }

   if (!reviewData) {
      return null;
   }

   const currentSummary = summary || reviewData.summary;

   const averageRating =
      reviewData.reviews.length > 0
         ? (
              reviewData.reviews.reduce(
                 (sum, review) => sum + review.rating,
                 0
              ) / reviewData.reviews.length
           ).toFixed(1)
         : "0.0";

   const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
      rating,
      count: reviewData.reviews.filter((review) => review.rating === rating)
         .length,
   }));

   const totalPages = Math.ceil(reviewData.reviews.length / pageSize);

   const paginatedReviews = reviewData.reviews.slice(
      (page - 1) * pageSize,
      page * pageSize
   );

   return (
      <div>
         <div className="mb-5 rounded-2xl border bg-gradient-to-r from-slate-50 to-blue-50 p-5 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
               {reviewData.product.name}
            </h2>

            <p className="mt-1 text-gray-600">
               {reviewData.product.description}
            </p>

            <p className="mt-3 text-lg font-semibold">
               ₹ {reviewData.product.price}
            </p>
         </div>

         <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
               <p className="text-sm text-gray-500">Average Rating</p>

               <div className="mt-2 flex items-center gap-3">
                  <p className="text-4xl font-bold text-gray-900">
                     {averageRating}
                  </p>

                  <StarRating value={Math.round(Number(averageRating))} />
               </div>

               <p className="mt-2 text-sm text-gray-500">
                  Based on {reviewData.reviews.length} reviews
               </p>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
               <p className="mb-3 text-sm text-gray-500">Rating Distribution</p>

               <div className="space-y-2">
                  {ratingCounts.map((item) => (
                     <div key={item.rating} className="flex items-center gap-2">
                        <span className="w-10 text-sm font-medium">
                           {item.rating}★
                        </span>

                        <div className="h-2 flex-1 rounded-full bg-gray-200">
                           <div
                              className="h-2 rounded-full bg-yellow-500"
                              style={{
                                 width: `${
                                    reviewData.reviews.length
                                       ? (item.count /
                                            reviewData.reviews.length) *
                                         100
                                       : 0
                                 }%`,
                              }}
                           />
                        </div>

                        <span className="w-6 text-sm text-gray-600">
                           {item.count}
                        </span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="mb-5">
            {currentSummary ? (
               <div className="min-w-0 overflow-hidden rounded-2xl border bg-gradient-to-r from-blue-50 to-indigo-50 p-5 shadow-sm">
                  <h3 className="mb-2 font-bold">AI Summary</h3>

                  <div className="prose prose-sm max-w-none overflow-hidden break-words whitespace-normal [&_*]:break-words">
                     <ReactMarkdown>{currentSummary}</ReactMarkdown>
                  </div>
               </div>
            ) : (
               <div className="rounded-2xl border bg-white p-5 shadow-sm">
                  <Button
                     onClick={handleSummarize}
                     className="cursor-pointer"
                     disabled={isSummaryLoading}
                  >
                     <HiSparkles />
                     Generate AI Summary
                  </Button>

                  <div className="py-3.5">
                     {isSummaryLoading && <ReviewSkeleton />}

                     {summaryError && (
                        <p className="text-red-600">{summaryError}</p>
                     )}
                  </div>
               </div>
            )}
         </div>

         <AnalyticsPanel productId={productId} />

         <div className="mb-5 flex flex-wrap gap-2">
            <Button
               variant={!selectedRating ? "default" : "outline"}
               onClick={() => setSelectedRating(undefined)}
            >
               All
            </Button>

            {[1, 2, 3, 4, 5].map((rating) => (
               <Button
                  key={rating}
                  variant={selectedRating === rating ? "default" : "outline"}
                  onClick={() => setSelectedRating(rating)}
               >
                  {rating} Star
               </Button>
            ))}
         </div>

         {reviewData.reviews.length === 0 ? (
            <p className="text-gray-500">No reviews found for this rating.</p>
         ) : (
            <>
               <h3 className="mb-4 text-xl font-bold">Customer Reviews</h3>

               <div className="flex flex-col gap-5">
                  {paginatedReviews.map((review) => (
                     <div
                        key={review.id}
                        className="rounded-2xl border bg-white p-5 shadow-sm"
                     >
                        <div className="font-semibold">{review.author}</div>

                        <p className="mt-1 text-xs text-gray-500">
                           {new Date(review.createdAt).toLocaleDateString()}
                        </p>

                        <div className="mt-1">
                           <StarRating value={review.rating} />
                        </div>

                        <p className="py-2 text-gray-700">{review.content}</p>
                     </div>
                  ))}
               </div>

               {totalPages > 1 && (
                  <div className="mt-6 flex items-center justify-between">
                     <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                     >
                        Previous
                     </Button>

                     <span className="text-sm text-gray-600">
                        Page {page} of {totalPages}
                     </span>

                     <Button
                        variant="outline"
                        disabled={page === totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                     >
                        Next
                     </Button>
                  </div>
               )}
            </>
         )}
      </div>
   );
};

export default ReviewList;
