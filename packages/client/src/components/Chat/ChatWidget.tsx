import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatBot from "./ChatBot";

const ChatWidget = () => {
   const [open, setOpen] = useState(false);

   return (
      <div className="fixed bottom-6 right-6 z-50">
         {open && (
            <div className="mb-4 h-[560px] w-[380px] rounded-3xl border bg-white shadow-2xl overflow-hidden">
               <div className="flex items-center justify-between bg-gray-900 px-4 py-3 text-white">
                  <div>
                     <h3 className="font-bold">AI Product Assistant</h3>
                     <p className="text-xs text-gray-300">
                        Ask about products and reviews
                     </p>
                  </div>

                  <button
                     onClick={() => setOpen(false)}
                     className="rounded-full p-1 hover:bg-white/10"
                  >
                     <X size={20} />
                  </button>
               </div>

               <div className="h-[500px] p-4">
                  <ChatBot />
               </div>
            </div>
         )}

         <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-700 text-white shadow-xl transition hover:bg-purple-800"
         >
            {open ? <X size={26} /> : <MessageCircle size={28} />}
         </button>
      </div>
   );
};

export default ChatWidget;
