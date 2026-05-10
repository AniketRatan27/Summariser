import { useState } from "react";
import ProductList from "./components/Product/ProductList";
import ReviewList from "./components/Review/ReviewList";
import { HiSparkles } from "react-icons/hi";

function App() {
   const [pId, setPId] = useState<number | undefined>(1);

   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100">
         <div className="mx-auto max-w-7xl p-6">
            <div className="mb-8 rounded-3xl border bg-white/80 backdrop-blur p-6 shadow-sm">
               <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                     <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-700 mb-3">
                        <HiSparkles />
                        Mistral AI Powered
                     </div>

                     <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        AI Product Review Analytics
                     </h1>

                     <p className="mt-2 text-gray-600 max-w-2xl">
                        Analyze customer reviews using sentiment intelligence,
                        AI-generated summaries, recommendation insights and
                        analytics dashboards.
                     </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                     <div className="rounded-2xl border bg-blue-50 px-5 py-4 text-center">
                        <p className="text-sm text-gray-500">AI Features</p>
                        <p className="text-2xl font-bold text-blue-700">4+</p>
                     </div>

                     <div className="rounded-2xl border bg-green-50 px-5 py-4 text-center">
                        <p className="text-sm text-gray-500">Reviews</p>
                        <p className="text-2xl font-bold text-green-700">75</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
               <ProductList
                  selectedProductId={pId}
                  onSelectProductId={setPId}
               />

               <div className="rounded-3xl border bg-white/90 backdrop-blur p-6 shadow-sm">
                  {pId !== undefined && <ReviewList productId={pId} />}
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
