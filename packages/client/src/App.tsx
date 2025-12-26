import { useState } from "react";
import ProductList from "./components/Product/ProductList";
import ReviewList from "./components/Review/ReviewList";

function App() {
   const [pId, setPId] = useState<number | undefined>(1);
   return (
      <div className="p-4 h-screen w-full">
         <ProductList onSelectProductId={setPId} />
         {pId !== undefined && <ReviewList productId={pId} />}
      </div>
   );
}

export default App;
