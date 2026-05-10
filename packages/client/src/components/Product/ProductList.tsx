import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Product = {
   id: number;
   name: string;
   description: string | null;
   price: number;
};

type Props = {
   selectedProductId?: number;
   onSelectProductId: (id: number) => void;
};

const ProductList = ({ selectedProductId, onSelectProductId }: Props) => {
   const fetchProducts = async (): Promise<Product[]> => {
      const { data } = await axios.get<Product[]>("/api/products");
      return data;
   };

   const { data, isLoading } = useQuery<Product[]>({
      queryKey: ["products"],
      queryFn: fetchProducts,
   });

   if (isLoading) {
      return (
         <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p>Loading products...</p>
         </div>
      );
   }

   return (
      <div className="rounded-2xl border bg-white p-5 shadow-sm h-fit">
         <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Products</h2>

            <p className="text-sm text-gray-500 mt-1">
               Select a product to analyze customer reviews.
            </p>
         </div>

         <div className="space-y-3">
            {data?.map((product) => {
               const isSelected = selectedProductId === product.id;

               return (
                  <button
                     key={product.id}
                     onClick={() => onSelectProductId(product.id)}
                     className={`w-full rounded-2xl border p-4 text-left transition-all duration-200 ${
                        isSelected
                           ? "border-blue-600 bg-blue-50 shadow-md"
                           : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                     }`}
                  >
                     <div className="flex items-start justify-between gap-3">
                        <div>
                           <h3 className="font-semibold text-gray-900">
                              {product.name}
                           </h3>

                           <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {product.description}
                           </p>
                        </div>

                        <div
                           className={`rounded-full px-3 py-1 text-sm font-medium ${
                              isSelected
                                 ? "bg-blue-600 text-white"
                                 : "bg-gray-100 text-gray-700"
                           }`}
                        >
                           #{product.id}
                        </div>
                     </div>

                     <div className="mt-4 flex items-center justify-between">
                        <p className="text-lg font-bold text-gray-900">
                           ₹ {product.price}
                        </p>

                        {isSelected && (
                           <span className="text-sm font-medium text-blue-700">
                              Selected
                           </span>
                        )}
                     </div>
                  </button>
               );
            })}
         </div>
      </div>
   );
};

export default ProductList;
