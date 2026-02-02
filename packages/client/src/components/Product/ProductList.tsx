import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type GetProductId = {
   id: number;
};

type Props = {
   onSelectProductId: (id: number) => void;
};

const ProductList = ({ onSelectProductId }: Props) => {
   const { data } = useQuery<GetProductId[]>({
      queryKey: ["productI"],
      queryFn: () => fetchProductIds(),
   });

   const fetchProductIds = async (): Promise<GetProductId[]> => {
      const { data } = await axios.get<GetProductId[]>("/api/products");
      return data;
   };

   return (
      <div>
         <h3 className="p-2 text-2xl font-serif border-2 border-b-black">
            Product IDs
         </h3>
         <ul className="flex flex-row gap-5 mt-4 mb-4">
            {data?.map((product) => (
               <li
                  key={product.id}
                  className="border-4 p-3 cursor-pointer rounded-2xl bg-gray-800 text-white"
                  onClick={() => onSelectProductId(product.id)}
               >
                  {product.id}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default ProductList;
