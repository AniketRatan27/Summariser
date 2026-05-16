import { api } from "../../lib/axios";
import { useState } from "react";
import { HiSparkles } from "react-icons/hi";
import { Button } from "../ui/button";
import {
   PieChart,
   Pie,
   Cell,
   Tooltip,
   ResponsiveContainer,
   Legend,
} from "recharts";

type Props = {
   productId: number;
};

type AnalyticsResponse = {
   sentiment: {
      positive: number;
      neutral: number;
      negative: number;
      total: number;
   };
   insight: {
      pros: string;
      cons: string;
      recommendation: string;
   };
};

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

const AnalyticsPanel = ({ productId }: Props) => {
   const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const handleAnalyze = async () => {
      try {
         setLoading(true);
         setError("");

         const { data } = await api.post<AnalyticsResponse>(
            `/api/products/${productId}/analyze`
         );

         setAnalytics(data);
      } catch (err) {
         console.error(err);
         setError("Could not generate analytics. Try again.");
      } finally {
         setLoading(false);
      }
   };

   const chartData = analytics
      ? [
           { name: "Positive", value: analytics.sentiment.positive },
           { name: "Neutral", value: analytics.sentiment.neutral },
           { name: "Negative", value: analytics.sentiment.negative },
        ]
      : [];

   return (
      <div className="mb-6 rounded-2xl border bg-gradient-to-br from-purple-50 via-white to-blue-50 p-5 shadow-sm">
         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5">
            <div>
               <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 mb-2">
                  <HiSparkles />
                  AI Powered
               </div>
               <h3 className="text-2xl font-bold text-gray-900">
                  Review Intelligence
               </h3>
               <p className="text-sm text-gray-600 mt-1">
                  Generate sentiment, pros, cons and product recommendation.
               </p>
            </div>

            <Button
               onClick={handleAnalyze}
               disabled={loading}
               className="bg-purple-700 hover:bg-purple-800 text-white cursor-pointer"
            >
               <HiSparkles />
               {loading ? "Analyzing..." : "Analyze with AI"}
            </Button>
         </div>

         {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-700 mb-4">
               {error}
            </div>
         )}

         {!analytics && !loading && (
            <div className="rounded-xl border border-dashed bg-white/70 p-5 text-center">
               <p className="font-medium text-gray-700">
                  Click “Analyze with AI” to generate customer sentiment
                  insights.
               </p>
               <p className="text-sm text-gray-500 mt-1">
                  This will analyze all reviews for the selected product.
               </p>
            </div>
         )}

         {loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
               {[1, 2, 3].map((item) => (
                  <div
                     key={item}
                     className="h-24 animate-pulse rounded-xl bg-white border"
                  />
               ))}
            </div>
         )}

         {analytics && (
            <div className="space-y-5">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="rounded-xl bg-white border p-4 shadow-sm">
                     <p className="text-sm text-gray-500">Total Reviews</p>
                     <p className="text-3xl font-bold text-gray-900">
                        {analytics.sentiment.total}
                     </p>
                  </div>

                  <div className="rounded-xl bg-white border p-4 shadow-sm">
                     <p className="text-sm text-gray-500">Positive</p>
                     <p className="text-3xl font-bold text-green-600">
                        {analytics.sentiment.positive}
                     </p>
                  </div>

                  <div className="rounded-xl bg-white border p-4 shadow-sm">
                     <p className="text-sm text-gray-500">Neutral</p>
                     <p className="text-3xl font-bold text-yellow-600">
                        {analytics.sentiment.neutral}
                     </p>
                  </div>

                  <div className="rounded-xl bg-white border p-4 shadow-sm">
                     <p className="text-sm text-gray-500">Negative</p>
                     <p className="text-3xl font-bold text-red-600">
                        {analytics.sentiment.negative}
                     </p>
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
                  <div className="rounded-xl bg-white border p-4 shadow-sm">
                     <h4 className="font-bold mb-3">Sentiment Chart</h4>
                     <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie
                                 data={chartData}
                                 dataKey="value"
                                 nameKey="name"
                                 innerRadius={55}
                                 outerRadius={85}
                                 paddingAngle={3}
                              >
                                 {chartData.map((_, index) => (
                                    <Cell
                                       key={index}
                                       fill={COLORS[index % COLORS.length]}
                                    />
                                 ))}
                              </Pie>
                              <Tooltip />
                              <Legend />
                           </PieChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                  <div className="rounded-xl bg-white border p-4 shadow-sm">
                     <h4 className="font-bold mb-3">AI Recommendation</h4>
                     <p className="text-gray-700 leading-relaxed">
                        {analytics.insight.recommendation}
                     </p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white border p-4 shadow-sm">
                     <h4 className="font-bold mb-2 text-green-700">Pros</h4>
                     <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                        {analytics.insight.pros}
                     </p>
                  </div>

                  <div className="rounded-xl bg-white border p-4 shadow-sm">
                     <h4 className="font-bold mb-2 text-red-700">Cons</h4>
                     <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                        {analytics.insight.cons}
                     </p>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default AnalyticsPanel;
